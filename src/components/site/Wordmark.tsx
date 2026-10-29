'use client';

import { useRef } from 'react';
import { getGsap, useGsap } from '@/lib/gsap';
import styles from './Footer.module.css';

/** The name as wide as the page; its two words stand up from the line as the footer comes into view. */
export function Wordmark({ text }: { text: string }) {
  const root = useRef<HTMLParagraphElement>(null);
  useGsap(root, ({ reduce }) => {
    if (reduce) return;
    const el = root.current!;
    getGsap().gsap.fromTo(
      el.querySelectorAll('[data-word]'),
      { yPercent: 110, rotation: 3 },
      { yPercent: 0, rotation: 0, duration: 1.1, ease: 'expo.out', stagger: 0.09, clearProps: 'transform', scrollTrigger: { trigger: el, start: 'top 96%', once: true } },
    );
  });
  return (
    <p ref={root} className={styles.wordmark} aria-hidden="true">
      {text.split(' ').map((word, i) => (
        <span key={word} className={styles.word}>
          {i ? ' ' : null}
          <span data-word className={styles.wordInk}>
            {word}
          </span>
        </span>
      ))}
    </p>
  );
}
