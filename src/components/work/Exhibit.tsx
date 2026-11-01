'use client';

import { useRef, type ReactNode } from 'react';
import { getGsap, useGsap } from '@/lib/gsap';

/**
 * A screen comes up off the homepage wall's tilt to face the reader: as it enters the viewport, or
 * with arrive (a page's first screen) as the page opens, laying back a little as the page scrolls on.
 */
export function Exhibit({ children, className, arrive = false }: { children: ReactNode; className?: string; arrive?: boolean }) {
  const root = useRef<HTMLDivElement>(null);
  useGsap(root, ({ reduce, mobile }) => {
    if (reduce) return;
    const { gsap } = getGsap();
    const wrap = root.current;
    const target = wrap?.querySelector('[data-exhibit]');
    if (!wrap || !target) return;
    if (arrive) {
      if (!document.documentElement.hasAttribute('data-route-arrival')) gsap.fromTo(
        target,
        { y: 48, scale: 0.97, rotationX: 8, rotation: -1, transformPerspective: 1600, transformOrigin: '50% 100%' },
        { y: 0, scale: 1, rotationX: 0, rotation: 0, duration: 0.85, ease: 'power2.inOut', delay: 0.1 },
      );
      if (!mobile) {
        // Kept on its own layer for the whole scrub (force3D), so the screen is not re-rasterised every
        // frame and does not snap between renderings at either end of the range
        gsap.fromTo(
          wrap,
          { rotationX: 0, scale: 1, transformPerspective: 1600, transformOrigin: '50% 0%', force3D: true, willChange: 'transform' },
          { rotationX: 9, scale: 0.95, ease: 'none', force3D: true, scrollTrigger: { trigger: wrap, start: 'top 35%', end: 'bottom top', scrub: true } },
        );
      }
      return;
    }
    // A restored or incoming viewport is already composed before its route snapshot.
    const box = wrap.getBoundingClientRect();
    if (document.documentElement.hasAttribute('data-route-arrival') && box.top < innerHeight && box.bottom > 0) return;
    // A short, gently paced settle keeps the screen readable throughout its entrance.
    gsap.fromTo(
      target,
      { y: 48, scale: 0.97, rotationX: 8, rotation: -1, transformPerspective: 1600, transformOrigin: '50% 100%' },
      { y: 0, scale: 1, rotationX: 0, rotation: 0, duration: 0.85, ease: 'power2.inOut', scrollTrigger: { trigger: wrap, start: 'top 90%', once: true } },
    );
  });
  return <div ref={root} className={className}>{children}</div>;
}
