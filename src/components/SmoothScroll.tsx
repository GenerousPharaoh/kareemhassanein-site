'use client';

import { ReactLenis } from '@studio-freight/react-lenis';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    const lenisOptions = {
        duration: 1.0, // Reduced from 1.2
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Keep standard exp easing
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        smoothTouch: false,
        touchMultiplier: 1, // Reduced from 2 to prevent "flying"
        wheelMultiplier: 1, // Ensure standard wheel speed
        infinite: false,
    };

    return (
        <ReactLenis root options={lenisOptions}>
            {children}
        </ReactLenis>
    );
}
