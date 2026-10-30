import { PhoneFrame } from '@/components/media/Frames';
import { Picture } from '@/components/media/Picture';
import type { CaseStudy } from '@/content/cases';
import { paletteVars } from '@/lib/palette';
import { NoteCoverMotion } from './NoteCoverMotion';
import styles from './NoteCover.module.css';

type Props = {
  slug: string;
  cases: CaseStudy[];
  /** The phones' rendered width, as a sizes attribute. */
  sizes: string;
  priority?: boolean;
  className?: string;
};

/**
 * A note's cover: the practices it comes from, each on its own ground with its site on a phone rising
 * from the bottom edge. It keeps one name on the notes list and on the note, so opening a note
 * carries the cover into place.
 */
export function NoteCover({ slug, cases, sizes, priority = false, className }: Props) {
  return (
    <NoteCoverMotion slug={slug} className={className}>
      {cases.map((c) => (
        <div key={c.slug} className={styles.half} style={paletteVars(c.palette)}>
          <div className={styles.phone} data-phone>
            <PhoneFrame>
              <Picture media={{ ...c.plate.phone, alt: '' }} sizes={sizes} priority={priority} />
            </PhoneFrame>
          </div>
        </div>
      ))}
    </NoteCoverMotion>
  );
}
