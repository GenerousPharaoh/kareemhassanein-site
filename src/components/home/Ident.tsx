'use client';

import { useEffect, useRef, useState } from 'react';
import { getGsap, useGsap } from '@/lib/gsap';
import { IdentGL, initialView, type IdentView } from '@/lib/gl/ident';
import { BAR, BEAT, LENGTH, Music, kickBeats } from '@/lib/music';
import { prefersReducedMotion, subscribeMotionPreference } from '@/lib/useReducedMotion';
import s from './Ident.module.css';

/** Words etched into the panes of the corridor: lines from the work. */
const PHRASES = [
  'Websites, booking, search and ads',
  'Book a call',
  'Tax attorney for IRS audits',
  'Move better. Recover faster.',
  'Your health. Our expertise.',
  'Physiotherapy in Burlington',
  'Relentless by design',
  'Request a consultation',
  'Choose a time',
  'Direct billing available',
  'No referral needed',
  'Google Business Profile',
  'Search Console',
  'Google Ads',
  'Online booking',
  'From search to booked',
  'Case studies',
  'Fixed prices',
  'Washington, D.C.',
  'Burlington, Ontario',
  'Tracking that ties it together',
  'Five business days',
  'Every call and booking, traced',
  'khassanein.bio',
];
const WORDS = ['Websites', 'Booking', 'Search', 'Ads'];

/**
 * The ident: a music-driven flight through a corridor of glass panes etched with words from the
 * work, four words on the beat, and a glass monolith at the end that turns to show the name. The
 * track is composed in code and lines up with the picture; it is silent until asked for.
 */
export function Ident() {
  const root = useRef<HTMLElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fadeRef = useRef<HTMLDivElement>(null);
  const music = useRef<Music | null>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);
  const [sound, setSound] = useState(false);
  const [ready, setReady] = useState(false);
  const [unsupported, setUnsupported] = useState(false);

  useEffect(() => {
    music.current = new Music();
    return () => {
      music.current?.dispose();
      music.current = null;
    };
  }, []);

  const toggleSound = () => {
    const m = music.current;
    const tl = timeline.current;
    if (!m) return;
    if (m.playing) {
      m.stop();
      setSound(false);
    } else {
      m.start(tl ? tl.time() % LENGTH : 0);
      setSound(true);
    }
  };

  useGsap(root, ({ reduce, mobile }) => {
    if (mobile) return;
    const { gsap } = getGsap();
    const canvas = canvasRef.current!;
    const box = frame.current!;
    if (!IdentGL.supported(canvas)) {
      setUnsupported(true);
      return;
    }
    let scene: IdentGL | null = null;
    let dead = false;
    const view: IdentView = initialView();
    const fade = { v: 0 };

    // The picture, on the beat: bars are two seconds, beats half a second
    const tl = gsap.timeline({ paused: true, repeat: -1, defaults: { ease: 'none' } });
    timeline.current = tl;
    const at = (bar: number, beat = 0) => bar * BAR + beat * BEAT;
    // Camera: a slow walk, then a run, then a speed ramp to the stop in front of the monolith
    tl.to(view, { camZ: -8, duration: at(4), ease: 'sine.inOut' }, 0);
    tl.to(view, { camZ: -22, duration: at(4), ease: 'none' }, at(4));
    tl.to(view, { camZ: -50.5, duration: at(4) - 0.35, ease: 'power3.in' }, at(8));
    tl.to(view, { camZ: -53, duration: 0.9, ease: 'power4.out' }, at(12) - 0.35);
    tl.to(view, { camZ: -54.4, duration: at(4) - 0.55, ease: 'sine.inOut' }, at(12) + 0.55);
    tl.to(view, { camX: 0.35, duration: 4.2, ease: 'sine.inOut', yoyo: true, repeat: 7 }, 0);
    tl.to(view, { camY: 0.22, duration: 3.1, ease: 'sine.inOut', yoyo: true, repeat: 9 }, 0.6);
    tl.to(view, { roll: 0.7, duration: 3.7, ease: 'sine.inOut', yoyo: true, repeat: 8 }, 0);
    tl.fromTo(view, { fov: 58 }, { fov: 54, duration: at(8), ease: 'sine.inOut', immediateRender: false }, 0);
    tl.to(view, { fov: 66, duration: at(4) - 0.35, ease: 'power3.in' }, at(8));
    tl.to(view, { fov: 52, duration: 1.1, ease: 'power4.out' }, at(12) - 0.35);
    // Every kick nudges the lens and sends a wave of light down the corridor
    for (const b of kickBeats()) {
      const t = b * BEAT;
      tl.fromTo(view, { hit: 1 }, { hit: 0, duration: 0.42, ease: 'power2.out', immediateRender: false }, t);
      tl.fromTo(view, { waveT: 0 }, { waveT: 1.0, duration: 1.0, ease: 'none', immediateRender: false }, t);
    }
    // The four words, one a bar through the first drop
    view.words.forEach((w, i) => {
      const t = at(4 + i);
      tl.fromTo(w, { scale: 1.32, wipe: 0, bright: 2.6, y: -0.12, alpha: 1 }, { scale: 1, wipe: 1, bright: 1, y: 0, duration: 0.5, ease: 'power4.out', immediateRender: false }, t);
      tl.fromTo(w, { bright: 2.2 }, { bright: 1, duration: 0.3, ease: 'power2.out', immediateRender: false }, t + BEAT * 1.5);
      tl.fromTo(w, { bright: 2.2 }, { bright: 1, duration: 0.3, ease: 'power2.out', immediateRender: false }, t + BEAT * 3);
      tl.to(w, { alpha: 0, y: 0.55, scale: 0.94, duration: 0.22, ease: 'power2.in' }, t + BEAT * 3.6);
    });
    // The impact on bar 13: the monolith turns, the light sweeps, the glow blooms
    tl.fromTo(view, { monoRot: 0 }, { monoRot: 1, duration: 0.75, ease: 'power4.out', immediateRender: false }, at(12));
    tl.fromTo(view, { monoBright: 1.9 }, { monoBright: 1, duration: 1.4, ease: 'power2.out', immediateRender: false }, at(12));
    tl.fromTo(view, { monoSweep: -0.4 }, { monoSweep: 1.4, duration: 1.2, ease: 'power2.inOut', immediateRender: false }, at(12) + 0.15);
    tl.fromTo(view, { monoSweep: -0.4 }, { monoSweep: 1.4, duration: 2.2, ease: 'sine.inOut', immediateRender: false }, at(14));
    tl.fromTo(view, { glow: 1.7 }, { glow: 1, duration: 1.6, ease: 'power2.out', immediateRender: false }, at(12));
    tl.fromTo(view, { roll: 2.4 }, { roll: 0, duration: 0.9, ease: 'power3.out', immediateRender: false }, at(12));
    tl.fromTo(view, { urlAlpha: 0 }, { urlAlpha: 1, duration: 0.6, ease: 'power2.out', immediateRender: false }, at(14));
    // The last beats fade to black so the loop can begin again in the dark
    tl.fromTo(fade, { v: 0 }, { v: 1, duration: 0.7, ease: 'power2.in', immediateRender: false }, LENGTH - 0.75);
    tl.fromTo(fade, { v: 1 }, { v: 0, duration: 0.8, ease: 'power2.out', immediateRender: false }, 0.05);
    tl.eventCallback('onRepeat', () => { if (music.current?.playing) music.current.start(0); });

    let ticking = false;
    const step = () => {
      if (!scene || dead) return;
      scene.render(view);
      if (fadeRef.current) fadeRef.current.style.opacity = String(fade.v);
    };
    let inView = false;
    const sync = () => {
      if (!scene) return;
      const on = inView && !document.hidden && !prefersReducedMotion();
      if (on === ticking) return;
      ticking = on;
      if (on) {
        tl.play();
        gsap.ticker.add(step);
        if (music.current?.playing === false && soundWanted()) music.current.start(tl.time() % LENGTH);
      } else {
        tl.pause();
        gsap.ticker.remove(step);
        music.current?.stop(0.2);
        step();
      }
    };
    const soundWanted = () => box.hasAttribute('data-sound');
    const io = new IntersectionObserver(([e]) => { inView = e.isIntersecting && e.intersectionRatio >= 0.35; sync(); }, { threshold: [0, 0.35] });
    const unsubscribe = subscribeMotionPreference(sync);
    document.addEventListener('visibilitychange', sync);

    const size = () => {
      if (!scene) return;
      scene.resize(box.clientWidth, box.clientHeight);
      if (!ticking) step();
    };
    const ro = new ResizeObserver(size);

    // Build once the font is in, so the etchings use the site's type
    const family = getComputedStyle(box).fontFamily;
    void document.fonts.load(`700 200px ${family}`).then(() => document.fonts.load(`500 38px ${family}`)).catch(() => undefined).then(() => {
      if (dead) return;
      try {
        scene = new IdentGL(canvas, Math.min(window.devicePixelRatio || 1, 1.5));
        scene.build(PHRASES, WORDS, 'Kareem Hassanein', 'Websites, booking, search and ads', 'khassanein.bio', family);
      } catch {
        setUnsupported(true);
        return;
      }
      size();
      ro.observe(box);
      setReady(true);
      if (reduce) {
        tl.pause(at(13));
        step();
        return;
      }
      io.observe(box);
      sync();
    });

    return () => {
      dead = true;
      io.disconnect();
      ro.disconnect();
      unsubscribe();
      document.removeEventListener('visibilitychange', sync);
      gsap.ticker.remove(step);
      tl.kill();
      timeline.current = null;
      music.current?.stop(0.1);
      scene?.dispose();
      scene = null;
    };
  });

  if (unsupported) return null;

  return (
    <section ref={root} className={s.ident} aria-label="An ident: a flight through a corridor of glass panes etched with words from the work, ending on the name.">
      <div className="container">
        <div ref={frame} className={s.frame} data-ready={ready || undefined} data-sound={sound || undefined}>
          <canvas ref={canvasRef} className={s.canvas} aria-hidden="true" />
          <div ref={fadeRef} className={s.fade} aria-hidden="true" />
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
