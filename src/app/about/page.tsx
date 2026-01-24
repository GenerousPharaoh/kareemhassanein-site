'use client';

import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import ParallaxImage from '@/components/ParallaxImage';
import CharReveal from '@/components/CharReveal';
import { useRef } from 'react';

const roadmap = [
  {
    period: '2025 - Present',
    title: 'Workflow Automation',
    company: 'Tax Relief Counsel',
    desc: 'Addressing high-stakes administrative complexity through custom workflow logic. Built automation pipes for a solo law firm that reduced document generation time by 85%.',
    img: '/assets/n_implementation.png'
  },
  {
    period: '2024 - Present',
    title: 'Digital Ops Lead',
    company: 'Endorphins Health',
    desc: 'Analyzing operational bottlenecks across 6 clinic locations. Built administrative architecture on Jane App and custom referral systems generating $600K+ in revenue.',
    img: '/assets/n_strategy.png'
  },
  {
    period: '2025 - Present',
    title: 'Advisory',
    company: 'Neuro-Mod (Startup)',
    desc: 'Advising on clinician-facing interface design and workflow integration for an emerging medical device startup.',
    img: '/assets/n_logic.png'
  },
  {
    period: '2024 - 2025',
    title: 'Contributor',
    company: 'Canadian Physiotherapy Assoc.',
    desc: 'Collaborated with the CPA CEO on national initiatives focusing on workforce analysis and operational conditions for physiotherapists across Canada.',
    img: '/assets/n_synergy.png'
  }
];

const gallery = [
  { src: '/images/bridging.png', label: 'Clinical Bridge' },
  { src: '/assets/precision.png', label: 'Operational Precision' },
  { src: '/assets/mapping.png', label: 'System Mapping' },
  { src: '/assets/n_strategy.png', label: 'Architectural Order' }
];

function BioSection({ title, label, text, img, isReversed }: { title: string, label: string, text: string, img: string, isReversed?: boolean }) {
  const ref = useRef(null);

  return (
    <section ref={ref} className="min-h-[80vh] flex items-center relative overflow-hidden border-b border-white/5">
      <div className="max-w-[1600px] mx-auto w-full grid lg:grid-cols-2 items-center">
        <div className={`px-12 lg:px-24 py-24 space-y-10 ${isReversed ? 'lg:order-2' : ''}`}>
          <ScrollReveal direction="up">
            <span className="text-accent font-mono text-sm tracking-[0.4em] uppercase block mb-6">{label}</span>
            <h2 className="text-6xl md:text-8xl font-medium tracking-tighter leading-[0.8] mb-10 italic font-serif">
              {title}
            </h2>
            <p className="text-xl md:text-2xl font-light text-muted-foreground leading-relaxed max-w-lg">
              {text}
            </p>
          </ScrollReveal>
        </div>
        <div className={`relative h-[50vh] lg:h-full ${isReversed ? 'lg:order-1' : ''}`}>
          <ParallaxImage
            src={img}
            alt={title}
            className="h-full w-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-30 pointer-events-none" />
        </div>
      </div>
    </section>
  );
}

export default function About() {
  return (
    <main className="bg-background text-foreground pt-20">

      {/* Cinematic Identity Hero */}
      <section className="min-h-screen flex items-center justify-center relative border-b border-white/5 overflow-hidden px-6 md:px-24 py-32">

        {/* Full-Bleed Background Layer */}
        <div className="absolute inset-0 z-0">
          <ParallaxImage
            src="/images/digital-cathedral.png"
            alt="Architecture"
            className="w-full h-full opacity-20"
          />
          <div className="absolute inset-0 bg-background/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background" />
        </div>

        <div className="relative z-10 text-center md:text-left w-full max-w-[1400px]">
          <ScrollReveal direction="up">
            <span className="block text-[10px] font-bold tracking-[1em] uppercase mb-12 opacity-30">Background</span>
            <h1 className="text-[10vw] md:text-[8vw] font-medium tracking-tighter leading-[0.75] mb-8">
              System <br />
              <CharReveal delay={0.4} className="text-accent italic font-serif">Logic.</CharReveal>
            </h1>
            <p className="text-2xl md:text-3xl font-light text-muted-foreground max-w-xl italic leading-relaxed mx-auto md:mx-0">
              Merging clinical insight with operational engineering to remove technical friction.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Chapters */}
      <BioSection
        label="Clinical Roots"
        title="Physiotherapy"
        text="MSc with Distinction from Robert Gordon University. I practiced for years before shifting to building the systems clinicians actually need."
        img="/assets/precision.png"
      />

      <BioSection
        label="Technical Leverage"
        title="Engineering"
        text="I build systems that solve administrative friction. I focus on logic and data integrity, ensuring that technical tools actually serve the professionals using them."
        img="/images/image-2.png"
        isReversed
      />

      {/* Visual Evidence Gallery */}
      <section className="py-32 overflow-hidden border-b border-white/5 bg-white/[0.002]">
        <div className="px-12 lg:px-32 mb-24">
          <span className="text-[10px] font-bold tracking-[0.5em] uppercase opacity-30 mb-8 block">Process Visuals</span>
          <h2 className="text-6xl md:text-9xl font-medium tracking-tighter italic font-serif">The Bridge.</h2>
        </div>

        <div className="flex gap-12 px-12 lg:px-32 overflow-x-auto pb-24 no-scrollbar scroll-smooth">
          {gallery.map((item, i) => (
            <motion.div
              key={item.src}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex-shrink-0 w-[80vw] md:w-[600px] group"
            >
              <div className="aspect-[16/10] w-full rounded-2xl shadow-2xl relative">
                <ParallaxImage
                  src={item.src}
                  alt={item.label}
                  className="w-full h-full rounded-2xl border border-white/5"
                />
                <div className="absolute bottom-6 left-6 text-[10px] font-mono tracking-widest uppercase opacity-60 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full pointer-events-none">
                  {item.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Experience Track */}
      <section className="py-40 px-12 lg:px-32 bg-white/[0.005]">
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
      <section className="py-40 text-center border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-[0.08] pointer-events-none">
          <ParallaxImage src="/images/glow.png" alt="Atmospheric Glow" className="w-full h-full object-cover" />
        </div>
        <ScrollReveal direction="up" className="relative z-10">
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
