import type { Still } from '@/lib/media';
import { BrowserFrame, PhoneFrame } from './Frames';
import { Picture } from './Picture';
import styles from './Plate.module.css';

type Props = {
  desktop: Still;
  phone: Still;
  domain: string;
  priority?: boolean;
  className?: string;
};

/** The desktop page in a browser window with the same page on a phone overlapping its lower edge. */
export function Plate({ desktop, phone, domain, priority = false, className }: Props) {
  return (
    <div className={`${styles.plate} ${className ?? ''}`}>
      <BrowserFrame domain={domain} className={styles.desktop}>
        <Picture media={desktop} sizes="(min-width: 1240px) 1000px, 88vw" priority={priority} />
      </BrowserFrame>
      <PhoneFrame className={styles.phone}>
        <Picture media={phone} sizes="(min-width: 1240px) 250px, 24vw" priority={priority} />
      </PhoneFrame>
    </div>
  );
}
