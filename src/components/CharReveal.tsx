'use client';

import { motion, useSpring, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface CharRevealProps {
    children: string;
    className?: string;
    stagger?: number;
    delay?: number;
}

function Char({ char, index, delay, stagger, isInView }: {
    char: string;
    index: number;
    delay: number;
    stagger: number;
    isInView: boolean;
}) {
    const springConfig = { stiffness: 150, damping: 15 };
    const opacity = useSpring(0, springConfig);
    const y = useSpring(15, springConfig);

    useEffect(() => {
        if (isInView) {
            const charDelay = delay + index * stagger;
            const timer = setTimeout(() => {
                opacity.set(1);
                y.set(0);
            }, charDelay * 1000);
            return () => clearTimeout(timer);
        }
    }, [isInView, delay, index, stagger, opacity, y]);

    return (
        <motion.span
            style={{
                opacity,
                y,
                display: 'inline-block',
                whiteSpace: char === ' ' ? 'pre' : 'normal'
            }}
        >
            {char}
        </motion.span>
    );
}

export default function CharReveal({
    children,
    className = "",
    stagger = 0.02,
    delay = 0
}: CharRevealProps) {
    const chars = children.split('');
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10%" });

    return (
        <span ref={ref} className={`inline-block ${className}`}>
            {chars.map((char, index) => (
                <Char
                    key={index}
                    char={char}
                    index={index}
                    delay={delay}
                    stagger={stagger}
                    isInView={isInView}
                />
            ))}
        </span>
    );
}
