'use client';

import { usePathname } from 'next/navigation';
import { MotionConfig } from 'framer-motion';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import useIsMobile from "@/hooks/useIsMobile";

export default function LayoutWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isContactPage = pathname === '/contact';
    const isMobile = useIsMobile();

    // On mobile, force every framer-motion entrance/whileInView animation
    // to resolve immediately. iOS Safari's compositor flickers when many
    // small fade/slide reveals run during scroll-driven URL-bar resize.
    return (
        <MotionConfig reducedMotion={isMobile ? 'always' : 'user'}>
            <a href="#main-content" className="skip-link">
                Skip to main content
            </a>
            <div className={`relative z-10 bg-background shadow-2xl ${isContactPage ? 'mb-0' : 'mb-[100svh] md:mb-[800px]'}`}>
                <Header />
                <main id="main-content" className="min-h-svh">
                    <PageTransition>
                        {children}
                    </PageTransition>
                </main>
            </div>
            {!isContactPage && <Footer />}
        </MotionConfig>
    );
}
