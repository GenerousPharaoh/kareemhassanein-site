'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import ParallaxImage from '@/components/ParallaxImage';
import CharReveal from '@/components/CharReveal';
import AnimatedGrid from '@/components/AnimatedGrid';
import { useRef } from 'react';

const services = [
  {
    index: '01',
    title: 'Operational Infrastructure',
    tagline: 'System Integrity.',
    desc: 'Professional operations require more than just login credentials. I handle system interoperability, rule-based configuration, and cross-platform logic for firms handling high-stakes workflows.',
    points: ['Architecture evaluation', 'Interoperability design', 'Rule-based configuration'],
    img: '/assets/n_strategy.png'
  },
  {
    index: '02',
    title: 'Workflow Logic',
    tagline: 'Technical Leverage.',
    desc: 'I design systems that handle administrative edge cases. From automated document pipes in legal firms to complex intake logic in healthcare, I build for data integrity.',
    points: ['Logical pipe design', 'Edge-case automation', 'Data integrity guardrails'],
    img: '/assets/n_logic.png'
  },
  {
    index: '03',
    title: 'Scaling Systems',
    tagline: 'Growth Architecture.',
    desc: 'Identifying operational friction before it caps your growth. I optimize administrative pathways and referral tracking for professional service groups across health and law.',
    points: ['Bottleneck identification', 'Referral attribution', 'Scale-ready SOPs'],
    img: '/assets/n_story_bg_03.png'
  }
];

const techStack = [
  { group: 'Automation', tools: ['Claude Code', 'Google Antigravity', 'Webhooks', 'REST APIs'] },
  { group: 'Operations', tools: ['Jane App', 'Practice Management', 'CRM Architectures', 'Workflow Mapping'] },
  { group: 'Digital', tools: ['Next.js (App Dir)', 'TypeScript', 'Lighthouse / SEO', 'Google Search Console'] }
];

function ServiceSection({ service, isEven }: { service: typeof services[0], isEven: boolean }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section ref={ref} className="min-h-screen flex items-center justify-center relative py-40 overflow-hidden px-6 lg:px-20">
      {/* Background Number */}
      <div className={`absolute top-1/2 -translate-y-1/2 text-[25vw] font-bold text-white/[0.02] select-none pointer-events-none ${isEven ? 'right-10' : 'left-10'}`}>
        {service.index}
      </div>

      <div className={`w-full max-w-[1600px] grid lg:grid-cols-[1.2fr_1fr] gap-20 lg:gap-40 items-center ${isEven ? 'lg:grid-flow-dense' : ''}`}>

        {/* Content Side */}
        <div className={`space-y-12 ${isEven ? 'lg:col-start-2' : ''}`}>
          <ScrollReveal direction="up">
            <span className="text-accent font-mono text-sm tracking-[0.4em] uppercase block mb-4">0{service.index}</span>
            <h2 className="text-7xl md:text-9xl font-medium tracking-tighter leading-none italic font-serif opacity-90">
              {service.title}
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2}>
            <p className="text-3xl md:text-5xl font-light tracking-tight text-foreground/80 leading-[1.1] max-w-2xl">
              {service.tagline}
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.3}>
            <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed max-w-xl">
              {service.desc}
            </p>
          </ScrollReveal>

          <div className="pt-10 space-y-6">
            {service.points.map((point, i) => (
              <motion.div
                key={point}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + (i * 0.1) }}
                className="flex items-center gap-6 text-lg tracking-tight group"
              >
                <div className="w-8 h-[1px] bg-accent/30 group-hover:w-12 transition-all duration-700" />
                <span className="opacity-60 group-hover:opacity-100 transition-opacity">{point}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Image Side */}
        <motion.div
          style={{ y }}
          className="relative aspect-[4/5] w-full max-w-[600px] mx-auto rounded-3xl overflow-hidden shadow-2xl grayscale hover:grayscale-0 transition-all duration-1000"
        >
          <ParallaxImage src={service.img} alt={service.title} className="w-full h-full" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
        </motion.div>

      </div>
    </section>
  );
}

export default function Services() {
  return (
    <main className="relative bg-background text-foreground overflow-hidden pt-20">
      <AnimatedGrid />

      {/* Cinematic Hero */}
      <section className="min-h-[90vh] flex flex-col justify-center items-center text-center px-6">
        <ScrollReveal direction="up">
          <span className="block text-[10px] font-bold tracking-[0.8em] uppercase mb-12 opacity-30">Architecture</span>
        </ScrollReveal>

        <h1 className="text-[12vw] md:text-[8vw] font-medium tracking-tighter leading-[0.8] mb-12">
          Operational <br />
          <CharReveal delay={0.4} className="text-accent">Design.</CharReveal>
        </h1>

        <div className="max-w-3xl border-t border-white/5 pt-12">
          <p className="text-2xl md:text-3xl text-muted-foreground font-light italic leading-snug">
            I design and build the technical systems that remove operational friction for professional service firms.
          </p>
        </div>
      </section>

      {/* Narrative Flow */}
      <div className="space-y-40">
        {services.map((service, idx) => (
          <ServiceSection
            key={service.index}
            service={service}
            isEven={idx % 2 !== 0}
          />
        ))}
      </div>

      {/* Tech Stack Spec Sheet Section */}
      <section className="py-64 px-12 lg:px-32 relative">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-32 gap-10">
            <div className="space-y-6">
              <span className="text-accent font-mono text-sm tracking-[0.4em] uppercase block">Inventory</span>
              <h2 className="text-7xl md:text-9xl font-medium tracking-tighter leading-none italic font-serif opacity-80">
                The Stack.
              </h2>
            </div>
            <p className="text-xl text-muted-foreground font-light max-w-sm border-l border-white/10 pl-10 mb-2 italic">
              Technical infrastructure for professional service groups.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-y-24 border-t border-white/5 pt-24">
            {techStack.map((group) => (
              <div key={group.group} className="space-y-16 px-4 md:px-0">
                <div className="flex items-center gap-6">
                  <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  <h3 className="text-xs font-bold tracking-[0.5em] uppercase opacity-40">{group.group}</h3>
                </div>
                <ul className="space-y-10">
                  {group.tools.map(tool => (
                    <li key={tool} className="group relative">
                      <div className="flex items-end gap-6 overflow-hidden">
                        <span className="text-2xl md:text-4xl font-light tracking-tight text-foreground/70 group-hover:text-foreground transition-all duration-700 whitespace-nowrap">
                          {tool}
                        </span>
                        <div className="h-[1px] w-full bg-white/5 group-hover:bg-accent/40 transition-colors duration-1000 mb-2" />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Ambient Grid Marker */}
        <div className="absolute bottom-0 right-0 p-12 opacity-10 text-[10px] font-mono tracking-widest hidden lg:block">
          PRO_SPEC_V2.0 // CORE_STACK
        </div>
      </section>

      {/* The Final Line */}
      <section className="py-96 text-center border-t border-white/5">
        <ScrollReveal direction="up">
          <h2 className="text-8xl md:text-[180px] font-medium tracking-[calc(-0.04em)] leading-[0.7] opacity-10">
            Ready.
          </h2>
        </ScrollReveal>
      </section>

    </main>
  );
}
