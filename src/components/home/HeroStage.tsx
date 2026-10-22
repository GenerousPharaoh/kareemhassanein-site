'use client';

import { useEffect, useReducer, useRef, useState } from 'react';
import type { Still } from '@/lib/media';
import { Picture } from '@/components/media/Picture';
import { useReducedMotion } from '@/lib/useReducedMotion';
import styles from './HeroStage.module.css';

export type StoryStep = 'found' | 'chosen' | 'booked' | 'counted';

export type Story = {
  id: string;
  label: string;
  query: string;
  result: { name: string; domain: string; line: string };
  site: Still;
  booked: { title: string; lines: string[] };
  counted: { event: string; source: string; note: string; chartLabel: string; bars: Array<{ label: string; share: number }> };
};

const STEPS: Array<{ id: StoryStep; name: string; line: string }> = [
  { id: 'found', name: 'Found', line: 'The search' },
  { id: 'chosen', name: 'Chosen', line: 'The site' },
  { id: 'booked', name: 'Booked', line: 'The booking' },
  { id: 'counted', name: 'Counted', line: 'The source' },
];

/** Each beat lasts STEP_MS; the last one holds a little longer before the next story starts. */
const STEP_MS = 2900;
const HOLD_MS = 900;
const durationOf = (step: number) => (step === STEPS.length - 1 ? STEP_MS + HOLD_MS : STEP_MS);

/**
 * Where the stage is. `key` changes on every move, so a beat that comes round again starts
 * fresh; `settled` shows the beat's end state at once (when the viewer picked it).
 */
type Beat = { story: number; step: number; key: number; settled: boolean };
type State = { cur: Beat; prev: Beat | null; paused: boolean };
type Action = { type: 'advance'; count: number } | { type: 'step'; step: number } | { type: 'story'; story: number } | { type: 'toggle' };

function reducer(s: State, a: Action): State {
  const move = (story: number, step: number, settled: boolean, paused: boolean): State => {
    const same = story === s.cur.story && step === s.cur.step;
    // The beat being left keeps its last frame while it fades out.
    return { cur: { story, step, key: s.cur.key + 1, settled }, prev: same ? s.prev : s.cur, paused };
  };
  switch (a.type) {
    case 'advance': {
      const last = s.cur.step === STEPS.length - 1;
      return move(last ? (s.cur.story + 1) % a.count : s.cur.story, last ? 0 : s.cur.step + 1, false, s.paused);
    }
    case 'step':
      return move(s.cur.story, a.step, true, true);
    case 'story':
      if (a.story === s.cur.story && s.cur.step === 0) return s;
      return move(a.story, 0, s.paused, s.paused);
    case 'toggle':
      return { ...s, paused: !s.paused };
  }
}

/** One beat of one story, as the phone shows it. */
function Screen({ story, step }: { story: Story; step: StoryStep }) {
  switch (step) {
    case 'found':
      return (
        <>
          <div className={styles.search}>
            <svg viewBox="0 0 20 20" className={styles.searchIcon}>
              <circle cx="8.5" cy="8.5" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
              <path d="m13 13 4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            <span className={styles.query} style={{ ['--chars' as string]: story.query.length }}>
              <span className={styles.queryText}>{story.query}</span>
            </span>
          </div>
          <ul className={styles.results}>
            <li className={styles.resultMain}>
              <span className={styles.resultDomain}>
                <b className={styles.sponsored}>Sponsored</b>
                {story.result.domain}
              </span>
              <span className={styles.resultName}>{story.result.name}</span>
              <span className={styles.resultLine}>{story.result.line}</span>
            </li>
            {[0, 1, 2].map((n) => (
              <li key={n} className={styles.result}>
                <span className={styles.ghostLine} style={{ width: '38%' }} />
                <span className={styles.ghostLine} style={{ width: '72%', height: 8 }} />
                <span className={styles.ghostLine} />
              </li>
            ))}
          </ul>
        </>
      );
    case 'chosen':
      return (
        <>
          <span className={styles.address}>
            <svg viewBox="0 0 12 12">
              <rect x="2.5" y="5.2" width="7" height="5" rx="1.2" fill="currentColor" />
              <path d="M4 5.2V4a2 2 0 0 1 4 0v1.2" fill="none" stroke="currentColor" strokeWidth="1.2" />
            </svg>
            {story.result.domain}
          </span>
          <div className={styles.site}>
            {/* The phone is min(280px, 72vw) with an 8px bezel */}
            <Picture media={story.site} sizes="(min-width: 389px) 264px, calc(72vw - 16px)" />
          </div>
        </>
      );
    case 'booked':
      return (
        <div className={styles.confirm}>
          <span className={styles.tick}>
            <svg viewBox="0 0 24 24">
              <path d="m6 12.5 4 4 8-9" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span className={styles.confirmTitle}>{story.booked.title}</span>
          {story.booked.lines.map((l) => (
            <span key={l} className={styles.confirmLine}>
              {l}
            </span>
          ))}
        </div>
      );
    case 'counted':
      return (
        <div className={styles.ledger}>
          <span className={styles.ledgerHead}>Conversions</span>
          <span className={styles.row}>
            <span className={styles.rowDot} />
            <span className={styles.rowText}>
              <strong>{story.counted.event}</strong>
              <span>{story.counted.source}</span>
            </span>
            <span className={styles.rowBadge}>Counted</span>
          </span>
          <span className={`${styles.row} ${styles.rowMuted}`}>
            <span className={styles.rowDot} />
            <span className={styles.rowText}>
              <strong>Button click</strong>
              <span>Not a booking, so not counted</span>
            </span>
          </span>
          <span className={styles.ledgerNote}>{story.counted.note}</span>
          <span className={styles.chart}>
            <span className={styles.chartHead}>{story.counted.chartLabel}</span>
            {story.counted.bars.map((b) => (
              <span key={b.label} className={styles.bar}>
                <span className={styles.barLabel}>{b.label}</span>
                <span className={styles.barTrack}>
                  <span className={styles.barFill} style={{ ['--w' as string]: `${b.share}%` }} />
                </span>
              </span>
            ))}
          </span>
        </div>
      );
  }
}

/**
 * The thesis in one moving picture: a search, the practice's site, the booking,
 * and the booking counted against the ad that brought it. Two stories alternate.
 * Freezes in place off screen and when paused, and stays still for reduced motion.
 */
export function HeroStage({ stories }: { stories: Story[] }) {
  const reduced = useReducedMotion();
  const [{ cur, prev, paused }, dispatch] = useReducer(reducer, {
    cur: { story: 0, step: 0, key: 0, settled: false },
    prev: null,
    paused: false,
  });
  // Nothing runs until the phone is on screen, so the first beat is never half over when it is seen.
  const [onScreen, setOnScreen] = useState(false);
  const [pageShown, setPageShown] = useState(true);
  const phone = useRef<HTMLDivElement>(null);
  const timing = useRef({ key: -1, left: 0 });
  const running = !paused && onScreen && pageShown && !reduced;

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setOnScreen(e.isIntersecting), { threshold: 0.35 });
    if (phone.current) io.observe(phone.current);
    const onVisibility = () => setPageShown(!document.hidden);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      io.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  // Move on when the beat's time is up. Pausing keeps the time already spent, so the step bar,
  // which pauses with it, still fills exactly as the next beat begins.
  useEffect(() => {
    if (timing.current.key !== cur.key) timing.current = { key: cur.key, left: durationOf(cur.step) };
    if (!running) return;
    const started = performance.now();
    const t = window.setTimeout(() => dispatch({ type: 'advance', count: stories.length }), timing.current.left);
    return () => {
      window.clearTimeout(t);
      timing.current.left = Math.max(0, timing.current.left - (performance.now() - started));
    };
  }, [cur.key, cur.step, running, stories.length]);

  const beatAt = (story: number, step: number) =>
    cur.story === story && cur.step === step ? cur : prev && prev.story === story && prev.step === step ? prev : null;

  return (
    <div className={styles.stage} data-step={STEPS[cur.step].id} data-frozen={!running || undefined}>
      <div className={styles.head}>
        <div className={styles.stories} role="group" aria-label="Example">
          {stories.map((s, i) => (
            <button key={s.id} type="button" className={styles.storyTab} aria-pressed={i === cur.story} onClick={() => dispatch({ type: 'story', story: i })}>
              {s.label}
            </button>
          ))}
        </div>
        <button type="button" className={styles.pause} onClick={() => dispatch({ type: 'toggle' })} aria-label={paused ? 'Play the example' : 'Pause the example'}>
          {paused ? (
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path d="M5 3.2v9.6c0 .5.5.8.9.5l7.2-4.8a.6.6 0 0 0 0-1L5.9 2.7c-.4-.3-.9 0-.9.5Z" />
            </svg>
          ) : (
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <rect x="4" y="3" width="2.6" height="10" rx="0.6" />
              <rect x="9.4" y="3" width="2.6" height="10" rx="0.6" />
            </svg>
          )}
        </button>
      </div>

      <div className={styles.body}>
        <div ref={phone} className={styles.phone} aria-hidden="true">
          <div className={styles.screen}>
            <div className={styles.status}>
              <span>9:41</span>
              <span className={styles.statusIcons}>
                <svg viewBox="0 0 18 12">
                  <rect x="0" y="8" width="3" height="4" rx="0.6" />
                  <rect x="5" y="5.5" width="3" height="6.5" rx="0.6" />
                  <rect x="10" y="3" width="3" height="9" rx="0.6" />
                  <rect x="15" y="0" width="3" height="12" rx="0.6" />
                </svg>
                <span className={styles.battery} />
              </span>
            </div>
            {/*
              One view per story and beat. The beat being left keeps its frame while it fades,
              and the next arrives only once it has gone, so two screens never show at once.
            */}
            {stories.map((s, si) =>
              STEPS.map((st, i) => {
                const beat = beatAt(si, i);
                const state = beat === cur ? 'active' : beat ? 'exit' : 'idle';
                return (
                  <div
                    key={`${s.id}-${st.id}`}
                    className={styles.view}
                    data-view={st.id}
                    data-state={state}
                    data-animate={(beat && !beat.settled) || undefined}
                  >
                    <Screen key={beat ? beat.key : 'idle'} story={s} step={st.id} />
                  </div>
                );
              }),
            )}
          </div>
        </div>

        <ol className={styles.steps}>
          {STEPS.map((s, i) => {
            const now = i === cur.step;
            // The current bar fills while the example plays (and holds still while it is paused).
            const fill = now && !(cur.settled && paused);
            return (
              <li key={s.id} className={styles.step} data-state={i < cur.step ? 'done' : now ? 'now' : 'next'}>
                <button type="button" className={styles.stepButton} onClick={() => dispatch({ type: 'step', step: i })} aria-current={now ? 'step' : undefined}>
                  <span className={styles.stepBar}>
                    <span
                      className={styles.stepFill}
                      data-run={fill ? (cur.key % 2 ? 'a' : 'b') : undefined}
                      style={{ ['--fill-ms' as string]: `${durationOf(i)}ms` }}
                    />
                  </span>
                  <span className={styles.stepName}>{s.name}</span>
                  <span className={styles.stepLine}>{s.line}</span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>
      <p className="sr-only">
        An example of the path: someone searches, chooses the practice on its own site, books or sends a request, and the booking is counted against the ad
        that brought it, while a plain button click is not.
      </p>
    </div>
  );
}
