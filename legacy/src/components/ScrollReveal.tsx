'use client';

import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react';

/**
 * Scroll choreography.
 *
 * The hero resolves out of blur on a gentle cubic. Everything below used to
 * arrive with one undifferentiated 12px/0.4s fade, so the page opened as a
 * composition and then handed off to a flat scroll. These roles carry the
 * hero's language down the page and give each kind of content its own weight:
 * a section heading should not move like a screenshot, and neither should
 * move like a list row.
 *
 * Deliberately CSS + IntersectionObserver rather than framer-motion's
 * whileInView. Two reasons, both learned the hard way here:
 *
 *  1. useIsMobile initialises to false and only flips in an effect, so a
 *     framer reveal for anything already in view commits on the desktop branch
 *     and then re-renders onto the mobile one. Combined with the
 *     `MotionConfig reducedMotion="always"` guard in LayoutWrapper (which drops
 *     positional keys rather than animating them) that left elements pinned at
 *     their hidden transform with opacity already at 1: visibly blurred and
 *     offset, permanently.
 *  2. Expressing the split as a real CSS media query cannot race. It is correct
 *     on the very first paint, which is exactly why the hero entrance is CSS.
 *
 * Mobile therefore animates opacity only. blur() and scale() are expensive
 * during iOS Safari's URL-bar resize; opacity is compositor-safe.
 */
export type RevealVariant = 'heading' | 'text' | 'figure' | 'item';

interface ScrollRevealProps {
    children: ReactNode;
    variant?: RevealVariant;
    delay?: number;
    className?: string;
    style?: CSSProperties;
}

export default function ScrollReveal({
    children,
    variant = 'text',
    delay = 0,
    className = '',
    style = {},
}: ScrollRevealProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const node = ref.current;
        if (!node) return;

        // Already resolved (fast scroll past, or a re-mount): nothing to do.
        if (node.hasAttribute('data-revealed')) return;

        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        entry.target.setAttribute('data-revealed', '');
                        observer.unobserve(entry.target);
                    }
                }
            },
            // Fires a little before the element's top edge clears the fold, so
            // the motion is finishing as it arrives rather than starting there.
            { rootMargin: '0px 0px -10% 0px', threshold: 0 },
        );

        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            data-reveal={variant}
            style={delay ? ({ ...style, '--reveal-delay': `${delay}s` } as CSSProperties) : style}
            className={className}
        >
            {children}
        </div>
    );
}
