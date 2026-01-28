import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Kareem Hassanein",
  description: "Implementation consultant with a clinical background. I spent years as a physiotherapist and operations lead before moving into workflow automation and technology implementation.",
  openGraph: {
    title: "About | Kareem Hassanein",
    description: "Implementation consultant with a clinical background in physiotherapy and operations leadership.",
    url: "https://khassanein.bio/about",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "About | Kareem Hassanein",
    description: "Implementation consultant with a clinical background in physiotherapy and operations leadership.",
  },
  alternates: {
    canonical: "https://khassanein.bio/about",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
