'use client';

import { useRef, type ReactNode } from 'react';
import { getGsap, useGsap } from '@/lib/gsap';

/**
 * A block whose children come up one after another as it enters the screen: quick, once. The element
 * itself keeps its class and layout; only its children move.
 */
export function Rise({ children, className }: { children: ReactNode; className?: string }) {
  const root = useRef<HTMLDivElement>(null);
  useGsap(root, ({ reduce }) => {
    if (reduce) return;
    const el = root.current!;
    getGsap().gsap.fromTo(
      el.children,
      { y: 30, opacity: 0.01 },
      { y: 0, opacity: 1, duration: 0.7, ease: 'expo.out', stagger: 0.06, clearProps: 'transform,opacity', scrollTrigger: { trigger: el, start: 'top 88%', once: true } },
    );
  });
  return (
    <div ref={root} className={className}>
      {children}
    </div>
  );
}
