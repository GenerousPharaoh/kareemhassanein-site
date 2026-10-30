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

/*
  Honest sizes attributes. The container is W = min(1240px, 100vw - 40px) wide (1240px from a
  1280px screen up), and a phone frame's screen is 95.2% of the frame inside its bezel.
*/

/**
 * An item that takes `share` of a row in the container, stacked full width below 700px.
 * `cap` is a solo item's own maximum width, when its shape keeps it narrower than the row.
 */
export function rowSizes(share: number, cap?: number): string {
  const px = Math.round(share * 1240);
  const vw = Math.max(1, Math.round(share * 100));
  const gutters = Math.round(share * 40);
  if (cap && cap < px) return `(min-width: 700px) min(${cap}px, calc(${vw}vw - ${gutters}px)), calc(100vw - 40px)`;
  return `(min-width: 1280px) ${px}px, (min-width: 700px) calc(${vw}vw - ${gutters}px), calc(100vw - 40px)`;
}

/**
 * The phone in the live case header, which copies the shared Plate's geometry (a phone
 * clamp(104px, 23%, 268px) wide on a container-wide plate), so it takes Plate's phone sizes.
 */
export const LIVE_PHONE_SIZES = '(min-width: 1205px) 255px, (min-width: 492px) calc(21.9vw - 9px), 99px';

/**
 * One phone in a row of `count` phones: min(64vw, 260px) each in a swipeable strip below 760px;
 * above that they share the container with gaps of clamp(20px, 3vw, 40px), at most 260px each.
 */
export function phoneRowSizes(count: number): string {
  const screen = 0.952;
  const wide = Math.min(260, (1240 - (count - 1) * 40) / count) * screen;
  const vw = (((1 - 0.03 * (count - 1)) / count) * screen * 100).toFixed(1);
  const px = ((40 / count) * screen).toFixed(1);
  return `(min-width: 1280px) ${Math.round(wide)}px, (min-width: 760px) min(248px, calc(${vw}vw - ${px}px)), (min-width: 406px) 248px, 61vw`;
}

/**
 * A before-and-after comparison. A phone one sits in a frame at most 340px wide with a 7px
 * bezel; beside a desktop one it takes its `share` of the row.
 */
export function pairSizes(device: 'desktop' | 'phone', share: number, solo: boolean): string {
  if (device === 'desktop') return rowSizes(share);
  const stacked = '(min-width: 380px) 326px, calc(100vw - 54px)';
  if (solo) return stacked;
  const px = Math.min(340, Math.round(share * 1240)) - 14;
  return `(min-width: 1280px) ${px}px, (min-width: 700px) min(326px, calc(${Math.round(share * 100)}vw - 14px)), ${stacked}`;
}
