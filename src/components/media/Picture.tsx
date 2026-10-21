import type { Still } from '@/lib/media';

type Props = {
  media: Still;
  /** The rendered width, as a sizes attribute, so the browser picks the right file. */
  sizes: string;
  priority?: boolean;
  className?: string;
};

/** AVIF with a WebP fallback at every generated width; intrinsic size set to prevent layout shift. */
export function Picture({ media, sizes, priority = false, className }: Props) {
  const set = (fmt: 'avif' | 'webp') => media.widths.map((w) => `${media.src}-${w}.${fmt} ${w}w`).join(', ');
  const fallback = `${media.src}-${media.widths[Math.min(1, media.widths.length - 1)]}.webp`;
  return (
    <picture className={className}>
      <source type="image/avif" srcSet={set('avif')} sizes={sizes} />
      <source type="image/webp" srcSet={set('webp')} sizes={sizes} />
      <img
        src={fallback}
        width={media.w}
        height={media.h}
        alt={media.alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : undefined}
      />
    </picture>
  );
}
