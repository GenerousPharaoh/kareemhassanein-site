'use client';

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

    // On mobile, force every framer-motion entrance/whileInView animation
    // to resolve immediately. iOS Safari's compositor flickers when many
    // small fade/slide reveals run during scroll-driven URL-bar resize.
    return (
        <MotionConfig reducedMotion={isMobile ? 'always' : 'user'}>
            <SmoothScroll />
            <a href="#main-content" className="skip-link">
                Skip to main content
            </a>
            <div className="relative z-10 bg-background">
                <Header />
                <div id="main-content" tabIndex={-1} className="min-h-svh outline-none">
                    {children}
                </div>
            </div>
            <Footer />
        </MotionConfig>
    );
}
