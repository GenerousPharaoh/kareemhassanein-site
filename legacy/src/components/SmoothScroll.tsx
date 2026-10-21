'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import useIsMobile from '@/hooks/useIsMobile';

// Site-wide inertial smooth scrolling. Skipped on mobile (native momentum is
// better there) and for reduced-motion users.
export default function SmoothScroll() {
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({ lerp: 0.1, duration: 1.1, anchors: { offset: -90 } });
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, [isMobile]);

  return null;
}
