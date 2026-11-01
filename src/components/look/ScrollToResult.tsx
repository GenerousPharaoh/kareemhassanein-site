'use client';

import { useEffect } from 'react';
import { getLenis } from '@/components/site/SmoothScroll';
import { prefersReducedMotion } from '@/lib/useReducedMotion';

/** While the fallback is on screen the document is marked, so the field can show it is still reading. */
export function LookingMark() {
  useEffect(() => {
    document.documentElement.setAttribute('data-looking', '');
    return () => document.documentElement.removeAttribute('data-looking');
  }, []);
  return null;
}

/** When a result arrives below the fold (a phone, mostly), bring its heading into view. */
export function ScrollToResult() {
  useEffect(() => {
    const el = document.querySelector<HTMLElement>('[data-result]');
    if (!el) return;
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight * 0.55) return;
    const offset = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 80;
    const y = window.scrollY + top - offset;
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(y, { immediate: prefersReducedMotion() });
    else window.scrollTo({ top: y, behavior: prefersReducedMotion() ? 'instant' : 'smooth' });
  }, []);
  return null;
}
