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
 * away and dim with distance rather than being scaled by hand.
 *
 * Behind it a second, wider ring of the same work turns the other way, pushed
 * far enough back that perspective alone shrinks and softens it. That is the
 * backdrop: more of the work, moving against the near ring, so the depth is
 * real parallax rather than a blurred wash behind glass.
 *
 * There is no caption under the wall. Each frame carries its own address in
 * its chrome, which travels with the card, needs no transition, and says the
 * thing a subtitle was only implying: these are real pages you can go and
 * load.
 *
 * Nothing responds to the pointer. A cursor-driven camera and a hover hold
 * both made the wall lurch as the mouse crossed the section.
 *
 * Neither ring is tilted. A rotateX on a cylinder displaces each card
 * vertically by sin(tilt) times its own z, so a card's height depends on where
 * it has got to around the ring: cards climbed as they came round and clipped
 * against the top of the stage. Flat, every card sits on the same line and the
 * only motion is the turn itself.
 *
 * Radius is derived, not guessed. Neighbouring cards are 2R.sin(pi/N) apart,
 * so for them not to overlap the radius has to grow with the card width and
 * with the number of cards. It is recomputed on resize.
 */

// Degrees per SECOND, not per frame. Per-frame drift runs at double speed on a
// 120Hz display and half on a 60Hz one. A full turn takes two minutes.
const DEG_PER_SEC = 3;
const GAP = 46;
// The far ring turns against the near one, and slower, so the two never lock
// into a repeating pattern.
const FAR_SPEED_RATIO = -0.55;
// A slightly wider ring pushed well back. Pushing it back is what makes it
// distant; making the radius much larger only spreads the cards so far apart
// that one sits dead centre and the rest are off screen.
const FAR_RADIUS_RATIO = 1.15;
const FAR_PUSH = 900;
// The far tier is offset uniformly so it reads above the near one, and fills
// what would otherwise be dead space under the section label. Uniform is the
// point: it is the one vertical move in here that does not depend on where a
// card sits around the ring. The value is pre-perspective, so the on-screen
// lift is this times the far tier's scale, which is why it looks large.
const FAR_LIFT = -140;

export default function ScreenWall({ shots }: { shots: WallShot[] }) {
  const nearRing = useRef<HTMLDivElement>(null);
  const farRing = useRef<HTMLDivElement>(null);
  const nearCells = useRef<(HTMLDivElement | null)[]>([]);
  const farCells = useRef<(HTMLDivElement | null)[]>([]);

  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  // Cards mount their image once they have come near the front, so the page
  // does not fetch twenty-one screenshots to show five.
  const [seen, setSeen] = useState<Set<number>>(() => new Set([0, 1, 2, 19, 20]));

  const N = shots.length;
  const step = 360 / N;
  // The far ring carries the same screens at the same angles, so the two
  // rings share every optimised image URL and the backdrop costs no extra
  // requests. It fills in as the near ring loads.
  const farStep = step;

  const rot = useRef(0);
  const nearRadius = useRef(1500);
  const farRadius = useRef(2850);

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduceMotion(mql.matches);
    update();
    mql.addEventListener('change', update);
    return () => mql.removeEventListener('change', update);
  }, []);

  const measure = useCallback(() => {
    const ring = nearRing.current;
    if (!ring) return;
    // offsetWidth, not getBoundingClientRect: the ring carries a translateZ, so
    // its bounding rect comes back already divided by the perspective. Feeding
    // that into the radius makes the radius shrink on every measure.
    const w = ring.offsetWidth || 400;
    nearRadius.current = (w + GAP) / (2 * Math.sin(Math.PI / N));
    farRadius.current = nearRadius.current * FAR_RADIUS_RATIO;
    nearCells.current.forEach((c, i) => {
      if (c) c.style.transform = `rotateY(${i * step}deg) translateZ(${nearRadius.current}px)`;
    });
    farCells.current.forEach((c, i) => {
      if (c) c.style.transform = `rotateY(${i * farStep}deg) translateZ(${farRadius.current}px)`;
    });
  }, [N, step, farStep]);

  useEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (nearRing.current) ro.observe(nearRing.current);
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

      const near = nearRing.current;
      if (near) {
        near.style.transform =
          `translateZ(${-nearRadius.current}px) rotateY(${rot.current}deg)`;
      }
      const far = farRing.current;
      if (far) {
        far.style.transform =
          `translateY(${FAR_LIFT}px) translateZ(${-farRadius.current - FAR_PUSH}px) rotateY(${rot.current * FAR_SPEED_RATIO}deg)`;
      }

      let best = 0;
      let bestFacing = -2;
      nearCells.current.forEach((c, i) => {
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

      farCells.current.forEach((c, i) => {
        if (!c) return;
        const a = (((i * farStep + rot.current * FAR_SPEED_RATIO) % 360) + 360) % 360;
        const vis = Math.max(0, Math.cos((a * Math.PI) / 180));
        c.style.visibility = vis < 0.05 ? 'hidden' : 'visible';
        c.style.opacity = String(0.42 * Math.pow(vis, 1.4));
      });

      if (best !== lastFront) {
        lastFront = best;
        setSeen((current) => {
          if (current.has((best + 1) % N) && current.has((best + 2) % N)) return current;
          const next = new Set(current);
          for (let k = -2; k <= 2; k += 1) next.add((best + k + N) % N);
          return next;
        });
      }
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [N, step, farStep, paused, reduceMotion]);

  const nudgeBy = (dir: number) => {
    rot.current -= dir * step;
  };

  const control =
    'flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.14] text-foreground/70 transition-colors duration-300 hover:border-accent/45 hover:text-accent';

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
              className={control}
            >
              {paused ? <Play aria-hidden="true" size={14} /> : <Pause aria-hidden="true" size={14} />}
            </button>
          )}
          <button type="button" onClick={() => nudgeBy(-1)} aria-label="Previous screen" className={control}>
            <ArrowLeft aria-hidden="true" size={15} />
          </button>
          <button type="button" onClick={() => nudgeBy(1)} aria-label="Next screen" className={control}>
            <ArrowRight aria-hidden="true" size={15} />
          </button>
        </div>
      </div>

      {/* Hidden from assistive tech: a display of work the project cards below
          already carry as real, reachable links. */}
      <div className="wall-stage" aria-hidden="true">
        <div className="wall-layer">
          <div ref={farRing} className="wall-ring wall-ring--far">
            {shots.map((shot, i) => (
              <div key={`far-${shot.src}`} ref={(el) => { farCells.current[i] = el; }} className="wall-cell">
                {seen.has(i) && (
                  <div className={frameShellFor('dark')}>
                    <FrameChrome />
                    <div className="relative aspect-[2/1] overflow-hidden bg-[hsl(222,12%,14%)]">
                      {/* Same sizes and quality as the near ring on purpose:
                          identical optimised URL, so this is a cache hit. */}
                      <Image
                        src={shot.src}
                        alt=""
                        fill
                        sizes="(max-width: 640px) 68vw, (max-width: 1024px) 40vw, 420px"
                        quality={78}
                        className="object-cover"
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="wall-layer">
          <div ref={nearRing} className="wall-ring">
            {shots.map((shot, i) => (
              <div key={shot.src} ref={(el) => { nearCells.current[i] = el; }} className="wall-cell">
                <div className={frameShellFor('dark')}>
                  <FrameChrome url={shot.url} />
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
    </div>
  );
}
