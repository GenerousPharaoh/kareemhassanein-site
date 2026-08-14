'use client';

import { useEffect, useLayoutEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { MotionConfig } from 'framer-motion';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import useIsMobile from "@/hooks/useIsMobile";

export default function LayoutWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    const isMobile = useIsMobile();
    const pathname = usePathname();
    // The footer is revealed from behind the page on md+, so the page reserves
    // exactly one viewport of space for it. Contact keeps a static footer: it
    // already ends in a form, and a second invitation under it reads as noise.
    const revealFooter = pathname !== '/contact';

    // The page reserves exactly the footer's own height, so the reveal ends
    // flush with no empty panel. The md:mb-[100svh] class below is the
    // pre-measurement fallback and is overridden as soon as the height is known.
    // useLayoutEffect, not useEffect: the reserved space starts at a 100svh
    // fallback and is corrected to the footer's real height. Doing that after
    // paint changes the document height on every load, which shifts the
    // scrollbar and reads as a flicker. This measures before the browser paints.
    const [footerHeight, setFooterHeight] = useState(0);
    const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;
    useIsomorphicLayoutEffect(() => {
        if (!revealFooter) {
            setFooterHeight(0);
            return;
        }
        const footer = document.querySelector('footer');
        if (!footer) return;
        const measure = () => setFooterHeight(footer.getBoundingClientRect().height);
        measure();
        const observer = new ResizeObserver(measure);
        observer.observe(footer);
        return () => observer.disconnect();
    }, [revealFooter, pathname]);

    // On mobile, force every framer-motion entrance/whileInView animation
    // to resolve immediately. iOS Safari's compositor flickers when many
    // small fade/slide reveals run during scroll-driven URL-bar resize.
    return (
        <MotionConfig reducedMotion={isMobile ? 'always' : 'user'}>
            <SmoothScroll />
            <a href="#main-content" className="skip-link">
                Skip to main content
            </a>
            <div
                className={`relative z-10 bg-background ${revealFooter ? 'md:mb-[100svh]' : ''}`}
                style={revealFooter && !isMobile && footerHeight ? { marginBottom: footerHeight } : undefined}
            >
                <Header />
                <div id="main-content" tabIndex={-1} className="min-h-svh outline-none">
                    {children}
                </div>
            </div>
            <Footer />
        </MotionConfig>
    );
}
