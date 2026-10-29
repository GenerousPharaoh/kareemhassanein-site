'use client';

import Link from 'next/link';
import { useEffect, useId, useRef, useState, type CSSProperties } from 'react';
import { Picture } from '@/components/media/Picture';
import type { ProofRecord, Stop } from '@/content/path';
import { useReducedMotion } from '@/lib/useReducedMotion';
import type { Still } from '@/lib/media';
import s from './PathExplorer.module.css';

export type PathExample = Stop & { image: Still; ground: string; ink: string; domain: string; /** Where a cropped screen is anchored, as object-position. */ anchor?: string };

/** Seconds on each stop before the route moves on by itself. */
const DWELL = 5.5;
/** How long the outgoing proof stays under the incoming one, in ms (the CSS wipe is a little shorter). */
const COVER = 760;

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
 * The route from a search to a booked appointment. The six stops are listed in order beside one large
 * stage; choosing a stop shows its proof there, in that client's colours. Left alone, the route moves
 * on by itself, a bar filling under the current stop; it rests while the pointer is over it, off
 * screen, or paused.
 */
export function PathExplorer({ items }: { items: PathExample[] }) {
  const uid = useId();
  const root = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const [resting, setResting] = useState(true);
  const [hovered, setHovered] = useState(false);
  const n = items.length;
  const item = items[active];

  const show = (next: number) => {
    if (next === active) return;
    setPrev(active);
    setActive(next);
  };

  // The outgoing proof is released once the incoming one covers it
  useEffect(() => {
    if (prev === null) return;
    const t = window.setTimeout(() => setPrev(null), reduce ? 0 : COVER);
    return () => window.clearTimeout(t);
  }, [prev, active, reduce]);

  // Rest off screen and in a background tab
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    let inView = false;
    const sync = () => setResting(!inView || document.hidden);
    const io = new IntersectionObserver(([e]) => {
      inView = e.isIntersecting;
      sync();
    }, { threshold: 0.35 });
    io.observe(el);
    document.addEventListener('visibilitychange', sync);
    return () => {
      io.disconnect();
      document.removeEventListener('visibilitychange', sync);
    };
  }, []);

  const running = !reduce && !paused && !resting && !hovered;
  const stateOf = (i: number) => (i === active ? 'on' : i === prev ? 'prev' : 'off');

  return (
    <section
      ref={root}
      className={'night ' + s.section}
      aria-labelledby={uid + '-title'}
      data-theme="dark"
      style={{ '--path-ground': item.ground, '--path-ink': item.ink, '--dwell': `${DWELL}s` } as CSSProperties}
    >
      <div className={'container ' + s.frame}>
        <h2 id={uid + '-title'} className={s.heading}>
          From search <span>to booked.</span>
        </h2>

        <div className={s.route} onPointerEnter={(e) => e.pointerType === 'mouse' && setHovered(true)} onPointerLeave={() => setHovered(false)}>
          <ol className={s.stops} aria-label="Six stops between a search and a booked appointment">
            {items.map((it, i) => (
              <li key={it.id}>
                <button type="button" className={s.stop} aria-controls={uid + '-stage'} aria-current={i === active ? 'step' : undefined} onClick={() => show(i)}>
                  <span className={s.num} aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className={s.name}>{it.name}</span>
                  <span className={s.bar} aria-hidden="true">
                    {i === active && !reduce && (
                      <span key={active} className={s.fill} data-running={running || undefined} onAnimationEnd={() => show((active + 1) % n)} />
                    )}
                  </span>
                </button>
              </li>
            ))}
          </ol>
          {!reduce && (
            <button type="button" className={s.pause} onClick={() => setPaused((p) => !p)} aria-pressed={paused} aria-label={paused ? 'Play the route' : 'Pause the route'}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                {paused ? <path d="M8 5.5v13l10.5-6.5z" fill="currentColor" /> : <path d="M8 5h2.6v14H8zM13.4 5H16v14h-2.6z" fill="currentColor" />}
              </svg>
            </button>
          )}
        </div>

        <div className={s.stageCol} id={uid + '-stage'}>
          <figure className={s.stage}>
            <figcaption className={s.domain}>
              <span key={active} className={s.domainText}>
                {item.source ?? item.domain}
              </span>
            </figcaption>
            <div className={s.screens}>
              {items.map((it, i) => (
                <div
                  key={it.id}
                  className={s.proof}
                  data-state={stateOf(i)}
                  data-record={it.record ? true : undefined}
                  aria-hidden={i !== active || undefined}
                  style={{ '--proof-ground': it.ground, '--proof-ink': it.ink, '--path-anchor': it.anchor } as CSSProperties}
                >
                  {it.record ? <RecordPanel record={it.record} /> : <Picture media={it.image} sizes="(min-width: 1000px) 56vw, 92vw" />}
                </div>
              ))}
            </div>
          </figure>
          {/* Every caption sits in the same cell, so the tallest sets its height and nothing below it moves */}
          <div className={s.captions}>
            {items.map((it, i) => (
              <div key={it.id} className={s.caption} data-state={i === active ? 'on' : 'off'} aria-hidden={i !== active || undefined}>
                <p className={s.line}>{it.line}</p>
                <p className={s.example}>{it.example}</p>
                <Link href={'/work/' + it.caseSlug} className={s.caseLink} tabIndex={i === active ? undefined : -1}>
                  {it.caseName}
                  <Arrow />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
