'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import { FrameChrome, frameShell } from '@/components/ScreenFrame';
import type { Walkthrough } from '@/lib/work';

// Silent looping walkthrough clip inside the standard browser frame.
// Loads nothing until it approaches the viewport; plays only while visible;
// falls back to the poster for prefers-reduced-motion users.
export default function WalkthroughFrame({ walkthrough, className = '' }: { walkthrough: Walkthrough; className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [shouldReduceMotion]);

  return (
    <div className={`${frameShell} ${className}`}>
      <FrameChrome url={walkthrough.url} />
      {shouldReduceMotion ? (
        <Image
          src={walkthrough.poster}
          alt=""
          width={1280}
          height={800}
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 80vw, 1000px"
          quality={85}
          className="w-full h-auto"
        />
      ) : (
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="none"
          poster={walkthrough.poster}
          width={1280}
          height={800}
          className="w-full h-auto"
          aria-label="Silent walkthrough recording of the live site"
        >
          <source src={walkthrough.webm} type="video/webm" />
          <source src={walkthrough.mp4} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
