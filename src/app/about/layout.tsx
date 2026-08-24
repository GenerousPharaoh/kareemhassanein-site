import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Kareem Hassanein",
  description:
    "Kareem Hassanein works across implementation, service operations, workflow improvement, technology adoption, and digital delivery.",
  openGraph: {
    title: "About | Kareem Hassanein",
    description:
      "Kareem Hassanein works across implementation, service operations, workflow improvement, technology adoption, and digital delivery.",
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
      "Kareem Hassanein works across implementation, service operations, workflow improvement, technology adoption, and digital delivery.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://www.khassanein.bio/about",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
