'use client';

import { useRef, type ReactNode } from 'react';
import { getGsap, useGsap } from '@/lib/gsap';

/** A screen settles onto its stage as it enters the viewport. Touch keeps the still composition. */
export function Exhibit({ children, className }: { children: ReactNode; className?: string }) {
  const root = useRef<HTMLDivElement>(null);
  useGsap(root, ({ reduce, mobile }) => {
    if (reduce || mobile) return;
    const target = root.current?.querySelector('[data-exhibit]');
    if (!target) return;
    getGsap().gsap.fromTo(target, { y: 60, scale: 0.96, rotationX: 4, transformPerspective: 1600 }, {
      y: 0, scale: 1, rotationX: 0, ease: 'none',
      scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'top 30%', scrub: 0.3 },
    });
  });
  return <div ref={root} className={className}>{children}</div>;
}
