/**
 * ═══════════════════════════════════════════════════════════════════════
 * LAVENDER AGENT — SEO OPTIMISER
 * ═══════════════════════════════════════════════════════════════════════
 *
 * Two responsibilities:
 *
 *   1. KEYWORD MONITORING — Queries Google Search Console API for ranking
 *      data on the tracked Lavender Blue keywords.  Runs server-side only
 *      (never in the browser — it uses a service-account private key).
 *
 *      ⚠️  NOTE: TubeBuddy and VidIQ are YouTube-only tools. They provide
 *      no API for website keyword monitoring. Google Search Console (free)
 *      is the correct data source for abminerals.com ranking data.
 *
 *   2. METADATA GENERATION — Generates keyword-optimised Next.js Metadata
 *      objects for all Lavender Blue content pages, ready to pass to the
 *      `generateMetadata()` export in each page.tsx.
 *
 * Environment variables required (set in .env.local):
 *   GOOGLE_SEARCH_CONSOLE_CLIENT_EMAIL   Service account email
 *   GOOGLE_SEARCH_CONSOLE_PRIVATE_KEY    Service account private key (PEM)
 */

import { SEO_CONFIG, TRACKED_KEYWORDS } from "./config";
import { logger } from "./logger";
import type { SeoRecommendation, SeoSnapshot } from "./types";

// ─── Types (minimal, avoids a full googleapis dependency at build time) ───────

interface GscRow {
  keys:        string[];
  impressions: number;
  clicks:      number;
  ctr:         number;
  position:    number;
}

interface GscResponse {
  rows?: GscRow[];
}

// ─── Keyword monitoring ───────────────────────────────────────────────────────

/**
 * Fetch keyword performance data from Google Search Console API.
 *
 * SERVER-SIDE ONLY. Call from an API route, a cron job, or
 * generateStaticParams — never from client components.
 *
 * Returns an array of SeoSnapshot objects sorted by impressions desc.
 * Returns an empty array if GSC is not configured.
 */
export async function fetchKeywordSnapshots(): Promise<SeoSnapshot[]> {
  if (!SEO_CONFIG.searchConsoleEnabled) {
    logger.warn(
      "seo",
      "Google Search Console not configured — skipping keyword fetch. " +
      "Set GOOGLE_SEARCH_CONSOLE_CLIENT_EMAIL and GOOGLE_SEARCH_CONSOLE_PRIVATE_KEY.",
    );
    return [];
  }

  try {
    const accessToken = await getGscAccessToken();
    const endDate     = new Date();
    const startDate   = new Date();
    startDate.setDate(endDate.getDate() - SEO_CONFIG.lookbackDays);

    const res = await fetch(
      `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(
        SEO_CONFIG.siteUrl,
      )}/searchAnalytics/query`,
      {
        method:  "POST",
        headers: {
          Authorization:  `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          startDate: formatDate(startDate),
          endDate:   formatDate(endDate),
          dimensions: ["query"],
          dimensionFilterGroups: [
            {
              filters: TRACKED_KEYWORDS.map((kw) => ({
                dimension:  "query",
                operator:   "contains",
                expression: kw.toLowerCase(),
              })),
            },
          ],
          rowLimit: 100,
        }),
      },
    );

    if (!res.ok) {
      const errorText = await res.text();
      logger.error("seo", `GSC API error ${res.status}`, { errorText });
      return [];
    }

    const data = (await res.json()) as GscResponse;
    const rows = data.rows ?? [];

    const snapshots: SeoSnapshot[] = rows.map((row) => ({
      keyword:     row.keys[0] ?? "",
      impressions: row.impressions,
      position:    Math.round(row.position * 10) / 10,
      ctr:         Math.round(row.ctr * 1000) / 1000,
      fetchedAt:   new Date().toISOString(),
    }));

    snapshots.sort((a, b) => b.impressions - a.impressions);

    logger.info("seo", `Fetched ${snapshots.length} keyword snapshots`);
    return snapshots;

  } catch (err) {
    logger.error("seo", "Failed to fetch keyword snapshots", err);
    return [];
  }
}

// ─── Metadata generation ──────────────────────────────────────────────────────

/**
 * Generate optimised Next.js Metadata for the Lavender Blue stone page.
 *
 * Usage in src/app/[locale]/stones/lavender-blue/page.tsx:
 *
 *   export async function generateMetadata(): Promise<Metadata> {
 *     return generateLavenderMetadata();
 *   }
 */
export function generateLavenderMetadata(
  /** Optionally pass GSC snapshots to surface the highest-impression keyword */
  snapshots?: SeoSnapshot[],
) {
  // Pick the top performing keyword for the title if data is available
  const topKeyword =
    snapshots && snapshots.length > 0
      ? snapshots[0].keyword
      : "Lavender Blue Granite";

  const title       = `${topKeyword} — Quarry Owner | AB Minerals`;
  const description =
    "Buy Lavender Blue granite direct from quarry owner in Berhampur, Odisha. " +
    "Best price, polished slabs, honed tiles, and custom sizes. " +
    "Supplied to Sharjah Airport, Surat Bullet Train, SCB Medical College. " +
    "Pan-India delivery. Get an instant quote.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url:    "https://www.abminerals.com/stones/lavender-blue",
      images: [
        {
          url:    "https://www.abminerals.com/stones/lavender-blue/lavender-blue-granite-polished-slab.jpg",
          width:  1200,
          height: 630,
          alt:    "Lavender Blue granite polished slab — AB Minerals quarry, Berhampur Odisha",
        },
      ],
    },
    twitter: {
      card:        "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: "https://www.abminerals.com/stones/lavender-blue",
    },
  };
}

// ─── SEO recommendation engine ────────────────────────────────────────────────

/**
 * Analyse current page metadata values and produce keyword-aligned
 * recommendations using the tracked keyword list.
 *
 * @param currentValues  Map of field name → current value
 * @param snapshots      Optional: GSC snapshot data for keyword prioritisation
 */
export function generateSeoRecommendations(
  currentValues: Partial<Record<SeoRecommendation["field"], string>>,
  snapshots: SeoSnapshot[] = [],
): SeoRecommendation[] {
  const recommendations: SeoRecommendation[] = [];

  // Prioritise keywords with highest impressions first
  const rankedKeywords = snapshots.length > 0
    ? snapshots.map((s) => s.keyword)
    : TRACKED_KEYWORDS;

  // ── Title ─────────────────────────────────────────────────────────
  const currentTitle = currentValues.title ?? "";
  const primaryKw    = rankedKeywords[0] ?? "Lavender Blue granite";
  if (!currentTitle.toLowerCase().includes("lavender")) {
    recommendations.push({
      field:          "title",
      currentValue:   currentTitle,
      suggestedValue: `${primaryKw} — Quarry Owner | AB Minerals`,
      reason:         `Primary keyword '${primaryKw}' missing from title tag`,
    });
  }

  // ── Meta description ───────────────────────────────────────────────
  const currentDesc = currentValues.metaDescription ?? "";
  if (currentDesc.length < 120 || !currentDesc.toLowerCase().includes("lavender")) {
    recommendations.push({
      field:          "metaDescription",
      currentValue:   currentDesc,
      suggestedValue:
        "Lavender Blue granite direct from quarry owner — polished slabs, tiles, custom sizes. " +
        "Best price in India. Supplied to airports, metro stations, hospitals. Free quote.",
      reason:         "Meta description is too short or missing primary keyword",
    });
  }

  // ── H1 ─────────────────────────────────────────────────────────────
  const currentH1 = currentValues.h1 ?? "";
  if (!currentH1.toLowerCase().includes("lavender blue")) {
    recommendations.push({
      field:          "h1",
      currentValue:   currentH1,
      suggestedValue: "Lavender Blue Granite — Direct from Quarry Owner",
      reason:         "H1 should contain exact-match primary keyword 'Lavender Blue Granite'",
    });
  }

  // ── Alt text ───────────────────────────────────────────────────────
  const currentAlt = currentValues.altText ?? "";
  if (!currentAlt.toLowerCase().includes("lavender")) {
    recommendations.push({
      field:          "altText",
      currentValue:   currentAlt,
      suggestedValue: "Lavender Blue granite polished slab — AB Minerals, Berhampur Odisha India",
      reason:         "Hero image alt text missing keyword — important for Google Image Search",
    });
  }

  return recommendations;
}

// ─── Private helpers ──────────────────────────────────────────────────────────

/** Obtain a short-lived Google OAuth2 access token for the service account. */
async function getGscAccessToken(): Promise<string> {
  const clientEmail  = process.env.GOOGLE_SEARCH_CONSOLE_CLIENT_EMAIL ?? "";
  const privateKeyRaw = process.env.GOOGLE_SEARCH_CONSOLE_PRIVATE_KEY ?? "";

  // Replace escaped newlines injected by some env managers
  const privateKey = privateKeyRaw.replace(/\\n/g, "\n");

  if (!clientEmail || !privateKey) {
    throw new Error("GSC service account credentials missing from environment");
  }

  const now = Math.floor(Date.now() / 1000);
  const header  = { alg: "RS256", typ: "JWT" };
  const payload = {
    iss:   clientEmail,
    scope: "https://www.googleapis.com/auth/webmasters.readonly",
    aud:   "https://oauth2.googleapis.com/token",
    exp:   now + 3600,
    iat:   now,
  };

  const headerB64  = base64url(JSON.stringify(header));
  const payloadB64 = base64url(JSON.stringify(payload));
  const message    = `${headerB64}.${payloadB64}`;

  // Sign with RSA-SHA256 using the Web Crypto API (available in Node 18+ / Next.js Edge)
  const cryptoKey = await importRsaKey(privateKey);
  const encoder   = new TextEncoder();
  const signature = await crypto.subtle.sign(
    { name: "RSASSA-PKCS1-v1_5" },
    cryptoKey,
    encoder.encode(message),
  );

  const jwtToken = `${message}.${base64urlBuffer(signature)}`;

  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method:  "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion:  jwtToken,
    }),
  });

  if (!tokenRes.ok) {
    throw new Error(`OAuth2 token request failed: ${tokenRes.status}`);
  }

  const tokenData = (await tokenRes.json()) as { access_token?: string };
  if (!tokenData.access_token) throw new Error("No access_token in OAuth2 response");

  return tokenData.access_token;
}

async function importRsaKey(pemKey: string): Promise<CryptoKey> {
  const pemBody = pemKey
    .replace(/-----BEGIN PRIVATE KEY-----/, "")
    .replace(/-----END PRIVATE KEY-----/, "")
    .replace(/\s/g, "");

  const binaryDer = Uint8Array.from(atob(pemBody), (c) => c.charCodeAt(0));

  return crypto.subtle.importKey(
    "pkcs8",
    binaryDer.buffer,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"],
  );
}

function base64url(input: string): string {
  return btoa(input)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function base64urlBuffer(buffer: ArrayBuffer): string {
  const bytes  = new Uint8Array(buffer);
  let   binary = "";
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function formatDate(date: Date): string {
  return date.toISOString().split("T")[0];
}
