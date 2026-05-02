'use client';

import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';

interface Slide {
    src: string;
    alt: string;
}

interface HeroCarouselProps {
    slides: Slide[];
    interval?: number;
    className?: string;
    priority?: boolean;
}

const SWIPE_THRESHOLD = 60;

export default function HeroCarousel({
    slides,
    interval = 5500,
    className = '',
    priority = false,
}: HeroCarouselProps) {
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState<1 | -1>(1);
    const [isPaused, setIsPaused] = useState(false);
    const shouldReduceMotion = useReducedMotion();
    const containerRef = useRef<HTMLDivElement>(null);
    const touchStartX = useRef<number | null>(null);

    const goTo = useCallback(
        (next: number) => {
            const total = slides.length;
            const wrapped = ((next % total) + total) % total;
            setDirection(wrapped > index || (index === total - 1 && wrapped === 0) ? 1 : -1);
            setIndex(wrapped);
        },
        [index, slides.length]
    );

    const next = useCallback(() => goTo(index + 1), [goTo, index]);
    const prev = useCallback(() => goTo(index - 1), [goTo, index]);

    useEffect(() => {
        if (isPaused || shouldReduceMotion || slides.length < 2) return;
        const id = window.setInterval(() => {
            setDirection(1);
            setIndex((i) => (i + 1) % slides.length);
        }, interval);
        return () => window.clearInterval(id);
    }, [isPaused, shouldReduceMotion, slides.length, interval]);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        const onVisibility = () => setIsPaused(document.hidden);
        document.addEventListener('visibilitychange', onVisibility);
        return () => document.removeEventListener('visibilitychange', onVisibility);
    }, []);

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
    };
    const handleTouchEnd = (e: React.TouchEvent) => {
        if (touchStartX.current === null) return;
        const delta = e.changedTouches[0].clientX - touchStartX.current;
        if (Math.abs(delta) > SWIPE_THRESHOLD) {
            if (delta < 0) next();
            else prev();
        }
        touchStartX.current = null;
    };

    const variants = {
        enter: (dir: number) => ({
            opacity: 0,
            scale: 1.04,
            x: shouldReduceMotion ? 0 : dir * 24,
        }),
        center: {
            opacity: 1,
            scale: 1,
            x: 0,
        },
        exit: (dir: number) => ({
            opacity: 0,
            scale: 0.99,
            x: shouldReduceMotion ? 0 : dir * -24,
        }),
    };

    return (
        <div
            ref={containerRef}
            className={`relative ${className}`}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            aria-roledescription="carousel"
        >
            <div className="relative w-full h-full overflow-hidden rounded-[28px] md:rounded-[32px] bg-[hsl(222,12%,12%)] ring-1 ring-white/[0.06] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)]">
                <AnimatePresence initial={false} custom={direction} mode="sync">
                    <motion.div
                        key={index}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            opacity: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
                            x: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
                            scale: { duration: 1.4, ease: [0.16, 1, 0.3, 1] },
                        }}
                        className="absolute inset-0"
                        aria-roledescription="slide"
                        aria-label={`${index + 1} of ${slides.length}`}
                    >
                        <Image
                            src={slides[index].src}
                            alt={slides[index].alt}
                            fill
                            priority={priority && index === 0}
                            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 45vw, 600px"
                            quality={90}
                            className="object-cover object-center"
                        />
                        {/* Subtle inner shading for text legibility on dot indicators */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Dot indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
                {slides.map((_, i) => {
                    const isActive = i === index;
                    return (
                        <button
                            key={i}
                            type="button"
                            onClick={() => goTo(i)}
                            aria-label={`Go to slide ${i + 1}`}
                            aria-current={isActive}
                            className="group relative h-2 rounded-full transition-all duration-500 outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                            style={{ width: isActive ? 28 : 8 }}
                        >
                            <span
                                className={`absolute inset-0 rounded-full transition-colors duration-500 ${
                                    isActive ? 'bg-accent' : 'bg-white/40 group-hover:bg-white/70'
                                }`}
                            />
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
