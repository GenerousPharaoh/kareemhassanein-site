// Read Google Analytics and Search Console for this site without a browser.
//
//   node scripts/google-data.mjs ga  '<runReport body as JSON>'
//   node scripts/google-data.mjs gsc '<searchAnalytics query body as JSON>'
//   node scripts/google-data.mjs inspect <page address>      (how Google has indexed one page)
//   node scripts/google-data.mjs sitemaps
//   node scripts/google-data.mjs ads "<GAQL query>" [customer id]   (reads only)
//   node scripts/google-data.mjs check
//
// A body may also be a path to a .json file. Results print as JSON.
//
// Analytics and Search Console sign in as the site's read-only reporting
// account; Google Ads signs in with Kareem's own access and only ever sends
// queries. Neither key is in this repository: on his laptop they are read from
// his user folder, and in a cloud session from the environment's
// GOOGLE_SA_KEY_B64 and GOOGLE_ADS_ADC_B64 variables (each key file, base64
// encoded). When one is missing, the commands that need it say so and stop.
//
// What has no programmatic route at all: Search Console's "Request indexing"
// button. Ads customer id: none for this site.
//
// Before quoting a number, read what CLAUDE.md and .claude/notes say about
// this site's data (bot traffic, what each conversion really counts).
import { createSign } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import { homedir } from 'node:os';
import path from 'node:path';

const GA_PROPERTY = '';
const GSC_SITE = 'sc-domain:khassanein.bio';
const ADS_CUSTOMER = '';
const HOME_COUNTRY = 'Canada';
const ADS_VERSION = 'v25';
const SCOPES = [
  'https://www.googleapis.com/auth/analytics.readonly',
  'https://www.googleapis.com/auth/webmasters.readonly',
];

function loadKey() {
  if (process.env.GOOGLE_SA_KEY_B64) {
    return JSON.parse(Buffer.from(process.env.GOOGLE_SA_KEY_B64.trim(), 'base64').toString('utf8'));
  }
  const candidates = [
    process.env.GOOGLE_APPLICATION_CREDENTIALS,
    path.join(homedir(), '.config', 'gcloud', 'kinetikare-mcp-sa.json'),
  ].filter(Boolean);
  for (const file of candidates) {
    if (existsSync(file)) return JSON.parse(readFileSync(file, 'utf8'));
  }
  return null;
}

function loadAdsKey() {
  if (process.env.GOOGLE_ADS_ADC_B64) {
    return JSON.parse(Buffer.from(process.env.GOOGLE_ADS_ADC_B64.trim(), 'base64').toString('utf8'));
  }
  const file = path.join(homedir(), '.config', 'gcloud', 'google-ads-adc.json');
  return existsSync(file) ? JSON.parse(readFileSync(file, 'utf8')) : null;
}

async function adsToken(key) {
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      client_id: key.client_id,
      client_secret: key.client_secret,
      refresh_token: key.refresh_token,
    }),
  });
  const json = await res.json();
  if (!res.ok) {
    throw new Error(
      `Google Ads sign-in failed (${res.status}): ${json.error_description || json.error}. If the access was revoked, it has to be renewed on the laptop.`
    );
  }
  return json.access_token;
}

// Reads only: this sends a query, never a change.
async function adsSearch(key, query, customer = ADS_CUSTOMER) {
  const token = await adsToken(key);
  const id = String(customer).split('-').join('').trim();
  const rows = [];
  let pageToken;
  do {
    const res = await fetch(`https://googleads.googleapis.com/${ADS_VERSION}/customers/${id}/googleAds:search`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`,
        'content-type': 'application/json',
        'x-goog-user-project': key.quota_project_id || 'kinetikare-marketing',
      },
      body: JSON.stringify({ query, pageToken }),
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok) {
      const detail = json.error?.details?.[0]?.errors?.[0]?.message || json.error?.message || 'no message';
      throw new Error(`Google Ads answered ${res.status}: ${detail}`);
    }
    rows.push(...(json.results || []));
    pageToken = json.nextPageToken;
  } while (pageToken && rows.length < 10000);
  return rows;
}

const b64url = (v) => Buffer.from(v).toString('base64url');

async function accessToken(key) {
  const now = Math.floor(Date.now() / 1000);
  const head = b64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const claims = b64url(
    JSON.stringify({
      iss: key.client_email,
      scope: SCOPES.join(' '),
      aud: 'https://oauth2.googleapis.com/token',
      iat: now,
      exp: now + 3000,
    })
  );
  const signature = createSign('RSA-SHA256').update(`${head}.${claims}`).sign(key.private_key).toString('base64url');
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: `${head}.${claims}.${signature}`,
    }),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(`Google sign-in failed (${res.status}): ${json.error_description || json.error}`);
  return json.access_token;
}

async function post(url, token, body) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { authorization: `Bearer ${token}`, 'content-type': 'application/json' },
    body: JSON.stringify(body),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`${url} answered ${res.status}: ${json.error?.message || 'no message'}`);
  return json;
}

const ga = (token, body) =>
  post(`https://analyticsdata.googleapis.com/v1beta/properties/${GA_PROPERTY}:runReport`, token, body);
const gsc = (token, body) =>
  post(`https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(GSC_SITE)}/searchAnalytics/query`, token, body);

function readBody(arg) {
  if (!arg) throw new Error('Give the request body as JSON or as a path to a .json file.');
  const text = existsSync(arg) ? readFileSync(arg, 'utf8') : arg;
  return JSON.parse(text);
}

const day = (offset) => new Date(Date.now() - offset * 86400000).toISOString().slice(0, 10);

const [what, arg, arg2] = process.argv.slice(2);
const noKey = (name) =>
  `On the laptop it is in the user folder; in a cloud session the environment needs ${name}. Tell Kareem; do not ask him to paste a key into the chat.`;
const adsKey = loadAdsKey();
const key = loadKey();

async function inspect(token, pageUrl) {
  const res = await post('https://searchconsole.googleapis.com/v1/urlInspection/index:inspect', token, {
    inspectionUrl: pageUrl.startsWith('http') ? pageUrl : new URL(pageUrl, 'https://www.khassanein.bio/').href,
    siteUrl: GSC_SITE,
  });
  return res.inspectionResult;
}

async function sitemaps(token) {
  const res = await fetch(`https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(GSC_SITE)}/sitemaps`, {
    headers: { authorization: `Bearer ${token}` },
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`Sitemaps answered ${res.status}: ${json.error?.message || 'no message'}`);
  return json.sitemap || [];
}

try {
  if (what === 'ads') {
    if (!adsKey) {
      console.error('No Google Ads access on this machine. ' + noKey('GOOGLE_ADS_ADC_B64'));
      process.exit(2);
    }
    if (!ADS_CUSTOMER && !arg2) throw new Error('This site has no Google Ads account; give a customer id as the last argument to read another one.');
    if (!arg) throw new Error('Give a GAQL query, for example: SELECT campaign.name, campaign.status FROM campaign');
    console.log(JSON.stringify(await adsSearch(adsKey, arg, arg2), null, 1));
    process.exit(0);
  }
  if (what === 'check') {
    if (!ADS_CUSTOMER) console.log('Google Ads: no account for this site.');
    else if (!adsKey) console.log('Google Ads: no access on this machine (GOOGLE_ADS_ADC_B64 is not set).');
    else {
      try {
        const rows = await adsSearch(adsKey, 'SELECT campaign.name, campaign.status FROM campaign');
        console.log(`Google Ads: ${rows.map((r) => `${r.campaign.name} is ${r.campaign.status}`).join('; ') || 'no campaigns'}.`);
      } catch (e) {
        console.log(`Google Ads: ${e.message}`);
      }
    }
  }
  if (!key) {
    console.error('No reporting key on this machine. ' + noKey('GOOGLE_SA_KEY_B64'));
    process.exit(2);
  }
  const token = await accessToken(key);
  if (what === 'ga' && !GA_PROPERTY) throw new Error('This site has no Analytics property this key can read.');
  if (what === 'ga') console.log(JSON.stringify(await ga(token, readBody(arg)), null, 1));
  else if (what === 'gsc') console.log(JSON.stringify(await gsc(token, readBody(arg)), null, 1));
  else if (what === 'inspect') console.log(JSON.stringify(await inspect(token, arg || '/'), null, 1));
  else if (what === 'sitemaps') console.log(JSON.stringify(await sitemaps(token), null, 1));
  else if (what === 'check') {
    if (GA_PROPERTY) {
      const a = await ga(token, {
        dateRanges: [{ startDate: '7daysAgo', endDate: 'yesterday' }],
        metrics: [{ name: 'sessions' }],
        dimensionFilter: { filter: { fieldName: 'country', stringFilter: { value: HOME_COUNTRY } } },
      });
      console.log(`Analytics: ${a.rows?.[0]?.metricValues?.[0]?.value ?? 0} sessions from ${HOME_COUNTRY} in the last 7 days.`);
    } else console.log('Analytics: this site has no property this key can read.');
    const s = await gsc(token, { startDate: day(10), endDate: day(3), dimensions: [], rowLimit: 1 });
    console.log(`Search Console: ${s.rows?.[0]?.clicks ?? 0} clicks, ${s.rows?.[0]?.impressions ?? 0} impressions in the 7 days to ${day(3)}.`);
  } else {
    console.error('Use: ga <body> | gsc <body> | inspect <page> | sitemaps | ads "<GAQL>" | check');
    process.exit(2);
  }
} catch (e) {
  console.error(String(e.message || e));
  process.exit(1);
}
