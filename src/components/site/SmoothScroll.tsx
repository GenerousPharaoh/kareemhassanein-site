'use client';

import Lenis from 'lenis';
import { useEffect } from 'react';
import { getGsap } from '@/lib/gsap';
import { prefersReducedMotion, subscribeMotionPreference } from '@/lib/useReducedMotion';

let instance: Lenis | null = null;

/** The running Lenis instance, when weighted scrolling is on (desktop pointers, motion allowed). */
export const getLenis = () => instance;

/**
 * Weighted, eased scrolling for mouse wheels and trackpads, on the same clock as GSAP so every
 * scroll-linked scene moves in step with it. Touch screens and reduced motion keep native scrolling.
 * Lenis follows native scroll changes (Next's scroll restoration, the keyboard, find-in-page) on its own.
 */
export function SmoothScroll() {
  // Scrolling moves the page under a resting pointer. Until the pointer itself moves again, html carries
  // data-scrolling and hover effects that would otherwise light up by themselves hold back.
  // While the page is actually moving, html also carries data-scroll-moving and the page ignores the
  // pointer (globals.css): rows and buttons gliding under a resting cursor would otherwise light up and
  // go out one after another, which reads as the content flickering. It clears a moment after the last
  // scroll event, so a click once the page has settled lands as usual.
  useEffect(() => {
    const root = document.documentElement;
    let settle = 0;
    const onScroll = () => {
      if (!root.hasAttribute('data-scrolling')) root.setAttribute('data-scrolling', '');
      if (!root.hasAttribute('data-scroll-moving')) root.setAttribute('data-scroll-moving', '');
      window.clearTimeout(settle);
      settle = window.setTimeout(() => root.removeAttribute('data-scroll-moving'), 160);
    };
    const onMove = (e: PointerEvent) => {
      if ((e.movementX || e.movementY) && root.hasAttribute('data-scrolling')) root.removeAttribute('data-scrolling');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.clearTimeout(settle);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('pointermove', onMove);
      root.removeAttribute('data-scrolling');
      root.removeAttribute('data-scroll-moving');
    };
  }, []);

  useEffect(() => {
    const query = window.matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)');
    let lenis: Lenis | null = null;
    const { gsap, ScrollTrigger } = getGsap();
    const tick = (time: number) => lenis?.raf(time * 1000);

    const start = () => {
      if (lenis) return;
      lenis = new Lenis({ lerp: 0.105, anchors: true, stopInertiaOnNavigate: true });
      instance = lenis;
      if (document.documentElement.style.overflow === 'hidden') lenis.stop();
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
    const sync = () => (query.matches && !prefersReducedMotion() ? start() : stop());

    // Keyboard focus and browser scrolling can move the page between animation frames.
    // Read that position before Lenis measures an anchor, otherwise its destination is offset.
    const syncAnchor = (event: MouseEvent) => {
      if (!lenis || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
      const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[href]') : null;
      if (!link || link.hasAttribute('download') || (link.target && link.target !== '_self')) return;
      const url = new URL(link.href);
      if (url.origin === location.origin && url.pathname === location.pathname && url.search === location.search && url.hash) {
        lenis.scrollTo(window.scrollY, { immediate: true, force: true });
      }
    };

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
    const unsubscribePreference = subscribeMotionPreference(sync);
    document.addEventListener('click', syncAnchor, true);
    return () => {
      query.removeEventListener('change', sync);
      unsubscribePreference();
      document.removeEventListener('click', syncAnchor, true);
      observer.disconnect();
      window.clearTimeout(resizeTimer);
      stop();
    };
  }, []);

  return null;
}
