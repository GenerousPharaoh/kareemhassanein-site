'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import TextReveal from '@/components/TextReveal';
import ProjectList from '@/components/ProjectList';
import ParallaxImage from '@/components/ParallaxImage';
import CharReveal from '@/components/CharReveal';
import Link from 'next/link';
import { useRef } from 'react';

const metrics = [
  { label: 'Annual Billings (as clinician)', value: '$600K+' },
  { label: 'Doc Generation Time Saved', value: '85%' },
  { label: 'Team Adoption (Heidi AI)', value: '100%' },
];

export default function Home() {
  const transitionRef = useRef(null);

  return (
    <main className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative px-6 md:px-12 pt-40 md:pt-32">

        {/* Cinematic Background Layer */}
        <div className="absolute inset-0 z-0">
          <ParallaxImage
            src="/images/orchestrating.png"
            alt="Cinematic Core"
            className="w-full h-full opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
        </div>

        <div className="relative z-10 w-full max-w-[1400px] h-full flex flex-col justify-center py-20">
          <div className="grid lg:grid-cols-1 items-center justify-center text-center">

            {/* Text Content */}
            <div className="space-y-12 mx-auto max-w-4xl">
              <ScrollReveal direction="up" distance={20} blur={10}>
                <span className="inline-block text-sm font-medium tracking-[0.4em] uppercase opacity-40 mb-4 border border-white/10 px-6 py-2 rounded-full backdrop-blur-sm shadow-inner mt-10 md:mt-0">
                  Implementation Consulting
                </span>
              </ScrollReveal>

              <motion.h1 variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="text-5xl md:text-7xl lg:text-8xl font-medium leading-[0.9] tracking-tighter mb-16 text-balance">
                I make software <CharReveal delay={0.6} className="py-2 text-accent italic font-serif">work</CharReveal> <br />
                for the people using it.
              </motion.h1>

              <div className="max-w-2xl mx-auto">
                <TextReveal
                  text="Most technology fails at adoption, not installation. I help healthcare practices and law firms get their tools to actually work. Implementation strategy, workflow design, and the operational details that determine whether software gets used or abandoned."
                  className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed"
                  delay={0.8}
                />
              </div>

              {/* Metrics Row */}
              <div className="relative grid grid-cols-3 gap-8 py-10 border-y border-white/5 max-w-3xl mx-auto overflow-hidden group">
                <div className="absolute inset-0 z-0 opacity-[0.05] grayscale group-hover:opacity-10 transition-opacity duration-700 pointer-events-none">
                  <ParallaxImage src="/images/image-2.png" alt="Technical Leverage" className="w-full h-full object-cover" />
                </div>
                {metrics.map((m) => (
                  <div key={m.label} className="space-y-2 relative z-10">
                    <p className="text-4xl md:text-5xl font-serif italic text-accent">{m.value}</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest opacity-30">{m.label}</p>
                  </div>
                ))}
              </div>

              <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }} className="flex gap-16 items-center justify-center pt-8">
                <Link
                  href="/contact"
                  className="group flex items-center gap-10 text-2xl font-bold tracking-tight text-foreground link-underline pb-1 transition-all"
                >
                  Let&apos;s talk
                  <ArrowRight size={32} className="opacity-20 group-hover:translate-x-4 transition-transform duration-1000" />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Immersive Scroll Transition Section */}
      <section ref={transitionRef} className="h-[80vh] w-full relative overflow-hidden flex items-center justify-center py-24 border-y border-white/5">
        <ParallaxImage
          src="/images/chaos-to-order.png"
          alt="Chaos to Order"
          className="absolute inset-0 w-full h-full opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none" />

        <div className="relative z-10 text-center px-6">
          <ScrollReveal direction="up">
            <h2 className="text-4xl md:text-7xl lg:text-8xl font-medium tracking-tighter leading-[1.1] opacity-90">
              The problem isn&apos;t <br />
              <span className="text-accent italic font-serif">the software.</span>
            </h2>
            <p className="mt-8 text-xl md:text-3xl font-light text-muted-foreground max-w-2xl mx-auto tracking-tight">
              It&apos;s how it fits into the way people already work.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Selected Projects */}
      <section className="py-32 relative z-10 w-full px-6 md:px-12">
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none grayscale blur-xl">
          <ParallaxImage src="/images/order.png" alt="Process Texture" className="w-full h-full object-cover" />
        </div>

        <div className="relative z-10">
          <ScrollReveal direction="up" distance={40} blur={20}>
            <div className="flex items-end justify-between mb-24 border-b border-white/10 pb-12 hover:border-white/20 transition-colors duration-700">
              <div className="space-y-4">
                <span className="text-[10px] font-bold tracking-[1em] uppercase opacity-30">Portfolio</span>
                <h2 className="text-4xl md:text-6xl font-medium tracking-tighter">Recent Work</h2>
              </div>
            </div>
          </ScrollReveal>

          <ProjectList />
        </div>
      </section>

    </main>
  );
}
