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

  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -30]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  return (
    <div ref={containerRef} className="relative">
      {/* Narrative Hero: Sophisticated & Direct */}
      <section className="relative min-h-[90vh] flex items-center px-6 lg:px-20 pt-40 pb-20 overflow-hidden">
        <div className="section-container grid lg:grid-cols-[1.3fr_0.7fr] gap-24 items-center">
          <motion.div style={{ y: heroY, opacity: heroOpacity }} className="z-10">
            <ScrollReveal direction="none" className="mb-8">
              <span className="text-[10px] font-bold tracking-[0.4em] uppercase opacity-30">
                Frontline Implementation Specialist
              </span>
            </ScrollReveal>

            <h1 className="text-6xl md:text-8xl lg:text-[110px] font-medium leading-[0.85] tracking-tight mb-16 text-balance mask-reveal">
              The bridge <br />
              between care <br />
              {"&"} <span className="italic font-light opacity-40">digital scale.</span>
            </h1>

            <ScrollReveal delay={0.4} distance={20} className="max-w-2xl">
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-20 font-light text-balance">
                Driving digital operations and AI adoption through the lens of high-stakes clinical experience. MSc Physiotherapy with Distinction.
              </p>
              <div className="flex gap-16 items-center">
                <Link
                  href="/contact"
                  className="group flex items-center gap-6 text-xl font-bold tracking-tight text-foreground link-underline pb-1"
                >
                  Initiate Conversation
                  <ArrowRight size={24} className="opacity-20 group-hover:translate-x-4 transition-transform" />
                </Link>
              </div>
            </ScrollReveal>
          </motion.div>

          <ScrollReveal direction="right" distance={60} className="relative aspect-square lg:aspect-[4/5] rounded-[3rem] overflow-hidden glass-moonlight p-2 gentle-float">
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent z-10" />
            <Image
              src="/assets/healthcare.png"
              alt="Clinical Care Integration"
              fill
              className="object-cover opacity-80 hover:opacity-100 transition-all duration-[4s]"
              priority
            />
          </ScrollReveal>
        </div>
      </section>

      {/* Narrative: The Implementation Gap */}
      <section className="py-64 lg:py-80 bg-white/[0.01] border-y border-white/5">
        <div className="section-container">
          <div className="max-w-4xl mx-auto text-center space-y-24">
            <ScrollReveal direction="up">
              <h2 className="text-5xl md:text-7xl font-medium tracking-tight leading-tight text-balance">
                Adoption is the only <br />
                <span className="opacity-30 italic font-light">metric that matters.</span>
              </h2>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.2} className="max-w-2xl mx-auto">
              <p className="text-2xl text-muted-foreground font-light leading-relaxed">
                I understand the friction of high-stakes environments because I have lived in them. Care does not happen without technical stability and clinician trust. I build the systems that Advance both.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Impact Dossier: Discrete Results */}
      <section className="py-64 lg:py-80">
        <div className="section-container">
          <div className="flex flex-col lg:flex-row justify-between items-end mb-40 gap-12">
            <ScrollReveal direction="up" className="space-y-4">
              <p className="text-[10px] font-bold tracking-[0.4em] uppercase opacity-30">Verification</p>
              <h2 className="text-7xl md:text-9xl font-medium tracking-tighter leading-none">
                Discrete <br /> Result.
              </h2>
            </ScrollReveal>
            <ScrollReveal direction="right" className="max-w-sm text-right pb-4 lg:border-r border-white/10 lg:pr-12">
              <p className="text-xl text-muted-foreground font-light italic leading-relaxed">
                Measurable successes in clinical operations and automation architecture.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid md:grid-cols-2 gap-px bg-white/10 border border-white/10 overflow-hidden rounded-[4rem]">
            {impacts.map((impact, i) => (
              <ScrollReveal
                key={impact.title}
                direction="up"
                delay={i * 0.1}
                className="bg-[#10141d] p-16 space-y-12 hover:bg-white/[0.02] transition-all duration-1000 group"
              >
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-center group-hover:border-foreground/20 transition-colors duration-1000">
                    {impact.icon}
                  </div>
                  <span className="text-[10px] font-bold tracking-widest uppercase opacity-20">{impact.tag}</span>
                </div>
                <div className="space-y-8">
                  <h3 className="text-4xl font-medium tracking-tight group-hover:text-accent transition-colors duration-1000">{impact.title}</h3>
                  <p className="text-2xl text-muted-foreground font-light leading-relaxed">
                    {impact.details}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Closing Statement */}
      <section className="py-80 lg:py-96 text-center relative flex flex-col items-center">
        <ScrollReveal direction="up" className="z-10 relative space-y-24">
          <h2 className="text-8xl md:text-[180px] font-medium tracking-tighter mb-24 leading-[0.75]">
            Build <br />
            <span className="opacity-30 italic font-light">The Result.</span>
          </h2>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-12 text-4xl font-light link-underline pb-4 px-12"
          >
            Initiate Conversation
            <ArrowRight size={64} className="opacity-10 group-hover:opacity-100 group-hover:translate-x-4 transition-all duration-1000" />
          </Link>
        </ScrollReveal>
      </section>
    </div>
  );
}
