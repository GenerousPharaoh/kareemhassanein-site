'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Terminal, Workflow, Microscope, Network } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

const impacts = [
  {
    title: 'Clinical AI Implementation',
    details: 'Piloted and established SOPs for Heidi AI across multi-specialty teams. Bridging the gap between software capability and clinician adoption to eliminate documentation bottlenecks.',
    tag: 'Healthcare Ops',
    icon: <Microscope className="w-5 h-5 text-accent" />
  },
  {
    title: 'Agentic Workflow DevOps',
    details: 'Architected custom workflows using Claude Code and Google Antigravity platforms. Reduction in document generation time by 85% through modular automation logic.',
    tag: 'Technical Implementation',
    icon: <Terminal className="w-5 h-5 text-accent" />
  },
  {
    title: 'Digital Patient Infrastructure',
    details: 'Building high-performance patient acquisition streams with SEO-first architecture and Jane App integration. Linking clinical visibility to patient conversion.',
    tag: 'Visibility & Conversion',
    icon: <Network className="w-5 h-5 text-accent" />
  },
  {
    title: 'Process Architecture & SOPs',
    details: 'Redesigning multidisciplinary clinic booking flows and referral pathways. Operationalizing clinical excellence through repeatable system architecture.',
    tag: 'Operational Excellence',
    icon: <Workflow className="w-5 h-5 text-accent" />
  }
];

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  return (
    <div ref={containerRef} className="relative">
      <div className="absolute inset-0 grid-pattern opacity-40 pointer-events-none -z-10" />

      {/* Flagship Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-40 pb-32">
        <motion.div
          style={{ opacity: heroOpacity }}
          className="max-w-7xl mx-auto w-full"
        >
          <div className="grid lg:grid-cols-2 gap-24 items-end">
            <div>
              <ScrollReveal direction="none" className="mb-12">
                <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-accent">
                  Titanium Protocol v.2026
                </span>
              </ScrollReveal>

              <h1 className="text-6xl md:text-8xl lg:text-[130px] font-medium leading-[0.85] tracking-tighter mb-16 mask-reveal">
                Practice <br /> meets <br /> <span className="text-secondary-foreground italic">Procedure.</span>
              </h1>
            </div>

            <div className="pb-16 border-l border-white/5 pl-12">
              <ScrollReveal delay={0.4} distance={20}>
                <p className="text-2xl md:text-3xl text-muted-foreground leading-snug mb-16 font-light">
                  Implementation specialist architecting the intersection of <span className="text-foreground">clinical depth</span> and <span className="text-foreground">digital automation</span>.
                </p>
                <div className="flex gap-12 items-center">
                  <Link
                    href="/contact"
                    className="group flex items-center gap-4 text-xl font-bold tracking-tight text-foreground transition-all duration-500"
                  >
                    Initiate Dialogue
                    <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-all duration-500">
                      <ArrowRight size={20} className="group-hover:text-black" />
                    </div>
                  </Link>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Robust The Perspective Section */}
      <section className="py-72 px-6 relative overflow-hidden border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-[1fr_2fr] gap-32">
            <ScrollReveal direction="left" className="sticky top-40">
              <p className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-30 mb-8">Identity</p>
              <h2 className="text-5xl md:text-8xl font-medium tracking-tighter leading-[0.9]">
                Frontline <br /> Depth. <br /> Systemic <br /> Scale.
              </h2>
            </ScrollReveal>

            <div className="space-y-32">
              <ScrollReveal direction="up" className="space-y-12">
                <p className="text-3xl md:text-5xl font-light leading-[1.1] text-balance">
                  I understand the friction of high-stakes environments because I&apos;ve lived in them. Care doesn&apos;t happen without <span className="text-accent underline decoration-1 underline-offset-[12px]">adoption</span>.
                </p>
                <div className="grid md:grid-cols-2 gap-12 pt-12">
                  <div className="space-y-6">
                    <h4 className="text-sm font-bold uppercase tracking-widest text-accent">Clinical Core</h4>
                    <p className="text-xl text-muted-foreground font-light leading-relaxed">
                      MSc PT with Distinction. Thousands of hours delivering care, assessing needs, and coordinating multidisciplinary referral pathways.
                    </p>
                  </div>
                  <div className="space-y-6">
                    <h4 className="text-sm font-bold uppercase tracking-widest text-accent">Technical DevOps</h4>
                    <p className="text-xl text-muted-foreground font-light leading-relaxed">
                      Architecting agentic AI systems that respect time. Claude Code, Antigravity, and CI/CD for operational stability.
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Discrete Impact Modules */}
      <section className="py-72 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-40 gap-12">
            <ScrollReveal direction="up">
              <p className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-30 mb-8">Proven Discrete Impact</p>
              <h2 className="text-6xl md:text-9xl font-medium tracking-tighter leading-none">
                Protocol <br /> Evidence.
              </h2>
            </ScrollReveal>
            <ScrollReveal direction="right" className="max-w-sm text-right pb-4 border-r-2 border-accent/20 pr-12">
              <p className="text-xl text-muted-foreground font-light leading-snug">
                Moving specific operational needles through targeted implementation.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid md:grid-cols-2 gap-1px bg-white/5 border border-white/5">
            {impacts.map((impact, i) => (
              <ScrollReveal
                key={impact.title}
                direction="up"
                delay={i * 0.1}
                className="bg-[#050608] p-16 space-y-12 hover:bg-white/[0.02] transition-all duration-700"
              >
                <div className="flex justify-between items-start">
                  <div className="p-4 rounded-sm border border-white/5 bg-white/[0.01]">
                    {impact.icon}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest opacity-20">{impact.tag}</span>
                </div>
                <div className="space-y-6">
                  <h3 className="text-4xl font-medium tracking-tighter">{impact.title}</h3>
                  <p className="text-xl text-muted-foreground font-light leading-relaxed">
                    {impact.details}
                  </p>
                </div>
                <div className="h-px w-12 bg-accent opacity-30 group-hover:w-full transition-all duration-1000" />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Capability Stack Grid */}
      <section className="py-72 px-6 bg-[#050608] border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-12">
            {[
              { label: 'Ops Architecture', desc: 'Process mapping, SOP development, and root cause analysis across clinical service lines.' },
              { label: 'Technical Integration', desc: 'Agentic AI deployment, API conceptualization, and CI/CD operationalization.' },
              { label: 'User Enablement', desc: 'Change management coaching, stakeholder alignment, and peer-to-peer software training.' },
              { label: 'Strategy Advisory', desc: 'Market validation for med-tech, usability auditing, and clinical workflow fitting.' },
            ].map((skill, i) => (
              <ScrollReveal
                key={skill.label}
                direction="up"
                delay={i * 0.1}
                className="space-y-8 p-10 titanium-border"
              >
                <span className="text-5xl font-medium text-white/5 tracking-tighter block">0{i + 1}</span>
                <h4 className="text-xl font-bold uppercase tracking-widest text-accent">{skill.label}</h4>
                <p className="text-lg text-muted-foreground font-light leading-relaxed">
                  {skill.desc}
                </p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Robust Footer Statement */}
      <section className="py-80 px-6 text-center border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal direction="up">
            <h2 className="text-8xl md:text-[180px] font-medium tracking-tighter mb-24 leading-[0.75]">
              System <br /> <span className="text-accent italic">Advance.</span>
            </h2>
            <Link
              href="/contact"
              className="inline-flex items-center gap-10 text-3xl font-light link-underline pb-4 px-4"
            >
              Collaborate
              <ArrowRight size={48} className="opacity-20" />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
