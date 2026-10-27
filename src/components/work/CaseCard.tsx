import Link from 'next/link';
import type { CaseStudy } from '@/content/cases';
import { BrowserFrame, PhoneFrame } from '@/components/media/Frames';
import { LoopVideo } from '@/components/media/LoopVideo';
import { Picture } from '@/components/media/Picture';
import { ratio } from './layout';
import { paletteVars, toneOf } from './palette';
import styles from './CaseCard.module.css';
import { Exhibit } from './Exhibit';

type Props = {
  c: CaseStudy;
  /** Feature: a large stage for a practice. Compact: a smaller exhibit for the other work. */
  variant?: 'feature' | 'compact';
};

/**
 * A case on its own palette ground. The heading's link stretches over the whole card;
 * the media sits above it with pointer events passed through, so the loop's pause button
 * stays reachable while a tap anywhere else opens the case.
 */
export function CaseCard({ c, variant = 'feature' }: Props) {
  // A loop of the whole window plays in the browser frame. A loop of a slice of a page
  // (Endorphins' discipline index) does not fit it, so the home page shows there instead
  // and a phone loop plays in the phone.
  const shape = ratio(c.hero);
  const deskLoop = shape > 1.1 && shape < 1.9 ? c.hero : undefined;
  const phoneLoop = deskLoop ? undefined : c.loops.find((l) => l.device === 'phone');
  const feature = variant === 'feature';

  return (
    <article className={styles.card} data-variant={variant} data-tone={toneOf(c.palette)} data-theme={toneOf(c.palette)} style={paletteVars(c.palette)}>
      <div className={styles.text}>
        <p className={styles.kind}>{c.kindLabel}</p>
        <h3 className={styles.name}>
          <Link href={`/work/${c.slug}`} className={styles.link}>
            {c.name}
          </Link>
        </h3>
        <p className={styles.summary}>{c.summary}</p>
        {/* A no-break space keeps each separator with the word before it, so no line starts with one */}
        <p className={styles.services}>{c.services.join('\u00a0· ')}</p>
        {c.status ? <p className={styles.status}>{c.status}</p> : null}
      </div>
      <Exhibit className={styles.exhibit}>
      <div className={styles.media} data-exhibit>
        <BrowserFrame domain={c.domain} className={styles.desk}>
          <div className={styles.clip}>
            {deskLoop ? (
              <LoopVideo loop={deskLoop} className={styles.deskLoop} />
            ) : (
              <Picture
                media={c.plate.desktop}
                sizes={
                  feature
                    ? '(min-width: 1280px) 1000px, (min-width: 760px) 78vw, calc(100vw - 80px)'
                    : '(min-width: 960px) 40vw, calc(100vw - 80px)'
                }
              />
            )}
          </div>
        </BrowserFrame>
        <PhoneFrame className={styles.phone}>
          <div className={styles.clip}>
            {phoneLoop ? (
              <LoopVideo loop={phoneLoop} />
            ) : (
              <Picture
                media={c.plate.phone}
                sizes={feature ? '(min-width: 1280px) 220px, (min-width: 960px) 18vw, 23vw' : '(min-width: 960px) 10vw, 23vw'}
              />
            )}
          </div>
        </PhoneFrame>
      </div>
      </Exhibit>
      <span className={styles.more} aria-hidden="true">
        Read the case
        <svg viewBox="0 0 16 16" className={styles.arrow}>
          <path d="M3 8h9.5M8.5 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </article>
  );
}
