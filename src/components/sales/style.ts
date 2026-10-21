import type { CSSProperties } from 'react';

/** CSS custom properties as an inline style. */
export const cssVars = (vars: Record<string, string | number>) => vars as CSSProperties;

/** The stagger index for a first-screen `data-enter` entrance. */
export const enterAt = (i: number) => cssVars({ '--i': i });

export { paletteVars } from '@/lib/palette';

/** "from $1,000 a month" split into its parts, so the figure can be set large and the words small. */
export function splitPrice(price: string) {
  const m = /^(from\s+)?(\$[\d,]+)(.*)$/.exec(price.trim());
  if (!m) return { from: false, figure: price, suffix: '' };
  return { from: Boolean(m[1]), figure: m[2], suffix: m[3].trim() };
}
