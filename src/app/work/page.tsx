import type { Metadata } from 'next';
import { DisplayTitle } from '@/components/ui/DisplayTitle';
import { preload } from 'react-dom';
import { CaseCard } from '@/components/work/CaseCard';
import { CaseStack } from '@/components/work/CaseStack';
import { CloseCall } from '@/components/work/CloseCall';
import { WorkFilter } from '@/components/work/WorkFilter';
import { CASES, caseBySlug } from '@/content/cases';
import { SITE } from '@/content/site';
import styles from './page.module.css';

const description =
  'Website builds, an online store redesign, booking integrations and advertising reviews, with screenshots, completed work and recorded results.';

const businessCases = ['techniques-combat', 'endorphins', 'tax-relief-counsel', 'physiomax', 'kinetikare'].map((slug) => caseBySlug(slug)!);
const personalCases = CASES.filter((c) => ['travel-journal', 'wedding'].includes(c.slug));
const ogImage = businessCases[0].plate.desktop;

export const metadata: Metadata = {
  title: 'Work',
  description,
  alternates: { canonical: '/work' },
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    locale: 'en_CA',
    url: '/work',
    title: `Work · ${SITE.name}`,
    description,
    images: [{ url: `${ogImage.src}-1600.webp`, width: 1600, height: Math.round((1600 * ogImage.h) / ogImage.w), alt: ogImage.alt }],
  },
};

export default function WorkPage() {
  // The first card's loop poster is the largest thing on the first screen; fetch it first.
  preload(businessCases[0].hero.poster, { as: 'image', fetchPriority: 'high' });

  return (
    <>
      {/* The chips need JavaScript; without it the full list shows and the chips stay out of the way. */}
      <noscript>
        <style>{'[data-work-filter]{display:none}'}</style>
      </noscript>

      <header className={`container ${styles.intro}`}>
        <DisplayTitle className={styles.title}>
          Work
        </DisplayTitle>
        <p className={styles.lede} data-enter style={{ ['--i' as string]: 1 }}>
          Website builds, an online store redesign, booking integrations and advertising reviews, with screenshots and details of the work.
        </p>
      </header>

      {/* data-work-item marks what takes part when the filter changes (see WorkFilter) */}
      <WorkFilter>
        <section className={`container ${styles.group}`} data-group="business" aria-labelledby="work-business">
          <h2 id="work-business" className={styles.groupTitle} data-work-item>
            Business projects
          </h2>
          <CaseStack className={styles.features}>
            {businessCases.map((c) => (
              <li key={c.slug} className={styles.item} data-category={c.slug === 'techniques-combat' ? 'stores' : 'websites'} data-work-item>
                <div className={styles.reveal}>
                  <CaseCard c={c} variant="feature" />
                </div>
              </li>
            ))}
          </CaseStack>
        </section>

        <section className={`container ${styles.group} ${styles.beyond}`} data-group="personal" aria-labelledby="work-personal">
          <div className={styles.groupHead} data-work-item>
            <h2 id="work-personal" className={styles.groupTitle}>
              Personal projects
            </h2>
            <p className={styles.groupLine}>A travel journal built around the clients’ photographs, and a wedding site with travel information and RSVP.</p>
          </div>
          <ul className={styles.compacts}>
            {personalCases.map((c) => (
              <li key={c.slug} className={styles.item} data-category="personal" data-work-item>
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
          title="Discuss a website project"
          body="Describe the work you need on a 20-minute call, or request a website check. The check is credited in full toward any work within 60 days."
        />
      </div>
    </>
  );
}
