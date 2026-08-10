'use client';

import Image from 'next/image';
import type { ShotMeta } from '@/lib/work';

interface ScreenFrameProps {
  shot: ShotMeta;
  priority?: boolean;
  sizes?: string;
  className?: string;
}

// Consistent presentation for project screenshots: a minimal browser chrome
// for desktop captures, a slim device shell for mobile captures.
export default function ScreenFrame({ shot, priority = false, sizes, className = '' }: ScreenFrameProps) {
  if (shot.frame === 'phone') {
    return (
      <div
        className={`relative rounded-[28px] overflow-hidden ring-1 ring-white/[0.1] bg-[hsl(222,12%,12%)] shadow-[0_30px_70px_-25px_rgba(0,0,0,0.7)] ${className}`}
      >
        <div className="pt-2.5 pb-1.5 flex justify-center bg-[hsl(222,12%,11%)]">
          <div className="w-14 h-1 rounded-full bg-white/[0.1]" />
        </div>
        <Image
          src={shot.src}
          alt={shot.alt}
          width={shot.width}
          height={shot.height}
          priority={priority}
          sizes={sizes ?? '(max-width: 768px) 60vw, 320px'}
          quality={85}
          className="w-full h-auto"
        />
      </div>
    );
  }

  return (
    <div
      className={`relative rounded-xl md:rounded-2xl overflow-hidden ring-1 ring-white/[0.09] bg-[hsl(222,12%,12%)] shadow-[0_30px_70px_-25px_rgba(0,0,0,0.7)] ${className}`}
    >
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/[0.06] bg-[hsl(222,12%,11%)]">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="w-2 h-2 rounded-full bg-white/[0.12]" />
          <span className="w-2 h-2 rounded-full bg-white/[0.12]" />
          <span className="w-2 h-2 rounded-full bg-white/[0.12]" />
        </span>
        {shot.url && (
          <span className="mx-auto pr-8 text-[10px] font-mono tracking-wide text-muted-foreground/60 truncate">
            {shot.url}
          </span>
        )}
      </div>
      <Image
        src={shot.src}
        alt={shot.alt}
        width={shot.width}
        height={shot.height}
        priority={priority}
        sizes={sizes ?? '(max-width: 768px) 100vw, (max-width: 1280px) 80vw, 1000px'}
        quality={85}
        className="w-full h-auto"
      />
    </div>
  );
}
