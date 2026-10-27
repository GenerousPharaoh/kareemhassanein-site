'use client';

import Lenis from 'lenis';
import { useEffect } from 'react';
import { getGsap } from '@/lib/gsap';

let instance: Lenis | null = null;

/** The running Lenis instance, when weighted scrolling is on (desktop pointers, motion allowed). */
export const getLenis = () => instance;

/**
 * Weighted, eased scrolling for mouse wheels and trackpads, on the same clock as GSAP so every
 * scroll-linked scene moves in step with it. Touch screens and reduced motion keep native scrolling.
 * Lenis follows native scroll changes (Next's scroll restoration, the keyboard, find-in-page) on its own.
 */
export function SmoothScroll() {
  useEffect(() => {
    const query = window.matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)');
    let lenis: Lenis | null = null;
    const { gsap, ScrollTrigger } = getGsap();
    const tick = (time: number) => lenis?.raf(time * 1000);

    const start = () => {
      if (lenis) return;
      lenis = new Lenis({ lerp: 0.105, anchors: true, stopInertiaOnNavigate: true });
      instance = lenis;
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
    };
    const stop = () => {
      if (!lenis) return;
      gsap.ticker.remove(tick);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.destroy();
      lenis = null;
      instance = null;
    };
    const sync = () => (query.matches ? start() : stop());

    // Recalculate reading distances once an expanding section has settled.
    const main = document.getElementById('main');
    let height = main?.getBoundingClientRect().height ?? 0;
    let resizeTimer = 0;
    const refresh = () => {
      if (document.documentElement.hasAttribute('data-route-changing')) {
        resizeTimer = window.setTimeout(refresh, 120);
        return;
      }
      lenis?.resize();
      ScrollTrigger.refresh();
      window.dispatchEvent(new Event('content-resized'));
    };
    const observer = new ResizeObserver(([entry]) => {
      if (Math.abs(entry.contentRect.height - height) < 1) return;
      height = entry.contentRect.height;
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(refresh, 180);
    });
    if (main) observer.observe(main);

    sync();
    query.addEventListener('change', sync);
    return () => {
      query.removeEventListener('change', sync);
      observer.disconnect();
      window.clearTimeout(resizeTimer);
      stop();
    };
  }, []);

  return null;
}
