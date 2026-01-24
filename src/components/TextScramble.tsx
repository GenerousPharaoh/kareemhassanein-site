'use client';

import { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&';

interface TextScrambleProps {
    children: string;
    className?: string;
    delay?: number; // Start delay
    duration?: number;
}

export default function TextScramble({
    children,
    className = "",
    delay = 0,
    duration = 1.2
}: TextScrambleProps) {
    const [displayText, setDisplayText] = useState(children);
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-10%" });
    const [started, setStarted] = useState(false);

    useEffect(() => {
        if (isInView && !started) {
            const timer = setTimeout(() => {
                setStarted(true);
            }, delay * 1000);
            return () => clearTimeout(timer);
        }
    }, [isInView, delay, started]);

    useEffect(() => {
        if (!started) return;

        let frame = 0;
        const length = children.length;
        let animationFrameId: number;

        // We'll reveal one character every X frames based on duration
        // or just run for a set number of frames and map progress
        const totalFrames = duration * 60;

        const update = () => {
            frame++;
            const progress = frame / totalFrames;
            let output = '';

            for (let i = 0; i < length; i++) {
                // Calculate "completion" for this specific character index
                // We want a staggered reveal from left to right
                const indexProgress = (i / length);
                const revealThreshold = progress * 1.5; // Multiplier to speed up the wave

                if (revealThreshold > indexProgress + 0.2) {
                    // Fully revealed
                    output += children[i];
                } else {
                    // Scrambling
                    // Add <span class="opacity-50"> for style in the return, but here we just need the char
                    // Since we can't easily return JSX from this string builder without complexity, 
                    // we'll handle the styling by just returning the raw string here and maybe upgrading to character isolation later if needed.
                    // For now, let's stick to the string content update to keep performance high.
                    // To make it "refined", we only scramble if it's "close" to revealing.

                    if (progress < 0.1) {
                        // Initial static or empty state? No, keep original logic of immediate scramble
                        output += chars[Math.floor(Math.random() * chars.length)];
                    } else {
                        // Randomize while waiting
                        output += chars[Math.floor(Math.random() * chars.length)];
                    }
                }
            }

            // If we want to style the scrambled characters differently (e.g. gray color),
            // we need to render an array of spans instead of a single string.
            // Let's stick to string for now but optimize the characters.

            setDisplayText(output);

            if (progress < 1) {
                animationFrameId = requestAnimationFrame(update);
            } else {
                setDisplayText(children); // Ensure final state is clean
            }
        };

        animationFrameId = requestAnimationFrame(update);

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, [children, duration, started]);

    // Enhanced Version: Render as array of spans to allow "dimming" the scrambled parts
    // We need to parse the displayText vs children to know which are correct?
    // Easier approach: The hook above updates a string. 
    // Let's refactor to purely character-component based for maximum refinement.

    return (
        <span ref={ref} className={className} aria-label={children}>
            {displayText.split('').map((char, index) => {
                const isCorrect = char === children[index];
                // If the animation hasn't started, or it's finished, the display matches.
                // During animation, if the char matches the target at that index (and we are in the "locked" phase), it's correct.
                // Simple heuristic: if char matches target, it represents the final letter (mostly).

                // Actually, with random scramble, we might accidentally match. 
                // But for visual effect, let's just style them.
                return (
                    <span
                        key={index}
                        className={isCorrect && started ? "opacity-100 text-foreground" : "opacity-30 text-accent"}
                    >
                        {char}
                    </span>
                );
            })}
        </span>
    );
}
