import { BA, LOOPS, STILLS } from '@/content/media.generated';

export type Device = 'desktop' | 'phone';

export type Still = {
  src: string;
  w: number;
  h: number;
  widths: number[];
  alt: string;
  device: Device;
};

export type Loop = {
  src: string;
  poster: string;
  w: number;
  h: number;
  label: string;
  device: Device;
  /** A page's opening sequence: it plays once and holds its last frame, since repeating reads as the page reloading. */
  once?: boolean;
};

/** Loops that are a site's opening on a full load, not a moment that can repeat. */
const OPENINGS = new Set(['travel-journal/opening--desktop', 'wedding/opening--desktop', 'wedding/opening--phone', 'tax-relief-counsel/hero-arrive--desktop', 'tax-relief-counsel/hero-arrive--phone']);

const deviceOf = (key: string): Device => (key.includes('--phone') ? 'phone' : 'desktop');

/** A responsive still from public/work-media, by its "case/name" key. */
export function still(key: string, alt: string): Still {
  const info = STILLS[key];
  if (!info) throw new Error(`No still named ${key}; add it to scripts/work-assets.mjs and run npm run assets`);
  return { src: `/work-media/${key}`, ...info, alt, device: deviceOf(key) };
}

/** The before-and-after copy of a still (same framing as its pair). */
export function baStill(key: string, alt: string): Still {
  const info = BA[key];
  if (!info) throw new Error(`No before-and-after still named ${key}`);
  return { src: `/work-media/${key}-ba`, ...info, alt, device: deviceOf(key) };
}

export function loop(key: string, label: string): Loop {
  const info = LOOPS[key];
  if (!info) throw new Error(`No loop named ${key}`);
  return { src: `/work-media/${key}.mp4`, poster: `/work-media/${key}-poster.webp`, w: info.w, h: info.h, label, device: deviceOf(key), ...(OPENINGS.has(key) ? { once: true } : {}) };
}
