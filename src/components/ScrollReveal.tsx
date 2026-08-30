import type { CSSProperties, ReactNode } from 'react';

interface ScrollRevealProps {
    children: ReactNode;
    direction?: 'up' | 'down' | 'left' | 'right' | 'none';
    distance?: number;
    /** Fraction of the entry range to offset this element by, so items sharing
     *  a row resolve in order instead of together. Roughly 0-0.4. */
    delay?: number;
    className?: string;
    style?: CSSProperties;
}

/**
 * A scroll-linked reveal driven entirely by CSS `animation-timeline: view()`.
 *
 * This used to be a framer-motion `whileInView` tween, which meant an
 * IntersectionObserver plus a main-thread animation per element, disabled
 * wholesale on mobile because those jolt during iOS Safari's URL-bar resize.
 * The scroll-driven version runs on the compositor and is threaded in Safari
 * 26.4, so it works on every breakpoint and costs no JavaScript.
 *
 * Progressive enhancement: the element is fully visible by default. The
 * animation attaches only inside `@supports (animation-timeline: view())`, so
 * an older browser renders a finished page instead of an invisible one.
 */
export default function ScrollReveal({
    children,
    direction = 'up',
    distance = 14,
    delay = 0,
    className = '',
    style = {},
}: ScrollRevealProps) {
    const axis = direction === 'left' || direction === 'right' ? 'x' : 'y';
    const sign = direction === 'down' || direction === 'right' ? -1 : 1;
    const offset = direction === 'none' ? 0 : distance * sign;

    return (
        <div
            className={`reveal ${className}`}
            style={{
                [`--reveal-${axis}`]: `${offset}px`,
                // `delay` is spatial here, not temporal: it pushes this
                // element's entry range further down the viewport.
                ...(delay ? { '--reveal-stagger': `${Math.round(delay * 100)}%` } : {}),
                ...style,
            } as CSSProperties}
        >
            {children}
        </div>
    );
}
