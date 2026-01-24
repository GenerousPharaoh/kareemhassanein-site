'use client';

import { Mail, Github, Linkedin, ArrowUpRight } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

const socialLinks = [
  { label: 'Platform Correspondence', href: 'mailto:kareemhassanein@gmail.com', icon: <Mail className="w-5 h-5" /> },
  { label: 'Technical Repository', href: 'https://github.com/GenerousPharaoh', icon: <Github className="w-5 h-5" /> },
  { label: 'Professional Graph', href: 'https://linkedin.com/in/kareemh', icon: <Linkedin className="w-5 h-5" /> },
];

export default function Contact() {
  return (
    <main className="pt-24 min-h-screen relative overflow-hidden flex items-center">
      <div className="section-container relative z-10 w-full py-32">
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-32 items-center">
          <div>
            <ScrollReveal direction="none" blur={30} duration={1.8} className="mb-10">
              <span className="text-[10px] font-bold tracking-[0.6em] opacity-30 uppercase">Initiate Protocol</span>
            </ScrollReveal>

            <ScrollReveal direction="up" distance={60} blur={20} delay={0.2}>
              <h1 className="text-7xl md:text-[140px] font-medium tracking-tighter mb-20 leading-[0.75]">
                Open <br /> {"&"} <span className="opacity-30 italic font-light font-serif">Direct.</span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.4} blur={15} distance={30} className="max-w-xl">
              <p className="text-2xl text-muted-foreground font-light leading-relaxed mb-24 italic border-l border-white/5 pl-12">
                Inquire for strategic engineering, agentic architecture, or clinical implementation advisory.
              </p>
            </ScrollReveal>
          </div>

          <div className="space-y-6">
            {socialLinks.map((link, i) => (
              <ScrollReveal
                key={link.label}
                direction="none"
                delay={0.6 + i * 0.15}
                blur={20}
                className="group w-full"
              >
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-12 transition-all glass-nanobanana hover:bg-white/[0.03] group-hover:-translate-y-1"
                >
                  <div className="flex items-center gap-10">
                    <div className="w-12 h-12 rounded-2xl bg-white/[0.01] border border-white/5 flex items-center justify-center group-hover:border-white/20 transition-all duration-700">
                      {link.icon}
                    </div>
                    <span className="text-xl font-medium tracking-tight opacity-40 group-hover:opacity-100 transition-all duration-700">{link.label}</span>
                  </div>
                  <ArrowUpRight className="opacity-10 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-700" />
                </a>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
