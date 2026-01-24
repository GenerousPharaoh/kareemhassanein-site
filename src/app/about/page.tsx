'use client';

import Image from 'next/image';
import { Download, HeartPulse, Binary } from 'lucide-react';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';

const roadmap = [
  {
    period: '2024 - Present',
    title: 'Digital Strategy & Operations',
    company: 'Endorphins Health',
    focus: 'Multidisciplinary System Architecture',
    points: [
      'Built patient acquisition infrastructure across 6 specialties',
      'Architected multi-provider Jane App booking & referral logic',
      'Configured local SEO technical architecture for clinic growth'
    ]
  },
  {
    period: '2025 - Present',
    title: 'Operations Consultant',
    company: 'Tax Relief Counsel',
    focus: 'Agentic Workflow DevOps',
    points: [
      'Engineered automated drafting modules via Claude Code',
      'Reduced document generation time by 85%',
      'Optimized correspondence flows for high-volume legal ops'
    ]
  },
  {
    period: '2021 - 2024',
    title: 'Registered Physiotherapist',
    company: 'Movement Solutions',
    focus: 'Core Clinical Implementation',
    points: [
      'Spearheaded clinic-wide transition to Heidi AI and SOPs',
      'Achieved 100% clinician adoption in high-stakes settings',
      'Generated $600K in revenue while leading operations'
    ]
  }
];

export default function About() {
  return (
    <main className="pt-24 overflow-hidden relative">
      <div className="glow-blob top-[20%] right-0 opacity-10" />

      {/* Narrative Hero */}
      <section className="py-48 px-6 lg:px-24 relative">
        <div className="max-w-[1400px] mx-auto z-10 relative grid lg:grid-cols-[1.5fr_1fr] gap-32 items-end">
          <div>
            <ScrollReveal direction="none" className="mb-12">
              <span className="text-[11px] font-bold tracking-[0.5em] uppercase text-accent-secondary bg-accent-secondary/10 px-6 py-2 rounded-full">Identity Disclosure</span>
            </ScrollReveal>
            <h1 className="text-7xl md:text-[140px] font-medium tracking-tighter mb-20 leading-[0.75]">
              Roots <br /> {"&"} <span className="text-secondary-foreground italic font-light">Rationale.</span>
            </h1>
          </div>
          <ScrollReveal direction="right" distance={100} className="relative aspect-square rounded-full overflow-hidden glass-vivid p-2 floating mb-12">
            <Image
              src="/assets/clinical.png"
              alt="Clinical Depth"
              fill
              className="object-cover opacity-80"
            />
          </ScrollReveal>
        </div>
      </section>

      {/* Practitioner vs Architect */}
      <section className="py-80 px-6 lg:px-24 border-t border-white/10 bg-[#080a0c]/50">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-40 items-start">
          <ScrollReveal direction="up" className="space-y-16">
            <div className="flex items-center gap-8">
              <div className="w-16 h-16 rounded-3xl bg-accent/10 flex items-center justify-center border border-accent/20">
                <HeartPulse className="text-accent w-8 h-8" />
              </div>
              <h2 className="text-5xl font-medium tracking-tight">The Practitioner.</h2>
            </div>
            <p className="text-3xl font-light text-muted-foreground leading-relaxed max-w-xl">
              MSc Physiotherapy with Distinction. My perspective is rooted in the thousand-hour diagnostic cycle across 6 specialties.
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2} className="space-y-16 lg:pt-48">
            <div className="flex items-center gap-8">
              <div className="w-16 h-16 rounded-3xl bg-accent-secondary/10 flex items-center justify-center border border-accent-secondary/20">
                <Binary className="text-accent-secondary w-8 h-8" />
              </div>
              <h2 className="text-5xl font-medium tracking-tight">The Architect.</h2>
            </div>
            <p className="text-3xl font-light text-muted-foreground leading-relaxed max-w-xl">
              Architecting bridge systems in agentic AI and operational DevOps. Ensuring technology drives adoption and ROI.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Full Animated Roadmap */}
      <section className="py-80 px-6 lg:px-24 relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto">
          <ScrollReveal direction="up" className="mb-48 border-l-4 border-accent pl-12">
            <p className="text-[11px] font-bold tracking-[0.4em] uppercase text-accent mb-8">Professional Path</p>
            <h2 className="text-7xl md:text-[120px] font-medium tracking-tighter">The Roadmap.</h2>
          </ScrollReveal>

          <div className="space-y-48">
            {roadmap.map((item, i) => (
              <ScrollReveal
                key={item.title}
                direction="up"
                delay={i * 0.1}
                className="grid lg:grid-cols-[1fr_2fr] gap-24 relative group"
              >
                <div className="space-y-6">
                  <span className="text-[12px] font-bold tracking-[0.3em] text-accent uppercase italic">{item.period}</span>
                  <h3 className="text-4xl md:text-5xl font-medium tracking-tight group-hover:text-accent transition-all duration-700">{item.title}</h3>
                  <div className="h-[1px] w-20 bg-white/10 group-hover:w-full transition-all duration-1000" />
                  <p className="text-2xl font-light text-muted-foreground">{item.company}</p>
                </div>

                <div className="space-y-16 lg:pt-8 pr-12">
                  <p className="text-sm font-bold uppercase tracking-[0.4em] opacity-40 italic">{item.focus}</p>
                  <ul className="grid md:grid-cols-2 gap-16">
                    {item.points.map((point, j) => (
                      <motion.li
                        key={point}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: j * 0.1, duration: 0.8 }}
                        className="flex gap-8 text-2xl text-muted-foreground font-light leading-snug items-start border-l border-white/5 pl-8"
                      >
                        <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0 shadow-[0_0_15px_rgba(74,222,128,0.5)]" />
                        {point}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-96 px-6 lg:px-24 text-center border-t border-white/10 relative">
        <ScrollReveal direction="up" className="z-10 relative">
          <h2 className="text-6xl md:text-[140px] font-medium tracking-tighter mb-24 leading-[0.7]">
            Build <br /> <span className="text-accent-secondary italic font-light">The Result.</span>
          </h2>
          <a
            href="/Kareem Hassanein - Resume January 2026.pdf"
            className="group inline-flex items-center gap-10 text-3xl font-bold tracking-tight text-foreground link-underline pb-4 px-12"
          >
            Access Identity Dossier
            <Download size={48} className="opacity-20 group-hover:text-accent-secondary transition-all" />
          </a>
        </ScrollReveal>
      </section>
    </main>
  );
}
