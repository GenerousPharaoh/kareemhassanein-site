'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import TextReveal from '@/components/TextReveal';
import ProjectList from '@/components/ProjectList';
import ParallaxImage from '@/components/ParallaxImage';
import Link from 'next/link';
import { useRef } from 'react';

const metrics = [
  { label: 'Reduction in document drafting time after deploying LLM automation at a legal services firm', value: '85%' },
  { label: 'Clinician adoption of AI documentation tools within 8 weeks of go-live', value: '100%' },
  { label: 'Increase in Google reviews after redesigning a clinic\'s review capture workflow', value: '125%' },
];

const approach = [
  { title: 'Map', desc: 'Before configuring anything, I watch how work actually moves. Where do things slow down? What steps get skipped? What workarounds have people built?' },
  { title: 'Build', desc: 'The system has to fit the workflow, not the other way around. I configure tools around how your team already operates, not how a manual says they should.' },
  { title: 'Launch', desc: 'Go-live is the beginning, not the end. I stay through the first weeks, adjusting based on real usage until the new way becomes the default way.' },
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
  const visualOpacity = useSpring(useTransform(visualProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]), springConfig);

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
      <section ref={heroRef} className="min-h-screen flex items-center justify-center relative px-6 md:px-12 xl:px-20 pt-40 md:pt-32 bg-background">

        {/* Cinematic Background Layer - Simple Parallax */}
        <motion.div
          style={{ y: heroBgY }}
          className="absolute -inset-x-0 -top-32 -bottom-64 z-0 will-change-transform"
        >
          <ParallaxImage
            src="/images/orchestrating.png"
            alt="Cinematic Core"
            className="w-full h-full opacity-20"
          />
        </motion.div>
        {/* Fixed gradient overlay - extends beyond section for seamless blend */}
        <div className="absolute inset-x-0 -top-10 -bottom-64 z-[1] bg-gradient-to-b from-background via-background/0 via-30% to-background pointer-events-none" />

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

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium leading-[0.9] tracking-tighter mb-16 text-balance">
                <motion.span
                  initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="inline"
                >
                  I find friction, solve it,{" "}
                </motion.span>
                <br />
                <motion.span
                  initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="inline"
                >
                  and make it{" "}
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, scale: 0.8, filter: "blur(12px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  transition={{ duration: 1.2, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-block text-accent italic font-serif"
                >
                  stick.
                </motion.span>
              </h1>

              <div className="max-w-2xl mx-auto">
                <TextReveal
                  text="Operations improvement, workflow automation, and technology implementation for healthcare practices and professional services firms. I map out where time and money are leaking, then build the systems, automations, and processes to stop it."
                  className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed"
                  delay={1.0}
                />
              </div>

              {/* Metrics Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-6 max-w-3xl mx-auto pt-4">
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
                className="flex gap-6 items-center justify-center pt-10"
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
      <section ref={transitionRef} className="py-20 md:py-32 w-full relative flex items-center justify-center bg-background">

        <motion.div
          style={{ y: statementY, opacity: statementOpacity, scale: statementScale }}
          className="relative z-10 text-center px-6 max-w-5xl mx-auto will-change-transform"
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight leading-[1.1] mb-6">
            Most software fails at adoption, not installation.
          </h2>
          <div className="h-[1px] w-32 bg-accent/30 mx-auto mb-6" />
          <p className="text-xl md:text-2xl lg:text-3xl font-light text-muted-foreground max-w-3xl mx-auto">
            The tool works fine. The rollout went smoothly. But three months later, half the team is back to spreadsheets. The problem is never the feature set. It is the gap between how the system wants you to work and how your work actually happens.
          </p>
        </motion.div>
      </section>

      {/* Visual Break - Approach Section */}
      <section ref={visualRef} className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        {/* Parallax Background - Enhanced depth */}
        <motion.div
          style={{ y: visualBgY }}
          className="absolute inset-0 -top-32 -bottom-32 will-change-transform"
        >
          <ParallaxImage
            src="/images/flow.png"
            alt="Workflow"
            className="w-full h-full opacity-35 scale-110"
          />
        </motion.div>

        {/* Lighter gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none" />

        {/* Content */}
        <motion.div
          style={{ opacity: visualOpacity }}
          className="relative z-10 h-full flex items-center justify-center px-6"
        >
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-10 md:gap-16">
              {approach.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className="text-center"
                >
                  <span className="text-6xl md:text-7xl font-light text-accent/30 block mb-3">
                    0{i + 1}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-medium tracking-tight mb-3">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Selected Projects */}
      <section ref={portfolioRef} className="py-24 md:py-36 relative z-10 w-full px-6 md:px-12 xl:px-20 overflow-hidden">
        {/* Background image - positioned for visual interest */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 -right-1/4 top-0">
            <ParallaxImage
              src="/images/flow of organized transformation.png"
              alt="Transformation"
              className="w-full h-full opacity-20"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/60 to-background" />
        </div>

        <div className="max-w-[1400px] mx-auto relative z-10">
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
