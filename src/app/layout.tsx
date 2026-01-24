import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Aurora from "@/components/Aurora";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

import { Playfair_Display } from 'next/font/google';
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-serif' });

export const metadata: Metadata = {
  title: "Kareem Hassanein | Implementation & Workflow Optimization",
  description: "Implementation specialist driving AI adoption, workflow automation, and operational efficiency across healthcare, legal, and technology sectors.",
  keywords: ["implementation", "workflow optimization", "AI adoption", "operations", "consulting"],
  authors: [{ name: "Kareem Hassanein" }],
  openGraph: {
    title: "Kareem Hassanein | Implementation & Workflow Optimization",
    description: "Implementation specialist driving AI adoption, workflow automation, and operational efficiency.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased font-sans`}
      >
        <div className="noise-overlay" />
        <Aurora />
        <Header />
        <main className="min-h-screen page-content">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
