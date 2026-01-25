'use client';

import { motion, useSpring } from 'framer-motion';
import { useEffect } from 'react';

interface TextRevealProps {
    text: string;
    className?: string;
    delay?: number;
}

function Word({ word, index, delay }: { word: string; index: number; delay: number }) {
    const springConfig = { stiffness: 120, damping: 20 };
    const opacity = useSpring(0, springConfig);
    const y = useSpring(20, springConfig);

    useEffect(() => {
        const wordDelay = delay + index * 0.04;
        const timer = setTimeout(() => {
            opacity.set(1);
            y.set(0);
        }, wordDelay * 1000);
        return () => clearTimeout(timer);
    }, [delay, index, opacity, y]);

    return (
        <motion.span style={{ opacity, y }} className="inline-block">
            {word}
        </motion.span>
    );
}

export default function TextReveal({ text, className = "", delay = 0 }: TextRevealProps) {
    const words = text.split(" ");

    return (
        <div
            style={{ overflow: "hidden", display: "flex", flexWrap: "wrap", columnGap: "0.25em" }}
            className={className}
        >
            {words.map((word, index) => (
                <Word key={index} word={word} index={index} delay={delay} />
            ))}
        </div>
    );
}
