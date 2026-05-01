import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";
import { Urbanist, Cormorant_Garamond } from 'next/font/google';

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
const urbanist = Urbanist({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['300', '400', '500', '600', '700'],
});
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  title: "Kareem Hassanein | Implementation Consulting",
  description: "Implementation, operations, and adoption work for healthcare practices, professional-services firms, and health-tech founders. I find friction, solve it, and make it stick.",
  keywords: ["implementation consulting", "workflow automation", "operations improvement", "healthcare operations", "AI adoption", "change management", "clinical implementation", "health-tech advisory"],
  authors: [{ name: "Kareem Hassanein" }],
  openGraph: {
    title: "Kareem Hassanein | Implementation Consulting",
    description: "Implementation, operations, and adoption work for healthcare practices, professional-services firms, and health-tech founders. I find friction, solve it, and make it stick.",
    type: "website",
    locale: "en_CA",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kareem Hassanein | Implementation Consulting",
    description: "Implementation, operations, and adoption work for healthcare, professional services, and health-tech founders.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://khassanein.bio",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Kareem Hassanein",
  jobTitle: "Implementation Consultant",
  description: "Implementation, operations, and adoption work for healthcare practices, professional-services firms, and health-tech founders.",
  url: "https://khassanein.bio",
  sameAs: [
    "https://www.linkedin.com/in/kareemhassanein",
  ],
  knowsAbout: [
    "Workflow Automation",
    "Operations Improvement",
    "Technology Implementation",
    "Healthcare Operations",
    "Change Management",
    "AI Adoption",
    "Clinical Implementation",
    "Health-Tech Advisory"
  ],
  alumniOf: [
    {
      "@type": "CollegeOrUniversity",
      name: "Robert Gordon University",
      description: "MSc Physiotherapy with Distinction"
    },
    {
      "@type": "CollegeOrUniversity",
      name: "McMaster University",
      description: "BSc Kinesiology"
    }
  ],
  affiliation: {
    "@type": "Organization",
    name: "Lab2Market Validate, McMaster University Industry Liaison Office",
    description: "Volunteer mentor, June 2026 cohort"
  },
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
        className={`${urbanist.variable} ${geistMono.variable} ${cormorant.variable} antialiased font-sans`}
      >
        <div className="noise-overlay" />
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}
