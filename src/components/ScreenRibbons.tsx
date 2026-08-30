'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState, type CSSProperties } from 'react';
import { Pause, Play } from 'lucide-react';
import { FrameChrome, frameShellFor } from '@/components/ScreenFrame';
import type { RibbonShot } from '@/lib/work';

/**
 * Two rows of live screens drifting in opposite directions.
 *
 * The section is always moving, so there is nothing to operate and nothing to
 * wait for. Each row is its own content duplicated once and translated by
 * exactly -50%, which lands on the start of the copy and loops with no seam.
 *
 * Hovering a row holds it still and lifts the frame under the pointer, which
 * is what you want the moment something catches your eye. Focus does the same,
 * so tabbing through the links does not chase a moving target.
 *
 * The pause control is not decoration. WCAG 2.2.2 asks for a mechanism to stop
 * content that moves on its own for more than five seconds, and hover alone
 * does not serve keyboard or touch. Under prefers-reduced-motion the rows
 * never animate at all.
 */
function Row({
  shots,
  reverse = false,
  duration,
  paused,
}: {
  shots: RibbonShot[];
  reverse?: boolean;
  duration: number;
  paused: boolean;
}) {
  return (
    <div className="ribbon-band">
      <div
        className="ribbon-row"
        data-paused={paused ? '' : undefined}
        style={
          {
            '--ribbon-dur': `${duration}s`,
            animationDirection: reverse ? 'reverse' : 'normal',
          } as CSSProperties
        }
      >
        {/* Rendered twice: the second pass is what the loop lands on. The copy
            is hidden from assistive tech so the links are not announced twice. */}
        {[0, 1].map((pass) =>
          shots.map((shot) => (
            <Link
              key={`${pass}-${shot.src}`}
              href={`/work/${shot.slug}`}
              className="ribbon-item group"
              aria-hidden={pass === 1 ? true : undefined}
              tabIndex={pass === 1 ? -1 : undefined}
              aria-label={`${shot.project}: ${shot.label}`}
            >
              <div className={`${frameShellFor('dark')} ribbon-frame`}>
                <FrameChrome />
                <div className="relative aspect-[2/1] overflow-hidden bg-[hsl(222,12%,14%)]">
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    fill
                    sizes="(max-width: 640px) 62vw, (max-width: 1024px) 34vw, 400px"
                    quality={80}
                    className="object-cover object-top"
                  />
                </div>
              </div>
              {/* One line, always. Two stacked wrapping lines under every
                  frame turned the rows into a wall of text on a phone. The
                  project name is the part that goes when space is short. */}
              <p className="mt-3 flex min-w-0 items-baseline gap-2 text-xs text-muted-foreground transition-opacity duration-500 md:opacity-0 md:group-hover:opacity-100 md:group-focus-visible:opacity-100">
                <span className="truncate whitespace-nowrap font-semibold text-foreground/85">{shot.label}</span>
                <span className="hidden truncate whitespace-nowrap md:inline">{shot.project}</span>
              </p>
            </Link>
          )),
        )}
      </div>
    </div>
  );
}

export default function ScreenRibbons({ rowA, rowB }: { rowA: RibbonShot[]; rowB: RibbonShot[] }) {
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduceMotion(mql.matches);
    update();
    mql.addEventListener('change', update);
    return () => mql.removeEventListener('change', update);
  }, []);

  return (
    <div>
      <div className="mb-8 flex items-end justify-between gap-6 px-6 sm:px-8 lg:px-12 xl:px-20">
        <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent/82">
          <span aria-hidden="true" className="h-px w-10 bg-accent/50" />
          Live work
        </p>
        {!reduceMotion && (
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            aria-label={paused ? 'Resume the moving screens' : 'Stop the moving screens'}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/[0.14] text-foreground/70 transition-colors duration-300 hover:border-accent/45 hover:text-accent"
          >
            {paused ? <Play aria-hidden="true" size={14} /> : <Pause aria-hidden="true" size={14} />}
          </button>
        )}
      </div>

      <div className="flex flex-col">
        <Row shots={rowA} duration={72} paused={paused} />
        <Row shots={rowB} duration={88} reverse paused={paused} />
      </div>
    </div>
  );
}
