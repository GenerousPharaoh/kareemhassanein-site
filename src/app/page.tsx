'use client';

import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ProjectList from '@/components/ProjectList';
import AnimatedDivider from '@/components/AnimatedDivider';
import HeroCarousel from '@/components/HeroCarousel';
import useIsMobile from '@/hooks/useIsMobile';
import Link from 'next/link';
import { useRef } from 'react';

const approach = [
  { title: 'Map', desc: 'Watch the workflow run before changing anything.', em: 'before changing anything' },
  { title: 'Build', desc: 'Fit the system to the workflow, not the other way around.', em: 'not the other way around' },
  { title: 'Launch', desc: 'Stay through the first weeks until the new way becomes the default.', em: 'becomes the default' },
];

const heroSlides = [
  { src: '/images/hero-1.webp', alt: 'Clinical implementation advisor with tablet — frontline practice meets digital tools' },
  { src: '/images/hero-2.webp', alt: 'Cross-functional team mapping a healthcare workflow together' },
  { src: '/images/hero-3.webp', alt: 'Workflow path connecting clinical practice with modern systems and dashboards' },
];

export default function Home() {
  const heroRef = useRef(null);
  const transitionRef = useRef(null);
  const portfolioRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const disableScrollMotion = shouldReduceMotion || isMobile;

  // High damping prevents overshoot and flicker.
  const springConfig = { stiffness: 80, damping: 35, restDelta: 0.001 };

  // Statement section - smooth fade and slide
  const { scrollYProgress: statementProgress } = useScroll({
    target: transitionRef,
    offset: ["start end", "center center"]
  });
  const statementYRaw = useTransform(statementProgress, [0, 1], [disableScrollMotion ? 0 : 40, 0]);
  const statementOpacityRaw = useTransform(
    statementProgress,
    [0, 0.3, 1],
    disableScrollMotion ? [1, 1, 1] : [0.05, 0.5, 1]
  );
  const statementY = useSpring(statementYRaw, springConfig);
  const statementOpacity = useSpring(statementOpacityRaw, springConfig);


  // Portfolio section - smooth reveal (triggers early)
  const { scrollYProgress: portfolioProgress } = useScroll({
    target: portfolioRef,
    offset: ["start end", "start 0.85"]
  });
  const portfolioYRaw = useTransform(portfolioProgress, [0, 1], [disableScrollMotion ? 0 : 50, 0]);
  const portfolioOpacityRaw = useTransform(
    portfolioProgress,
    [0, 0.2, 1],
    disableScrollMotion ? [1, 1, 1] : [0.05, 0.8, 1]
  );
  const portfolioY = useSpring(portfolioYRaw, springConfig);
  const portfolioOpacity = useSpring(portfolioOpacityRaw, springConfig);

  return (
    <main className="min-h-svh bg-background text-foreground overflow-hidden">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-svh flex items-center pt-24 pb-16 md:pt-28 md:pb-24 px-5 sm:px-6 md:px-12 xl:px-20 bg-background overflow-hidden">

        {/* Soft atmospheric ambient — subtle gradient orbs, no full-bleed photo backdrop */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
          <div className="absolute -top-32 -left-32 w-[42rem] h-[42rem] rounded-full bg-accent/[0.06] blur-3xl" />
          <div className="absolute -bottom-40 -right-24 w-[36rem] h-[36rem] rounded-full bg-accent/[0.04] blur-3xl" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
        </div>

        <div className="relative z-10 w-full max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-12 gap-y-12 gap-x-10 lg:gap-x-16 items-center">

            {/* LEFT: editorial main content */}
            <div className="lg:col-span-7 text-left order-2 lg:order-1 space-y-6 md:space-y-7">

              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="flex"
              >
                <span className="inline-flex items-center gap-2 text-[9.5px] sm:text-[10px] md:text-[11px] font-medium tracking-[0.18em] sm:tracking-[0.2em] uppercase text-foreground/65 px-3.5 py-2 rounded-full border border-white/[0.07] bg-[hsl(222,12%,13%)]/80 backdrop-blur-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_8px_rgba(176,141,87,0.5)]" />
                  Healthcare · Health-Tech · Service Innovation
                </span>
              </motion.div>

              {/* Name as display headline */}
              <h1 className="font-medium leading-[0.86] tracking-[-0.045em]" style={{ fontSize: 'clamp(3rem, 13vw, 8.5rem)' }}>
                <motion.span
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="block"
                >
                  Kareem
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="block text-accent/90 italic font-serif"
                >
                  Hassanein.
                </motion.span>
              </h1>

              {/* Accent divider */}
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 1, delay: 0.45 }}
                className="h-[1px] w-16 bg-accent/40 origin-left"
              />

              {/* Lead positioning statement */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-[34rem] text-[1.15rem] sm:text-xl md:text-2xl lg:text-[1.65rem] text-foreground/90 font-light leading-[1.3] tracking-tight"
              >
                Clinical implementation, digital adoption, and operational systems for healthcare and health-tech teams.
              </motion.p>

              {/* Body — supporting detail */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-[34rem] text-[15px] sm:text-base md:text-lg text-foreground/70 font-light leading-relaxed"
              >
                I help clinics, professional-services firms, and health-tech founders bring new tools, services, and systems into real-world use — combining frontline clinical experience, operations leadership, and technical implementation to design, launch, and adopt things that fit the way people actually work.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-1"
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
                  className="text-sm md:text-base font-medium text-foreground/80 w-full sm:w-auto text-center px-7 py-3.5 rounded-full border border-white/[0.14] hover:text-foreground hover:border-accent/35 hover:bg-white/[0.03] transition-all duration-300"
                >
                  Learn more
                </Link>
              </motion.div>

              {/* Status strip — visible on all sizes, replaces desktop sidebar */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-wrap items-center gap-x-3 gap-y-2 pt-5 text-[10px] sm:text-[11px] font-medium tracking-[0.22em] uppercase text-muted-foreground/85"
              >
                <span className="flex items-center gap-2">
                  <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_8px_rgba(176,141,87,0.5)]" />
                  Available for projects
                </span>
                <span aria-hidden="true" className="w-[3px] h-[3px] rounded-full bg-white/15" />
                <span>Burlington, ON</span>
                <span aria-hidden="true" className="w-[3px] h-[3px] rounded-full bg-white/15" />
                <span>Remote</span>
              </motion.div>
            </div>

            {/* RIGHT: hero image carousel */}
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 order-1 lg:order-2 w-full"
            >
              <div className="relative aspect-[4/5] sm:aspect-[5/4] md:aspect-[4/5] lg:aspect-[4/5] w-full max-w-[560px] mx-auto">
                <HeroCarousel slides={heroSlides} priority />
                {/* Soft glow behind */}
                <div aria-hidden="true" className="absolute -inset-6 -z-10 rounded-[40px] bg-accent/[0.06] blur-2xl" />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom gradient for seamless transition into next section */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-[2] pointer-events-none" />
      </section>

      {/* Approach Section - Combined statement + steps */}
      <section ref={transitionRef} className="py-20 md:py-28 px-6 md:px-12 xl:px-20 relative">
        {/* Atmospheric background */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-background to-transparent pointer-events-none z-0" />
        <div className="max-w-6xl mx-auto relative z-10">

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
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight leading-[1.1] mb-6 text-balance">
                Good plans fail without good <span className="text-accent/90 italic font-serif">execution.</span>
              </h2>
              <p className="text-base md:text-lg text-muted-foreground/80 leading-relaxed">
                Implementation is where most efforts stall. Not from lack of strategy, but from <span className="text-foreground/90">friction in the systems, workflows, and habits</span> that need to change.
              </p>
            </motion.div>

            {/* Right: Steps — flows directly from chapter break, no inner header */}
            <div className="space-y-6">
              <div className="relative">
                {/* Vertical connecting line */}
                <div className="absolute left-5 md:left-6 top-5 bottom-5 w-[1px] bg-gradient-to-b from-white/[0.06] via-white/[0.04] to-transparent pointer-events-none" />

                <div className="space-y-8">
                  {approach.map((item, i) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "0px 0px -20px 0px" }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="group flex gap-5 md:gap-6 relative p-4 -mx-4 rounded-lg hover:bg-white/[0.03] transition-all duration-500"
                    >
                      {/* Number */}
                      <div className="flex-shrink-0 w-11 h-11 md:w-13 md:h-13 rounded-full border border-accent/20 flex items-center justify-center group-hover:border-accent/40 group-hover:bg-accent/5 group-hover:shadow-[0_0_16px_rgba(176,141,87,0.08)] transition-all duration-500 bg-background relative z-10">
                        <span className="text-base md:text-lg font-serif italic text-accent/80 group-hover:text-accent transition-colors duration-500">
                          {i + 1}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="flex-1 pt-1.5">
                        <h4 className="text-lg md:text-xl font-medium tracking-tight mb-2 group-hover:text-accent transition-colors duration-500">
                          {item.title}
                        </h4>
                        <p className="text-sm md:text-base text-muted-foreground/85 leading-relaxed">
                          {item.em ? (
                            <>
                              {item.desc.split(item.em)[0]}
                              <span className="text-foreground/90">{item.em}</span>
                              {item.desc.split(item.em)[1]}
                            </>
                          ) : item.desc}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="px-6 md:px-12 xl:px-20 py-4">
        <AnimatedDivider direction="left" accent maxWidth="300px" />
      </div>

      {/* Selected Projects */}
      <section ref={portfolioRef} className="py-28 md:py-40 relative z-10 w-full px-6 md:px-12 xl:px-20 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[hsl(222,14%,10%)]/35" />

        <div className="max-w-[1400px] mx-auto relative z-10">
          <motion.div
            style={{ y: portfolioY, opacity: portfolioOpacity }}
            className="mb-12 md:mb-16 will-change-transform"
          >
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight text-balance leading-[1.05]">
              Recent <span className="text-accent/90 italic font-serif">Work.</span>
            </h2>
            <p className="mt-5 text-[11px] md:text-xs font-medium tracking-[0.4em] uppercase text-muted-foreground/70">
              2024 &ndash; 2026
            </p>
            <AnimatedDivider direction="left" accent maxWidth="200px" className="mt-6" />
          </motion.div>

          <ProjectList />
        </div>
      </section>

    </main>
  );
}
