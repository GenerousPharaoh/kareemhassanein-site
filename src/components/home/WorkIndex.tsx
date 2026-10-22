'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Picture } from '@/components/media/Picture';
import { webglAvailable } from '@/lib/gl/noise';
import type { PreviewGL } from '@/lib/gl/preview';
import { getGsap, useGsap } from '@/lib/gsap';
import type { Still } from '@/lib/media';
import s from './WorkIndex.module.css';

export type IndexItem = {
  slug: string;
  name: string;
  kind: string;
  services: string;
  href: string;
  /** The stage colour the list leans toward while this row is under the pointer */
  tone: string;
  still: Still;
};

const Arrow = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M5 12h13m-5-6 6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const previewSrc = (still: Still) => `${still.src}-${still.widths.find((w) => w >= 960) ?? still.widths[0]}.webp`;

/**
 * Every project as a large row. With a mouse, a preview of the project follows the pointer: a
 * WebGL card that bends with the speed of the movement and dissolves from one project into the
 * next, while the list behind takes on the project's colour. Touch screens show the picture in
 * the row instead.
 */
export function WorkIndex({ items, title = 'Work', allHref = '/work' }: { items: IndexItem[]; title?: string; allHref?: string }) {
  const root = useRef<HTMLElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(-1);
  const [mode, setMode] = useState<'off' | 'gl' | 'dom'>('off');

  const st = useRef({
    pointer: [0, 0] as [number, number],
    center: [0, 0] as [number, number],
    vel: [0, 0] as [number, number],
    show: 0,
    mix: 0,
    shown: -1,
    target: -1,
    inside: false,
    images: [] as HTMLImageElement[],
  });
  const gl = useRef<PreviewGL | null>(null);
  const showRow = useRef<(i: number) => void>(() => {});

  // Decide how the preview is drawn, and load the pictures once the list is near
  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 900px) and (prefers-reduced-motion: no-preference)');
    if (!fine.matches) return;
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        st.current.images = items.map((it) => {
          const img = new Image();
          img.decoding = 'async';
          img.src = previewSrc(it.still);
          return img;
        });
        setMode(webglAvailable() ? 'gl' : 'dom');
      },
      { rootMargin: '100% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [items]);

  // The drawing loop (WebGL or the plain card), only while the preview is on screen or moving
  useEffect(() => {
    if (mode === 'off') return;
    const { gsap } = getGsap();
    const S = st.current;
    let r: PreviewGL | null = null;
    let cancelled = false;
    let mixTween: gsap.core.Tween | null = null;
    let drawn = false;

    const size = (): [number, number] => {
      const w = Math.min(440, Math.max(300, window.innerWidth * 0.28));
      return [w, w * 0.625];
    };

    const resize = () => r?.resize(window.innerWidth, window.innerHeight);

    const ensure = (i: number, slot: 0 | 1) => {
      const img = S.images[i];
      if (!r || !img || !img.complete || !img.naturalWidth) return false;
      r.set(slot, img);
      return true;
    };

    // Move to the picture of row i (a change mid-dissolve finishes the old one first)
    const toRow = (i: number) => {
      S.target = i;
      if (mode !== 'gl' || !r) return;
      // Arriving from outside the list: no dissolve, the card simply appears with this row
      if (S.shown < 0 || S.show < 0.05) {
        mixTween?.kill();
        mixTween = null;
        S.mix = 0;
        if (ensure(i, 0)) S.shown = i;
        return;
      }
      if (i === S.shown) return;
      if (mixTween) {
        mixTween.kill();
        r.swap();
        S.mix = 0;
      }
      if (!ensure(i, 1)) return;
      const to = i;
      mixTween = gsap.fromTo(
        S,
        { mix: 0 },
        {
          mix: 1,
          duration: 0.7,
          ease: 'power2.out',
          onComplete: () => {
            r?.swap();
            S.mix = 0;
            S.shown = to;
            mixTween = null;
          },
        },
      );
      S.shown = to;
    };

    const tick = () => {
      const moving = Math.abs(S.pointer[0] - S.center[0]) + Math.abs(S.pointer[1] - S.center[1]) > 0.3;
      if (S.show < 0.001 && !S.inside && !moving) {
        if (drawn) {
          r?.clear();
          if (card.current) card.current.style.opacity = '0';
          drawn = false;
        }
        return;
      }
      drawn = true;
      const [w, h] = size();
      const px = S.center[0];
      const py = S.center[1];
      S.center[0] += (S.pointer[0] - S.center[0]) * 0.13;
      S.center[1] += (S.pointer[1] - S.center[1]) * 0.13;
      const vx = Math.max(-1.2, Math.min(1.2, ((S.center[0] - px) / w) * 4));
      const vy = Math.max(-1.2, Math.min(1.2, ((S.center[1] - py) / h) * 4));
      S.vel[0] += (vx - S.vel[0]) * 0.2;
      S.vel[1] += (vy - S.vel[1]) * 0.2;
      if (S.shown < 0 && S.target >= 0) toRow(S.target);
      if (mode === 'gl' && r) {
        if (S.show < 0.001) r.clear();
        else r.render({ center: [S.center[0], S.center[1]], size: [w, h], vel: [S.vel[0], S.vel[1]], show: S.show, mix: S.mix, time: performance.now() / 1000 });
      } else if (card.current) {
        const c = card.current;
        c.style.width = `${w}px`;
        c.style.height = `${h}px`;
        c.style.opacity = String(S.show);
        c.style.transform = `translate3d(${S.center[0] - w / 2}px, ${S.center[1] - h / 2}px, 0) rotate(${S.vel[0] * 4}deg) scale(${0.8 + 0.2 * S.show})`;
      }
    };

    const boot = async () => {
      if (mode === 'gl' && canvas.current) {
        const { PreviewGL } = await import('@/lib/gl/preview');
        if (cancelled) return;
        try {
          r = new PreviewGL(canvas.current);
          gl.current = r;
          resize();
        } catch {
          setMode('dom');
          return;
        }
      }
      gsap.ticker.add(tick);
    };
    boot();
    window.addEventListener('resize', resize);
    showRow.current = toRow;

    return () => {
      cancelled = true;
      window.removeEventListener('resize', resize);
      gsap.ticker.remove(tick);
      mixTween?.kill();
      r?.destroy();
      gl.current = null;
    };
  }, [mode]);

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse' || mode === 'off') return;
    const S = st.current;
    S.pointer = [e.clientX, e.clientY];
    if (!S.inside) {
      S.inside = true;
      S.center = [e.clientX, e.clientY];
      getGsap().gsap.to(S, { show: 1, duration: 0.7, ease: 'expo.out', overwrite: 'auto' });
    }
    const row = (e.target as Element).closest<HTMLElement>('[data-row]');
    const i = row ? Number(row.dataset.row) : -1;
    if (i >= 0 && i !== active) {
      setActive(i);
      showRow.current(i);
    }
  };

  const onLeave = () => {
    const S = st.current;
    S.inside = false;
    setActive(-1);
    getGsap().gsap.to(S, { show: 0, duration: 0.45, ease: 'power2.in', overwrite: 'auto' });
  };

  // Entrance: the rules draw across, the names rise out of their rows
  useGsap(root, ({ reduce }) => {
    if (reduce) return;
    const { gsap } = getGsap();
    const el = root.current!;
    const tl = gsap.timeline({ scrollTrigger: { trigger: el.querySelector('[data-list]'), start: 'top 82%', once: true } });
    tl.fromTo(el.querySelectorAll('[data-rule]'), { scaleX: 0 }, { scaleX: 1, duration: 1.4, ease: 'expo.out', stagger: 0.07, clearProps: 'transform' }, 0)
      .fromTo(el.querySelectorAll('[data-rise]'), { yPercent: 110 }, { yPercent: 0, duration: 1.1, ease: 'expo.out', stagger: 0.07, clearProps: 'transform' }, 0.1)
      .fromTo(el.querySelectorAll('[data-fade]'), { opacity: 0 }, { opacity: 1, duration: 1, ease: 'power2.out', stagger: 0.05, clearProps: 'opacity' }, 0.35);
    gsap.fromTo(el.querySelector('[data-head]'), { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 80%', once: true } });
  });

  const tone = active >= 0 ? items[active].tone : undefined;

  return (
    <section ref={root} className={s.index} aria-labelledby="work-h" style={tone ? { ['--hover-tone' as string]: tone } : undefined} data-hover={active >= 0 || undefined}>
      <div className={`container ${s.inner}`}>
        <div className={s.head} data-head>
          <h2 id="work-h" className={s.title}>
            {title}
          </h2>
          <Link href={allHref} className={s.all}>
            All case studies
            <Arrow />
          </Link>
        </div>
        <ul ref={list} className={s.list} data-list onPointerMove={onMove} onPointerLeave={onLeave} data-active={active >= 0 || undefined}>
          {items.map((it, i) => (
            <li key={it.slug} className={s.row} data-row={i} data-current={i === active || undefined}>
              <span className={s.rule} data-rule aria-hidden="true" />
              <Link href={it.href} className={s.link}>
                <span className={s.nameMask}>
                  <span className={s.name} data-rise>
                    {it.name}
                  </span>
                </span>
                <span className={s.kind} data-fade>
                  {it.kind}
                </span>
                <span className={s.services} data-fade>
                  {it.services}
                </span>
                <span className={s.arrow} data-fade>
                  <Arrow />
                </span>
                <span className={s.thumb}>
                  <Picture media={it.still} sizes="(max-width: 899px) calc(100vw - 40px), 1px" />
                </span>
              </Link>
            </li>
          ))}
          <li className={s.end} aria-hidden="true">
            <span className={s.rule} data-rule />
          </li>
        </ul>
      </div>
      {mode !== 'off' &&
        createPortal(
          mode === 'gl' ? (
            <canvas ref={canvas} className={s.canvas} aria-hidden="true" />
          ) : (
            <div ref={card} className={s.card} aria-hidden="true">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {active >= 0 && <img src={previewSrc(items[active].still)} alt="" />}
            </div>
          ),
          document.body,
        )}
    </section>
  );
}
