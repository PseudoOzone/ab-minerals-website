/**
 * ═══════════════════════════════════════════════════════════════════════
 * LAVENDER AGENT — ML WEIGHT ADAPTER
 * ═══════════════════════════════════════════════════════════════════════
 *
 * Autonomously adjusts the four lead-scoring weights using Stochastic
 * Gradient Descent (SGD) with a sigmoid output layer.
 *
 * WHY NOT TensorFlow.js?
 * ─────────────────────
 * TensorFlow.js adds ~2.5 MB to the bundle. For a 4-parameter model
 * with binary labels, hand-rolled SGD is mathematically equivalent,
 * has zero bundle cost, and runs in < 1 ms.
 *
 * HOW IT WORKS
 * ─────────────
 * For each conversion observation (raw scores → converted: yes/no),
 * we compute:
 *
 *   ŷ  = σ( w · x )              forward pass (sigmoid)
 *   L  = −[y log ŷ + (1−y) log(1−ŷ)]   binary cross-entropy
 *   ∂L/∂wᵢ = (ŷ − y) · xᵢ      gradient
 *   wᵢ ← wᵢ − η · ∂L/∂wᵢ      SGD update
 *
 * After each update, weights are re-normalised to sum to 1 and clamped
 * to [minWeight, 1] so no category can be completely ignored.
 *
 * After ML_CONFIG.minExamplesBeforeUpdate training examples accumulate,
 * one SGD pass is run and the new weights are persisted to localStorage.
 */

import { DEFAULT_SCORING_WEIGHTS, ML_CONFIG } from "./config";
import { logger } from "./logger";
import type { MLTrainingExample, ScoringWeights } from "./types";

// ─── Storage key ──────────────────────────────────────────────────────────────

const EXAMPLES_KEY = ML_CONFIG.localStorageKey + "_examples";

// ─── Feature extraction ───────────────────────────────────────────────────────

/**
 * Convert raw scores into the 4-dimensional feature vector used in training.
 * Normalisation mirrors the one in computeScore() in lead-scoring.ts.
 */
function extractFeatures(example: MLTrainingExample): [number, number, number, number] {
  const { techPageViews, formSubmissions, downloads, timeOnSiteMinutes } = example.rawScores;
  return [
    Math.min(techPageViews,   50) / 50,   // x₀ tech-spec views
    Math.min(formSubmissions,  1) / 1,    // x₁ form submissions
    Math.min(downloads,        3) / 3,    // x₂ downloads
    Math.min(timeOnSiteMinutes, 20) / 20, // x₃ time on site
  ];
}

// ─── Sigmoid ─────────────────────────────────────────────────────────────────

function sigmoid(z: number): number {
  return 1 / (1 + Math.exp(-z));
}

// ─── Weight normalisation ─────────────────────────────────────────────────────

/**
 * Ensure weights sum to 1 and each is ≥ minWeight.
 * Uses a "soft projection" — clamp first, then rescale.
 */
function normaliseWeights(w: ScoringWeights): ScoringWeights {
  const min = ML_CONFIG.minWeight;
  const clamped = {
    techPageViews:   Math.max(min, w.techPageViews),
    formSubmissions: Math.max(min, w.formSubmissions),
    downloads:       Math.max(min, w.downloads),
    timeOnSite:      Math.max(min, w.timeOnSite),
  };
  const total =
    clamped.techPageViews +
    clamped.formSubmissions +
    clamped.downloads +
    clamped.timeOnSite;

  return {
    techPageViews:   clamped.techPageViews   / total,
    formSubmissions: clamped.formSubmissions / total,
    downloads:       clamped.downloads       / total,
    timeOnSite:      clamped.timeOnSite      / total,
  };
}

// ─── Single SGD step ──────────────────────────────────────────────────────────

function sgdStep(
  weights: ScoringWeights,
  example:  MLTrainingExample,
  lr:       number,
): ScoringWeights {
  const [x0, x1, x2, x3] = extractFeatures(example);
  const wArr = [
    weights.techPageViews,
    weights.formSubmissions,
    weights.downloads,
    weights.timeOnSite,
  ];
  const xArr = [x0, x1, x2, x3];

  const z     = wArr.reduce((s, w, i) => s + w * xArr[i], 0);
  const yHat  = sigmoid(z);
  const y     = example.converted ? 1 : 0;
  const error = yHat - y;

  const newArr = wArr.map((w, i) => w - lr * error * xArr[i]);

  return normaliseWeights({
    techPageViews:   newArr[0],
    formSubmissions: newArr[1],
    downloads:       newArr[2],
    timeOnSite:      newArr[3],
  });
}

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Load the current scoring weights.
 * Returns ML-adjusted weights if available, otherwise defaults.
 */
export function loadWeights(): ScoringWeights {
  if (typeof window === "undefined") return { ...DEFAULT_SCORING_WEIGHTS };

  try {
    const stored = localStorage.getItem(ML_CONFIG.localStorageKey);
    if (stored) {
      const parsed = JSON.parse(stored) as ScoringWeights;
      // Validate shape
      if (
        typeof parsed.techPageViews   === "number" &&
        typeof parsed.formSubmissions === "number" &&
        typeof parsed.downloads       === "number" &&
        typeof parsed.timeOnSite      === "number"
      ) {
        return parsed;
      }
    }
  } catch (err) {
    logger.warn("ml-adapter", "Failed to load stored weights — using defaults", err);
  }

  return { ...DEFAULT_SCORING_WEIGHTS };
}

/**
 * Record a training example (raw scores + whether the lead converted).
 *
 * Call this:
 *   - With converted = true  when a quote request or call is completed
 *   - With converted = false when a session ends without conversion
 *
 * If enough examples have accumulated, runs a full SGD training pass
 * and updates the persisted weights.
 */
export function recordTrainingExample(example: MLTrainingExample): void {
  if (typeof window === "undefined") return;

  const examples = loadExamples();
  examples.push(example);

  // Keep only the most recent examples (sliding window)
  const trimmed = examples.slice(-ML_CONFIG.maxStoredExamples);

  try {
    localStorage.setItem(EXAMPLES_KEY, JSON.stringify(trimmed));
  } catch (err) {
    logger.error("ml-adapter", "Failed to persist training examples", err);
    return;
  }

  // Run a training pass if we have enough data
  if (trimmed.length >= ML_CONFIG.minExamplesBeforeUpdate) {
    const updated = runTrainingPass(trimmed);
    persistWeights(updated);
  }
}

/**
 * Force a training pass over all stored examples and return the new weights.
 * Useful for manual re-training via an admin dashboard.
 */
export function forceRetrain(): ScoringWeights {
  const examples = loadExamples();
  if (examples.length === 0) {
    logger.warn("ml-adapter", "No training examples found — returning defaults");
    return { ...DEFAULT_SCORING_WEIGHTS };
  }
  const updated = runTrainingPass(examples);
  persistWeights(updated);
  return updated;
}

/**
 * Reset weights to defaults and clear all training examples.
 * Use this when deploying a significant site redesign that would
 * invalidate historical behavioural patterns.
 */
export function resetWeights(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(ML_CONFIG.localStorageKey);
  localStorage.removeItem(EXAMPLES_KEY);
  logger.info("ml-adapter", "Weights and training examples reset to defaults");
}

/** Return diagnostic info about the current model state. */
export function getModelDiagnostics(): {
  currentWeights:    ScoringWeights;
  trainingExamples:  number;
  conversionRate:    number;
  readyToTrain:      boolean;
} {
  const examples       = loadExamples();
  const converted      = examples.filter((e) => e.converted).length;
  const conversionRate = examples.length > 0 ? converted / examples.length : 0;

  return {
    currentWeights:  loadWeights(),
    trainingExamples: examples.length,
    conversionRate,
    readyToTrain: examples.length >= ML_CONFIG.minExamplesBeforeUpdate,
  };
}

// ─── Private helpers ──────────────────────────────────────────────────────────

function runTrainingPass(examples: MLTrainingExample[]): ScoringWeights {
  let weights = loadWeights();

  // Single pass through all examples (online SGD)
  for (const ex of examples) {
    weights = sgdStep(weights, ex, ML_CONFIG.learningRate);
  }

  logger.info("ml-adapter", "Training pass complete", {
    examples: examples.length,
    newWeights: weights,
  });

  return weights;
}

function persistWeights(weights: ScoringWeights): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(ML_CONFIG.localStorageKey, JSON.stringify(weights));
  } catch (err) {
    logger.error("ml-adapter", "Failed to persist weights", err);
  }
}

function loadExamples(): MLTrainingExample[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(EXAMPLES_KEY);
    return raw ? (JSON.parse(raw) as MLTrainingExample[]) : [];
  } catch {
    return [];
  }
}
