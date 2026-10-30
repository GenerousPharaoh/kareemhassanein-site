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
      gsap.fromTo(
        target,
        { y: 110, scale: 0.9, rotationX: 22, rotation: -5, transformPerspective: 1600, transformOrigin: '50% 100%' },
        { y: 0, scale: 1, rotationX: 0, rotation: 0, duration: 1.1, ease: 'expo.out', delay: 0.1 },
      );
      if (!mobile) {
        gsap.fromTo(
          wrap,
          { rotationX: 0, scale: 1, transformPerspective: 1600, transformOrigin: '50% 0%' },
          { rotationX: 9, scale: 0.95, ease: 'none', scrollTrigger: { trigger: wrap, start: 'top 35%', end: 'bottom top', scrub: true } },
        );
      }
      return;
    }
    // Elsewhere it swings up off the same tilt as it comes into view: quick, once
    gsap.fromTo(
      target,
      { y: 120, scale: 0.9, rotationX: 20, rotation: -4, transformPerspective: 1600, transformOrigin: '50% 100%' },
      { y: 0, scale: 1, rotationX: 0, rotation: 0, duration: 0.9, ease: 'expo.out', scrollTrigger: { trigger: wrap, start: 'top 88%', once: true } },
    );
  });
  return <div ref={root} className={className}>{children}</div>;
}
