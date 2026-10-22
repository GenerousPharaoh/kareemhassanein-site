'use client';

import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useLayoutEffect, useEffect, type RefObject } from 'react';

let registered = false;

/** GSAP with the plugins this site uses, registered once, in the browser only. */
export function getGsap() {
  if (!registered && typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger, SplitText, Flip);
    // Phones resize the viewport as the address bar slides; do not recalculate every scene for that.
    ScrollTrigger.config({ ignoreMobileResize: true });
    gsap.defaults({ ease: 'power3.out', duration: 0.9 });
    registered = true;
  }
  return { gsap, ScrollTrigger, SplitText, Flip };
}

const useIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

/**
 * Run GSAP setup scoped to a container, with automatic cleanup (every tween, ScrollTrigger and
 * SplitText made inside is reverted on unmount). The setup receives `reduce` so each component can
 * give reduced motion its own still state.
 */
export function useGsap(scope: RefObject<HTMLElement | null>, setup: (ctx: { reduce: boolean; mobile: boolean }) => void | (() => void), deps: unknown[] = []) {
  useIsoLayoutEffect(() => {
    const el = scope.current;
    if (!el) return;
    const { gsap: g } = getGsap();
    const mm = g.matchMedia(el);
    mm.add(
      {
        reduce: '(prefers-reduced-motion: reduce)',
        motion: '(prefers-reduced-motion: no-preference)',
        mobile: '(max-width: 760px)',
      },
      (context) => {
        const { reduce, mobile } = context.conditions as { reduce: boolean; mobile: boolean };
        return setup({ reduce, mobile });
      },
    );
    return () => mm.revert();
  }, deps);
}
