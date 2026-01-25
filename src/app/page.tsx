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

  // Hero parallax - content moves up as you scroll down
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(heroProgress, [0, 1], [0, -150]);
  const heroOpacity = useTransform(heroProgress, [0, 0.5, 1], [1, 0.8, 0]);
  const heroScale = useTransform(heroProgress, [0, 1], [1, 0.95]);
  const heroBgY = useTransform(heroProgress, [0, 1], [0, 100]);
  const heroBgScale = useTransform(heroProgress, [0, 1], [1, 1.1]);

  // Statement section - dramatic split reveal
  const { scrollYProgress: statementProgress } = useScroll({
    target: transitionRef,
    offset: ["start end", "center center"]
  });

  const statementLine1Y = useTransform(statementProgress, [0, 0.6], [80, 0]);
  const statementLine1Opacity = useTransform(statementProgress, [0, 0.4, 0.6], [0, 0.5, 1]);
  const statementLine2Y = useTransform(statementProgress, [0.2, 0.8], [60, 0]);
  const statementLine2Opacity = useTransform(statementProgress, [0.2, 0.5, 0.8], [0, 0.5, 1]);
  const statementLineWidth = useTransform(statementProgress, [0.3, 1], ['0%', '100%']);

  // Smooth spring for the decorative line
  const smoothLineWidth = useSpring(statementLineWidth, { stiffness: 100, damping: 30 });

  // Portfolio section - staggered multi-element reveal
  const { scrollYProgress: portfolioProgress } = useScroll({
    target: portfolioRef,
    offset: ["start end", "start 0.2"]
  });

  const portfolioLabelX = useTransform(portfolioProgress, [0, 0.5], [-100, 0]);
  const portfolioLabelOpacity = useTransform(portfolioProgress, [0, 0.5], [0, 1]);
  const portfolioTitleY = useTransform(portfolioProgress, [0.1, 0.7], [120, 0]);
  const portfolioTitleOpacity = useTransform(portfolioProgress, [0.1, 0.5, 0.7], [0, 0.6, 1]);
  const portfolioTitleRotate = useTransform(portfolioProgress, [0.1, 0.7], [3, 0]);
  const portfolioLineScale = useTransform(portfolioProgress, [0.3, 0.8], [0, 1]);

  return (
    <main className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Hero Section */}
      <section ref={heroRef} className="min-h-screen flex items-center justify-center relative px-6 md:px-12 pt-40 md:pt-32">

        {/* Cinematic Background Layer - Parallax */}
        <motion.div
          style={{ y: heroBgY, scale: heroBgScale }}
          className="absolute inset-0 z-0"
        >
          <ParallaxImage
            src="/images/orchestrating.png"
            alt="Cinematic Core"
            className="w-full h-full opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
        </motion.div>

        <motion.div
          style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
          className="relative z-10 w-full max-w-[1400px] h-full flex flex-col justify-center py-20"
        >
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
        </motion.div>
      </section>

      {/* Statement Section - Dramatic Split Reveal */}
      <section ref={transitionRef} className="py-40 md:py-56 w-full relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent pointer-events-none" />

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          {/* Line 1 */}
          <motion.h2
            style={{ y: statementLine1Y, opacity: statementLine1Opacity }}
            className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight leading-[1.1] mb-4"
          >
            The problem isn&apos;t the software.
          </motion.h2>

          {/* Decorative animated line */}
          <motion.div
            style={{ width: smoothLineWidth }}
            className="h-[1px] bg-gradient-to-r from-transparent via-accent/50 to-transparent mx-auto mb-6"
          />

          {/* Line 2 */}
          <motion.p
            style={{ y: statementLine2Y, opacity: statementLine2Opacity }}
            className="text-2xl md:text-3xl lg:text-4xl font-light text-muted-foreground max-w-3xl mx-auto italic"
          >
            It&apos;s how it fits into the way people already work.
          </motion.p>
        </div>
      </section>

      {/* Selected Projects - Cinematic Reveal */}
      <section ref={portfolioRef} className="py-32 md:py-40 relative z-10 w-full px-6 md:px-12 overflow-hidden">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-20 md:mb-24 relative">
            {/* Animated label slides in from left */}
            <motion.span
              style={{ x: portfolioLabelX, opacity: portfolioLabelOpacity }}
              className="text-xs font-medium tracking-[0.4em] uppercase text-accent mb-6 block"
            >
              Portfolio
            </motion.span>

            {/* Title with rotation and scale */}
            <div className="overflow-hidden">
              <motion.h2
                style={{
                  y: portfolioTitleY,
                  opacity: portfolioTitleOpacity,
                  rotateX: portfolioTitleRotate
                }}
                className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight origin-left"
              >
                Recent Work
              </motion.h2>
            </div>

            {/* Animated underline */}
            <motion.div
              style={{ scaleX: portfolioLineScale }}
              className="h-[2px] bg-gradient-to-r from-accent via-accent/50 to-transparent mt-8 origin-left max-w-md"
            />
          </div>

          <ProjectList />
        </div>
      </section>

    </main>
  );
}
