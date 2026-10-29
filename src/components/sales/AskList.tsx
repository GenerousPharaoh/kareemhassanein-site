'use client';

import { useRef } from 'react';
import { getGsap, useGsap } from '@/lib/gsap';
import styles from './AskList.module.css';

type Props = {
  id: string;
  title: string;
  /** What owners say, in their own words. */
  items: string[];
  note?: string;
};

/**
 * The problems owners bring, in their own words, large on a dark band. Each comes up to full
 * brightness as it reaches the middle of the screen.
 */
export function AskList({ id, title, items, note }: Props) {
  const root = useRef<HTMLElement>(null);

  useGsap(root, ({ reduce }) => {
    if (reduce) return;
    const { gsap } = getGsap();
    root.current!.querySelectorAll('[data-ask]').forEach((item) => {
      gsap.fromTo(item, { opacity: 0.18 }, { opacity: 1, ease: 'none', scrollTrigger: { trigger: item, start: 'top 85%', end: 'top 55%', scrub: true } });
    });
  });

  return (
    <section ref={root} className={`night section ${styles.section}`} aria-labelledby={id}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.head}>
          <h2 id={id} className={`t-h2 ${styles.title}`}>
            {title}
          </h2>
          {note ? <p className={styles.note}>{note}</p> : null}
        </div>
        <ul className={styles.list}>
          {items.map((q) => (
            <li key={q} className={styles.item} data-ask>
              <p className={styles.quote}>{q}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
