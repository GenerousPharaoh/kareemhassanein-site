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
  const visualRef = useRef(null);
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
  const statementYRaw = useTransform(statementProgress, [0, 1], [80, 0]);
  const statementOpacityRaw = useTransform(statementProgress, [0, 0.3, 1], [0, 0.3, 1]);
  const statementY = useSpring(statementYRaw, springConfig);
  const statementOpacity = useSpring(statementOpacityRaw, springConfig);
  const statementScale = useSpring(
    useTransform(statementProgress, [0, 1], [0.95, 1]),
    springConfig
  );

  // Visual break section - parallax image
  const { scrollYProgress: visualProgress } = useScroll({
    target: visualRef,
    offset: ["start end", "end start"]
  });
  const visualBgY = useSpring(useTransform(visualProgress, [0, 1], [0, -60]), springConfig);

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
      <section ref={heroRef} className="min-h-screen flex items-center justify-center relative px-6 md:px-12 xl:px-20 pt-24 md:pt-28 bg-background overflow-hidden">

        {/* Cinematic Background Layer */}
        <motion.div
          style={{ y: heroBgY }}
          className="absolute -inset-x-0 -top-32 -bottom-64 z-0 will-change-transform"
        >
          <ParallaxImage
            src="/images/orchestrating.png"
            alt="Cinematic Core"
            className="w-full h-full opacity-35"
          />
        </motion.div>

        {/* Gradient overlays */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-background via-background/20 via-30% to-background pointer-events-none" />

        <div className="relative z-10 w-full max-w-[1400px] flex flex-col justify-center py-12 md:py-16">
          <div className="flex flex-col items-center text-center">

            <div className="space-y-6 md:space-y-8 mx-auto max-w-4xl">

              {/* Tagline badge */}
              <motion.span
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 0.7, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block text-[10px] md:text-xs font-medium tracking-[0.2em] md:tracking-[0.3em] uppercase text-foreground/50 mb-2"
              >
                Implementation Consulting
              </motion.span>

              {/* Headline */}
              <h1 className="text-[2.75rem] md:text-6xl lg:text-7xl font-medium leading-[1] tracking-[-0.03em]">
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="block"
                >
                  I find friction, solve it,
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="block"
                >
                  and make it{" "}
                  <span className="text-accent italic font-serif">stick</span>
                  <span className="text-accent">.</span>
                </motion.span>
              </h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-2xl mx-auto text-base md:text-lg text-muted-foreground font-light leading-relaxed"
              >
                I help healthcare practices and professional services firms remove operational friction. Whether it&apos;s automating documentation, redesigning workflows, or rolling out new tools, I stay through adoption until it actually works.
              </motion.p>

              {/* Metrics Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto pt-6 md:pt-8">
                {metrics.map((m, i) => (
                  <motion.div
                    key={m.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.9 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="group p-5 md:p-6 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12] transition-colors duration-300"
                  >
                    <p className="text-2xl md:text-[1.75rem] font-serif italic text-accent mb-2">{m.value}</p>
                    <p className="text-[11px] md:text-xs text-muted-foreground/70 leading-relaxed">{m.label}</p>
                  </motion.div>
                ))}
              </div>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col sm:flex-row gap-4 items-center justify-center pt-6 md:pt-8"
              >
                <Link
                  href="/contact"
                  className="group flex items-center justify-center gap-3 text-base font-medium bg-foreground text-background w-full sm:w-auto px-7 py-3.5 rounded-full hover:bg-accent transition-colors duration-300"
                >
                  Get in touch
                  <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform duration-300" />
                </Link>
                <Link
                  href="/about"
                  className="text-base font-medium text-foreground/60 hover:text-foreground w-full sm:w-auto text-center px-7 py-3.5 rounded-full border border-white/[0.08] hover:border-white/[0.15] transition-all duration-300"
                >
                  Learn more
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="px-6 md:px-12 xl:px-20">
        <AnimatedDivider direction="center" maxWidth="400px" />
      </div>

      {/* Statement Section */}
      <section ref={transitionRef} className="py-20 md:py-32 w-full relative flex items-center justify-center bg-background">

        <motion.div
          style={{ y: statementY, opacity: statementOpacity, scale: statementScale }}
          className="relative z-10 text-center px-6 max-w-5xl mx-auto will-change-transform"
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.1] mb-6">
            Good plans fail without good execution.
          </h2>
          <div className="h-[1px] w-32 bg-accent/30 mx-auto mb-6" />
          <p className="text-lg md:text-xl lg:text-2xl font-light text-muted-foreground max-w-3xl mx-auto">
            Implementation is where most efforts stall. Not from lack of strategy, but from friction in the systems, workflows, and habits that need to change.
          </p>
        </motion.div>
      </section>

      {/* Visual Break - Approach Section */}
      <section ref={visualRef} className="relative py-24 md:py-32">
        {/* Parallax Background - full bleed with soft fade */}
        <motion.div
          style={{ y: visualBgY }}
          className="absolute inset-0 will-change-transform"
        >
          <ParallaxImage
            src="/images/flow.png"
            alt="Workflow"
            className="w-full h-full opacity-40"
            fadedVertical={true}
          />
        </motion.div>

        {/* Content - no container, just text with subtle shadow for readability */}
        <div className="relative z-10 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-3 gap-12 md:gap-20">
              {approach.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className="text-center"
                >
                  <span className="text-5xl md:text-6xl font-light text-accent/40 block mb-4 drop-shadow-sm">
                    0{i + 1}
                  </span>
                  <h3 className="text-xl md:text-2xl font-medium tracking-tight mb-3 drop-shadow-sm">
                    {item.title}
                  </h3>
                  <p className="text-foreground/70 text-sm md:text-base leading-relaxed drop-shadow-sm">
                    {item.desc}
                  </p>
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
