'use client';

import Image from 'next/image';
import { Download, HeartPulse, Binary, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';

const roadmap = [
  {
    period: '2024 - Present',
    title: 'Digital Strategy & Operations',
    company: 'Endorphins Health',
    focus: 'Multidisciplinary System Architecture',
    points: [
      'Built patient acquisition pipelines across 6 specialties',
      'Architected Jane App booking & referral logic systems',
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

      {/* Identity Hero: Visual Narrative of Logic */}
      <section className="py-40 lg:py-64 px-6 lg:px-0 relative overflow-hidden">
        <div className="section-container grid lg:grid-cols-[1.2fr_0.8fr] gap-32 items-end">
          <div>
            <ScrollReveal direction="none" className="mb-10">
              <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-accent-secondary/60">Identity Dossier</span>
            </ScrollReveal>
            <h1 className="text-7xl md:text-[140px] font-medium tracking-tighter mb-20 leading-[0.75]">
              Roots <br /> {"&"} <span className="opacity-40 italic font-light">Rationale.</span>
            </h1>
          </div>
          <ScrollReveal direction="right" distance={80} className="relative aspect-square rounded-[3rem] overflow-hidden glass-pearl p-2 floating mb-12">
            <Image
              src="/assets/logic.png"
              alt="Operational Logic"
              fill
              className="object-cover opacity-60 hover:opacity-100 transition-all duration-[4s]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent z-10" />
          </ScrollReveal>
        </div>
      </section>

      {/* Narrative Section: Practitioner x Architect */}
      <section className="py-64 lg:py-80 border-t border-white/5 bg-white/[0.01]">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-40 items-start">
            <ScrollReveal direction="up" className="space-y-16">
              <div className="flex items-center gap-8">
                <div className="w-12 h-12 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-center">
                  <HeartPulse className="text-accent-secondary w-6 h-6" />
                </div>
                <h2 className="text-5xl font-medium tracking-tight">The Practitioner.</h2>
              </div>
              <p className="text-3xl font-light text-muted-foreground leading-relaxed max-w-xl">
                MSc Physiotherapy with Distinction. My perspective is rooted in the thousand-hour diagnostic cycle of care, outcomes, and patient adherence across 6 specialties.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2} className="space-y-16 lg:pt-48 border-l border-white/5 pl-20 ml-auto">
              <div className="flex items-center gap-8">
                <div className="w-12 h-12 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-center">
                  <Binary className="text-accent-secondary w-6 h-6" />
                </div>
                <h2 className="text-5xl font-medium tracking-tight">The Architect.</h2>
              </div>
              <p className="text-3xl font-light text-muted-foreground leading-relaxed max-w-xl">
                Architecting bridge systems in agentic AI and operational DevOps. Ensuring technology drives adoption and ROI without compromising clinical reality.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Atmospheric Roadmap: High Contrast & Compact */}
      <section className="py-64 lg:py-80 relative overflow-hidden border-y border-white/5">
        <div className="section-container">
          <ScrollReveal direction="up" className="mb-40">
            <p className="text-[10px] font-bold tracking-[0.4em] uppercase opacity-30 mb-8">Professional Timeline</p>
            <h2 className="text-7xl md:text-[120px] font-medium tracking-tighter leading-none mb-12">The Roadmap.</h2>
          </ScrollReveal>

          <div className="space-y-4px overflow-hidden rounded-[4rem] border border-white/10 bg-white/[0.02]">
            {roadmap.map((item, i) => (
              <ScrollReveal
                key={item.title}
                direction="none"
                delay={i * 0.1}
                className="grid lg:grid-cols-[1.5fr_2fr] gap-12 group p-16 bg-[#0d0f12] border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-all duration-1000"
              >
                <div className="space-y-6">
                  <span className="text-[11px] font-bold tracking-widest text-accent-secondary uppercase italic opacity-40 group-hover:opacity-100 transition-opacity duration-1000">{item.period}</span>
                  <h3 className="text-4xl font-medium tracking-tight">{item.title}</h3>
                  <p className="text-2xl font-light text-muted-foreground italic">{item.company}</p>
                </div>

                <div className="space-y-12">
                  <p className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-20 italic">{item.focus}</p>
                  <ul className="grid md:grid-cols-2 gap-12">
                    {item.points.map((point) => (
                      <motion.li
                        key={point}
                        className="flex gap-6 text-xl text-muted-foreground font-light leading-snug items-start"
                      >
                        <ChevronRight size={20} className="text-accent-secondary opacity-20 mt-1 flex-shrink-0" />
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

      {/* Closing: Narrative Dossier Access */}
      <section className="py-80 lg:py-[30vh] text-center px-6">
        <ScrollReveal direction="up" className="z-10 relative space-y-24">
          <h2 className="text-7xl md:text-[140px] font-medium tracking-tighter mb-24 leading-[0.7] text-balance">
            Build <br /> <span className="opacity-40 italic font-light">The Narrative.</span>
          </h2>
          <a
            href="/Kareem Hassanein - Resume January 2026.pdf"
            className="group inline-flex items-center gap-12 text-3xl font-bold tracking-tight text-foreground link-underline pb-4 px-12"
          >
            Access Identity Dossier
            <Download size={48} className="opacity-10 group-hover:opacity-100 group-hover:translate-y-4 group-hover:text-accent-secondary transition-all duration-1000" />
          </a>
        </ScrollReveal>
      </section>
    </main>
  );
}
