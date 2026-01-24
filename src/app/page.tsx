'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Sparkles, Binary, HeartPulse, Workflow } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

const impacts = [
  {
    title: 'Clinical AI Adoption',
    details: 'Piloted and established SOPs for Heidi AI across multi-specialty clinical teams. Bridging the gap between software capability and clinician adoption to eliminate documentation bottlenecks.',
    tag: 'Implementation',
    icon: <Sparkles className="w-5 h-5 opacity-40" />
  },
  {
    title: 'Agentic Workflow DevOps',
    details: 'Architected custom automated legal drafting workflows using Claude Code and Google Antigravity platforms, reducing baseline template generation time by 85%.',
    tag: 'Automation',
    icon: <Binary className="w-5 h-5 opacity-40" />
  },
  {
    title: 'Digital Patient Pathways',
    details: 'Building high-performance patient acquisition streams with SEO-first architecture and Jane App integration. Linking clinical visibility to patient conversion.',
    tag: 'Infrastructure',
    icon: <HeartPulse className="w-5 h-5 opacity-40" />
  },
  {
    title: 'Process Architecture',
    details: 'Redesigning multidisciplinary clinic booking flows and referral pathways. Operationalizing clinical excellence through repeatable system architecture.',
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

  const heroScale = useTransform(scrollYProgress, [0, 0.1], [1, 1.05]);

  return (
    <div ref={containerRef} className="relative">
      {/* Narrative Hero with Identity Image */}
      <section className="relative min-h-screen flex items-center px-6 lg:px-16 pt-32 pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-24 items-center">
          <motion.div style={{ scale: heroScale }} className="z-10">
            <ScrollReveal direction="none" className="mb-10">
              <span className="text-[10px] font-bold tracking-[0.5em] uppercase opacity-40">
                Identity Profile v.2026
              </span>
            </ScrollReveal>

            <h1 className="text-6xl md:text-8xl lg:text-[110px] font-medium leading-[0.9] tracking-tighter mb-16 text-balance mask-reveal">
              Bridging <br /> clinical reality <br />
              <span className="opacity-40 font-light italic text-7xl lg:text-[90px]">and digital scale.</span>
            </h1>

            <ScrollReveal delay={0.4} distance={20} className="max-w-2xl">
              <p className="text-2xl md:text-3xl text-muted-foreground leading-relaxed mb-20 font-light">
                Implementation specialist driving digital operations and AI adoption through the lens of frontline clinical experience.
              </p>
              <div className="flex gap-16 items-center">
                <Link
                  href="/contact"
                  className="text-xl font-bold tracking-tight text-foreground link-underline pb-2"
                >
                  Initiate Dialogue
                </Link>
                <Link
                  href="/about"
                  className="text-xl font-medium opacity-40 hover:opacity-100 transition-opacity"
                >
                  Identity
                </Link>
              </div>
            </ScrollReveal>
          </motion.div>

          <ScrollReveal direction="right" distance={80} className="relative aspect-square lg:aspect-[4/5] rounded-[3rem] overflow-hidden glass-organic p-1">
            <div className="absolute inset-0 bg-gradient-to-tr from-background/80 to-transparent z-10" />
            <Image
              src="/assets/bridge.png"
              alt="Bridge Illustration"
              fill
              className="object-cover transition-transform duration-[3s] hover:scale-110"
              priority
            />
          </ScrollReveal>
        </div>
      </section>

      {/* The Perspective - Expanded Narrative */}
      <section className="py-72 px-6 lg:px-16 relative border-y border-white/[0.03]">
        <div className="max-w-5xl mx-auto text-center space-y-24">
          <ScrollReveal direction="up">
            <h2 className="text-4xl md:text-7xl font-medium tracking-tighter leading-tight balance">
              Technical possibility <br />
              meets <span className="opacity-40 font-light italic">human reality.</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2} className="space-y-12 text-2xl text-muted-foreground font-light leading-relaxed max-w-3xl mx-auto">
            <p>
              I understand the frustration of high-stakes environments because I have lived in them. Care does not happen without adoption. My specialization is in the technical engagements where user friction is the primary bottleneck for ROI.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Discrete Impact - Robust Grid */}
      <section className="py-72 px-6 lg:px-16 container mx-auto">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal direction="up" className="mb-40">
            <p className="text-[10px] font-bold tracking-[0.4em] uppercase opacity-40 mb-10">Discrete Evidence</p>
            <h2 className="text-6xl md:text-9xl font-medium tracking-tighter">Impact Portfolio.</h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-16">
            {impacts.map((impact, i) => (
              <ScrollReveal
                key={impact.title}
                direction="up"
                delay={i * 0.1}
                className="group"
              >
                <div className="h-full p-16 rounded-[4rem] glass-organic hover:bg-white/[0.04] transition-all duration-1000 flex flex-col justify-between">
                  <div className="space-y-10">
                    <div className="flex items-center gap-6">
                      <div className="w-12 h-12 rounded-full border border-white/5 flex items-center justify-center opacity-40 group-hover:opacity-100 transition-opacity">
                        {impact.icon}
                      </div>
                      <span className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-20">{impact.tag}</span>
                    </div>
                    <h3 className="text-4xl font-medium tracking-tighter group-hover:text-accent transition-colors duration-700">{impact.title}</h3>
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

      {/* Capability Stack with Illustrations */}
      <section className="py-72 px-6 lg:px-16 border-t border-white/[0.03] bg-card/10">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-32 items-center">
          <div className="space-y-32">
            {[
              { label: 'Implementation', desc: 'Strategy and rollout for clinical systems like Heidi AI.' },
              { label: 'Workflow DevOps', desc: 'Engineering modular document automation via Claude Code.' },
              { label: 'Strategic Advisory', desc: 'Technical usability audits and market fit for med-tech.' }
            ].map((stack, i) => (
              <ScrollReveal
                key={stack.label}
                direction="up"
                delay={i * 0.1}
                className="space-y-6 group"
              >
                <span className="text-[10px] font-bold tracking-[0.4em] uppercase opacity-20">Capability 0{i + 1}</span>
                <h4 className="text-4xl font-medium tracking-tight group-hover:translate-x-4 transition-transform duration-700">{stack.label}</h4>
                <p className="text-xl text-muted-foreground font-light max-w-md">{stack.desc}</p>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal direction="none" className="relative aspect-square rounded-[4rem] overflow-hidden glass-organic p-1">
            <Image
              src="/assets/mapping.png"
              alt="Mapping Illustration"
              fill
              className="object-cover opacity-60 hover:opacity-100 transition-opacity duration-1000"
            />
          </ScrollReveal>
        </div>
      </section>

      {/* Closing Identity Statement */}
      <section className="py-96 px-6 text-center relative overflow-hidden">
        <ScrollReveal direction="up" className="relative z-10">
          <h2 className="text-7xl md:text-[140px] font-medium tracking-tighter mb-24 leading-[0.75] text-balance">
            Let&apos;s advance <br />
            <span className="opacity-40 italic font-light">the standard.</span>
          </h2>
          <Link
            href="/contact"
            className="group inline-flex items-center justify-center gap-6 text-3xl font-light link-underline pb-4 px-8"
          >
            Initiate Conversation
            <ArrowRight size={48} className="opacity-20 group-hover:translate-x-4 transition-transform" />
          </Link>
        </ScrollReveal>
      </section>
    </div>
  );
}
