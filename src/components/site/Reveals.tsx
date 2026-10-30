'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { prefersReducedMotion, useReducedMotion } from '@/lib/useReducedMotion';

/**
 * Blocks marked data-reveal come up as they enter the screen: quick, once, a beat apart when several
 * arrive together. Whatever is already on screen when a page opens shows as it is. Without the
 * script, or with reduced motion, every block is simply there.
 */
export function Reveals() {
  const pathname = usePathname();
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || prefersReducedMotion()) return;
    const items = [...document.querySelectorAll<HTMLElement>('[data-reveal]:not([data-shown])')];
    const fold = window.innerHeight * 0.92;
    for (const el of items) {
      const box = el.getBoundingClientRect();
      if (box.top < fold && box.bottom > 0) el.setAttribute('data-shown', '');
    }
    document.documentElement.setAttribute('data-reveals', '');
    const io = new IntersectionObserver(
      (entries) => {
        let n = 0;
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const el = e.target as HTMLElement;
          el.style.transitionDelay = `${n++ * 70}ms`;
          el.setAttribute('data-shown', '');
          io.unobserve(el);
        }
      },
      { rootMargin: '0px 0px -8% 0px' },
    );
    items.forEach((el) => el.hasAttribute('data-shown') || io.observe(el));
    return () => {
      io.disconnect();
      document.documentElement.removeAttribute('data-reveals');
    };
  }, [pathname, reduce]);

  return null;
}
