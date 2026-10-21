import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Kareem Hassanein",
  description:
    "Kareem Hassanein brings a background in physiotherapy, one-to-one coaching, team leadership, and clinic operations to implementation work.",
  openGraph: {
    title: "About | Kareem Hassanein",
    description:
      "Kareem Hassanein brings a background in physiotherapy, one-to-one coaching, team leadership, and clinic operations to implementation work.",
    url: "https://www.khassanein.bio/about",
    type: "website",
    locale: "en_CA",
    siteName: "Kareem Hassanein",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "About Kareem Hassanein" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About | Kareem Hassanein",
    description:
      "Kareem Hassanein brings a background in physiotherapy, one-to-one coaching, team leadership, and clinic operations to implementation work.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://www.khassanein.bio/about",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
