import Link from 'next/link';
import type { CSSProperties } from 'react';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { Keep } from '@/components/pages/Keep';
import { caseBySlug } from '@/content/cases';
import { PLACES, type PlaceId } from '@/content/found';
import { OFFERS } from '@/content/offers';
import { SITE } from '@/content/site';
import type { GroupId, Line, Report } from '@/lib/look/report';
import { LookingMark, ScrollToResult } from './ScrollToResult';
import styles from './Report.module.css';

/** Which part of the work each group of the look belongs to, for the way through to the cases. */
const PLACE_OF: Record<GroupId, PlaceId> = { search: 'search', phone: 'site', booking: 'booking', counting: 'tracking', wording: 'site' };

const check = OFFERS.find((o) => o.id === 'check')!;

function Mark({ tone }: { tone: Line['tone'] }) {
  return <span className={styles.mark} data-tone={tone} aria-hidden="true" />;
}

const TONE_WORDS: Record<Line['tone'], string> = { look: 'Worth a look: ', fine: 'As it should be: ', note: '' };

function LineView({ line, index }: { line: Line; index: number }) {
  const c = line.seen ? caseBySlug(line.seen.slug) : undefined;
  return (
    <li className={styles.line} data-tone={line.tone} style={{ '--i': index } as CSSProperties}>
      <Mark tone={line.tone} />
      <div className={styles.lineBody}>
        <p className={styles.text}>
          <span className="sr-only">{TONE_WORDS[line.tone]}</span>
          {line.text}
        </p>
        {line.seen && c ? (
          <p className={styles.seen}>
            Seen at{' '}
            <Link href={`/work/${c.slug}`} className={styles.seenCase} style={{ '--dot': c.palette.ground, '--dot-ring': c.palette.accent } as CSSProperties}>
              <span className={styles.dot} aria-hidden="true" />
              {c.short}
            </Link>
            : “{line.seen.text.replace(/\.$/, '')}”
          </p>
        ) : null}
      </div>
    </li>
  );
}

/** What the website check adds, offered under the look with the address carried into the request. */
function Next({ host, challenged = false }: { host: string; challenged?: boolean }) {
  return (
    <div className={`paper ${styles.next}`} data-theme="light">
      <div className={styles.nextCopy}>
        <p className="t-label">The website check</p>
        <h3 className={styles.nextTitle}>{challenged ? 'I can look properly on the call.' : 'That is the first look, from the page alone.'}</h3>
        <p className={styles.nextText}>
          The check walks the whole path: your Google profile itself, the site on a real phone, where booking or intake actually goes, what the ad account
          and Analytics count, and the wording. You get a recorded walkthrough and a ranked list with a fixed price beside each fix.
        </p>
      </div>
      <div className={styles.nextSide}>
        <p className={styles.price}>{check.price}</p>
        <p className={styles.terms}>{check.terms}</p>
        <div className={styles.actions}>
          <ButtonLink href={`${SITE.checkHref}?site=${encodeURIComponent(host)}`} arrow track="look-check">
            Start with the website check
          </ButtonLink>
          <ButtonLink href={SITE.bookingHref} variant="ghost" track="look-book">
            <>
              Book a <Keep>20-minute</Keep> call
            </>
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}

export function ReportView({ report }: { report: Report }) {
  if (report.challenged) {
    return (
      <section className={styles.result} aria-labelledby="look-result" data-result>
        <ScrollToResult />
        <div className="container">
          <header className={styles.head}>
            <h2 id="look-result" className={styles.host}>{report.host}</h2>
            <p className={styles.summary}>answered with a bot check instead of its page</p>
          </header>
          <p className={styles.challenge}>
            The site put a verification page in front of me rather than the page itself. Google is let through; a script reading the page once is
            not. Nothing here is wrong with the site, and nothing more can be read this way.
          </p>
          <Next host={report.host} challenged />
        </div>
      </section>
    );
  }

  let n = 0;
  return (
    <section className={styles.result} aria-labelledby="look-result" data-result>
      <ScrollToResult />
      <div className="container">
        <header className={styles.head}>
          <h2 id="look-result" className={styles.host}>{report.host}</h2>
          <p className={styles.summary}>
            {report.worth === 0 ? 'nothing worth a look from the page alone' : `${report.worth} worth a look`}
            <span aria-hidden="true"> · </span>
            {report.fine} as {report.fine === 1 ? 'it' : 'they'} should be
            {report.platform ? (
              <>
                <span aria-hidden="true"> · </span>
                {report.platform}
              </>
            ) : null}
          </p>
        </header>

        <div className={styles.groups}>
          {report.groups.map((group) => {
            const place = PLACES.find((p) => p.id === PLACE_OF[group.id])!;
            const worth = group.lines.some((l) => l.tone === 'look');
            return (
              <section key={group.id} className={styles.group} aria-labelledby={`look-${group.id}`}>
                <h3 id={`look-${group.id}`} className={styles.groupTitle}>
                  {group.title}
                </h3>
                <div className={styles.groupBody}>
                  <ul className={styles.lines}>
                    {group.lines.map((line) => (
                      <LineView key={line.text} line={line} index={n++} />
                    ))}
                  </ul>
                  {worth ? (
                    <Link href={`/work?filter=${place.id}`} className={styles.more}>
                      Cases where the problem was {place.label.charAt(0).toLowerCase() + place.label.slice(1)}
                      <svg viewBox="0 0 16 16" aria-hidden="true">
                        <path d="M3 8h9.5M8.5 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Link>
                  ) : null}
                </div>
              </section>
            );
          })}
        </div>

        <Next host={report.host} />
      </div>
    </section>
  );
}

export function ReportError({ host, message }: { host: string; message: string }) {
  return (
    <section className={styles.result} aria-labelledby="look-result" data-result>
      <ScrollToResult />
      <div className="container">
        <header className={styles.head}>
          <h2 id="look-result" className={styles.host}>{host || 'That address'}</h2>
          <p className={styles.summary}>could not be read</p>
        </header>
        <p className={styles.challenge}>{message}</p>
      </div>
    </section>
  );
}

/** Shown while the page is being read. */
export function Looking({ host }: { host: string }) {
  return (
    <section className={styles.result} aria-label="Reading the page" data-result>
      <LookingMark />
      <div className="container">
        <header className={styles.head}>
          <p className={styles.host} aria-hidden="true">{host}</p>
          <p className={styles.summary}>reading the page</p>
        </header>
      </div>
    </section>
  );
}
