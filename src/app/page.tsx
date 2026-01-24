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
  { label: 'Revenue Generated', value: '$600K+' },
  { label: 'Process Reduction', value: '85%' },
  { label: 'Clinician Adoption', value: '100%' },
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
            src="/images/%20hero-home.png"
            alt="Cinematic Core"
            className="w-full h-full opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
        </div>

        <div className="relative z-10 w-full max-w-[1800px] h-full flex flex-col justify-center py-20">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-20 lg:gap-32 items-center">

            {/* Text Content */}
            <div className="space-y-12">
              <ScrollReveal direction="up" distance={20} blur={10}>
                <span className="inline-block text-sm font-medium tracking-[0.4em] uppercase opacity-40 mb-4 border border-white/10 px-6 py-2 rounded-full backdrop-blur-sm shadow-inner mt-10 md:mt-0">
                  Architecting Efficiency
                </span>
              </ScrollReveal>

              <motion.h1 variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="text-6xl md:text-8xl lg:text-[130px] font-medium leading-[0.8] tracking-tighter mb-16 text-balance">
                Technical <br />
                <CharReveal delay={0.6} className="py-2 text-accent italic font-serif">Design.</CharReveal>
              </motion.h1>

              <div className="max-w-xl">
                <TextReveal
                  text="Designing and building operational systems for professional service firms. Generating clinical revenue growth and removing documentation overhead through precise technical leverage."
                  className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed italic"
                  delay={0.8}
                />
              </div>

              {/* Metrics Row */}
              <div className="grid grid-cols-3 gap-8 py-10 border-y border-white/5">
                {metrics.map((m) => (
                  <div key={m.label} className="space-y-2">
                    <p className="text-4xl md:text-5xl font-serif italic text-accent">{m.value}</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest opacity-30">{m.label}</p>
                  </div>
                ))}
              </div>

              <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }} className="flex gap-16 items-center pt-8">
                <Link
                  href="/contact"
                  className="group flex items-center gap-10 text-2xl font-bold tracking-tight text-foreground link-underline pb-1 transition-all"
                >
                  Initiate Discussion
                  <ArrowRight size={32} className="opacity-20 group-hover:translate-x-4 transition-transform duration-1000" />
                </Link>
              </motion.div>
            </div>

            {/* Cinematic Hero Asset */}
            <div className="hidden lg:block relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.98, filter: 'blur(10px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                transition={{ duration: 2, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                className="relative w-full aspect-[4/5] rounded-[3.5rem] overflow-hidden shadow-[0_0_100px_rgba(34,211,238,0.1)] border border-white/5"
              >
                <ParallaxImage
                  src="/images/%20hero-home.png"
                  alt="Cinematic Architectural Core"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-[3s]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent pointer-events-none" />
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
            <h2 className="text-5xl md:text-[140px] font-medium tracking-tighter leading-none italic font-serif opacity-90">
              Chaos into <br />
              <span className="text-accent not-italic">Order.</span>
            </h2>
            <p className="mt-8 text-xl md:text-3xl font-light text-muted-foreground max-w-2xl mx-auto tracking-tight">
              Replacing manual friction with architectural precision.
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
                <h2 className="text-4xl md:text-6xl font-medium tracking-tighter italic font-serif">Selected Logic</h2>
              </div>
              <span className="text-sm font-mono opacity-20 hidden md:block">2023 — 2026 // ARCH_V2</span>
            </div>
          </ScrollReveal>

          <ProjectList />
        </div>
      </section>

    </main>
  );
}
