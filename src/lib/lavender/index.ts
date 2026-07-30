/**
 * ═══════════════════════════════════════════════════════════════════════
 * LAVENDER AGENT — MAIN ORCHESTRATOR
 * ═══════════════════════════════════════════════════════════════════════
 *
 * LAVENDER is AB Minerals' automated digital marketing agent, purpose-
 * built to dominate "Lavender Blue granite" and related search terms.
 *
 * Architecture overview:
 *
 *   analytics.ts       ← tracks page views, downloads, form submissions
 *   lead-scoring.ts    ← computes 0–100 score from 4 weighted signals
 *   personalization.ts ← maps score tier to CTA copy, content blocks
 *   email-automation.ts← triggers email sequences via webhook
 *   ab-testing.ts      ← stable variant assignment, significance testing
 *   seo-optimizer.ts   ← GSC keyword monitoring + metadata generation
 *   ml-adapter.ts      ← SGD weight tuning from conversion observations
 *   logger.ts          ← structured logging + metric alerting
 *
 * Usage (in a Next.js page or layout):
 *
 *   // 1. Initialize once per client session
 *   const agent = LavenderAgent.getInstance();
 *   agent.init();
 *
 *   // 2. Track every page navigation
 *   agent.onPageView(pathname);
 *
 *   // 3. Track events
 *   agent.onFormSubmit("quote", userEmail);
 *   agent.onDownload("/specs/lavender-blue.pdf", "technical-spec");
 *
 *   // 4. Get personalised content
 *   const payload = agent.getPersonalisation();
 *
 *   // 5. Signal conversion (drives ML weight updates)
 *   agent.onConversion();
 */

import {
  endPageView,
  trackDownload,
  trackFormSubmission,
  trackPageView,
} from "./analytics";
import { drainEmailQueue, triggerEmailSequence } from "./email-automation";
import {
  loadProfile,
  recordDownload,
  recordFormSubmission,
  recordPageView,
} from "./lead-scoring";
import { likelybBot, logger } from "./logger";
import { loadWeights, recordTrainingExample } from "./ml-adapter";
import { buildPersonalisation } from "./personalization";
import type {
  DownloadAssetType,
  LeadProfile,
  PersonalizationPayload,
} from "./types";

export { LAVENDER_ENABLED } from "./config";

// ─── Singleton agent ──────────────────────────────────────────────────────────

export class LavenderAgent {
  private static _instance: LavenderAgent | null = null;

  private _profile:       LeadProfile | null = null;
  private _currentPath:   string             = "";
  private _initialised:   boolean            = false;

  private constructor() {}

  /** Get (or create) the singleton agent instance. */
  static getInstance(): LavenderAgent {
    if (!LavenderAgent._instance) {
      LavenderAgent._instance = new LavenderAgent();
    }
    return LavenderAgent._instance;
  }

  // ─── Lifecycle ──────────────────────────────────────────────────────────

  /**
   * Initialise the agent.
   * Call once when the React app mounts (e.g. in a root layout useEffect).
   * Safe to call multiple times — subsequent calls are no-ops.
   */
  init(): void {
    if (this._initialised) return;
    if (typeof window === "undefined") return;

    // Skip tracking for bots — keeps data clean
    if (likelybBot()) {
      logger.info("agent", "Bot detected — agent disabled for this session");
      return;
    }

    this._profile    = loadProfile();
    this._currentPath = window.location.pathname;
    this._initialised = true;

    logger.info("agent", "LAVENDER initialised", {
      sessionId: this._profile.sessionId,
      tier:      this._profile.tier,
      score:     this._profile.totalScore,
    });

    // Attach page-unload handler to capture dwell time
    window.addEventListener("beforeunload", () => this._flushCurrentPage());
  }

  // ─── Event handlers ─────────────────────────────────────────────────────

  /**
   * Call on every client-side navigation (Next.js router event).
   * Flushes dwell time for the previous page and starts tracking the new one.
   */
  onPageView(path: string): PersonalizationPayload | null {
    if (!this._initialised || !this._profile) return null;

    // Flush previous page dwell
    if (this._currentPath) {
      const entry = endPageView(this._currentPath);
      this._profile = recordPageView(this._profile, entry, loadWeights());
    }

    // Track new page
    this._currentPath = path;
    trackPageView(path, this._profile);

    // Trigger email sequences if tier has changed to a qualifying level
    void this._maybeFireEmailSequence();

    return this.getPersonalisation();
  }

  /**
   * Call when the user submits any form (quote, contact, callback).
   *
   * @param formType       Descriptive identifier (e.g. "quote", "contact")
   * @param recipientEmail User's email if collected in the form
   */
  onFormSubmit(formType: string, recipientEmail?: string): void {
    if (!this._initialised || !this._profile) return;

    trackFormSubmission(formType, this._profile);
    this._profile = recordFormSubmission(this._profile, loadWeights());

    // Drain any queued email sequences that were waiting for an address
    if (recipientEmail) {
      void drainEmailQueue(recipientEmail);
    }

    // Fire immediate case-study trigger for high-tier form submitters
    if (this._profile.tier === "high" && !this._profile.caseStudyEmailSent) {
      void triggerEmailSequence("case-study", this._profile, recipientEmail);
      this._profile.caseStudyEmailSent = true;
    }

    // Record as a confirmed conversion for ML training
    this.onConversion();

    logger.info("agent", `Form submitted: ${formType}`, {
      tier:  this._profile.tier,
      score: this._profile.totalScore,
    });
  }

  /**
   * Call when the user downloads an asset.
   *
   * @param assetUrl   Full URL of the downloaded file
   * @param assetType  Semantic type (from DownloadAssetType)
   */
  onDownload(assetUrl: string, assetType: DownloadAssetType): void {
    if (!this._initialised || !this._profile) return;

    const event   = trackDownload(assetUrl, assetType, this._profile);
    this._profile = recordDownload(this._profile, event, loadWeights());

    logger.debug("agent", `Download: ${assetType}`);
  }

  /**
   * Signal that the current visitor has converted.
   * This records a positive training example for the ML adapter.
   */
  onConversion(): void {
    if (!this._profile) return;

    recordTrainingExample({
      rawScores:  this._profile.rawScores,
      converted:  true,
      timestamp:  new Date().toISOString(),
    });
  }

  // ─── Personalisation read ────────────────────────────────────────────────

  /**
   * Return the current personalisation payload.
   * This is the primary read interface for React components.
   */
  getPersonalisation(): PersonalizationPayload | null {
    if (!this._profile) return null;
    return buildPersonalisation(this._profile);
  }

  /** Expose the current lead profile (read-only copy). */
  getProfile(): Readonly<LeadProfile> | null {
    return this._profile ? { ...this._profile } : null;
  }

  // ─── Private helpers ─────────────────────────────────────────────────────

  private _flushCurrentPage(): void {
    if (!this._profile || !this._currentPath) return;
    const entry   = endPageView(this._currentPath);
    this._profile = recordPageView(this._profile, entry, loadWeights());

    // Record a non-conversion example for the ML adapter on exit
    // (only if the user did NOT convert this session)
    if (!this._profile.hasSubmittedForm) {
      recordTrainingExample({
        rawScores:  this._profile.rawScores,
        converted:  false,
        timestamp:  new Date().toISOString(),
      });
    }
  }

  private async _maybeFireEmailSequence(): Promise<void> {
    if (!this._profile) return;
    const { tier, welcomeEmailSent, caseStudyEmailSent } = this._profile;

    if (tier === "medium" && !welcomeEmailSent) {
      await triggerEmailSequence("welcome", this._profile);
      this._profile.welcomeEmailSent = true;
    } else if (tier === "high" && !caseStudyEmailSent) {
      await triggerEmailSequence("case-study", this._profile);
      this._profile.caseStudyEmailSent = true;
    }
  }
}

// ─── React hook ───────────────────────────────────────────────────────────────

/**
 * Convenience export for React components.
 *
 * Usage:
 *   import { useLavender } from "@/lib/lavender";
 *
 *   const { personalisation, profile } = useLavender(pathname);
 */
export function useLavender(pathname: string): {
  personalisation: PersonalizationPayload | null;
  profile:         Readonly<LeadProfile> | null;
} {
  // Lazy import React to avoid pulling it into server contexts
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { useEffect, useState, useRef } = require("react") as typeof import("react");

  const [personalisation, setPersonalisation] =
    useState<PersonalizationPayload | null>(null);

  const agentRef = useRef<LavenderAgent | null>(null);

  useEffect(() => {
    const agent = LavenderAgent.getInstance();
    agentRef.current = agent;
    agent.init();

    const payload = agent.onPageView(pathname);
    setPersonalisation(payload);
  }, [pathname]);

  return {
    personalisation,
    profile: agentRef.current?.getProfile() ?? null,
  };
}

// ─── Re-exports ───────────────────────────────────────────────────────────────

export type {
  DownloadAssetType,
  LeadProfile,
  LeadTier,
  PersonalizationPayload,
  ScoringWeights,
} from "./types";

export { checkSignificance, loadResults, recordConversion } from "./ab-testing";
export { getModelDiagnostics, forceRetrain, resetWeights } from "./ml-adapter";
export { fetchKeywordSnapshots, generateLavenderMetadata, generateSeoRecommendations } from "./seo-optimizer";
export { checkMetricAlert } from "./logger";
