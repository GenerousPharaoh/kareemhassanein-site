import type { Still } from '@/lib/media';
import { Picture } from './Picture';
import styles from './PortraitFrame.module.css';

type Props = {
  media: Still;
  sizes: string;
  priority?: boolean;
};

/** A consistent portrait composition with headroom and a deliberate lower edge. */
export function PortraitFrame({ media, sizes, priority = false }: Props) {
  return (
    <div className={styles.frame}>
      <Picture media={media} sizes={sizes} priority={priority} className={styles.picture} />
    </div>
  );
}
