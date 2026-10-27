'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { Picture } from '@/components/media/Picture';
import { PortraitFrame } from '@/components/media/PortraitFrame';
import { getGsap, useGsap } from '@/lib/gsap';
import type { Still } from '@/lib/media';
import s from './Statement.module.css';

/**
 * A run of text, or a small piece of the work set into the line beside the words it shows: a still
 * (a pill, or a circle) or a short clip on a little screen that plays once as the line lights.
 */
export type Piece = string | { still: Still; label: string; shape?: 'pill' | 'round' } | { clip: { src: string; poster: string }; label: string };

/** The clip stops before five seconds, so it needs no pause control. */
const CLIP_STOP = 4.8;

/** How each kind of chip opens as the sentence lights: the screen wipes on, the circle irises, the pill extends. */
const OPENING = {
  screen: ['inset(0% 100% 0% 0% round 0.16em)', 'inset(0% 0% 0% 0% round 0.16em)'],
  round: ['inset(50% 50% 50% 50% round 50%)', 'inset(0% 0% 0% 0% round 50%)'],
  pill: ['inset(0% 100% 0% 0% round 999px)', 'inset(0% 0% 0% 0% round 999px)'],
} as const;

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
    const { gsap, ScrollTrigger, SplitText } = getGsap();
    const el = root.current!;
    const text = el.querySelector<HTMLElement>('[data-lit]')!;
    const split = SplitText.create(text.querySelectorAll('[data-words]'), { type: 'words', wordsClass: s.word });
    const words = [...split.words, ...el.querySelectorAll<HTMLElement>('[data-chip]')];
    // In reading order, so the chips light with the words around them
    words.sort((a, b) => (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1));
    const tl = gsap.timeline({ scrollTrigger: { trigger: text, start: 'top 78%', end: 'bottom 52%', scrub: 0.6 } });
    words.forEach((w, i) => {
      if (w.hasAttribute('data-chip')) {
        const [from, to] = OPENING[(w.getAttribute('data-shape') ?? 'pill') as keyof typeof OPENING];
        const inner = w.querySelector('[data-chip-img]');
        tl.fromTo(inner, { clipPath: from }, { clipPath: to, ease: 'power2.out', duration: 1.6 }, i * 0.35)
          .fromTo(inner?.firstElementChild ?? null, { scale: 1.45 }, { scale: 1, ease: 'power2.out', duration: 1.9 }, i * 0.35);
      } else {
        tl.fromTo(w, { opacity: 0.16 }, { opacity: 1, ease: 'none', duration: 1 }, i * 0.35);
      }
    });

    // The clip plays once, when its screen has lit, and stops on a still frame
    const clip = el.querySelector<HTMLVideoElement>('[data-chip-video]');
    const stopClip = () => {
      if (clip && clip.currentTime >= CLIP_STOP) clip.pause();
    };
    clip?.addEventListener('timeupdate', stopClip);
    if (clip) {
      ScrollTrigger.create({
        trigger: clip.closest('[data-chip]'),
        start: 'top 62%',
        once: true,
        onEnter: () => {
          clip.currentTime = 0;
          clip.play().catch(() => {});
        },
      });
    }

    gsap.fromTo(el.querySelectorAll('[data-after]'), { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1, ease: 'expo.out', stagger: 0.08, scrollTrigger: { trigger: el.querySelector('[data-after]'), start: 'top 90%', once: true } });

    return () => {
      clip?.removeEventListener('timeupdate', stopClip);
      clip?.pause();
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
              ) : 'clip' in p ? (
                <span key={i} className={s.chip} data-chip data-shape="screen" aria-hidden="true" title={p.label}>
                  <span className={s.chipImg} data-chip-img>
                    <span className={s.clipFrame}>
                      <video className={s.clip} src={p.clip.src} poster={p.clip.poster} muted playsInline preload="none" data-chip-video />
                    </span>
                  </span>
                </span>
              ) : (
                <span key={i} className={s.chip} data-chip data-shape={p.shape ?? 'pill'} aria-hidden="true" title={p.label}>
                  <span className={s.chipImg} data-chip-img>
                    <Picture media={p.still} sizes="140px" />
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
