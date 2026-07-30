#!/usr/bin/env node
/**
 * ═══════════════════════════════════════════════════════════════════════
 * LAVENDER — Digital Marketing Manager Agent
 * ═══════════════════════════════════════════════════════════════════════
 *
 * Uses local Gemma 3 (via Ollama) to continuously improve abminerals.com
 * SEO metadata, copy, and i18n content for Lavender Blue granite search
 * dominance. Works field-by-field: each task improves ONE specific string
 * value — fast (~15 s per task), reliable, and easy to review.
 *
 * USAGE:
 *   node scripts/lavender-agent.mjs              # continuous loop (20 min between tasks)
 *   node scripts/lavender-agent.mjs --once       # one task then exit
 *   node scripts/lavender-agent.mjs --audit      # report only, no writes
 *   node scripts/lavender-agent.mjs --reset      # clear session history
 *   node scripts/lavender-agent.mjs --status     # show current progress
 *
 * REQUIREMENTS:
 *   Ollama running at http://localhost:11434
 *   R4C3R/gemma-3-4b-it-heretic:q4_k_m pulled
 *   Node.js 18+
 */

import fs   from 'fs/promises';
import path from 'path';
import { createWriteStream } from 'fs';
import { fileURLToPath }     from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
const ROOT       = path.resolve(__dirname, '..');

// ─── CLI ──────────────────────────────────────────────────────────────────────

const ARGS          = process.argv.slice(2);
const MODE_ONCE     = ARGS.includes('--once');
const MODE_AUDIT    = ARGS.includes('--audit');
const MODE_RESET    = ARGS.includes('--reset');
const MODE_STATUS   = ARGS.includes('--status');
const MODE_SETUP_GMB = ARGS.includes('--setup-gmb');

// ─── Config ───────────────────────────────────────────────────────────────────

const CFG = {
  model:           'R4C3R/gemma-3-4b-it-heretic:q4_k_m',
  ollamaUrl:       'http://localhost:11434',
  ollamaTimeoutMs: 90_000,
  loopIntervalMs:  20 * 60 * 1000,
  temperature:     0.25,
  numCtx:          2048,
  sessionsDir:     path.join(__dirname, 'lavender-sessions'),
  stateFile:       path.join(__dirname, 'lavender-sessions', 'state.json'),
  logFile:         path.join(__dirname, 'lavender-sessions', 'agent.log'),
  reportFile:      path.join(__dirname, 'lavender-sessions', 'report.html'),
  backupDir:       path.join(__dirname, 'lavender-sessions', 'backups'),
};

// ─── Colours ──────────────────────────────────────────────────────────────────

const C = {
  reset: '\x1b[0m', bold: '\x1b[1m', dim: '\x1b[2m',
  cyan: '\x1b[36m', green: '\x1b[32m', yellow: '\x1b[33m',
  red: '\x1b[31m', magenta: '\x1b[35m',
};

let _logStream = null;
const stamp = () => new Date().toLocaleTimeString();

function log(lvl, msg, extra) {
  const icons = { INFO: '●', TASK: '◆', WRITE: '✎', THINK: '◈', DONE: '✔', WARN: '▲', ERR: '✖' };
  const cols  = { INFO: C.cyan, TASK: C.cyan, WRITE: C.green, THINK: C.magenta, DONE: C.green, WARN: C.yellow, ERR: C.red };
  const col   = cols[lvl] || C.reset;
  const icon  = icons[lvl] || '?';
  const tail  = extra ? ` ${C.dim}${extra}${C.reset}` : '';
  console.log(`${C.dim}${stamp()}${C.reset} ${col}${icon} [${lvl}]${C.reset} ${msg}${tail}`);
  if (_logStream) _logStream.write(`[${stamp()}] [${lvl}] ${msg}${extra ? ' ' + extra : ''}\n`);
}

// ─── Task queue ───────────────────────────────────────────────────────────────

const TASKS = [
  // Lavender Blue — stones.config.ts SEO fields
  {
    id: 'lb-meta-title',
    label: 'Improve Lavender Blue metaTitle',
    type: 'patch_ts',
    file: 'src/config/stones.config.ts',
    field: 'metaTitle',
    stoneId: 'lavender-blue',
    goal: 'Rank #1 for "Lavender Blue granite price India" and "Blue Lavender granite supplier". Max 65 chars. Must include "Lavender Blue Granite" and "Quarry Owner".',
  },
  {
    id: 'lb-meta-desc',
    label: 'Improve Lavender Blue metaDescription',
    type: 'patch_ts',
    file: 'src/config/stones.config.ts',
    field: 'metaDescription',
    stoneId: 'lavender-blue',
    goal: 'Target "Lavender Blue granite price", "Blue Lavender granite India", "quarry owner". Between 140-160 chars. Include: quarry owner, Berhampur Odisha, Sharjah Airport, lowest price, polished slabs.',
  },
  {
    id: 'lb-image-alt',
    label: 'Improve Lavender Blue imageAlt for Google Image Search',
    type: 'patch_ts',
    file: 'src/config/stones.config.ts',
    field: 'imageAlt',
    stoneId: 'lavender-blue',
    goal: 'Target Google Image Search for "Lavender Blue granite slab". Include stone name, finish, quarry location, India. Max 125 chars.',
  },
  {
    id: 'lb-tagline',
    label: 'Improve Lavender Blue tagline',
    type: 'patch_ts',
    file: 'src/config/stones.config.ts',
    field: 'tagline',
    stoneId: 'lavender-blue',
    goal: 'Short punchy tagline. Must mention "Lavender Blue" and the quarry-owner / lowest-price advantage. Max 80 chars.',
  },
  {
    id: 'lb-short-desc',
    label: 'Improve Lavender Blue shortDescription',
    type: 'patch_ts',
    file: 'src/config/stones.config.ts',
    field: 'shortDescription',
    stoneId: 'lavender-blue',
    goal: 'One line for card previews. Include "Lavender Blue granite", "quarry owner", "factory direct". Max 100 chars.',
  },
  // English i18n hero copy
  {
    id: 'en-hero-subtext',
    label: 'Improve English hero subtext (desktop)',
    type: 'patch_json',
    file: 'messages/en.json',
    key: 'home.heroSubtextDesktop',
    goal: 'Punchy 1-line value proposition for Lavender Blue granite buyers. Must mention: best price, quarry owner advantage. Max 80 chars.',
  },
  {
    id: 'en-stones-desc',
    label: 'Improve English stones section description',
    type: 'patch_json',
    file: 'messages/en.json',
    key: 'home.stonesDescription',
    goal: 'Reinforce Lavender Blue granite as the hero product. Max 120 chars. Include "Lavender Blue" and "quarry owner".',
  },
  // Competitor research
  {
    id: 'research-india',
    label: 'Research: Lavender Blue granite competitors India',
    type: 'research',
    query: 'Lavender Blue granite price India supplier quarry',
    advice: 'List the top 3 competitor sites and identify 3 keywords they rank for that we are missing.',
  },
  {
    id: 'research-global',
    label: 'Research: global Blue Lavender granite buyers',
    type: 'research',
    query: 'Blue Lavender granite slab export supplier international',
    advice: 'Identify what keywords international buyers use that we should add to the site.',
  },
  // ── Google Business Profile auto-posts ─────────────────────────────────────
  {
    id: 'gmb-post-quarry',
    label: 'Post to Google Business Profile: quarry ownership',
    type: 'gmb_post',
    topic: 'AB Minerals owns the Lavender Blue granite quarry in Berhampur, Odisha — the only quarry owner selling directly with no middlemen, guaranteed lowest price.',
    cta: { actionType: 'LEARN_MORE', url: 'https://www.abminerals.com/stones/lavender-blue' },
  },
  {
    id: 'gmb-post-projects',
    label: 'Post to Google Business Profile: landmark projects',
    type: 'gmb_post',
    topic: 'Lavender Blue granite from AB Minerals supplied to Sharjah International Airport, Surat Bullet Train Station, SCB Medical College Cuttack, Old Bangalore Airport, and Pune Metro.',
    cta: { actionType: 'LEARN_MORE', url: 'https://www.abminerals.com/projects' },
  },
  {
    id: 'gmb-post-price',
    label: 'Post to Google Business Profile: direct pricing',
    type: 'gmb_post',
    topic: 'Lavender Blue granite at the lowest price in India — polished slabs, honed tiles, flamed finish. 18mm to 30mm. Pan-India delivery. Direct from our quarry in Berhampur Odisha.',
    cta: { actionType: 'CALL', url: 'https://www.abminerals.com/contact' },
  },
  // ── HARO / PR monitoring ───────────────────────────────────────────────────
  {
    id: 'haro-scan',
    label: 'Scan HARO + PR sites for journalist queries',
    type: 'haro_scan',
    keywords: ['granite', 'stone supplier', 'construction material', 'india export', 'building material', 'quarry'],
  },
  // ── Internal link audit ────────────────────────────────────────────────────
  {
    id: 'internal-link-audit',
    label: 'Audit internal links for Lavender Blue keyword mentions',
    type: 'internal_link_audit',
  },
  // ── Directory submission data ──────────────────────────────────────────────
  {
    id: 'directory-data',
    label: 'Generate directory submission data package',
    type: 'directory_data',
  },
  // ── Other stones meta titles
  {
    id: 'sk-meta-title',
    label: 'Improve Vizag/SK Blue metaTitle',
    type: 'patch_ts',
    file: 'src/config/stones.config.ts',
    field: 'metaTitle',
    stoneId: 'sk-blue',
    goal: 'Rank for "Vizag Blue granite price India", "SK Blue granite". Max 65 chars.',
  },
  {
    id: 'sw-meta-title',
    label: 'Improve Star White metaTitle',
    type: 'patch_ts',
    file: 'src/config/stones.config.ts',
    field: 'metaTitle',
    stoneId: 'star-white',
    goal: 'Rank for "Star White granite India", "white granite slab price". Max 65 chars.',
  },
];

// ─── Session ──────────────────────────────────────────────────────────────────

const EMPTY_STATE = { completedTaskIds: [], changes: [], lastRun: null };

async function loadState() {
  try {
    return JSON.parse(await fs.readFile(CFG.stateFile, 'utf8'));
  } catch {
    return JSON.parse(JSON.stringify(EMPTY_STATE));
  }
}

async function saveState(state) {
  await fs.mkdir(CFG.sessionsDir, { recursive: true });
  await fs.writeFile(CFG.stateFile, JSON.stringify(state, null, 2));
}

// ─── Ollama ───────────────────────────────────────────────────────────────────

async function gemma(system, user) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), CFG.ollamaTimeoutMs);

  try {
    const res = await fetch(`${CFG.ollamaUrl}/api/chat`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      signal:  controller.signal,
      body: JSON.stringify({
        model:   CFG.model,
        stream:  false,
        messages: [
          { role: 'system', content: system },
          { role: 'user',   content: user },
        ],
        options: {
          temperature: CFG.temperature,
          num_ctx:     CFG.numCtx,
        },
      }),
    });

    if (!res.ok) {
      const body = await res.text().catch(() => '');
      throw new Error(`Ollama HTTP ${res.status}: ${body.slice(0, 100)}`);
    }

    const data = await res.json();
    return (data.message && data.message.content ? data.message.content : '').trim();
  } finally {
    clearTimeout(timer);
  }
}

// ─── File helpers ─────────────────────────────────────────────────────────────

async function backup(absPath) {
  try {
    const rel  = path.relative(ROOT, absPath);
    const dest = path.join(CFG.backupDir, rel + '.' + Date.now() + '.bak');
    await fs.mkdir(path.dirname(dest), { recursive: true });
    await fs.copyFile(absPath, dest);
  } catch (_) { /* non-fatal */ }
}

// Read a TypeScript string field value from a stone block
async function readTsField(file, field, stoneId) {
  const content = await fs.readFile(path.resolve(ROOT, file), 'utf8');
  let zone = content;

  if (stoneId) {
    const start = content.indexOf('id: "' + stoneId + '"');
    if (start === -1) return null;
    const next = content.indexOf('id: "', start + 1);
    zone = next === -1 ? content.slice(start) : content.slice(start, next);
  }

  const m = zone.match(new RegExp(field + ':\\s*"([^"]*?)"'));
  return m ? m[1] : null;
}

// Patch a TypeScript string field value in a stone block
async function patchTsField(file, field, newValue, stoneId) {
  const abs     = path.resolve(ROOT, file);
  const content = await fs.readFile(abs, 'utf8');

  let prefix = '', zone = content, suffix = '';

  if (stoneId) {
    const start = content.indexOf('id: "' + stoneId + '"');
    if (start === -1) throw new Error('Stone ' + stoneId + ' not found');
    const next = content.indexOf('id: "', start + 1);
    prefix = content.slice(0, start);
    zone   = next === -1 ? content.slice(start) : content.slice(start, next);
    suffix = next === -1 ? '' : content.slice(next);
  }

  const re = new RegExp('(' + field + ':\\s*")([^"]*?)(")');
  if (!re.test(zone)) throw new Error('Field ' + field + ' not found in zone');

  const escaped = newValue.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
  const patched = zone.replace(re, '$1' + escaped + '$3');

  await backup(abs);
  await fs.writeFile(abs, prefix + patched + suffix, 'utf8');
}

// Read a dotted JSON key like "home.heroSubtextDesktop"
async function readJsonKey(file, key) {
  const obj   = JSON.parse(await fs.readFile(path.resolve(ROOT, file), 'utf8'));
  const parts = key.split('.');
  let cur = obj;
  for (const p of parts) {
    if (cur === undefined || cur === null) return null;
    cur = cur[p];
  }
  return typeof cur === 'string' ? cur : null;
}

// Write a dotted JSON key
async function patchJsonKey(file, key, newValue) {
  const abs   = path.resolve(ROOT, file);
  const obj   = JSON.parse(await fs.readFile(abs, 'utf8'));
  const parts = key.split('.');
  let cur = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    cur = cur[parts[i]];
  }
  cur[parts[parts.length - 1]] = newValue;
  await backup(abs);
  await fs.writeFile(abs, JSON.stringify(obj, null, 2), 'utf8');
}

// ─── Web search (DuckDuckGo, no API key) ──────────────────────────────────────

async function searchWeb(query) {
  const url = 'https://html.duckduckgo.com/html/?q=' + encodeURIComponent(query);
  try {
    const res  = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; research-bot)' },
      signal:  AbortSignal.timeout(12_000),
    });
    const html = await res.text();
    const re   = /class="result__snippet"[^>]*>([^<]{20,})</g;
    const results = [];
    let m;
    while ((m = re.exec(html)) !== null && results.length < 6) {
      results.push(m[1].trim());
    }
    return results.length > 0 ? results.join('\n') : '(no results found)';
  } catch (e) {
    return '(search failed: ' + e.message + ')';
  }
}

// ─── Google Business Profile API ─────────────────────────────────────────────

const GBP_TOKENS_FILE = path.join(CFG.sessionsDir, 'gmb-tokens.json');

async function readGMBTokens() {
  try {
    return JSON.parse(await fs.readFile(GBP_TOKENS_FILE, 'utf8'));
  } catch {
    return null;
  }
}

async function getGMBAccessToken() {
  const tokens = await readGMBTokens();
  if (!tokens) throw new Error('GMB not set up. Run: node scripts/setup-gmb.mjs');

  // Return cached token if still valid (5 min buffer)
  if (tokens.access_token && tokens.expires_at && Date.now() < tokens.expires_at - 300_000) {
    return tokens.access_token;
  }

  // Refresh
  const clientId     = process.env.GMB_CLIENT_ID     || tokens.client_id;
  const clientSecret = process.env.GMB_CLIENT_SECRET || tokens.client_secret;
  if (!clientId || !clientSecret) throw new Error('GMB_CLIENT_ID / GMB_CLIENT_SECRET not set');

  const res = await fetch('https://oauth2.googleapis.com/token', {
    method:  'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id:     clientId,
      client_secret: clientSecret,
      refresh_token: tokens.refresh_token,
      grant_type:    'refresh_token',
    }),
    signal: AbortSignal.timeout(15_000),
  });

  if (!res.ok) {
    const e = await res.text().catch(() => '');
    throw new Error('Token refresh failed: ' + res.status + ' ' + e.slice(0, 100));
  }

  const data = await res.json();
  tokens.access_token = data.access_token;
  tokens.expires_at   = Date.now() + (data.expires_in || 3600) * 1000;
  await fs.writeFile(GBP_TOKENS_FILE, JSON.stringify(tokens, null, 2));
  return data.access_token;
}

async function publishGMBPost(text, callToAction) {
  const tokens       = await readGMBTokens();
  if (!tokens)       throw new Error('GMB not set up');
  const { accountId, locationId } = tokens;
  if (!accountId || !locationId) throw new Error('accountId/locationId missing — re-run setup-gmb.mjs');

  const accessToken = await getGMBAccessToken();
  const url = `https://mybusiness.googleapis.com/v4/accounts/${accountId}/locations/${locationId}/localPosts`;

  const body = {
    languageCode: 'en-US',
    summary:      text,
    topicType:    'STANDARD',
    callToAction: callToAction || { actionType: 'LEARN_MORE', url: 'https://www.abminerals.com/stones/lavender-blue' },
  };

  const res = await fetch(url, {
    method:  'POST',
    headers: {
      Authorization:  'Bearer ' + accessToken,
      'Content-Type': 'application/json',
    },
    body:   JSON.stringify(body),
    signal: AbortSignal.timeout(20_000),
  });

  if (!res.ok) {
    const e = await res.text().catch(() => '');
    throw new Error('GBP post failed: ' + res.status + ' ' + e.slice(0, 200));
  }

  return await res.json();
}

// ─── HARO / PR monitoring ─────────────────────────────────────────────────────

async function fetchHARO(keywords) {
  // HARO RSS (public) + SourceBottle RSS as fallback
  const feeds = [
    'https://www.helpareporter.com/sources/rss/',
    'https://www.sourcebottle.com/rss.aspx',
  ];

  const hits = [];
  for (const feed of feeds) {
    try {
      const res  = await fetch(feed, {
        headers: { 'User-Agent': 'Mozilla/5.0' },
        signal:  AbortSignal.timeout(10_000),
      });
      const xml  = await res.text();
      // Extract <item> blocks
      const items = xml.match(/<item>[\s\S]*?<\/item>/g) || [];
      for (const item of items) {
        const titleM = item.match(/<title[^>]*>([\s\S]*?)<\/title>/);
        const descM  = item.match(/<description[^>]*>([\s\S]*?)<\/description>/);
        const text   = ((titleM && titleM[1]) + ' ' + (descM && descM[1])).toLowerCase();
        if (keywords.some(function(k) { return text.includes(k.toLowerCase()); })) {
          hits.push({
            title: titleM ? titleM[1].replace(/<[^>]+>/g, '').trim() : '',
            desc:  descM  ? descM[1].replace(/<[^>]+>/g, '').trim().slice(0, 300) : '',
          });
        }
      }
    } catch (_) { /* feed unavailable */ }
  }
  return hits;
}

// ─── Internal link audit ──────────────────────────────────────────────────────

async function auditInternalLinks() {
  const srcDir  = path.resolve(ROOT, 'src');
  const results = [];

  async function walk(dir) {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const e of entries) {
      const full = path.join(dir, e.name);
      if (e.isDirectory()) {
        await walk(full);
      } else if (/\.(tsx|ts|json)$/.test(e.name) && !e.name.includes('lavender-agent')) {
        const content = await fs.readFile(full, 'utf8');
        const lower   = content.toLowerCase();
        // Find "lavender blue" mentions NOT already inside an href or link
        const mentions = (lower.match(/lavender blue/g) || []).length;
        const linkedMentions = (lower.match(/href[^>]*lavender/g) || []).length;
        if (mentions > 0 && linkedMentions < mentions) {
          results.push({
            file:            path.relative(ROOT, full),
            totalMentions:   mentions,
            linkedMentions:  linkedMentions,
            unlinked:        mentions - linkedMentions,
          });
        }
      }
    }
  }

  await walk(srcDir);
  results.sort(function(a, b) { return b.unlinked - a.unlinked; });
  return results;
}

// ─── System prompt ────────────────────────────────────────────────────────────

const SYSTEM = `You are LAVENDER, an expert SEO copywriter for AB Minerals (abminerals.com).

AB Minerals is the QUARRY OWNER of Lavender Blue granite from Berhampur, Odisha, India.
Key facts:
- Own 100-acre quarry — the only granite they mine themselves
- Factory in Chamakhandi, Odisha — polished slabs, honed tiles, custom sizes  
- Lowest price guaranteed — direct from quarry, no middlemen
- Landmark projects: Sharjah International Airport, Surat Bullet Train Station, SCB Medical College Cuttack, Old Bangalore Airport, Pune Metro
- Exports internationally, pan-India delivery

Your job: generate text that dominates Google for:
"Lavender Blue granite", "Blue Lavender granite", "Lavender Blue granite price India",
"Blue Lavender granite supplier", "Lavender Blue granite quarry owner"

RULES:
1. Output ONLY the improved text — no surrounding quotes, no explanations, no markdown.
2. Stay within the character limit given.
3. Front-load the primary keyword.
4. Include specific proof points (Sharjah Airport, quarry owner, Berhampur Odisha).`;

// ─── Task runner ──────────────────────────────────────────────────────────────

async function runTask(task) {
  log('TASK', task.label);

  if (task.type === 'patch_ts') {
    const current = await readTsField(task.file, task.field, task.stoneId);
    if (current === null) {
      log('WARN', 'Field not found: ' + task.field);
      return null;
    }

    log('THINK', 'Current: "' + current.slice(0, 90) + '"');

    const improved = await gemma(
      SYSTEM,
      'Current ' + task.field + ': "' + current + '"\n\nGoal: ' + task.goal + '\n\nWrite the improved ' + task.field + ' now:',
    );

    if (!improved || improved.length < 10) {
      log('WARN', 'Model returned empty response');
      return null;
    }

    const clean = improved.replace(/^["'`\s]+|["'`\s]+$/g, '');
    log('THINK', 'Improved: "' + clean.slice(0, 90) + '"');

    if (!MODE_AUDIT) {
      await patchTsField(task.file, task.field, clean, task.stoneId);
      log('WRITE', 'Patched ' + task.field + ' in ' + task.file);
    }

    return { taskId: task.id, label: task.label, before: current, after: clean, file: task.file, field: task.field };
  }

  if (task.type === 'patch_json') {
    const current = await readJsonKey(task.file, task.key);
    if (current === null) {
      log('WARN', 'Key not found: ' + task.key);
      return null;
    }

    log('THINK', 'Current: "' + current.slice(0, 90) + '"');

    const improved = await gemma(
      SYSTEM,
      'Current "' + task.key + '": "' + current + '"\n\nGoal: ' + task.goal + '\n\nWrite the improved value now:',
    );

    if (!improved || improved.length < 10) {
      log('WARN', 'Model returned empty response');
      return null;
    }

    const clean = improved.replace(/^["'`\s]+|["'`\s]+$/g, '');
    log('THINK', 'Improved: "' + clean.slice(0, 90) + '"');

    if (!MODE_AUDIT) {
      await patchJsonKey(task.file, task.key, clean);
      log('WRITE', 'Patched ' + task.key + ' in ' + task.file);
    }

    return { taskId: task.id, label: task.label, before: current, after: clean, file: task.file };
  }

  if (task.type === 'research') {
    log('THINK', 'Searching: ' + task.query);
    const snippets = await searchWeb(task.query);

    const analysis = await gemma(
      SYSTEM,
      'Search results for "' + task.query + '":\n\n' + snippets + '\n\n' + task.advice + '\n\nProvide 3 specific actionable SEO insights:',
    );

    log('DONE', 'Research complete');
    if (analysis) log('THINK', analysis.slice(0, 250));

    const dest = path.join(CFG.sessionsDir, 'research-' + task.id + '.txt');
    await fs.writeFile(dest, 'Query: ' + task.query + '\n\nSnippets:\n' + snippets + '\n\nAnalysis:\n' + analysis, 'utf8');

    return { taskId: task.id, label: task.label, research: (analysis || '').slice(0, 200), file: dest };
  }

  if (task.type === 'gmb_post') {
    // Generate post text with Gemma 3
    const postText = await gemma(
      SYSTEM,
      'Write a Google Business Profile post for AB Minerals about:\n' + task.topic + '\n\n' +
      'Rules: Under 300 chars. Start with the primary keyword. Sound professional, not spammy. Include a call to action. Output ONLY the post text.',
    );

    if (!postText || postText.length < 20) { log('WARN', 'Empty GBP post text'); return null; }

    const clean = postText.replace(/^["'`\s]+|["'`\s]+$/g, '');
    log('THINK', 'GBP post: "' + clean.slice(0, 100) + '"');

    const tokens = await readGMBTokens();
    if (!tokens || !tokens.accountId) {
      // GMB API not available — save draft for manual posting
      const draftFile = path.join(CFG.sessionsDir, 'gmb-drafts.txt');
      const entry = '[' + new Date().toISOString() + ']\n' + clean + '\n\n---\n\n';
      await fs.appendFile(draftFile, Buffer.from(entry, 'utf8'));
      log('WARN', 'Post drafted — paste manually at business.google.com');
      console.log('\n' + C.bold + C.cyan + '┌── GBP POST READY TO COPY ──────────────────────────┐' + C.reset);
      console.log(C.bold + clean + C.reset);
      console.log(C.cyan + '└ → business.google.com → your listing → Add update → paste above' + C.reset + '\n');
      return { taskId: task.id, label: task.label, after: clean, file: 'gmb-drafts.txt (draft)' };
    }

    if (!MODE_AUDIT) {
      await publishGMBPost(clean, task.cta);
      log('WRITE', 'Published to Google Business Profile');
    }

    return { taskId: task.id, label: task.label, after: clean, file: 'Google Business Profile' };
  }

  if (task.type === 'haro_scan') {
    log('THINK', 'Scanning HARO + SourceBottle for journalist queries...');
    const hits = await fetchHARO(task.keywords);

    const draftFile = path.join(CFG.sessionsDir, 'haro-responses.txt');

    if (hits.length === 0) {
      log('INFO', 'No matching HARO queries found this cycle');
      await fs.appendFile(draftFile, '[' + new Date().toISOString() + '] No matches\n', 'utf8');
      return { taskId: task.id, label: task.label, research: 'No matching HARO queries found' };
    }

    // Generate pitch drafts for each hit
    let allDrafts = '[' + new Date().toISOString() + ']\n\n';
    for (const hit of hits.slice(0, 3)) {
      const pitch = await gemma(
        SYSTEM,
        'A journalist is asking: "' + hit.title + '"\n' + hit.desc + '\n\n' +
        'Write a short, compelling expert pitch from AB Minerals (max 200 chars). Include the quarry-owner credential and a specific project reference. Output ONLY the pitch text.',
      );
      allDrafts += 'QUERY: ' + hit.title + '\nPITCH: ' + pitch + '\n\n---\n\n';
    }

    await fs.appendFile(draftFile, allDrafts, 'utf8');
    log('WRITE', hits.length + ' HARO pitches drafted: scripts/lavender-sessions/haro-responses.txt');

    return { taskId: task.id, label: task.label, research: hits.length + ' queries found', file: draftFile };
  }

  if (task.type === 'internal_link_audit') {
    log('THINK', 'Scanning source files for unlinked "lavender blue" mentions...');
    const results = await auditInternalLinks();

    const reportFile = path.join(CFG.sessionsDir, 'internal-link-audit.txt');
    const lines = ['Internal Link Audit — ' + new Date().toISOString(), ''];
    if (results.length === 0) {
      lines.push('All "lavender blue" mentions appear to be linked. Great!');
    } else {
      lines.push('Files with unlinked "Lavender Blue" mentions:');
      for (const r of results) {
        lines.push('  ' + r.file + ' — ' + r.unlinked + ' unlinked mention(s) of ' + r.totalMentions + ' total');
      }
      lines.push('');
      lines.push('Fix: ensure every plain-text "Lavender Blue" mention links to /stones/lavender-blue');
    }

    await fs.writeFile(reportFile, lines.join('\n'), 'utf8');
    log('WRITE', results.length + ' files with unlinked mentions → scripts/lavender-sessions/internal-link-audit.txt');

    return { taskId: task.id, label: task.label, research: results.length + ' files with unlinked mentions', file: reportFile };
  }

  if (task.type === 'directory_data') {
    log('THINK', 'Generating directory submission data package...');

    const description = await gemma(
      SYSTEM,
      'Write a 150-char business description for AB Minerals for industry directory listings. Must include: Lavender Blue granite, quarry owner, Berhampur Odisha, direct supply. Output ONLY the description.',
    );

    const data = {
      name:        'A B Minerals Pvt Ltd',
      category:    'Granite Quarry & Manufacturer',
      address:     'Berhampur, Ganjam, Odisha, India — 760001',
      factory:     'Chamakhandi, Odisha, India',
      phone:       '+91 [your number]',
      website:     'https://www.abminerals.com',
      email:       'info@abminerals.com',
      description: (description || '').replace(/^["'`\s]+|["'`\s]+$/g, ''),
      keywords:    [
        'Lavender Blue granite', 'Blue Lavender granite', 'granite quarry owner India',
        'granite manufacturer Odisha', 'lavender blue granite price', 'granite supplier India',
        'granite exporter India', 'natural stone India',
      ],
      directories: [
        { name: 'IndiaMART',       url: 'https://www.indiamart.com/proddetail/', priority: 1, note: 'highest India traffic for stone buyers' },
        { name: 'TradeIndia',      url: 'https://www.tradeindia.com/',           priority: 1, note: 'major B2B directory' },
        { name: 'Justdial',        url: 'https://www.justdial.com/',             priority: 1, note: 'local Indian search — high GMB-like authority' },
        { name: 'Stone World',     url: 'https://www.stoneworld.com/',           priority: 2, note: 'industry publication directory' },
        { name: 'MSME Odisha',     url: 'https://msme.odisha.gov.in/',           priority: 2, note: 'govt directory — trusted backlink' },
        { name: 'Alibaba',         url: 'https://www.alibaba.com/',              priority: 2, note: 'essential for export buyers' },
        { name: 'GlobalStonePortal',url:'https://www.globalstoneindustry.com/', priority: 2, note: 'stone-specific global directory' },
        { name: 'Export Portal',   url: 'https://www.exportportal.com/',        priority: 3, note: 'international B2B' },
      ],
    };

    const destFile = path.join(CFG.sessionsDir, 'directory-submission-data.json');
    await fs.writeFile(destFile, JSON.stringify(data, null, 2), 'utf8');
    log('WRITE', 'Directory data saved: scripts/lavender-sessions/directory-submission-data.json');
    log('INFO', 'Submit to IndiaMART, TradeIndia, and Justdial first — highest ROI');

    return { taskId: task.id, label: task.label, after: data.description, file: destFile };
  }

  log('WARN', 'Unknown task type: ' + task.type);
  return null;
}

// ─── HTML report ──────────────────────────────────────────────────────────────

async function generateReport(state) {
  const rows = (state.changes || []).slice(-50).map((c, i) => {
    const file  = (c.file  || '') + (c.field ? ' → ' + c.field : '');
    const before = (c.before || c.research || '').slice(0, 110);
    const after  = (c.after  || '').slice(0, 110);
    return '<tr><td>' + (i+1) + '</td><td><code>' + file + '</code></td><td class="before">' + before + '</td><td class="after">' + after + '</td></tr>';
  }).join('\n');

  const html = [
    '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8">',
    '<title>LAVENDER Agent — AB Minerals SEO</title>',
    '<style>',
    'body{font-family:system-ui;max-width:1100px;margin:40px auto;padding:0 20px;color:#1a1a2e}',
    'h1{color:#7B8FA0;border-bottom:3px solid #7B8FA0;padding-bottom:8px}',
    '.stats{display:flex;gap:16px;margin:20px 0}',
    '.stat{background:#f0f4f8;border-radius:8px;padding:16px 24px;text-align:center;flex:1}',
    '.stat b{display:block;font-size:2em;color:#7B8FA0}',
    'table{width:100%;border-collapse:collapse;font-size:.9em;margin-top:20px}',
    'th{background:#7B8FA0;color:#fff;padding:10px;text-align:left}',
    'td{padding:8px 10px;border-bottom:1px solid #e2e8f0;vertical-align:top}',
    '.before{color:#999;max-width:280px;word-break:break-word}',
    '.after{color:#1a6f2a;font-weight:600;max-width:280px;word-break:break-word}',
    'code{background:#f0f4f8;padding:2px 6px;border-radius:4px;font-size:.82em}',
    '</style></head><body>',
    '<h1>LAVENDER — Digital Marketing Agent</h1>',
    '<p>Generated: ' + new Date().toLocaleString() + ' | Model: ' + CFG.model + '</p>',
    '<div class="stats">',
    '<div class="stat"><b>' + (state.changes || []).length + '</b>Fields Improved</div>',
    '<div class="stat"><b>' + (state.completedTaskIds || []).length + '</b>Tasks Done</div>',
    '<div class="stat"><b>' + (TASKS.length - (state.completedTaskIds || []).length) + '</b>Tasks Remaining</div>',
    '<div class="stat"><b>' + (state.lastRun ? new Date(state.lastRun).toLocaleDateString() : '—') + '</b>Last Run</div>',
    '</div>',
    '<table><thead><tr><th>#</th><th>Field</th><th>Before</th><th>After (Gemma 3)</th></tr></thead>',
    '<tbody>' + (rows || '<tr><td colspan="4" style="text-align:center;padding:24px;color:#999">No changes yet</td></tr>') + '</tbody>',
    '</table></body></html>',
  ].join('\n');

  await fs.mkdir(CFG.sessionsDir, { recursive: true });
  await fs.writeFile(CFG.reportFile, html, 'utf8');
  log('INFO', 'Report: ' + path.relative(ROOT, CFG.reportFile));
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  await fs.mkdir(CFG.sessionsDir, { recursive: true });
  await fs.mkdir(CFG.backupDir,   { recursive: true });
  _logStream = createWriteStream(CFG.logFile, { flags: 'a' });

  console.log('\n' + C.bold + C.cyan + '╔══════════════════════════════════════════════════╗');
  console.log('║   LAVENDER  —  Digital Marketing Manager         ║');
  console.log('║   Gemma 3 4B (local Ollama)  ·  abminerals.com  ║');
  console.log('╚══════════════════════════════════════════════════╝' + C.reset + '\n');

  if (MODE_RESET) {
    await saveState(JSON.parse(JSON.stringify(EMPTY_STATE)));
    log('INFO', 'Session reset');
    process.exit(0);
  }

  if (MODE_SETUP_GMB) {
    log('INFO', 'To enable Google Business Profile auto-posting, run the setup script:');
    log('INFO', '  node scripts/setup-gmb.mjs');
    log('INFO', 'This needs a Google Cloud project with Business Profile API enabled.');
    log('INFO', 'Instructions: https://developers.google.com/my-business/content/prereqs');
    process.exit(0);
  }

  const state = await loadState();

  if (MODE_STATUS) {
    const pending = TASKS.filter(function(t) { return !(state.completedTaskIds || []).includes(t.id); });
    log('INFO', 'Done: ' + (state.completedTaskIds || []).length + '/' + TASKS.length + ' tasks');
    log('INFO', 'Changes: ' + (state.changes || []).length);
    log('INFO', 'Next: ' + (pending[0] ? pending[0].label : '(all done — will cycle)'));
    process.exit(0);
  }

  if (MODE_AUDIT) log('WARN', 'AUDIT mode — no files will be modified');

  // Verify Ollama
  try {
    const r = await fetch(CFG.ollamaUrl + '/api/tags', { signal: AbortSignal.timeout(15_000) });
    if (!r.ok) throw new Error('HTTP ' + r.status);
    log('INFO', 'Ollama connected', CFG.model);
  } catch (e) {
    log('ERR', 'Cannot reach Ollama: ' + e.message);
    log('ERR', 'Start with: ollama serve');
    process.exit(1);
  }

  // Loop
  while (true) {
    state.lastRun = new Date().toISOString();

    const pending = TASKS.filter(function(t) { return !(state.completedTaskIds || []).includes(t.id); });
    if (pending.length === 0) {
      log('INFO', 'All tasks done — cycling');
      state.completedTaskIds = [];
    }

    const task = pending.length > 0 ? pending[0] : TASKS[0];

    try {
      const result = await runTask(task);
      state.completedTaskIds = (state.completedTaskIds || []);
      state.completedTaskIds.push(task.id);
      if (result) {
        state.changes = (state.changes || []);
        state.changes.push(Object.assign({}, result, { ts: new Date().toISOString() }));
        log('DONE', task.label);
      } else {
        log('WARN', 'Task produced no change: ' + task.label);
      }
    } catch (e) {
      log('ERR', 'Task failed: ' + e.message);
    }

    await saveState(state);
    await generateReport(state);

    if (MODE_ONCE || MODE_AUDIT) {
      log('INFO', 'Exiting');
      break;
    }

    log('INFO', 'Waiting ' + (CFG.loopIntervalMs / 60000) + ' min...');
    await new Promise(function(resolve) { setTimeout(resolve, CFG.loopIntervalMs); });
  }

  if (_logStream) _logStream.end();
}

main().catch(function(e) {
  console.error(C.red + 'Fatal: ' + e.message + C.reset);
  process.exit(1);
});
