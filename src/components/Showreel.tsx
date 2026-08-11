'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { frameShell } from '@/components/ScreenFrame';
import type { GalleryItem, ShotMeta } from '@/lib/work';

const ease = [0.16, 1, 0.3, 1] as const;

// Browser chrome whose address bar crossfades as the reel "navigates".
function ReelChrome({ url }: { url?: string }) {
  return (
    <div className="relative flex items-center gap-2 px-4 py-2.5 border-b border-white/[0.06] bg-[hsl(222,12%,11%)]">
      <span className="flex gap-1.5" aria-hidden="true">
        <span className="w-2 h-2 rounded-full bg-white/[0.12]" />
        <span className="w-2 h-2 rounded-full bg-white/[0.12]" />
        <span className="w-2 h-2 rounded-full bg-white/[0.12]" />
      </span>
      <span className="mx-auto pr-8 h-[15px] overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={url ?? 'blank'}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.45, ease }}
            className="block text-[10px] font-mono tracking-wide text-muted-foreground/60 truncate"
          >
            {url ?? ''}
          </motion.span>
        </AnimatePresence>
      </span>
    </div>
  );
}

// Stacked full-resolution stills with a slow drift on the active slide and a
// long crossfade between them. All rendering is native next/image, so the
// motion costs nothing in sharpness.
function SlideStack({
  items,
  index,
  drift,
  driftDuration,
  sizes,
  priority = false,
}: {
  items: ShotMeta[];
  index: number;
  drift: boolean;
  driftDuration: number;
  sizes: string;
  priority?: boolean;
}) {
  return (
    <div className="relative aspect-[16/10] overflow-hidden">
      {items.map((item, i) => {
        const active = i === index;
        return (
          <motion.div
            key={item.src}
            initial={false}
            animate={{ opacity: active ? 1 : 0 }}
            transition={{ duration: 1.0, ease }}
            className="absolute inset-0"
            style={{ zIndex: active ? 2 : 1 }}
            aria-hidden={!active}
          >
            <motion.div
              className="absolute inset-0"
              initial={false}
              animate={
                drift && active
                  ? { scale: [1, 1.045], y: [0, -8] }
                  : { scale: 1, y: 0 }
              }
              transition={
                drift && active
                  ? { duration: driftDuration, ease: 'linear' }
                  : { duration: 0.8, ease }
              }
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes={sizes}
                quality={85}
                priority={priority && i === 0}
                className="object-cover object-top"
              />
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}

// Case-study lead: an annotated tour of the desktop screens. Auto-advances
// while in view, pauses on hover, the caption tracks the active screen, and
// reduced-motion users get a static, dot-navigable version.
export function Showreel({ items, interval = 5600 }: { items: GalleryItem[]; interval?: number }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const animate = !shouldReduceMotion;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.25 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!animate || paused || !inView) return;
    const id = setTimeout(() => setIndex((i) => (i + 1) % items.length), interval);
    return () => clearTimeout(id);
  }, [index, animate, paused, inView, interval, items.length]);

  const current = items[index];

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className={frameShell}>
        <ReelChrome url={current.url} />
        <SlideStack
          items={items}
          index={index}
          drift={animate}
          driftDuration={(interval + 1200) / 1000}
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 80vw, 1000px"
          priority
        />
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-1.5 mt-6" role="tablist" aria-label="Screens in this tour">
        {items.map((item, i) => {
          const active = i === index;
          return (
            <button
              key={item.src}
              type="button"
              role="tab"
              aria-selected={active}
              aria-label={item.title}
              onClick={() => setIndex(i)}
              className="group relative flex h-6 items-center justify-center outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              style={{ width: active ? 30 : 18 }}
            >
              <span
                className={`block h-[3px] rounded-full transition-all duration-500 ${
                  active ? 'bg-accent w-6' : 'bg-white/20 group-hover:bg-white/40 w-2.5'
                }`}
              />
            </button>
          );
        })}
      </div>

      {/* Synced caption */}
      <div className="relative mt-4 min-h-[92px] md:min-h-[76px] max-w-2xl mx-auto text-center">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.5, ease }}
          >
            <span className="block text-base md:text-lg font-medium tracking-tight text-foreground/90 mb-1.5">
              {current.title}
            </span>
            <span className="block text-sm md:text-[15px] text-muted-foreground/85 leading-relaxed">
              {current.caption}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

// Card visual: still by default, cycles through the project's screens while
// the pointer rests on the card.
export function HoverReel({
  items,
  active,
  sizes = '(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 640px',
}: {
  items: ShotMeta[];
  active: boolean;
  sizes?: string;
}) {
  const [index, setIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const cycling = active && !shouldReduceMotion && items.length > 1;

  useEffect(() => {
    if (!cycling) {
      setIndex(0);
      return;
    }
    const id = setInterval(() => setIndex((i) => (i + 1) % items.length), 1700);
    return () => clearInterval(id);
  }, [cycling, items.length]);

  const current = items[index];

  return (
    <div className={frameShell}>
      <ReelChrome url={current.url} />
      <SlideStack items={items} index={index} drift={false} driftDuration={0} sizes={sizes} />
    </div>
  );
}
