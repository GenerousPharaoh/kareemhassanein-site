'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { Picture } from '@/components/media/Picture';
import { SplitReveal } from '@/components/motion/SplitReveal';
import { getGsap, useGsap } from '@/lib/gsap';
import type { Still } from '@/lib/media';
import s from './Beyond.module.css';

export type BeyondCase = { slug: string; name: string; kindLabel: string; desktop: Still };

/**
 * The work beyond practices as a list. With a mouse, a preview of the row under the pointer
 * follows it; on touch screens each row carries its own small picture.
 */
export function Beyond({ cases }: { cases: BeyondCase[] }) {
  const root = useRef<HTMLElement>(null);

  useGsap(root, ({ reduce }) => {
    if (reduce || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const { gsap } = getGsap();
    const el = root.current!;
    const list = el.querySelector<HTMLElement>('[data-list]')!;
    const preview = el.querySelector<HTMLElement>('[data-preview]')!;
    const pics = gsap.utils.toArray<HTMLElement>('[data-pic]', el);
    const rows = gsap.utils.toArray<HTMLElement>('[data-row]', el);
    const xTo = gsap.quickTo(preview, 'x', { duration: 0.65, ease: 'power3' });
    const yTo = gsap.quickTo(preview, 'y', { duration: 0.65, ease: 'power3' });
    const rotTo = gsap.quickTo(preview, 'rotation', { duration: 0.8, ease: 'power3' });
    let lastX = 0;

    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      xTo(e.clientX - r.left);
      yTo(e.clientY - r.top);
      rotTo(gsap.utils.clamp(-6, 6, (e.clientX - lastX) * 0.4));
      lastX = e.clientX;
    };
    const enters = rows.map((row, i) => {
      const on = () => {
        gsap.to(preview, { autoAlpha: 1, scale: 1, duration: 0.45, ease: 'power3.out' });
        pics.forEach((p, j) => gsap.to(p, { autoAlpha: j === i ? 1 : 0, duration: 0.35 }));
      };
      row.addEventListener('pointerenter', on);
      return () => row.removeEventListener('pointerenter', on);
    });
    const leave = () => gsap.to(preview, { autoAlpha: 0, scale: 0.86, duration: 0.35, ease: 'power2.in' });
    el.addEventListener('pointermove', move);
    list.addEventListener('pointerleave', leave);
    return () => {
      el.removeEventListener('pointermove', move);
      list.removeEventListener('pointerleave', leave);
      enters.forEach((off) => off());
    };
  });

  return (
    <section ref={root} className={`night ${s.beyond}`} aria-labelledby="beyond-h">
      <div className="container">
        <div className={s.head}>
          <SplitReveal id="beyond-h" className={s.title}>
            Beyond <em>practices</em>
          </SplitReveal>
          <p className={s.note}>The same care for a store, a personal brand and a wedding.</p>
        </div>
        <ul className={s.list} data-list>
          {cases.map((c) => (
            <li key={c.slug} className={s.row} data-row>
              <Link href={`/work/${c.slug}`} className={s.link}>
                <span className={s.name}>{c.name}</span>
                <span className={s.kind}>{c.kindLabel}</span>
                <span className={s.thumb} aria-hidden="true">
                  <Picture media={c.desktop} sizes="128px" />
                </span>
                <svg className={s.arrow} viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M5 12h13m-5-6 6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className={s.preview} data-preview aria-hidden="true">
        {cases.map((c) => (
          <div key={c.slug} className={s.pic} data-pic>
            <Picture media={c.desktop} sizes="440px" />
          </div>
        ))}
      </div>
    </section>
  );
}
