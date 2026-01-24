'use client';

import { Download } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import ParallaxImage from '@/components/ParallaxImage';
import CharReveal from '@/components/CharReveal';
import { useRef } from 'react';

const roadmap = [
  {
    period: '2024 - Present',
    title: 'Digital Ops Lead',
    company: 'Endorphins Health',
    desc: 'Analyzing operational bottlenecks across 6 clinic locations. Built administrative pathways and referral tracking systems to handle group-level scale.',
    img: '/assets/n_strategy.png'
  },
  {
    period: '2025 - Present',
    title: 'Automation Consultant',
    company: 'Tax Relief Counsel',
    desc: 'Addressing high-stakes administrative complexity through workflow logic. Standardizing intake and document gen for legal professionals.',
    img: '/assets/n_hero.png'
  },
  {
    period: '2021 - 2024',
    title: 'Physiotherapist',
    company: 'Movement Solutions',
    desc: 'Practiced as a full-time clinician while designing the internal rollout of medical AI tools. Designed for 100% clinician adoption in high-volume environments.',
    img: '/assets/n_logic.png'
  }
];

function BioSection({ title, label, text, img, isReversed }: { title: string, label: string, text: string, img: string, isReversed?: boolean }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section ref={ref} className="min-h-screen grid lg:grid-cols-2 items-center relative overflow-hidden">
      <div className={`p-12 lg:p-32 space-y-12 ${isReversed ? 'lg:order-2' : ''}`}>
        <ScrollReveal direction="up">
          <span className="text-accent font-mono text-sm tracking-[0.4em] uppercase block mb-6">{label}</span>
          <h2 className="text-7xl md:text-9xl font-medium tracking-tighter leading-[0.8] mb-12 italic font-serif">
            {title}
          </h2>
          <p className="text-2xl md:text-3xl font-light text-muted-foreground leading-relaxed max-w-xl">
            {text}
          </p>
        </ScrollReveal>
      </div>
      <div className="relative h-screen lg:h-full overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000">
        <motion.div style={{ scale: 1.1, y }} className="h-full w-full">
          <ParallaxImage src={img} alt={title} className="h-full w-full object-cover" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80 lg:hidden" />
      </div>
    </section>
  );
}

export default function About() {
  return (
    <main className="bg-background text-foreground pt-20">

      {/* Cinematic Identity Hero */}
      <section className="min-h-[80vh] flex flex-col justify-center px-12 lg:px-32 relative border-b border-white/5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-accent/5 rounded-full blur-[150px] pointer-events-none" />
        <ScrollReveal direction="up">
          <span className="block text-[10px] font-bold tracking-[1em] uppercase mb-12 opacity-30">Background</span>
          <h1 className="text-[12vw] md:text-[8vw] font-medium tracking-tighter leading-[0.75] mb-4">
            System <br />
            <CharReveal delay={0.4} className="text-accent italic font-serif">Logic.</CharReveal>
          </h1>
        </ScrollReveal>
      </section>

      {/* Chapters */}
      <BioSection
        label="Experience"
        title="Foundation"
        text="I spent years as a full-time clinician before shifting to building the systems they use. My expertise is rooted in understanding where professional operations break down under pressure."
        img="/assets/n_logic.png"
      />

      <BioSection
        label="Methodology"
        title="Architecture"
        text="I build systems that solve administrative friction. I focus on logic and data integrity, ensuring that technical tools actually serve the professionals using them."
        img="/assets/n_strategy.png"
        isReversed
      />

      {/* Experience Track */}
      <section className="py-64 px-12 lg:px-32 bg-white/[0.005]">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-6xl md:text-9xl font-medium tracking-tighter mb-40 opacity-20">History.</h2>
          <div className="space-y-40">
            {roadmap.map((item) => (
              <div key={item.title} className="grid lg:grid-cols-[1fr_2fr] gap-20 items-start">
                <div className="sticky top-40">
                  <span className="text-xs font-bold tracking-widest uppercase opacity-40 block mb-4">{item.period}</span>
                  <h3 className="text-4xl text-accent font-serif italic">{item.title}</h3>
                  <p className="text-muted-foreground mt-4">{item.company}</p>
                </div>
                <div className="space-y-12">
                  <p className="text-3xl md:text-5xl font-light leading-snug">{item.desc}</p>
                  <div className="aspect-video w-full rounded-3xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000 border border-white/5">
                    <ParallaxImage src={item.img} alt={item.title} className="w-full h-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-64 text-center border-t border-white/5">
        <ScrollReveal direction="up">
          <h2 className="text-7xl md:text-[120px] font-medium tracking-tighter mb-24 opacity-80">Knowledge.</h2>
          <a
            href="/Kareem-Hassanein-Resume.pdf"
            className="group inline-flex items-center gap-12 text-3xl font-bold tracking-tight text-accent link-underline pb-4 px-12 transition-all hover:scale-105"
          >
            Get full resume
            <Download size={48} className="opacity-40 group-hover:translate-y-4 transition-all duration-1000" />
          </a>
        </ScrollReveal>
      </section>

    </main>
  );
}
