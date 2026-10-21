import type { CSSProperties } from 'react';

/** Stagger index for a first-screen `data-enter` entrance. */
export const enter = (i: number) => ({ '--i': i }) as CSSProperties;
