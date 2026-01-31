'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ProjectList from '@/components/ProjectList';
import AnimatedDivider from '@/components/AnimatedDivider';
import ParallaxImage from '@/components/ParallaxImage';
import Link from 'next/link';
import { useRef } from 'react';

const metrics = [
  {
    value: 'Hours → Minutes',
    label: 'Document drafting at a solo law firm after replacing manual workflows with an AI-powered template library'
  },
  {
    value: 'Full Adoption',
    label: 'Entire clinical team using AI documentation within weeks, each saving hours weekly on notes'
  },
  {
    value: 'Sustained Growth',
    label: 'Patient reviews after embedding QR-based feedback capture into every visit'
  },
];

const approach = [
  { title: 'Map', desc: 'Understand how the work actually moves before touching any configuration.' },
  { title: 'Build', desc: 'Fit the system to the workflow, not the other way around.' },
  { title: 'Launch', desc: 'Stay through the first weeks until the new way becomes the default.' },
];

export default function Home() {
  const heroRef = useRef(null);
  const transitionRef = useRef(null);
  const portfolioRef = useRef(null);

  // Spring config for smooth, fluid animations
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };

  // Hero parallax - background moves UP (slower than scroll) for depth effect
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const heroBgYRaw = useTransform(heroProgress, [0, 1], [0, -80]);
  const heroBgY = useSpring(heroBgYRaw, springConfig);

  // Statement section - smooth fade and slide
  const { scrollYProgress: statementProgress } = useScroll({
    target: transitionRef,
    offset: ["start end", "center center"]
  });
  const statementYRaw = useTransform(statementProgress, [0, 1], [40, 0]);
  const statementOpacityRaw = useTransform(statementProgress, [0, 0.3, 1], [0, 0.5, 1]);
  const statementY = useSpring(statementYRaw, springConfig);
  const statementOpacity = useSpring(statementOpacityRaw, springConfig);


  // Portfolio section - smooth reveal (triggers early)
  const { scrollYProgress: portfolioProgress } = useScroll({
    target: portfolioRef,
    offset: ["start end", "start 0.85"]
  });
  const portfolioYRaw = useTransform(portfolioProgress, [0, 1], [50, 0]);
  const portfolioOpacityRaw = useTransform(portfolioProgress, [0, 0.2, 1], [0, 0.8, 1]);
  const portfolioY = useSpring(portfolioYRaw, springConfig);
  const portfolioOpacity = useSpring(portfolioOpacityRaw, springConfig);

  return (
    <main className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Hero Section */}
      <section ref={heroRef} className="h-screen flex items-center justify-center relative px-6 md:px-12 xl:px-20 bg-background overflow-hidden">

        {/* Cinematic Background Layer */}
        <motion.div
          style={{ y: heroBgY }}
          className="absolute -inset-x-0 -top-32 -bottom-64 z-0"
        >
          <ParallaxImage
            src="/images/orchestrating.png"
            alt="Cinematic Core"
            className="w-full h-full opacity-50"
            priority={true}
          />
        </motion.div>

        {/* Layered gradient overlays for depth */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-background via-transparent via-40% to-background pointer-events-none" />
        <div className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,transparent_0%,hsl(var(--background)/0.8)_100%)] pointer-events-none" />

        {/* Subtle accent glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent/[0.03] rounded-full blur-[100px] z-0 pointer-events-none" />

        <div className="relative z-10 w-full max-w-[1400px] flex flex-col justify-center">
          <div className="flex flex-col items-center text-center">

            <div className="space-y-5 md:space-y-6 mx-auto max-w-4xl">

              {/* Premium tagline badge */}
              <motion.div
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="inline-flex items-center gap-2.5 text-[10px] md:text-[11px] font-medium tracking-[0.2em] uppercase text-foreground/50 px-4 py-2 rounded-full border border-white/[0.06] bg-[hsl(220,18%,10%)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  Implementation Consulting
                </span>
              </motion.div>

              {/* Headline - more compact */}
              <h1 className="text-[2.25rem] md:text-5xl lg:text-6xl xl:text-[4.25rem] font-medium leading-[1] tracking-[-0.03em]">
                <motion.span
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="block"
                >
                  I find friction, solve it,
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="block"
                >
                  and make it{" "}
                  <motion.span
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    className="inline-block text-accent italic font-serif"
                  >
                    stick
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
                    className="text-accent"
                  >.</motion.span>
                </motion.span>
              </h1>

              {/* Description - tighter */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-xl mx-auto"
              >
                <p className="text-sm md:text-base lg:text-lg text-muted-foreground/80 font-light leading-relaxed">
                  I help healthcare practices and professional services firms remove operational friction. Whether it&apos;s automating documentation, redesigning workflows, or rolling out new tools, I stay through adoption until it actually works.
                </p>
              </motion.div>

              {/* Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-3xl mx-auto pt-4">
                {metrics.map((m, i) => (
                  <motion.div
                    key={m.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 1.0 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center"
                  >
                    <p className="text-2xl md:text-3xl font-serif italic text-accent mb-2 whitespace-nowrap">{m.value}</p>
                    <p className="text-[11px] md:text-xs text-muted-foreground/60 leading-relaxed">{m.label}</p>
                  </motion.div>
                ))}
              </div>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center pt-4"
              >
                <Link
                  href="/contact"
                  className="group flex items-center justify-center gap-2.5 text-sm md:text-base font-medium w-full sm:w-auto px-7 py-3.5 rounded-full bg-accent text-background hover:bg-accent/90 transition-all duration-300"
                >
                  Get in touch
                  <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform duration-300" />
                </Link>
                <Link
                  href="/about"
                  className="text-sm md:text-base font-medium text-foreground/70 w-full sm:w-auto text-center px-7 py-3.5 rounded-full border border-white/[0.1] hover:text-foreground hover:border-white/[0.2] hover:bg-white/[0.03] transition-all duration-300"
                >
                  Learn more
                </Link>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom gradient for seamless transition */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent z-[2] pointer-events-none" />
      </section>

      {/* Approach Section - Combined statement + steps */}
      <section ref={transitionRef} className="py-24 md:py-32 px-6 md:px-12 xl:px-20 relative">
        <div className="max-w-6xl mx-auto">

          {/* Two-column layout: Statement left, Steps right */}
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-16 lg:gap-20 items-start">

            {/* Left: Statement */}
            <motion.div
              style={{ y: statementY, opacity: statementOpacity }}
              className="lg:sticky lg:top-32"
            >
              <span className="text-[10px] md:text-xs font-medium tracking-[0.25em] uppercase text-accent/70 mb-6 block">
                The Problem
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight leading-[1.1] mb-6">
                Good plans fail without good execution.
              </h2>
              <p className="text-base md:text-lg text-muted-foreground/80 leading-relaxed">
                Implementation is where most efforts stall. Not from lack of strategy, but from friction in the systems, workflows, and habits that need to change.
              </p>
            </motion.div>

            {/* Right: Steps */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="mb-8"
              >
                <span className="text-[10px] md:text-xs font-medium tracking-[0.25em] uppercase text-accent/70 mb-3 block">
                  The Approach
                </span>
                <h3 className="text-xl md:text-2xl font-medium tracking-tight text-foreground/90">
                  How I work
                </h3>
              </motion.div>

              {approach.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="group flex gap-5 md:gap-6"
                >
                  {/* Number */}
                  <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/[0.08] flex items-center justify-center group-hover:border-accent/30 group-hover:bg-accent/5 transition-all duration-500">
                    <span className="text-sm md:text-base font-medium text-accent/60 group-hover:text-accent transition-colors duration-500">
                      {i + 1}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-1.5">
                    <h4 className="text-lg md:text-xl font-medium tracking-tight mb-2 group-hover:text-accent transition-colors duration-500">
                      {item.title}
                    </h4>
                    <p className="text-sm md:text-base text-muted-foreground/70 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="px-6 md:px-12 xl:px-20 py-8">
        <AnimatedDivider direction="left" accent maxWidth="300px" />
      </div>

      {/* Selected Projects */}
      <section ref={portfolioRef} className="py-16 md:py-28 relative z-10 w-full px-6 md:px-12 xl:px-20 overflow-hidden">
        {/* Background image - constrained and faded */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <ParallaxImage
              src="/images/flow of organized transformation.png"
              alt="Transformation"
              className="w-[80%] max-w-4xl h-auto opacity-40"
              fadedSides={true}
              fadedVertical={true}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-background/60" />
        </div>

        <div className="max-w-[1400px] mx-auto relative z-10">
          <motion.div
            style={{ y: portfolioY, opacity: portfolioOpacity }}
            className="mb-16 md:mb-20 will-change-transform"
          >
            <span className="text-xs font-medium tracking-[0.4em] uppercase text-accent mb-4 block">
              Portfolio
            </span>
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight">
              Recent Work
            </h2>
            <AnimatedDivider direction="left" accent maxWidth="280px" className="mt-6" />
          </motion.div>

          <ProjectList />
        </div>
      </section>

    </main>
  );
}
