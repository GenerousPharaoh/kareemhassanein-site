'use client';

import Image from 'next/image';
import { Download, Fingerprint } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

const roadmap = [
  {
    period: '2024 - Present',
    title: 'Digital Strategy & Operations',
    company: 'Endorphins Health',
    focus: 'Multidisciplinary Infrastructure',
    points: [
      'Built acquisition streams supporting 6 clinical specialties',
      'Architected Jane App booking flows and technical local SEO',
      'Optimized multi-provider referral and workflow architectures'
    ]
  },
  {
    period: '2025 - Present',
    title: 'Operations Consultant',
    company: 'Tax Relief Counsel',
    focus: 'Agentic Automation',
    points: [
      'Built agentic workflows in Claude Code for document drafting',
      'Reduced baseline template generation time by 85%',
      'Streamlined high-volume client correspondence modules'
    ]
  },
  {
    period: '2021 - 2024',
    title: 'Registered Physiotherapist',
    company: 'Movement Solutions',
    focus: 'Implementation Core',
    points: [
      'Spearheaded clinic-wide transition to Heidi AI documentation',
      'Evaluation, configuration, and enablement for peer adoption',
      'Generated $600K in treatment revenue while leading ops'
    ]
  }
];

export default function About() {
  return (
    <div className="pt-24 overflow-hidden relative">
      {/* Identity Hero */}
      <section className="py-48 px-6 lg:px-16 relative">
        <div className="max-w-7xl mx-auto z-10 relative grid lg:grid-cols-[1.5fr_1fr] gap-24 items-end">
          <div>
            <ScrollReveal direction="none" className="mb-12">
              <span className="text-[10px] font-bold tracking-[0.5em] uppercase opacity-40">Identity Disclosure</span>
            </ScrollReveal>
            <h1 className="text-7xl md:text-[140px] font-medium tracking-tighter mb-20 leading-[0.75]">
              Roots <br /> & <span className="opacity-40 italic">Rationale.</span>
            </h1>
          </div>
          <ScrollReveal direction="right" distance={40} className="relative aspect-square rounded-full overflow-hidden glass-organic p-1 mb-20">
            <Image
              src="/assets/enablement.png"
              alt="Enablement Illustration"
              fill
              className="object-cover opacity-80"
            />
          </ScrollReveal>
        </div>
      </section>

      {/* Layered Bio Section */}
      <section className="py-72 px-6 lg:px-16 container mx-auto border-t border-white/[0.03] bg-card/5">
        <div className="max-w-6xl mx-auto space-y-48">
          <div className="grid lg:grid-cols-2 gap-32 items-start">
            <ScrollReveal direction="up" className="space-y-12">
              <div className="flex items-center gap-6">
                <Fingerprint className="text-accent w-8 h-8 opacity-40" />
                <h2 className="text-5xl font-medium tracking-tight">The Practitioner.</h2>
              </div>
              <p className="text-3xl font-light text-muted-foreground leading-relaxed">
                MSc Physiotherapy with Distinction from Robert Gordon, Scotland. My perspective is rooted in the thousand-hour diagnostic cycle of assessments, outcomes, and patient adherence across 6 specialties.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2} className="space-y-12 lg:pt-32">
              <div className="flex items-center gap-6">
                <Fingerprint className="text-accent w-8 h-8 opacity-40" />
                <h2 className="text-5xl font-medium tracking-tight">The Architect.</h2>
              </div>
              <p className="text-3xl font-light text-muted-foreground leading-relaxed text-balance">
                Architecting bridge systems in agentic AI and operational DevOps. My work is about ensuring technical interventions drive adoption and ROI without compromising clinical reality.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Robust Vertical Roadmap */}
      <section className="py-72 px-6 lg:px-16 border-y border-white/[0.03]">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal direction="up" className="mb-40">
            <p className="text-[10px] font-bold tracking-[0.4em] uppercase opacity-40 mb-10">Professional Path</p>
            <h2 className="text-6xl md:text-9xl font-medium tracking-tighter leading-none">Perspective.</h2>
          </ScrollReveal>

          <div className="space-y-40">
            {roadmap.map((item, i) => (
              <ScrollReveal
                key={item.title}
                direction="up"
                delay={i * 0.1}
                className="grid lg:grid-cols-[1fr_2.5fr] gap-12 group border-l border-white/5 pl-16 pb-12"
              >
                <div className="space-y-3">
                  <span className="text-[10px] font-bold tracking-widest text-accent italic uppercase">{item.period}</span>
                  <h3 className="text-4xl font-medium tracking-tight group-hover:translate-x-4 transition-transform duration-700">{item.title}</h3>
                  <p className="text-2xl text-muted-foreground font-light">{item.company}</p>
                </div>

                <div className="space-y-12">
                  <p className="text-sm font-bold uppercase tracking-widest opacity-20 italic">{item.focus}</p>
                  <ul className="grid md:grid-cols-2 gap-x-16 gap-y-10">
                    {item.points.map(point => (
                      <li key={point} className="flex gap-6 text-xl text-muted-foreground font-light leading-snug">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0 opacity-40" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Closing Identity Statement */}
      <section className="py-80 px-6 text-center">
        <ScrollReveal direction="up">
          <h2 className="text-6xl md:text-[140px] font-medium tracking-tighter mb-24 leading-[0.7] text-balance">
            Build <br /> <span className="opacity-40 italic font-light">the Bridge.</span>
          </h2>
          <a
            href="/Kareem Hassanein - Resume January 2026.pdf"
            className="group flex items-center justify-center gap-6 text-2xl font-bold tracking-tight text-foreground link-underline pb-1 mx-auto w-fit"
          >
            Review Technical Identity (Resume)
            <Download size={24} className="opacity-40 group-hover:translate-y-2 transition-transform" />
          </a>
        </ScrollReveal>
      </section>
    </div>
  );
}
