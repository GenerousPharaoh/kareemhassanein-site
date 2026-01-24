'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Sparkles, Binary, HeartPulse, Workflow } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

const impacts = [
  {
    title: 'Clinical AI Selection & Rollout',
    details: 'Spearheaded the technical evaluation and clinic-wide implementation of Heidi AI for a multidisciplinary team. Built custom SOPs that ensured 100% adoption and eliminated friction in high-stakes documentation.',
    tag: 'Implementation',
    icon: <Sparkles className="w-5 h-5 text-accent" />
  },
  {
    title: 'Agentic Workflow Automation',
    details: 'Architected sophisticated agentic workflows using Claude Code and Google Antigravity platforms. Reduction in document generation time by 85% through custom modular automation logic.',
    tag: 'Automation',
    icon: <Binary className="w-5 h-5 text-accent-secondary" />
  },
  {
    title: 'Local Discovery Architecture',
    details: 'Constructed high-performance patient acquisition streams with SEO-first infrastructure and Jane App integration. Linking clinical visibility to measurable patient conversion.',
    tag: 'Infrastructure',
    icon: <HeartPulse className="w-5 h-5 text-accent" />
  },
  {
    title: 'Strategic Process Design',
    details: 'Redesigning multidisciplinary clinical booking architectures and referral pathways. Operationalizing clinical excellence through repeatable, automated system design.',
    tag: 'Operations',
    icon: <Workflow className="w-5 h-5 text-accent-secondary" />
  }
];

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <div ref={containerRef} className="relative">
      {/* Background Vivid Glows */}
      <div className="glow-blob top-[10%] -left-[10%] opacity-20" />
      <div className="glow-blob-secondary bottom-[20%] -right-[10%] opacity-20" />

      {/* Immersive Hero Section */}
      <section className="relative min-h-screen flex items-center px-6 lg:px-24 pt-40 pb-32 overflow-hidden">
        <div className="max-w-[1400px] mx-auto w-full grid lg:grid-cols-[1.2fr_0.8fr] gap-32 items-center">
          <motion.div style={{ y: heroY, opacity: heroOpacity }} className="z-10">
            <ScrollReveal direction="none" className="mb-12">
              <span className="text-[11px] font-bold tracking-[0.5em] uppercase text-accent bg-accent/10 px-4 py-2 rounded-full">
                Vivid Identity v.2026
              </span>
            </ScrollReveal>

            <h1 className="text-6xl md:text-8xl lg:text-[130px] font-medium leading-[0.85] tracking-tight mb-20 text-balance mask-reveal">
              Bridging <br /> clinical depth <br />
              <span className="text-accent italic font-light">and digital scale.</span>
            </h1>

            <ScrollReveal delay={0.4} distance={20} className="max-w-2xl">
              <p className="text-2xl md:text-3xl text-muted-foreground leading-relaxed mb-24 font-light">
                Implementation specialist driving digital operations and AI adoption through the lens of frontline clinical experience.
              </p>
              <div className="flex gap-16 items-center">
                <Link
                  href="/contact"
                  className="group flex items-center gap-6 text-2xl font-bold tracking-tight text-foreground link-underline pb-1"
                >
                  Initiate Dialogue
                  <ArrowRight className="opacity-40 group-hover:translate-x-4 transition-transform text-accent" />
                </Link>
              </div>
            </ScrollReveal>
          </motion.div>

          <ScrollReveal direction="right" distance={100} className="relative aspect-[4/5] rounded-[4rem] overflow-hidden glass-vivid p-2 floating">
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent z-10" />
            <Image
              src="/assets/bridge.png"
              alt="Bridge Illustration"
              fill
              className="object-cover transition-transform duration-[5s] hover:scale-110"
              priority
            />
            {/* Visual Callout */}
            <div className="absolute bottom-12 left-12 right-12 z-20 space-y-4">
              <div className="h-[1px] w-12 bg-accent" />
              <p className="text-sm font-bold uppercase tracking-widest text-foreground/80">Interface: Identity</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* The Impact Matrix - High Contrast Grid */}
      <section className="py-80 px-6 lg:px-24 relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-[1fr_2.5fr] gap-32 mb-48">
            <ScrollReveal direction="left" className="sticky top-40">
              <p className="text-[11px] font-bold tracking-[0.4em] uppercase text-accent-secondary mb-10">Verification</p>
              <h2 className="text-5xl md:text-8xl font-medium tracking-tight leading-[0.9] mb-12">
                Proven <br /> Discrete <br /> <span className="text-accent-secondary italic">Impact.</span>
              </h2>
              <p className="text-xl text-muted-foreground font-light leading-relaxed max-w-sm">
                Specific architectural successes in healthcare operations and agentic deployment.
              </p>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 gap-10">
              {impacts.map((impact, i) => (
                <ScrollReveal
                  key={impact.title}
                  direction="up"
                  delay={i * 0.1}
                  className="group relative h-full p-2"
                >
                  <div className="h-full p-16 rounded-[4rem] glass-vivid hover:bg-white/[0.05] transition-all duration-1000 flex flex-col justify-between group-hover:-translate-y-4">
                    <div className="space-y-12">
                      <div className="flex justify-between items-start">
                        <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:border-accent transition-all duration-700">
                          {impact.icon}
                        </div>
                        <span className="text-[11px] font-bold tracking-widest uppercase text-accent opacity-30 group-hover:opacity-100 transition-opacity">{impact.tag}</span>
                      </div>
                      <h3 className="text-4xl font-medium tracking-tight leading-none group-hover:text-accent transition-colors duration-700">{impact.title}</h3>
                      <p className="text-2xl text-muted-foreground font-light leading-relaxed">
                        {impact.details}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Narrative Break - Immersive Flow Illustration */}
      <section className="py-72 relative border-y border-white/10 bg-white/[0.01]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-24">
          <div className="grid lg:grid-cols-[2fr_1.5fr] gap-32 items-center">
            <ScrollReveal direction="up" className="space-y-16">
              <h2 className="text-5xl md:text-[110px] font-medium tracking-tighter leading-[0.85] text-balance">
                The bridge <br /> is built on <br /> <span className="opacity-30">human adoption.</span>
              </h2>
              <p className="text-3xl font-light text-muted-foreground leading-relaxed max-w-2xl text-balance">
                I understand the friction of high-stakes clinical environments because I have lived in them. Care does not happen without technical stability and user confidence.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="right" className="relative aspect-square rounded-[4rem] overflow-hidden glass-vivid p-1">
              <Image
                src="/assets/flow.png"
                alt="System Flow"
                fill
                className="object-cover opacity-80 hover:opacity-100 transition-opacity duration-1000"
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Multi-Layered Skill Stack */}
      <section className="py-80 px-6 lg:px-24 relative">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex justify-between items-end mb-40 border-b border-white/10 pb-20">
            <ScrollReveal direction="up" className="space-y-6">
              <p className="text-[11px] font-bold tracking-[0.5em] uppercase text-accent">Capability Matrix</p>
              <h2 className="text-7xl md:text-[140px] font-medium tracking-tight">Stack.</h2>
            </ScrollReveal>
            <ScrollReveal direction="right" className="text-right pb-4">
              <span className="text-2xl font-light opacity-30 italic leading-none whitespace-nowrap">Technical x Clinical</span>
            </ScrollReveal>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10">
            {[
              { cat: 'Clinical Depth', items: ['MSc PT (Distinction)', 'Systemic Evaluation', 'Patient Adherence Strategy'], icon: <HeartPulse className="w-5 h-5 text-accent" /> },
              { cat: 'Agentic DevOps', items: ['Claude Code', 'Google Antigravity', 'CI/CD Stability'], icon: <Binary className="w-5 h-5 text-accent-secondary" /> },
              { cat: 'Ops Architecture', items: ['Process Mapping', 'SOP Development', 'Root Cause Audit'], icon: <Workflow className="w-5 h-5 text-accent" /> },
              { cat: 'Technical GTM', items: ['Local SEO technical', 'Jane App Integrations', 'Conversion Mapping'], icon: <Sparkles className="w-5 h-5 text-accent-secondary" /> },
            ].map((skill, i) => (
              <ScrollReveal
                key={skill.cat}
                direction="up"
                delay={i * 0.1}
                className="bg-[#080a0c] p-16 space-y-12 hover:bg-white/[0.03] transition-all duration-700"
              >
                <div className="flex justify-between items-start">
                  <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                    {skill.icon}
                  </div>
                  <span className="text-5xl font-medium tracking-tighter text-white/5 italic">0{i + 1}</span>
                </div>
                <div className="space-y-8">
                  <h4 className="text-2xl font-bold uppercase tracking-[0.2em] text-accent/80">{skill.cat}</h4>
                  <ul className="space-y-4">
                    {skill.items.map(item => (
                      <li key={item} className="text-xl font-light text-muted-foreground flex items-center gap-4">
                        <div className="w-1 h-1 rounded-full bg-accent opacity-40" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Vivid CTA Section */}
      <section className="py-96 px-6 relative flex flex-col items-center justify-center text-center">
        <div className="glow-blob opacity-40 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <ScrollReveal direction="up" className="z-10 space-y-24">
          <h2 className="text-7xl md:text-[180px] font-medium tracking-tight mb-24 leading-[0.75] text-balance">
            Design <br /> <span className="text-accent italic font-light">The Future.</span>
          </h2>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-10 text-4xl lg:text-5xl font-bold tracking-tight text-foreground link-underline pb-4 px-12"
          >
            Initiate Conversation
            <ArrowRight size={80} className="opacity-10 group-hover:opacity-100 group-hover:translate-x-8 transition-all duration-1000 text-accent" />
          </Link>
        </ScrollReveal>
      </section>
    </div>
  );
}
