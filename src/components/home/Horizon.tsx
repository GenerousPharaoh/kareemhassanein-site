'use client';

import { Fragment, useEffect, useRef, useState } from 'react';
import { prefersReducedMotion, subscribeMotionPreference } from '@/lib/useReducedMotion';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { getGsap, useGsap } from '@/lib/gsap';
import { HorizonGL, type HorizonTile, type HorizonView } from '@/lib/gl/horizon';
import s from './Horizon.module.css';

/** A screen for the scene: its image path without the width, which the browser picks. */
export type SceneTile = { base: string; device: 'desktop' | 'phone'; ratio: number; ground: string };

type Props = { tiles: SceneTile[]; name: string; line: string; bookingHref: string };

/** Where the camera starts: looking down at the screens, a little higher, turned slightly. */
const START = { pitch: -44, roll: -5, lift: 0.4, boost: 3.6, exposure: 0 };
/** Forward speed at rest, in world units a second, and the sideways drift of the rows. */
const CRUISE = 0.3;
const DRIFT = 0.14;

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

/**
 * The opening: the camera starts low over a floor of client screens, lifts its eyes to the horizon,
 * where the rows of screens on the floor and the ceiling meet, and the name settles on that line.
 */
export function Horizon({ tiles, name, line, bookingHref }: Props) {
  const root = useRef<HTMLElement>(null);
  const [opening, setOpening] = useState(true);
  const finishOpening = useRef<(() => void) | null>(null);
  const started = useRef(false);
  const words = name.split(' ');

  useEffect(() => {
    const finish = () => finishOpening.current?.();
    const onScroll = () => { if (window.scrollY > 40) finish(); };
    const onVisibility = () => { if (document.hidden) finish(); };
    const unsubscribe = subscribeMotionPreference(() => { if (prefersReducedMotion()) finish(); });
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('visibilitychange', onVisibility);
    return () => { unsubscribe(); window.removeEventListener('scroll', onScroll); document.removeEventListener('visibilitychange', onVisibility); };
  }, []);

  useGsap(root, ({ reduce, mobile }) => {
    const { gsap } = getGsap();
    const el = root.current!;
    // A fresh canvas for every run: a context handed back on cleanup cannot be used again
    const canvas = document.createElement('canvas');
    canvas.className = s.scene;
    canvas.setAttribute('aria-hidden', 'true');
    canvas.setAttribute('data-scene', '');
    el.prepend(canvas);
    const title = el.querySelector<HTMLElement>('[data-hero-name]')!;
    const html = document.documentElement;
    const firstRun = !started.current;
    started.current = true;
    const allowOpening = firstRun && !reduce && window.scrollY < 40 && !html.hasAttribute('data-route-arrival') && !html.hasAttribute('data-opening-expired');
    el.setAttribute('data-arrival-running', '');

    let scene: HorizonGL | null = null;
    try {
      if (HorizonGL.supported(canvas)) {
        const big = window.innerWidth * (window.devicePixelRatio || 1) > 2200;
        const list: HorizonTile[] = tiles.map((t) => ({
          src: `${t.base}-${t.device === 'phone' ? 320 : big ? 960 : 640}.webp`,
          ratio: t.ratio,
          ground: t.ground,
          device: t.device,
        }));
        scene = new HorizonGL(canvas, list, getComputedStyle(el).backgroundColor.startsWith('rgb') ? rgbHex(getComputedStyle(el).backgroundColor) : '#0c0c0b', Math.min(window.devicePixelRatio || 1, mobile ? 2 : 1.75));
      }
    } catch {
      scene = null;
    }
    if (!scene) {
      el.setAttribute('data-no-scene', '');
      setOpening(false);
      return () => { canvas.remove(); el.removeAttribute('data-no-scene'); el.removeAttribute('data-arrival-running'); };
    }
    el.setAttribute('data-scene-ready', '');

    // The view the scene draws: the opening's camera with a slow sway of the eye on top
    const intro = allowOpening ? { ...START } : { pitch: 0, roll: 0, lift: 0, boost: 0, exposure: 1 };
    const view: HorizonView = { pitch: 0, roll: 0, lift: 0, exposure: 1, travel: 0, drift: 0 };
    let exit = 0;
    let clock = 0;
    const compose = () => {
      const sway = reduce ? 0 : 1;
      view.pitch = intro.pitch + Math.sin(clock * 0.21) * 0.45 * sway;
      view.roll = intro.roll + Math.sin(clock * 0.17 + 1.3) * 0.3 * sway;
      view.lift = intro.lift;
      view.exposure = intro.exposure;
    };

    // The horizon sits behind the middle of the name, wherever the layout puts it
    const size = () => {
      const box = el.getBoundingClientRect();
      const t = title.getBoundingClientRect();
      scene!.resize(el.clientWidth, el.clientHeight, t.top - box.top + t.height * 0.5);
    };
    size();
    compose();
    scene.render(view);

    let ticking = false;
    // Outside the running loop (reduced motion, or covered), draw on demand until images settle
    let queued = 0;
    const draw = () => {
      if (ticking || queued) return;
      queued = requestAnimationFrame(() => {
        queued = 0;
        if (ticking) return;
        compose();
        if (scene!.render(view)) draw();
      });
    };
    scene.onLoad = draw;
    const ro = new ResizeObserver(() => { size(); draw(); });
    ro.observe(el);
    ro.observe(title);
    void document.fonts.ready.then(() => { size(); draw(); });

    if (reduce) {
      setOpening(false);
      return () => {
        cancelAnimationFrame(queued);
        ro.disconnect();
        scene!.dispose();
        canvas.remove();
        el.removeAttribute('data-scene-ready');
        el.removeAttribute('data-arrival-running');
      };
    }

    // Scrolling moves the camera along the rows (back again when scrolling up)
    const m = { scrollV: 0 };
    let lastY = window.scrollY;
    const step = (_time: number, deltaMs: number) => {
      const dt = Math.min(deltaMs, 50) / 1000;
      if (!dt) return;
      const y = window.scrollY;
      m.scrollV += (clamp((y - lastY) / dt, -4000, 4000) - m.scrollV) * (1 - Math.exp(-dt / 0.14));
      lastY = y;
      clock += dt;
      view.travel += (CRUISE + intro.boost + m.scrollV * 0.0016) * dt;
      view.drift += DRIFT * dt;
      compose();
      scene!.render(view);
    };

    let inView = true;
    const sync = () => {
      const on = inView && !document.hidden && exit < 1;
      if (on === ticking) return;
      ticking = on;
      if (on) {
        lastY = window.scrollY;
        gsap.ticker.add(step);
      } else gsap.ticker.remove(step);
    };
    const io = new IntersectionObserver(([e]) => { inView = e.isIntersecting; sync(); });
    io.observe(el);
    document.addEventListener('visibilitychange', sync);
    sync();

    // As the work list rises over the scene, it dims (scrolling already carries the camera forward)
    gsap.fromTo(el.querySelector('[data-dim]'), { opacity: 0 }, {
      opacity: 0.7, ease: 'none',
      scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: true, onUpdate: (self) => { exit = self.progress; sync(); draw(); } },
    });

    let arrival: gsap.core.Timeline | null = null;
    if (allowOpening) {
      el.setAttribute('data-opening-phase', 'camera');
      const identity = el.querySelector<HTMLElement>('[data-hero-identity]')!;
      const letters = el.querySelectorAll<HTMLElement>('[data-word]');
      const rest = el.querySelectorAll<HTMLElement>('[data-hero-rest]');
      let closed = false;
      const settle = () => {
        if (closed) return;
        closed = true;
        arrival?.kill();
        arrival = null;
        gsap.to(intro, { pitch: 0, roll: 0, lift: 0, boost: 0, exposure: 1, duration: 0.5, ease: 'power2.out', overwrite: true });
        gsap.set([identity, ...letters, ...rest], { clearProps: 'opacity,visibility,transform' });
        el.setAttribute('data-opening-phase', 'ready');
        el.removeAttribute('data-hero-opening');
        setOpening(false);
      };
      finishOpening.current = settle;
      gsap.set(identity, { autoAlpha: 1 });
      gsap.set(letters, { yPercent: 112, rotate: 2.5 });
      gsap.set(rest, { autoAlpha: 0, y: 18 });
      // Hold on the bare stage until most screens have arrived (or a moment has passed), so the
      // camera never moves over empty frames
      arrival = gsap.timeline({ onComplete: settle, paused: true })
        .to(intro, { exposure: 1, duration: 0.9, ease: 'power2.out' }, 0)
        .to(intro, { boost: 0, duration: 2.7, ease: 'power2.out' }, 0)
        .to(intro, { pitch: 0, roll: 0, lift: 0, duration: 2.3, ease: 'power3.inOut' }, 0.1)
        .call(() => el.setAttribute('data-opening-phase', 'name'), [], 1.45)
        .to(letters, { yPercent: 0, rotate: 0, duration: 1.1, ease: 'expo.out', stagger: 0.09 }, 1.45)
        .to(rest, { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.09 }, 1.8);
      const begun = performance.now();
      const ready = () => {
        if (closed || !arrival) return;
        const { loaded, total } = scene!.progress();
        if (loaded >= total * 0.92 || performance.now() - begun > 1100) arrival.play();
        else gsap.delayedCall(0.06, ready);
      };
      ready();
    } else {
      finishOpening.current = () => setOpening(false);
      setOpening(false);
    }

    return () => {
      cancelAnimationFrame(queued);
      arrival?.kill();
      finishOpening.current = null;
      gsap.ticker.remove(step);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener('visibilitychange', sync);
      scene!.dispose();
      canvas.remove();
      el.removeAttribute('data-scene-ready');
      el.removeAttribute('data-arrival-running');
      el.removeAttribute('data-opening-phase');
    };
  });

  return (
    <section ref={root} className={s.hero} aria-labelledby="hero-title" data-theme="dark" data-hero-opening={opening || undefined}>
      <div className={s.shade} aria-hidden="true" />
      <div className={s.identity} data-hero-identity>
        <h1 id="hero-title" className={s.name} aria-label={name} data-hero-name>
          {words.map((word, i) => (
            <Fragment key={word}>
              <span className={s.mask} aria-hidden="true">
                <span className={s.word} data-word>{word}</span>
              </span>
              {i < words.length - 1 ? ' ' : ''}
            </Fragment>
          ))}
        </h1>
        <p className={s.line} data-hero-rest>{line}</p>
        <div className={s.actions} data-hero-rest>
          <ButtonLink href={bookingHref} arrow track="hero-book">Book a call</ButtonLink>
          <ButtonLink href="#selected-work" variant="text" track="hero-work">Selected work<span aria-hidden="true">↓</span></ButtonLink>
        </div>
      </div>
      <div className={s.dim} data-dim aria-hidden="true" />
    </section>
  );
}

function rgbHex(rgb: string) {
  const [r, g, b] = rgb.match(/\d+(\.\d+)?/g)!.map(Number);
  return `#${[r, g, b].map((v) => Math.round(v).toString(16).padStart(2, '0')).join('')}`;
}
