/**
 * ═══════════════════════════════════════════════════════════════════════
 * LAVENDER AGENT — DATA ACQUISITION & MONITORING
 * ═══════════════════════════════════════════════════════════════════════
 *
 * Tracks all visitor interactions relevant to Lavender Blue sales:
 *   - Page view classification and dwell-time measurement
 *   - Quote / contact form submissions
 *   - Asset downloads (spec sheets, case studies)
 *   - Clickstream assembly
 *
 * Events are pushed to Google Analytics (GA4) custom events so that
 * campaigns can be optimised inside Google Ads and GA4 Explorations.
 */

import { LAVENDER_URL_PATTERNS, TECH_SPEC_URL_PATTERNS } from "./config";
import { logger } from "./logger";
import type {
  ClickstreamEntry,
  DownloadAssetType,
  DownloadEvent,
  LeadProfile,
  PageType,
} from "./types";

// ─── GA4 helper ───────────────────────────────────────────────────────────────

/** Type-safe wrapper around window.gtag — no-ops if GA4 isn't loaded. */
function ga4Event(eventName: string, params: Record<string, unknown>): void {
  if (typeof window === "undefined") return;
  const g = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
  if (typeof g === "function") {
    g("event", eventName, params);
  }
}

// ─── URL classification ───────────────────────────────────────────────────────

/**
 * Classify the current page path into a PageType.
 * Used to weight scoring and tailor personalisation.
 */
export function classifyPath(path: string): PageType {
  if (LAVENDER_URL_PATTERNS.some((re) => re.test(path))) {
    if (TECH_SPEC_URL_PATTERNS.some((re) => re.test(path))) {
      return "tech-spec";
    }
    return "lavender-detail";
  }
  if (/\/stones\b/i.test(path))   return "lavender-list";
  if (/\/projects\b/i.test(path)) return "project";
  if (/\/contact\b/i.test(path))  return "contact";
  return "other";
}

// ─── Page-view tracking ───────────────────────────────────────────────────────

let _pageEntryTime: number = Date.now();

/**
 * Call once per page navigation (Next.js router.events or useEffect).
 * Returns the classified PageType so callers can conditionally render
 * personalised content.
 */
export function trackPageView(
  path: string,
  profile: LeadProfile,
): PageType {
  _pageEntryTime = Date.now();

  const pageType = classifyPath(path);

  // Push GA4 event with lavender-specific dimensions
  ga4Event("lavender_page_view", {
    page_path:    path,
    page_type:    pageType,
    lead_tier:    profile.tier,
    lead_score:   profile.totalScore,
    session_id:   profile.sessionId,
  });

  logger.debug("analytics", `Page view tracked: ${path} → ${pageType}`);
  return pageType;
}

/**
 * Call on page unload / route change to record dwell time.
 * Returns a ClickstreamEntry ready to append to the profile.
 */
export function endPageView(path: string): ClickstreamEntry {
  const dwellMs      = Date.now() - _pageEntryTime;
  const dwellSeconds = Math.round(dwellMs / 1000);
  const pageType     = classifyPath(path);

  ga4Event("lavender_dwell_time", {
    page_path:     path,
    page_type:     pageType,
    dwell_seconds: dwellSeconds,
  });

  const entry: ClickstreamEntry = {
    path,
    pageType,
    dwellSeconds,
    timestamp: new Date().toISOString(),
  };

  logger.debug("analytics", `Dwell recorded: ${path} — ${dwellSeconds}s`);
  return entry;
}

// ─── Form submission tracking ─────────────────────────────────────────────────

/**
 * Call from the contact / quote form's onSubmit handler.
 * Fires a GA4 conversion event and flags the profile.
 *
 * @param formType  Identifies which form converted ("quote" | "contact" | "callback")
 * @param profile   Current lead profile (for GA4 dimensions)
 */
export function trackFormSubmission(
  formType: string,
  profile: LeadProfile,
): void {
  ga4Event("lavender_form_submit", {
    form_type:  formType,
    lead_score: profile.totalScore,
    lead_tier:  profile.tier,
    session_id: profile.sessionId,
  });

  // GA4 standard conversion event
  ga4Event("generate_lead", {
    currency: "INR",
    value:    0, // Actual order value unknown at this stage
  });

  logger.info("analytics", `Form submitted: ${formType}`, {
    sessionId: profile.sessionId,
    score:     profile.totalScore,
  });
}

// ─── Download tracking ────────────────────────────────────────────────────────

/**
 * Call when a user clicks any downloadable asset link.
 * Returns a DownloadEvent to be stored in the profile.
 *
 * @param assetUrl   Full URL of the downloaded file
 * @param assetType  Semantic type of the asset
 * @param profile    Current lead profile
 */
export function trackDownload(
  assetUrl: string,
  assetType: DownloadAssetType,
  profile: LeadProfile,
): DownloadEvent {
  ga4Event("lavender_download", {
    asset_url:  assetUrl,
    asset_type: assetType,
    lead_score: profile.totalScore,
    lead_tier:  profile.tier,
    session_id: profile.sessionId,
  });

  const event: DownloadEvent = {
    assetUrl,
    assetType,
    timestamp: new Date().toISOString(),
  };

  logger.debug("analytics", `Download: ${assetType}`, { assetUrl });
  return event;
}

// ─── Clickstream summary ──────────────────────────────────────────────────────

/**
 * Derive an aggregated summary from the raw clickstream.
 * Useful for email personalisation and ML training label generation.
 */
export function summariseClickstream(clickstream: ClickstreamEntry[]): {
  totalDwellSeconds:     number;
  lavenderPageVisits:    number;
  techSpecPageVisits:    number;
  contactPageVisits:     number;
  distinctPathsVisited:  number;
  deepEngagement:        boolean; // > 3 lavender pages or > 120 s on lavender
} {
  const lavenderEntries = clickstream.filter(
    (e) => e.pageType === "lavender-detail" || e.pageType === "tech-spec",
  );
  const totalDwellSeconds     = clickstream.reduce((s, e) => s + e.dwellSeconds, 0);
  const lavenderDwellSeconds  = lavenderEntries.reduce((s, e) => s + e.dwellSeconds, 0);
  const techSpecPageVisits    = clickstream.filter((e) => e.pageType === "tech-spec").length;
  const contactPageVisits     = clickstream.filter((e) => e.pageType === "contact").length;
  const distinctPathsVisited  = new Set(clickstream.map((e) => e.path)).size;

  return {
    totalDwellSeconds,
    lavenderPageVisits:  lavenderEntries.length,
    techSpecPageVisits,
    contactPageVisits,
    distinctPathsVisited,
    deepEngagement:
      lavenderEntries.length >= 3 || lavenderDwellSeconds >= 120,
  };
}
