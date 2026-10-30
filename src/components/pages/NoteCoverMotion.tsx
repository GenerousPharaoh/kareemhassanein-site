'use client';

import { useRef, type CSSProperties, type ReactNode } from 'react';
import { getGsap, useGsap } from '@/lib/gsap';
import styles from './NoteCover.module.css';

/** Only the entrance needs JavaScript; the cover's images are rendered on the server. */
export function NoteCoverMotion({ slug, className, children }: {
  slug: string;
  className?: string;
  children: ReactNode;
}) {
  const root = useRef<HTMLDivElement>(null);
  useGsap(root, ({ reduce }) => {
    if (reduce) return;
    const el = root.current!;
    const html = document.documentElement;
    const box = el.getBoundingClientRect();
    if (html.dataset.routeArrival === 'back') return;
    if (html.hasAttribute('data-route-arrival') && box.top < innerHeight && box.bottom > 0) return;
    const { gsap } = getGsap();
    const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 90%', once: true } });
    const radius = getComputedStyle(el).borderTopLeftRadius;
    tl.fromTo(el, { clipPath: `inset(22% 0% 0% 0% round ${radius})` }, { clipPath: `inset(0% 0% 0% 0% round ${radius})`, duration: 0.9, ease: 'expo.out', clearProps: 'clipPath' });
    tl.fromTo(
      el.querySelectorAll('[data-phone]'),
      { yPercent: 34, rotation: (i: number) => (i ? 5 : -5) },
      { yPercent: 0, rotation: 0, duration: 1, ease: 'expo.out', stagger: 0.08, clearProps: 'transform' },
      0.05,
    );
  });

  return (
    <div
      ref={root}
      className={`${styles.cover} ${className ?? ''}`}
      style={{ viewTransitionName: `note-cover-${slug}` } as CSSProperties}
      aria-hidden="true"
    >
      {children}
    </div>
  );
}
