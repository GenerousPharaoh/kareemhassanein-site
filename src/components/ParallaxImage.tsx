'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';

interface ParallaxImageProps {
    src: string;
    alt: string;
    className?: string;
    priority?: boolean;
}

export default function ParallaxImage({ src, alt, className = "", priority = false }: ParallaxImageProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Softer vertical parallax
    const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1, 1.05]);

    // Smooth out the motion
    const smoothY = useSpring(y, { stiffness: 100, damping: 30, mass: 0.1 });

    return (
        <div
            ref={containerRef}
            className={`relative overflow-hidden group ${className}`}
        >
            <motion.div
                style={{ y: smoothY, scale }}
                className="absolute inset-0 w-full h-[110%]"
            >
                <Image
                    src={src}
                    alt={alt}
                    fill
                    priority={priority}
                    className="object-cover object-center opacity-80 group-hover:opacity-100 transition-opacity duration-700"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700" />
            </motion.div>
        </div>
    );
}
