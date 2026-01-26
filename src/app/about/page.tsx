'use client';

import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
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
    desc: 'Redesigned booking architecture across 6 specialties, reducing intake friction. Executed local SEO across 8 GTA municipalities.',
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
    company: 'Private Physiotherapy Clinic',
    desc: 'Top revenue-generating clinician for 3 consecutive years. Led the rollout of Heidi AI from evaluation through go-live, achieving 100% adoption in 8 weeks, reducing documentation by 3 hours/week per practitioner, and eliminating $20K in annual admin cost.',
  }
];

function ValueCard({ title, subtitle, desc }: { title: string; subtitle: string; desc: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const spotlightOpacity = useSpring(0, { stiffness: 100, damping: 30 });
  const spotlightX = useSpring(0, { stiffness: 150, damping: 25 });
  const spotlightY = useSpring(0, { stiffness: 150, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    spotlightX.set(x);
    spotlightY.set(y);
  };

  const springScale = { stiffness: 400, damping: 30 };
  const scale = useSpring(1, springScale);

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => {
        spotlightOpacity.set(0.15);
        scale.set(1.02);
      }}
      onMouseLeave={() => {
        spotlightOpacity.set(0);
        scale.set(1);
      }}
      style={{ scale }}
      className="group relative p-8 rounded-2xl border border-white/5 bg-white/[0.01] backdrop-blur-md hover:border-accent/20 transition-all duration-500 overflow-hidden"
    >
      <motion.div
        className="absolute pointer-events-none z-0 w-64 h-64 rounded-full blur-3xl"
        style={{
          background: `radial-gradient(circle, hsl(var(--accent)) 0%, transparent 70%)`,
          x: spotlightX,
          y: spotlightY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: spotlightOpacity,
        }}
      />
      <div className="relative z-10">
        <h2 className="text-sm font-medium text-accent mb-4">{subtitle}</h2>
        <h3 className="text-2xl md:text-3xl font-medium tracking-tight mb-4 group-hover:text-accent transition-colors duration-500">
          {title}
        </h3>
        <p className="text-muted-foreground leading-relaxed">
          {desc}
        </p>
      </div>
    </motion.div>
  );
}

function ExperienceItem({ item, index }: { item: typeof experience[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-40% 0% -40% 0%" });
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
        <motion.span
          animate={{ opacity: isInView ? 0.15 : 0.04 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-light text-white group-hover:text-accent/20 transition-colors duration-700 leading-none"
        >
          0{index + 1}
        </motion.span>
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
  const historyRef = useRef(null);

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
            fadedVertical={true}
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none z-[1]" />

        <motion.div style={{ y: heroTextY }} className="max-w-[1200px] mx-auto relative z-10 py-32 will-change-transform">
          <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-24 items-start">

            {/* Identity Column (Left) */}
            <div className="lg:sticky lg:top-48">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 0.5, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="block text-xs font-medium tracking-[0.4em] uppercase text-muted-foreground mb-6"
              >
                About
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl md:text-5xl lg:text-7xl font-medium tracking-tight mb-8 leading-[0.9]"
              >
                Kareem<br />Hassanein
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-[1px] w-12 bg-accent mb-8 origin-left"
              />

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 0.6, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="text-lg md:text-xl text-muted-foreground font-medium tracking-wide max-w-[200px]"
              >
                MSc Physiotherapy <br />Implementation Consultant
              </motion.p>
            </div>

            {/* Narrative Column (Right) */}
            <div className="space-y-24 relative">
              {/* Vertical accent "spine" */}
              <div className="absolute -left-6 lg:-left-12 top-2 bottom-2 w-[1px] bg-gradient-to-b from-accent/40 via-accent/10 to-transparent" />

              <AnimatedBlock delay={0.6} direction="up">
                <p className="text-xl md:text-2xl text-foreground/90 leading-relaxed font-light tracking-tight">
                  I spent years as a physiotherapist, treating patients and watching how clinics actually work. Not from a consulting report, but from inside the room, using the systems every day.
                </p>
              </AnimatedBlock>

              <AnimatedBlock delay={0.8} direction="up">
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-light">
                  I saw why software rollouts fail. It is rarely the technology. It is the gap between how the tool expects you to work and how the work actually happens. Clinicians ignore systems that add friction to their day, no matter how good the feature set is.
                </p>
              </AnimatedBlock>

              <AnimatedBlock delay={1.0} direction="up">
                <div className="h-[1px] w-12 bg-accent/40 mb-8" />
                <div className="overflow-hidden">
                  <motion.p
                    initial={{ y: "100%", opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="text-lg md:text-xl text-muted-foreground leading-relaxed font-light"
                  >
                    That perspective shapes everything I do now. I map workflows before touching configuration. I talk to the people who will use the system. And I stay through adoption, because go-live is where most implementations fall apart.
                  </motion.p>
                </div>
              </AnimatedBlock>
            </div>
          </div>
        </motion.div>

        {/* Transition / Mission Block */}
        <section className="pb-32 px-6 lg:px-12 xl:px-20 relative z-10">
          <div className="max-w-[700px] mx-auto">
            <AnimatedBlock delay={0.2} direction="up">
              <div className="p-10 md:p-16 rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-sm relative overflow-hidden group text-center block">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <p className="text-2xl md:text-3xl text-foreground font-medium leading-[1.3] relative z-10">
                  That is the difference between installation and adoption. Between buying software and getting value from it. Between a process on paper and one that actually runs.
                </p>
              </div>
            </AnimatedBlock>
          </div>
        </section>

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
              fadedVertical={true}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/40 to-background" />
        </div>

        <motion.div
          style={{ y: valuesY, opacity: valuesOpacity, scale: valuesScale }}
          className="max-w-[900px] mx-auto will-change-transform relative z-10"
        >
          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            <ValueCard
              subtitle="Why it matters"
              title="I have been the end user."
              desc="Most consultants study workflows from the outside. I have used the systems I now help implement. That shapes how I think about configuration, training, and what actually makes people adopt something new."
            />
            <ValueCard
              subtitle="How I work"
              title="I stay through adoption."
              desc="Go-live is not the finish line. It is where most implementations start to fail. I stick around through the first weeks and months, adjusting the system as real usage reveals what needs to change. The goal is not a successful launch. It is sustained use."
            />
          </div>
        </motion.div>
      </section>

      {/* Experience */}
      <section ref={historyRef} className="py-24 md:py-36 px-6 lg:px-12 xl:px-20 relative overflow-hidden">
        {/* Background image - centered with soft fade */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0">
            <ParallaxImage
              src="/images/experience_layers.png"
              alt="Experience"
              className="w-full h-full opacity-20"
              fadedSides={true}
              fadedVertical={true}
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

          <div className="relative space-y-12 md:space-y-16">
            {/* Vertical timeline thread */}
            <div className="absolute left-[70px] top-8 bottom-8 w-[1px] bg-white/[0.05] hidden md:block" />
            <motion.div
              className="absolute left-[70px] top-8 bottom-8 w-[1px] bg-accent/30 origin-top hidden md:block"
              style={{
                scaleY: useSpring(useTransform(useScroll({
                  target: historyRef,
                  offset: ["start center", "end center"]
                }).scrollYProgress, [0, 1], [0, 1]), { stiffness: 100, damping: 30 })
              }}
            />

            {experience.map((item, i) => (
              <div key={item.role}>
                <ExperienceItem item={item} index={i} />
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
