import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Kareem Hassanein",
  description:
    "Get in touch about collaborations, advisory work, or projects involving clinical implementation, workflow, service design, or digital systems.",
  openGraph: {
    title: "Contact | Kareem Hassanein",
    description:
      "Get in touch about collaborations, advisory work, or projects involving clinical implementation, workflow, service design, or digital systems.",
    url: "https://khassanein.bio/contact",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Contact | Kareem Hassanein",
    description:
      "Get in touch about collaborations, advisory work, or projects involving clinical implementation, workflow, service design, or digital systems.",
  },
  alternates: {
    canonical: "https://khassanein.bio/contact",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
