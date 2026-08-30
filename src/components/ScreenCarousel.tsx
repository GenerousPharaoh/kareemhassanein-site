'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';
import { ArrowLeft, ArrowRight, Pause, Play } from 'lucide-react';
import { FrameChrome, frameShellFor } from '@/components/ScreenFrame';
import type { TourShot } from '@/lib/work';

const ADVANCE_MS = 4200;

/**
 * A tour of the real screens, sitting between the hero and the work.
 *
 * Built on a scroll-snap track rather than a transform, which buys native
 * touch swipe and momentum on mobile for free and keeps the whole thing
 * usable if the auto-advance is paused or never starts.
 *
 * Auto-advance is held while the pointer is over the track, while focus is
 * inside it, while the viewer is mid-swipe, and whenever the section is off
 * screen. It never starts under prefers-reduced-motion. A visible pause
 * control is not decoration: WCAG 2.2.2 wants a mechanism to stop content
 * that moves on its own, and hover alone does not serve keyboard users.
 */
export default function ScreenCarousel({ shots }: { shots: TourShot[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [inView, setInView] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  // Screens load as they are approached rather than all at once: eight full
  // desktop captures on the homepage is not a reasonable download to show one.
  const [primed, setPrimed] = useState(2);
  const userScrolling = useRef<ReturnType<typeof setTimeout> | null>(null);
  const direction = useRef(1);

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduceMotion(mql.matches);
    update();
    mql.addEventListener('change', update);
    return () => mql.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const node = trackRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.35,
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setPrimed((p) => Math.max(p, index + 2));
  }, [index]);

  const goTo = useCallback((next: number, wrap = true) => {
    const track = trackRef.current;
    if (!track) return;
    const total = track.children.length;
    if (!total) return;
    const target = wrap ? ((next % total) + total) % total : Math.min(Math.max(next, 0), total - 1);
    const slide = track.children[target] as HTMLElement;
    track.scrollTo({
      left: slide.offsetLeft - track.offsetLeft,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    });
    setIndex(target);
  }, []);

  const running = inView && !paused && !hovering && !reduceMotion && shots.length > 1;

  // Ping-pong at the ends instead of wrapping. Wrapping meant a full-width
  // rewind across every slide once per cycle, which reads as the track
  // resetting rather than continuing.
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      if (index >= shots.length - 1) direction.current = -1;
      else if (index <= 0) direction.current = 1;
      goTo(index + direction.current, false);
    }, ADVANCE_MS);
    return () => clearInterval(id);
  }, [running, index, goTo, shots.length]);

  // Keep the caption honest when someone swipes or drags instead of using the
  // controls: read the nearest slide back off the track once scrolling settles.
  const handleScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setHovering(true);
    if (userScrolling.current) clearTimeout(userScrolling.current);
    userScrolling.current = setTimeout(() => {
      setHovering(false);
      const mid = track.scrollLeft + track.clientWidth / 2;
      let nearest = 0;
      let best = Infinity;
      Array.from(track.children).forEach((child, i) => {
        const el = child as HTMLElement;
        const centre = el.offsetLeft - track.offsetLeft + el.offsetWidth / 2;
        const d = Math.abs(centre - mid);
        if (d < best) {
          best = d;
          nearest = i;
        }
      });
      setIndex(nearest);
    }, 180);
  }, []);

  const current = shots[index] ?? shots[0];

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label="Screens from live projects"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onFocusCapture={() => setHovering(true)}
      onBlurCapture={() => setHovering(false)}
    >
      {/* Which screen you are looking at, and the controls for it. */}
      <div className="mb-6 flex items-end justify-between gap-6 md:mb-8">
        <div className="min-w-0">
          <p className="mb-3 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent/82">
            <span aria-hidden="true" className="h-px w-10 bg-accent/50" />
            Live work
          </p>
          {/* Re-keyed so the change reads as a cut rather than a swap. */}
          <p key={current.project} className="carousel-label truncate text-xl font-medium tracking-[-0.03em] text-foreground sm:text-2xl">
            {current.project}
          </p>
          <p key={current.label} className="carousel-label mt-1 truncate text-sm text-muted-foreground">
            {current.label}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            aria-label={paused ? 'Play the screen tour' : 'Pause the screen tour'}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.14] text-foreground/70 transition-colors duration-300 hover:border-accent/45 hover:text-accent"
          >
            {paused || reduceMotion ? <Play aria-hidden="true" size={14} /> : <Pause aria-hidden="true" size={14} />}
          </button>
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            aria-label="Previous screen"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.14] text-foreground/70 transition-colors duration-300 hover:border-accent/45 hover:text-accent"
          >
            <ArrowLeft aria-hidden="true" size={15} />
          </button>
          <button
            type="button"
            onClick={() => goTo(index + 1)}
            aria-label="Next screen"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.14] text-foreground/70 transition-colors duration-300 hover:border-accent/45 hover:text-accent"
          >
            <ArrowRight aria-hidden="true" size={15} />
          </button>
        </div>
      </div>

      {/* The track. pb leaves room for the frame shadows, which a scroll
          container would otherwise clip. */}
      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="carousel-track flex snap-x snap-mandatory gap-5 overflow-x-auto pb-10 md:gap-7"
      >
        {shots.map((shot, i) => (
          <div
            key={shot.src}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${shots.length}: ${shot.project}, ${shot.label}`}
            data-active={i === index ? '' : undefined}
            className="carousel-slide w-[86%] shrink-0 snap-start sm:w-[70%] lg:w-[58%]"
          >
            <div className={frameShellFor('dark')}>
              <FrameChrome url={shot.url} />
              <div className="relative aspect-[16/10] overflow-hidden bg-[hsl(222,12%,14%)]">
                {i <= primed && (
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    fill
                    sizes="(max-width: 640px) 86vw, (max-width: 1024px) 70vw, 780px"
                    quality={85}
                    className="object-cover object-top"
                  />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Position, as one tick per screen. */}
      <div className="mt-1 flex items-center gap-1.5" aria-hidden="true">
        {shots.map((shot, i) => (
          <button
            key={shot.src}
            type="button"
            tabIndex={-1}
            onClick={() => goTo(i)}
            className={`h-0.5 rounded-full transition-all duration-500 ${
              i === index ? 'w-9 bg-accent' : 'w-4 bg-white/20 hover:bg-white/40'
            }`}
          />
        ))}
        <span
          className="ml-3 font-mono text-[11px] text-muted-foreground/70"
          style={{ fontVariantNumeric: 'tabular-nums' } as CSSProperties}
        >
          {String(index + 1).padStart(2, '0')} / {String(shots.length).padStart(2, '0')}
        </span>
      </div>
    </div>
  );
}
