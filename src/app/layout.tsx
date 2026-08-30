import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";
import { Cormorant_Garamond } from 'next/font/google';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: ['400'],
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.khassanein.bio"),
  title: "Kareem Hassanein | Implementation & Service Operations",
  description: "Case studies by Kareem Hassanein covering a clinical documentation rollout, two clinic websites, and a legal drafting workflow.",
  keywords: ["implementation consulting", "service operations", "operations improvement", "workflow improvement", "technology adoption", "service design", "healthcare operations", "digital delivery"],
  authors: [{ name: "Kareem Hassanein" }],
  openGraph: {
    title: "Kareem Hassanein | Implementation & Service Operations",
    description: "Case studies by Kareem Hassanein covering a clinical documentation rollout, two clinic websites, and a legal drafting workflow.",
    type: "website",
    locale: "en_CA",
    url: "https://www.khassanein.bio",
    siteName: "Kareem Hassanein",
    images: [
      {
        url: "https://www.khassanein.bio/og-image.png",
        width: 1200,
        height: 630,
        alt: "Kareem Hassanein, selected work across healthcare, workflow, and digital delivery",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kareem Hassanein | Implementation & Service Operations",
    description: "Case studies by Kareem Hassanein covering a clinical documentation rollout, two clinic websites, and a legal drafting workflow.",
    images: ["https://www.khassanein.bio/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.khassanein.bio",
  },
};

export const viewport: Viewport = {
  themeColor: "#14161a",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Kareem Hassanein",
  jobTitle: ["Registered Physiotherapist", "Implementation and Service Operations Consultant"],
  description: "Kareem Hassanein works on clinical software adoption, clinic operations, patient-facing websites, and professional-service workflows.",
  url: "https://www.khassanein.bio",
  sameAs: [
    "https://www.linkedin.com/in/kareemhassanein",
  ],
  knowsAbout: [
    "Technology Adoption",
    "Service Operations",
    "Service Design",
    "Workflow Improvement",
    "Information Architecture",
    "Healthcare Operations",
    "Digital Health",
    "Patient Experience",
    "AI-Enabled Delivery"
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
      description: "BSc Kinesiology (Honours)"
    }
  ],
  affiliation: {
    "@type": "Organization",
    name: "Lab2Market Validate, McMaster University",
    description: "Volunteer mentor"
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Hamilton",
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
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable} antialiased font-sans`}
      >
        <div className="noise-overlay" />
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}
