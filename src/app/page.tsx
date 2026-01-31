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
      <section ref={heroRef} className="min-h-screen flex items-center justify-center relative px-6 md:px-12 xl:px-20 pt-20 md:pt-24 bg-background overflow-hidden">

        {/* Cinematic Background Layer - Simple Parallax */}
        <motion.div
          style={{ y: heroBgY }}
          className="absolute -inset-x-0 -top-32 -bottom-64 z-0 will-change-transform"
        >
          <ParallaxImage
            src="/images/orchestrating.png"
            alt="Cinematic Core"
            className="w-full h-full opacity-40"
          />
        </motion.div>

        {/* Refined gradient overlay with stronger vignette */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-background via-background/30 via-20% to-background pointer-events-none" />
        <div className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,transparent_0%,hsl(var(--background))_100%)] pointer-events-none" />

        <div className="relative z-10 w-full max-w-[1400px] h-full flex flex-col justify-center py-16 md:py-20">
          <div className="flex flex-col items-center text-center">

            {/* Text Content */}
            <div className="space-y-8 md:space-y-10 mx-auto max-w-4xl">

              {/* Enhanced tagline badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="inline-flex items-center gap-2 text-[11px] md:text-xs font-medium tracking-[0.2em] md:tracking-[0.3em] uppercase text-foreground/60 border border-white/[0.08] px-4 md:px-5 py-2 md:py-2.5 rounded-full backdrop-blur-sm bg-white/[0.02]"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-accent/80" />
                Digital Transformation & Implementation Consulting
              </motion.div>

              {/* Headline with improved spacing and sizing */}
              <div className="pt-4 md:pt-6">
                <h1 className="text-[2.5rem] md:text-6xl lg:text-[5.5rem] font-medium leading-[0.95] md:leading-[0.9] tracking-[-0.04em] md:tracking-[-0.05em] text-balance">
                  <motion.span
                    initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="block"
                  >
                    I find friction, solve it,
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="block"
                  >
                    and make it{" "}
                    <motion.span
                      initial={{ opacity: 0, scale: 0.9, filter: "blur(12px)" }}
                      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                      transition={{ duration: 1.2, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
                      className="inline-block text-accent italic font-serif relative"
                    >
                      stick
                      <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-accent/30 rounded-full" />
                    </motion.span>
                    <span className="text-accent">.</span>
                  </motion.span>
                </h1>
              </div>

              {/* Description with refined styling */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-2xl mx-auto pt-2"
              >
                <p className="text-base md:text-lg lg:text-xl text-muted-foreground/90 font-light leading-relaxed">
                  I help healthcare practices and professional services firms remove operational friction. Whether it&apos;s automating documentation, redesigning workflows, or rolling out new tools, I stay through adoption until it actually works.
                </p>
              </motion.div>

              {/* Metrics Row - Enhanced cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 max-w-3xl mx-auto pt-8 md:pt-10">
                {metrics.map((m, i) => (
                  <motion.div
                    key={m.label}
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 1.2 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                    className="group relative p-5 md:p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-accent/20 hover:bg-white/[0.04] transition-all duration-500"
                  >
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <p className="relative text-2xl md:text-3xl font-serif italic text-accent mb-2">{m.value}</p>
                    <p className="relative text-[11px] md:text-xs text-muted-foreground/80 leading-relaxed">{m.label}</p>
                  </motion.div>
                ))}
              </div>

              {/* CTAs - Enhanced styling */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col sm:flex-row gap-4 items-center justify-center pt-8 md:pt-10"
              >
                <Link
                  href="/contact"
                  className="group relative flex items-center justify-center gap-3 text-base md:text-lg font-medium tracking-tight bg-foreground text-background w-full sm:w-auto px-7 md:px-8 py-3.5 md:py-4 rounded-full overflow-hidden transition-all duration-500 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                >
                  <span className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                  <span className="relative">Get in touch</span>
                  <ArrowRight size={18} className="relative group-hover:translate-x-1 transition-transform duration-500" />
                </Link>
                <Link
                  href="/about"
                  className="text-base md:text-lg font-medium tracking-tight text-foreground/60 hover:text-foreground w-full sm:w-auto text-center px-7 md:px-8 py-3.5 md:py-4 rounded-full border border-white/[0.08] hover:border-white/[0.15] hover:bg-white/[0.03] transition-all duration-500"
                >
                  Learn more
                </Link>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Subtle bottom fade for section transition */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-[2] pointer-events-none" />
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
