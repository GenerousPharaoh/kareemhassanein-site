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
  desktopSizes = '(min-width: 1280px) 1130px, 90vw',
  phoneSizes = '(min-width: 1240px) 268px, 24vw',
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
