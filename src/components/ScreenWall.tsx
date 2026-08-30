'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Pause, Play } from 'lucide-react';
import { FrameChrome, frameShellFor } from '@/components/ScreenFrame';
import type { WallShot } from '@/lib/work';

/**
 * The live screens, standing on a slowly turning wall.
 *
 * The cards sit on a cylinder in real perspective: each is rotated to its own
 * angle and pushed out by the radius, so the ones either side of centre fall
 * away and dim with distance rather than being scaled by hand. Behind them the
 * facing screen is repeated blurred past recognition, which gives the wall a
 * room to stand in instead of a flat void, and shifts colour as it turns.
 *
 * It does not respond to the pointer at all. A cursor-driven camera and a
 * hover hold both made it lurch as the mouse crossed the section.
 *
 * Radius is derived, not guessed. Neighbouring cards are 2R·sin(pi/N) apart, so
 * for them not to overlap the radius has to grow with the card width and with
 * the number of cards. It is recomputed on resize because the card width is
 * responsive.
 *
 * Rotation runs in a rAF loop writing transforms directly, so adding a card
 * costs a transform rather than a React render, and never starts under
 * prefers-reduced-motion. The pause control is not decoration: WCAG 2.2.2
 * wants a mechanism to stop content that moves on its own.
 */

// Degrees per SECOND, not per frame. Per-frame drift runs at double speed on a
// 120Hz display and half on a 60Hz one; this way the wall turns at the same
// rate everywhere. A full turn takes two minutes.
const DEG_PER_SEC = 3;
const GAP = 46;

export default function ScreenWall({ shots }: { shots: WallShot[] }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const cellRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [front, setFront] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  // Cards mount their image once they have come near the front, so the page
  // does not fetch twenty-one screenshots to show five.
  const [seen, setSeen] = useState<Set<number>>(() => new Set([0, 1, 2, 19, 20]));
  // The backdrop is the facing screen itself, blurred past recognition. Two
  // layers so one can fade up while the other fades out; changing a single
  // element's image would cut rather than dissolve.
  const [amb, setAmb] = useState({ a: 0, b: 0, showA: true });

  const N = shots.length;
  const step = 360 / N;

  // Mutable state the animation frame owns.
  const rot = useRef(0);
  const radius = useRef(1500);

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduceMotion(mql.matches);
    update();
    mql.addEventListener('change', update);
    return () => mql.removeEventListener('change', update);
  }, []);

  // Radius from the rendered card width: chord = 2R·sin(pi/N) must clear it.
  const measure = useCallback(() => {
    const ring = ringRef.current;
    if (!ring) return;
    // offsetWidth, not getBoundingClientRect: the ring carries a translateZ, so
    // its bounding rect comes back already divided by the perspective. Feeding
    // that into the radius makes the radius shrink on every measure.
    const w = ring.offsetWidth || 400;
    radius.current = (w + GAP) / (2 * Math.sin(Math.PI / N));
    cellRefs.current.forEach((c, i) => {
      if (c) c.style.transform = `rotateY(${i * step}deg) translateZ(${radius.current}px)`;
    });
  }, [N, step]);

  useEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (ringRef.current) ro.observe(ringRef.current);
    return () => ro.disconnect();
  }, [measure]);

  useEffect(() => {
    let raf = 0;
    let lastFront = -1;
    let prev = performance.now();
    const loop = (now: number) => {
      // Clamp the step so a backgrounded tab does not resume with a huge jump.
      const dt = Math.min((now - prev) / 1000, 0.1);
      prev = now;
      if (!reduceMotion && !paused) rot.current -= DEG_PER_SEC * dt;

      const ring = ringRef.current;
      if (ring) {
        ring.style.transform =
          `translateY(-30px) translateZ(${-radius.current}px) rotateY(${rot.current}deg) rotateX(-5deg)`;
      }

      let best = 0;
      let bestFacing = -2;
      cellRefs.current.forEach((c, i) => {
        if (!c) return;
        const a = (((i * step + rot.current) % 360) + 360) % 360;
        const facing = Math.cos((a * Math.PI) / 180);
        const vis = Math.max(0, facing);
        c.style.visibility = vis < 0.05 ? 'hidden' : 'visible';
        const frame = c.firstElementChild as HTMLElement | null;
        if (frame) {
          frame.style.opacity = String(Math.pow(vis, 1.5));
          frame.style.filter = `brightness(${(0.5 + 0.5 * vis).toFixed(3)})`;
        }
        if (facing > bestFacing) {
          bestFacing = facing;
          best = i;
        }
      });

      if (best !== lastFront) {
        lastFront = best;
        setFront(best);
        setSeen((prev) => {
          if (prev.has(best) && prev.has((best + 1) % N) && prev.has((best + 2) % N)) return prev;
          const next = new Set(prev);
          for (let k = -2; k <= 2; k += 1) next.add((best + k + N) % N);
          return next;
        });
        setAmb((prev) => (prev.showA ? { a: prev.a, b: best, showA: false } : { a: best, b: prev.b, showA: true }));
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [N, step, paused, reduceMotion]);

  const nudgeBy = (dir: number) => {
    rot.current -= dir * step;
  };

  const current = shots[front] ?? shots[0];

  return (
    <div>
      <div className="mb-6 flex items-end justify-between gap-6 px-6 sm:px-8 md:mb-8 lg:px-12 xl:px-20">
        <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent/82">
          <span aria-hidden="true" className="h-px w-10 bg-accent/50" />
          Live work
        </p>
        <div className="flex shrink-0 items-center gap-2">
          {!reduceMotion && (
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              aria-label={paused ? 'Resume the turning screens' : 'Stop the turning screens'}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.14] text-foreground/70 transition-colors duration-300 hover:border-accent/45 hover:text-accent"
            >
              {paused ? <Play aria-hidden="true" size={14} /> : <Pause aria-hidden="true" size={14} />}
            </button>
          )}
          <button
            type="button"
            onClick={() => nudgeBy(-1)}
            aria-label="Previous screen"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.14] text-foreground/70 transition-colors duration-300 hover:border-accent/45 hover:text-accent"
          >
            <ArrowLeft aria-hidden="true" size={15} />
          </button>
          <button
            type="button"
            onClick={() => nudgeBy(1)}
            aria-label="Next screen"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.14] text-foreground/70 transition-colors duration-300 hover:border-accent/45 hover:text-accent"
          >
            <ArrowRight aria-hidden="true" size={15} />
          </button>
        </div>
      </div>

      <div className="wall-scene">
        {/* Ambient light, taken from the screen currently facing you. Tiny
            source images: they are blurred to a colour field, so there is no
            point fetching anything larger. */}
        <div className="wall-ambient" aria-hidden="true">
          {([['a', amb.a, amb.showA], ['b', amb.b, !amb.showA]] as const).map(([key, idx, on]) => (
            <div key={key} className="wall-ambient-layer" style={{ opacity: on ? 1 : 0 }}>
              <Image
                src={shots[idx].src}
                alt=""
                fill
                sizes="320px"
                quality={25}
                className="object-cover"
              />
            </div>
          ))}
        </div>
        <div className="wall-floor" aria-hidden="true" />

      {/* Deliberately inert to the pointer. A cursor-driven camera and a
          hover hold both made the wall lurch as the mouse crossed it, and a
          link that slides out from under the cursor is worse than no link, so
          the frames are display only and the project cards below are the way
          in. The wall is hidden from assistive tech for the same reason: the
          caption names the facing screen and the cards carry the navigation. */}
      <div ref={stageRef} className="wall-stage" aria-hidden="true">
        <div ref={ringRef} className="wall-ring">
          {shots.map((shot, i) => (
            <div
              key={shot.src}
              ref={(el) => { cellRefs.current[i] = el; }}
              className="wall-cell"
            >
              <div className={frameShellFor('dark')}>
                <FrameChrome />
                <div className="relative aspect-[2/1] overflow-hidden bg-[hsl(222,12%,14%)]">
                  {seen.has(i) && (
                    <Image
                      src={shot.src}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 68vw, (max-width: 1024px) 40vw, 420px"
                      quality={78}
                      className="object-cover"
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>

      {/* The caption reads as a museum label rather than two stacked sentences:
          the site's serif carries the screen name, the project sits above it in
          the same gold as the section eyebrow, and the count anchors the pair. */}
      <div className="wall-caption px-6 sm:px-8 lg:px-12 xl:px-20">
        <span aria-hidden="true" className="wall-caption-rule" />
        <p key={`p-${front}`} className="wall-line text-[11px] font-semibold uppercase tracking-[0.22em] text-accent/85">
          {current.project}
        </p>
        <p
          key={`l-${front}`}
          className="wall-line font-serif text-[clamp(1.7rem,3.4vw,2.8rem)] font-normal italic leading-[1.15] tracking-[-0.015em] text-foreground"
          style={{ animationDelay: '0.06s' }}
        >
          {current.label}
        </p>
        <p
          key={`n-${front}`}
          className="wall-line font-mono text-[11px] tracking-[0.16em] text-muted-foreground/70"
          style={{ animationDelay: '0.12s' }}
        >
          {String(front + 1).padStart(2, '0')} / {String(N).padStart(2, '0')}
        </p>
      </div>
    </div>
  );
}
