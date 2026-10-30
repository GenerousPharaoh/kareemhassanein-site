import type { ReactNode } from 'react';
import { BrowserFrame, PhoneFrame } from '@/components/media/Frames';
import { LoopVideo } from '@/components/media/LoopVideo';
import { Picture } from '@/components/media/Picture';
import { Exhibit } from '@/components/work/Exhibit';
import type { Palette } from '@/content/cases';
import type { Loop, Still } from '@/lib/media';
import { toneOf } from '@/lib/palette';
import { paletteVars } from './style';
import styles from './HeroStage.module.css';

type Props = {
  palette: Palette;
  domain: string;
  desktop: Still;
  /** The same site playing on a phone, over the corner of the desktop page. */
  phone: Loop;
  caption: ReactNode;
};

/**
 * A client's site across the page on its own ground: the desktop page in a browser, the phone
 * playing over its corner. It comes up off the homepage wall's tilt as the page opens.
 */
export function HeroStage({ palette, domain, desktop, phone, caption }: Props) {
  return (
    <figure className={styles.figure}>
      <div className={styles.stage} style={paletteVars(palette)} data-tone={toneOf(palette)}>
        <Exhibit arrive className={styles.exhibit}>
          <div className={styles.plate} data-exhibit>
            <BrowserFrame domain={domain} className={styles.desktop}>
              <Picture media={desktop} sizes="(min-width: 1280px) 940px, (min-width: 760px) 74vw, calc(100vw - 96px)" priority />
            </BrowserFrame>
            <PhoneFrame className={styles.phone}>
              <LoopVideo loop={phone} />
            </PhoneFrame>
          </div>
        </Exhibit>
      </div>
      <figcaption className={styles.caption}>{caption}</figcaption>
    </figure>
  );
}
