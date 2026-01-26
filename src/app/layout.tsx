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
  keywords: ["implementation consulting", "workflow automation", "operations improvement", "healthcare operations", "AI implementation", "change management", "digital transformation"],
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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Kareem Hassanein",
  jobTitle: "Implementation Consultant",
  description: "Operations improvement, workflow automation, and technology implementation for healthcare practices and professional services firms.",
  url: "https://kareemhassanein.com",
  sameAs: [
    "https://linkedin.com/in/kareemhassanein",
  ],
  knowsAbout: [
    "Workflow Automation",
    "Operations Improvement",
    "Technology Implementation",
    "Healthcare Operations",
    "Change Management",
    "AI Implementation",
    "Digital Transformation"
  ],
  alumniOf: [
    {
      "@type": "CollegeOrUniversity",
      name: "Robert Gordon University",
      description: "MSc Physiotherapy"
    },
    {
      "@type": "CollegeOrUniversity",
      name: "McMaster University",
      description: "BSc Kinesiology"
    }
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Burlington",
    addressRegion: "Ontario",
    addressCountry: "Canada"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
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
