'use client';

import { useRef, type ReactNode } from 'react';
import { getGsap, useGsap } from '@/lib/gsap';
import styles from './CaseStack.module.css';

/**
 * The cases as a deck. Each stops once it is fully on screen (a tall one by its foot, a short one under
 * the header) and the next slides up over it, while the one underneath sinks back and darkens.
 * With reduced motion they are a plain list.
 */
export function CaseStack({ children, className = '' }: { children: ReactNode; className?: string }) {
  const root = useRef<HTMLUListElement>(null);

  useGsap(root, ({ reduce }) => {
    if (reduce) return;
    const { gsap } = getGsap();
    const el = root.current!;
    const items = [...el.querySelectorAll<HTMLElement>(':scope > li')];
    const header = document.querySelector<HTMLElement>('body > header');
    // Where each card stops: under the header, or higher if it is taller than the space below it
    const stop = (item: HTMLElement) => Math.min((header?.offsetHeight ?? 64) + 16, window.innerHeight - item.offsetHeight - 16);
    const place = () => items.forEach((item) => item.style.setProperty('--stop', `${stop(item)}px`));
    place();
    el.setAttribute('data-stacking', '');

    items.slice(0, -1).forEach((item, i) => {
      const next = items[i + 1];
      const card = item.firstElementChild as HTMLElement | null;
      if (!card) return;
      gsap.fromTo(
        card,
        { scale: 1, '--shade': 0 },
        {
          scale: 0.92,
          '--shade': 0.5,
          ease: 'none',
          scrollTrigger: { trigger: next, start: 'top bottom', end: () => `top ${stop(next)}px`, scrub: true, invalidateOnRefresh: true },
        },
      );
    });

    const onResize = () => place();
    window.addEventListener('resize', onResize);
    window.addEventListener('content-resized', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('content-resized', onResize);
      el.removeAttribute('data-stacking');
      items.forEach((item) => item.style.removeProperty('--stop'));
    };
  });

  return (
    <ul ref={root} className={`${styles.stack} ${className}`}>
      {children}
    </ul>
  );
}
