'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Sparkles, Binary, HeartPulse, Workflow, ArrowUpRight } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

const impacts = [
  {
    title: 'Endorphins Health',
    details: 'Piloted and established SOPs for Heidi AI across multidisciplinary regional teams. Eliminated documentation bottlenecks by bridging the gap between software capability and clinician trust.',
    tag: 'Strategy',
    href: 'https://www.endorphinshealth.com',
    icon: <Sparkles className="w-5 h-5 opacity-40" />
  },
  {
    title: 'Kinetika RePhysio',
    details: 'Architected automated drafting systems using Claude Code and Google Antigravity platforms. Reduction of baseline operational time by 85% through custom modular automation logic.',
    tag: 'Implementation',
    href: 'https://www.kinetikarephysio.com',
    icon: <Workflow className="w-5 h-5 opacity-40" />
  },
  {
    title: 'Clinical AI Selection & Rollout',
    details: 'Built patient acquisition infrastructure across 6 specialties. Architected multi-provider Jane App booking & referral logic and configured local SEO technical architecture.',
    tag: 'Care Ops',
    icon: <Binary className="w-5 h-5 opacity-40" />
  },
  {
    title: 'Process Architecture Design',
    details: 'Designing multidisciplinary clinical booking and referral pathways. Operationalizing clinical excellence through repeatable, automated system architecture.',
    tag: 'Architecture',
    icon: <HeartPulse className="w-5 h-5 opacity-40" />
  }
];

function TiltImage({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`relative rounded-[3.5rem] overflow-hidden glass-nanobanana ${className}`}
    >
      <div
        style={{ transform: "translateZ(75px)", transformStyle: "preserve-3d" }}
        className="absolute inset-0 z-10 bg-gradient-to-t from-background/80 via-transparent to-transparent pointer-events-none"
      />
      <motion.div style={{ transform: "translateZ(50px)" }} className="relative aspect-square lg:aspect-[4/5] w-full">
        <Image src={src} alt={alt} fill className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-[2s]" />
      </motion.div>
    </motion.div>
  );
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  return (
    <div ref={containerRef} className="relative">
      {/* Hyper-Premium Hero */}
      <section className="relative min-h-[90vh] flex items-center px-6 lg:px-20 pt-32 pb-20 overflow-hidden perspective-3000">
        <div className="section-container grid lg:grid-cols-[1.25fr_0.75fr] gap-32 items-center">
          <motion.div style={{ opacity: heroOpacity }} className="z-10">
            <ScrollReveal direction="none" blur={25} duration={1.8} className="mb-10">
              <span className="text-[10px] font-bold tracking-[0.6em] uppercase opacity-40">
                Frontline Implementation Specialist
              </span>
            </ScrollReveal>

            <ScrollReveal direction="up" distance={60} blur={20} delay={0.2}>
              <h1 className="text-6xl md:text-8xl lg:text-[115px] font-medium leading-[0.85] tracking-tight mb-16 text-balance">
                The bridge <br />
                between care <br />
                {"&"} <span className="opacity-40 italic font-light font-serif">outcome.</span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.4} blur={15} distance={30} className="max-w-2xl">
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-24 font-light text-balance border-l border-white/5 pl-12 italic">
                Driving digital operations and AI adoption through the lens of high-stakes clinical experience. MSc Physiotherapy with Distinction.
              </p>
              <div className="flex gap-16 items-center">
                <Link
                  href="/contact"
                  className="group flex items-center gap-8 text-xl font-bold tracking-tight text-foreground link-underline pb-1"
                >
                  Initiate Dialogue
                  <ArrowRight size={24} className="opacity-20 group-hover:translate-x-4 transition-transform duration-700" />
                </Link>
              </div>
            </ScrollReveal>
          </motion.div>

          <ScrollReveal direction="right" blur={40} distance={100} delay={0.3} className="group">
            <TiltImage src="/assets/n_synergy.png" alt="Clinical Synergy" />
          </ScrollReveal>
        </div>
      </section>

      {/* Project Matrix: High Impact Narrative */}
      <section className="py-64 lg:py-80 border-t border-white/5 bg-white/[0.01] relative overflow-hidden">
        <div className="section-container">
          <div className="flex flex-col lg:flex-row justify-between items-end mb-48 gap-12">
            <ScrollReveal direction="up" blur={20}>
              <p className="text-[10px] font-bold tracking-[0.5em] uppercase opacity-30 mb-8">Clinical Success</p>
              <h2 className="text-7xl md:text-9xl font-medium tracking-tighter leading-none">
                Discrete <br /> Impact.
              </h2>
            </ScrollReveal>
            <ScrollReveal direction="right" blur={10} className="max-w-sm text-right pb-4 lg:border-r border-white/10 lg:pr-12">
              <p className="text-xl text-muted-foreground font-light italic leading-relaxed">
                Measurable successes in clinical operations and agentic architecture.
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
                className="group relative h-full flex flex-col"
              >
                <div className="h-full p-20 rounded-[4rem] glass-nanobanana hover:bg-white/[0.04] transition-all duration-1000 flex flex-col justify-between group-hover:-translate-y-4">
                  <div className="space-y-12">
                    <div className="flex justify-between items-start">
                      <div className="w-14 h-14 rounded-3xl bg-white/[0.01] border border-white/10 flex items-center justify-center group-hover:border-foreground/20 transition-all duration-1000">
                        {impact.icon}
                      </div>
                      <span className="text-[10px] font-bold tracking-widest uppercase opacity-20">{impact.tag}</span>
                    </div>
                    <div className="space-y-6">
                      <div className="flex items-center justify-between group/title">
                        <h3 className="text-4xl font-medium tracking-tight group-hover:text-accent transition-colors duration-1000">{impact.title}</h3>
                        {impact.href && (
                          <a
                            href={impact.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="opacity-0 group-hover:opacity-100 group-hover:translate-x-4 transition-all duration-1000"
                          >
                            <ArrowUpRight className="text-accent w-6 h-6" />
                          </a>
                        )}
                      </div>
                      <p className="text-2xl text-muted-foreground font-light leading-relaxed">
                        {impact.details}
                      </p>
                    </div>
                  </div>
                  {impact.href && (
                    <div className="pt-12 mt-12 border-t border-white/5">
                      <a
                        href={impact.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-20 group-hover:opacity-100 group-hover:text-accent transition-all flex items-center gap-4"
                      >
                        Visit Portal <ArrowRight size={12} />
                      </a>
                    </div>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Narrative Break: Implementation & Workflow */}
      <section className="py-80 relative border-y border-white/10 overflow-hidden bg-white/[0.005]">
        <div className="section-container">
          <div className="grid lg:grid-cols-[2fr_1.5fr] gap-32 items-center">
            <ScrollReveal direction="up" blur={30} className="space-y-20">
              <h2 className="text-5xl md:text-[110px] font-medium tracking-tighter leading-[0.85] text-balance">
                Care <br /> {"&"} Workflow.
              </h2>
              <p className="text-3xl font-light text-muted-foreground leading-relaxed max-w-2xl italic">
                I understand the friction of high-stakes clinical environments because I have lived in them. Technical stability is the prerequisite for clinical care.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="right" blur={40} delay={0.3} className="group">
              <TiltImage src="/assets/n_implementation.png" alt="Clinical Implementation Details" className="aspect-square" />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Final Call */}
      <section className="py-96 text-center relative flex flex-col items-center">
        <ScrollReveal direction="up" blur={40}>
          <h2 className="text-8xl md:text-[180px] font-medium tracking-tighter mb-24 leading-[0.75]">
            Build <br />
            <span className="opacity-10 italic font-light font-serif">outcome.</span>
          </h2>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-12 text-5xl font-light link-underline pb-4 px-12 transition-all"
          >
            Initiate Conversation
            <ArrowRight size={72} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-6 transition-all duration-[1.5s]" />
          </Link>
        </ScrollReveal>
      </section>
    </div>
  );
}
