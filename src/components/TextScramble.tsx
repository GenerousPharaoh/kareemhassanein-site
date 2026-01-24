'use client';

import { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#&';

interface TextScrambleProps {
    children: string;
    className?: string; // Text styling
    scrambleClassName?: string; // Specific styling for the scrambled/animating part
    duration?: number;
    delay?: number;
}

export default function TextScramble({
    children,
    className = "",
    scrambleClassName = "",
    duration = 0.8,
    delay = 0
}: TextScrambleProps) {
    const [displayText, setDisplayText] = useState(children);
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-10%" });
    const [started, setStarted] = useState(false);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isInView && !started) {
            timer = setTimeout(() => {
                setStarted(true);
            }, delay * 1000);
        }
        return () => clearTimeout(timer);
    }, [isInView, delay, started]);

    useEffect(() => {
        if (!started) return;

        let frame = 0;
        const length = children.length;
        let animationFrameId: number;
        let timeout: NodeJS.Timeout | undefined;

        // Create a queue for each character
        const queue: { from: string; to: string; start: number; end: number; char?: string }[] = [];

        for (let i = 0; i < length; i++) {
            const from = chars[Math.floor(Math.random() * chars.length)];
            const to = children[i];
            // Distribute start times to create a "wave" effect
            const start = Math.floor(Math.random() * 10) + (i * 2);
            const end = start + Math.floor(Math.random() * 20) + 10;
            queue.push({ from, to, start, end });
        }

        const update = () => {
            let output = '';
            let complete = 0;

            for (let i = 0, n = queue.length; i < n; i++) {
                const { from, to, start, end, char } = queue[i];
                if (frame >= end) {
                    complete++;
                    output += to;
                } else if (frame >= start) {
                    if (!char || Math.random() < 0.28) {
                        queue[i].char = chars[Math.floor(Math.random() * chars.length)];
                    }
                    output += queue[i].char;
                } else {
                    output += from;
                }
            }

            setDisplayText(output);

            if (complete === queue.length) {
                // done
            } else {
                frame++;
                animationFrameId = requestAnimationFrame(update);
            }
        };

        update();

        return () => {
            cancelAnimationFrame(animationFrameId);
            if (timeout) clearTimeout(timeout);
        };
    }, [children, duration, started]);

    return (
        <span ref={ref} className={`inline-grid relative ${className}`}>
            {/* 
        This invisible span reserves the exact width/height of the final text.
        This prevents ANY layout shift ("rattling") during the animation.
      */}
            <span className="invisible pointer-events-none select-none" aria-hidden="true">
                {children}
            </span>

            {/* The animating text overlays the reserved space perfectly */}
            <span className={`absolute inset-0 top-0 left-0 ${scrambleClassName}`}>
                {displayText}
            </span>
        </span>
    );
}
