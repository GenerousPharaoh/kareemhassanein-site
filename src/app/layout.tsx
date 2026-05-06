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
  title: "Kareem Hassanein | Clinical Implementation Advisor",
  description: "Clinical implementation, digital adoption, and operational systems for healthcare practices, health-tech founders, and professional-services firms.",
  keywords: ["clinical implementation", "digital adoption", "operational systems", "health-tech advisory", "healthcare operations", "AI adoption", "change management", "service innovation"],
  authors: [{ name: "Kareem Hassanein" }],
  openGraph: {
    title: "Kareem Hassanein | Clinical Implementation Advisor",
    description: "Clinical implementation, digital adoption, and operational systems for healthcare practices, health-tech founders, and professional-services firms.",
    type: "website",
    locale: "en_CA",
    url: "https://khassanein.bio",
    siteName: "Kareem Hassanein",
    images: [
      {
        url: "https://khassanein.bio/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Kareem Hassanein, Clinical Implementation Advisor",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kareem Hassanein | Clinical Implementation Advisor",
    description: "Clinical implementation, digital adoption, and operational systems for healthcare, health-tech, and service innovation.",
    images: ["https://khassanein.bio/og-image.webp"],
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
  jobTitle: "Clinical Implementation Advisor",
  description: "Kareem Hassanein advises healthcare, health-tech, and service businesses on clinical implementation, digital adoption, operational systems, and practical rollout.",
  url: "https://khassanein.bio",
  sameAs: [
    "https://www.linkedin.com/in/kareemhassanein",
  ],
  knowsAbout: [
    "Clinical Implementation",
    "Digital Adoption",
    "Operational Systems",
    "Healthcare Operations",
    "Health-Tech Advisory",
    "Change Management",
    "AI Adoption",
    "Service Innovation"
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
