'use client';

import { ReactLenis } from '@studio-freight/react-lenis';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    return (
        <ReactLenis root options={{ duration: 0.8, lerp: 0.5, smoothWheel: true, wheelMultiplier: 1.1 }}>
            {children}
        </ReactLenis>
    );
}
