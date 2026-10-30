import type { CaseStudy } from '@/content/cases';
import { BrowserFrame, PhoneFrame } from '@/components/media/Frames';
import { LoopVideo } from '@/components/media/LoopVideo';
import { Picture } from '@/components/media/Picture';
import { Plate } from '@/components/media/Plate';
import { isWindow, LIVE_PHONE_SIZES } from './layout';
import { toneOf } from './palette';
import styles from './CaseSurface.module.css';

type Props = { c: CaseStudy; preview?: boolean };

// Preview: 60% of the two-column band from 960px, capped at 840px; full width below it.
const PREVIEW_DESKTOP = '(min-width: 1600px) 765px, (min-width: 960px) calc(50.8vw - 35px), (min-width: 900px) calc(91vw - 58px), calc(91vw - 36px)';
const PREVIEW_PHONE = '(min-width: 1600px) 184px, (min-width: 960px) max(99px, calc(12.2vw - 8px)), (min-width: 492px) calc(21.9vw - 9px), 99px';

/** The same composition in a case header and its incoming preview. A linked preview is still. */
export function CaseSurface({ c, preview = false }: Props) {
  const live = isWindow(c.hero);
  return <div className={styles.surface} data-tone={toneOf(c.palette)}>
    {live ? <div className={styles.live}>
      <BrowserFrame domain={c.domain}>
        {preview ? (
          // The loop's own first frame keeps the handoff tied to the actual incoming screen.
          // eslint-disable-next-line @next/next/no-img-element
          <img className={styles.poster} src={c.hero.poster} alt="" width={c.hero.w} height={c.hero.h} loading="lazy" decoding="async" />
        ) : <LoopVideo loop={c.hero} className={styles.liveLoop} />}
      </BrowserFrame>
      <PhoneFrame className={styles.livePhone}>
        <Picture media={c.plate.phone} sizes={preview ? PREVIEW_PHONE : LIVE_PHONE_SIZES} priority={!preview} />
      </PhoneFrame>
    </div> : <Plate desktop={c.plate.desktop} phone={c.plate.phone} domain={c.domain} priority={!preview}
      desktopSizes={preview ? PREVIEW_DESKTOP : undefined} phoneSizes={preview ? PREVIEW_PHONE : undefined} />}
  </div>;
}
