import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";
import Spotlight from "@/components/Spotlight";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

import { Playfair_Display } from 'next/font/google';
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-serif' });

export const metadata: Metadata = {
  title: "Kareem Hassanein | Implementation Consulting",
  description: "Operations improvement, workflow automation, and technology implementation for healthcare practices and professional services firms. I find bottlenecks and build systems people actually use.",
  keywords: ["implementation consulting", "workflow automation", "operations improvement", "healthcare operations", "AI implementation", "change management"],
  authors: [{ name: "Kareem Hassanein" }],
  openGraph: {
    title: "Kareem Hassanein | Implementation Consulting",
    description: "Operations improvement, workflow automation, and technology implementation. I find bottlenecks and build systems people actually use.",
    type: "website",
    locale: "en_CA",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kareem Hassanein | Implementation Consulting",
    description: "Operations improvement, workflow automation, and technology implementation for healthcare and professional services.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased font-sans`}
      >
        <div className="noise-overlay" />
        <Spotlight />
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}
