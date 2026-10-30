'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import { Picture } from '@/components/media/Picture';
import { getGsap, useGsap } from '@/lib/gsap';
import type { Still } from '@/lib/media';
import s from './WorkIndex.module.css';

export type IndexItem = { slug: string; name: string; kind: string; services: string; href: string; tone: string; still: Still };

const Arrow = () => <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13m-5-6 6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>;

/** A steady project index. Hover and focus change the colour, never the layout. */
export function WorkIndex({ items, title = 'Work', allHref = '/work' }: { items: IndexItem[]; title?: string; allHref?: string }) {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(-1);

  useGsap(root, ({ reduce }) => {
    if (reduce) return;
    const { gsap } = getGsap();
    const el = root.current!;
    const tl = gsap.timeline({ scrollTrigger: { trigger: el.querySelector('[data-list]'), start: 'top 82%', once: true } });
    tl.fromTo(el.querySelectorAll('[data-rule]'), { scaleX: 0 }, { scaleX: 1, duration: 0.9, ease: 'expo.out', stagger: 0.05, clearProps: 'transform' }, 0)
      .fromTo(el.querySelectorAll('[data-rise]'), { yPercent: 110 }, { yPercent: 0, duration: 0.8, ease: 'expo.out', stagger: 0.05, clearProps: 'transform' }, 0.06)
      .fromTo(el.querySelectorAll('[data-fade]'), { opacity: 0 }, { opacity: 1, duration: 0.6, ease: 'power2.out', stagger: 0.04, clearProps: 'opacity' }, 0.2);
  });

  const tone = active >= 0 ? items[active].tone : undefined;
  return (
    <section ref={root} id="selected-work" className={s.index} aria-labelledby="work-h" data-theme="dark" style={tone ? { ['--hover-tone' as string]: tone } : undefined}>
      <div className={'container ' + s.inner}>
        <div className={s.head} data-head>
          <h2 id="work-h" className={s.title}>{title}</h2>
          <Link href={allHref} className={s.all}>All case studies<Arrow /></Link>
        </div>
        <ul className={s.list} data-list onPointerLeave={() => setActive(-1)} data-active={active >= 0 || undefined}>
          {items.map((item, i) => (
            <li key={item.slug} className={s.row} data-row={i} data-current={i === active || undefined} onPointerEnter={(event) => { if (event.pointerType === 'mouse' && !document.documentElement.hasAttribute('data-scrolling')) setActive(i); }} onPointerMove={(event) => { if (event.pointerType === 'mouse' && active !== i && !document.documentElement.hasAttribute('data-scrolling')) setActive(i); }}>
              <span className={s.rule} data-rule aria-hidden="true" />
              <Link href={item.href} className={s.link} onFocus={() => setActive(i)} onBlur={() => setActive(-1)}>
                <span className={s.nameMask}><span className={s.name} data-rise>{item.name}</span></span>
                <span className={s.kind} data-fade>{item.kind}</span>
                <span className={s.services} data-fade>{item.services}</span>
                <span className={s.arrow} data-fade><Arrow /></span>
                <span className={s.thumb}><Picture media={item.still} sizes="(max-width: 899px) calc(100vw - 40px), 232px" /></span>
              </Link>
            </li>
          ))}
          <li className={s.end} aria-hidden="true"><span className={s.rule} data-rule /></li>
        </ul>
      </div>
    </section>
  );
}
