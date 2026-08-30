import { Fragment, type CSSProperties } from 'react';

/**
 * A display headline that resolves one word at a time.
 *
 * Deliberately CSS (.enter-word) rather than framer-motion: motion components
 * write their `initial` styles into the prerendered HTML, which would leave the
 * headline at opacity:0 in the served document until JS hydrated. That was the
 * original mobile LCP problem. The animation lives only inside the >=768px
 * media query, so on mobile this is static markup that paints with the page.
 *
 * Per word, not per line: a line-level reveal still delivers every word in that
 * line on the same beat, which reads as a block arriving. Only per-word timing
 * reads as a sentence assembling itself. The offset runs continuously across
 * lines so the whole headline resolves left to right.
 */
export interface HeadlineLineSpec {
  text: string;
  /** Applied to the line's wrapping span, e.g. the serif italic accent line. */
  className?: string;
  /** Per-word duration for this line. Slower reads as heavier. */
  duration?: string;
}

interface HeadlineRevealProps {
  lines: HeadlineLineSpec[];
  /** When the first word begins. */
  start?: number;
  /** Gap between consecutive words. */
  step?: number;
  /**
   * 'stacked' forces a break after each line, for display headlines whose line
   * breaks are composed. 'inline' lets the lines run together and wrap
   * naturally, for a single-line headline made of differently styled parts.
   */
  layout?: 'stacked' | 'inline';
}

export default function HeadlineReveal({
  lines,
  start = 0.22,
  step = 0.055,
  layout = 'stacked',
}: HeadlineRevealProps) {
  let wordIndex = 0;

  return (
    <>
      {lines.map((line, lineIndex) => {
        const words = line.text.split(' ');
        const rendered = (
          <span key={line.text} className={`${layout === 'stacked' ? 'block' : ''} ${line.className ?? ''}`}>
            {words.map((word, index) => {
              const delay = start + wordIndex * step;
              wordIndex += 1;
              return (
                <Fragment key={`${word}-${index}`}>
                  <span
                    className="enter-word inline-block"
                    style={
                      {
                        '--hero-delay': `${delay.toFixed(3)}s`,
                        '--enter-dur': line.duration ?? '0.85s',
                      } as CSSProperties
                    }
                  >
                    {word}
                  </span>
                  {/* A real space, so the line still wraps and reads normally. */}
                  {index < words.length - 1 && ' '}
                </Fragment>
              );
            })}
          </span>
        );

        return (
          <Fragment key={line.text}>
            {rendered}
            {lineIndex < lines.length - 1 && ' '}
          </Fragment>
        );
      })}
    </>
  );
}
