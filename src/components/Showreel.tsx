'use client';

import Image from 'next/image';
import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { frameShell } from '@/components/ScreenFrame';
import type { GalleryItem, ShotMeta } from '@/lib/work';

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

// Only the selected still is mounted outside the brief exit transition.
// This keeps the reel sharp without loading every full-resolution screen.
function SelectedSlide({
  item,
  sizes,
  priority = false,
  reduceMotion = false,
}: {
  item: ShotMeta;
  sizes: string;
  priority?: boolean;
  reduceMotion?: boolean;
}) {
  return (
    <div className="relative aspect-[16/10] overflow-hidden">
      <AnimatePresence initial={false} mode="sync">
        <motion.div
          key={item.src}
          initial={reduceMotion ? false : { opacity: 0, scale: 0.992, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 1.006, y: -5 }}
          transition={{ duration: reduceMotion ? 0 : 0.55, ease }}
          className="absolute inset-0"
        >
          <Image
            src={item.src}
            alt={item.alt}
            fill
            sizes={sizes}
            quality={85}
            priority={priority}
            className="object-cover object-top"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// Case-study lead: a manually controlled, annotated tour of the desktop screens.
export function Showreel({ items }: { items: GalleryItem[] }) {
  const [index, setIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const reduceMotion = Boolean(shouldReduceMotion);

  const current = items[index];
  if (!current) return null;

  return (
    <div role="region" aria-label="Project screen gallery">
      <div className={frameShell}>
        <ReelChrome url={current.url} reduceMotion={reduceMotion} />
        <SelectedSlide
          item={current}
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 80vw, 1000px"
          priority={index === 0}
          reduceMotion={reduceMotion}
        />
      </div>

      <div className="mt-5 flex flex-wrap justify-center gap-2" role="group" aria-label="Choose a project screen">
        {items.map((item, i) => {
          const active = i === index;
          return (
            <button
              key={item.src}
              type="button"
              aria-pressed={active}
              aria-label={`${item.title}${active ? ', current screen' : ''}`}
              onClick={() => setIndex(i)}
              className={`group relative flex h-11 min-w-11 items-center justify-center border px-3 font-mono text-xs outline-none transition-colors duration-500 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                active
                  ? 'border-accent/60 bg-accent/[0.08] text-accent'
                  : 'border-white/[0.12] text-foreground/60 hover:border-white/[0.3] hover:text-foreground'
              }`}
            >
              <span aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
            </button>
          );
        })}
      </div>

      <div
        className="relative mt-2 min-h-[92px] md:min-h-[76px] max-w-2xl mx-auto text-center"
        aria-live="polite"
        aria-atomic="true"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={index}
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
            transition={{ duration: reduceMotion ? 0 : 0.5, ease }}
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

// Card visual: a single still keeps browsing calm and avoids background loads.
export function HoverReel({
  items,
  sizes = '(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 640px',
}: {
  items: ShotMeta[];
  active: boolean;
  sizes?: string;
}) {
  const current = items[0];
  if (!current) return null;

  return (
    <div className={frameShell}>
      <ReelChrome url={current.url} />
      <SelectedSlide item={current} sizes={sizes} />
    </div>
  );
}
