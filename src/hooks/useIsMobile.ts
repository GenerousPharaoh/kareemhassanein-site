'use client';

import { useEffect, useState } from 'react';

// Detects narrow viewports so scroll-driven parallax can be skipped.
// iOS Safari's URL-bar resize during scroll causes useScroll offsets to
// recompute, which jolts springs and produces visible flicker on mobile.
export default function useIsMobile(breakpoint = 768) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
        const update = () => setIsMobile(mql.matches);
        update();
        mql.addEventListener('change', update);
        return () => mql.removeEventListener('change', update);
    }, [breakpoint]);

    return isMobile;
}
