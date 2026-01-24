'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import TextReveal from '@/components/TextReveal';
import ProjectList from '@/components/ProjectList';
import ParallaxImage from '@/components/ParallaxImage';





export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  return (
    <div ref={containerRef} className="relative">
      {/* Hyper-Premium Hero: Unified Staggered Sequence */}
      <section className="relative min-h-[90vh] flex items-center px-6 lg:px-20 pt-32 pb-20 overflow-hidden perspective-3000">
        <div className="glow-blob top-[20%] -right-[15%] opacity-[0.03]" />
        <div className="section-container">
          <ScrollReveal direction="up" distance={30} blur={20} staggerChildren={0.2} className="grid lg:grid-cols-[1fr_1fr] gap-20 lg:gap-32 items-center">
            <motion.div style={{ opacity: heroOpacity }} className="z-10">
              <motion.span variants={{ hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 0.4, scale: 1 } }} className="block text-[10px] font-bold tracking-[0.6em] uppercase mb-10">
                Implementation Specialist
              </motion.span>

              <motion.h1 variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="text-6xl md:text-8xl lg:text-[115px] font-medium leading-[0.85] tracking-tight mb-16 text-balance">
                Making <br />
                technology <br />
                <span className="opacity-40 italic font-light font-serif">work.</span>
              </motion.h1>

              <TextReveal
                text="I help organizations adopt AI tools and optimize their workflows. Background in clinical operations with an MSc in Physiotherapy."
                className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-20 font-light text-balance border-l border-white/5 pl-12 italic block max-w-2xl"
                delay={0.4}
              />

              <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }} className="flex gap-16 items-center">
                <Link
                  href="/contact"
                  className="group flex items-center gap-8 text-xl font-bold tracking-tight text-foreground link-underline pb-1"
                >
                  Get in touch
                  <ArrowRight size={24} className="opacity-20 group-hover:translate-x-4 transition-transform duration-700" />
                </Link>
              </motion.div>
            </motion.div>

            <motion.div variants={{ hidden: { opacity: 0, x: 40, filter: 'blur(30px)' }, visible: { opacity: 1, x: 0, filter: 'blur(0px)' } }} className="group">
              <ParallaxImage src="/assets/n_synergy.png" alt="Clinical Synergy" className="aspect-[4/5] w-full rounded-[2rem]" priority />
            </motion.div>
          </ScrollReveal>
        </div>
      </section>

      {/* Section Divider */}
      <div className="divider-subtle w-full" />

      {/* Project Matrix: Unified Entrance */}
      <section className="py-64 lg:py-80 bg-white/[0.01] relative overflow-hidden">
        <div className="section-container">
          <ScrollReveal direction="up" distance={30} blur={20} staggerChildren={0.1} className="w-full">
            <div className="flex flex-col lg:flex-row justify-between items-end mb-48 gap-12">
              <div className="space-y-4">
                <motion.p variants={{ hidden: { opacity: 0 }, visible: { opacity: 0.3 } }} className="text-[10px] font-bold tracking-[0.5em] uppercase mb-4">Recent Work</motion.p>
                <motion.h2 variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="text-7xl md:text-9xl font-medium tracking-tighter leading-none">
                  Real <br /> Results.
                </motion.h2>
              </div>
              <motion.div variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0 } }} className="max-w-sm text-right pb-4 lg:border-r border-white/10 lg:pr-12">
                <p className="text-xl text-muted-foreground font-light italic leading-relaxed">
                  Projects where I helped teams adopt new tools and improve how they work.
                </p>
              </motion.div>
            </div>

            <div className="flex flex-col gap-16">
              <ProjectList />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Section Divider */}
      <div className="divider-subtle w-full" />

      {/* Narrative Break: Unified Entrance */}
      <section className="py-64 lg:py-80 relative overflow-hidden bg-white/[0.005]">
        <div className="section-container">
          <ScrollReveal direction="up" distance={30} blur={25} staggerChildren={0.2} className="grid lg:grid-cols-[1fr_1.2fr] gap-20 lg:gap-32 items-center">
            <div className="space-y-16 lg:space-y-20">
              <motion.h2 variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="text-5xl md:text-8xl lg:text-[100px] font-medium tracking-tighter leading-[0.85] text-balance">
                Clinical <br /><span className="opacity-40 italic font-light font-serif">& Technical.</span>
              </motion.h2>
              <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="text-2xl lg:text-3xl font-light text-muted-foreground leading-relaxed max-w-xl italic">
                I know what it&apos;s like to be the person who has to use the tools. That perspective shapes how I approach implementation.
              </motion.p>
            </div>

            <motion.div variants={{ hidden: { opacity: 0, x: 40, filter: 'blur(30px)' }, visible: { opacity: 1, x: 0, filter: 'blur(0px)' } }} className="group">
              <ParallaxImage src="/assets/n_implementation.png" alt="Clinical Implementation Details" className="aspect-square w-full rounded-[2rem]" />
            </motion.div>
          </ScrollReveal>
        </div>
      </section>

      {/* Section Divider */}
      <div className="divider-subtle w-full" />

      {/* Closing Statement */}
      <section className="py-96 text-center relative flex flex-col items-center bg-white/[0.002]">
        <ScrollReveal direction="up" blur={30} distance={20}>
          <h2 className="text-8xl md:text-[180px] font-medium tracking-tighter mb-24 leading-[0.75]">
            Let&apos;s <br /><span className="opacity-40 italic font-light font-serif">talk.</span>
          </h2>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-12 text-5xl font-light link-underline pb-4 px-12 transition-all"
          >
            Get in touch
            <ArrowRight size={72} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-6 transition-all duration-[1.5s]" />
          </Link>
        </ScrollReveal>
      </section>
    </div>
  );
}
