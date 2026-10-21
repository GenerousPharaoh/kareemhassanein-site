import Link from 'next/link';
import { CloseBand } from '@/components/pages/CloseBand';
import { enter } from '@/components/pages/enter';
import { Keep } from '@/components/pages/Keep';
import { pageMeta } from '@/lib/meta';
import { NoteTitle } from '@/components/pages/NoteBody';
import { PageHead } from '@/components/pages/PageHead';
import { caseBySlug } from '@/content/cases';
import { NOTES, readingMinutes } from '@/content/notes';
import { paletteVars } from '@/lib/palette';
import styles from './page.module.css';

export const metadata = pageMeta({
  title: 'Notes',
  description:
    'Practical notes for owners of law firms and of dental and medical practices: what Google Ads really counts, and which new patients came from the website and ads.',
  path: '/notes',
});

export default function NotesPage() {
  return (
    <>
      <div className={`container ${styles.page}`}>
        <PageHead
          label="Notes"
          title="Notes for practice owners"
          lede="Practical answers to questions owners ask about their ads, tracking and booking, each from work on a real practice."
        />

        <ol className={styles.list} data-enter style={enter(3)}>
          {NOTES.map((note) => {
            const cases = note.cases.map(caseBySlug).filter((c) => c !== undefined);
            return (
              <li key={note.slug} className={styles.item}>
                <Link href={`/notes/${note.slug}`} className={styles.link}>
                  <span className={styles.side}>
                    <span className={styles.meta}>
                      <time dateTime={note.month}>{note.monthLabel}</time>
                      <span aria-hidden="true">·</span>
                      <span>{readingMinutes(note)} min read</span>
                    </span>
                    <span className={styles.audience}>{note.audience}</span>
                  </span>
                  <h2 className={styles.title}>
                    <NoteTitle text={note.title} tailClassName={styles.titleTail} />
                  </h2>
                  <span className={styles.summary}>{note.summary}</span>
                  <span className={styles.foot}>
                    <span className={styles.cases}>
                      {cases.map((c) => (
                        <span
                          key={c.slug}
                          className={styles.case}
                          style={paletteVars(c.palette)}
                        >
                          <span className={styles.dot} aria-hidden="true" />
                          {c.short}
                        </span>
                      ))}
                    </span>
                    <span className={styles.read}>
                      Read the note
                      <svg viewBox="0 0 16 16" aria-hidden="true">
                        <path d="M3 8h9.5M8.5 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ol>
      </div>

      <CloseBand
        title="I can look at yours."
        line={
          <>
            Book a <Keep>20-minute</Keep> call, or start with the website check: your whole path from search to booked, with a
            fixed price beside each fix.
          </>
        }
        track="notes-close"
      />
    </>
  );
}
