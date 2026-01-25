'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import TextReveal from '@/components/TextReveal';
import ProjectList from '@/components/ProjectList';
import ParallaxImage from '@/components/ParallaxImage';
import CharReveal from '@/components/CharReveal';
import Link from 'next/link';
import { useRef } from 'react';

const metrics = [
  { label: 'Document generation time reduced', value: '85%' },
  { label: 'Clinician adoption in 8 weeks', value: '100%' },
  { label: 'Annual admin cost eliminated', value: '$20K' },
];

export default function Home() {
  const transitionRef = useRef(null);
  const portfolioRef = useRef(null);

  const { scrollYProgress: portfolioProgress } = useScroll({
    target: portfolioRef,
    offset: ["start end", "start 0.3"]
  });

  const portfolioY = useTransform(portfolioProgress, [0, 1], [100, 0]);
  const portfolioOpacity = useTransform(portfolioProgress, [0, 0.5, 1], [0, 0.5, 1]);
  const portfolioScale = useTransform(portfolioProgress, [0, 1], [0.9, 1]);
  const labelX = useTransform(portfolioProgress, [0, 1], [-50, 0]);

  // Statement section scroll animations
  const { scrollYProgress: statementProgress } = useScroll({
    target: transitionRef,
    offset: ["start end", "center center"]
  });

  const statementY = useTransform(statementProgress, [0, 1], [60, 0]);
  const statementOpacity = useTransform(statementProgress, [0, 0.3, 1], [0, 0.3, 1]);
  const statementScale = useTransform(statementProgress, [0, 1], [0.95, 1]);

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
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 0.4, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block text-sm font-medium tracking-[0.4em] uppercase mb-4 border border-white/10 px-6 py-2 rounded-full backdrop-blur-sm shadow-inner mt-10 md:mt-0"
              >
                Implementation Consulting
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="text-5xl md:text-7xl lg:text-8xl font-medium leading-[0.9] tracking-tighter mb-16 text-balance"
              >
                I find bottlenecks and <CharReveal delay={0.8} className="py-2 text-accent italic font-serif">build</CharReveal> <br />
                systems to fix them.
              </motion.h1>

              <div className="max-w-2xl mx-auto">
                <TextReveal
                  text="Operations improvement, workflow automation, and technology implementation for healthcare practices and professional services firms. I map out where time and money are leaking, then build the systems, automations, and processes to stop it."
                  className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed"
                  delay={1.0}
                />
              </div>

              {/* Metrics Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 max-w-3xl mx-auto">
                {metrics.map((m, i) => (
                  <motion.div
                    key={m.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.4 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="group relative p-6 rounded-2xl border border-white/5 hover:border-white/10 hover:bg-white/[0.02] transition-all duration-500"
                  >
                    <p className="text-4xl md:text-5xl font-serif italic text-accent mb-3">{m.value}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{m.label}</p>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.8, ease: [0.16, 1, 0.3, 1] }}
                className="flex gap-6 items-center justify-center pt-8"
              >
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

        <motion.div
          style={{ y: statementY, opacity: statementOpacity, scale: statementScale }}
          className="relative z-10 text-center px-6 max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.2] mb-6">
            The problem isn&apos;t the software.
          </h2>
          <p className="text-xl md:text-2xl font-light text-muted-foreground max-w-2xl mx-auto">
            It&apos;s how it fits into the way people already work.
          </p>
        </motion.div>
      </section>

      {/* Selected Projects */}
      <section ref={portfolioRef} className="py-24 md:py-32 relative z-10 w-full px-6 md:px-12 overflow-hidden">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-16 md:mb-20">
            <motion.span
              style={{ x: labelX, opacity: portfolioOpacity }}
              className="text-xs font-medium tracking-[0.3em] uppercase text-muted-foreground mb-4 block"
            >
              Portfolio
            </motion.span>
            <motion.h2
              style={{ y: portfolioY, opacity: portfolioOpacity, scale: portfolioScale }}
              className="text-3xl md:text-5xl font-medium tracking-tight origin-left"
            >
              Recent Work
            </motion.h2>
          </div>

          <ProjectList />
        </div>
      </section>

    </main>
  );
}
