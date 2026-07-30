/**
 * ═══════════════════════════════════════════════════════════════════════
 * LAVENDER AGENT — DYNAMIC CONTENT PERSONALISATION
 * ═══════════════════════════════════════════════════════════════════════
 *
 * Builds a PersonalisationPayload from a lead profile, determining:
 *   - Which headline / CTA copy to show (tier-based)
 *   - Which content blocks to surface (case studies vs tutorials)
 *   - Which A/B variant to serve for each active experiment
 *   - Which email sequence to trigger (if not yet sent)
 *
 * Tier logic:
 *
 *   HIGH  (80+)  Industrial case studies + immediate quote CTA
 *                A/B test the CTA copy for optimisation.
 *
 *   MEDIUM(40-79) Resin art tutorials + feature benefits
 *                 Trigger welcome email sequence.
 *
 *   LOW   (<40)  Introductory Lavender Blue content + navigation nudges.
 */

import { AB_EXPERIMENTS } from "./config";
import { assignVariant, reportVariantsToGA4 } from "./ab-testing";
import { logger } from "./logger";
import type { ABVariant, EmailSequenceType, LeadProfile, PersonalizationPayload } from "./types";

// ─── Tier copy maps ───────────────────────────────────────────────────────────

const COPY = {
  high: {
    control: {
      headline:    "Lavender Blue Granite — Direct from Quarry Owner",
      subheadline: "Unlock superior UV resistance and consistent hue for your industrial specification. Used in Sharjah Airport, Surat Bullet Train, and SCB Medical College.",
      ctaLabel:    "Get an Instant Quote",
    },
    treatment: {
      headline:    "Specify Lavender Blue with Confidence",
      subheadline: "Technical datasheets, project references, and factory-direct pricing — everything your procurement team needs in one place.",
      ctaLabel:    "Request Free Technical Pack",
    },
  },
  medium: {
    control: {
      headline:    "Create Stunning Pieces with Lavender Blue",
      subheadline: "Vibrant blue-lavender hues with flowing wave patterns — a favourite for resin art, interior feature walls, and bespoke kitchen islands.",
      ctaLabel:    "Explore the Stone",
    },
    treatment: {
      headline:    "Lavender Blue: Nature's Most Requested Hue",
      subheadline: "See how designers and artists are using Lavender Blue granite — and get a sample delivered to your studio.",
      ctaLabel:    "Request a Sample",
    },
  },
  low: {
    control: {
      headline:    "Lavender Blue Granite from Odisha, India",
      subheadline: "Quarried from our own 100-acre reserve in Berhampur — polished slabs, tiles, and blocks available for pan-India delivery.",
      ctaLabel:    "Learn More",
    },
    treatment: {
      headline:    "India's Finest Lavender Blue — No Middlemen",
      subheadline: "Buy direct from quarry owner. Lowest price guaranteed for polished slabs, honed tiles, and custom sizes.",
      ctaLabel:    "See Prices",
    },
  },
} as const;

// ─── Main builder ─────────────────────────────────────────────────────────────

/**
 * Build the full personalisation payload for the current visitor.
 *
 * Call this once per page render (inside a React hook or server component).
 * The result should drive conditional rendering of content blocks.
 */
export function buildPersonalisation(
  profile: LeadProfile,
): PersonalizationPayload {
  const { tier, sessionId } = profile;

  // ── A/B variant assignment ──────────────────────────────────────────
  const ctaExperiment = AB_EXPERIMENTS.find((e) => e.id === "hero-cta-copy" && e.active);
  const ctaVariant: ABVariant = ctaExperiment
    ? assignVariant("hero-cta-copy", sessionId)
    : "control";

  // Record variant assignments back onto the profile for persistence
  // (caller is responsible for saving the updated profile)
  profile.abVariants["hero-cta-copy"] = ctaVariant;

  // Push to GA4 for segmented analysis
  reportVariantsToGA4(profile.abVariants);

  // ── Copy selection ──────────────────────────────────────────────────
  const copy = COPY[tier][ctaVariant];

  // ── Email sequence selection ────────────────────────────────────────
  let emailSequence: EmailSequenceType | null = null;
  if (tier === "high" && !profile.caseStudyEmailSent) {
    emailSequence = "case-study";
  } else if (tier === "medium" && !profile.welcomeEmailSent) {
    emailSequence = "welcome";
  }

  // ── CTA urgency ─────────────────────────────────────────────────────
  const ctaVariantStyle =
    tier === "high"   ? "urgent"    :
    tier === "medium" ? "primary"   :
                        "secondary";

  const payload: PersonalizationPayload = {
    tier,
    headline:             copy.headline,
    subheadline:          copy.subheadline,
    ctaLabel:             copy.ctaLabel,
    ctaVariant:           ctaVariantStyle,
    showCaseStudies:      tier === "high",
    showResinArtTutorials: tier === "medium",
    emailSequence,
    abTestVariant:        ctaVariant,
  };

  logger.debug("personalisation", `Payload built for tier '${tier}'`, {
    sessionId,
    ctaVariant,
    emailSequence,
  });

  return payload;
}

// ─── Downstream content helpers ───────────────────────────────────────────────

/**
 * Ordered list of case study slugs to surface for high-tier visitors.
 *
 * Sorted by relevance to industrial procurement buyers.
 * Add more slugs as new project pages are published.
 */
export const INDUSTRIAL_CASE_STUDY_SLUGS = [
  "sharjah-airport",
  "surat-bullet-train",
  "cuttack-medical",
] as const;

/**
 * Introductory content card slugs for low-tier visitors.
 * Guides them into the product funnel without overwhelming.
 */
export const INTRO_CONTENT_SLUGS = [
  "what-is-lavender-blue-granite",
  "how-granite-is-quarried",
  "lavender-blue-applications",
] as const;
