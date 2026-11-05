// Reading a page's HTML without a browser: enough structure for the first look, no more.
// Tags are found in one forward pass with indexOf, never a regular expression across the document,
// so a hostile page of unclosed tags costs no more to read than a normal page of the same size.

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

/** A character reference outside Unicode stays as written rather than throwing. */
const fromCode = (code: number, raw: string) => (Number.isInteger(code) && code >= 0 && code <= 0x10ffff ? String.fromCodePoint(code) : raw);

const decode = (s: string) =>
  s
    .replace(/&#(\d+);/g, (m, n: string) => fromCode(Number(n), m))
    .replace(/&#x([0-9a-f]+);/gi, (m, n: string) => fromCode(parseInt(n, 16), m))
    .replace(/&([a-z]+);/gi, (m, name: string) => NAMED[name.toLowerCase()] ?? m)
    .replace(/&#39;/g, '’');

const attr = (tag: string, name: string): string | null => {
  const m = new RegExp(`\\s${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s"'>]+))`, 'i').exec(tag);
  if (!m) return null;
  return decode(m[1] ?? m[2] ?? m[3] ?? '').trim();
};

/** Tags replaced by spaces. Once no ">" remains there are no more tags, so the rest is kept as it stands. */
function withoutTags(html: string): string {
  const pieces: string[] = [];
  let at = 0;
  for (;;) {
    const open = html.indexOf('<', at);
    const close = open < 0 ? -1 : html.indexOf('>', open + 1);
    if (close < 0) {
      pieces.push(html.slice(at));
      return pieces.join(' ');
    }
    pieces.push(html.slice(at, open));
    at = close + 1;
  }
}

const strip = (html: string) => decode(withoutTags(html)).replace(/\s+/g, ' ').trim();

/** The document beside a lowercase copy of the same length, for finding tags in any case. */
type Doc = { html: string; lower: string };
const toDoc = (html: string): Doc => ({ html, lower: html.replace(/[A-Z]+/g, (m) => m.toLowerCase()) });

/** Whether a tag name ends at this character, so <a> and <a href> match "a" but <abbr> does not. */
const endsName = (code: number) =>
  !((code >= 48 && code <= 57) || (code >= 97 && code <= 122) || code === 45 || code === 58 || code === 95);

type Tag = { start: number; end: number; attrs: string };

function nextTag(doc: Doc, name: string, from: number): Tag | null {
  const needle = `<${name}`;
  let at = from;
  for (;;) {
    const start = doc.lower.indexOf(needle, at);
    if (start < 0) return null;
    const after = start + needle.length;
    if (!endsName(doc.lower.charCodeAt(after))) {
      at = after;
      continue;
    }
    const close = doc.lower.indexOf('>', after);
    // No ">" here means none further on either, so nothing later can be a tag
    if (close < 0) return null;
    return { start, end: close + 1, attrs: doc.html.slice(after, close) };
  }
}

function* tags(doc: Doc, name: string): Generator<Tag> {
  let at = 0;
  for (;;) {
    const tag = nextTag(doc, name, at);
    if (!tag) return;
    yield tag;
    at = tag.end;
  }
}

type Element = { start: number; stop: number; attrs: string; inner: string };

/** Each element from its opening tag to the first closing tag after it. Once one has no closing tag, no later one does. */
function* elements(doc: Doc, name: string): Generator<Element> {
  const closer = `</${name}`;
  let at = 0;
  for (;;) {
    const open = nextTag(doc, name, at);
    if (!open) return;
    let close = doc.lower.indexOf(closer, open.end);
    while (close >= 0 && !endsName(doc.lower.charCodeAt(close + closer.length))) close = doc.lower.indexOf(closer, close + closer.length);
    if (close < 0) return;
    const closeEnd = doc.lower.indexOf('>', close);
    const stop = closeEnd < 0 ? doc.html.length : closeEnd + 1;
    yield { start: open.start, stop, attrs: open.attrs, inner: doc.html.slice(open.end, close) };
    at = stop;
  }
}

function withoutElements(html: string, name: string): string {
  const pieces: string[] = [];
  let at = 0;
  for (const element of elements(toDoc(html), name)) {
    pieces.push(html.slice(at, element.start));
    at = element.stop;
  }
  pieces.push(html.slice(at));
  return pieces.join(' ');
}

function withoutComments(html: string): string {
  const pieces: string[] = [];
  let at = 0;
  for (;;) {
    const open = html.indexOf('<!--', at);
    const close = open < 0 ? -1 : html.indexOf('-->', open + 4);
    if (close < 0) {
      pieces.push(html.slice(at));
      return pieces.join(' ');
    }
    pieces.push(html.slice(at, open));
    at = close + 3;
  }
}

/** Long enough for any real link, short enough that the checks run over it stay cheap. */
const MAX_LINK = 2048;

export function parse(html: string): Parsed {
  const doc = toDoc(html);
  const head = toDoc(html.slice(0, 400_000));

  const titleElement = elements(head, 'title').next();
  const htmlTag = nextTag(head, 'html', 0);

  const metas = new Map<string, string>();
  for (const { attrs } of tags(head, 'meta')) {
    const key = (attr(attrs, 'name') ?? attr(attrs, 'property') ?? '').toLowerCase();
    const content = attr(attrs, 'content');
    if (key && content !== null && !metas.has(key)) metas.set(key, content);
  }

  let canonical: string | null = null;
  let stylesheets = 0;
  for (const { attrs } of tags(head, 'link')) {
    const rel = (attr(attrs, 'rel') ?? '').toLowerCase().split(/\s+/);
    if (rel.includes('canonical') && !canonical) canonical = attr(attrs, 'href');
    if (rel.includes('stylesheet')) stylesheets++;
  }

  const h1: string[] = [];
  for (const { inner } of elements(doc, 'h1')) {
    const text = strip(inner);
    if (text) h1.push(text);
  }

  const anchors: Anchor[] = [];
  for (const { attrs, inner } of elements(doc, 'a')) {
    anchors.push({ href: (attr(attrs, 'href') ?? '').slice(0, MAX_LINK), text: strip(inner).slice(0, 120), onclick: (attr(attrs, 'onclick') ?? '').slice(0, MAX_LINK) });
    if (anchors.length > 600) break;
  }
  // Buttons that act as links, with the page's own script behind them
  for (const { attrs, inner } of elements(doc, 'button')) {
    anchors.push({ href: (attr(attrs, 'data-href') ?? attr(attrs, 'formaction') ?? '').slice(0, MAX_LINK), text: strip(inner).slice(0, 120), onclick: (attr(attrs, 'onclick') ?? '').slice(0, MAX_LINK) });
    if (anchors.length > 800) break;
  }

  const forms = [...tags(doc, 'form')].length;

  const images: Img[] = [];
  for (const { attrs } of tags(doc, 'img')) {
    const style = attr(attrs, 'style') ?? '';
    images.push({
      src: attr(attrs, 'src') ?? attr(attrs, 'data-src') ?? '',
      alt: attr(attrs, 'alt'),
      sized: (attr(attrs, 'width') !== null && attr(attrs, 'height') !== null) || /aspect-ratio|height\s*:/i.test(style),
      lazy: (attr(attrs, 'loading') ?? '').toLowerCase() === 'lazy',
    });
    if (images.length > 400) break;
  }

  const scriptSrcs: string[] = [];
  const inline: string[] = [];
  const jsonLd: unknown[] = [];
  for (const { attrs, inner } of elements(doc, 'script')) {
    const type = (attr(attrs, 'type') ?? '').toLowerCase();
    const src = attr(attrs, 'src');
    if (type === 'application/ld+json') {
      try {
        const data: unknown = JSON.parse(inner.trim());
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
    else if (inner.trim()) inline.push(inner);
  }

  const text = strip(withoutComments(withoutElements(withoutElements(withoutElements(withoutElements(html, 'script'), 'style'), 'noscript'), 'svg')));

  return {
    title: titleElement.done ? null : strip(titleElement.value.inner),
    lang: htmlTag ? attr(htmlTag.attrs, 'lang') : null,
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
