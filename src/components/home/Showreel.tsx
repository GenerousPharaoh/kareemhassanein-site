'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { getGsap, useGsap } from '@/lib/gsap';
import type { ReelGL } from '@/lib/gl/reel';
import { hasFrame, webglAvailable } from '@/lib/gl/noise';
import s from './Showreel.module.css';

export type ReelMedia = {
  /** The still (or the video's first frame), as a webp srcset */
  image: { src: string; srcSet: string; w: number; h: number };
  video?: string;
};

export type ReelItem = {
  slug: string;
  name: string;
  /** A short name for the bar under the screen */
  label: string;
  kind: string;
  href: string;
  /** The stage around the screen while this project is on it: its colour, the type on it, and whether it is dark */
  tone: string;
  ink: string;
  dark: boolean;
  /** Vertical anchor of the crop (0 = top), as object-position does it */
  focus: { desktop: number; phone: number };
  desktop: ReelMedia;
  phone: ReelMedia;
  /** Seconds on screen, the change into it included: about the length of that layout's loop, so nothing sits on a frozen last frame */
  seconds: { desktop: number; phone: number };
};

/** The change between projects, in seconds; the CSS reads it as --change */
const CHANGE = 0.9;
/** A change that is still running when another project is asked for finishes this much faster */
const RUSH = 4;
const noop = () => () => {};
/** True once the page is hydrated (false in the server render), without an effect. */
const useHydrated = () => useSyncExternalStore(noop, () => true, () => false);
const BASE_ZOOM = 1.03;
const PHONE = '(max-width: 760px)';

type Props = { items: ReelItem[]; title: string };

/**
 * The opening of the homepage: the client sites themselves, full screen, one after another. On
 * desktop a WebGL screen carries the change between projects (a front that rises through the
 * frame); phones, reduced motion and browsers without WebGL get the same sequence as layered
 * video with a clipped reveal. Progress bars name every project and jump to it; a pause button
 * stops the sequence. Off screen, it rests.
 */
export function Showreel({ items, title }: Props) {
  const n = items.length;
  const root = useRef<HTMLElement>(null);
  const screen = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const imgs = useRef<(HTMLImageElement | null)[]>([]);
  const videos = useRef<(HTMLVideoElement | null)[]>([]);

  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const [held, setHeld] = useState(false);
  const [glOn, setGlOn] = useState(false);
  const [reduce, setReduce] = useState(false);
  const [wanted, setWanted] = useState<number[]>([0, 1]);
  // Only read once hydrated (the bars' timing), so the server render cannot disagree with it
  const [phone, setPhone] = useState(() => typeof window !== 'undefined' && window.matchMedia(PHONE).matches);
  const hydrated = useHydrated();

  const live = useRef({ index: 0, busy: false, pending: -1, phone: false, reduce: false, running: true, introDone: false });
  const gl = useRef<ReelGL | null>(null);
  // go() calls itself for a request that arrived during a change; it does so through this ref
  const goNext = useRef<(to: number) => void>(() => {});
  // Speeds the running change to its end, so a click on a bar never waits behind it
  const hurry = useRef<() => void>(() => {});
  const motion = useRef({ progress: 0, started: [] as number[], slotItem: [0, -1] as [number, number] });

  const media = (i: number) => (live.current.phone ? items[i].phone : items[i].desktop);
  const focusOf = (i: number) => (live.current.phone ? items[i].focus.phone : items[i].focus.desktop);
  const videoOf = (i: number) => (media(i).video ? videos.current[i] : null);

  /** The best frame source for an item right now: its video once it has a frame, else its still. */
  const sourceOf = (i: number) => {
    const v = videoOf(i);
    if (v && hasFrame(v)) return v;
    return imgs.current[i] ?? null;
  };

  const playVideo = useCallback((i: number) => {
    const v = videoOf(i);
    if (!v || live.current.reduce) return;
    v.preload = 'auto';
    if (v.readyState === 0 && v.networkState !== v.NETWORK_LOADING) v.load();
    try {
      v.currentTime = 0;
    } catch {
      /* not seekable yet: it starts from the beginning anyway */
    }
    v.play().catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pauseVideo = (i: number) => videoOf(i)?.pause();

  /** Start fetching a loop before its turn, so it has frames when the change into it begins. */
  const preloadVideo = useCallback((i: number) => {
    const v = videoOf(i);
    if (!v || live.current.reduce || v.preload === 'auto') return;
    v.preload = 'auto';
    v.load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const want = (...list: number[]) =>
    setWanted((w) => {
      const next = list.filter((i) => !w.includes(i));
      return next.length ? [...w, ...next] : w;
    });

  /** Move to another project, with the change; a request during a change waits for it to end. */
  const go = useCallback(
    (to: number) => {
      const L = live.current;
      if (to === L.index && !L.busy) return;
      if (L.busy) {
        L.pending = to;
        hurry.current();
        return;
      }
      const from = L.index;
      root.current?.removeAttribute('data-route-intro');
      L.busy = true;
      L.introDone = true;
      L.index = to;
      motion.current.started[to] = performance.now();
      want(to, (to + 1) % n);
      playVideo(to);
      setIndex(to);
      setLeaving(from);

      let done = false;
      const finish = () => {
        if (done) return;
        done = true;
        hurry.current = () => {};
        pauseVideo(from);
        setLeaving(null);
        L.busy = false;
        preloadVideo((L.index + 1) % n);
        if (L.pending >= 0) {
          const p = L.pending;
          L.pending = -1;
          if (p !== L.index) goNext.current(p);
        }
      };

      const r = gl.current;
      if (r) {
        const { gsap } = getGsap();
        const m = motion.current;
        m.slotItem[1] = to;
        r.setSource(1, sourceOf(to), focusOf(to));
        let waited = 0;
        let rush = false;
        let tween: gsap.core.Tween | null = null;
        hurry.current = () => {
          rush = true;
          tween?.timeScale(RUSH);
        };
        const start = () => {
          // Give a slow network up to a few seconds to deliver the next still before the change
          if (!r.ready(1) && waited < 180 && !rush) {
            waited++;
            r.setSource(1, sourceOf(to), focusOf(to));
            requestAnimationFrame(start);
            return;
          }
          tween = gsap.fromTo(
            m,
            { progress: 0 },
            {
              progress: 1,
              duration: CHANGE,
              ease: 'power3.inOut',
              onComplete: () => {
                r.swap();
                m.slotItem = [to, -1];
                m.progress = 0;
                finish();
              },
            },
          );
          if (rush) tween.timeScale(RUSH);
        };
        start();
      } else {
        const timer = window.setTimeout(finish, L.reduce ? 0 : CHANGE * 1000);
        hurry.current = () => {
          window.clearTimeout(timer);
          finish();
        };
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [n, playVideo, preloadVideo],
  );

  useEffect(() => {
    goNext.current = go;
  }, [go]);

  const advance = () => go((live.current.index + 1) % n);

  // Viewport, motion preference, first video
  useEffect(() => {
    const L = live.current;
    const phoneQ = window.matchMedia(PHONE);
    const reduceQ = window.matchMedia('(prefers-reduced-motion: reduce)');
    L.phone = phoneQ.matches;
    L.reduce = reduceQ.matches;
    setPhone(L.phone);
    if (document.documentElement.hasAttribute('data-route-arrival')) root.current?.setAttribute('data-route-intro', '');
    setReduce(L.reduce);
    motion.current.started[0] = performance.now();
    playVideo(0);
    // Match the first-frame fade before handing the unchanged crop to WebGL.
    const introTimer = window.setTimeout(() => {
      L.introDone = true;
    }, L.reduce || document.documentElement.hasAttribute('data-route-arrival') ? 0 : 450);
    // The second loop loads while the first plays
    const preloadTimer = window.setTimeout(() => preloadVideo(1), 1200);
    const onReduce = () => {
      L.reduce = reduceQ.matches;
      setReduce(L.reduce);
    };
    const onPhone = () => {
      L.phone = phoneQ.matches;
      setPhone(L.phone);
      // The <source media> choice is made at load: reload the videos for the new layout
      videos.current.forEach((v) => v && v.readyState > 0 && v.load());
      playVideo(L.index);
    };
    reduceQ.addEventListener('change', onReduce);
    phoneQ.addEventListener('change', onPhone);
    return () => {
      window.clearTimeout(introTimer);
      window.clearTimeout(preloadTimer);
      reduceQ.removeEventListener('change', onReduce);
      phoneQ.removeEventListener('change', onPhone);
    };
  }, [playVideo, preloadVideo]);

  // Rest off screen and in a background tab
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    let inView = true;
    const sync = () => setHeld(!inView || document.hidden);
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

  // Paused or resting: the video on screen stops with the progress bar
  useEffect(() => {
    live.current.running = !(paused || held);
    const v = videoOf(index);
    if (!v) return;
    if (paused || held || reduce) v.pause();
    else if (v.readyState > 0 || v.preload === 'auto') v.play().catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused, held, reduce, index]);

  // The WebGL screen, on desktop pointers only, started after first paint
  useEffect(() => {
    const L = live.current;
    const el = canvas.current;
    const scr = screen.current;
    if (!el || !scr || L.reduce || L.phone || !window.matchMedia('(pointer: fine)').matches || !webglAvailable()) return;
    let cancelled = false;
    let ro: ResizeObserver | null = null;
    let tick: (() => void) | null = null;
    const { gsap } = getGsap();

    const boot = async () => {
      const { ReelGL } = await import('@/lib/gl/reel');
      if (cancelled) return;
      let r: ReelGL;
      try {
        r = new ReelGL(el);
      } catch {
        return;
      }
      gl.current = r;
      const m = motion.current;
      const size = () => {
        const b = scr.getBoundingClientRect();
        r.resize(b.width, b.height);
      };
      size();
      ro = new ResizeObserver(size);
      ro.observe(scr);
      m.slotItem = [L.index, -1];
      r.setSource(0, sourceOf(L.index), focusOf(L.index));

      el.addEventListener('webglcontextlost', (e) => {
        e.preventDefault();
        setGlOn(false);
        if (tick) gsap.ticker.remove(tick);
        gl.current = null;
      });

      let shown = false;
      tick = () => {
        if (!L.running && m.progress === 0 && shown) return;
        // Swap a still for its video as soon as the video has a frame
        for (const slot of [0, 1] as const) {
          const i = m.slotItem[slot];
          if (i < 0) continue;
          const v = videoOf(i);
          if (v && hasFrame(v)) r.setSourceIfChanged(slot, v, focusOf(i));
        }
        const now = performance.now();
        const zoomOf = (i: number) => {
          if (i < 0 || media(i).video) return BASE_ZOOM;
          // Stills drift slowly closer while they are on screen
          const t = Math.min(1, (now - (m.started[i] ?? now)) / (items[i].seconds.desktop * 1000 + CHANGE * 1000));
          return BASE_ZOOM + 0.05 * t;
        };
        r.render({ progress: m.progress, time: now / 1000, mouse: [0, 0], zoom: [zoomOf(m.slotItem[0]), zoomOf(m.slotItem[1])] });
        if (!shown && r.ready(0) && L.introDone) {
          shown = true;
          setGlOn(true);
        }
      };
      gsap.ticker.add(tick);
    };

    // Compiling shaders during a page reveal can stall the compositor on integrated graphics.
    let idle = 0;
    const queueBoot = () => { idle = window.setTimeout(boot, 250); };
    if (document.documentElement.hasAttribute('data-route-changing')) window.addEventListener('route-settled', queueBoot, { once: true });
    else queueBoot();
    return () => {
      cancelled = true;
      window.clearTimeout(idle);
      window.removeEventListener('route-settled', queueBoot);
      ro?.disconnect();
      if (tick) gsap.ticker.remove(tick);
      gl.current?.destroy();
      gl.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // As the work list slides over it, the reel sinks back and dims
  useGsap(root, ({ reduce: r }) => {
    if (r) return;
    const { gsap } = getGsap();
    const el = root.current!;
    gsap.fromTo(
      el.querySelector('[data-sink]'),
      { scale: 1, yPercent: 0 },
      { scale: 0.9, yPercent: 4, ease: 'none', scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: true } },
    );
    gsap.fromTo(el.querySelector('[data-dim]'), { opacity: 0 }, { opacity: 0.72, ease: 'none', scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: true } });
  });

  // The header follows the stage from dark to light; tell it the stage has changed
  useEffect(() => {
    window.dispatchEvent(new Event('stagechange'));
  }, [index]);

  const stateOf = (i: number) => (i === index ? (leaving !== null ? 'enter' : 'on') : i === leaving ? 'leave' : 'off');
  const item = items[index];

  return (
    <section
      ref={root}
      className={s.reel}
      aria-label="Selected work"
      data-theme={item.dark ? 'dark' : 'light'}
      style={{ ['--tone' as string]: item.tone, ['--tone-ink' as string]: item.ink, ['--change' as string]: `${CHANGE}s` }}
    >
      <h1 className="sr-only">{title}</h1>
      <div className={s.sink} data-sink>
        <div className={s.frame}>
          <div ref={screen} className={s.screen} data-gl={glOn || undefined}>
            <div className={s.layers} aria-hidden="true">
              {items.map((it, i) => (
                <div key={it.slug} className={s.layer} data-state={stateOf(i)} style={{ ['--focus-d' as string]: `${it.focus.desktop * 100}%`, ['--focus-p' as string]: `${it.focus.phone * 100}%` }}>
                  {wanted.includes(i) && (
                    <picture>
                      <source media={PHONE} srcSet={it.phone.image.srcSet} sizes="100vw" />
                      <img
                        ref={(el) => {
                          imgs.current[i] = el;
                        }}
                        src={it.desktop.image.src}
                        srcSet={it.desktop.image.srcSet}
                        sizes="(min-width: 761px) 80vw, 100vw"
                        width={it.desktop.image.w}
                        height={it.desktop.image.h}
                        alt=""
                        decoding={i === 0 ? 'sync' : 'async'}
                        fetchPriority={i === 0 ? 'high' : 'low'}
                      />
                    </picture>
                  )}
                  {(it.desktop.video || it.phone.video) && (
                    <video
                      ref={(el) => {
                        videos.current[i] = el;
                      }}
                      muted
                      playsInline
                      preload={i === 0 ? 'auto' : 'none'}
                      disablePictureInPicture
                      data-only={it.desktop.video ? (it.phone.video ? undefined : 'desktop') : 'phone'}
                    >
                      {it.phone.video && <source media={PHONE} src={it.phone.video} type="video/mp4" />}
                      {it.desktop.video && <source media="(min-width: 761px)" src={it.desktop.video} type="video/mp4" />}
                    </video>
                  )}
                </div>
              ))}
            </div>
            <canvas ref={canvas} className={s.canvas} aria-hidden="true" />
          </div>

          <div className={s.foot}>
            <div className={s.captions}>
              {leaving !== null && <Caption key={`out-${leaving}`} item={items[leaving]} phase="out" />}
              <Caption key={`in-${index}`} item={item} phase="in" />
            </div>
            <div className={s.bars} data-paused={paused || held || undefined}>
              <ol className={s.track}>
                {items.map((it, i) => (
                  <li key={it.slug}>
                    <button type="button" className={s.bar} aria-current={i === index || undefined} onClick={() => go(i)} data-done={i < index || undefined}>
                      <span className={s.barLabel} aria-hidden="true">
                        {it.label}
                      </span>
                      <span className={s.barTrack} aria-hidden="true">
                        {i === index && hydrated && !reduce && (
                          <span key={`${index}`} className={s.barFill} style={{ animationDuration: `${it.seconds[phone ? 'phone' : 'desktop']}s` }} onAnimationEnd={advance} />
                        )}
                      </span>
                      <span className="sr-only">Show {it.name}</span>
                    </button>
                  </li>
                ))}
              </ol>
            </div>
            <button type="button" className={s.pause} onClick={() => setPaused((p) => !p)} aria-pressed={paused} aria-label={paused ? 'Play the reel' : 'Pause the reel'}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                {paused ? <path d="M8 5.5v13l10.5-6.5z" fill="currentColor" /> : <path d="M8 5h2.6v14H8zM13.4 5H16v14h-2.6z" fill="currentColor" />}
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className={s.dim} data-dim aria-hidden="true" />
    </section>
  );
}

function Caption({ item, phase }: { item: ReelItem; phase: 'in' | 'out' }) {
  return (
    <div className={s.caption} data-phase={phase} aria-hidden={phase === 'out' || undefined}>
      <p className={s.kind}>
        <span className={s.mask}>
          <span className={s.line}>{item.kind}</span>
        </span>
      </p>
      <p className={s.name}>
        <Link href={item.href} className={s.nameLink} tabIndex={phase === 'out' ? -1 : undefined} data-track="reel-case">
          <span className={s.mask}>
            <span className={s.line}>
              {item.name}
              <span className={s.go} aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path d="M5 12h13m-5-6 6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </span>
          </span>
          <span className="sr-only">, see the case</span>
        </Link>
      </p>
    </div>
  );
}
