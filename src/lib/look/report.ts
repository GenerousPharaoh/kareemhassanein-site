// The first look: what can be read from a page in a few seconds, written the way the check is.
// Each line is a plain sentence; the ones worth a look point to the case where I found the same thing.
import { finding, type Finding } from '@/content/found';
import { fetchPage, fetchSmallText, LookError, normalizeAddress, type Hop } from './net';
import { parse, schemaTypes, type Anchor, type Parsed } from './parse';

export type Tone = 'look' | 'fine' | 'note';
export type Line = { tone: Tone; text: string; seen?: Finding };
export type GroupId = 'search' | 'phone' | 'booking' | 'counting' | 'wording';
export type Group = { id: GroupId; title: string; lines: Line[] };

export type Report = {
  requested: string;
  host: string;
  final: string;
  hops: Hop[];
  /** The site answered with a bot challenge instead of the page. */
  challenged: boolean;
  platform: string | null;
  groups: Group[];
  worth: number;
  fine: number;
  ms: number;
};

export { LookError, normalizeAddress };

const BOOKING_HOSTS: Array<[RegExp, string]> = [
  [/janeapp\.com$/, 'Jane'],
  [/calendly\.com$/, 'Calendly'],
  [/acuityscheduling\.com$|squarespacescheduling\.com$/, 'Acuity'],
  [/squareup\.com$/, 'Square Appointments'],
  [/zocdoc\.com$/, 'Zocdoc'],
  [/nexhealth\.com$/, 'NexHealth'],
  [/localmed\.com$/, 'LocalMed'],
  [/clio\.com$/, 'Clio'],
  [/lawmatics\.com$/, 'Lawmatics'],
  [/setmore\.com$/, 'Setmore'],
  [/simplybook\.(me|it)$/, 'SimplyBook'],
  [/cliniko\.com$/, 'Cliniko'],
  [/mindbodyonline\.com$/, 'Mindbody'],
  [/vagaro\.com$/, 'Vagaro'],
  [/gethealthie\.com$/, 'Healthie'],
  [/tebra\.com$|patientpop\.com$/, 'Tebra'],
  [/noterro\.com$/, 'Noterro'],
  [/hubspot\.com$/, 'HubSpot'],
  [/cal\.com$/, 'Cal.com'],
  [/booksy\.com$/, 'Booksy'],
  [/opencare\.com$/, 'Opencare'],
  [/dentrixascend\.com$|ascend\.dentrix\.com$/, 'Dentrix Ascend'],
  [/mychart\.[a-z.]+$/, 'MyChart'],
  [/ocean(md)?\.(ca|com)$|cognisantmd\.com$/, 'Ocean'],
];

const BOOK_WORDS = /\b(book|booking|appointment|schedule|scheduling|consult|consultation|get started|request a|reserve)\b/i;
// A label that asks for the booking, at its start: "Book a call", "Request a consultation"
const BOOK_ASK = /^(book\b|schedule\b|reserve\b|request a\b|get started\b|make an? |appointments?\b|consult)/i;
const isShort = (text: string) => text.trim().split(/\s+/).length <= 5;
/** About booking, rather than only mentioning it: a logo line or a menu entry's description does not count. */
const isBookingLabel = (text: string) => BOOK_WORDS.test(text) && (BOOK_ASK.test(text.trim()) || isShort(text));
const DEAD_HREF = /^(#!?|javascript:(void\(0\);?|;)?|)$/i;
const MAPS = /(^|\.)google\.[a-z.]+\/maps|maps\.app\.goo\.gl|goo\.gl\/maps|g\.page\//i;
const PHONE_TEXT = /(?:\+?1[\s.-]?)?\(?\b\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}\b/;
const PRIVACY = /privacy/i;

const BUSINESS_TYPES = new Set([
  'LocalBusiness', 'MedicalBusiness', 'MedicalClinic', 'MedicalOrganization', 'Physiotherapy', 'Dentist', 'Physician', 'HealthAndBeautyBusiness',
  'LegalService', 'Attorney', 'ProfessionalService', 'Organization', 'Corporation', 'Store', 'OnlineStore', 'Hospital', 'Pharmacy', 'DaySpa', 'Optician',
]);

// The words colleges and law societies restrict or question outright, then the ones that only invite a second read
const WORDS: Array<[label: string, pattern: RegExp, strong: boolean]> = [
  ['specialist', /\bspeciali[sz](?:t|ts|e|es|ed|ing|ation)\b/gi, true],
  ['expert', /\bexperts?\b/gi, true],
  ['advanced', /\badvanced\b/gi, true],
  ['guarantee', /\bguarantee[sd]?\b/gi, true],
  ['number one', /(?:\B#1\b|\bnumber one\b|\bno\.\s?1\b)/gi, true],
  ['cure', /\bcures?\b|\bcured\b/gi, true],
  ['pain-free', /\bpain[\s-]free\b/gi, true],
  ['state-of-the-art', /\bstate[\s-]of[\s-]the[\s-]art\b/gi, true],
  ['cutting-edge', /\bcutting[\s-]edge\b/gi, true],
  ['world-class', /\bworld[\s-]class\b/gi, true],
  ['top-rated', /\btop[\s-]rated\b/gi, true],
  ['award-winning', /\baward[\s-]winning\b/gi, true],
  ['best', /\bbest\b/gi, false],
  ['leading', /\bleading\b/gi, false],
];

const bare = (host: string) => host.toLowerCase().replace(/^www\./, '');

const plural = (n: number, one: string, many = `${one}s`) => `${n} ${n === 1 ? one : many}`;

function platformOf(html: string, p: Parsed, headers: Record<string, string>): string | null {
  const gen = (p.generator ?? '').toLowerCase();
  const srcs = p.scriptSrcs.join('\n');
  if (gen.includes('wordpress') || /wp-content\/|wp-includes\//.test(html)) return /elementor/i.test(html) ? 'WordPress, with Elementor' : /divi/i.test(html) ? 'WordPress, with Divi' : 'WordPress';
  if (gen.includes('wix') || /static\.wixstatic\.com|parastorage\.com/.test(html)) return 'Wix';
  if (gen.includes('squarespace') || /static1\.squarespace\.com|squarespace\.com/.test(html)) return 'Squarespace';
  if (/cdn\.shopify\.com|Shopify\.theme/.test(html)) return 'Shopify';
  if (gen.includes('webflow') || /website-files\.com|webflow\.js/.test(srcs + html)) return 'Webflow';
  if (gen.includes('framer') || /framerusercontent\.com/.test(html)) return 'Framer';
  if (/wsimg\.com/.test(html) || gen.includes('godaddy')) return 'GoDaddy Website Builder';
  if (/weebly/.test(html)) return 'Weebly';
  if (/duda(?:mobile)?\.com|cdn-cms\.f-static/.test(html)) return 'Duda';
  if (gen.includes('hubspot') || /hs-sites\.com|hubspotusercontent/.test(html)) return 'HubSpot';
  if (/\/_next\//.test(html)) return 'Next.js';
  if (/\/_nuxt\//.test(html)) return 'Nuxt';
  if (gen.includes('gatsby')) return 'Gatsby';
  if (gen.includes('hugo')) return 'Hugo';
  if (gen.includes('joomla')) return 'Joomla';
  if (gen.includes('drupal') || /\/sites\/default\/files\//.test(html)) return 'Drupal';
  if (headers['x-powered-by']?.toLowerCase().includes('express')) return null;
  return null;
}

type RobotsFile = { found: boolean; blocksAll: boolean; sitemap: boolean };

async function readRobots(origin: string): Promise<RobotsFile | null> {
  try {
    const { status, contentType, text } = await fetchSmallText(`${origin}/robots.txt`);
    if (status < 200 || status >= 300) return { found: false, blocksAll: false, sitemap: false };
    if (contentType.includes('html')) return { found: false, blocksAll: false, sitemap: false };
    const lines = text.split(/\r?\n/).map((l) => l.replace(/#.*/, '').trim()).filter(Boolean);
    let agentAll = false;
    let blocksAll = false;
    for (const line of lines) {
      const [key, ...rest] = line.split(':');
      const value = rest.join(':').trim();
      const k = key.toLowerCase();
      if (k === 'user-agent') agentAll = value === '*';
      else if (k === 'disallow' && agentAll && value === '/') blocksAll = true;
      else if (k === 'allow' && agentAll && value === '/') blocksAll = false;
    }
    return { found: true, blocksAll, sitemap: /^sitemap:/im.test(text) };
  } catch {
    return null;
  }
}

function challenged(status: number, headers: Record<string, string>, p: Parsed): boolean {
  if (headers['cf-mitigated'] === 'challenge' || headers['x-vercel-mitigated'] === 'challenge') return true;
  const title = (p.title ?? '').toLowerCase();
  if (/just a moment|attention required|security checkpoint|access denied|are you a human|verify you are human|bot verification/.test(title)) return true;
  return (status === 403 || status === 503 || status === 429) && /cloudflare|captcha|challenge|verify you are human/i.test(p.text.slice(0, 2000));
}

function bookingLines(p: Parsed, finalUrl: URL, lines: Line[]) {
  const site = bare(finalUrl.hostname);
  const here = finalUrl.pathname.replace(/\/$/, '');
  const destinations = new Map<string, string>();
  const dead: Anchor[] = [];
  // The site's own booking pages, by address: how many links reach each, and whether any of them asks outright
  const internal = new Map<string, { count: number; asks: boolean }>();
  for (const a of p.anchors) {
    const href = a.href.trim();
    const bookish = isBookingLabel(a.text);
    let host = '';
    try {
      host = /^(https?:)?\/\//i.test(href) ? new URL(href, finalUrl).hostname.toLowerCase() : '';
    } catch {
      host = '';
    }
    const known = BOOKING_HOSTS.find(([re]) => re.test(host));
    if (known) destinations.set(known[1], host);
    else if (bookish) {
      if (DEAD_HREF.test(href) && !a.onclick) dead.push(a);
      else if (host && bare(host) !== site && !/facebook|instagram|google|twitter|linkedin|youtube|tiktok/.test(host)) destinations.set(host, host);
      else if (href && !DEAD_HREF.test(href) && !/^(tel|mailto|sms|javascript):/i.test(href)) {
        try {
          const target = new URL(href, finalUrl);
          const samePage = target.pathname.replace(/\/$/, '') === here;
          if (target.hash || !samePage) {
            const path = samePage ? `${target.pathname}${target.hash}` : `${target.pathname}${target.search}`;
            const seen = internal.get(path);
            const asks = BOOK_ASK.test(a.text.trim());
            internal.set(path, { count: (seen?.count ?? 0) + 1, asks: Boolean(seen?.asks) || asks });
          }
        } catch {
          // An address that cannot be read is not a booking page
        }
      }
    }
  }

  if (destinations.size) {
    const list = [...destinations].map(([name, host]) => (name === host ? host : `${name} (${host})`)).join(', ');
    lines.push({ tone: 'fine', text: `Booking goes to ${list}.` });
  } else if (internal.size) {
    const [path] = [...internal].sort(([, a], [, b]) => Number(b.asks) - Number(a.asks) || b.count - a.count)[0];
    lines.push({ tone: 'fine', text: `Booking starts on the site’s own page: ${path.slice(0, 60)}.` });
  }
  if (dead.length) {
    const label = dead[0].text.length > 32 ? `${dead[0].text.slice(0, 32)}…` : dead[0].text;
    lines.push({ tone: 'look', text: `“${label}” links to nothing${dead.length > 1 ? `, and so ${dead.length === 2 ? 'does one more' : `do ${dead.length - 1} others`}` : ''}.`, seen: finding('physiomax', 'Book Appointment linked') });
  }

  const tel = p.anchors.some((a) => /^tel:/i.test(a.href));
  const phoneInText = PHONE_TEXT.test(p.text);

  if (!destinations.size && !internal.size && !dead.length) {
    if (p.forms) lines.push({ tone: 'fine', text: `Requests come through ${plural(p.forms, 'form')} on the page.` });
    else if (!tel) lines.push({ tone: 'look', text: 'No booking link, no form and no tappable phone number: there is no way in from this page.' });
    else lines.push({ tone: 'note', text: 'No booking link or form on this page; the phone is the only way in.' });
  } else if (p.forms) {
    lines.push({ tone: 'note', text: `${plural(p.forms, 'form')} on the page as well.` });
  }

  if (tel) lines.push({ tone: 'fine', text: 'The phone number is tappable.' });
  else if (phoneInText) lines.push({ tone: 'look', text: 'The phone number is written on the page but is not tappable on a phone.' });
  else lines.push({ tone: 'note', text: 'No phone number on this page.' });

  const privacy = p.anchors.some((a) => PRIVACY.test(a.text) || /privacy/i.test(a.href));
  if (p.forms && !privacy) lines.push({ tone: 'look', text: 'Forms on the page, and no privacy policy linked from it.', seen: finding('physiomax', 'There was no privacy policy') });
  else if (privacy) lines.push({ tone: 'fine', text: 'A privacy policy is linked.' });

  return { destinations, tel };
}

function countingLines(p: Parsed, destinations: Map<string, string>, lines: Line[]) {
  const code = `${p.scriptSrcs.join('\n')}\n${p.inlineScript}\n${p.anchors.map((a) => a.onclick).join('\n')}`;
  const ga4 = [...new Set(code.match(/\bG-[A-Z0-9]{6,12}\b/g) ?? [])];
  const ua = [...new Set(code.match(/\bUA-\d{4,10}-\d{1,3}\b/g) ?? [])];
  const gtmIds = [...new Set(code.match(/\bGTM-[A-Z0-9]{4,10}\b/g) ?? [])];
  const aw = [...new Set(code.match(/\bAW-\d{6,12}\b/g) ?? [])];
  const loaders = new Map<string, number>();
  for (const m of code.matchAll(/\(\s*window\s*,\s*document\s*,\s*['"]script['"]\s*,\s*['"][^'"]*['"]\s*,\s*['"](GTM-[A-Z0-9]+)['"]\s*\)/g)) loaders.set(m[1], (loaders.get(m[1]) ?? 0) + 1);
  for (const m of code.matchAll(/googletagmanager\.com\/gtm\.js\?id=(GTM-[A-Z0-9]+)/g)) loaders.set(m[1], (loaders.get(m[1]) ?? 0) + 1);

  if (ga4.length) lines.push({ tone: 'fine', text: `Google Analytics is on the page (${ga4.join(', ')}).` });
  if (gtmIds.length) {
    const twice = gtmIds.filter((id) => (loaders.get(id) ?? 0) >= 2);
    if (twice.length) lines.push({ tone: 'look', text: `Tag Manager ${twice.join(' and ')} loads ${loaders.get(twice[0])} times on the page, so what it carries can count twice.`, seen: finding('techniques-combat', 'The tag manager') });
    else lines.push({ tone: 'fine', text: `Tag Manager is on the page (${gtmIds.join(', ')}).` });
  }
  if (!ga4.length && !gtmIds.length) {
    if (ua.length) lines.push({ tone: 'look', text: `Only an old Universal Analytics tag (${ua[0]}), which stopped collecting in 2023. Nothing is being counted.` });
    else lines.push({ tone: 'look', text: 'No Google Analytics and no Tag Manager on the page: nothing is being counted.', seen: finding('physiomax', 'There was no analytics') });
  } else if (ua.length) {
    lines.push({ tone: 'note', text: `An old Universal Analytics tag (${ua[0]}) is still on the page; it stopped collecting in 2023.` });
  }
  if (aw.length) lines.push({ tone: 'note', text: `A Google Ads tag is on the page (${aw.join(', ')}).` });
  if (/gtag_report_conversion|gtag\(\s*['"]event['"]\s*,\s*['"]conversion['"]/.test(code)) {
    lines.push({ tone: 'look', text: 'A Google Ads conversion fires on a click, so a click counts as a lead.', seen: finding('tax-relief-counsel', 'Most of the conversions') });
  }
  if (/fbq\(\s*['"]init['"]|connect\.facebook\.net\/[^'"\s]{0,160}fbevents\.js/.test(code)) lines.push({ tone: 'note', text: 'A Meta pixel is on the page.' });
  if (/clarity\.ms/.test(code)) lines.push({ tone: 'note', text: 'Microsoft Clarity records visits on the page.' });
  if (/static\.hotjar\.com/.test(code)) lines.push({ tone: 'note', text: 'Hotjar records visits on the page.' });
  if ((ga4.length || gtmIds.length) && destinations.size) {
    const [name] = [...destinations.keys()];
    lines.push({ tone: 'note', text: `Booking happens on ${name}’s own address. Unless Analytics treats the two sites as one visit, a booking that began with an ad is credited to your own site.` });
  }
}

function searchLines(p: Parsed, finalUrl: URL, robots: RobotsFile | null, lines: Line[]) {
  if (p.title) lines.push({ tone: p.title.length > 65 ? 'note' : 'fine', text: p.title.length > 65 ? `The title runs long (${p.title.length} characters), so Google will cut it: “${p.title}”.` : `Title: “${p.title}”.` });
  else lines.push({ tone: 'look', text: 'No title on the page.' });
  const description = p.metas.get('description');
  if (description) lines.push({ tone: 'fine', text: 'A description is set for search results.' });
  else lines.push({ tone: 'look', text: 'No description, so Google writes its own from whatever it finds on the page.' });

  if (p.robotsMeta && /noindex/i.test(p.robotsMeta)) lines.push({ tone: 'look', text: 'The page asks Google not to index it.' });
  if (robots?.blocksAll) lines.push({ tone: 'look', text: 'robots.txt blocks every crawler from the whole site.' });
  else if (robots?.sitemap) lines.push({ tone: 'fine', text: 'A sitemap is listed for crawlers.' });
  else if (robots && !robots.found) lines.push({ tone: 'note', text: 'No robots.txt; Google crawls regardless.' });

  if (p.canonical) {
    try {
      const canon = new URL(p.canonical, finalUrl);
      if (bare(canon.hostname) !== bare(finalUrl.hostname)) lines.push({ tone: 'look', text: `The canonical address points to another site: ${canon.hostname}.` });
      else if (canon.pathname.replace(/\/$/, '') !== finalUrl.pathname.replace(/\/$/, '')) lines.push({ tone: 'note', text: `The canonical address is ${canon.pathname}.` });
    } catch {
      lines.push({ tone: 'note', text: 'The canonical address could not be read.' });
    }
  } else lines.push({ tone: 'note', text: 'No canonical address set.' });

  const types = schemaTypes(p.jsonLd);
  if (types.includes('__invalid__')) lines.push({ tone: 'look', text: 'Structured data on the page that does not parse, so Google ignores it.' });
  const business = p.jsonLd.filter((n) => {
    const t = (n as { '@type'?: unknown })['@type'];
    const list = typeof t === 'string' ? [t] : Array.isArray(t) ? t : [];
    return list.some((x) => typeof x === 'string' && BUSINESS_TYPES.has(x));
  }) as Array<{ name?: unknown; '@id'?: unknown }>;
  const names = new Set(business.map((b) => (typeof b.name === 'string' ? b.name.trim().toLowerCase() : '')).filter(Boolean));
  const shown = [...new Set(types.filter((t) => t !== '__invalid__'))].slice(0, 4);
  if (names.size >= 2) lines.push({ tone: 'look', text: `Two business records in the structured data, under different names (${[...names].map((n) => `“${n}”`).join(' and ')}).` });
  else if (shown.length) lines.push({ tone: 'fine', text: `Structured data: ${shown.join(', ')}.` });
  else lines.push({ tone: 'note', text: 'No structured data, so nothing on the page tells Google which business this is.' });

  if (p.anchors.some((a) => MAPS.test(a.href))) lines.push({ tone: 'fine', text: 'Links to its Google profile or map.' });
  else lines.push({ tone: 'note', text: 'No link to a Google profile or map on this page.' });
  if (!p.lang) lines.push({ tone: 'note', text: 'No language set on the page.' });
}

function phoneLines(p: Parsed, fetched: { bytes: number; wait: number; truncated: boolean }, platform: string | null, lines: Line[]) {
  if (p.viewport) lines.push({ tone: 'fine', text: 'A phone layout is set. This does not show how the page looks on a phone.' });
  else lines.push({ tone: 'look', text: 'No viewport setting, so a phone shows the desktop layout shrunk down.' });

  const kb = Math.round(fetched.bytes / 1024);
  const scripts = p.scriptSrcs.length;
  const heavy = scripts >= 20 || fetched.bytes >= 500_000 || p.images.length >= 60;
  const parts = [`${kb}${fetched.truncated ? '+' : ''} KB of HTML`, plural(scripts, 'script file'), plural(p.stylesheets, 'stylesheet'), plural(p.images.length, 'image')];
  lines.push(heavy
    ? { tone: 'look', text: `Heavy for a first page: ${parts.join(', ')}.`, seen: finding('techniques-combat', 'The home page’s largest paint') }
    : { tone: 'note', text: `${parts.join(', ')}.` });

  const unsized = p.images.filter((i) => !i.sized).length;
  if (p.images.length >= 5 && unsized > p.images.length / 2) lines.push({ tone: 'look', text: `${unsized} of ${p.images.length} images have no set size, so the page jumps as they load.` });
  else if (unsized) lines.push({ tone: 'note', text: `${unsized} of ${p.images.length} images have no set size.` });
  const noAlt = p.images.filter((i) => i.alt === null).length;
  if (noAlt) lines.push({ tone: 'note', text: `${plural(noAlt, 'image')} without alt text.` });

  if (p.h1.length === 0) lines.push({ tone: 'look', text: 'No main heading (h1) on the page.' });
  else if (p.h1.length > 1) lines.push({ tone: 'note', text: `${p.h1.length} main headings; Google reads the first, “${p.h1[0].slice(0, 60)}”.` });

  const s = (fetched.wait / 1000).toFixed(1);
  if (fetched.wait > 1500) lines.push({ tone: 'look', text: `Slow to answer: ${s} s before the first byte of the page.` });
  else lines.push({ tone: 'fine', text: `The server answers in ${s} s.` });
  if (platform) lines.push({ tone: 'note', text: `Built on ${platform}.` });
}

function wordingLines(p: Parsed, lines: Line[]) {
  const hits: Array<[string, number, boolean]> = [];
  for (const [label, re, strong] of WORDS) {
    const n = (p.text.match(re) ?? []).length;
    if (n) hits.push([label, n, strong]);
  }
  hits.sort((a, b) => Number(b[2]) - Number(a[2]) || b[1] - a[1]);
  const list = (items: typeof hits) => items.slice(0, 6).map(([label, n]) => `“${label}”${n > 1 ? ` (${n})` : ''}`).join(', ');
  if (hits.some((h) => h[2])) {
    lines.push({ tone: 'look', text: `Words a college or law society may question: ${list(hits)}.` });
  } else if (hits.length) {
    lines.push({ tone: 'note', text: `Worth a read against your rules: ${list(hits)}.` });
  } else {
    lines.push({ tone: 'fine', text: 'None of the words colleges and law societies usually question.' });
  }
}

function transportLines(requested: URL, finalUrl: URL, hops: Hop[], lines: Line[]) {
  if (finalUrl.protocol !== 'https:') lines.push({ tone: 'look', text: 'The page is served without https.' });
  else if (hops.some((h) => h.url.startsWith('https:')) && requested.protocol === 'https:' && bare(requested.hostname) !== bare(finalUrl.hostname)) {
    lines.push({ tone: 'note', text: `${requested.hostname} sends visitors on to ${finalUrl.hostname}.` });
  }
  if (hops.length > 2) lines.push({ tone: 'note', text: `${hops.length} redirects before the page, each one a wait.` });
}

/** Read one address and write up what the page shows. Throws a LookError when it cannot be read. */
export async function look(address: string): Promise<Report> {
  const started = Date.now();
  const fetched = await fetchPage(address);
  const requested = new URL(fetched.requested);
  const finalUrl = new URL(fetched.final);
  const p = parse(fetched.html);
  const platform = platformOf(fetched.html, p, fetched.headers);

  if (challenged(fetched.status, fetched.headers, p)) {
    return {
      requested: fetched.requested, host: bare(requested.hostname), final: fetched.final, hops: fetched.hops, challenged: true, platform,
      groups: [], worth: 0, fine: 0, ms: Date.now() - started,
    };
  }
  if (fetched.status >= 400) throw new LookError('unreachable', `The site answered with an error (${fetched.status}) instead of the page.`);

  const robots = await readRobots(finalUrl.origin);

  const search: Line[] = [];
  const phone: Line[] = [];
  const booking: Line[] = [];
  const counting: Line[] = [];
  const wording: Line[] = [];
  transportLines(requested, finalUrl, fetched.hops, search);
  searchLines(p, finalUrl, robots, search);
  phoneLines(p, fetched, platform, phone);
  const { destinations } = bookingLines(p, finalUrl, booking);
  countingLines(p, destinations, counting);
  wordingLines(p, wording);

  const groups: Group[] = [
    { id: 'search', title: 'What Google sees', lines: search },
    { id: 'phone', title: 'On a phone', lines: phone },
    { id: 'booking', title: 'Booking or intake', lines: booking },
    { id: 'counting', title: 'What is counted', lines: counting },
    { id: 'wording', title: 'Wording', lines: wording },
  ];
  const all = groups.flatMap((g) => g.lines);
  return {
    requested: fetched.requested,
    host: bare(requested.hostname),
    final: fetched.final,
    hops: fetched.hops,
    challenged: false,
    platform,
    groups,
    worth: all.filter((l) => l.tone === 'look').length,
    fine: all.filter((l) => l.tone === 'fine').length,
    ms: Date.now() - started,
  };
}
