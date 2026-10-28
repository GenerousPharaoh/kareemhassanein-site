'use client';

import Link from 'next/link';
import { useEffect, useId, useLayoutEffect, useRef, useState, type CSSProperties } from 'react';
import { Picture } from '@/components/media/Picture';
import { getLenis } from '@/components/site/SmoothScroll';
import type { ProofRecord, Stop } from '@/content/path';
import { getGsap } from '@/lib/gsap';
import type { Still } from '@/lib/media';
import s from './PathExplorer.module.css';

export type PathExample = Stop & { image: Still; ground: string; ink: string; domain: string; /** Where a cropped screen is anchored, as object-position. */ anchor?: string };

/** Wide and tall enough to hold the whole route on one pinned screen; anything smaller swipes. */
const PIN = '(min-width: 1000px) and (min-height: 560px)';

const useIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

/** A setting shown as the record it lives in: a small panel in the case's own colours. */
function RecordPanel({ record }: { record: ProofRecord }) {
  return (
    <div className={s.record} data-flow={record.flow || undefined}>
      <p className={s.recordSource}>{record.source}</p>
      <p className={s.recordTitle}>{record.title}</p>
      <ol className={s.recordRows}>
        {record.rows.map((row) => (
          <li key={row.label} className={s.recordRow} data-off={row.off || undefined}>
            <span className={s.recordLabel}>{row.label}</span>
            {row.value && <span className={s.recordValue}>{row.value}</span>}
          </li>
        ))}
      </ol>
      {record.note && <p className={s.recordNote}>{record.note}</p>}
    </div>
  );
}

const Arrow = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M5 12h14m-6-6 6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.4" />
  </svg>
);

/**
 * The route from a search to a booked appointment. On a large screen the section holds still while
 * the page scrolls through it (44svh of scroll per stop): each stop's proof rises over the last in that client's colours and the
 * track along the bottom fills. Smaller screens swipe through the stops as cards.
 */
export function PathExplorer({ items }: { items: PathExample[] }) {
  const uid = useId();
  const root = useRef<HTMLElement>(null);
  const row = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(0);
  const pinned = useRef<{ start: number; end: number } | null>(null);
  const n = items.length;

  // Pinned: scroll position picks the stop; the stage and copy change with it.
  useIsoLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const { gsap, ScrollTrigger } = getGsap();
    const mm = gsap.matchMedia();
    mm.add({ pin: PIN, reduce: '(prefers-reduced-motion: reduce)' }, (context) => {
      const { pin, reduce } = context.conditions as { pin: boolean; reduce: boolean };
      if (!pin) return;

      const steps = [...el.querySelectorAll<HTMLElement>('[data-step]')];
      const stages = steps.map((step) => step.querySelector<HTMLElement>('[data-stage]')!);
      const screens = stages.map((stage) => stage.querySelector<HTMLElement>('[data-screen]')!);
      const copies = steps.map((step) => step.querySelector<HTMLElement>('[data-copy]')!);
      const fill = el.querySelector<HTMLElement>('[data-fill]')!;
      let current = -1;
      let tl: gsap.core.Timeline | null = null;
      // The rising edge keeps the stage's rounded corners
      const OPEN = 'inset(0% 0% 0% 0% round 18px)';
      const SHUT = 'inset(100% 0% 0% 0% round 18px)';

      const show = (index: number) => {
        gsap.set([...stages, ...copies], { autoAlpha: 0, zIndex: 0 });
        gsap.set([stages[index], copies[index]], { autoAlpha: 1, y: 0, zIndex: 2, clipPath: OPEN });
        gsap.set(stages, { '--shade': 0 });
        gsap.set(screens, { yPercent: 0 });
      };

      const go = (next: number) => {
        if (next === current) return;
        const prev = current;
        current = next;
        setActive(next);
        tl?.progress(1).kill();
        tl = null;
        if (prev < 0 || reduce) {
          show(next);
          return;
        }
        const up = next > prev;
        gsap.set(stages, { zIndex: 0 });
        tl = gsap.timeline();
        if (up) {
          // The next proof rises over the last, which sinks into shade; its screen settles a beat behind the wipe
          gsap.set(stages[prev], { zIndex: 1 });
          tl.fromTo(stages[next], { autoAlpha: 1, zIndex: 2, clipPath: SHUT, '--shade': 0 }, { clipPath: OPEN, duration: 0.62, ease: 'expo.inOut' }, 0)
            .fromTo(screens[next], { yPercent: 16 }, { yPercent: 0, duration: 0.8, ease: 'expo.out' }, 0.1)
            .to(screens[prev], { yPercent: -6, duration: 0.62, ease: 'expo.inOut' }, 0)
            .to(stages[prev], { '--shade': 0.42, duration: 0.62, ease: 'expo.inOut' }, 0);
        } else {
          // Scrolling back, the current proof drops away to uncover the one before it, coming out of shade
          gsap.set(stages[next], { autoAlpha: 1, zIndex: 1, clipPath: OPEN });
          gsap.set(stages[prev], { zIndex: 2 });
          tl.to(stages[prev], { clipPath: SHUT, duration: 0.6, ease: 'expo.inOut' }, 0)
            .fromTo(stages[next], { '--shade': 0.42 }, { '--shade': 0, duration: 0.6, ease: 'expo.inOut' }, 0)
            .fromTo(screens[next], { yPercent: -6 }, { yPercent: 0, duration: 0.6, ease: 'expo.inOut' }, 0);
        }
        tl.to(copies[prev], { autoAlpha: 0, y: up ? -16 : 16, duration: 0.2, ease: 'power2.in' }, 0)
          .set(copies[next], { autoAlpha: 1, y: 0, zIndex: 2 }, 0.16)
          .fromTo(copies[next].children, { y: up ? 26 : -26, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'expo.out', stagger: 0.04 }, 0.16)
          .set(stages[prev], { autoAlpha: 0, clipPath: OPEN, '--shade': 0 })
          .set(screens[prev], { yPercent: 0 });
      };

      el.setAttribute('data-pin', '');
      const st = ScrollTrigger.create({
        trigger: el,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          fill.style.setProperty('--p', self.progress.toFixed(4));
          go(Math.min(n - 1, Math.floor(self.progress * n)));
        },
        onRefresh: (self) => {
          pinned.current = { start: self.start, end: self.end };
          fill.style.setProperty('--p', self.progress.toFixed(4));
          if (current < 0) go(Math.min(n - 1, Math.floor(self.progress * n)));
        },
      });
      ScrollTrigger.refresh();

      return () => {
        tl?.kill();
        st.kill();
        pinned.current = null;
        el.removeAttribute('data-pin');
        fill.style.removeProperty('--p');
        gsap.set([...stages, ...screens, ...copies, ...copies.flatMap((copy) => [...copy.children])], { clearProps: 'all' });
      };
    });
    return () => mm.revert();
  }, [n]);

  // Swiping: the card nearest the start of the row is the current stop.
  useEffect(() => {
    const list = row.current;
    if (!list) return;
    let frame = 0;
    const read = () => {
      frame = 0;
      if (pinned.current) return;
      const cards = [...list.children] as HTMLElement[];
      if (cards.length < 2) return;
      const step = cards[1].offsetLeft - cards[0].offsetLeft;
      const atEnd = list.scrollLeft >= list.scrollWidth - list.clientWidth - 2;
      setActive(atEnd ? cards.length - 1 : Math.round(list.scrollLeft / step));
    };
    const queue = () => {
      if (!frame) frame = requestAnimationFrame(read);
    };
    list.addEventListener('scroll', queue, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      list.removeEventListener('scroll', queue);
    };
  }, []);

  const jump = (index: number) => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const range = pinned.current;
    if (range) {
      // The middle of that stop's stretch of the scroll
      const y = range.start + ((index + 0.5) / n) * (range.end - range.start);
      const lenis = getLenis();
      if (lenis) lenis.scrollTo(y, { duration: 0.8 + Math.abs(index - active) * 0.08 });
      else window.scrollTo({ top: y, behavior: reduce ? 'auto' : 'smooth' });
      return;
    }
    const list = row.current;
    const cards = list ? ([...list.children] as HTMLElement[]) : [];
    if (!list || !cards[index]) return;
    list.scrollTo({ left: cards[index].offsetLeft - cards[0].offsetLeft, behavior: reduce ? 'auto' : 'smooth' });
  };

  return (
    <section ref={root} className={'night ' + s.section} aria-labelledby={uid + '-title'} data-theme="dark" style={{ '--n': n, '--i': active } as CSSProperties}>
      <div className={s.pin}>
        <div className={'container ' + s.frame}>
          <h2 id={uid + '-title'} className={s.heading}>
            From search <span>to booked.</span>
          </h2>
          <ol ref={row} className={s.steps} aria-label="Six stops between a search and a booked appointment">
            {items.map((item, index) => (
              <li key={item.id} id={uid + '-' + item.id} className={s.step} data-step aria-current={active === index ? 'step' : undefined}>
                <div className={s.copy} data-copy>
                  <h3 className={s.name}>{item.name}</h3>
                  <p className={s.line}>{item.line}</p>
                  <p className={s.example}>{item.example}</p>
                  <Link href={'/work/' + item.caseSlug} className={s.caseLink}>
                    {item.caseName}
                    <Arrow />
                  </Link>
                </div>
                <figure className={s.stage} data-stage style={{ '--path-ground': item.ground, '--path-ink': item.ink, '--path-anchor': item.anchor } as CSSProperties}>
                  <figcaption className={s.domain}>{item.source ?? item.domain}</figcaption>
                  <div className={s.screen} data-screen data-record={item.record ? true : undefined}>
                    {item.record ? <RecordPanel record={item.record} /> : <Picture media={item.image} sizes="(min-width: 1000px) 52vw, min(84vw, 440px)" />}
                  </div>
                </figure>
              </li>
            ))}
          </ol>
          <div className={s.track}>
            <span className={s.rail} aria-hidden="true">
              <span className={s.fill} data-fill />
            </span>
            <div className={s.stations} role="group" aria-label="Go to a stop">
              {items.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  className={s.station}
                  aria-controls={uid + '-' + item.id}
                  aria-current={active === index ? 'step' : undefined}
                  data-passed={index < active || undefined}
                  onClick={() => jump(index)}
                >
                  <span className={s.stationName}>{item.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
