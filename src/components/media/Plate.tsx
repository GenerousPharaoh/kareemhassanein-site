import type { Still } from '@/lib/media';
import { BrowserFrame, PhoneFrame } from './Frames';
import { Picture } from './Picture';
import styles from './Plate.module.css';

type Props = {
  desktop: Still;
  phone: Still;
  domain: string;
  priority?: boolean;
  /** Honest sizes for where the plate sits; the defaults suit a plate as wide as the container. */
  desktopSizes?: string;
  phoneSizes?: string;
  className?: string;
};

/** The desktop page in a browser window with the same page on a phone overlapping its lower edge. */
export function Plate({
  desktop,
  phone,
  domain,
  priority = false,
  // From the plate's padding (clamp(36px, 9%, 120px) on the right), the phone's width
  // (clamp(104px, 23%, 268px)) and its bezel, for a plate as wide as the container.
  desktopSizes = '(min-width: 1280px) 1128px, (min-width: 440px) calc(91vw - 36px), calc(100vw - 76px)',
  phoneSizes = '(min-width: 1205px) 255px, (min-width: 492px) calc(21.9vw - 9px), 99px',
  className,
}: Props) {
  return (
    <div className={`${styles.plate} ${className ?? ''}`}>
      <BrowserFrame domain={domain} className={styles.desktop}>
        <Picture media={desktop} sizes={desktopSizes} priority={priority} />
      </BrowserFrame>
      <PhoneFrame className={styles.phone}>
        <Picture media={phone} sizes={phoneSizes} priority={priority} />
      </PhoneFrame>
    </div>
  );
}
