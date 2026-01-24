'use client';

import { Mail, Linkedin, Globe, ArrowUpRight } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import CharReveal from '@/components/CharReveal';

const contactLinks = [
  { label: 'Email', href: 'mailto:kareem.hassanein@gmail.com', icon: <Mail className="w-5 h-5" /> },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/kareemhassanein', icon: <Linkedin className="w-5 h-5" /> },
  { label: 'Kinetikare Physio', href: 'https://www.kinetikarephysio.com', icon: <Globe className="w-5 h-5" /> },
  { label: 'Endorphins Health', href: 'https://www.endorphinshealth.com', icon: <Globe className="w-5 h-5" /> },
];

export default function Contact() {
  return (
    <main className="min-h-screen bg-background text-foreground pt-20">

      {/* Hero */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 px-6 lg:px-12">
        <div className="max-w-[1200px] mx-auto">
          <ScrollReveal direction="up">
            <span className="block text-xs font-medium tracking-[0.3em] uppercase text-muted-foreground mb-6">Contact</span>
            <h1 className="text-4xl md:text-6xl font-medium tracking-tight mb-8">
              Get in <CharReveal delay={0.4} className="text-accent italic font-serif">touch.</CharReveal>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed max-w-2xl">
              Whether you have a project in mind or just want to connect, I&apos;d be happy to hear from you.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Contact Links */}
      <section className="py-16 md:py-24 px-6 lg:px-12">
        <div className="max-w-[900px] mx-auto">
          <div className="space-y-4">
            {contactLinks.map((link, i) => (
              <ScrollReveal key={link.label} direction="up" delay={i * 0.1}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-6 md:p-8 rounded-2xl border border-white/5 hover:border-white/10 hover:bg-white/[0.02] transition-all duration-500"
                >
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-muted-foreground group-hover:text-accent group-hover:bg-accent/10 transition-all duration-500">
                      {link.icon}
                    </div>
                    <span className="text-lg md:text-xl font-medium text-foreground/60 group-hover:text-foreground transition-all duration-500">
                      {link.label}
                    </span>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-muted-foreground/40 group-hover:text-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-500" />
                </a>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 mt-auto">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="text-sm font-medium tracking-tight text-foreground/40">
            Kareem Hassanein
          </span>
          <div className="flex gap-6 text-xs text-muted-foreground/60">
            <span>Burlington, ON</span>
            <span>Available remotely</span>
            <span>© 2026</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
