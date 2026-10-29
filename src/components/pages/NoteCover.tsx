'use client';

import { useRef, type CSSProperties } from 'react';
import { PhoneFrame } from '@/components/media/Frames';
import { Picture } from '@/components/media/Picture';
import type { CaseStudy } from '@/content/cases';
import { getGsap, useGsap } from '@/lib/gsap';
import { paletteVars } from '@/lib/palette';
import styles from './NoteCover.module.css';

type Props = {
  slug: string;
  cases: CaseStudy[];
  /** The phones' rendered width, as a sizes attribute. */
  sizes: string;
  priority?: boolean;
  className?: string;
};

/**
 * A note's cover: the practices it comes from, each on its own ground with its site on a phone rising
 * from the bottom edge. It keeps one name on the notes list and on the note, so opening a note
 * carries the cover into place.
 */
export function NoteCover({ slug, cases, sizes, priority = false, className }: Props) {
  const root = useRef<HTMLDivElement>(null);
  useGsap(root, ({ reduce }) => {
    if (reduce) return;
    const el = root.current!;
    const html = document.documentElement;
    const box = el.getBoundingClientRect();
    // Arriving from another page, a cover already on screen is flying into place or arriving with the
    // page; coming back, every cover is where it was left.
    if (html.dataset.routeArrival === 'back') return;
    if (html.hasAttribute('data-route-arrival') && box.top < innerHeight && box.bottom > 0) return;
    const { gsap } = getGsap();
    const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 90%', once: true } });
    tl.fromTo(el, { clipPath: 'inset(22% 0% 0% 0% round 22px)' }, { clipPath: 'inset(0% 0% 0% 0% round 22px)', duration: 0.9, ease: 'expo.out', clearProps: 'clipPath' });
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
      {cases.map((c) => (
        <div key={c.slug} className={styles.half} style={paletteVars(c.palette)}>
          <div className={styles.phone} data-phone>
            <PhoneFrame>
              <Picture media={{ ...c.plate.phone, alt: '' }} sizes={sizes} priority={priority} />
            </PhoneFrame>
          </div>
        </div>
      ))}
    </div>
  );
}
