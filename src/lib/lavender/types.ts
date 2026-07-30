/**
 * ═══════════════════════════════════════════════════════════════════════
 * LAVENDER AGENT — TYPE DEFINITIONS
 * ═══════════════════════════════════════════════════════════════════════
 *
 * Shared TypeScript types for all LAVENDER agent modules.
 */

// ─── Lead & Session ──────────────────────────────────────────────────────────

export interface LeadProfile {
  /** Opaque fingerprint stored in localStorage */
  sessionId: string;
  /** ISO timestamp of first visit */
  firstSeen: string;
  /** ISO timestamp of most recent activity */
  lastSeen: string;
  /** Accumulated raw scores per category before weight application */
  rawScores: LeadRawScores;
  /** Final weighted score 0–100 */
  totalScore: number;
  /** Which score tier the user currently belongs to */
  tier: LeadTier;
  /** Pages visited with timestamps */
  clickstream: ClickstreamEntry[];
  /** Downloads the user has triggered */
  downloads: DownloadEvent[];
  /** Whether the user has submitted a quote/contact form */
  hasSubmittedForm: boolean;
  /** Cumulative time on site in seconds */
  totalTimeOnSite: number;
  /** A/B variant assignments keyed by experiment id */
  abVariants: Record<string, ABVariant>;
  /** Whether the welcome email sequence has been triggered */
  welcomeEmailSent: boolean;
  /** Whether the case-study email sequence has been triggered */
  caseStudyEmailSent: boolean;
}

export interface LeadRawScores {
  /** Accumulated technical-spec page views (before weight) */
  techPageViews: number;
  /** Accumulated form submission events (before weight) */
  formSubmissions: number;
  /** Accumulated download events (before weight) */
  downloads: number;
  /** Accumulated time-on-site minutes (before weight) */
  timeOnSiteMinutes: number;
}

export type LeadTier = "low" | "medium" | "high";

// ─── Event Types ─────────────────────────────────────────────────────────────

export interface ClickstreamEntry {
  path: string;
  pageType: PageType;
  /** Seconds spent on this page */
  dwellSeconds: number;
  timestamp: string;
}

export type PageType =
  | "lavender-detail"   // /stones/lavender-blue
  | "lavender-list"     // /stones with lavender visible
  | "tech-spec"         // technical specs section
  | "project"           // /projects
  | "contact"           // /contact
  | "other";

export interface DownloadEvent {
  assetType: DownloadAssetType;
  assetUrl: string;
  timestamp: string;
}

export type DownloadAssetType =
  | "technical-spec"
  | "case-study"
  | "brochure"
  | "price-list";

// ─── Weights & ML ────────────────────────────────────────────────────────────

/**
 * The four weight parameters the ML adapter can tune.
 * Values are fractions that must sum to 1.0.
 */
export interface ScoringWeights {
  techPageViews: number;    // default 0.40
  formSubmissions: number;  // default 0.30
  downloads: number;        // default 0.20
  timeOnSite: number;       // default 0.10
}

export interface MLTrainingExample {
  rawScores: LeadRawScores;
  converted: boolean; // true = quote submitted or call placed
  timestamp: string;
}

// ─── Personalization ─────────────────────────────────────────────────────────

export interface PersonalizationPayload {
  tier: LeadTier;
  headline: string;
  subheadline: string;
  ctaLabel: string;
  ctaVariant: "primary" | "secondary" | "urgent";
  showCaseStudies: boolean;
  showResinArtTutorials: boolean;
  emailSequence: EmailSequenceType | null;
  abTestVariant: ABVariant;
}

export type EmailSequenceType = "welcome" | "case-study" | "product-recommendation";

// ─── A/B Testing ─────────────────────────────────────────────────────────────

export type ABVariant = "control" | "treatment";

export interface ABExperiment {
  id: string;
  description: string;
  /** Fraction of users assigned to "treatment" (0–1) */
  treatmentWeight: number;
  /** Whether the experiment is currently live */
  active: boolean;
}

export interface ABResult {
  experimentId: string;
  variant: ABVariant;
  /** Conversion events recorded for this session under this experiment */
  conversions: number;
}

// ─── SEO ─────────────────────────────────────────────────────────────────────

export interface SeoSnapshot {
  keyword: string;
  /** Google Search Console impression count for last 7 days */
  impressions: number;
  /** Average position */
  position: number;
  /** Click-through rate */
  ctr: number;
  fetchedAt: string;
}

export interface SeoRecommendation {
  field: "title" | "metaDescription" | "altText" | "h1";
  currentValue: string;
  suggestedValue: string;
  reason: string;
}

// ─── Email ───────────────────────────────────────────────────────────────────

export interface EmailTriggerPayload {
  sequence: EmailSequenceType;
  sessionId: string;
  /** Optional user-provided email from form submission */
  recipientEmail?: string;
  leadScore: number;
  tier: LeadTier;
  clickstream: ClickstreamEntry[];
}

// ─── Logging ─────────────────────────────────────────────────────────────────

export type LogLevel = "debug" | "info" | "warn" | "error";

export interface LogEntry {
  level: LogLevel;
  module: string;
  message: string;
  data?: unknown;
  timestamp: string;
}

export interface AlertThreshold {
  metricKey: string;
  minExpected: number;
  maxExpected: number;
  /** Webhook URL to POST when threshold is violated */
  alertWebhook?: string;
}
