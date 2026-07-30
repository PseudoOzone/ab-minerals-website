#!/usr/bin/env node
/**
 * ═══════════════════════════════════════════════════════════════════════
 * LAVENDER — Google Business Profile Setup
 * ═══════════════════════════════════════════════════════════════════════
 *
 * ONE-TIME setup to connect the LAVENDER agent to your Google Business
 * Profile so it can auto-publish keyword-rich posts.
 *
 * STEP-BY-STEP:
 *
 * 1. Go to https://console.cloud.google.com/
 * 2. Create a new project (or use existing)
 * 3. Enable "Business Profile API":
 *      APIs & Services → Library → search "Business Profile API" → Enable
 * 4. Create OAuth2 credentials:
 *      APIs & Services → Credentials → Create Credentials → OAuth client ID
 *      Application type: Desktop app
 *      Download the JSON — note the client_id and client_secret
 * 5. Run this script:
 *      node scripts/setup-gmb.mjs
 * 6. Follow the prompts — a browser URL will appear, open it, log in
 *    with the Google account that manages your Business Profile,
 *    approve access, copy the code shown, paste it here.
 * 7. Done — the agent will auto-post from now on.
 *
 * USAGE:
 *   node scripts/setup-gmb.mjs
 *   node scripts/setup-gmb.mjs --show-account   # list your GMB accounts
 *   node scripts/setup-gmb.mjs --test-post       # publish a test post
 */

import fs            from 'fs/promises';
import path          from 'path';
import readline      from 'readline';
import { fileURLToPath } from 'url';

const __dirname    = path.dirname(fileURLToPath(import.meta.url));
const SESSIONS_DIR = path.join(__dirname, 'lavender-sessions');
const TOKENS_FILE  = path.join(SESSIONS_DIR, 'gmb-tokens.json');

const ARGS          = process.argv.slice(2);
const MODE_ACCOUNTS = ARGS.includes('--show-accounts');
const MODE_TEST     = ARGS.includes('--test-post');
const MODE_MANUAL   = ARGS.includes('--manual'); // skip API discovery, enter IDs manually

const SCOPE     = 'https://www.googleapis.com/auth/business.manage';
const AUTH_URL  = 'https://accounts.google.com/o/oauth2/v2/auth';
const TOKEN_URL = 'https://oauth2.googleapis.com/token';

// Load .env.local so credentials set there are available
async function loadEnvLocal() {
  try {
    const envPath = path.resolve(__dirname, '..', '.env.local');
    const raw     = await fs.readFile(envPath, 'utf8');
    for (const line of raw.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eq  = trimmed.indexOf('=');
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      const val = trimmed.slice(eq + 1).trim();
      if (key && val && !process.env[key]) process.env[key] = val;
    }
  } catch { /* .env.local is optional */ }
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function ask(rl, question) {
  return new Promise(function(resolve) { rl.question(question, resolve); });
}

async function refreshToken(clientId, clientSecret, refreshTok) {
  const res = await fetch(TOKEN_URL, {
    method:  'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id:     clientId,
      client_secret: clientSecret,
      refresh_token: refreshTok,
      grant_type:    'refresh_token',
    }),
    signal: AbortSignal.timeout(15_000),
  });
  if (!res.ok) {
    const e = await res.text();
    throw new Error('Token refresh failed: ' + res.status + ' ' + e.slice(0, 200));
  }
  return res.json();
}

async function apiGet(accessToken, url, retries) {
  retries = retries || 3;
  for (let attempt = 0; attempt < retries; attempt++) {
    const res = await fetch(url, {
      headers: { Authorization: 'Bearer ' + accessToken },
      signal:  AbortSignal.timeout(15_000),
    });
    if (res.status === 429) {
      if (attempt < retries - 1) {
        const wait = 70 + attempt * 30;
        console.log('\x1b[33m⚠ Rate limit hit — waiting ' + wait + 's before retry (' + (attempt + 1) + '/' + (retries - 1) + ')...\x1b[0m');
        await new Promise(function(r) { setTimeout(r, wait * 1000); });
        continue;
      }
    }
    if (!res.ok) {
      const e = await res.text();
      throw new Error('API error ' + res.status + ': ' + e.slice(0, 200));
    }
    return res.json();
  }
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  await fs.mkdir(SESSIONS_DIR, { recursive: true });
  await loadEnvLocal();

  console.log('\n\x1b[36m\x1b[1m╔══════════════════════════════════════════════════════╗');
  console.log('║   LAVENDER — Google Business Profile Setup           ║');
  console.log('╚══════════════════════════════════════════════════════╝\x1b[0m\n');

  // ── If already set up, allow --show-accounts and --test-post ──────────────
  let existingTokens = null;
  try {
    existingTokens = JSON.parse(await fs.readFile(TOKENS_FILE, 'utf8'));
  } catch { /* not set up yet */ }

  if (existingTokens && (MODE_ACCOUNTS || MODE_TEST)) {
    const tokenData = await refreshToken(
      existingTokens.client_id,
      existingTokens.client_secret,
      existingTokens.refresh_token,
    );
    const accessToken = tokenData.access_token;

    if (MODE_ACCOUNTS) {
      console.log('Fetching your Business Profile accounts...\n');
      const accounts = await apiGet(accessToken, 'https://mybusinessaccountmanagement.googleapis.com/v1/accounts');
      const accs = accounts.accounts || [];
      if (accs.length === 0) {
        console.log('No accounts found. Make sure you logged in with the right Google account.');
      } else {
        accs.forEach(function(a, i) {
          console.log((i + 1) + '. ' + a.name + ' — ' + a.accountName);
        });
      }
      process.exit(0);
    }

    if (MODE_TEST) {
      const { accountId, locationId } = existingTokens;
      if (!accountId || !locationId) {
        console.log('\x1b[33mAccount ID and Location ID not set. Run without flags to complete setup.\x1b[0m');
        process.exit(1);
      }
      const url = 'https://mybusiness.googleapis.com/v4/accounts/' + accountId + '/locations/' + locationId + '/localPosts'; // posts API still on v4
      const body = {
        languageCode: 'en-US',
        summary:      'Lavender Blue granite — direct from our quarry in Berhampur, Odisha. Lowest price guaranteed, no middlemen. Polished slabs, tiles, custom sizes. Supplied to Sharjah Airport & Surat Bullet Train.',
        topicType:    'STANDARD',
        callToAction: { actionType: 'LEARN_MORE', url: 'https://www.abminerals.com/stones/lavender-blue' },
      };
      const res = await fetch(url, {
        method:  'POST',
        headers: { Authorization: 'Bearer ' + accessToken, 'Content-Type': 'application/json' },
        body:    JSON.stringify(body),
        signal:  AbortSignal.timeout(20_000),
      });
      if (!res.ok) {
        const e = await res.text();
        console.log('\x1b[31mTest post failed: ' + res.status + ' ' + e.slice(0, 300) + '\x1b[0m');
      } else {
        console.log('\x1b[32m✔ Test post published successfully!\x1b[0m');
        console.log('Check your Google Business Profile to see it.');
      }
      process.exit(0);
    }
  }

  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

  try {
    console.log('You need a Google Cloud project with Business Profile API enabled.');
    console.log('Instructions: https://developers.google.com/my-business/content/prereqs\n');

    // Use env vars if already set, otherwise prompt
    let clientId     = process.env.GMB_CLIENT_ID     || '';
    let clientSecret = process.env.GMB_CLIENT_SECRET || '';

    if (clientId && clientSecret) {
      console.log('\x1b[32m✔ Credentials loaded from .env.local\x1b[0m\n');
    } else {
      clientId     = (await ask(rl, 'Paste your OAuth2 Client ID:     ')).trim();
      clientSecret = (await ask(rl, 'Paste your OAuth2 Client Secret:  ')).trim();
    }

    if (!clientId || !clientSecret) {
      console.log('\x1b[31mClient ID and Secret are required.\x1b[0m');
      process.exit(1);
    }

    // Build auth URL
    const params = new URLSearchParams({
      client_id:     clientId,
      redirect_uri:  'urn:ietf:wg:oauth:2.0:oob',
      response_type: 'code',
      scope:         SCOPE,
      access_type:   'offline',
      prompt:        'consent',
    });

    const authLink = AUTH_URL + '?' + params.toString();

    console.log('\n\x1b[1mOpen this URL in your browser and log in with your Google Business account:\x1b[0m');
    console.log('\x1b[36m' + authLink + '\x1b[0m\n');

    const code = (await ask(rl, 'Paste the authorization code shown: ')).trim();

    if (!code) {
      console.log('\x1b[31mNo code entered.\x1b[0m');
      process.exit(1);
    }

    // Exchange code for tokens
    console.log('\nExchanging code for tokens...');
    const tokenRes = await fetch(TOKEN_URL, {
      method:  'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id:     clientId,
        client_secret: clientSecret,
        code:          code,
        redirect_uri:  'urn:ietf:wg:oauth:2.0:oob',
        grant_type:    'authorization_code',
      }),
      signal: AbortSignal.timeout(15_000),
    });

    if (!tokenRes.ok) {
      const e = await tokenRes.text();
      throw new Error('Token exchange failed: ' + tokenRes.status + ' ' + e.slice(0, 200));
    }

    const tokenData = await tokenRes.json();
    if (!tokenData.refresh_token) throw new Error('No refresh_token in response — ensure "prompt=consent" was set');

    // ── Account & Location discovery (or manual entry) ──────────────────────
    let accountId, locationId;

    if (MODE_MANUAL) {
      console.log('\n\x1b[33m-- Manual mode: enter your Account ID and Location ID --\x1b[0m');
      console.log('Find them at: https://business.google.com → click your business → check the URL');
      console.log('URL pattern: business.google.com/u/0/business/{LOCATION_ID}/...\n');
      accountId  = (await ask(rl, 'Enter your GBP Account ID  (numbers only): ')).trim();
      locationId = (await ask(rl, 'Enter your GBP Location ID (numbers only): ')).trim();
    } else {
      // Fetch accounts to get account/location IDs
      console.log('\nFetching your Business Profile accounts...');
      const accounts = await apiGet(tokenData.access_token, 'https://mybusinessaccountmanagement.googleapis.com/v1/accounts');
      const accs = accounts.accounts || [];

      if (accs.length === 0) {
        throw new Error('No Business Profile accounts found for this Google account.');
      }

      console.log('\nYour Business Profile accounts:');
      accs.forEach(function(a, i) {
        console.log('  ' + (i + 1) + '. ' + (a.accountName || a.name));
      });

      const accIdx = parseInt(await ask(rl, '\nSelect account number: '), 10) - 1;
      const selectedAccount = accs[accIdx];
      if (!selectedAccount) throw new Error('Invalid selection');

      // Fetch locations for that account
      const accountName = selectedAccount.name; // e.g. "accounts/123456789"
      accountId   = accountName.split('/')[1];

      const locsData = await apiGet(tokenData.access_token, 'https://mybusinessaccountmanagement.googleapis.com/v1/' + accountName + '/locations');
      const locs = locsData.locations || [];

      if (locs.length === 0) throw new Error('No locations found for this account.');

      console.log('\nYour Business Profile locations:');
      locs.forEach(function(l, i) {
        console.log('  ' + (i + 1) + '. ' + (l.locationName || l.title || l.name));
      });

      const locIdx    = parseInt(await ask(rl, '\nSelect location number: '), 10) - 1;
      const selectedLoc = locs[locIdx];
      if (!selectedLoc) throw new Error('Invalid selection');
      locationId = selectedLoc.name.split('/').pop();
    }

    // Save all tokens + IDs
    const saved = {
      client_id:     clientId,
      client_secret: clientSecret,
      refresh_token: tokenData.refresh_token,
      access_token:  tokenData.access_token,
      expires_at:    Date.now() + (tokenData.expires_in || 3600) * 1000,
      accountId,
      locationId,
    };

    await fs.writeFile(TOKENS_FILE, JSON.stringify(saved, null, 2));
    console.log('\n\x1b[32m\x1b[1m✔ Setup complete!\x1b[0m');
    console.log('Tokens saved to: scripts/lavender-sessions/gmb-tokens.json');
    console.log('\nThe LAVENDER agent will now auto-publish Google Business Profile posts.');
    console.log('Test it with: node scripts/setup-gmb.mjs --test-post');

  } finally {
    rl.close();
  }
}

main().catch(function(e) {
  console.error('\x1b[31mSetup failed: ' + e.message + '\x1b[0m');
  process.exit(1);
});
