'use client';

import Link from 'next/link';
import { useEffect, useId, useRef, useState, type CSSProperties } from 'react';
import { Picture } from '@/components/media/Picture';
import type { ProofRecord, Stop } from '@/content/path';
import { getGsap, useGsap } from '@/lib/gsap';
import type { Still } from '@/lib/media';
import s from './PathExplorer.module.css';

export type PathExample = Stop & { image: Still; ground: string; ink: string; domain: string; /** Where a cropped screen is anchored, as object-position. */ anchor?: string };

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
 * The route from a search to a booked appointment, as six numbered stops in reading order, each with
 * its proof in that client's colours. Wide screens show the whole route at once (two rows of three,
 * joined by a line through the numbers); phones swipe through the stops as cards, with a dot for each.
 */
export function PathExplorer({ items }: { items: PathExample[] }) {
  const uid = useId();
  const root = useRef<HTMLElement>(null);
  const row = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(0);
  const n = items.length;

  // The stops rise into place in order as the section arrives, and the line runs on through them
  useGsap(root, ({ reduce, mobile }) => {
    if (reduce || mobile) return;
    const { gsap } = getGsap();
    const el = root.current!;
    const tl = gsap.timeline({ scrollTrigger: { trigger: el.querySelector('[data-route]'), start: 'top 82%', once: true } });
    tl.fromTo(el.querySelectorAll('[data-step]'), { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'expo.out', stagger: 0.07, clearProps: 'transform,opacity' }, 0)
      .fromTo(el.querySelectorAll('[data-link]'), { scaleX: 0 }, { scaleX: 1, duration: 0.9, ease: 'expo.out', stagger: 0.07, clearProps: 'transform' }, 0.15);
  });

  // Swiping: the card nearest the start of the row is the current stop.
  useEffect(() => {
    const list = row.current;
    if (!list) return;
    let frame = 0;
    const read = () => {
      frame = 0;
      const cards = [...list.children] as HTMLElement[];
      if (cards.length < 2 || list.scrollWidth <= list.clientWidth + 2) return;
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
    const list = row.current;
    const cards = list ? ([...list.children] as HTMLElement[]) : [];
    if (!list || !cards[index]) return;
    list.scrollTo({ left: cards[index].offsetLeft - cards[0].offsetLeft, behavior: reduce ? 'auto' : 'smooth' });
  };

  return (
    <section ref={root} className={'night ' + s.section} aria-labelledby={uid + '-title'} data-theme="dark" style={{ '--n': n, '--i': active } as CSSProperties}>
      <div className={'container ' + s.frame}>
        <h2 id={uid + '-title'} className={s.heading}>
          From search <span>to booked.</span>
        </h2>
        <ol ref={row} className={s.steps} data-route aria-label="Six stops between a search and a booked appointment">
          {items.map((item, index) => (
            <li key={item.id} id={uid + '-' + item.id} className={s.step} data-step aria-current={active === index ? 'step' : undefined}>
              <div className={s.top}>
                <span className={s.num} aria-hidden="true">
                  {index + 1}
                </span>
                <span className={s.link} data-link aria-hidden="true" />
              </div>
              <h3 className={s.name}>{item.name}</h3>
              <p className={s.line}>{item.line}</p>
              <figure className={s.stage} style={{ '--path-ground': item.ground, '--path-ink': item.ink, '--path-anchor': item.anchor } as CSSProperties}>
                <figcaption className={s.domain}>{item.source ?? item.domain}</figcaption>
                <div className={s.screen} data-record={item.record ? true : undefined}>
                  {item.record ? <RecordPanel record={item.record} /> : <Picture media={item.image} sizes="(min-width: 1000px) 30vw, (min-width: 700px) 45vw, min(84vw, 440px)" />}
                </div>
              </figure>
              <p className={s.example}>{item.example}</p>
              <Link href={'/work/' + item.caseSlug} className={s.caseLink}>
                {item.caseName}
                <Arrow />
              </Link>
            </li>
          ))}
        </ol>
        <div className={s.track}>
          <div className={s.stations} role="group" aria-label="Go to a stop">
            {items.map((item, index) => (
              <button
                key={item.id}
                type="button"
                className={s.station}
                aria-controls={uid + '-' + item.id}
                aria-current={active === index ? 'step' : undefined}
                onClick={() => jump(index)}
              >
                <span className={s.stationName}>{item.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
