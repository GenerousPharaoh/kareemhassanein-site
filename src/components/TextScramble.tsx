'use client';

import { useEffect, useState } from 'react';

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&';

interface TextScrambleProps {
    children: string;
    className?: string;
    delay?: number; // Start delay
}

export default function TextScramble({
    children,
    className = "",
    delay = 0
}: TextScrambleProps) {
    const [displayText, setDisplayText] = useState(children);

    useEffect(() => {
        let frame = 0;
        let queue: { from: string; to: string; start: number; end: number; char?: string }[] = [];
        let animationFrameId: number;

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
                        const newChar = chars[Math.floor(Math.random() * chars.length)];
                        queue[i].char = newChar;
                    }
                    output += queue[i].char;
                } else {
                    output += from;
                }
            }

            setDisplayText(output);

            if (complete === queue.length) {
                // Animation complete
            } else {
                frame++;
                animationFrameId = requestAnimationFrame(update);
            }
        };

        // Initialize animation queue
        const startAnimation = () => {
            const length = children.length;
            queue = [];

            for (let i = 0; i < length; i++) {
                const from = chars[Math.floor(Math.random() * chars.length)];
                const to = children[i];
                const start = Math.floor(Math.random() * 40);
                const end = start + Math.floor(Math.random() * 40);
                queue.push({ from, to, start, end });
            }

            update();
        };

        const timeout = setTimeout(() => {
            startAnimation();
        }, delay * 1000);

        return () => {
            clearTimeout(timeout);
            cancelAnimationFrame(animationFrameId);
        };
    }, [children, delay]);

    return (
        <span className={className} aria-label={children}>
            {displayText}
        </span>
    );
}
