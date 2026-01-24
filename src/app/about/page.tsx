'use client';

import Image from 'next/image';
import { Download, HeartPulse, Binary, ChevronRight } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
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

function TiltImage({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`relative rounded-[3.5rem] overflow-hidden glass-nanobanana ${className}`}
    >
      <div
        style={{ transform: "translateZ(60px)", transformStyle: "preserve-3d" }}
        className="absolute inset-0 z-10 bg-gradient-to-t from-background/90 via-transparent to-transparent pointer-events-none"
      />
      <motion.div style={{ transform: "translateZ(30px)" }} className="relative aspect-square w-full">
        <Image src={src} alt={alt} fill className="object-cover opacity-80" />
      </motion.div>
    </motion.div>
  );
}

export default function About() {
  return (
    <main className="pt-24 overflow-hidden relative">
      {/* Identity Hero: Fixed Spacing & High-Fi Blur */}
      <section className="py-40 px-6 lg:px-0 relative overflow-hidden perspective-3000">
        <div className="section-container grid lg:grid-cols-[1.3fr_0.7fr] gap-32 items-end">
          <motion.div>
            <ScrollReveal direction="none" blur={30} className="mb-10">
              <span className="text-[10px] font-bold tracking-[0.5em] uppercase opacity-30">Identity Profile</span>
            </ScrollReveal>
            <ScrollReveal direction="up" distance={40} blur={20} delay={0.2}>
              <h1 className="text-7xl md:text-[140px] font-medium tracking-tighter mb-20 leading-[0.75]">
                Roots <br /> {"&"} <span className="opacity-30 italic font-light font-serif">Rationale.</span>
              </h1>
            </ScrollReveal>
          </motion.div>
          <ScrollReveal direction="right" distance={80} blur={40} delay={0.4} className="group mb-12">
            <TiltImage src="/assets/n_logic.png" alt="Operational Logic Microscopic Detail" />
          </ScrollReveal>
        </div>
      </section>

      {/* Practitioner vs Architect: Balanced High-Fi */}
      <section className="py-40 lg:py-64 border-t border-white/5 bg-white/[0.005]">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-40 items-start">
            <ScrollReveal direction="up" blur={20} className="space-y-16">
              <div className="flex items-center gap-8">
                <div className="w-12 h-12 rounded-2xl bg-white/[0.01] border border-white/5 flex items-center justify-center">
                  <HeartPulse className="text-muted-foreground w-6 h-6" />
                </div>
                <h2 className="text-5xl font-medium tracking-tight">The Practitioner.</h2>
              </div>
              <p className="text-3xl font-light text-muted-foreground leading-relaxed max-w-xl italic">
                MSc Physiotherapy with Distinction. My perspective is rooted in the thousand-hour diagnostic cycle of care and adherence across 6 specialties.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.3} blur={20} className="space-y-16 lg:pt-48 border-l border-white/5 pl-24 ml-auto">
              <div className="flex items-center gap-8">
                <div className="w-12 h-12 rounded-2xl bg-white/[0.01] border border-white/5 flex items-center justify-center">
                  <Binary className="text-muted-foreground w-6 h-6" />
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

      {/* Compact Roadmap: High-Density & Staggered Reveal */}
      <section className="py-40 lg:py-64 relative border-y border-white/5">
        <div className="section-container">
          <ScrollReveal direction="up" blur={20} className="mb-48">
            <p className="text-[10px] font-bold tracking-[0.4em] uppercase opacity-30 mb-8">Professional Timeline</p>
            <h2 className="text-7xl md:text-[120px] font-medium tracking-tighter leading-none mb-12 text-balance">Perspective.</h2>
          </ScrollReveal>

          <div className="overflow-hidden rounded-[3.5rem] border border-white/5 bg-white/[0.005] glass-nanobanana">
            {roadmap.map((item, i) => (
              <ScrollReveal
                key={item.title}
                direction="none"
                delay={i * 0.2}
                blur={20}
                className="grid lg:grid-cols-[1.3fr_2.7fr] gap-12 group p-16 bg-[#0d1117] border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-all duration-1000"
              >
                <div className="space-y-8">
                  <span className="text-[11px] font-bold tracking-widest uppercase italic opacity-30 group-hover:opacity-100 transition-opacity duration-1000">{item.period}</span>
                  <h3 className="text-4xl font-medium tracking-tight leading-none group-hover:text-accent transition-colors duration-1000">{item.title}</h3>
                  <p className="text-xl font-light text-muted-foreground opacity-50">{item.company}</p>
                </div>

                <div className="space-y-12">
                  <p className="text-[10px] font-bold uppercase tracking-[0.5em] opacity-20 italic">{item.focus}</p>
                  <ul className="grid md:grid-cols-2 gap-x-12 gap-y-12">
                    {item.points.map((point) => (
                      <li
                        key={point}
                        className="flex gap-6 text-xl text-muted-foreground font-light leading-snug items-start border-l border-white/[0.03] pl-6 hover:text-foreground transition-all duration-700"
                      >
                        <ChevronRight size={20} className="opacity-10 mt-1 flex-shrink-0" />
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

      {/* Final Call */}
      <section className="py-96 text-center px-6 border-t border-white/5 bg-white/[0.005]">
        <ScrollReveal direction="up" blur={40}>
          <h2 className="text-8xl md:text-[160px] font-medium tracking-tighter mb-24 leading-[0.7] text-balance">
            Build <br /> <span className="opacity-10 italic font-light font-serif">The Narrative.</span>
          </h2>
          <a
            href="/Kareem Hassanein - Resume January 2026.pdf"
            className="group inline-flex items-center gap-12 text-3xl font-bold tracking-tight text-foreground link-underline pb-4 px-12 transition-all"
          >
            Access Identity Dossier
            <Download size={48} className="opacity-10 group-hover:translate-y-4 transition-all duration-1000" />
          </a>
        </ScrollReveal>
      </section>
    </main>
  );
}
