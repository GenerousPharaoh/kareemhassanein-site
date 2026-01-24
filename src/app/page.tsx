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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 max-w-3xl mx-auto">
                {metrics.map((m) => (
                  <div key={m.label} className="group relative p-6 rounded-2xl border border-white/5 hover:border-white/10 hover:bg-white/[0.02] transition-all duration-500">
                    <p className="text-4xl md:text-5xl font-serif italic text-accent mb-3">{m.value}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{m.label}</p>
                  </div>
                ))}
              </div>

              <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }} className="flex gap-6 items-center justify-center pt-8">
                <Link
                  href="/contact"
                  className="group flex items-center gap-4 text-lg font-medium tracking-tight bg-foreground text-background px-8 py-4 rounded-full hover:bg-accent hover:text-background transition-all duration-500"
                >
                  Let&apos;s talk
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-500" />
                </Link>
                <Link
                  href="/about"
                  className="text-lg font-medium tracking-tight text-foreground/60 hover:text-foreground px-6 py-4 transition-all duration-500"
                >
                  Learn more
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Statement Section */}
      <section ref={transitionRef} className="py-32 md:py-48 w-full relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent pointer-events-none" />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <ScrollReveal direction="up">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.2] mb-6">
              The problem isn&apos;t the software.
            </h2>
            <p className="text-xl md:text-2xl font-light text-muted-foreground max-w-2xl mx-auto">
              It&apos;s how it fits into the way people already work.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Selected Projects */}
      <section className="py-24 md:py-32 relative z-10 w-full px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <ScrollReveal direction="up" distance={40} blur={20}>
            <div className="mb-16 md:mb-20">
              <span className="text-xs font-medium tracking-[0.3em] uppercase text-muted-foreground mb-4 block">Portfolio</span>
              <h2 className="text-3xl md:text-5xl font-medium tracking-tight">Recent Work</h2>
            </div>
          </ScrollReveal>

          <ProjectList />
        </div>
      </section>

    </main>
  );
}
