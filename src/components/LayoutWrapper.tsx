'use client';

import { usePathname } from 'next/navigation';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";

export default function LayoutWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isContactPage = pathname === '/contact';

    return (
        <>
            <a href="#main-content" className="skip-link">
                Skip to main content
            </a>
            <div className={`relative z-10 bg-background shadow-2xl ${isContactPage ? 'mb-0' : 'mb-[500px] md:mb-[800px]'}`}>
                <Header />
                <main id="main-content" className="min-h-svh">
                    <PageTransition>
                        {children}
                    </PageTransition>
                </main>
            </div>
            {!isContactPage && <Footer />}
        </>
    );
}
