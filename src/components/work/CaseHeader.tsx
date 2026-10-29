import Link from 'next/link';
import { DisplayTitle } from '@/components/ui/DisplayTitle';
import { preload } from 'react-dom';
import type { CaseStudy } from '@/content/cases';
import { BrowserFrame, PhoneFrame } from '@/components/media/Frames';
import { LoopVideo } from '@/components/media/LoopVideo';
import { Picture } from '@/components/media/Picture';
import { Plate } from '@/components/media/Plate';
import { isWindow, LIVE_PHONE_SIZES } from './layout';
import { toneOf } from './palette';
import styles from './CaseHeader.module.css';
import { Exhibit } from './Exhibit';

const enter = (i: number) => ({ ['--i' as string]: i });

/** Whether the case's best moment is a whole-window loop, which then plays in the header itself. */
export const heroInHeader = (c: CaseStudy) => isWindow(c.hero);

/**
 * The case's first screen, in its own palette (the --case-* properties come from the page):
 * the owner's question as the lede, then the site on desktop and phone, its foot reaching
 * past the band into the page. When the best moment is a whole-window loop it plays in the
 * desktop frame, so the page opens with the site moving and nothing repeats further down.
 */
export function CaseHeader({ c }: { c: CaseStudy }) {
  const live = heroInHeader(c);
  // The poster is the largest thing on the first screen; fetch it before anything else.
  if (live) preload(c.hero.poster, { as: 'image', fetchPriority: 'high' });

  return (
    <header className={styles.header} data-tone={toneOf(c.palette)} data-theme={toneOf(c.palette)}>
      <div className={`container ${styles.top}`}>
        <Link href="/work" className={styles.back} data-enter>
          <svg viewBox="0 0 16 16" aria-hidden="true">
            <path d="M13 8H3.5M7.5 4l-4 4 4 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Work
        </Link>
        <p className={styles.kind} data-enter style={enter(1)}>
          {c.kindLabel}
        </p>
        <DisplayTitle className={styles.name}>
          {c.name}
        </DisplayTitle>
        <div className={styles.lead}>
          <p className={styles.question} data-enter style={enter(2)}>
            {c.question}
          </p>
          <div className={styles.meta} data-enter style={enter(3)}>
            <p className={styles.metaLabel} id={`${c.slug}-services`}>
              Services
            </p>
            <ul className={styles.tags} aria-labelledby={`${c.slug}-services`}>
              {c.services.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
            {c.status ? <p className={styles.status}>{c.status}</p> : null}
          </div>
        </div>
      </div>
      <Exhibit className={`container ${styles.plateWrap}`} arrive>
      <div data-exhibit>
        {live ? (
          <div className={styles.live}>
            <BrowserFrame domain={c.domain}>
              <LoopVideo loop={c.hero} className={styles.liveLoop} />
            </BrowserFrame>
            <PhoneFrame className={styles.livePhone}>
              <Picture media={c.plate.phone} sizes={LIVE_PHONE_SIZES} priority />
            </PhoneFrame>
          </div>
        ) : (
          <Plate desktop={c.plate.desktop} phone={c.plate.phone} domain={c.domain} priority />
        )}
      </div>
      </Exhibit>
    </header>
  );
}
