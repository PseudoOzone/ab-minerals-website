/**
 * ═══════════════════════════════════════════════════════════════════════
 * LAVENDER AGENT — UTILITIES
 * ═══════════════════════════════════════════════════════════════════════
 */

/**
 * Generate a random session ID suitable for localStorage use.
 * Does NOT require a server round-trip.
 */
export function generateSessionId(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback for older environments
  return (
    Math.random().toString(36).slice(2) +
    Math.random().toString(36).slice(2)
  );
}
