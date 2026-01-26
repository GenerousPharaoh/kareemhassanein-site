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
            <div className={`relative z-10 bg-background shadow-2xl ${isContactPage ? 'mb-0' : 'mb-[800px]'}`}>
                <Header />
                <main className="min-h-screen">
                    <PageTransition>
                        {children}
                    </PageTransition>
                </main>
            </div>
            {!isContactPage && <Footer />}
        </>
    );
}
