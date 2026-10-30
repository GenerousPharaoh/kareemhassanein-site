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
    const { gsap, ScrollTrigger } = getGsap();
    const el = root.current!;
    const items = [...el.querySelectorAll<HTMLElement>(':scope > li')];
    const header = document.querySelector<HTMLElement>('body > header');
    const filter = el.closest<HTMLElement>('[data-filter]');
    let currentFilter = filter?.dataset.filter;
    let visible: HTMLElement[] = [];
    let deck: ReturnType<typeof gsap.context> | undefined;
    // Where each card stops: under the header, or higher if it is taller than the space below it
    const stop = (item: HTMLElement) => Math.min((header?.offsetHeight ?? 64) + 16, window.innerHeight - item.offsetHeight - 16);
    const place = () => visible.forEach((item) => item.style.setProperty('--stop', `${stop(item)}px`));
    const rebuild = () => {
      // A hidden successor has no useful scroll position. Remove its old tween and shading,
      // then form the deck only from cards that still occupy space after filtering.
      deck?.revert();
      deck = undefined;
      el.removeAttribute('data-stacking');
      items.forEach((item) => item.style.removeProperty('--stop'));
      visible = items.filter((item) => item.getClientRects().length > 0);
      if (visible.length < 2) return;

      place();
      el.setAttribute('data-stacking', '');
      deck = gsap.context(() => {
        visible.slice(0, -1).forEach((item, i) => {
          const next = visible[i + 1];
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
      }, el);
    };
    rebuild();

    const observer = new MutationObserver(() => {
      // WorkFilter briefly changes the attribute to measure a transition, then restores it.
      // React's committed value is the only change that needs a new deck.
      if (filter?.dataset.filter === currentFilter) return;
      currentFilter = filter?.dataset.filter;
      rebuild();
      ScrollTrigger.refresh();
    });
    if (filter) observer.observe(filter, { attributes: true, attributeFilter: ['data-filter'] });

    const onResize = () => place();
    window.addEventListener('resize', onResize);
    window.addEventListener('content-resized', onResize);
    return () => {
      observer.disconnect();
      deck?.revert();
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
