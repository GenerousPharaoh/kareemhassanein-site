'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { BrowserFrame, PhoneFrame, ScreenFrame } from '@/components/media/Frames';
import { Picture } from '@/components/media/Picture';
import { ButtonLink } from '@/components/ui/ButtonLink';
import type { ProofRecord } from '@/content/path';
import { getGsap, useGsap } from '@/lib/gsap';
import type { Loop, Still } from '@/lib/media';
import { useReducedMotion } from '@/lib/useReducedMotion';
import s from './HeroAssembly.module.css';

export type HeroSite = { client: string; domain: string; ground: string; ink: string; still: Still };

type Props = {
  name: string;
  title: string;
  bookingHref: string;
  /** The websites, shown one after another in the browser */
  sites: HeroSite[];
  profile: { client: string; ground: string; ink: string; still: Still };
  booking: { client: string; ground: string; ink: string; loop: Loop };
  tracking: { client: string; ground: string; ink: string; record: ProofRecord };
};

/** Seconds each website stays in the browser before the next one wipes over it. */
const SITE_DWELL = 4.2;

/**
 * The opening of the homepage: the line of what I do, with the online side of a practice set around
 * it, piece by piece, in each client's own colours: a website, a Google profile, a booking page and the
 * record of where a booking is counted. On arrival the pieces travel out from behind the line to their
 * places; while the page rests they float; as the work list rises over them they spread apart.
 */
export function HeroAssembly({ name, title, bookingHref, sites, profile, booking, tracking }: Props) {
  const root = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();
  const [site, setSite] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const [resting, setResting] = useState(false);
  const running = !reduce && !paused && !resting;

  // The browser moves on to the next website while the opening is in view and not paused
  useEffect(() => {
    if (!running) return;
    const t = window.setTimeout(() => {
      setPrev(site);
      setSite((i) => (i + 1) % sites.length);
    }, SITE_DWELL * 1000);
    return () => window.clearTimeout(t);
  }, [running, site, sites.length]);

  useEffect(() => {
    if (prev === null) return;
    const t = window.setTimeout(() => setPrev(null), 800);
    return () => window.clearTimeout(t);
  }, [prev]);

  // The booking page plays with everything else, and rests with it
  useEffect(() => {
    const v = video.current;
    if (!v) return;
    if (running) v.play().catch(() => {});
    else v.pause();
  }, [running]);

  // Rest off screen and in a background tab
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    let inView = true;
    const sync = () => setResting(!inView || document.hidden);
    const io = new IntersectionObserver(([e]) => {
      inView = e.isIntersecting;
      sync();
    });
    io.observe(el);
    document.addEventListener('visibilitychange', sync);
    return () => {
      io.disconnect();
      document.removeEventListener('visibilitychange', sync);
    };
  }, []);

  // Arrival: the pieces travel out from behind the line to their places, the line rises, then the labels
  useGsap(root, ({ reduce: r }) => {
    if (r) return;
    const { gsap, SplitText } = getGsap();
    const el = root.current!;
    const arrived = document.documentElement.hasAttribute('data-route-arrival');
    const pieces = [...el.querySelectorAll<HTMLElement>('[data-piece]')];
    const centre = el.querySelector<HTMLElement>('[data-centre]')!;

    if (!arrived) {
      const c = centre.getBoundingClientRect();
      const cx = c.left + c.width / 2;
      const cy = c.top + c.height / 2;
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
      pieces.forEach((p, i) => {
        const b = p.getBoundingClientRect();
        tl.fromTo(
          p,
          { x: (cx - (b.left + b.width / 2)) * 0.78, y: (cy - (b.top + b.height / 2)) * 0.78, scale: 0.62, autoAlpha: 0 },
          { x: 0, y: 0, scale: 1, autoAlpha: 1, duration: 1.35, clearProps: 'transform,opacity,visibility' },
          0.15 + i * 0.07,
        );
      });
      const split = SplitText.create(el.querySelector('[data-title]'), { type: 'lines', mask: 'lines' });
      tl.from(split.lines, { yPercent: 105, duration: 1, stagger: 0.08 }, 0.1)
        .from(el.querySelectorAll('[data-label]'), { autoAlpha: 0, y: 6, duration: 0.6, stagger: 0.05 }, 1.05)
        .from(el.querySelectorAll('[data-after]'), { autoAlpha: 0, y: 12, duration: 0.7, stagger: 0.06 }, 0.6);
    }

    // As the work list rises over the opening, the pieces part at different depths and the line recedes
    const scrub = { trigger: el, start: 'top top', end: 'bottom top', scrub: true };
    const out: Record<string, { x: number; y: number }> = {
      // Sideways, away from the line, so nothing rises into the navigation
      site: { x: -120, y: -40 },
      profile: { x: 130, y: -30 },
      booking: { x: 80, y: 30 },
      tracking: { x: -80, y: 30 },
    };
    pieces.forEach((p) => {
      const o = out[p.dataset.piece ?? ''] ?? { x: 0, y: -80 };
      gsap.to(p.querySelector('[data-depth]'), { x: o.x, y: o.y, ease: 'none', scrollTrigger: scrub });
    });
    gsap.to(centre, { y: -60, autoAlpha: 0.25, ease: 'none', scrollTrigger: scrub });
    gsap.fromTo(el.querySelector('[data-dim]'), { opacity: 0 }, { opacity: 0.7, ease: 'none', scrollTrigger: scrub });
  });

  const current = sites[site];
  const stateOf = (i: number) => (i === site ? 'on' : i === prev ? 'prev' : 'off');

  return (
    <section ref={root} className={s.hero} aria-labelledby="hero-title" data-theme="dark" data-running={running || undefined} data-hero-opening>
      <div className={s.field}>
        <figure className={s.piece} data-piece="site" style={{ '--ground': current.ground, '--ink-on': current.ink } as CSSProperties}>
          <div className={s.depth} data-depth>
            <div className={s.float}>
              <div className={s.mat}>
                <figcaption className={s.label} data-label>
                  <span className={s.role}>Website</span>
                  <span key={site} className={s.client}>
                    {current.client}
                  </span>
                </figcaption>
                <BrowserFrame domain={current.domain} className={s.browser}>
                  <div className={s.sites}>
                    {sites.map((it, i) => (
                      <div key={it.domain} className={s.siteShot} data-state={stateOf(i)} aria-hidden={i !== site || undefined}>
                        <Picture media={it.still} sizes="(min-width: 1000px) 34vw, 70vw" priority={i === 0} />
                      </div>
                    ))}
                  </div>
                </BrowserFrame>
              </div>
            </div>
          </div>
        </figure>

        <figure className={s.piece} data-piece="profile" style={{ '--ground': profile.ground, '--ink-on': profile.ink } as CSSProperties}>
          <div className={s.depth} data-depth>
            <div className={s.float}>
              <div className={s.mat}>
                <figcaption className={s.label} data-label>
                  <span className={s.role}>Google profile</span>
                  <span className={s.client}>{profile.client}</span>
                </figcaption>
                <ScreenFrame className={s.screen}>
                  <Picture media={profile.still} sizes="(min-width: 1000px) 30vw, 52vw" priority />
                </ScreenFrame>
              </div>
            </div>
          </div>
        </figure>

        <figure className={s.piece} data-piece="booking" style={{ '--ground': booking.ground, '--ink-on': booking.ink } as CSSProperties}>
          <div className={s.depth} data-depth>
            <div className={s.float}>
              <div className={s.mat}>
                <figcaption className={s.label} data-label>
                  <span className={s.role}>Booking</span>
                  <span className={s.client}>{booking.client}</span>
                </figcaption>
                <PhoneFrame className={s.phone}>
                  <video ref={video} src={booking.loop.src} poster={booking.loop.poster} width={booking.loop.w} height={booking.loop.h} muted loop playsInline preload="auto" aria-label={booking.loop.label} />
                </PhoneFrame>
              </div>
            </div>
          </div>
        </figure>

        <figure className={s.piece} data-piece="tracking" style={{ '--ground': tracking.ground, '--ink-on': tracking.ink } as CSSProperties}>
          <div className={s.depth} data-depth>
            <div className={s.float}>
              <div className={s.mat}>
                <figcaption className={s.label} data-label>
                  <span className={s.role}>Tracking</span>
                  <span className={s.client}>{tracking.client}</span>
                </figcaption>
                <div className={s.record} data-flow={tracking.record.flow || undefined}>
                  <p className={s.recordSource}>{tracking.record.source}</p>
                  <p className={s.recordTitle}>{tracking.record.title}</p>
                  <ol className={s.recordRows}>
                    {tracking.record.rows.map((row) => (
                      <li key={row.label} className={s.recordRow}>
                        <span className={s.recordLabel}>{row.label}</span>
                        {row.value && <span className={s.recordValue}>{row.value}</span>}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </figure>

        <div className={s.centre} data-centre>
          <h1 id="hero-title" className={s.title}>
            <span className="sr-only">{name}: </span>
            <span className={s.titleText} data-title>
              {title}
            </span>
          </h1>
          <div className={s.actions} data-after>
            <ButtonLink href={bookingHref} arrow track="home-hero-book">
              Book a 20-minute call
            </ButtonLink>
          </div>
        </div>

        {!reduce && (
          <button type="button" className={s.pause} onClick={() => setPaused((p) => !p)} aria-pressed={paused} aria-label={paused ? 'Play the opening' : 'Pause the opening'} data-after>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              {paused ? <path d="M8 5.5v13l10.5-6.5z" fill="currentColor" /> : <path d="M8 5h2.6v14H8zM13.4 5H16v14h-2.6z" fill="currentColor" />}
            </svg>
          </button>
        )}
      </div>
      <div className={s.dim} data-dim aria-hidden="true" />
    </section>
  );
}
