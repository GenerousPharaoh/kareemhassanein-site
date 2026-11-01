'use client';

import { useEffect, useRef, useState } from 'react';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { getGsap, useGsap } from '@/lib/gsap';
import { Sfx } from '@/lib/sfx';
import { prefersReducedMotion, subscribeMotionPreference } from '@/lib/useReducedMotion';
import s from './Explainer.module.css';

/** The stage the scenes are laid out on, scaled to fit its frame. */
const W = 1600;
const H = 900;
const QUERY = 'physiotherapy burlington';
/** Where the chosen result's frame ends up as the browser window. */
const WIN = { x: 180, y: 150, w: 1240, h: 640 };
/** Where the Booked check lands: the first point of the bookings chart, on the stage. */
const FIRST_POINT = { x: 150, y: 610 };

/**
 * A short motion-graphics explainer, drawn and animated in code, with its own sound: a search
 * becomes a visit, the visit a booking, and the booking a line on a chart. It plays while on
 * screen, loops, and holds a still under the site's Motion setting. Sound is off until asked for.
 */
export function Explainer() {
  const root = useRef<HTMLElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const sfx = useRef<Sfx | null>(null);
  const [sound, setSound] = useState(false);

  // Fit the stage to the frame, and keep the sound engine for as long as the frame is mounted
  useEffect(() => {
    const f = frame.current;
    const st = stage.current;
    if (!f || !st) return;
    sfx.current = new Sfx();
    const fit = () => {
      st.style.transform = `scale(${f.clientWidth / W})`;
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(f);
    return () => {
      ro.disconnect();
      sfx.current?.dispose();
      sfx.current = null;
    };
  }, []);

  const toggleSound = () => {
    const x = sfx.current;
    if (!x) return;
    if (x.enabled) {
      x.disable();
      setSound(false);
    } else {
      x.enable();
      setSound(true);
    }
  };

  useGsap(root, ({ reduce, mobile }) => {
    if (mobile) return;
    const { gsap, SplitText } = getGsap();
    gsap.registerPlugin(DrawSVGPlugin);
    const el = stage.current!;
    const q = (sel: string) => el.querySelectorAll<HTMLElement | SVGElement>(sel);
    const one = (sel: string) => el.querySelector<HTMLElement | SVGElement>(sel)!;
    const cam = one('[data-cam]');
    const cursor = one('[data-cursor]');
    const ring = one('[data-ring]');
    const glow = one('[data-glow]');
    const fx = () => sfx.current;
    const tl = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 0.4, defaults: { ease: 'expo.out', duration: 0.55 } });

    const draw = (sel: string, at: number, dur = 0.6, stagger = 0, ease = 'power2.inOut') =>
      tl.fromTo(q(sel), { drawSVG: '0%' }, { drawSVG: '100%', duration: dur, ease, stagger }, at);
    const rise = (sel: string, at: number, stagger = 0, dur = 0.55, y = 26) =>
      tl.fromTo(q(sel), { y, opacity: 0 }, { y: 0, opacity: 1, duration: dur, ease: 'expo.out', stagger }, at);
    const pop = (sel: string, at: number, stagger = 0, dur = 0.5) =>
      tl.fromTo(q(sel), { scale: 0.6, opacity: 0, transformOrigin: '50% 50%' }, { scale: 1, opacity: 1, duration: dur, ease: 'back.out(1.7)', stagger }, at);
    const grow = (sel: string, at: number, stagger = 0, dur = 0.7) =>
      tl.fromTo(q(sel), { scaleY: 0, transformOrigin: '50% 100%' }, { scaleY: 1, duration: dur, ease: 'expo.out', stagger }, at);
    const fade = (sel: string, at: number, dur = 0.35) => tl.to(q(sel), { autoAlpha: 0, duration: dur, ease: 'power2.inOut' }, at);
    const show = (sel: string, at: number, dur = 0.35) => tl.to(q(sel), { autoAlpha: 1, duration: dur, ease: 'power2.inOut' }, at);
    /** Leaves the way a card falls back: a tilt away and up. */
    const tiltOut = (sel: string, at: number, stagger = 0, dur = 0.55) =>
      tl.to(q(sel), { rotateX: 22, y: -50, opacity: 0, transformPerspective: 1400, transformOrigin: '50% 100%', duration: dur, ease: 'power3.in', stagger }, at);
    /** A headline, word by word, standing up out of the baseline. */
    const headline = (sel: string, at: number) => {
      const split = SplitText.create(one(sel), { type: 'words', wordsClass: s.wordWrap });
      tl.fromTo(split.words, { y: 34, rotateX: -55, opacity: 0, transformPerspective: 700, transformOrigin: '50% 100%' }, { y: 0, rotateX: 0, opacity: 1, duration: 0.7, ease: 'expo.out', stagger: 0.055 }, at);
      return split;
    };
    const cursorTo = (x: number, y: number, at: number, dur = 0.7) => tl.to(cursor, { x, y, duration: dur, ease: 'power2.inOut' }, at);
    const click = (x: number, y: number, at: number) => {
      tl.to(cursor, { scale: 0.78, duration: 0.09, yoyo: true, repeat: 1, ease: 'power1.inOut', transformOrigin: '0 0' }, at);
      tl.fromTo(ring, { x, y, scale: 0.2, opacity: 0.9 }, { scale: 1.6, opacity: 0, duration: 0.6, ease: 'power2.out', immediateRender: false }, at + 0.05);
      cue(at, () => fx()?.click());
    };
    /** The camera: a push toward a point, or back to rest. */
    const camTo = (scale: number, px: number, py: number, at: number, dur = 0.8, ease = 'power3.inOut') =>
      tl.to(cam, { scale, x: (1 - scale) * px, y: (1 - scale) * py, duration: dur, ease }, at);
    const glowTo = (x: number, y: number, at: number, dur = 1.2, opacity = 1) => tl.to(glow, { x, y, opacity, duration: dur, ease: 'power2.inOut' }, at);
    const cue = (at: number, fn: () => void) => tl.call(fn, [], at);
    /** Pops in a run, each a semitone or so higher. */
    const pops = (at: number, n: number, stagger: number, from = 0, step = 2) => {
      for (let i = 0; i < n; i++) cue(at + i * stagger, () => fx()?.pop(from + i * step));
    };

    const splits: ReturnType<typeof SplitText.create>[] = [];
    gsap.set(cam, { transformOrigin: '0 0' });
    gsap.set(cursor, { x: 1420, y: 760, opacity: 0 });
    gsap.set(ring, { opacity: 0 });
    gsap.set(q('[data-s3-burst]'), { opacity: 0 });
    gsap.set(q('[data-scene]'), { autoAlpha: 1 });
    gsap.set(q('[data-s2-page]'), { autoAlpha: 0 });
    gsap.set(glow, { x: 800, y: 300, opacity: 0 });
    gsap.set(one('[data-sheen]'), { xPercent: -120 });
    gsap.set(one('[data-s3-fly]'), { x: 0, y: 0, scale: 1, transformOrigin: '800px 430px' });

    // A thin line along the top tells the time
    tl.fromTo(one('[data-progress]'), { scaleX: 0, transformOrigin: '0 50%' }, { scaleX: 1, duration: 27.4, ease: 'none' }, 0);

    /* 1. The search */
    cue(0, () => fx()?.whoosh(0.5, true));
    draw('[data-s1-bar]', 0, 0.7, 0, 'power3.out');
    draw('[data-s1-glass]', 0.25, 0.4);
    glowTo(800, 300, 0, 0.9, 0.9);
    splits.push(headline('[data-s1-h]', 0.35));
    cue(0.35, () => fx()?.hit());
    const typed = { n: 0 };
    const query = one('[data-s1-query]');
    tl.to(typed, { n: QUERY.length, duration: 1.15, ease: 'none', onUpdate: () => { query.textContent = QUERY.slice(0, Math.round(typed.n)); } }, 0.75);
    for (let i = 0; i < QUERY.length; i++) if (QUERY[i] !== ' ') cue(0.75 + (i + 0.5) * (1.15 / QUERY.length), () => fx()?.tick());
    tl.fromTo('[data-s1-caret]', { opacity: 1 }, { opacity: 0, duration: 0.45, repeat: 7, yoyo: true, ease: 'steps(1)' }, 0.7);
    tl.to('[data-s1-barbox]', { scale: 1.015, duration: 0.14, yoyo: true, repeat: 1, ease: 'power1.inOut', transformOrigin: '50% 50%' }, 2.05);
    cue(2.05, () => fx()?.click());
    rise('[data-s1-row]', 2.2, 0.1, 0.6, 34);
    pops(2.2, 3, 0.1, 0, 3);
    tl.to(cursor, { opacity: 1, duration: 0.25 }, 2.6);
    draw('[data-s1-pick]', 3.05, 0.5, 0, 'power2.out');
    cue(3.05, () => fx()?.draw(0.5));
    cursorTo(600, 548, 3.1, 0.75);
    click(600, 548, 3.95);
    camTo(1.06, 600, 548, 3.95, 0.6, 'power3.out');
    fade('[data-s1-fade]', 4.25, 0.3);
    // The chosen result opens into a browser window
    tl.to('[data-s1-pick]', { attr: { x: WIN.x, y: WIN.y, width: WIN.w, height: WIN.h, rx: 16 }, duration: 0.75, ease: 'expo.inOut' }, 4.3);
    cue(4.3, () => fx()?.whoosh(0.6));
    camTo(1, 0, 0, 4.4, 0.9, 'power3.inOut');
    glowTo(1000, 520, 4.3, 1.0, 1);

    /* 2. The site */
    const S2 = 4.9;
    pop('[data-s2-dot]', S2, 0.05, 0.4);
    pops(S2, 3, 0.05, 10, 2);
    show('[data-s2-page]', S2 + 0.1, 0.3);
    rise('[data-s2-address]', S2 + 0.05);
    splits.push(headline('[data-s2-h]', S2 + 0.1));
    cue(S2 + 0.1, () => fx()?.hit());
    rise('[data-s2-nav]', S2 + 0.25, 0.04, 0.5, 18);
    rise('[data-s2-title]', S2 + 0.45, 0.1, 0.6);
    pops(S2 + 0.45, 2, 0.1, 4, 5);
    rise('[data-s2-para]', S2 + 0.7, 0.06, 0.5, 14);
    pop('[data-s2-image]', S2 + 0.8, 0, 0.6);
    cue(S2 + 0.8, () => fx()?.pop(0));
    draw('[data-s2-art]', S2 + 1.0, 0.7, 0.1);
    cue(S2 + 1.0, () => fx()?.draw(0.7));
    pop('[data-s2-book]', S2 + 1.15);
    cue(S2 + 1.15, () => fx()?.pop(12));
    rise('[data-s2-card]', S2 + 1.3, 0.08, 0.55);
    pops(S2 + 1.3, 3, 0.08, 2, 3);
    // A light passes over the window once it is built
    tl.to('[data-sheen]', { xPercent: 220, duration: 0.9, ease: 'power2.inOut' }, S2 + 1.5);
    cue(S2 + 1.5, () => fx()?.whoosh(0.8, true));
    cursorTo(372, 548, S2 + 1.85, 0.8);
    tl.to('[data-s2-book]', { scale: 0.94, duration: 0.1, yoyo: true, repeat: 1, ease: 'power1.inOut', transformOrigin: '50% 50%' }, S2 + 2.7);
    click(372, 548, S2 + 2.7);
    camTo(1.1, 372, 548, S2 + 2.7, 0.7, 'power3.out');
    // The window falls away as the phone comes up
    tiltOut('[data-s2-window]', S2 + 3.25, 0, 0.55);
    fade('[data-s2-h]', S2 + 3.2, 0.3);
    fade('[data-s1-pick]', S2 + 3.2, 0.3);
    cue(S2 + 3.25, () => fx()?.whoosh(0.55));
    camTo(1, 0, 0, S2 + 3.3, 0.9, 'power3.inOut');
    glowTo(800, 480, S2 + 3.3, 1.0, 1);

    /* 3. The booking */
    const S3 = 8.75;
    tl.fromTo('[data-s3-phone-wrap]', { y: 220, rotateX: 22, opacity: 0, transformPerspective: 1600, transformOrigin: '50% 100%' }, { y: 0, rotateX: 0, opacity: 1, duration: 0.9, ease: 'expo.out' }, S3);
    draw('[data-s3-phone]', S3, 0.8, 0, 'power3.out');
    cue(S3, () => fx()?.draw(0.8));
    pop('[data-s3-notch]', S3 + 0.3, 0, 0.35);
    splits.push(headline('[data-s3-h]', S3 + 0.15));
    cue(S3 + 0.15, () => fx()?.hit());
    rise('[data-s3-head]', S3 + 0.45, 0, 0.45, 14);
    rise('[data-s3-day]', S3 + 0.55, 0.03, 0.4, 10);
    pop('[data-s3-cell]', S3 + 0.65, 0.018, 0.4);
    for (let i = 0; i < 28; i += 3) cue(S3 + 0.65 + i * 0.018, () => fx()?.tick());
    cursorTo(792, 465, S3 + 1.3, 0.65);
    click(792, 465, S3 + 2.0);
    tl.to('[data-s3-cell="pick"]', { backgroundColor: '#3d6bff', borderColor: '#3d6bff', duration: 0.2 }, S3 + 2.0);
    pop('[data-s3-confirm]', S3 + 2.2);
    cue(S3 + 2.2, () => fx()?.pop(7));
    cursorTo(800, 690, S3 + 2.45, 0.45);
    click(800, 690, S3 + 2.95);
    tl.to('[data-s3-confirm]', { scale: 0.94, duration: 0.1, yoyo: true, repeat: 1, ease: 'power1.inOut', transformOrigin: '50% 50%' }, S3 + 2.95);
    camTo(1.08, 800, 470, S3 + 2.95, 0.7, 'power3.out');
    fade('[data-s3-screen]', S3 + 3.15, 0.3);
    tl.to(cursor, { opacity: 0, duration: 0.3 }, S3 + 3.15);
    draw('[data-s3-circle]', S3 + 3.3, 0.5, 0, 'power2.out');
    draw('[data-s3-check]', S3 + 3.65, 0.35, 0, 'power2.out');
    cue(S3 + 3.5, () => fx()?.chime());
    rise('[data-s3-booked]', S3 + 3.8, 0, 0.5, 18);
    tl.fromTo(q('[data-s3-burst]'), { scale: 0.3, opacity: 0.55, transformOrigin: '50% 50%' }, { scale: 1.8, opacity: 0, duration: 0.9, ease: 'power2.out', stagger: 0.12, immediateRender: false }, S3 + 3.5);
    camTo(1, 0, 0, S3 + 3.6, 1.0, 'power3.inOut');
    // The check flies off to become the first point on the chart
    fade('[data-s3-fade]', S3 + 5.0, 0.4);
    fade('[data-s3-check]', S3 + 5.0, 0.2);
    tl.to('[data-s3-fly]', { x: FIRST_POINT.x - 800, y: FIRST_POINT.y - 430, scale: 0.11, duration: 0.8, ease: 'power3.inOut' }, S3 + 5.05);
    cue(S3 + 5.05, () => fx()?.whoosh(0.7, true));
    glowTo(500, 520, S3 + 5.0, 1.0, 1);

    /* 4. The tracking */
    const S4 = 14.15;
    splits.push(headline('[data-s4-h]', S4));
    cue(S4, () => fx()?.hit());
    rise('[data-s4-panel]', S4 - 0.3, 0.1, 0.7, 40);
    pops(S4 - 0.3, 3, 0.1, 0, 4);
    fade('[data-s3-fly]', S4 + 0.1, 0.15);
    rise('[data-s4-label]', S4 + 0.45, 0.08, 0.45, 12);
    draw('[data-s4-line]', S4 + 0.6, 1.0, 0, 'power1.inOut');
    cue(S4 + 0.6, () => fx()?.draw(1.0));
    tl.fromTo('[data-s4-area]', { opacity: 0 }, { opacity: 1, duration: 0.8, ease: 'power2.out' }, S4 + 1.0);
    pop('[data-s4-dot]', S4 + 0.6, 0.16, 0.35);
    for (let i = 0; i < 7; i++) cue(S4 + 0.6 + i * 0.16, () => fx()?.tick());
    grow('[data-s4-bar]', S4 + 0.7, 0.08, 0.8);
    pops(S4 + 0.7, 6, 0.08, -4, 2);
    // The donut: search draws most of the ring, ads the rest
    tl.fromTo('[data-s4-arc-a]', { drawSVG: '0% 0%' }, { drawSVG: '0% 62%', duration: 0.7, ease: 'power2.inOut' }, S4 + 0.8);
    tl.fromTo('[data-s4-arc-b]', { drawSVG: '62% 62%' }, { drawSVG: '62% 100%', duration: 0.45, ease: 'power2.out' }, S4 + 1.45);
    cue(S4 + 0.8, () => fx()?.draw(0.7));
    rise('[data-s4-legend]', S4 + 1.3, 0.1, 0.45, 12);
    tiltOut('[data-s4-panel]', S4 + 4.4, 0.08, 0.5);
    fade('[data-s4-h]', S4 + 4.5, 0.3);
    cue(S4 + 4.4, () => fx()?.whoosh(0.6));
    glowTo(800, 450, S4 + 4.4, 1.0, 1);

    /* 5. The title */
    const S5 = 19.2;
    const words = q('[data-s5-word]');
    words.forEach((w, i) => {
      const at = S5 + i * 0.78;
      tl.fromTo(w, { scale: 0.86, y: 34, opacity: 0 }, { scale: 1, y: 0, opacity: 1, duration: 0.42, ease: 'expo.out', transformOrigin: '50% 50%' }, at);
      cue(at, () => fx()?.hit());
      tl.fromTo(cam, { scale: 1.035, x: -0.035 * 800, y: -0.035 * 450 }, { scale: 1, x: 0, y: 0, duration: 0.5, ease: 'power3.out', immediateRender: false }, at);
      if (i < words.length - 1) tl.to(w, { y: -34, opacity: 0, duration: 0.28, ease: 'power2.in' }, at + 0.5);
    });
    tl.to(words[words.length - 1], { y: -50, scale: 0.9, opacity: 0, duration: 0.3, ease: 'power2.in' }, S5 + 3.3);
    cue(S5 + 2.9, () => fx()?.riser(0.75));
    rise('[data-s5-line]', S5 + 3.5, 0, 0.6, 30);
    rise('[data-s5-name]', S5 + 3.6, 0, 0.7, 40);
    cue(S5 + 3.6, () => fx()?.hit());
    pop('[data-s5-cta]', S5 + 3.95);
    cue(S5 + 3.95, () => fx()?.pop(12));
    tl.to('[data-s5-cta]', { scale: 1.03, duration: 0.7, yoyo: true, repeat: 3, ease: 'sine.inOut', transformOrigin: '50% 50%' }, S5 + 4.5);
    glowTo(800, 500, S5 + 3.5, 1.0, 1);
    fade('[data-s5-fade]', S5 + 7.4, 0.5);
    glowTo(800, 300, S5 + 7.4, 0.6, 0);
    cue(S5 + 7.4, () => fx()?.whoosh(0.5, true));

    // Reduced motion: hold the closing frame
    if (reduce) {
      tl.pause(S5 + 7.0);
      return () => { tl.kill(); splits.forEach((sp) => sp.revert()); };
    }

    // Play only while on screen
    let inView = false;
    const sync = () => {
      const on = inView && !document.hidden && !prefersReducedMotion();
      if (on && tl.paused()) tl.play();
      else if (!on && !tl.paused()) tl.pause();
    };
    const io = new IntersectionObserver(([e]) => { inView = e.isIntersecting && e.intersectionRatio >= 0.35; sync(); }, { threshold: [0, 0.35] });
    io.observe(frame.current!);
    const unsubscribe = subscribeMotionPreference(sync);
    document.addEventListener('visibilitychange', sync);
    return () => {
      io.disconnect();
      unsubscribe();
      document.removeEventListener('visibilitychange', sync);
      tl.kill();
      splits.forEach((sp) => sp.revert());
    };
  });

  const cells = Array.from({ length: 28 }, (_, i) => i);
  const free = new Set([3, 9, 12, 17, 24]);

  return (
    <section ref={root} className={s.explainer} aria-label="An animated explainer: a search becomes a visit, the visit a booking, and the booking a line on a chart.">
      <div className="container">
        <div ref={frame} className={s.frame}>
          <div ref={stage} className={s.stage} style={{ width: W, height: H }} aria-hidden="true">
            <div className={s.grid} />
            <div className={s.glow} data-glow />
            <div className={s.cam} data-cam>
              {/* 1. The search */}
              <div className={s.scene} data-scene>
                <div className={s.h} data-s1-h data-s1-fade>Someone searches.</div>
                <div className={s.s1BarBox} data-s1-barbox data-s1-fade>
                  <svg className={s.svg} viewBox={`0 0 ${W} ${H}`}>
                    <rect data-s1-bar x="300" y="250" width="1000" height="96" rx="48" className={s.strokeInk} />
                    <circle data-s1-glass cx="352" cy="294" r="13" className={s.strokeInk} />
                    <path data-s1-glass d="M362 304 L372 314" className={s.strokeInk} />
                  </svg>
                  <div className={s.s1Query}>
                    <span data-s1-query />
                    <span className={s.caret} data-s1-caret />
                  </div>
                </div>
                <div className={s.s1Row} style={{ top: 400 }} data-s1-row data-s1-fade>
                  <div className={s.bar} style={{ width: 440, height: 14 }} />
                  <div className={`${s.bar} ${s.muted}`} style={{ width: 240, height: 10, marginTop: 14 }} />
                  <div className={`${s.bar} ${s.faint}`} style={{ width: 780, height: 10, marginTop: 14 }} />
                </div>
                <div className={`${s.s1Row} ${s.s1Real}`} style={{ top: 500 }} data-s1-row data-s1-fade>
                  <div className={s.s1Title}>PhysioMax Wellness</div>
                  <div className={s.s1Url}>physiomaxwellness.ca</div>
                  <div className={`${s.bar} ${s.faint}`} style={{ width: 720, height: 10, marginTop: 12 }} />
                </div>
                <div className={s.s1Row} style={{ top: 620 }} data-s1-row data-s1-fade>
                  <div className={s.bar} style={{ width: 380, height: 14 }} />
                  <div className={`${s.bar} ${s.muted}`} style={{ width: 260, height: 10, marginTop: 14 }} />
                  <div className={`${s.bar} ${s.faint}`} style={{ width: 640, height: 10, marginTop: 14 }} />
                </div>
              </div>

              {/* The frame that carries the chosen result into the browser window */}
              <svg className={s.svg} viewBox={`0 0 ${W} ${H}`}>
                <rect data-s1-pick x="280" y="486" width="1040" height="112" rx="12" className={s.strokeAccentGlow} />
              </svg>

              {/* 2. The site */}
              <div className={s.scene} data-scene>
                <div className={s.h} data-s2-h data-s2-fade>They find a site that works.</div>
                <div className={s.s2Window} data-s2-window>
                  <div className={s.s2Top}>
                    <span className={s.dot} data-s2-dot />
                    <span className={s.dot} data-s2-dot />
                    <span className={s.dot} data-s2-dot />
                    <span className={s.address} data-s2-address>physiomaxwellness.ca</span>
                  </div>
                  <div className={s.s2Page} data-s2-page>
                    <div className={s.s2Nav}>
                      <span className={s.logo} data-s2-nav />
                      <span className={`${s.bar} ${s.faint}`} style={{ width: 120, height: 12 }} data-s2-nav />
                      <span className={s.s2NavRight}>
                        <span className={`${s.bar} ${s.muted}`} style={{ width: 64, height: 10 }} data-s2-nav />
                        <span className={`${s.bar} ${s.muted}`} style={{ width: 80, height: 10 }} data-s2-nav />
                        <span className={`${s.bar} ${s.muted}`} style={{ width: 56, height: 10 }} data-s2-nav />
                        <span className={`${s.bar} ${s.muted}`} style={{ width: 72, height: 10 }} data-s2-nav />
                      </span>
                    </div>
                    <div className={s.s2Hero}>
                      <div className={s.s2Copy}>
                        <div className={s.s2Title} data-s2-title>Move better.</div>
                        <div className={s.s2Title} data-s2-title>Recover faster.</div>
                        <div className={`${s.bar} ${s.faint}`} style={{ width: 460, height: 10, marginTop: 26 }} data-s2-para />
                        <div className={`${s.bar} ${s.faint}`} style={{ width: 420, height: 10, marginTop: 12 }} data-s2-para />
                        <div className={`${s.bar} ${s.faint}`} style={{ width: 300, height: 10, marginTop: 12 }} data-s2-para />
                        <div className={s.pill} data-s2-book>Book appointment</div>
                      </div>
                      <div className={s.s2Image} data-s2-image>
                        <svg viewBox="0 0 540 400" className={s.s2Art}>
                          <circle data-s2-art cx="400" cy="120" r="44" className={s.strokeMuted} />
                          <path data-s2-art d="M40 340 L170 190 L250 270 L330 180 L430 290 L500 230 L500 340 Z" className={s.strokeMuted} />
                        </svg>
                      </div>
                    </div>
                    <div className={s.s2Cards}>
                      {[0, 1, 2].map((i) => (
                        <div className={s.card} key={i} data-s2-card>
                          <span className={s.cardMark} />
                          <span className={s.bar} style={{ width: 150, height: 12 }} />
                          <span className={`${s.bar} ${s.faint}`} style={{ width: 240, height: 9, marginTop: 10 }} />
                          <span className={`${s.bar} ${s.faint}`} style={{ width: 190, height: 9, marginTop: 8 }} />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className={s.sheen} data-sheen />
                </div>
              </div>

              {/* 3. The booking */}
              <div className={s.scene} data-scene>
                <div className={s.h} data-s3-h data-s3-fade>They book in a minute.</div>
                <div className={s.s3Phone} data-s3-phone-wrap data-s3-fade>
                  <svg className={s.svg} viewBox={`0 0 ${W} ${H}`}>
                    <rect data-s3-phone x="640" y="160" width="320" height="620" rx="38" className={s.strokeInk} />
                  </svg>
                  <div className={s.s3Body} />
                  <span className={s.notch} data-s3-notch />
                  <div className={s.s3Screen} data-s3-screen>
                    <div className={s.s3Head} data-s3-head>Choose a time</div>
                    <div className={s.s3Days}>
                      {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                        <span key={i} data-s3-day>{d}</span>
                      ))}
                    </div>
                    <div className={s.s3Grid}>
                      {cells.map((i) => (
                        <span key={i} className={`${s.cell} ${free.has(i) ? s.cellFree : ''}`} data-s3-cell={i === 17 ? 'pick' : ''} />
                      ))}
                    </div>
                    <div className={`${s.pill} ${s.s3Confirm}`} data-s3-confirm>Confirm</div>
                  </div>
                  <div className={s.s3Booked} data-s3-booked>Booked</div>
                </div>
                <svg className={s.svg} viewBox={`0 0 ${W} ${H}`}>
                  <g data-s3-fade>
                    <circle data-s3-burst cx="800" cy="430" r="90" className={s.strokeAccentThin} />
                    <circle data-s3-burst cx="800" cy="430" r="90" className={s.strokeAccentThin} />
                    <circle data-s3-burst cx="800" cy="430" r="90" className={s.strokeAccentThin} />
                  </g>
                  <g data-s3-fly>
                    <circle data-s3-circle cx="800" cy="430" r="56" className={s.strokeGreen} />
                    <path data-s3-check d="M774 432 L794 452 L830 410" className={s.strokeGreen} />
                  </g>
                </svg>
              </div>

              {/* 4. The tracking */}
              <div className={s.scene} data-scene>
                <div className={s.h} data-s4-h>You see where every booking came from.</div>
                <div className={s.s4Panels}>
                  <div className={s.panel} data-s4-panel>
                    <div className={s.label} data-s4-label>Bookings</div>
                    <svg viewBox="0 0 420 420" className={s.panelSvg}>
                      <path data-s4-area d="M30 330 L95 290 L160 300 L225 230 L290 200 L355 120 L390 90 L390 390 L30 390 Z" className={s.areaFill} />
                      <path data-s4-line d="M30 330 L95 290 L160 300 L225 230 L290 200 L355 120 L390 90" className={s.strokeAccent} />
                      {[[30, 330], [95, 290], [160, 300], [225, 230], [290, 200], [355, 120], [390, 90]].map(([x, y], i) => (
                        <circle key={i} data-s4-dot cx={x} cy={y} r="6" className={s.dotFill} />
                      ))}
                    </svg>
                  </div>
                  <div className={s.panel} data-s4-panel>
                    <div className={s.label} data-s4-label>Calls</div>
                    <div className={s.bars}>
                      {[150, 210, 180, 260, 300, 340].map((h, i) => (
                        <span key={i} className={s.vbar} style={{ height: h, opacity: 0.55 + i * 0.09 }} data-s4-bar />
                      ))}
                    </div>
                  </div>
                  <div className={s.panel} data-s4-panel>
                    <div className={s.label} data-s4-label>Where they came from</div>
                    <svg viewBox="0 0 420 420" className={s.panelSvg}>
                      <circle className={s.ringTrack} cx="210" cy="190" r="110" />
                      <circle data-s4-arc-a cx="210" cy="190" r="110" className={s.arcA} />
                      <circle data-s4-arc-b cx="210" cy="190" r="110" className={s.arcB} />
                    </svg>
                    <div className={s.legend}>
                      <div data-s4-legend><span className={s.swatch} style={{ background: '#3d6bff' }} />Google search</div>
                      <div data-s4-legend><span className={s.swatch} style={{ background: 'rgba(238,237,232,.7)' }} />Google Ads</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 5. The title */}
              <div className={s.scene} data-scene>
                <div className={s.s5Words} data-s5-fade>
                  {['Websites', 'Booking', 'Search', 'Ads'].map((w) => (
                    <div key={w} className={s.word} data-s5-word>{w}</div>
                  ))}
                </div>
                <div className={s.s5End} data-s5-fade>
                  <div className={s.s5Line} data-s5-line>Websites, booking, search and ads.</div>
                  <div className={s.s5Name} data-s5-name>Kareem Hassanein</div>
                  <div className={`${s.pill} ${s.s5Cta}`} data-s5-cta>Book a call</div>
                </div>
              </div>

              {/* The cursor and its click ring, above everything */}
              <svg className={s.svg} viewBox={`0 0 ${W} ${H}`}>
                <circle data-ring r="28" className={s.ringStroke} />
              </svg>
              <svg className={s.cursor} viewBox="0 0 24 28" data-cursor>
                <path d="M2 2 L2 22 L7.5 17 L11 25 L14.5 23.5 L11 15.5 L18 15.5 Z" fill="#eeede8" stroke="#0c0c0b" strokeWidth="1.6" strokeLinejoin="round" />
              </svg>
            </div>
            <div className={s.progress} data-progress />
          </div>
          <button type="button" className={s.sound} aria-pressed={sound} onClick={toggleSound}>
            <svg viewBox="0 0 20 20" aria-hidden="true">
              <path d="M3 7.5v5h3.2L11 16V4L6.2 7.5H3z" fill="currentColor" />
              {sound ? (
                <>
                  <path d="M13.5 7a4.2 4.2 0 0 1 0 6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M15.8 4.6a7.6 7.6 0 0 1 0 10.8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </>
              ) : (
                <path d="M13.5 7.8l4.4 4.4M17.9 7.8l-4.4 4.4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              )}
            </svg>
            <span>Sound</span>
          </button>
        </div>
      </div>
    </section>
  );
}
