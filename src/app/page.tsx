'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Sparkles, Workflow, Binary, ShieldCheck } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

const impacts = [
  {
    title: 'Clinical Implementation',
    details: 'Piloted and established SOPs for Heidi AI across multi-specialty regional teams. Bridging software capability and clinician adoption to eliminate documentation bottlenecks.',
    tag: 'Care Ops',
    icon: <Sparkles className="w-5 h-5 opacity-40" />
  },
  {
    title: 'Agentic DevOps',
    details: 'Architected automated drafting models using Claude Code and Google Antigravity platforms. Reduction in document generation time by 85% via modular automation logic.',
    tag: 'Automation',
    icon: <Binary className="w-5 h-5 opacity-40" />
  },
  {
    title: 'Infrastructure',
    details: 'Constructed patient acquisition pipelines with SEO-first architecture and Jane App integration. Linking clinical visibility to measurable patient conversion.',
    tag: 'Acquisition',
    icon: <Workflow className="w-5 h-5 opacity-40" />
  },
  {
    title: 'Strategy Advisory',
    details: 'Consulting for med-tech platforms on clinical usability, adoption barriers, and market fit. Operationalizing excellence through repeatable system design.',
    tag: 'Validation',
    icon: <ShieldCheck className="w-5 h-5 opacity-40" />
  }
];

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.1], [1, 0.98]);

  return (
    <div ref={containerRef} className="relative">
      {/* Narrative Hero: Atmospheric Entry */}
      <section className="relative min-h-[90vh] flex items-center pt-32 pb-20 overflow-hidden px-6 lg:px-0">
        <div className="section-container grid lg:grid-cols-[1.2fr_0.8fr] gap-24 items-center">
          <motion.div style={{ opacity: heroOpacity, scale: heroScale }} className="z-10">
            <ScrollReveal direction="none" className="mb-8">
              <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-accent-secondary/60">
                Atmospheric Protocol .26
              </span>
            </ScrollReveal>

            <h1 className="text-6xl md:text-8xl lg:text-[110px] font-medium leading-[0.85] tracking-tight mb-16 text-balance mask-reveal">
              The Bridge <br />
              between Frontline <br />
              <span className="text-accent underline decoration-[0.5px] underline-offset-[16px]">Depth</span> {"&"} Systemic Scale.
            </h1>

            <ScrollReveal delay={0.4} distance={20} className="max-w-xl">
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-20 font-light italic">
                Implementation specialist architecting the intersection of clinical necessity and digital efficiency.
              </p>
              <div className="flex gap-12 items-center">
                <Link
                  href="/contact"
                  className="group flex items-center gap-6 text-xl font-bold tracking-tight text-foreground link-underline pb-1"
                >
                  Initiate Dialogue
                  <ArrowRight size={24} className="opacity-20 group-hover:opacity-100 group-hover:translate-x-4 transition-all duration-1000" />
                </Link>
              </div>
            </ScrollReveal>
          </motion.div>

          {/* Clinical Synergy Illustration */}
          <ScrollReveal direction="right" distance={80} className="relative aspect-square lg:aspect-[4/5] rounded-[3rem] overflow-hidden glass-pearl ethereal-float translate-y-20 lg:translate-y-0">
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent z-10" />
            <Image
              src="/assets/synergy.png"
              alt="Clinical Synergy"
              fill
              className="object-cover opacity-60 hover:opacity-100 transition-all duration-[3s]"
              priority
            />
            <div className="absolute bottom-12 left-12 z-20">
              <p className="text-[10px] font-bold tracking-[0.4em] uppercase opacity-30">Visual: Synergy</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Narrative Section: Adoption Crisis */}
      <section className="py-64 lg:py-80 bg-white/[0.01] border-y border-white/5 relative overflow-hidden">
        <div className="section-container">
          <div className="max-w-5xl mx-auto space-y-24 text-center">
            <ScrollReveal direction="up">
              <h2 className="text-4xl md:text-7xl font-medium tracking-tight leading-tight text-balance">
                Technology is the tool. <br />
                <span className="opacity-30 italic font-light">Adoption is the result.</span>
              </h2>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.2} className="max-w-2xl mx-auto">
              <p className="text-2xl text-muted-foreground font-light leading-relaxed">
                I specialize in the friction of high-stakes environments. Care doesn&apos;t happen without stable systems and clinician trust. I build the systems that drive adoption.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* The Result Matrix: High Contrast Narrative cards */}
      <section className="py-64 lg:py-80">
        <div className="section-container">
          <div className="flex flex-col lg:flex-row justify-between items-end mb-40 gap-12">
            <ScrollReveal direction="up">
              <p className="text-[10px] font-bold tracking-[0.4em] uppercase opacity-30 mb-8">Verification</p>
              <h2 className="text-6xl md:text-9xl font-medium tracking-tighter leading-none">
                Discrete <br /> Impact.
              </h2>
            </ScrollReveal>
            <ScrollReveal direction="right" className="max-w-sm text-right pb-4 lg:border-r border-white/10 lg:pr-12">
              <p className="text-xl text-muted-foreground font-light leading-relaxed">
                Measurable successes in clinical operations and automation rollout.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid md:grid-cols-2 gap-px bg-white/10 border border-white/10 overflow-hidden rounded-[4rem]">
            {impacts.map((impact, i) => (
              <ScrollReveal
                key={impact.title}
                direction="up"
                delay={i * 0.1}
                className="bg-[#0d0f12] p-16 space-y-12 hover:bg-white/[0.02] transition-all duration-1000 group"
              >
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-accent-secondary transition-colors duration-1000">
                    {impact.icon}
                  </div>
                  <span className="text-[10px] font-bold tracking-widest uppercase opacity-20">{impact.tag}</span>
                </div>
                <div className="space-y-8">
                  <h3 className="text-4xl font-medium tracking-tight group-hover:text-accent-secondary transition-colors duration-1000">{impact.title}</h3>
                  <p className="text-2xl text-muted-foreground font-light leading-relaxed">
                    {impact.details}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Atmospheric Closing: Identity Summary */}
      <section className="py-80 lg:py-96 text-center relative overflow-hidden">
        <div className="section-container relative z-10">
          <ScrollReveal direction="up" className="space-y-24">
            <h2 className="text-8xl md:text-[180px] font-medium tracking-tighter mb-24 leading-[0.75]">
              Advance <br />
              <span className="text-accent underline decoration-[2px] underline-offset-[24px]">Adoption.</span>
            </h2>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-12 text-3xl font-light link-underline pb-4 px-12"
            >
              Initiate Conversation
              <ArrowRight size={64} className="opacity-10 group-hover:opacity-100 group-hover:translate-x-4 transition-all duration-1000" />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
