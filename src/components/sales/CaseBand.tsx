import Link from 'next/link';
import { PhoneFrame, ScreenFrame } from '@/components/media/Frames';
import { LoopVideo } from '@/components/media/LoopVideo';
import { Picture } from '@/components/media/Picture';
import type { CaseStudy } from '@/content/cases';
import type { Loop, Still } from '@/lib/media';
import { keepDots, paletteVars } from './style';
import styles from './CaseBand.module.css';

type Props = {
  c: CaseStudy;
  /** Two or three of the case's findings. */
  findings: string[];
  wide: { loop: Loop; caption: string };
  phone: { still: Still; caption: string };
};

/** One case, shown properly, in a band of the client's own palette. */
export function CaseBand({ c, findings, wide, phone }: Props) {
  const id = `case-${c.slug}`;
  return (
    <section className={`sheet-up ${styles.band}`} style={paletteVars(c.palette)} aria-labelledby={id}>
      <div className={`container ${styles.inner}`}>
        {/* The homepage is already shown above. This band goes straight to the findings and tools. */}
        <div className={styles.aside}>
          <header className={styles.head}>
            <p className={styles.kicker}>
              <span className={styles.kickerLine}>
                <span>{keepDots(c.kindLabel)}</span>
              </span>
            </p>
            <h2 id={id} className={styles.name}>
              {c.name}
            </h2>
            <p className={styles.question}>{c.intro}</p>
            {c.status ? (
              <p className={styles.status}>
                <span className={styles.statusDot} aria-hidden="true" />
                {c.status}
              </p>
            ) : null}
          </header>
        </div>

        <div className={styles.found} data-reveal>
          <h3 className={styles.sub}>What I found</h3>
          <ol className={styles.findings}>
            {findings.map((f, n) => (
              <li key={f} className={styles.finding}>
                <span className={styles.fnum} aria-hidden="true">
                  {String(n + 1).padStart(2, '0')}
                </span>
                <span>{f}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className={styles.gallery}>
          <figure className={styles.wide} data-reveal>
            <ScreenFrame>
              <LoopVideo loop={wide.loop} />
            </ScreenFrame>
            <figcaption className={styles.caption}>{wide.caption}</figcaption>
          </figure>
          <figure className={styles.phoneFig} data-reveal>
            <PhoneFrame className={styles.phoneFrame}>
              <Picture media={phone.still} sizes="(min-width: 1000px) 210px, (min-width: 760px) 24vw, min(210px, calc(59vw - 24px))" />
            </PhoneFrame>
            <figcaption className={styles.caption}>{phone.caption}</figcaption>
          </figure>
        </div>

        <div className={styles.foot} data-reveal>
          {c.measured?.length ? (
            <ul className={styles.facts}>
              {c.measured.map((m) => (
                <li key={m.fact} className={styles.fact}>
                  <span className={styles.factText}>{m.fact}</span>
                  {m.how ? <span className={styles.factHow}>{m.how}</span> : null}
                </li>
              ))}
            </ul>
          ) : null}
          <Link href={`/work/${c.slug}`} className={styles.cta} data-track={`case-${c.slug}`}>
            <span>Read the full case</span>
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path d="M3 8h9.5M8.5 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
