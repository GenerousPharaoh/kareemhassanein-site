import type { ReactNode } from 'react';
import { PhoneFrame } from '@/components/media/Frames';
import { LoopVideo } from '@/components/media/LoopVideo';
import type { Palette } from '@/content/cases';
import type { Loop } from '@/lib/media';
import { paletteVars } from './style';
import styles from './HeroPhone.module.css';

type Props = {
  palette: Palette;
  loop: Loop;
  /** The site's address, shown small at the top of the panel. */
  domain: string;
  caption: ReactNode;
};

/** A client's site playing on a phone, set on that client's own ground. */
export function HeroPhone({ palette, loop, domain, caption }: Props) {
  return (
    <figure className={styles.figure}>
      <div className={styles.panel} style={paletteVars(palette)}>
        <p className={styles.domain} aria-hidden="true">
          {domain}
        </p>
        <PhoneFrame className={styles.phone}>
          <LoopVideo loop={loop} />
        </PhoneFrame>
      </div>
      <figcaption className={styles.caption}>{caption}</figcaption>
    </figure>
  );
}
