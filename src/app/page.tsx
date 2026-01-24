'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Sparkles, Binary, HeartPulse, Workflow } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

const impacts = [
  {
    title: 'Clinical Operations Implementation',
    details: 'Piloted and established SOPs for Heidi AI across multidisciplinary regional teams. Eliminated documentation bottlenecks by bridging the gap between software capability and clinician trust.',
    tag: 'Implementation',
    icon: <Sparkles className="w-5 h-5 opacity-40" />
  },
  {
    title: 'Agentic Workflow DevOps',
    details: 'Architected automated drafting systems using Claude Code and Google Antigravity. Reduction of baseline operational time by 85% through custom modular automation logic.',
    tag: 'Automation',
    icon: <Binary className="w-5 h-5 opacity-40" />
  },
  {
    title: 'Patient Discovery Infrastructure',
    details: 'Building high-performance acquisition streams with SEO-first architecture and Jane App integration. Linking clinical visibility to measurable patient conversion.',
    tag: 'SOP Design',
    icon: <HeartPulse className="w-5 h-5 opacity-40" />
  },
  {
    title: 'Process Architecture',
    details: 'Designing multidisciplinary clinical booking and referral pathways. Operationalizing clinical excellence through repeatable, automated system architecture.',
    tag: 'Operations',
    icon: <Workflow className="w-5 h-5 opacity-40" />
  }
];

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -40]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <div ref={containerRef} className="relative">
      {/* High-Fidelity Hero */}
      <section className="relative min-h-[90vh] flex items-center px-6 lg:px-20 pt-32 pb-20 overflow-hidden">
        <div className="section-container grid lg:grid-cols-[1.2fr_0.8fr] gap-24 items-center">
          <motion.div style={{ y: heroY, opacity: heroOpacity }} className="z-10">
            <ScrollReveal direction="none" blur={20} duration={1.5} className="mb-8">
              <span className="text-[10px] font-bold tracking-[0.5em] uppercase opacity-30">
                Frontline Implementation Specialist
              </span>
            </ScrollReveal>

            <ScrollReveal direction="up" distance={60} delay={0.2}>
              <h1 className="text-6xl md:text-8xl lg:text-[110px] font-medium leading-[0.85] tracking-tight mb-16 text-balance">
                The bridge <br />
                between care <br />
                {"&"} <span className="opacity-30 italic font-light font-serif">digital scale.</span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.4} blur={15} distance={20} className="max-w-2xl">
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-20 font-light text-balance">
                Driving digital operations and AI adoption through the lens of high-stakes clinical experience. MSc Physiotherapy with Distinction.
              </p>
              <div className="flex gap-16 items-center">
                <Link
                  href="/contact"
                  className="group flex items-center gap-6 text-xl font-bold tracking-tight text-foreground link-underline pb-1"
                >
                  Initiate Conversation
                  <ArrowRight size={24} className="opacity-20 group-hover:translate-x-4 transition-transform duration-700" />
                </Link>
              </div>
            </ScrollReveal>
          </motion.div>

          <ScrollReveal direction="right" blur={30} distance={100} className="relative aspect-square lg:aspect-[4/5] rounded-[4rem] overflow-hidden glass-frosted p-2 gentle-float">
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent z-10" />
            <Image
              src="/assets/healthcare.png"
              alt="Clinical Care Integration"
              fill
              className="object-cover opacity-70 hover:opacity-100 transition-all duration-[5s]"
              priority
            />
          </ScrollReveal>
        </div>
      </section>

      {/* Impact Dossier: Staggered Entrance */}
      <section className="py-64 lg:py-80 border-t border-white/5 bg-white/[0.01]">
        <div className="section-container">
          <div className="flex flex-col lg:flex-row justify-between items-end mb-48 gap-12">
            <ScrollReveal direction="up" blur={20}>
              <p className="text-[10px] font-bold tracking-[0.4em] uppercase opacity-30 mb-8">Verification</p>
              <h2 className="text-7xl md:text-9xl font-medium tracking-tighter leading-none">
                Discrete <br /> Result.
              </h2>
            </ScrollReveal>
            <ScrollReveal direction="right" blur={10} className="max-w-sm text-right pb-4 lg:border-r border-white/10 lg:pr-12">
              <p className="text-xl text-muted-foreground font-light italic leading-relaxed">
                Measurable successes in clinical operations and automation architecture.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {impacts.map((impact, i) => (
              <ScrollReveal
                key={impact.title}
                direction="up"
                delay={i * 0.15}
                blur={15}
                className="group relative h-full"
              >
                <div className="h-full p-16 rounded-[4rem] glass-frosted hover:bg-white/[0.04] transition-all duration-1000 flex flex-col justify-between group-hover:-translate-y-4">
                  <div className="space-y-12">
                    <div className="flex justify-between items-start">
                      <div className="w-14 h-14 rounded-3xl bg-white/[0.02] border border-white/5 flex items-center justify-center group-hover:border-foreground/20 transition-all duration-1000">
                        {impact.icon}
                      </div>
                      <span className="text-[10px] font-bold tracking-widest uppercase opacity-20">{impact.tag}</span>
                    </div>
                    <h3 className="text-4xl font-medium tracking-tight group-hover:text-accent transition-colors duration-1000">{impact.title}</h3>
                    <p className="text-2xl text-muted-foreground font-light leading-relaxed">
                      {impact.details}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Narrative Break: High-Fi visual */}
      <section className="py-72 relative border-y border-white/10 overflow-hidden">
        <div className="section-container">
          <div className="grid lg:grid-cols-[2fr_1.5fr] gap-32 items-center">
            <ScrollReveal direction="up" blur={25} className="space-y-16">
              <h2 className="text-5xl md:text-[110px] font-medium tracking-tighter leading-[0.85] text-balance">
                Adoption <br /> is the result.
              </h2>
              <p className="text-3xl font-light text-muted-foreground leading-relaxed max-w-2xl">
                I understand the friction of high-stakes clinical environments because I have lived in them. Care does not happen without technical stability and user confidence.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="right" blur={40} className="relative aspect-square rounded-[4rem] overflow-hidden glass-frosted p-1">
              <Image
                src="/assets/devops.png"
                alt="System Flow"
                fill
                className="object-cover opacity-70 hover:opacity-100 transition-opacity duration-[4s]"
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Closing Statement */}
      <section className="py-96 text-center relative">
        <ScrollReveal direction="up" blur={30} className="z-10 relative space-y-24">
          <h2 className="text-8xl md:text-[180px] font-medium tracking-tighter mb-24 leading-[0.75]">
            Build <br />
            <span className="opacity-10 italic font-light font-serif">the Result.</span>
          </h2>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-12 text-5xl font-light link-underline pb-4 px-12"
          >
            Initiate Conversation
            <ArrowRight size={72} className="opacity-10 group-hover:opacity-100 group-hover:translate-x-4 transition-all duration-1000" />
          </Link>
        </ScrollReveal>
      </section>
    </div>
  );
}
