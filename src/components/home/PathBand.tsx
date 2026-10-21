'use client';

import Link from 'next/link';
import { useState } from 'react';
import type { Stop } from '@/content/path';
import styles from './PathBand.module.css';

/** A tiny piece of interface for each stop, drawn in HTML so it stays sharp at any size. */
function Glyph({ id }: { id: Stop['id'] }) {
  switch (id) {
    case 'found':
      return (
        <div className={styles.g}>
          <span className={styles.gSearch}>physiotherapist near me</span>
          <span className={styles.gCard}>
            <b>Your practice</b>
            <i>Open now · Book online</i>
          </span>
          <span className={styles.gGhost} />
        </div>
      );
    case 'chosen':
      return (
        <div className={styles.g}>
          <span className={styles.gLabel}>Next openings</span>
          <span className={styles.gChips}>
            <span>Mon 2:05 PM</span>
            <span>Tue 3:55 PM</span>
            <span>Thu 11:30 AM</span>
          </span>
        </div>
      );
    case 'booked':
      return (
        <div className={styles.g}>
          <span className={styles.gButton}>Book an assessment</span>
          <span className={styles.gConfirm}>
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path d="m3.5 8.5 3 3 6-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Booked for Tuesday
          </span>
        </div>
      );
    case 'counted':
      return (
        <div className={styles.g}>
          <span className={styles.gRow}>
            <span className={styles.gDot} />
            booking confirmed
            <em>counted</em>
          </span>
          <span className={`${styles.gRow} ${styles.gRowOff}`}>
            <span className={styles.gDot} />
            button click
            <em>ignored</em>
          </span>
        </div>
      );
    case 'grown':
      return (
        <div className={styles.g}>
          <span className={styles.gLabel}>Bookings by source</span>
          <span className={styles.gBars}>
            <span style={{ ['--h' as string]: '78%' }}>
              <i>Ads</i>
            </span>
            <span style={{ ['--h' as string]: '56%' }}>
              <i>Search</i>
            </span>
            <span style={{ ['--h' as string]: '40%' }}>
              <i>Profile</i>
            </span>
            <span style={{ ['--h' as string]: '26%' }}>
              <i>Direct</i>
            </span>
          </span>
        </div>
      );
    case 'kept':
      return (
        <div className={styles.g}>
          <span className={styles.gAccess}>
            <b>Owner</b>
            <span>Your practice</span>
          </span>
          <span className={styles.gAccess}>
            <b>Agency</b>
            <span>Limited access</span>
          </span>
          <span className={styles.gAccess}>
            <b>Every change</b>
            <span>Logged, with an undo</span>
          </span>
        </div>
      );
  }
}

export function PathBand({ stops }: { stops: Stop[] }) {
  const [active, setActive] = useState(0);
  const stop = stops[active];

  return (
    <div className={styles.band}>
      {/* Desktop: a track of six stops with one detail panel */}
      <div className={styles.track} role="tablist" aria-label="The six stops on the path">
        {stops.map((s, i) => (
          <button
            key={s.id}
            id={`stop-tab-${s.id}`}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-controls="stop-panel"
            tabIndex={i === active ? 0 : -1}
            className={styles.tab}
            data-state={i < active ? 'past' : i === active ? 'now' : 'next'}
            onClick={() => setActive(i)}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            onKeyDown={(e) => {
              if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                e.preventDefault();
                const next = (active + (e.key === 'ArrowRight' ? 1 : stops.length - 1)) % stops.length;
                setActive(next);
                document.getElementById(`stop-tab-${stops[next].id}`)?.focus();
              }
            }}
          >
            <span className={styles.node} aria-hidden="true" />
            <span className={styles.tabNum} aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </span>
            <span className={styles.tabName}>{s.name}</span>
            <span className={styles.tabLine}>{s.line}</span>
          </button>
        ))}
      </div>
      <div id="stop-panel" role="tabpanel" aria-labelledby={`stop-tab-${stop.id}`} className={styles.panel}>
        <div key={stop.id} className={styles.panelIn}>
          <div className={styles.panelText}>
            <p className="t-label">From the work</p>
            <p className={styles.example}>{stop.example}</p>
            <Link href={`/work/${stop.caseSlug}`} className={styles.caseLink}>
              See the {stop.caseName} case
              <svg viewBox="0 0 16 16" aria-hidden="true">
                <path d="M3 8h9.5M8.5 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
          <div className={styles.panelGlyph} aria-hidden="true">
            <Glyph id={stop.id} />
          </div>
        </div>
      </div>

      {/* Phones: every stop, stacked, nothing hidden behind a tap */}
      <ol className={styles.list}>
        {stops.map((s, i) => (
          <li key={s.id} className={styles.item} data-reveal>
            <div className={styles.itemHead}>
              <span className={styles.itemNum} aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className={styles.itemName}>{s.name}</h3>
            </div>
            <p className={styles.itemLine}>{s.line}</p>
            <div className={styles.itemGlyph} aria-hidden="true">
              <Glyph id={s.id} />
            </div>
            <p className={styles.itemExample}>{s.example}</p>
            <Link href={`/work/${s.caseSlug}`} className={styles.caseLink}>
              See the {s.caseName} case
              <svg viewBox="0 0 16 16" aria-hidden="true">
                <path d="M3 8h9.5M8.5 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
