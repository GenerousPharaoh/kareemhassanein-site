'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { frameShell } from '@/components/ScreenFrame';
import type { ShotMeta } from '@/lib/work';

const ease = [0.16, 1, 0.3, 1] as const;

// Browser chrome whose address bar crossfades as the reel "navigates".
function ReelChrome({ url, reduceMotion = false }: { url?: string; reduceMotion?: boolean }) {
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
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: reduceMotion ? 0 : 0.45, ease }}
            className="block text-[10px] font-mono tracking-wide text-muted-foreground/80 truncate"
          >
            {url ?? ''}
          </motion.span>
        </AnimatePresence>
      </span>
    </div>
  );
}

// Card visual that comes alive under the pointer: the project's screens
// cycle with a long crossfade while hovered, and settle back to the lead
// still on leave. Images are lazy next/image renders, so nothing loads
// until the card itself is near the viewport.
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
  // Only the lead screen mounts until the card is actually interacted with.
  // next/image lazy loading fires on intersection regardless of opacity, so
  // mounting every frame up front downloaded the whole reel to display one
  // still. That was pure waste on touch devices, where `active` never
  // becomes true and the reel never cycles.
  const [primed, setPrimed] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const cycling = active && !shouldReduceMotion && items.length > 1;

  useEffect(() => {
    if (active) setPrimed(true);
  }, [active]);

  useEffect(() => {
    if (!cycling) {
      setIndex(0);
      return;
    }
    const id = setInterval(() => setIndex((i) => (i + 1) % items.length), 1700);
    return () => clearInterval(id);
  }, [cycling, items.length]);

  // The first hover mounts the rest, which have the 1.7s until the first
  // advance to decode.
  const mounted = primed ? items : items.slice(0, 1);
  const current = items[index] ?? items[0];
  if (!current) return null;

  return (
    <div className={frameShell}>
      <ReelChrome url={current.url} reduceMotion={!!shouldReduceMotion} />
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
