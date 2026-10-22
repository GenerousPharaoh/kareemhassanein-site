import Link from 'next/link';
import type { CaseStudy } from '@/content/cases';
import { BrowserFrame } from '@/components/media/Frames';
import { Picture } from '@/components/media/Picture';
import { paletteVars, toneOf } from './palette';
import styles from './NextCase.module.css';

/** The next case, in its own palette, with its home page rising from the band's lower edge. */
export function NextCase({ c }: { c: CaseStudy }) {
  return (
    <nav className={styles.next} style={paletteVars(c.palette)} data-tone={toneOf(c.palette)} aria-label="Next case">
      <Link href={`/work/${c.slug}`} className={styles.link} aria-label={`Next case: ${c.name}`}>
        <div className={`container ${styles.inner}`}>
          <div className={styles.text}>
            <p className={styles.label}>Next case</p>
            <p className={styles.name}>{c.name}</p>
            <p className={styles.kind}>{c.kindLabel}</p>
            <p className={styles.go}>
              Read the case
              <svg viewBox="0 0 16 16" aria-hidden="true">
                <path d="M3 8h9.5M8.5 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </p>
          </div>
          <div className={styles.peek} aria-hidden="true">
            <BrowserFrame domain={c.domain} className={styles.frame}>
              <Picture media={c.plate.desktop} sizes="(min-width: 1280px) 705px, (min-width: 960px) calc(57vw - 23px), calc(100vw - 40px)" />
            </BrowserFrame>
          </div>
        </div>
      </Link>
    </nav>
  );
}
