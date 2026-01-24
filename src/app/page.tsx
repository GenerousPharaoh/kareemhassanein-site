'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

const impacts = [
  {
    title: 'Clinical AI Adoption',
    description: 'Spearheaded the evaluation and rollout of Heidi AI for a multi-specialty clinical team. Established SOPs that ensured 100% clinician adoption and immediate documentation relief.',
  },
  {
    title: 'Operational Automation',
    description: 'Engineered agentic workflows using Claude Code and Google Antigravity to automate legal document drafting, reducing baseline template generation time by 85%.',
  },
  {
    title: 'Digital Patient Pathways',
    description: 'Architected SEO-focused healthcare platforms with seamless Jane App integration, prioritizing patient conversion and local search visibility across 55+ diagnostic categories.',
  },
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
      {/* Narrative Hero */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-32 pb-20 overflow-hidden">
        <motion.div
          style={{ opacity: heroOpacity }}
          className="max-w-5xl mx-auto z-10"
        >
          <ScrollReveal direction="none" className="mb-12">
            <span className="text-[10px] font-bold tracking-[0.4em] uppercase opacity-30">
              The Intersection of Practice & Procedure
            </span>
          </ScrollReveal>

          <h1 className="text-5xl md:text-7xl lg:text-[110px] font-medium leading-[0.9] tracking-[-0.04em] mb-16 text-balance mask-reveal">
            Bridging clinical reality <br />
            <span className="opacity-40 font-light italic">and digital capability.</span>
          </h1>

          <ScrollReveal delay={0.4} distance={20} className="max-w-2xl">
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-20 font-light text-balance">
              Implementation specialist driving digital operations and AI adoption through the lens of frontline clinical experience.
            </p>
          </ScrollReveal>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex gap-12 items-center"
          >
            <Link
              href="/contact"
              className="text-lg font-medium link-underline pb-1"
            >
              Initiate Dialogue
            </Link>
            <Link
              href="/about"
              className="text-lg font-medium opacity-40 hover:opacity-100 transition-opacity duration-500"
            >
              Identity
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* The Perspective - Identity Statement */}
      <section className="py-64 px-6 border-t border-white/[0.02]">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-32 items-start">
            <ScrollReveal direction="up" className="sticky top-40">
              <h2 className="text-4xl md:text-6xl font-medium tracking-tighter leading-[1.1] mb-12">
                A frontline <br /> perspective on <br /> digital scale.
              </h2>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2} className="space-y-12 text-2xl text-muted-foreground leading-relaxed font-light">
              <p>
                I understand the friction of high-stakes clinical environments. I know what happens when technology gets in the way of care.
              </p>
              <p>
                My work is about removing that friction—building systems that don&apos;t just exist, but get <span className="text-foreground">adopted</span>. I bridge the gap between technical possibility and human reality.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Discrete Impact - Project Stories */}
      <section className="py-64 px-6 bg-card/10">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal direction="up" className="mb-32">
            <p className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-30 mb-8">Selected Impact</p>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-16">
            {impacts.map((impact, i) => (
              <ScrollReveal
                key={impact.title}
                direction="up"
                delay={i * 0.1}
                className="group"
              >
                <div className="space-y-8">
                  <div className="h-[1px] w-8 bg-foreground/10 group-hover:w-full transition-all duration-1000" />
                  <h3 className="text-3xl font-medium tracking-tight group-hover:text-accent transition-colors duration-500">
                    {impact.title}
                  </h3>
                  <p className="text-lg text-muted-foreground font-light leading-relaxed">
                    {impact.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Strategic Stack - Skills */}
      <section className="py-64 px-6 border-t border-white/[0.02]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-32 gap-12">
            <ScrollReveal direction="left">
              <h2 className="text-4xl md:text-7xl font-medium tracking-tighter">
                Strategic Stack.
              </h2>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <p className="text-xl text-muted-foreground font-light max-w-sm text-right">
                Synthesizing technical implementation, operational excellence, and user enablement.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 border-l border-white/[0.02] pl-12">
            {[
              { label: 'Implementation', items: ['AI Adoption', 'API Integration', 'GitHub / Vercel'] },
              { label: 'Automation', desc: 'Claude Code', items: ['Workflow Mapping', 'Agentic DevOps'] },
              { label: 'Excellence', items: ['SOP Development', 'Compliance', 'Audit'] },
              { label: 'Enablement', items: ['Stakeholder Training', 'Change Management'] },
            ].map((cat, i) => (
              <ScrollReveal
                key={cat.label}
                direction="up"
                delay={i * 0.05}
                className="space-y-6"
              >
                <p className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-20">{cat.label}</p>
                <ul className="space-y-3">
                  {cat.items.map(item => (
                    <li key={item} className="text-lg font-light opacity-50 hover:opacity-100 transition-opacity">
                      {item}
                    </li>
                  ))}
                </ul>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Closing Statement */}
      <section className="py-80 px-6 text-center">
        <ScrollReveal direction="up">
          <h2 className="text-6xl md:text-9xl font-medium tracking-tighter mb-20 leading-[0.8] text-balance">
            Let&apos;s build <br />
            <span className="opacity-30 italic font-light">better systems.</span>
          </h2>
          <Link
            href="/contact"
            className="text-2xl font-light link-underline pb-2"
          >
            Start a project
          </Link>
        </ScrollReveal>
      </section>
    </div>
  );
}
