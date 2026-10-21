'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { Still } from '@/lib/media';
import { Picture } from '@/components/media/Picture';
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

const STEP_MS = 2900;

/**
 * The thesis in one moving picture: a search, the practice's site, the booking,
 * and the booking counted against the ad that brought it. Two stories alternate.
 * Pauses off screen, on request, and entirely for reduced motion.
 */
export function HeroStage({ stories }: { stories: Story[] }) {
  const [storyIndex, setStoryIndex] = useState(0);
  const [step, setStep] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(true);
  const [reduced, setReduced] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => {
      setReduced(mq.matches);
      if (mq.matches) setStep(3);
    };
    sync();
    mq.addEventListener('change', sync);
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.2 });
    if (root.current) io.observe(root.current);
    const onVis = () => setVisible(!document.hidden);
    document.addEventListener('visibilitychange', onVis);
    return () => {
      mq.removeEventListener('change', sync);
      io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []);

  const advance = useCallback(() => {
    if (step < STEPS.length - 1) {
      setStep(step + 1);
    } else {
      setStoryIndex((i) => (i + 1) % stories.length);
      setStep(0);
    }
  }, [step, stories.length]);

  useEffect(() => {
    if (paused || reduced || !visible) return;
    const t = window.setTimeout(advance, step === STEPS.length - 1 ? STEP_MS + 900 : STEP_MS);
    return () => window.clearTimeout(t);
  }, [step, storyIndex, paused, reduced, visible, advance]);

  const story = stories[storyIndex];
  const running = !paused && !reduced && visible;

  return (
    <div ref={root} className={styles.stage} data-step={STEPS[step].id} data-running={running || undefined}>
      <div className={styles.head}>
        <div className={styles.stories} role="group" aria-label="Example">
          {stories.map((s, i) => (
            <button
              key={s.id}
              type="button"
              className={styles.storyTab}
              aria-pressed={i === storyIndex}
              onClick={() => {
                setStoryIndex(i);
                setStep(0);
              }}
            >
              {s.label}
            </button>
          ))}
        </div>
        {!reduced ? (
          <button type="button" className={styles.pause} onClick={() => setPaused((p) => !p)} aria-label={paused ? 'Play the example' : 'Pause the example'}>
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
        ) : null}
      </div>

      <div className={styles.body}>
        <div className={styles.phone} aria-hidden="true">
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
            {/* Found: a search and its results */}
            <div className={styles.view} data-view="found">
              <div className={styles.search}>
                <svg viewBox="0 0 20 20" className={styles.searchIcon}>
                  <circle cx="8.5" cy="8.5" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
                  <path d="m13 13 4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
                <span key={story.id + step} className={styles.query} style={{ ['--chars' as string]: story.query.length }}>
                  {story.query}
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
            </div>

            {/* Chosen: the practice's own site */}
            <div className={styles.view} data-view="chosen">
              <span className={styles.address}>
                <svg viewBox="0 0 12 12">
                  <rect x="2.5" y="5.2" width="7" height="5" rx="1.2" fill="currentColor" />
                  <path d="M4 5.2V4a2 2 0 0 1 4 0v1.2" fill="none" stroke="currentColor" strokeWidth="1.2" />
                </svg>
                {story.result.domain}
              </span>
              <div className={styles.site}>
                {stories.map((s, i) => (
                  <Picture key={s.id} media={s.site} sizes="300px" className={i === storyIndex ? styles.siteOn : styles.siteOff} />
                ))}
              </div>
            </div>

            {/* Booked: the confirmation */}
            <div className={styles.view} data-view="booked">
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
            </div>

            {/* Counted: the booking tied to its source */}
            <div className={styles.view} data-view="counted">
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
            </div>
          </div>
        </div>

        <ol className={styles.steps}>
          {STEPS.map((s, i) => (
            <li key={s.id} className={styles.step} data-state={i < step ? 'done' : i === step ? 'now' : 'next'}>
              <button
                type="button"
                className={styles.stepButton}
                onClick={() => {
                  setStep(i);
                  setPaused(true);
                }}
                aria-current={i === step ? 'step' : undefined}
              >
                <span className={styles.stepBar}>
                  <span key={`${storyIndex}-${step}`} className={styles.stepFill} />
                </span>
                <span className={styles.stepName}>{s.name}</span>
                <span className={styles.stepLine}>{s.line}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>
      <p className="sr-only">
        An example of the path: someone searches, chooses the practice on its own site, books or sends a request, and the booking is counted against the ad
        that brought it, while a plain button click is not.
      </p>
    </div>
  );
}
