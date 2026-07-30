/**
 * ═══════════════════════════════════════════════════════════════════════
 * LAVENDER AGENT — EMAIL MARKETING AUTOMATION
 * ═══════════════════════════════════════════════════════════════════════
 *
 * Triggers email sequences via a configurable webhook endpoint.
 * The webhook is transport-agnostic — point it at:
 *   - A Next.js API route (src/app/api/email/route.ts)  ← recommended
 *   - A SendGrid / Mailchimp / Resend direct endpoint
 *
 * Sequences:
 *   welcome             Triggered at MEDIUM tier — introduces AB Minerals
 *                       and Lavender Blue's application breadth.
 *
 *   case-study          Triggered at HIGH tier — delivers industrial project
 *                       references matching the visitor's browsing history.
 *
 *   product-recommendation  Triggered dynamically — suggests complementary
 *                       stones (SK Blue, Star White) based on viewed pages.
 *
 * IMPORTANT: An email address is required for sequences to fire.
 * It is collected from form submissions (contact/quote forms).
 * The sequence fires immediately only if an email is available; otherwise
 * the trigger payload is queued in localStorage for the next form submission.
 */

import { EMAIL_CONFIG } from "./config";
import { logger } from "./logger";
import type { EmailSequenceType, EmailTriggerPayload, LeadProfile } from "./types";

// ─── localStorage queue ───────────────────────────────────────────────────────

const QUEUE_KEY = "lavender_email_queue";

interface QueuedTrigger {
  payload:   Omit<EmailTriggerPayload, "recipientEmail">;
  queuedAt:  string;
}

function enqueue(payload: Omit<EmailTriggerPayload, "recipientEmail">): void {
  if (typeof window === "undefined") return;
  try {
    const existing: QueuedTrigger[] = JSON.parse(
      localStorage.getItem(QUEUE_KEY) ?? "[]",
    );
    existing.push({ payload, queuedAt: new Date().toISOString() });
    localStorage.setItem(QUEUE_KEY, JSON.stringify(existing));
    logger.debug("email-automation", `Queued sequence '${payload.sequence}'`);
  } catch (err) {
    logger.error("email-automation", "Failed to enqueue email trigger", err);
  }
}

/** Drain the queue when an email address becomes available. */
export async function drainEmailQueue(recipientEmail: string): Promise<void> {
  if (typeof window === "undefined") return;

  let queued: QueuedTrigger[] = [];
  try {
    queued = JSON.parse(localStorage.getItem(QUEUE_KEY) ?? "[]");
  } catch {
    return;
  }

  if (queued.length === 0) return;

  localStorage.removeItem(QUEUE_KEY);

  for (const item of queued) {
    await dispatchTrigger({ ...item.payload, recipientEmail });
  }
}

// ─── Core trigger ─────────────────────────────────────────────────────────────

/**
 * Fire an email sequence trigger.
 *
 * If no email address is available, the trigger is queued and fired
 * the next time the user submits a form (via drainEmailQueue).
 *
 * @param sequence        Which email sequence to start
 * @param profile         Current lead profile
 * @param recipientEmail  User's email (from form submission, if known)
 */
export async function triggerEmailSequence(
  sequence: EmailSequenceType,
  profile: LeadProfile,
  recipientEmail?: string,
): Promise<void> {
  if (!EMAIL_CONFIG.enabled) {
    logger.debug(
      "email-automation",
      "Email webhook not configured — skipping trigger",
      { sequence },
    );
    return;
  }

  const triggerPayload: EmailTriggerPayload = {
    sequence,
    sessionId:      profile.sessionId,
    recipientEmail,
    leadScore:      profile.totalScore,
    tier:           profile.tier,
    clickstream:    profile.clickstream,
  };

  if (!recipientEmail) {
    // Defer until we have an address
    enqueue({
      sequence,
      sessionId:   profile.sessionId,
      leadScore:   profile.totalScore,
      tier:        profile.tier,
      clickstream: profile.clickstream,
    });
    return;
  }

  await dispatchTrigger(triggerPayload);
}

/** POST the trigger payload to the configured webhook. */
async function dispatchTrigger(payload: EmailTriggerPayload): Promise<void> {
  if (!EMAIL_CONFIG.webhookUrl) return;

  try {
    const res = await fetch(EMAIL_CONFIG.webhookUrl, {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify(payload),
    });

    if (!res.ok) {
      logger.warn("email-automation", `Webhook returned ${res.status}`, {
        sequence: payload.sequence,
      });
    } else {
      logger.info("email-automation", `Sequence '${payload.sequence}' triggered`, {
        sessionId: payload.sessionId,
        tier:      payload.tier,
      });
    }
  } catch (err) {
    logger.error("email-automation", "Webhook POST failed", err);
  }
}

// ─── Product recommendation helper ───────────────────────────────────────────

/**
 * Derive which complementary stones to recommend based on the clickstream.
 * Used by the email template to populate the "You may also like" section.
 */
export function getComplementaryStones(profile: LeadProfile): string[] {
  const visitedPaths = new Set(profile.clickstream.map((e) => e.path));

  // Recommend stones NOT already viewed
  const catalog = ["sk-blue", "star-white", "ikon-brown"];
  return catalog.filter(
    (slug) => !visitedPaths.has(`/stones/${slug}`),
  );
}
