/**
 * ═══════════════════════════════════════════════════════════════════════
 * LAVENDER AGENT — LEAD SCORING
 * ═══════════════════════════════════════════════════════════════════════
 *
 * Computes a 0–100 score from four weighted raw input signals:
 *
 *   Category             Default Weight   Notes
 *   ─────────────────── ──────────────── ───────────────────────────
 *   Tech spec page views     40%          Prioritise deep research intent
 *   Form submissions         30%          Highest immediate conversion signal
 *   Asset downloads          20%          Strong research engagement
 *   Time on site             10%          Sustained browsing interest
 *
 * Weights are the defaults; the ML adapter (ml-adapter.ts) adjusts
 * them over time based on observed conversions.
 *
 * Profile state is persisted in localStorage under "lavender_profile"
 * and updated on every qualifying user interaction.
 */

import {
  DEFAULT_SCORING_WEIGHTS,
  RAW_SCORE_CAPS,
  SCORE_THRESHOLDS,
} from "./config";
import { logger } from "./logger";
import type {
  ClickstreamEntry,
  DownloadEvent,
  LeadProfile,
  LeadRawScores,
  LeadTier,
  ScoringWeights,
} from "./types";
import { generateSessionId } from "./utils";

// ─── localStorage key ─────────────────────────────────────────────────────────

const STORAGE_KEY = "lavender_profile";

// ─── Scoring maths ────────────────────────────────────────────────────────────

/**
 * Convert raw interaction counts into a normalised 0–100 score using
 * the provided weights.
 *
 * Each raw dimension is capped at its configured maximum before weighting,
 * so a single super-user cannot hit 100 via one channel alone.
 */
export function computeScore(
  raw: LeadRawScores,
  weights: ScoringWeights,
): number {
  // Normalise each dimension to [0, 1]
  const normTech   = Math.min(raw.techPageViews,    RAW_SCORE_CAPS.techPageViews)       / RAW_SCORE_CAPS.techPageViews;
  const normForm   = Math.min(raw.formSubmissions,  1)                                  / 1; // binary: 0 or 1 (clamp at 1)
  const normDl     = Math.min(raw.downloads,        3)                                  / 3; // cap at 3 downloads
  const timeMins   = Math.min(raw.timeOnSiteMinutes, RAW_SCORE_CAPS.maxTimeMinutes);
  const normTime   = timeMins / RAW_SCORE_CAPS.maxTimeMinutes;

  const raw0to1 =
    weights.techPageViews   * normTech  +
    weights.formSubmissions * normForm  +
    weights.downloads       * normDl    +
    weights.timeOnSite      * normTime;

  // Scale to 0–100
  return Math.round(Math.min(100, Math.max(0, raw0to1 * 100)));
}

/** Classify a numeric score into a named tier. */
export function scoreTier(score: number): LeadTier {
  if (score >= SCORE_THRESHOLDS.HIGH)   return "high";
  if (score >= SCORE_THRESHOLDS.MEDIUM) return "medium";
  return "low";
}

// ─── Profile lifecycle ────────────────────────────────────────────────────────

/** Create a brand-new, empty lead profile. */
function createEmptyProfile(): LeadProfile {
  return {
    sessionId:           generateSessionId(),
    firstSeen:           new Date().toISOString(),
    lastSeen:            new Date().toISOString(),
    rawScores: {
      techPageViews:      0,
      formSubmissions:    0,
      downloads:          0,
      timeOnSiteMinutes:  0,
    },
    totalScore:          0,
    tier:                "low",
    clickstream:         [],
    downloads:           [],
    hasSubmittedForm:    false,
    totalTimeOnSite:     0,
    abVariants:          {},
    welcomeEmailSent:    false,
    caseStudyEmailSent:  false,
  };
}

/**
 * Load an existing profile from localStorage, or create and persist a
 * fresh one if none exists.
 */
export function loadProfile(): LeadProfile {
  if (typeof window === "undefined") return createEmptyProfile();

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as LeadProfile;
      logger.debug("lead-scoring", "Profile loaded", { id: parsed.sessionId });
      return parsed;
    }
  } catch (err) {
    logger.warn("lead-scoring", "Failed to parse stored profile — resetting", err);
  }

  const fresh = createEmptyProfile();
  saveProfile(fresh);
  return fresh;
}

/** Persist the profile to localStorage. */
export function saveProfile(profile: LeadProfile): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  } catch (err) {
    logger.error("lead-scoring", "Failed to persist profile", err);
  }
}

// ─── Profile update helpers ───────────────────────────────────────────────────

/**
 * Recalculate the score and tier on a profile, optionally using
 * ML-adjusted weights from the ml-adapter.
 */
export function refreshScore(
  profile: LeadProfile,
  weights: ScoringWeights = DEFAULT_SCORING_WEIGHTS,
): LeadProfile {
  const prevTier  = profile.tier;
  const newScore  = computeScore(profile.rawScores, weights);
  const newTier   = scoreTier(newScore);

  const updated: LeadProfile = {
    ...profile,
    totalScore: newScore,
    tier:       newTier,
    lastSeen:   new Date().toISOString(),
  };

  if (prevTier !== newTier) {
    logger.info("lead-scoring", `Tier changed: ${prevTier} → ${newTier}`, {
      sessionId: profile.sessionId,
      score:     newScore,
    });
  }

  return updated;
}

/**
 * Record a page view, incrementing the appropriate raw score counter.
 *
 * @param profile    The current profile
 * @param entry      Clickstream entry (from analytics.endPageView)
 * @param weights    Current scoring weights (from ml-adapter or defaults)
 */
export function recordPageView(
  profile: LeadProfile,
  entry: ClickstreamEntry,
  weights: ScoringWeights = DEFAULT_SCORING_WEIGHTS,
): LeadProfile {
  const updated = { ...profile };
  updated.rawScores = { ...profile.rawScores };
  updated.clickstream = [...profile.clickstream, entry];

  // Update time-on-site
  updated.rawScores.timeOnSiteMinutes =
    profile.rawScores.timeOnSiteMinutes + entry.dwellSeconds / 60;
  updated.totalTimeOnSite = profile.totalTimeOnSite + entry.dwellSeconds;

  // Tech-spec page views earn extra raw score
  if (entry.pageType === "tech-spec" || entry.pageType === "lavender-detail") {
    updated.rawScores.techPageViews = profile.rawScores.techPageViews + 1;
  }

  return saveAndReturn(refreshScore(updated, weights));
}

/**
 * Record a form submission — highest-value conversion signal.
 */
export function recordFormSubmission(
  profile: LeadProfile,
  weights: ScoringWeights = DEFAULT_SCORING_WEIGHTS,
): LeadProfile {
  const updated: LeadProfile = {
    ...profile,
    hasSubmittedForm: true,
    rawScores: {
      ...profile.rawScores,
      formSubmissions: profile.rawScores.formSubmissions + 1,
    },
  };
  return saveAndReturn(refreshScore(updated, weights));
}

/**
 * Record an asset download.
 */
export function recordDownload(
  profile: LeadProfile,
  event: DownloadEvent,
  weights: ScoringWeights = DEFAULT_SCORING_WEIGHTS,
): LeadProfile {
  const updated: LeadProfile = {
    ...profile,
    downloads: [...profile.downloads, event],
    rawScores: {
      ...profile.rawScores,
      downloads: profile.rawScores.downloads + 1,
    },
  };
  return saveAndReturn(refreshScore(updated, weights));
}

// ─── Private helpers ──────────────────────────────────────────────────────────

function saveAndReturn(profile: LeadProfile): LeadProfile {
  saveProfile(profile);
  return profile;
}
