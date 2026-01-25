'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface SplitTextRevealProps {
    text: string;
    className?: string;
    type?: 'words' | 'chars' | 'lines';
    staggerDelay?: number;
}

export default function SplitTextReveal({
    text,
    className = "",
    type = 'words',
    staggerDelay = 0.03
}: SplitTextRevealProps) {
    const ref = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start 0.9", "start 0.4"]
    });

    const elements = type === 'chars'
        ? text.split('')
        : type === 'lines'
        ? text.split('\n')
        : text.split(' ');

    return (
        <div ref={ref} className={`overflow-hidden ${className}`}>
            <div className="flex flex-wrap">
                {elements.map((element, i) => {
                    const start = i * staggerDelay;
                    const end = start + 0.3;

                    return (
                        <SplitElement
                            key={i}
                            element={element}
                            scrollYProgress={scrollYProgress}
                            start={Math.min(start, 0.7)}
                            end={Math.min(end, 1)}
                            type={type}
                        />
                    );
                })}
            </div>
        </div>
    );
}

function SplitElement({
    element,
    scrollYProgress,
    start,
    end,
    type
}: {
    element: string;
    scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress'];
    start: number;
    end: number;
    type: 'words' | 'chars' | 'lines';
}) {
    const y = useTransform(scrollYProgress, [start, end], ['100%', '0%']);
    const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
    const blur = useTransform(scrollYProgress, [start, end], ['10px', '0px']);

    return (
        <span className="overflow-hidden inline-block">
            <motion.span
                className="inline-block"
                style={{
                    y,
                    opacity,
                    filter: blur,
                }}
            >
                {element}
                {type === 'words' && '\u00A0'}
            </motion.span>
        </span>
    );
}
