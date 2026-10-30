'use client';

import { useRef, type HTMLAttributes, type ReactNode } from 'react';
import { getGsap, useGsap } from '@/lib/gsap';

type Props = {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'ul' | 'ol' | 'section';
  /** What comes up, when it is not the children: a selector inside the block. */
  items?: string;
} & Omit<HTMLAttributes<HTMLElement>, 'children' | 'className'>;

/**
 * A block whose children come up one after another as it enters the screen: quick, once. The element
 * itself keeps its class and layout; only its children move.
 */
export function Rise({ children, className, as: Tag = 'div', items, ...rest }: Props) {
  // One ref for whichever element this renders
  const root = useRef<HTMLDivElement & HTMLUListElement & HTMLOListElement & HTMLElement>(null);
  useGsap(root, ({ reduce }) => {
    if (reduce) return;
    const el = root.current!;
    getGsap().gsap.fromTo(
      items ? el.querySelectorAll(items) : el.children,
      { y: 30, opacity: 0.01 },
      { y: 0, opacity: 1, duration: 0.7, ease: 'expo.out', stagger: 0.06, clearProps: 'transform,opacity', scrollTrigger: { trigger: el, start: 'top 88%', once: true } },
    );
  });
  return (
    <Tag ref={root} className={className} {...rest}>
      {children}
    </Tag>
  );
}
