'use client';

import { useRef, type ReactNode } from 'react';
import { getGsap, useGsap } from '@/lib/gsap';

type Props = { children: ReactNode; className?: string; as?: 'div' | 'ul' | 'ol' };

/**
 * A block whose children come up one after another as it enters the screen: quick, once. The element
 * itself keeps its class and layout; only its children move.
 */
export function Rise({ children, className, as: Tag = 'div' }: Props) {
  // One ref for whichever of the three elements this renders
  const root = useRef<HTMLDivElement & HTMLUListElement & HTMLOListElement>(null);
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
    <Tag ref={root} className={className}>
      {children}
    </Tag>
  );
}
