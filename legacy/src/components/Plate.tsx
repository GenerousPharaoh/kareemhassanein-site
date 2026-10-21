'use client';

import Image from 'next/image';

// Illustrations are set into the page rather than framed on it: a soft
// elliptical mask dissolves the artwork's own edges into the surface, so there
// is no hard rectangle competing with the type around it.
const MASK =
  'radial-gradient(ellipse 74% 72% at 50% 48%, #000 30%, rgba(0,0,0,0.85) 58%, rgba(0,0,0,0.35) 82%, transparent 100%)';

interface PlateProps {
  src: string;
  alt: string;
  aspect?: string;
  sizes: string;
  className?: string;
  priority?: boolean;
}

export default function Plate({ src, alt, aspect = 'aspect-[3/2]', sizes, className = '', priority = false }: PlateProps) {
  return (
    <div
      className={`relative ${aspect} ${className}`}
      style={{
        maskImage: MASK,
        WebkitMaskImage: MASK,
        maskSize: '100% 100%',
        WebkitMaskSize: '100% 100%',
        maskRepeat: 'no-repeat',
        WebkitMaskRepeat: 'no-repeat',
      }}
    >
      <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className="object-cover" />
    </div>
  );
}
