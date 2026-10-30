import type { CSSProperties, ReactNode } from 'react';
import type { CaseStudy } from '@/content/cases';
import { BrowserFrame, PhoneFrame, ScreenFrame } from '@/components/media/Frames';
import { LoopVideo } from '@/components/media/LoopVideo';
import { Picture } from '@/components/media/Picture';
import type { Loop, Still } from '@/lib/media';
import { isStrip, isWindow, phoneRowSizes, ratio, rowSizes, shotRows, type Shot } from './layout';
import { toneOf } from './palette';
import styles from './CaseMedia.module.css';
import { GalleryViewer } from './GalleryViewer';

const shape = (r: number) => ({ ['--r' as string]: r }) as CSSProperties;
const fullSrc = (media: Still) => `${media.src}-${media.widths[media.widths.length - 1]}.webp`;

function ZoomCapture({ media, children }: { media: Still; children: ReactNode }) {
  return <a href={fullSrc(media)} target="_blank" rel="noopener" className={styles.zoom} data-zoom={media.src} aria-label={`Enlarge image: ${media.alt}`}>
    {children}<span className={styles.zoomMark} aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M8 4H4v4m12-4h4v4M4 16v4h4m12-4v4h-4" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg></span>
  </a>;
}

/* Captions repeat the media's own alt text or label, so assistive technology hears it once */

/** The case's best moment, large, near the top of the story. */
export function HeroLoop({ c }: { c: CaseStudy }) {
  const loop = c.hero;
  return (
    <div className={`container ${styles.heroWrap}`}>
      <figure className={styles.hero} style={shape(ratio(loop))} data-reveal>
        {isWindow(loop) ? (
          <BrowserFrame domain={c.domain} className={styles.frame}>
            <LoopVideo loop={loop} />
          </BrowserFrame>
        ) : (
          <ScreenFrame className={styles.frame}>
            <LoopVideo loop={loop} />
          </ScreenFrame>
        )}
        <figcaption className={styles.caption} aria-hidden="true">
          {loop.label}
        </figcaption>
      </figure>
    </div>
  );
}

function ShotFigure({ shot, share, solo }: { shot: Shot; share: number; solo: boolean }) {
  const caption = shot.kind === 'loop' ? shot.media.label : shot.media.alt;
  // A capture alone in its row is held to 820px tall, so a narrow one never fills the row
  const cap = solo ? Math.round(820 * ratio(shot.media)) : undefined;
  return (
    <figure className={styles.shot} style={shape(ratio(shot.media))}>
      <ScreenFrame className={styles.frame}>
        {shot.kind === 'loop' ? <LoopVideo loop={shot.media} /> : <ZoomCapture media={shot.media}><Picture media={shot.media} sizes={rowSizes(share, cap)} /></ZoomCapture>}
      </ScreenFrame>
      <figcaption className={styles.caption} aria-hidden="true">
        {caption}
      </figcaption>
    </figure>
  );
}

function PhoneFigure({ media, sizes }: { media: Loop | Still; sizes: string }) {
  const isLoop = 'poster' in media;
  return (
    <li className={styles.phoneItem}>
      <figure className={styles.phoneFigure}>
        <PhoneFrame className={styles.phoneFrame}>
          {isLoop ? <LoopVideo loop={media} /> : <ZoomCapture media={media}><Picture media={media} sizes={sizes} /></ZoomCapture>}
        </PhoneFrame>
        <figcaption className={styles.caption} aria-hidden="true">
          {isLoop ? media.label : media.alt}
        </figcaption>
      </figure>
    </li>
  );
}

/**
 * The work on screen, in the case's palette: desktop captures in rows that share a height,
 * then the phone captures in a row of phones (a swipeable strip on small screens).
 */
export function Gallery({ c }: { c: CaseStudy }) {
  // A still of the same strip the hero loop already plays (Endorphins' discipline index) would repeat it.
  const repeatsHero = (s: Still) => isStrip(s) && isStrip(c.hero) && Math.abs(ratio(s) - ratio(c.hero)) < 0.1;
  const shots: Shot[] = [
    ...c.loops.filter((l) => l.device === 'desktop').map((media) => ({ kind: 'loop' as const, media })),
    ...c.stills.filter((s) => s.device === 'desktop' && !repeatsHero(s)).map((media) => ({ kind: 'still' as const, media })),
  ];
  const phones: Array<Loop | Still> = [...c.loops.filter((l) => l.device === 'phone'), ...c.stills.filter((s) => s.device === 'phone')];
  const rows = shotRows(shots);
  if (!rows.length && !phones.length) return null;

  return (
    <GalleryViewer items={shots.filter((shot) => shot.kind === 'still').map((shot) => shot.media as Still).concat(phones.filter((media): media is Still => !('poster' in media))).map((media) => ({ key: media.src, src: fullSrc(media), alt: media.alt, width: media.w, height: media.h }))}>
    <section className={styles.band} data-tone={toneOf(c.palette)} data-theme={toneOf(c.palette)} aria-labelledby="case-screens">
      <div className="container">
        <h2 id="case-screens" className={styles.title}>
          What it looks like
        </h2>
        {rows.length ? (
          <div className={styles.rows}>
            {rows.map((row) => {
              const total = row.reduce((sum, s) => sum + ratio(s.media), 0);
              return (
                <div key={row.map((s) => s.media.src).join()} className={styles.row} data-solo={row.length === 1 || undefined} data-reveal>
                  {row.map((s) => (
                    <ShotFigure key={s.media.src} shot={s} share={ratio(s.media) / total} solo={row.length === 1} />
                  ))}
                </div>
              );
            })}
          </div>
        ) : null}
        {phones.length ? (
          <div className={styles.phones}>
            <h3 className={styles.subtitle}>On a phone</h3>
            <ul className={styles.phoneRow} aria-label="Phone screens">
              {phones.map((m) => (
                <PhoneFigure key={m.src} media={m} sizes={phoneRowSizes(phones.length)} />
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </section>
    </GalleryViewer>
  );
}
