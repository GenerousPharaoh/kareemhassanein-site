import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Kareem Hassanein",
  description: "Get in touch about workflow automation, software implementation, or operations improvement for your practice or firm.",
  openGraph: {
    title: "Contact | Kareem Hassanein",
    description: "Get in touch about workflow automation, software implementation, or operations improvement.",
    url: "https://khassanein.bio/contact",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Contact | Kareem Hassanein",
    description: "Get in touch about workflow automation, software implementation, or operations improvement.",
  },
  alternates: {
    canonical: "https://khassanein.bio/contact",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
