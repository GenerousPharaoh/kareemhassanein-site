import { BrowserFrame, PhoneFrame } from '@/components/media/Frames';
import { Picture } from '@/components/media/Picture';
import type { Still } from '@/lib/media';
import styles from './CasePlate.module.css';

type Props = {
  desktop: Still;
  phone: Still;
  domain: string;
  /** Honest sizes for where this plate sits, so a small card never downloads a full-width image. */
  desktopSizes: string;
  phoneSizes: string;
  className?: string;
};

/** The desktop page in a browser window, with the same page on a phone over its lower edge. */
export function CasePlate({ desktop, phone, domain, desktopSizes, phoneSizes, className }: Props) {
  return (
    <div className={`${styles.plate} ${className ?? ''}`}>
      <BrowserFrame domain={domain} className={styles.desktop}>
        <Picture media={desktop} sizes={desktopSizes} />
      </BrowserFrame>
      <PhoneFrame className={styles.phone}>
        <Picture media={phone} sizes={phoneSizes} />
      </PhoneFrame>
    </div>
  );
}
