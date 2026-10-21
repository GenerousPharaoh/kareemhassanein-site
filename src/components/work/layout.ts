import type { Loop, Still } from '@/lib/media';
import type { Pair } from '@/content/cases';

/** Width over height. */
export const ratio = (m: { w: number; h: number }) => m.w / m.h;

/** A capture of a whole 1440 by 900 browser window, which reads best inside a browser frame. */
export const isWindow = (m: { w: number; h: number }) => Math.abs(ratio(m) - 1.6) < 0.02;

/** A long horizontal slice of a page, which needs a row to itself. */
export const isStrip = (m: { w: number; h: number }) => ratio(m) >= 2.4;

export type Shot = { kind: 'loop'; media: Loop } | { kind: 'still'; media: Still };

/**
 * Desktop captures arranged in rows whose items share one height: each item's width is
 * proportional to its aspect ratio, so nothing is cropped and every row lines up.
 * Strips get a row each. With an odd number of the rest, one wide capture leads alone.
 */
export function shotRows(shots: Shot[]): Shot[][] {
  const strips = shots.filter((s) => isStrip(s.media));
  const rest = shots.filter((s) => !isStrip(s.media));
  const rows: Shot[][] = [];
  if (rest.length % 2 === 1) {
    const lead = ratio(rest[0].media) >= 1.5 ? rest[0] : rest.reduce((a, b) => (ratio(b.media) > ratio(a.media) ? b : a));
    rows.push([lead]);
    rest.splice(rest.indexOf(lead), 1);
  }
  for (let i = 0; i < rest.length; i += 2) rows.push(rest.slice(i, i + 2));
  strips.forEach((s) => rows.push([s]));
  return rows;
}

/**
 * Before and after comparisons in rows: each phone comparison sits beside the desktop one
 * it belongs with (or the next free one), and the remaining desktop comparisons pair up,
 * with a single leftover given the full width.
 */
export function pairRows(pairs: Pair[]): Pair[][] {
  const desk = pairs.filter((p) => p.after.device === 'desktop');
  const phone = pairs.filter((p) => p.after.device === 'phone');
  const rows: Pair[][] = [];
  const used = new Set<Pair>();
  // The page a comparison shows, from its file name: ".../home-hero--phone-ba" is "home-hero".
  const page = (p: Pair) => p.after.src.replace(/--(desktop|phone)(-ba)?$/, '');
  for (const ph of phone) {
    const match = desk.find((d) => !used.has(d) && page(d) === page(ph)) ?? desk.find((d) => !used.has(d));
    if (match) used.add(match);
    rows.push(match ? [match, ph] : [ph]);
  }
  const left = desk.filter((d) => !used.has(d));
  if (left.length === 1) rows.push(left);
  else for (let i = 0; i < left.length; i += 2) rows.push(left.slice(i, i + 2));
  // Keep the comparisons in the order the case lists them.
  const first = (row: Pair[]) => Math.min(...row.map((p) => pairs.indexOf(p)));
  return rows.sort((a, b) => first(a) - first(b));
}

/** An honest sizes attribute for an item that takes `share` of a row in the 1240px container. */
export function rowSizes(share: number, stackBelow = 700): string {
  const px = Math.round(share * 1240);
  const vw = Math.max(1, Math.round(share * 100));
  return `(min-width: 1280px) ${px}px, (min-width: ${stackBelow}px) ${vw}vw, calc(100vw - 40px)`;
}
