'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { Picture } from '@/components/media/Picture';
import { getGsap, useGsap } from '@/lib/gsap';
import type { Still } from '@/lib/media';
import s from './PathFilm.module.css';

export type FilmStory = {
  query: string;
  result: { name: string; domain: string; line: string };
  desktop: Still;
  phone: Still;
  booked: { title: string; lines: string[] };
  counted: { event: string; source: string; note: string; chartLabel: string; bars: Array<{ label: string; share: number }> };
};

const STAGES = ['Found', 'Chosen', 'Booked', 'Counted'] as const;
// Where each stage begins along the film (0 to 1), so the label under the film follows the story.
const STAGE_AT = [0, 0.2, 0.46, 0.6];

/**
 * The home page opening: a short film of the path, driven by the scroll. The stage stays pinned
 * while the camera moves from the search, into the chosen result, onto the client's own site, to
 * the request, and into the ledger where it is counted. With reduced motion, or without scripts,
 * the same frames sit in order as a still sequence.
 */
export function PathFilm({ story, bookingHref }: { story: FilmStory; bookingHref: string }) {
  const root = useRef<HTMLElement>(null);

  useGsap(root, ({ reduce, mobile }) => {
    if (reduce) return;
    const { gsap } = getGsap();
    const el = root.current!;
    const q = gsap.utils.selector(el);

    // The first screen's entrance and the typed query run in CSS from the first paint (no wait for
    // scripts, no flash); GSAP only drives the scroll.
    const search = q('[data-search]')[0];
    const site = q('[data-site]')[0];
    const confirm = q('[data-confirm]')[0];
    const ledger = q('[data-ledger]')[0];
    const pair = q('[data-pair]')[0];
    const labels = q('[data-stage]');

    // Where the search starts: beside the headline on wide screens, under it on phones.
    const start = mobile ? { x: 0, y: '31svh', scale: 0.9 } : { x: '22vw', y: '25vh', scale: 0.7 };

    const tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: el,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.7,
        onUpdate: (self) => {
          const p = self.progress;
          let active = 0;
          STAGE_AT.forEach((at, i) => {
            if (p >= at) active = i;
          });
          labels.forEach((l, i) => l.toggleAttribute('data-on', i === active));
        },
      },
    });

    tl.fromTo(search, start, { x: 0, y: 0, scale: 1, duration: 1.3, ease: 'power2.inOut' }, 0)
      .fromTo(q('[data-o-line] > span'), { y: 0, yPercent: 0, opacity: 1 }, { yPercent: -135, opacity: 0, duration: 0.9, stagger: 0.08, ease: 'power2.in' }, 0)
      .fromTo(q('[data-o-foot]'), { y: 0, opacity: 1 }, { y: -30, opacity: 0, duration: 0.6, ease: 'power1.in' }, 0)
      // The results arrive, and one of them is chosen
      .fromTo(q('[data-result]'), { y: 26, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55, stagger: 0.14, ease: 'power2.out' }, 1.15)
      .fromTo(q('[data-chosen]'), { '--chosen': 0 }, { '--chosen': 1, duration: 0.45 }, 1.95)
      // The chosen result opens into the client's own site
      .to(search, { scale: 0.92, opacity: 0, duration: 0.55, ease: 'power2.in' }, 2.4)
      .fromTo(site, { scale: 0.3, opacity: 0, yPercent: 12 }, { scale: 1, opacity: 1, yPercent: 0, duration: 1.25, ease: 'power3.inOut' }, 2.6)
      .fromTo(q('[data-site-img]'), { yPercent: 0 }, { yPercent: mobile ? -14 : -9, duration: 2.6, ease: 'power1.inOut' }, 3.2)
      // The request goes through
      .fromTo(confirm, { yPercent: 130, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 1, ease: 'power3.out' }, 4.6)
      .fromTo(q('[data-tick]'), { strokeDashoffset: 32 }, { strokeDashoffset: 0, duration: 0.5, ease: 'power2.out' }, 5.25)
      // ...and is counted, against the ad that brought it
      .to(pair, mobile ? { scale: 0.48, yPercent: -38, duration: 1.2, ease: 'power2.inOut' } : { xPercent: -26, scale: 0.64, duration: 1.2, ease: 'power2.inOut' }, 5.9)
      .fromTo(ledger, mobile ? { yPercent: 40, opacity: 0 } : { x: 90, opacity: 0 }, mobile ? { yPercent: 0, opacity: 1, duration: 1 } : { x: 0, opacity: 1, duration: 1, ease: 'power3.out' }, 6.25)
      .fromTo(q('[data-bar]'), { scaleX: 0 }, { scaleX: 1, duration: 0.7, stagger: 0.14, ease: 'power3.out' }, 6.7)
      .fromTo(q('[data-counted]'), { scale: 0.4, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: 'back.out(2.2)' }, 7.05)
      // The point of it all
      .to([pair, ledger], { opacity: 0, y: -50, duration: 0.6, ease: 'power2.in' }, 8.2)
      .fromTo(q('[data-c-word]'), { y: 0, yPercent: 115, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.85, stagger: 0.08, ease: 'expo.out' }, 8.85)
      .fromTo(q('[data-progress]'), { scaleX: 0 }, { scaleX: 1, duration: 10 }, 0);
  }, [story.query]);

  const closing = ['Every', 'step', 'working,', 'and', 'counted.'];

  return (
    <section ref={root} className={s.film} aria-labelledby="film-title">
      <div className={s.stage}>
        <div className={`container ${s.opening}`}>
          <h1 id="film-title" className={s.title}>
            <span className={s.mask} data-o-line style={{ ['--d' as string]: 0 }}>
              <span>From a search</span>
            </span>
            <span className={s.mask} data-o-line style={{ ['--d' as string]: 1 }}>
              <span>to a booked</span>
            </span>
            <span className={s.mask} data-o-line style={{ ['--d' as string]: 2 }}>
              <span>
                <em>appointment.</em>
              </span>
            </span>
          </h1>
          <div className={s.openingFoot} data-o-foot>
            <p className={s.intro}>
              I build and run the whole path for independent law firms and dental and medical clinics, and I count every step of it.
            </p>
            <Link href={bookingHref} className={s.cta} data-track="hero-book">
              Book a 20-minute call
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M5 12h13m-5-6 6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>

        {/* The film's frames are pictures of the story; the text above and below carries the meaning */}
        <div className={s.frames} aria-hidden="true">
          <div className={s.searchWrap}>
          <div className={s.search} data-search>
            <div className={s.field}>
              <svg viewBox="0 0 20 20" className={s.searchIcon}>
                <circle cx="8.5" cy="8.5" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
                <path d="m13 13 4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
              <span className={s.query} data-query style={{ ['--chars' as string]: story.query.length }}>
                {story.query}
              </span>
              <span className={s.caret} />
            </div>
            <ol className={s.results}>
              <li className={`${s.result} ${s.resultChosen}`} data-result data-chosen>
                <span className={s.resultDomain}>
                  <b>Sponsored</b> {story.result.domain}
                </span>
                <span className={s.resultName}>{story.result.name}</span>
                <span className={s.resultLine}>{story.result.line}</span>
              </li>
              {[0, 1].map((n) => (
                <li key={n} className={s.result} data-result>
                  <span className={s.ghost} style={{ width: '34%' }} />
                  <span className={s.ghost} style={{ width: '68%', height: 11 }} />
                  <span className={s.ghost} />
                </li>
              ))}
            </ol>
          </div>
          </div>

          <div className={s.pairWrap}>
          <div className={s.pair} data-pair>
            <div className={s.site} data-site>
              <div className={s.chrome}>
                <span className={s.dots}>
                  <i />
                  <i />
                  <i />
                </span>
                <span className={s.address}>{story.result.domain}</span>
              </div>
              <div className={s.siteView}>
                <div className={s.siteImg} data-site-img>
                  <Picture media={story.desktop} sizes="(min-width: 761px) min(1100px, 80vw), 1px" className={s.siteDesktop} />
                  <Picture media={story.phone} sizes="(max-width: 760px) 86vw, 1px" className={s.sitePhone} />
                </div>
              </div>
            </div>
            <div className={s.confirm} data-confirm>
              <svg viewBox="0 0 24 24" className={s.tick}>
                <circle cx="12" cy="12" r="11" fill="currentColor" opacity="0.14" />
                <path data-tick d="m6.8 12.6 3.4 3.4 7-8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="32" />
              </svg>
              <span className={s.confirmTitle}>{story.booked.title}</span>
              {story.booked.lines.map((l) => (
                <span key={l} className={s.confirmLine}>
                  {l}
                </span>
              ))}
            </div>
          </div>
          </div>

          <div className={s.ledgerWrap}>
          <div className={s.ledger} data-ledger>
            <span className={s.ledgerHead}>Conversions</span>
            <span className={s.row}>
              <span className={s.rowText}>
                <strong>{story.counted.event}</strong>
                <span>{story.counted.source}</span>
              </span>
              <span className={s.badge} data-counted>
                Counted
              </span>
            </span>
            <span className={`${s.row} ${s.rowMuted}`}>
              <span className={s.rowText}>
                <strong>Button click</strong>
                <span>Not a booking, so not counted</span>
              </span>
            </span>
            <span className={s.chart}>
              <span className={s.chartHead}>{story.counted.chartLabel}</span>
              {story.counted.bars.map((b) => (
                <span key={b.label} className={s.bar}>
                  <span className={s.barLabel}>{b.label}</span>
                  <span className={s.barTrack}>
                    <span className={s.barFill} data-bar style={{ width: `${b.share}%` }} />
                  </span>
                </span>
              ))}
            </span>
          </div>
          </div>
        </div>

        <p className={s.closing}>
          {closing.map((w, i) => (
            <span key={w} className={s.mask}>
              <span data-c-word className={i >= 3 ? s.closingEm : undefined}>
                {w}
              </span>
            </span>
          ))}
        </p>

        <div className={s.progressWrap} data-progress-wrap aria-hidden="true">
          <div className={`container ${s.progressInner}`}>
            <span className={s.progressTrack}>
              <span className={s.progressFill} data-progress />
            </span>
            <span className={s.stages}>
              {STAGES.map((st, i) => (
                <span key={st} className={s.stageName} data-stage data-on={i === 0 || undefined}>
                  {st}
                </span>
              ))}
            </span>
          </div>
        </div>
      </div>
      <p className="sr-only">
        An example of the path: someone searches, chooses a firm on its own site, sends a consultation request, and the request is counted against the ad that brought
        it, while a plain button click is not.
      </p>
    </section>
  );
}
