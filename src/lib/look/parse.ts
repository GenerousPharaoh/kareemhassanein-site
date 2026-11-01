// Reading a page's HTML without a browser: enough structure for the first look, no more.
// Everything here is regular expressions over text, tolerant of broken markup.

export type Anchor = { href: string; text: string; onclick: string };
export type Img = { src: string; alt: string | null; sized: boolean; lazy: boolean };

export type Parsed = {
  title: string | null;
  lang: string | null;
  metas: Map<string, string>;
  canonical: string | null;
  viewport: string | null;
  robotsMeta: string | null;
  generator: string | null;
  h1: string[];
  anchors: Anchor[];
  forms: number;
  images: Img[];
  scriptSrcs: string[];
  inlineScript: string;
  stylesheets: number;
  jsonLd: unknown[];
  /** The visible words, roughly: tags, scripts and styles removed. */
  text: string;
};

const NAMED: Record<string, string> = {
  amp: '&', lt: '<', gt: '>', quot: '"', apos: '’', nbsp: ' ', ndash: '–', mdash: '—', hellip: '…', rsquo: '’', lsquo: '‘', ldquo: '“', rdquo: '”',
  copy: '©', reg: '®', trade: '™', bull: '•', middot: '·', laquo: '«', raquo: '»', eacute: 'é', egrave: 'è', ccedil: 'ç', agrave: 'à', ocirc: 'ô', ouml: 'ö', uuml: 'ü', auml: 'ä',
};

const decode = (s: string) =>
  s
    .replace(/&#(\d+);/g, (_m, n: string) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_m, n: string) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&([a-z]+);/gi, (m, name: string) => NAMED[name.toLowerCase()] ?? m)
    .replace(/&#39;/g, '’');

const attr = (tag: string, name: string): string | null => {
  const m = new RegExp(`\\s${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s"'>]+))`, 'i').exec(tag);
  if (!m) return null;
  return decode(m[1] ?? m[2] ?? m[3] ?? '').trim();
};

const strip = (html: string) => decode(html.replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ').trim();

export function parse(html: string): Parsed {
  const head = html.slice(0, 400_000);
  const titleMatch = /<title[^>]*>([\s\S]*?)<\/title>/i.exec(head);
  const htmlTag = /<html\b[^>]*>/i.exec(head)?.[0] ?? '';

  const metas = new Map<string, string>();
  for (const m of head.matchAll(/<meta\b[^>]*>/gi)) {
    const tag = m[0];
    const key = (attr(tag, 'name') ?? attr(tag, 'property') ?? '').toLowerCase();
    const content = attr(tag, 'content');
    if (key && content !== null && !metas.has(key)) metas.set(key, content);
  }

  let canonical: string | null = null;
  let stylesheets = 0;
  for (const m of head.matchAll(/<link\b[^>]*>/gi)) {
    const rel = (attr(m[0], 'rel') ?? '').toLowerCase().split(/\s+/);
    if (rel.includes('canonical') && !canonical) canonical = attr(m[0], 'href');
    if (rel.includes('stylesheet')) stylesheets++;
  }

  const h1 = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) => strip(m[1])).filter(Boolean);

  const anchors: Anchor[] = [];
  for (const m of html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)) {
    const tag = `<a${m[1]}>`;
    anchors.push({ href: attr(tag, 'href') ?? '', text: strip(m[2]).slice(0, 120), onclick: attr(tag, 'onclick') ?? '' });
    if (anchors.length > 600) break;
  }
  // Buttons that act as links, with the page's own script behind them
  for (const m of html.matchAll(/<button\b([^>]*)>([\s\S]*?)<\/button>/gi)) {
    const tag = `<button${m[1]}>`;
    anchors.push({ href: attr(tag, 'data-href') ?? attr(tag, 'formaction') ?? '', text: strip(m[2]).slice(0, 120), onclick: attr(tag, 'onclick') ?? '' });
    if (anchors.length > 800) break;
  }

  const forms = (html.match(/<form\b/gi) ?? []).length;

  const images: Img[] = [];
  for (const m of html.matchAll(/<img\b[^>]*>/gi)) {
    const tag = m[0];
    const style = attr(tag, 'style') ?? '';
    images.push({
      src: attr(tag, 'src') ?? attr(tag, 'data-src') ?? '',
      alt: attr(tag, 'alt'),
      sized: (attr(tag, 'width') !== null && attr(tag, 'height') !== null) || /aspect-ratio|height\s*:/i.test(style),
      lazy: (attr(tag, 'loading') ?? '').toLowerCase() === 'lazy',
    });
    if (images.length > 400) break;
  }

  const scriptSrcs: string[] = [];
  const inline: string[] = [];
  const jsonLd: unknown[] = [];
  for (const m of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
    const tag = `<script${m[1]}>`;
    const type = (attr(tag, 'type') ?? '').toLowerCase();
    const src = attr(tag, 'src');
    if (type === 'application/ld+json') {
      try {
        const data: unknown = JSON.parse(m[2].trim());
        if (Array.isArray(data)) jsonLd.push(...data);
        else if (data && typeof data === 'object' && Array.isArray((data as { '@graph'?: unknown[] })['@graph'])) jsonLd.push(...(data as { '@graph': unknown[] })['@graph']);
        else if (data) jsonLd.push(data);
      } catch {
        // Broken JSON-LD is itself a finding; recorded as a parse failure below
        jsonLd.push({ '@type': '__invalid__' });
      }
      continue;
    }
    if (src) scriptSrcs.push(src);
    else if (m[2].trim()) inline.push(m[2]);
  }

  const text = strip(
    html
      .replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style\b[\s\S]*?<\/style>/gi, ' ')
      .replace(/<noscript\b[\s\S]*?<\/noscript>/gi, ' ')
      .replace(/<svg\b[\s\S]*?<\/svg>/gi, ' ')
      .replace(/<!--[\s\S]*?-->/g, ' '),
  );

  return {
    title: titleMatch ? strip(titleMatch[1]) : null,
    lang: attr(htmlTag, 'lang'),
    metas,
    canonical,
    viewport: metas.get('viewport') ?? null,
    robotsMeta: metas.get('robots') ?? metas.get('googlebot') ?? null,
    generator: metas.get('generator') ?? null,
    h1,
    anchors,
    forms,
    images,
    scriptSrcs,
    inlineScript: inline.join('\n'),
    stylesheets,
    jsonLd,
    text,
  };
}

/** Every @type in the structured data, flattened, with nested nodes included. */
export function schemaTypes(nodes: unknown[]): string[] {
  const types: string[] = [];
  const walk = (node: unknown, depth: number) => {
    if (!node || typeof node !== 'object' || depth > 4) return;
    if (Array.isArray(node)) {
      node.forEach((n) => walk(n, depth));
      return;
    }
    const obj = node as Record<string, unknown>;
    const t = obj['@type'];
    if (typeof t === 'string') types.push(t);
    else if (Array.isArray(t)) t.forEach((x) => typeof x === 'string' && types.push(x));
    for (const key of Object.keys(obj)) {
      if (key.startsWith('@')) continue;
      walk(obj[key], depth + 1);
    }
  };
  nodes.forEach((n) => walk(n, 0));
  return types;
}
