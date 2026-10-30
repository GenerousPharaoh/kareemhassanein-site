import type { Metadata } from 'next';
import { DisplayTitle } from '@/components/ui/DisplayTitle';
import { preload } from 'react-dom';
import { CaseCard } from '@/components/work/CaseCard';
import { CaseStack } from '@/components/work/CaseStack';
import { CloseCall } from '@/components/work/CloseCall';
import { WorkFilter } from '@/components/work/WorkFilter';
import { BEYOND_CASES, PRACTICE_CASES } from '@/content/cases';
import { SITE } from '@/content/site';
import styles from './page.module.css';

const description =
  'Case studies from a tax law firm and health clinics, then a gear store, a travel journal and a wedding. Each starts with the owner’s question, then what I found, what I decided and what shipped.';

const ogImage = PRACTICE_CASES[0].plate.desktop;

export const metadata: Metadata = {
  title: 'Case studies',
  description,
  alternates: { canonical: '/work' },
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    locale: 'en_CA',
    url: '/work',
    title: `Case studies · ${SITE.name}`,
    description,
    images: [{ url: `${ogImage.src}-1600.webp`, width: 1600, height: Math.round((1600 * ogImage.h) / ogImage.w), alt: ogImage.alt }],
  },
};

export default function WorkPage() {
  // The first card's loop poster is the largest thing on the first screen; fetch it first.
  preload(PRACTICE_CASES[0].hero.poster, { as: 'image', fetchPriority: 'high' });

  return (
    <>
      {/* The chips need JavaScript; without it the full list shows and the chips stay out of the way. */}
      <noscript>
        <style>{'[data-work-filter]{display:none}'}</style>
      </noscript>

      <header className={`container ${styles.intro}`}>
        <DisplayTitle className={styles.title}>
          Case studies
        </DisplayTitle>
        <p className={styles.lede} data-enter style={{ ['--i' as string]: 1 }}>
          Each case starts with a question, then what I found, what I decided, what shipped and what was measured.
        </p>
      </header>

      {/* data-work-item marks what takes part when the filter changes (see WorkFilter) */}
      <WorkFilter>
        <section className={`container ${styles.group}`} data-group="practices" aria-labelledby="work-practices">
          <h2 id="work-practices" className={styles.groupTitle} data-work-item>
            Law firms and clinics
          </h2>
          <CaseStack className={styles.features}>
            {PRACTICE_CASES.map((c) => (
              <li key={c.slug} className={styles.item} data-sectors={c.sectors.join(' ')} data-work-item>
                <div className={styles.reveal}>
                  <CaseCard c={c} variant="feature" />
                </div>
              </li>
            ))}
          </CaseStack>
        </section>

        <section className={`container ${styles.group} ${styles.beyond}`} data-group="beyond" aria-labelledby="work-beyond">
          <div className={styles.groupHead} data-work-item>
            <h2 id="work-beyond" className={styles.groupTitle}>
              Other projects
            </h2>
            <p className={styles.groupLine}>A gear store, a travel journal and a wedding.</p>
          </div>
          <ul className={styles.compacts}>
            {BEYOND_CASES.map((c) => (
              <li key={c.slug} className={styles.item} data-sectors={c.sectors.join(' ')} data-work-item>
                <div className={styles.reveal}>
                  <CaseCard c={c} variant="compact" />
                </div>
              </li>
            ))}
          </ul>
        </section>
      </WorkFilter>

      <div data-work-item>
        <CloseCall
          track="work"
          title="Not sure where to start?"
          body="Book a short call and tell me what is not working, or begin with the website check. Its price is credited in full toward any work within 60 days."
        />
      </div>
    </>
  );
}
