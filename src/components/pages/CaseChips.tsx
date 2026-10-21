import Link from 'next/link';
import type { CSSProperties } from 'react';
import { caseBySlug } from '@/content/cases';
import styles from './CaseChips.module.css';

/** Small links to the cases behind a claim, each marked with the client's own colour. */
export function CaseChips({ slugs, label = 'The work' }: { slugs: string[]; label?: string }) {
  const cases = slugs.map(caseBySlug).filter((c) => c !== undefined);
  if (!cases.length) return null;
  return (
    <ul className={styles.chips} aria-label={label}>
      {cases.map((c) => (
        <li key={c.slug}>
          <Link
            href={`/work/${c.slug}`}
            className={styles.chip}
            style={{ '--chip-ground': c.palette.ground, '--chip-accent': c.palette.accent } as CSSProperties}
          >
            <span className={styles.dot} aria-hidden="true" />
            <span>{c.short}</span>
            <svg className={styles.arrow} viewBox="0 0 16 16" aria-hidden="true">
              <path d="M3 8h9.5M8.5 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </li>
      ))}
    </ul>
  );
}
