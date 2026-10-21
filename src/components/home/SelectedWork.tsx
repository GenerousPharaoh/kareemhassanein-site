import Link from 'next/link';
import type { CaseStudy } from '@/content/cases';
import { BrowserFrame } from '@/components/media/Frames';
import { LoopVideo } from '@/components/media/LoopVideo';
import { Picture } from '@/components/media/Picture';
import { paletteVars } from '@/lib/palette';
import styles from './SelectedWork.module.css';

function Arrow() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className={styles.arrow}>
      <path d="M3 8h9.5M8.5 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** The lead case large with its loop, three practice cases beside it, then work beyond practices. */
export function SelectedWork({ lead, practices, beyond }: { lead: CaseStudy; practices: CaseStudy[]; beyond: CaseStudy[] }) {
  return (
    <div className={styles.wrap}>
      <article className={styles.feature} style={paletteVars(lead.palette)} data-reveal>
        <div className={styles.featureText}>
          <p className={styles.kind}>{lead.kindLabel}</p>
          <h3 className={styles.featureName}>
            <Link href={`/work/${lead.slug}`} className={styles.cover}>
              {lead.name}
            </Link>
          </h3>
          <p className={styles.featureSummary}>{lead.summary}</p>
          <ul className={styles.tags} aria-label="Services">
            {lead.services.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
          <span className={styles.read} aria-hidden="true">
            Read the case <Arrow />
          </span>
        </div>
        <div className={styles.featureMedia}>
          <BrowserFrame domain={lead.domain}>
            <LoopVideo loop={lead.hero} />
          </BrowserFrame>
        </div>
      </article>

      <div className={styles.grid}>
        {practices.map((c) => (
          <article key={c.slug} className={styles.card} style={paletteVars(c.palette)} data-reveal>
            <div className={styles.cardMedia}>
              <BrowserFrame domain={c.domain}>
                <Picture media={c.plate.desktop} sizes="(min-width: 1240px) 380px, (min-width: 760px) 30vw, 88vw" />
              </BrowserFrame>
            </div>
            <div className={styles.cardText}>
              <p className={styles.kind}>{c.kindLabel}</p>
              <h3 className={styles.cardName}>
                <Link href={`/work/${c.slug}`} className={styles.cover}>
                  {c.name}
                </Link>
              </h3>
              <p className={styles.cardSummary}>{c.summary}</p>
              <span className={styles.read} aria-hidden="true">
                Read the case <Arrow />
              </span>
            </div>
          </article>
        ))}
      </div>

      <div className={styles.beyondHead}>
        <p className="t-label">Beyond practices</p>
        <p className={styles.beyondNote}>The same care for a store, a personal brand and a wedding.</p>
      </div>
      <div className={styles.beyond}>
        {beyond.map((c) => (
          <article key={c.slug} className={styles.mini} style={paletteVars(c.palette)} data-reveal>
            <div className={styles.miniMedia}>
              <Picture media={c.plate.desktop} sizes="(min-width: 1240px) 380px, (min-width: 760px) 30vw, 88vw" />
            </div>
            <div className={styles.miniText}>
              <h3 className={styles.miniName}>
                <Link href={`/work/${c.slug}`} className={styles.cover}>
                  {c.name}
                </Link>
              </h3>
              <p className={styles.miniKind}>{c.kindLabel}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
