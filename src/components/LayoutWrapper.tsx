'use client';

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

    // On mobile, force every framer-motion entrance/whileInView animation
    // to resolve immediately. iOS Safari's compositor flickers when many
    // small fade/slide reveals run during scroll-driven URL-bar resize.
    return (
        <MotionConfig reducedMotion={isMobile ? 'always' : 'user'}>
            <SmoothScroll />
            <a href="#main-content" className="skip-link">
                Skip to main content
            </a>
            <div className={`relative z-10 bg-background ${revealFooter ? 'md:mb-[100svh]' : ''}`}>
                <Header />
                <div id="main-content" tabIndex={-1} className="min-h-svh outline-none">
                    {children}
                </div>
            </div>
            <Footer />
        </MotionConfig>
    );
}
