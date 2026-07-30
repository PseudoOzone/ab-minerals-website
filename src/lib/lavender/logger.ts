/**
 * ═══════════════════════════════════════════════════════════════════════
 * LAVENDER AGENT — LOGGER
 * ═══════════════════════════════════════════════════════════════════════
 *
 * Structured logging with level filtering, remote webhook delivery,
 * and automatic alerting when metric thresholds are breached.
 */

import { ALERT_THRESHOLDS, LOGGING_CONFIG } from "./config";
import type { AlertThreshold, LogEntry, LogLevel } from "./types";

// ─── Level ordering ───────────────────────────────────────────────────────────

const LEVEL_ORDER: Record<LogLevel, number> = {
  debug: 0,
  info:  1,
  warn:  2,
  error: 3,
};

// ─── Internal helpers ─────────────────────────────────────────────────────────

function shouldPrint(level: LogLevel, threshold: LogLevel): boolean {
  return LEVEL_ORDER[level] >= LEVEL_ORDER[threshold];
}

/**
 * Fire-and-forget POST to a remote log webhook.
 * Fails silently so logging never disrupts the user experience.
 */
async function shipRemote(entry: LogEntry): Promise<void> {
  const url = LOGGING_CONFIG.remoteWebhookUrl;
  if (!url) return;
  if (!shouldPrint(entry.level, LOGGING_CONFIG.remoteLevel)) return;

  try {
    await fetch(url, {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify(entry),
    });
  } catch {
    // Intentionally swallowed — log errors must not cause cascading failures
  }
}

// ─── Core log function ────────────────────────────────────────────────────────

function log(
  level: LogLevel,
  module: string,
  message: string,
  data?: unknown,
): void {
  const entry: LogEntry = {
    level,
    module,
    message,
    data,
    timestamp: new Date().toISOString(),
  };

  if (shouldPrint(level, LOGGING_CONFIG.consoleLevel)) {
    const prefix = `[LAVENDER:${module.toUpperCase()}]`;
    switch (level) {
      case "debug": console.debug(prefix, message, data ?? ""); break;
      case "info":  console.info(prefix, message, data ?? "");  break;
      case "warn":  console.warn(prefix, message, data ?? "");  break;
      case "error": console.error(prefix, message, data ?? ""); break;
    }
  }

  // Ship asynchronously — do not await
  void shipRemote(entry);
}

// ─── Public API ───────────────────────────────────────────────────────────────

export const logger = {
  debug: (module: string, message: string, data?: unknown) =>
    log("debug", module, message, data),
  info:  (module: string, message: string, data?: unknown) =>
    log("info",  module, message, data),
  warn:  (module: string, message: string, data?: unknown) =>
    log("warn",  module, message, data),
  error: (module: string, message: string, data?: unknown) =>
    log("error", module, message, data),
};

// ─── Metric Alerting ──────────────────────────────────────────────────────────

/**
 * Check a named metric value against configured thresholds.
 * POSTs an alert to the configured webhook if the value is out of range.
 *
 * @example
 * checkMetricAlert("formConversionRate", 0.42); // triggers alert
 */
export async function checkMetricAlert(
  metricKey: string,
  value: number,
): Promise<void> {
  const thresholds: AlertThreshold[] = ALERT_THRESHOLDS.filter(
    (t) => t.metricKey === metricKey,
  );

  for (const threshold of thresholds) {
    if (value < threshold.minExpected || value > threshold.maxExpected) {
      const alertPayload = {
        alert:   "threshold_violation",
        metric:  metricKey,
        value,
        min:     threshold.minExpected,
        max:     threshold.maxExpected,
        ts:      new Date().toISOString(),
        site:    "abminerals.com",
      };

      logger.warn("alerting", `Metric '${metricKey}' out of range: ${value}`, alertPayload);

      if (threshold.alertWebhook) {
        try {
          await fetch(threshold.alertWebhook, {
            method:  "POST",
            headers: { "Content-Type": "application/json" },
            body:    JSON.stringify(alertPayload),
          });
        } catch (err) {
          logger.error("alerting", "Failed to POST metric alert", err);
        }
      }
    }
  }
}

// ─── Bot traffic detection ────────────────────────────────────────────────────

/**
 * Heuristic bot-traffic detector.
 * Returns true when the request looks like a non-human agent.
 *
 * Checks:
 *  1. Well-known bot user-agent strings
 *  2. Zero screen size (headless browser)
 *  3. No pointer / touch support (some crawlers)
 */
export function likelybBot(): boolean {
  if (typeof navigator === "undefined") return false;

  const ua = navigator.userAgent.toLowerCase();
  const BOT_PATTERNS = [
    "bot", "crawl", "spider", "slurp", "mediapartners",
    "semrush", "ahrefs", "mj12bot", "dotbot",
  ];

  if (BOT_PATTERNS.some((p) => ua.includes(p))) {
    logger.info("bot-detection", "Bot user-agent detected", { ua });
    return true;
  }

  // Headless check
  if (typeof window !== "undefined") {
    if (window.innerWidth === 0 || window.innerHeight === 0) {
      logger.info("bot-detection", "Zero viewport — likely headless");
      return true;
    }
  }

  return false;
}
