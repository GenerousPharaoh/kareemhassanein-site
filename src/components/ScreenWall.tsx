'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Pause, Play } from 'lucide-react';
import { FrameChrome, frameShellFor } from '@/components/ScreenFrame';
import type { WallShot } from '@/lib/work';

/**
 * The live screens, standing on a slowly turning wall.
 *
 * The cards sit on a cylinder in real perspective: each is rotated to its own
 * angle and pushed out by the radius, so the ones either side of centre fall
 * away and dim with distance rather than being scaled by hand. Moving the
 * pointer turns the camera a few degrees instead of the object, which is what
 * makes it read as a room you are looking into.
 *
 * Radius is derived, not guessed. Neighbouring cards are 2R·sin(pi/N) apart, so
 * for them not to overlap the radius has to grow with the card width and with
 * the number of cards. It is recomputed on resize because the card width is
 * responsive.
 *
 * Rotation runs in a rAF loop writing transforms directly, so adding a card
 * costs a transform rather than a React render. It holds while the pointer is
 * over the stage (which is also what makes the links clickable), and never
 * starts under prefers-reduced-motion. The pause control is not decoration:
 * WCAG 2.2.2 wants a mechanism to stop content that moves on its own, and the
 * arrows give a keyboard route to every card.
 */

// Degrees per frame. Slow: a full turn takes about two and a half minutes.
const SPEED = 0.04;
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

  const N = shots.length;
  const step = 360 / N;

  // Mutable state the animation frame owns.
  const rot = useRef(0);
  const nudge = useRef(0);
  const targetNudge = useRef(0);
  const hovering = useRef(false);
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
    const loop = () => {
      if (!reduceMotion && !paused && !hovering.current) rot.current -= SPEED;
      nudge.current += (targetNudge.current - nudge.current) * 0.06;

      const ring = ringRef.current;
      if (ring) {
        ring.style.transform =
          `translateY(-30px) translateZ(${-radius.current}px) rotateY(${rot.current + nudge.current}deg) rotateX(-5deg)`;
      }

      let best = 0;
      let bestFacing = -2;
      cellRefs.current.forEach((c, i) => {
        if (!c) return;
        const a = (((i * step + rot.current + nudge.current) % 360) + 360) % 360;
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

      <div
        ref={stageRef}
        className="wall-stage"
        onPointerMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          targetNudge.current = ((e.clientX - r.left) / r.width - 0.5) * 22;
        }}
        onPointerEnter={() => { hovering.current = true; }}
        onPointerLeave={() => { hovering.current = false; targetNudge.current = 0; }}
      >
        <div ref={ringRef} className="wall-ring">
          {shots.map((shot, i) => (
            <div
              key={shot.src}
              ref={(el) => { cellRefs.current[i] = el; }}
              className="wall-cell"
            >
              <Link
                href={`/work/${shot.slug}`}
                className={`${frameShellFor('dark')} block`}
                aria-label={`${shot.project}: ${shot.label}`}
              >
                <FrameChrome />
                <div className="relative aspect-[2/1] overflow-hidden bg-[hsl(222,12%,14%)]">
                  {seen.has(i) && (
                    <Image
                      src={shot.src}
                      alt={shot.alt}
                      fill
                      sizes="(max-width: 640px) 68vw, (max-width: 1024px) 40vw, 420px"
                      quality={78}
                      className="object-cover"
                    />
                  )}
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="px-6 text-center sm:px-8 lg:px-12 xl:px-20">
        <p key={current.label} className="wall-label text-xl font-medium tracking-[-0.03em] sm:text-2xl">
          {current.label}
        </p>
        <p key={current.project} className="wall-label mt-1 text-sm text-muted-foreground">
          {current.project}
        </p>
      </div>
    </div>
  );
}
