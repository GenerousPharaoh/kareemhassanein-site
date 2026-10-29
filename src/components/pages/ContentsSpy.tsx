'use client';

import { useEffect, useRef, type ReactNode } from 'react';

type Props = { className?: string; label: string; children: ReactNode };

/**
 * A note's contents that follow the reading: the section on screen is marked, and a line down the
 * list fills as the note is read. The links are ordinary anchors; this only adds the marks.
 */
export function ContentsSpy({ className, label, children }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const nav = ref.current;
    const body = nav?.parentElement;
    const list = nav?.querySelector<HTMLElement>('ol');
    if (!nav || !body || !list) return;
    const links = [...nav.querySelectorAll<HTMLAnchorElement>('a[href^="#"]')];
    const heads = links.map((a) => document.getElementById(decodeURIComponent(a.hash.slice(1))));
    let frame = 0;
    let current = -2;

    const measure = () => {
      frame = 0;
      const line = innerHeight * 0.3;
      let now = -1;
      heads.forEach((h, i) => {
        if (h && h.getBoundingClientRect().top <= line) now = i;
      });
      if (now !== current) {
        links.forEach((a, i) => a.toggleAttribute('data-current', i === now));
        current = now;
      }
      // From the body's top at the reading line to its foot at the bottom of the screen
      const box = body.getBoundingClientRect();
      const span = Math.max(1, box.height - innerHeight + line);
      const read = Math.min(1, Math.max(0, (line - box.top) / span));
      list.style.setProperty('--read', read.toFixed(4));
    };
    const queue = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    addEventListener('scroll', queue, { passive: true });
    addEventListener('resize', queue);
    return () => {
      cancelAnimationFrame(frame);
      removeEventListener('scroll', queue);
      removeEventListener('resize', queue);
    };
  }, []);

  return (
    <nav ref={ref} className={className} aria-label={label}>
      {children}
    </nav>
  );
}
