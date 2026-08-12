'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { frameShellFor, type FrameTone } from '@/components/ScreenFrame';
import type { ShotMeta } from '@/lib/work';

const ease = [0.16, 1, 0.3, 1] as const;

// Browser chrome whose address bar crossfades as the reel "navigates".
function ReelChrome({ url, reduceMotion = false, tone = 'dark' }: { url?: string; reduceMotion?: boolean; tone?: FrameTone }) {
  const bar = tone === 'light' ? 'border-b border-black/[0.07] bg-[#f4f0e7]' : 'border-b border-white/[0.06] bg-[hsl(222,12%,11%)]';
  const dot = tone === 'light' ? 'bg-black/[0.14]' : 'bg-white/[0.12]';
  const urlText = tone === 'light' ? 'text-[#6b6353]' : 'text-muted-foreground/80';
  return (
    <div className={`relative flex items-center gap-2 px-4 py-2.5 ${bar}`}>
      <span className="flex gap-1.5" aria-hidden="true">
        <span className={`w-2 h-2 rounded-full ${dot}`} />
        <span className={`w-2 h-2 rounded-full ${dot}`} />
        <span className={`w-2 h-2 rounded-full ${dot}`} />
      </span>
      <span className="mx-auto pr-8 h-[15px] overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={url ?? 'blank'}
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: reduceMotion ? 0 : 0.45, ease }}
            className={`block text-[10px] font-mono tracking-wide truncate ${urlText}`}
          >
            {url ?? ''}
          </motion.span>
        </AnimatePresence>
      </span>
    </div>
  );
}

// The card cycles through the project's screens while it is on screen, so the
// work is visible without anyone discovering a hover. Hovering pauses it, which
// is what you want when a particular screen catches your eye.
export function HoverReel({
  items,
  paused = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 640px',
  tone = 'dark',
}: {
  items: ShotMeta[];
  paused?: boolean;
  sizes?: string;
  tone?: FrameTone;
}) {
  const [index, setIndex] = useState(0);
  const [inView, setInView] = useState(false);
  // The remaining frames mount once the card first comes into view, rather than
  // on page load: next/image lazy loading fires on intersection regardless of
  // opacity, so mounting the whole reel up front downloads every screen to show
  // one still.
  const [primed, setPrimed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const cycling = inView && !paused && !shouldReduceMotion && items.length > 1;

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting) setPrimed(true);
      },
      { threshold: 0.45 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!cycling) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % items.length), 3000);
    return () => clearInterval(id);
  }, [cycling, items.length]);

  const mounted = primed ? items : items.slice(0, 1);
  const current = items[index] ?? items[0];
  if (!current) return null;

  return (
    <div ref={containerRef} className={frameShellFor(tone)}>
      <ReelChrome url={current.url} reduceMotion={!!shouldReduceMotion} tone={tone} />
      <div className="relative aspect-[16/10] overflow-hidden">
        {mounted.map((item, i) => {
          const isCurrent = i === index;
          return (
            <motion.div
              key={item.src}
              initial={false}
              animate={{ opacity: isCurrent ? 1 : 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.7, ease }}
              className="absolute inset-0"
              style={{ zIndex: isCurrent ? 2 : 1 }}
              aria-hidden={!isCurrent}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes={sizes}
                quality={85}
                className="object-cover object-top"
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
