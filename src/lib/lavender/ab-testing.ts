/**
 * ═══════════════════════════════════════════════════════════════════════
 * LAVENDER AGENT — A/B TESTING
 * ═══════════════════════════════════════════════════════════════════════
 *
 * Lightweight cookie-based A/B testing that:
 *   1. Assigns each visitor a deterministic variant per experiment
 *   2. Records conversion events per variant
 *   3. Exposes a statistical significance check (z-test, two-proportion)
 *   4. Pushes variant assignments to GA4 for segmented reporting
 *
 * Variant assignments are stable across sessions via a 90-day cookie.
 * The same visitor always sees the same variant for a given experiment.
 */

import { AB_EXPERIMENTS } from "./config";
import { logger } from "./logger";
import type { ABExperiment, ABResult, ABVariant } from "./types";

// ─── Cookie helpers ───────────────────────────────────────────────────────────

const COOKIE_PREFIX = "lavender_ab_";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 90; // 90 days in seconds

function setCookie(name: string, value: string): void {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=${encodeURIComponent(value)}; max-age=${COOKIE_MAX_AGE}; path=/; SameSite=Lax`;
}

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.split("=")[1]) : null;
}

// ─── Variant assignment ───────────────────────────────────────────────────────

/**
 * Return the A/B variant for a given experiment and session.
 *
 * Uses a deterministic hash of (sessionId + experimentId) so assignment
 * is stable without needing a server round-trip.
 *
 * If the experiment is inactive, always returns "control".
 */
export function assignVariant(
  experimentId: string,
  sessionId: string,
): ABVariant {
  const experiment = AB_EXPERIMENTS.find((e) => e.id === experimentId);

  if (!experiment || !experiment.active) {
    return "control";
  }

  // Check for existing cookie assignment first
  const cookieKey   = `${COOKIE_PREFIX}${experimentId}`;
  const storedValue = getCookie(cookieKey);
  if (storedValue === "control" || storedValue === "treatment") {
    return storedValue as ABVariant;
  }

  // Deterministic hash → variant
  const variant = hashToVariant(
    `${sessionId}:${experimentId}`,
    experiment.treatmentWeight,
  );

  setCookie(cookieKey, variant);
  logger.debug("ab-testing", `Assigned variant '${variant}' for '${experimentId}'`, {
    sessionId,
  });

  return variant;
}

/** Push all active experiment variant assignments to GA4. */
export function reportVariantsToGA4(
  assignments: Record<string, ABVariant>,
): void {
  if (typeof window === "undefined") return;
  const g = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
  if (typeof g !== "function") return;

  for (const [experimentId, variant] of Object.entries(assignments)) {
    g("event", "lavender_ab_assignment", {
      experiment_id: experimentId,
      variant,
    });
  }
}

// ─── Conversion recording ─────────────────────────────────────────────────────

const RESULTS_KEY = "lavender_ab_results";

/**
 * Record a conversion event for the given experiment and variant.
 * Results accumulate in localStorage for significance analysis.
 */
export function recordConversion(experimentId: string, variant: ABVariant): void {
  if (typeof window === "undefined") return;

  const allResults = loadResults();
  const key = `${experimentId}:${variant}`;
  const existing = allResults.find((r) => `${r.experimentId}:${r.variant}` === key);

  if (existing) {
    existing.conversions += 1;
  } else {
    allResults.push({ experimentId, variant, conversions: 1 });
  }

  try {
    localStorage.setItem(RESULTS_KEY, JSON.stringify(allResults));
  } catch (err) {
    logger.error("ab-testing", "Failed to save A/B result", err);
  }

  if (typeof window !== "undefined") {
    const g = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
    if (typeof g === "function") {
      g("event", "lavender_ab_conversion", { experiment_id: experimentId, variant });
    }
  }
}

/** Load all stored A/B results from localStorage. */
export function loadResults(): ABResult[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(RESULTS_KEY);
    return raw ? (JSON.parse(raw) as ABResult[]) : [];
  } catch {
    return [];
  }
}

// ─── Statistical significance ─────────────────────────────────────────────────

/**
 * Two-proportion z-test.
 *
 * Returns:
 *   { significant: boolean, pValue: number, winningVariant: ABVariant | null }
 *
 * Uses α = 0.05 (95 % confidence). Requires the impression counts per
 * variant — these must be tracked externally (e.g. from GA4).
 *
 * @param controlConversions     Number of conversions in control
 * @param controlImpressions     Number of users who saw control
 * @param treatmentConversions   Number of conversions in treatment
 * @param treatmentImpressions   Number of users who saw treatment
 */
export function checkSignificance(
  controlConversions:   number,
  controlImpressions:   number,
  treatmentConversions: number,
  treatmentImpressions: number,
): { significant: boolean; pValue: number; winningVariant: ABVariant | null } {
  if (controlImpressions === 0 || treatmentImpressions === 0) {
    return { significant: false, pValue: 1, winningVariant: null };
  }

  const p1 = controlConversions   / controlImpressions;
  const p2 = treatmentConversions / treatmentImpressions;
  const n1 = controlImpressions;
  const n2 = treatmentImpressions;

  const pooledP = (controlConversions + treatmentConversions) / (n1 + n2);
  const se      = Math.sqrt(pooledP * (1 - pooledP) * (1 / n1 + 1 / n2));

  if (se === 0) return { significant: false, pValue: 1, winningVariant: null };

  const z = Math.abs(p2 - p1) / se;

  // Approximate two-tailed p-value using the error function approximation
  const pValue = 2 * (1 - standardNormalCdf(z));
  const significant = pValue < 0.05;

  let winningVariant: ABVariant | null = null;
  if (significant) {
    winningVariant = p2 > p1 ? "treatment" : "control";
  }

  logger.info("ab-testing", "Significance check", {
    p1, p2, z: z.toFixed(3), pValue: pValue.toFixed(4), significant,
  });

  return { significant, pValue, winningVariant };
}

// ─── Experiment registry ──────────────────────────────────────────────────────

export function getActiveExperiments(): ABExperiment[] {
  return AB_EXPERIMENTS.filter((e) => e.active);
}

// ─── Private helpers ──────────────────────────────────────────────────────────

/**
 * Deterministic hash of a string to a float in [0, 1).
 * Uses djb2 — fast and sufficient for variant assignment.
 */
function hashFloat(input: string): number {
  let hash = 5381;
  for (let i = 0; i < input.length; i++) {
    hash = (hash * 33) ^ input.charCodeAt(i);
    hash = hash >>> 0; // Convert to unsigned 32-bit integer
  }
  return (hash >>> 0) / 0xffffffff;
}

function hashToVariant(input: string, treatmentWeight: number): ABVariant {
  return hashFloat(input) < treatmentWeight ? "treatment" : "control";
}

/**
 * Approximation of the standard normal CDF using Abramowitz & Stegun §26.2.17.
 */
function standardNormalCdf(z: number): number {
  const p  = 0.2316419;
  const b1 = 0.319381530;
  const b2 = -0.356563782;
  const b3 = 1.781477937;
  const b4 = -1.821255978;
  const b5 = 1.330274429;

  const t  = 1 / (1 + p * Math.abs(z));
  const t2 = t * t;
  const t3 = t2 * t;
  const t4 = t3 * t;
  const t5 = t4 * t;

  const poly = b1 * t + b2 * t2 + b3 * t3 + b4 * t4 + b5 * t5;
  const phi  = 1 - (1 / Math.sqrt(2 * Math.PI)) * Math.exp(-0.5 * z * z) * poly;

  return z >= 0 ? phi : 1 - phi;
}
