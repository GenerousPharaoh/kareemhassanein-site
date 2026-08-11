import type { Metadata, Viewport } from "next";
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
  metadataBase: new URL("https://khassanein.bio"),
  title: "Kareem Hassanein | Healthcare, Workflow & Digital Systems",
  description: "Selected work across healthcare platforms, clinic service design, workflow automation, and digital experience, by a practicing physiotherapist working in clinical implementation and AI-enabled delivery.",
  keywords: ["clinical implementation", "service design", "workflow automation", "information architecture", "healthcare operations", "digital health", "patient experience", "AI-enabled delivery"],
  authors: [{ name: "Kareem Hassanein" }],
  openGraph: {
    title: "Kareem Hassanein | Healthcare, Workflow & Digital Systems",
    description: "Selected work across healthcare platforms, clinic service design, workflow automation, and digital experience.",
    type: "website",
    locale: "en_CA",
    url: "https://khassanein.bio",
    siteName: "Kareem Hassanein",
    images: [
      {
        url: "https://khassanein.bio/og-image.png",
        width: 1200,
        height: 630,
        alt: "Kareem Hassanein, selected work across healthcare, workflow, and digital systems",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kareem Hassanein | Healthcare, Workflow & Digital Systems",
    description: "Selected work across healthcare platforms, clinic service design, workflow automation, and digital experience.",
    images: ["https://khassanein.bio/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://khassanein.bio",
  },
};

export const viewport: Viewport = {
  themeColor: "#14161a",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Kareem Hassanein",
  jobTitle: "Registered Physiotherapist",
  description: "Kareem Hassanein is a practicing physiotherapist whose work extends into clinical implementation, service design, workflow automation, product advisory, and AI-enabled digital delivery.",
  url: "https://khassanein.bio",
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
