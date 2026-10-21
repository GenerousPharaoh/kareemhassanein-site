import Link from 'next/link';
import { Picture } from '@/components/media/Picture';
import type { CaseStudy } from '@/content/cases';
import { paletteVars } from '@/lib/palette';
import styles from './CaseCard.module.css';

/** A case in its own palette, with the top of its home page rising from the bottom edge. */
export function CaseCard({ item, headingLevel = 3 }: { item: CaseStudy; headingLevel?: 2 | 3 }) {
  const Heading = headingLevel === 2 ? 'h2' : 'h3';
  return (
    <Link
      href={`/work/${item.slug}`}
      className={styles.card}
      style={paletteVars(item.palette)}
    >
      <div className={styles.copy}>
        <span className={styles.kind}>{item.kindLabel}</span>
        <Heading className={styles.name}>{item.name}</Heading>
        <span className={styles.summary}>{item.summary}</span>
        <span className={styles.more}>
          Read the case
          <svg viewBox="0 0 16 16" aria-hidden="true">
            <path d="M3 8h9.5M8.5 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
      <div className={styles.shot} aria-hidden="true">
        <Picture media={{ ...item.plate.desktop, alt: '' }} sizes="(min-width: 1240px) 520px, (min-width: 760px) 44vw, 88vw" />
      </div>
    </Link>
  );
}
