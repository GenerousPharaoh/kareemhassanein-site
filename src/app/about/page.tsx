'use client';

import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { Download } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import ParallaxImage from '@/components/ParallaxImage';
import { useRef, useEffect } from 'react';

// Animated text block with spring physics
function AnimatedBlock({ children, delay, direction = "up", className = "" }: {
  children: React.ReactNode;
  delay: number;
  direction?: "up" | "left" | "right";
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const springConfig = { stiffness: 80, damping: 20 };
  const opacity = useSpring(0, springConfig);
  const y = useSpring(direction === "up" ? 40 : 0, springConfig);
  const x = useSpring(direction === "left" ? -40 : direction === "right" ? 40 : 0, springConfig);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        opacity.set(1);
        y.set(0);
        x.set(0);
      }, delay * 1000);
      return () => clearTimeout(timer);
    }
  }, [isInView, delay, opacity, y, x]);

  return (
    <motion.div ref={ref} style={{ opacity, y, x }} className={className}>
      {children}
    </motion.div>
  );
}

const experience = [
  {
    period: '2025 - Present',
    role: 'Workflow Automation',
    company: 'Tax Relief Counsel',
    desc: 'Built an LLM-based drafting automation system that reduced document generation time by 85%. Mapped intake and client communication workflows, identified bottlenecks, and created a reusable template library for repeatable output at scale.',
  },
  {
    period: '2024 - Present',
    role: 'Digital Strategy & Operations',
    company: 'Endorphins Health',
    desc: 'Redesigned booking architecture across 6 specialties, reducing intake friction. Built and deployed a 60+ page web application with booking integration and Google Reviews API. Executed local SEO across 8 GTA municipalities.',
  },
  {
    period: '2025 - Present',
    role: 'Clinical Advisor',
    company: 'Neuro-Mod',
    desc: 'Clinical workflow analysis for a medical device startup. Identifying usability friction points and delivering workflow integration recommendations for deployment readiness.',
  },
  {
    period: '2021 - 2024',
    role: 'Registered Physiotherapist',
    company: 'Movement Solutions',
    desc: 'Top revenue-generating clinician for 3 consecutive years. Led the rollout of Heidi AI from evaluation through go-live, achieving 100% adoption in 8 weeks, reducing documentation by 3 hours/week per practitioner, and eliminating $20K in annual admin cost.',
  }
];

function ExperienceItem({ item, index }: { item: typeof experience[0]; index: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"]
  });

  const springConfig = { stiffness: 100, damping: 30 };
  const y = useSpring(useTransform(scrollYProgress, [0, 1], [50, 0]), springConfig);
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1]), springConfig);

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity }}
      className="group relative grid md:grid-cols-[140px_1fr] gap-6 md:gap-10"
    >
      {/* Left column - Period and index */}
      <div className="flex md:flex-col items-baseline md:items-start gap-4 md:gap-2">
        <span className="text-5xl md:text-6xl font-light text-white/[0.04] group-hover:text-accent/10 transition-colors duration-700 leading-none">
          0{index + 1}
        </span>
        <span className="text-sm text-muted-foreground/50 font-mono tracking-wide">
          {item.period}
        </span>
      </div>

      {/* Right column - Content */}
      <div className="md:pt-2">
        <div className="mb-3">
          <h3 className="text-xl md:text-2xl font-medium tracking-tight group-hover:text-accent transition-colors duration-500">
            {item.role}
          </h3>
          <span className="text-muted-foreground/70 text-sm">{item.company}</span>
        </div>
        <p className="text-muted-foreground leading-relaxed">
          {item.desc}
        </p>
      </div>
    </motion.div>
  );
}

export default function About() {
  const heroRef = useRef(null);
  const valuesRef = useRef(null);

  // Hero parallax
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const springConfig = { stiffness: 100, damping: 30 };
  const heroBgY = useSpring(useTransform(heroProgress, [0, 1], [0, 150]), springConfig);
  const heroTextY = useSpring(useTransform(heroProgress, [0, 1], [0, 50]), springConfig);

  // Values section parallax
  const { scrollYProgress: valuesProgress } = useScroll({
    target: valuesRef,
    offset: ["start end", "center center"]
  });
  const valuesY = useSpring(useTransform(valuesProgress, [0, 1], [80, 0]), springConfig);
  const valuesOpacity = useSpring(useTransform(valuesProgress, [0, 0.5, 1], [0, 0.5, 1]), springConfig);
  const valuesScale = useSpring(useTransform(valuesProgress, [0, 1], [0.95, 1]), springConfig);

  return (
    <main className="bg-background text-foreground pt-20">

      {/* Hero */}
      <section ref={heroRef} className="min-h-screen relative overflow-hidden px-6 lg:px-12 xl:px-20 flex flex-col justify-center">

        {/* Cinematic Background with Parallax */}
        <motion.div style={{ y: heroBgY }} className="absolute -inset-20 z-0 will-change-transform">
          <ParallaxImage
            src="/images/digital-cathedral.png"
            alt="Architecture"
            className="w-full h-full opacity-25"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none z-[1]" />

        <motion.div style={{ y: heroTextY }} className="max-w-[1200px] mx-auto relative z-10 py-32 will-change-transform">
          {/* Title */}
          <div className="mb-12 md:mb-20">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 0.5, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="block text-xs font-medium tracking-[0.4em] uppercase text-muted-foreground mb-6"
            >
              About
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-4"
            >
              Kareem Hassanein
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 0.5, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg text-muted-foreground font-light"
            >
              MSc Physiotherapy · Implementation Consultant
            </motion.p>
          </div>

          {/* Story grid - alternating layout */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Left column - The beginning */}
            <div className="space-y-8">
              <AnimatedBlock delay={0.5} direction="up">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-7xl font-light text-white/[0.03]">01</span>
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-accent/30 to-transparent" />
                </div>
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                  I spent years as a physiotherapist. MSc from Robert Gordon, 6,000+ patient sessions, top revenue generator at a busy clinic for three consecutive years. Former semi-professional soccer player in Scotland and Canada.
                </p>
              </AnimatedBlock>

              <AnimatedBlock delay={0.7} direction="up">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-7xl font-light text-white/[0.03]">02</span>
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-accent/30 to-transparent" />
                </div>
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                  But I kept getting pulled into the operational side. Why is the booking system losing referrals? Why are clinicians spending three hours a day on documentation? Why did we buy this software if nobody uses it?
                </p>
              </AnimatedBlock>
            </div>

            {/* Right column - The transition */}
            <div className="space-y-8 lg:pt-24">
              <AnimatedBlock delay={0.9} direction="up">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-7xl font-light text-white/[0.03]">03</span>
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-accent/30 to-transparent" />
                </div>
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                  So I started fixing those problems. Led an AI documentation rollout that hit 100% adoption in 8 weeks. Built web applications. Created automation systems that cut document generation time by 85%.
                </p>
              </AnimatedBlock>

              <AnimatedBlock delay={1.1} direction="up">
                <div className="p-8 rounded-2xl border border-accent/20 bg-accent/[0.03]">
                  <p className="text-xl md:text-2xl text-foreground font-medium leading-relaxed">
                    Now I help healthcare practices and professional services firms do the same. Find the bottlenecks, build the systems, drive the adoption.
                  </p>
                </div>
              </AnimatedBlock>
            </div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-[1px] h-12 bg-gradient-to-b from-accent to-transparent"
          />
        </motion.div>
      </section>

      {/* What I bring */}
      <section ref={valuesRef} className="py-24 md:py-36 px-6 lg:px-12 xl:px-20 border-b border-white/5 overflow-hidden relative">
        {/* Background image - offset for asymmetric interest */}
        <div className="absolute inset-0 z-0">
          <div className="absolute -inset-x-20 inset-y-0 -top-20 -bottom-20">
            <ParallaxImage
              src="/images/crystalline_structure.png"
              alt="Values"
              className="w-full h-full opacity-20 scale-110"
              fadedSides={true}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/40 to-background" />
        </div>

        <motion.div
          style={{ y: valuesY, opacity: valuesOpacity, scale: valuesScale }}
          className="max-w-[900px] mx-auto will-change-transform relative z-10"
        >
          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            <div className="group p-8 rounded-2xl border border-white/5 hover:border-accent/20 hover:bg-white/[0.01] transition-all duration-500">
              <h2 className="text-sm font-medium text-accent mb-4">Why it matters</h2>
              <h3 className="text-2xl md:text-3xl font-medium tracking-tight mb-4 group-hover:text-accent transition-colors duration-500">Operational experience.</h3>
              <p className="text-muted-foreground leading-relaxed">
                8,000+ hours of client-facing delivery. I know what it feels like when systems fight you instead of helping. That shapes how I map workflows, configure tools, and design automations that actually fit into real work.
              </p>
            </div>
            <div className="group p-8 rounded-2xl border border-white/5 hover:border-accent/20 hover:bg-white/[0.01] transition-all duration-500">
              <h2 className="text-sm font-medium text-accent mb-4">How I work</h2>
              <h3 className="text-2xl md:text-3xl font-medium tracking-tight mb-4 group-hover:text-accent transition-colors duration-500">I build things.</h3>
              <p className="text-muted-foreground leading-relaxed">
                I don&apos;t write reports and leave. I build the automation, configure the system, write the SOPs, train the team, and stick around for post-go-live support. When I&apos;m done, people are actually using it.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Experience */}
      <section className="py-24 md:py-36 px-6 lg:px-12 xl:px-20 relative overflow-hidden">
        {/* Background image - centered with soft fade */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0">
            <ParallaxImage
              src="/images/experience_layers.png"
              alt="Experience"
              className="w-full h-full opacity-20"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/40 to-background" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background" />
        </div>

        <div className="max-w-[1000px] mx-auto relative z-10">
          <ScrollReveal direction="up">
            <span className="block text-xs font-medium tracking-[0.3em] uppercase text-muted-foreground mb-6">Experience</span>
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-6">Work history.</h2>
            <div className="h-[1px] bg-gradient-to-r from-accent/50 to-transparent max-w-[200px] mb-16" />
          </ScrollReveal>

          <div className="space-y-12 md:space-y-16">
            {experience.map((item, i) => (
              <div key={item.role}>
                <ExperienceItem item={item} index={i} />
                {i < experience.length - 1 && (
                  <div className="h-[1px] bg-white/5 mt-12 md:mt-16 md:ml-[180px]" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resume CTA */}
      <section className="py-24 md:py-36 px-6 lg:px-12 xl:px-20 border-t border-white/5 relative overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <ParallaxImage
            src="/images/kh_section_divider_signal-to-system_02.png"
            alt="Signal to system"
            className="w-full h-full opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-accent/10 via-transparent to-transparent pointer-events-none z-[1]" />
        <div className="max-w-[900px] mx-auto text-center relative z-10">
          <ScrollReveal direction="up">
            <h2 className="text-2xl md:text-3xl font-medium tracking-tight mb-8">Want the full picture?</h2>
            <a
              href="/Kareem-Hassanein-Resume.pdf"
              className="group inline-flex items-center gap-3 text-lg font-medium bg-foreground text-background px-8 py-4 rounded-full hover:bg-accent transition-all duration-500"
            >
              Download Resume
              <Download size={20} className="group-hover:translate-y-0.5 transition-transform duration-500" />
            </a>
          </ScrollReveal>
        </div>
      </section>

    </main>
  );
}
