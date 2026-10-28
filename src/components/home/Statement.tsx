'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { Picture } from '@/components/media/Picture';
import { PortraitFrame } from '@/components/media/PortraitFrame';
import { getGsap, useGsap } from '@/lib/gsap';
import type { Still } from '@/lib/media';
import s from './Statement.module.css';

/**
 * A run of text, or a small piece of the work set into the line beside the word it shows. Every
 * piece has the same height and corners; its width follows the picture.
 */
export type Piece = string | { still: Still; label: string };

type Props = {
  pieces: Piece[];
  body: string;
  link: { href: string; label: string };
  portrait: Still;
};

/**
 * Who builds it: one long sentence on a light sheet, lit word by word as it scrolls into place,
 * with client captures in the line and a printed portrait beside its caption.
 */
export function Statement({ pieces, body, link, portrait }: Props) {
  const root = useRef<HTMLElement>(null);

  useGsap(root, ({ reduce }) => {
    if (reduce) return;
    const { gsap, SplitText } = getGsap();
    const el = root.current!;
    const text = el.querySelector<HTMLElement>('[data-lit]')!;
    const split = SplitText.create(text.querySelectorAll('[data-words]'), { type: 'words', wordsClass: s.word });
    const words = [...split.words, ...el.querySelectorAll<HTMLElement>('[data-chip]')];
    // In reading order, so the chips light with the words around them
    words.sort((a, b) => (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1));
    const tl = gsap.timeline({ scrollTrigger: { trigger: text, start: 'top 78%', end: 'bottom 52%', scrub: 0.3 } });
    words.forEach((w, i) => {
      if (w.hasAttribute('data-chip')) {
        // A picture lights like the words beside it, and settles from a closer framing as it does
        tl.fromTo(w, { opacity: 0.16 }, { opacity: 1, ease: 'none', duration: 1 }, i * 0.35)
          .fromTo(w.querySelector('img'), { scale: 1.3 }, { scale: 1, ease: 'power2.out', duration: 1.6 }, i * 0.35);
      } else {
        tl.fromTo(w, { opacity: 0.16 }, { opacity: 1, ease: 'none', duration: 1 }, i * 0.35);
      }
    });

    gsap.fromTo(el.querySelectorAll('[data-after]'), { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'expo.out', stagger: 0.06, scrollTrigger: { trigger: el.querySelector('[data-after]'), start: 'top 90%', once: true } });

    return () => {
      split.revert();
    };
  });

  return (
    <section ref={root} className={`paper ${s.statement}`} aria-labelledby="who-h" data-theme="light">
      <div className={`container ${s.grid}`}>
        <div className={s.copy}>
          <h2 id="who-h" className={s.text} data-lit>
            {pieces.map((p, i) =>
              typeof p === 'string' ? (
                <span key={i} data-words>
                  {p}
                </span>
              ) : (
                <span key={i} className={s.chip} data-chip aria-hidden="true" title={p.label} style={{ ['--ratio' as string]: (p.still.w / p.still.h).toFixed(3) }}>
                  <span className={s.chipImg}>
                    <Picture media={p.still} sizes="160px" />
                  </span>
                </span>
              ),
            )}
          </h2>
        </div>
        <figure className={s.portrait}>
          <PortraitFrame media={portrait} sizes="(min-width: 900px) 230px, clamp(82px, 23vw, 132px)" />
        </figure>
        <div className={s.caption}>
            <p className={s.body} data-after>
              {body}
            </p>
            <Link href={link.href} className={s.more} data-after>
              {link.label}
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M5 12h13m-5-6 6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
        </div>
      </div>
    </section>
  );
}
