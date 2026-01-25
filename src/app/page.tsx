'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
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
  const heroRef = useRef(null);
  const transitionRef = useRef(null);
  const portfolioRef = useRef(null);

  // Spring config for smooth, fluid animations
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };

  // Hero parallax - smooth background movement
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const heroBgYRaw = useTransform(heroProgress, [0, 1], [0, 120]);
  const heroBgY = useSpring(heroBgYRaw, springConfig);

  // Statement section - smooth fade and slide
  const { scrollYProgress: statementProgress } = useScroll({
    target: transitionRef,
    offset: ["start end", "center center"]
  });
  const statementYRaw = useTransform(statementProgress, [0, 1], [80, 0]);
  const statementOpacityRaw = useTransform(statementProgress, [0, 0.3, 1], [0, 0.3, 1]);
  const statementY = useSpring(statementYRaw, springConfig);
  const statementOpacity = useSpring(statementOpacityRaw, springConfig);
  const statementScale = useSpring(
    useTransform(statementProgress, [0, 1], [0.95, 1]),
    springConfig
  );

  // Portfolio section - smooth reveal with scale
  const { scrollYProgress: portfolioProgress } = useScroll({
    target: portfolioRef,
    offset: ["start end", "start 0.3"]
  });
  const portfolioYRaw = useTransform(portfolioProgress, [0, 1], [100, 0]);
  const portfolioOpacityRaw = useTransform(portfolioProgress, [0, 0.4, 1], [0, 0.5, 1]);
  const portfolioY = useSpring(portfolioYRaw, springConfig);
  const portfolioOpacity = useSpring(portfolioOpacityRaw, springConfig);

  return (
    <main className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Hero Section */}
      <section ref={heroRef} className="min-h-screen flex items-center justify-center relative px-6 md:px-12 pt-40 md:pt-32">

        {/* Cinematic Background Layer - Simple Parallax */}
        <motion.div
          style={{ y: heroBgY }}
          className="absolute -inset-x-0 -top-32 -bottom-32 z-0 will-change-transform"
        >
          <ParallaxImage
            src="/images/orchestrating.png"
            alt="Cinematic Core"
            className="w-full h-full opacity-20"
          />
        </motion.div>
        {/* Fixed gradient overlay - doesn't move with parallax */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-background via-transparent to-background pointer-events-none" />

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
          className="relative z-10 text-center px-6 max-w-5xl mx-auto will-change-transform"
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight leading-[1.1] mb-6">
            The problem isn&apos;t the software.
          </h2>
          <div className="h-[1px] w-32 bg-accent/30 mx-auto mb-6" />
          <p className="text-xl md:text-2xl lg:text-3xl font-light text-muted-foreground max-w-3xl mx-auto">
            It&apos;s how it fits into the way people already work.
          </p>
        </motion.div>
      </section>

      {/* Selected Projects */}
      <section ref={portfolioRef} className="py-24 md:py-32 relative z-10 w-full px-6 md:px-12 overflow-hidden">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            style={{ y: portfolioY, opacity: portfolioOpacity }}
            className="mb-16 md:mb-20 will-change-transform"
          >
            <span className="text-xs font-medium tracking-[0.4em] uppercase text-accent mb-4 block">
              Portfolio
            </span>
            <h2 className="text-4xl md:text-6xl font-medium tracking-tight">
              Recent Work
            </h2>
            <div className="h-[2px] bg-gradient-to-r from-accent to-transparent mt-6 max-w-xs" />
          </motion.div>

          <ProjectList />
        </div>
      </section>

    </main>
  );
}
