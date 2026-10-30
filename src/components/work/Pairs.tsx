import type { CSSProperties } from 'react';
import type { Pair } from '@/content/cases';
import { BeforeAfter } from '@/components/media/BeforeAfter';
import { pairRows, pairSizes, ratio } from './layout';
import styles from './Pairs.module.css';

/** The old pages beside the new ones, as sliders, in rows that share a height. */
export function Pairs({ pairs, note }: { pairs: Pair[]; note?: string }) {
  if (!pairs.length) return null;
  const rows = pairRows(pairs);
  return (
    <section className={`container ${styles.pairs}`} aria-labelledby="case-before-after">
      <div className={styles.head}>
        <h2 id="case-before-after" className={styles.title}>
          Before and after
        </h2>
        {note ? <p className={styles.note}>{note}</p> : null}
      </div>
      <div className={styles.rows}>
        {rows.map((row) => {
          const total = row.reduce((sum, p) => sum + ratio(p.after), 0);
          return (
            <div key={row.map((p) => p.after.src).join()} className={styles.row} data-solo={row.length === 1 || undefined} data-reveal>
              {row.map((p) => (
                <div key={p.after.src} className={styles.cell} data-device={p.after.device} style={{ ['--r' as string]: ratio(p.after) } as CSSProperties}>
                  <BeforeAfter before={p.before} after={p.after} label={p.label} sizes={pairSizes(p.after.device, ratio(p.after) / total, row.length === 1)} />
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </section>
  );
}
