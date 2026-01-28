import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services | Kareem Hassanein",
  description: "Workflow automation, software implementation, and operations improvement for healthcare practices and professional services firms.",
  openGraph: {
    title: "Services | Kareem Hassanein",
    description: "Workflow automation, software implementation, and operations improvement for healthcare and professional services.",
    url: "https://khassanein.bio/services",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Services | Kareem Hassanein",
    description: "Workflow automation, software implementation, and operations improvement for healthcare and professional services.",
  },
  alternates: {
    canonical: "https://khassanein.bio/services",
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
