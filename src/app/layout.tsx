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
  title: "Kareem Hassanein | Implementation & Operations",
  description: "Implementation and operations work across clinical technology, workflow automation, service design, and digital delivery.",
  keywords: ["implementation consulting", "operations improvement", "clinical implementation", "workflow automation", "change adoption", "service design", "healthcare operations", "digital delivery"],
  authors: [{ name: "Kareem Hassanein" }],
  openGraph: {
    title: "Kareem Hassanein | Implementation & Operations",
    description: "Implementation and operations work across clinical technology, workflow automation, service design, and digital delivery.",
    type: "website",
    locale: "en_CA",
    url: "https://www.khassanein.bio",
    siteName: "Kareem Hassanein",
    images: [
      {
        url: "https://www.khassanein.bio/og-image.png",
        width: 1200,
        height: 630,
        alt: "Kareem Hassanein, selected work across healthcare, workflow, and digital systems",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kareem Hassanein | Implementation & Operations",
    description: "Implementation and operations work across clinical technology, workflow automation, service design, and digital delivery.",
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
  jobTitle: ["Registered Physiotherapist", "Implementation and Operations Consultant"],
  description: "Kareem Hassanein is an implementation and operations consultant with a clinical background. His work spans clinical technology, workflow automation, service design, change adoption, and digital delivery.",
  url: "https://www.khassanein.bio",
  sameAs: [
    "https://www.linkedin.com/in/kareemhassanein",
  ],
  knowsAbout: [
    "Clinical Implementation",
    "Service Design",
    "Workflow Automation",
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
