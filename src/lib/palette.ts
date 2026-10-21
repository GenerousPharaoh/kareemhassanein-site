import type { CSSProperties } from 'react';
import type { Palette } from '@/content/cases';

type Rgb = [number, number, number];

const parse = (hex: string): Rgb => {
  const h = hex.replace('#', '');
  const full = h.length === 3 ? [...h].map((c) => c + c).join('') : h.slice(0, 6);
  const n = parseInt(full, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};

const toHex = ([r, g, b]: Rgb) => '#' + [r, g, b].map((v) => Math.round(v).toString(16).padStart(2, '0')).join('');

const channel = (v: number) => {
  const s = v / 255;
  return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
};

const luminance = ([r, g, b]: Rgb) => 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);

const contrast = (a: Rgb, b: Rgb) => {
  const [x, y] = [luminance(a), luminance(b)].sort((m, n) => n - m);
  return (x + 0.05) / (y + 0.05);
};

/** Whether a palette's ground is dark, so frames and shadows can be tuned for it. */
export function toneOf(p: Palette): 'dark' | 'light' {
  return luminance(parse(p.ground)) < 0.3 ? 'dark' : 'light';
}

/**
 * The client's accent, moved toward the band's ink just far enough to read as small text
 * (4.5:1 against the ground). Large accents keep the client's exact colour.
 */
export function accentText(p: Palette): string {
  const ground = parse(p.ground);
  const accent = parse(p.accent);
  const ink = parse(p.ink.startsWith('#') ? p.ink : toneOf(p) === 'dark' ? '#ffffff' : '#000000');
  for (let t = 0; t <= 1.0001; t += 0.02) {
    const mixed: Rgb = [0, 1, 2].map((i) => accent[i] + (ink[i] - accent[i]) * t) as Rgb;
    if (contrast(mixed, ground) >= 4.5) return toHex(mixed);
  }
  return p.ink;
}

/** A client's palette as custom properties (--case-ground, --case-ink, ...), set on the element that owns the band. */
export function paletteVars(p: Palette): CSSProperties {
  return {
    '--case-ground': p.ground,
    '--case-ink': p.ink,
    '--case-muted': p.muted,
    '--case-rule': p.rule,
    '--case-accent': p.accent,
    '--case-accent-text': accentText(p),
  } as CSSProperties;
}
