import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Kareem Hassanein",
  description:
    "A practicing physiotherapist whose work extends into clinical implementation, workflow automation, patient-facing digital platforms, service design, and product advisory.",
  openGraph: {
    title: "About | Kareem Hassanein",
    description:
      "A practicing physiotherapist whose work extends into clinical implementation, workflow automation, digital platforms, service design, and product advisory.",
    url: "https://khassanein.bio/about",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "About | Kareem Hassanein",
    description:
      "A practicing physiotherapist whose work extends into clinical implementation, workflow automation, digital platforms, service design, and product advisory.",
  },
  alternates: {
    canonical: "https://khassanein.bio/about",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
