/**
 * ═══════════════════════════════════════════════════════════════════════
 * LAVENDER AGENT — CONFIGURATION
 * ═══════════════════════════════════════════════════════════════════════
 *
 * Central configuration for the LAVENDER digital marketing agent.
 * All toggles, thresholds, and API endpoints live here.
 *
 * PLACEHOLDER MARKERS: Search "PLACEHOLDER" for values to set.
 */

import type { ABExperiment, AlertThreshold, ScoringWeights } from "./types";

// ─── Master Switch ────────────────────────────────────────────────────────────

export const LAVENDER_ENABLED = true;

// ─── Lead Scoring ─────────────────────────────────────────────────────────────

/** Default weights (ML adapter adjusts these at runtime). */
export const DEFAULT_SCORING_WEIGHTS: ScoringWeights = {
  techPageViews:   0.40, // Technical spec page views
  formSubmissions: 0.30, // Quote / contact form submissions
  downloads:       0.20, // Asset downloads
  timeOnSite:      0.10, // Time on site
};

/** Score thresholds that define tier boundaries. */
export const SCORE_THRESHOLDS = {
  HIGH:   80, // ≥ 80 → "high" tier
  MEDIUM: 40, // ≥ 40 → "medium" tier
              // <  40 → "low" tier
} as const;

/**
 * Maximum raw score each category contributes before weighting.
 * Tune these to prevent any single category from dominating.
 */
export const RAW_SCORE_CAPS = {
  techPageViews:       50,  // points per qualifying page view
  formSubmissionValue: 100, // points per form submission
  downloadValue:       30,  // points per download
  timeOnSitePerMin:    2,   // points per minute on site (capped at 20 min)
  maxTimeMinutes:      20,  // cap time contribution at 20 minutes
} as const;

// ─── URL Patterns ─────────────────────────────────────────────────────────────

/**
 * Regex patterns that identify "Lavender Blue" content pages.
 * The agent elevates scoring multipliers for these paths.
 */
export const LAVENDER_URL_PATTERNS: RegExp[] = [
  /\/stones\/lavender[-_]blue/i,
  /\/stones\/?$/i,            // stone listing page (lavender card visible)
  /lavender/i,                // any path containing "lavender"
];

/** Paths that contain technical specification content. */
export const TECH_SPEC_URL_PATTERNS: RegExp[] = [
  /\/stones\/lavender[-_]blue/i,
  /\/factory/i,
  /\/quarry/i,
];

// ─── A/B Experiments ──────────────────────────────────────────────────────────

export const AB_EXPERIMENTS: ABExperiment[] = [
  {
    id:              "hero-cta-copy",
    description:     "Test 'Get Quote Now' vs 'Request Free Sample'",
    treatmentWeight: 0.5,
    active:          true,
  },
  {
    id:              "social-proof-placement",
    description:     "Test project count badge above vs below CTA",
    treatmentWeight: 0.5,
    active:          true,
  },
];

// ─── SEO / Google Search Console ──────────────────────────────────────────────

/**
 * Keywords to monitor via Google Search Console API.
 *
 * NOTE: TubeBuddy and VidIQ are YouTube-only tools and cannot be used
 * for website SEO monitoring. Google Search Console API (free) is the
 * correct integration for tracking abminerals.com keyword rankings.
 */
export const TRACKED_KEYWORDS: string[] = [
  "Blue Lavender granite",
  "Blue Lavender Pigment",
  "Industrial Blue Lavender",
  "Blue Lavender Resin Art",
  "Lavender Blue granite India",
  "Lavender Blue granite price",
  "Lavender Blue granite slab",
  "Blue Lavender granite supplier",
  "Lavender Blue granite quarry owner",
  "Lavender Blue granite Berhampur",
];

export const SEO_CONFIG = {
  /**
   * Google Search Console API OAuth2 credentials.
   * Set via environment variables — never hard-code.
   *
   * PLACEHOLDER: Set GOOGLE_SEARCH_CONSOLE_CLIENT_EMAIL and
   *              GOOGLE_SEARCH_CONSOLE_PRIVATE_KEY in .env.local
   */
  searchConsoleEnabled: !!(
    process.env.GOOGLE_SEARCH_CONSOLE_CLIENT_EMAIL &&
    process.env.GOOGLE_SEARCH_CONSOLE_PRIVATE_KEY
  ),
  siteUrl: "https://www.abminerals.com",
  /** How many days of GSC data to request */
  lookbackDays: 7,
} as const;

// ─── Email Automation ─────────────────────────────────────────────────────────

export const EMAIL_CONFIG = {
  /**
   * PLACEHOLDER: Set LAVENDER_EMAIL_WEBHOOK_URL in .env.local.
   * Point this at SendGrid, Mailchimp, or your own API route.
   * The webhook receives an EmailTriggerPayload (see types.ts).
   */
  webhookUrl: process.env.LAVENDER_EMAIL_WEBHOOK_URL ?? null,
  enabled: !!process.env.LAVENDER_EMAIL_WEBHOOK_URL,

  sequences: {
    welcome: {
      subjectLine:  "Your Lavender Blue granite inquiry — next steps",
      delayMinutes: 0,
    },
    caseStudy: {
      subjectLine:  "How Sharjah Airport chose Lavender Blue granite",
      delayMinutes: 60,
    },
    productRecommendation: {
      subjectLine:  "Stones that pair well with Lavender Blue",
      delayMinutes: 1440, // 24 hours
    },
  },
} as const;

// ─── ML Adapter ───────────────────────────────────────────────────────────────

export const ML_CONFIG = {
  /** Minimum training examples before the adapter adjusts weights */
  minExamplesBeforeUpdate: 20,
  /** SGD learning rate (small = conservative adjustments) */
  learningRate: 0.01,
  /** Weight constraints: no individual weight can drop below this */
  minWeight: 0.05,
  /** Persist updated weights to localStorage under this key */
  localStorageKey: "lavender_ml_weights",
  /** Cap stored examples to prevent unbounded growth */
  maxStoredExamples: 500,
} as const;

// ─── Logging & Alerting ───────────────────────────────────────────────────────

export const LOGGING_CONFIG = {
  /** Minimum level to output to console */
  consoleLevel: (process.env.NODE_ENV === "production" ? "warn" : "debug") as
    "debug" | "info" | "warn" | "error",
  /**
   * PLACEHOLDER: Set LAVENDER_LOG_WEBHOOK_URL to POST structured logs
   * to a service like Logtail, Axiom, or a custom endpoint.
   */
  remoteWebhookUrl: process.env.LAVENDER_LOG_WEBHOOK_URL ?? null,
  /** Only ship logs ≥ "warn" to remote to minimise noise */
  remoteLevel: "warn" as "debug" | "info" | "warn" | "error",
} as const;

export const ALERT_THRESHOLDS: AlertThreshold[] = [
  {
    metricKey:    "dailyLeadsScored",
    minExpected:  1,
    maxExpected:  500,
    alertWebhook: process.env.LAVENDER_ALERT_WEBHOOK_URL ?? undefined,
  },
  {
    metricKey:    "formConversionRate",
    minExpected:  0.005, // 0.5 %
    maxExpected:  0.30,  // 30 % (unusually high may signal bot traffic)
    alertWebhook: process.env.LAVENDER_ALERT_WEBHOOK_URL ?? undefined,
  },
];
