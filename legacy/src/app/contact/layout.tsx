import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Kareem Hassanein",
  description:
    "Contact Kareem Hassanein about full-time roles, selected advisory work, or project inquiries.",
  openGraph: {
    title: "Contact | Kareem Hassanein",
    description:
      "Contact Kareem Hassanein about full-time roles, selected advisory work, or project inquiries.",
    url: "https://www.khassanein.bio/contact",
    type: "website",
    locale: "en_CA",
    siteName: "Kareem Hassanein",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Contact Kareem Hassanein" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact | Kareem Hassanein",
    description:
      "Contact Kareem Hassanein about full-time roles, selected advisory work, or project inquiries.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://www.khassanein.bio/contact",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
