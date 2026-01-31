'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import ParallaxImage from '@/components/ParallaxImage';
import AnimatedDivider from '@/components/AnimatedDivider';
import { useRef } from 'react';

// Animated text block - simplified for snappier feel
function AnimatedBlock({ children, delay, className = "" }: {
  children: React.ReactNode;
  delay: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: delay * 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const experience = [
  {
    period: '2024 - Present',
    role: 'Digital Strategy & Operations',
    company: 'Endorphins Health',
    desc: 'Leading digital operations for a multidisciplinary clinic with 8 practitioners across 6 specialties. Redesigned booking architecture for multi-provider scheduling, built conversion flows from service pages to booking, and deployed a local SEO engine across 8 GTA municipalities.',
  },
  {
    period: '2025 - Present',
    role: 'Workflow Automation',
    company: 'Tax Relief Counsel',
    desc: 'Built an LLM-based drafting automation system that reduced document generation time by 85%. Mapped intake and client communication workflows to surface bottlenecks, created SOPs for consistency, and built a reusable template library for scalable output.',
  },
  {
    period: '2025 - Present',
    role: 'Clinical Advisor',
    company: 'Neuro-Mod',
    desc: 'Reviewing clinical deployment strategies for a medical device startup. Documenting usability friction in clinician workflows and delivering integration recommendations to support deployment readiness.',
  },
  {
    period: '2021 - 2024',
    role: 'Registered Physiotherapist',
    company: 'Private Physiotherapy Clinic',
    desc: 'Top revenue-generating clinician for 3 consecutive years on a team of 6, generating $200K+ annually through retention workflows and high rebooking rates. Led the Heidi AI rollout from evaluation through go-live, achieving 100% adoption in 8 weeks, cutting documentation by 3 hours/week per clinician, and eliminating $20K in annual admin cost.',
  }
];

function ValueCard({ title, subtitle, desc }: { title: string; subtitle: string; desc: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="group relative p-8 md:p-10 rounded-2xl bg-[hsl(220,18%,9%)] border border-white/[0.06] hover:border-white/[0.1] transition-colors duration-500"
    >
      <span className="text-[10px] md:text-xs font-medium tracking-[0.2em] uppercase text-accent/60 mb-4 block">{subtitle}</span>
      <h3 className="text-xl md:text-2xl font-medium tracking-tight mb-4 group-hover:text-accent transition-colors duration-500">
        {title}
      </h3>
      <p className="text-sm md:text-base text-muted-foreground/80 leading-relaxed">
        {desc}
      </p>
    </motion.div>
  );
}

function ExperienceItem({ item, index }: { item: typeof experience[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative grid md:grid-cols-[140px_1fr] gap-4 md:gap-8"
    >
      {/* Left column - Period and index */}
      <div className="flex md:flex-col items-baseline md:items-start gap-3 md:gap-1">
        <span className="text-3xl md:text-4xl font-light text-accent/20 leading-none">
          0{index + 1}
        </span>
        <span className="text-xs text-muted-foreground/60 font-mono tracking-wide">
          {item.period}
        </span>
      </div>

      {/* Right column - Content */}
      <div className="md:pt-1">
        <div className="mb-2">
          <h3 className="text-lg md:text-xl font-medium tracking-tight group-hover:text-accent transition-colors duration-300">
            {item.role}
          </h3>
          <span className="text-muted-foreground/60 text-sm">{item.company}</span>
        </div>
        <p className="text-sm md:text-base text-muted-foreground/80 leading-relaxed">
          {item.desc}
        </p>
      </div>
    </motion.div>
  );
}

export default function About() {
  const heroRef = useRef(null);
  const historyRef = useRef(null);

  // Hero parallax
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const springConfig = { stiffness: 100, damping: 30 };
  const heroBgY = useSpring(useTransform(heroProgress, [0, 1], [0, 150]), springConfig);
  const heroTextY = useSpring(useTransform(heroProgress, [0, 1], [0, 50]), springConfig);

  return (
    <main className="bg-background text-foreground pt-20">

      {/* Hero */}
      <section ref={heroRef} className="min-h-screen relative overflow-hidden px-6 lg:px-12 xl:px-20 flex flex-col justify-center">

        {/* Cinematic Background with Parallax */}
        <motion.div style={{ y: heroBgY }} className="absolute inset-0 z-0 will-change-transform flex items-center justify-center">
          <ParallaxImage
            src="/images/mapping.png"
            alt="Mapping workflows"
            className="max-w-3xl w-full opacity-50"
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
                className="text-lg md:text-xl text-foreground/80 font-medium tracking-wide max-w-[240px]"
              >
                Implementation Consultant
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                transition={{ duration: 0.6, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="text-sm text-muted-foreground tracking-wide mt-3"
              >
                MSc PT · BSc Kin
              </motion.p>
            </div>

            {/* Narrative Column (Right) */}
            <div className="space-y-24 relative">
              {/* Vertical accent "spine" */}
              <div className="absolute -left-6 lg:-left-12 top-2 bottom-2 w-[1px] bg-gradient-to-b from-accent/40 via-accent/10 to-transparent" />

              <AnimatedBlock delay={0.5}>
                <p className="text-xl md:text-2xl text-foreground/90 leading-relaxed font-light tracking-tight">
                  I spent years on the frontline. Personal trainer, fitness manager, physiotherapist. I built caseloads, managed operations for a 25-person team, and was the highest-revenue clinician at my practice for three consecutive years. The through-line has always been the same: getting people to adopt and stick with new systems, routines, or behaviours.
                </p>
              </AnimatedBlock>

              <AnimatedBlock delay={0.7}>
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-light">
                  Whether it was a patient following through on a home exercise program, a trainer learning a sales process, or a clinician adopting new documentation software, the challenge was always the same. People resist systems that add friction to their day. The gap between how a tool is designed to work and how the work actually happens is where most rollouts fall apart.
                </p>
              </AnimatedBlock>

              <AnimatedBlock delay={0.9}>
                <div className="h-[1px] w-12 bg-accent/40 mb-8" />
                <div className="overflow-hidden">
                  <motion.p
                    initial={{ y: "100%", opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="text-lg md:text-xl text-muted-foreground leading-relaxed font-light"
                  >
                    Now I work across healthcare, legal, and med-tech environments. I map workflows before touching configuration, talk to the people who will use the system, and stay through adoption. Go-live is where most implementations start to fail, not where they end.
                  </motion.p>
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
      <section className="py-20 md:py-28 px-6 lg:px-12 xl:px-20">
        <div className="max-w-[900px] mx-auto">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mb-10 md:mb-12"
          >
            <span className="text-[10px] md:text-xs font-medium tracking-[0.25em] uppercase text-accent mb-3 block">
              What I Bring
            </span>
            <h2 className="text-2xl md:text-3xl font-medium tracking-tight">
              Two perspectives, one focus.
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            <ValueCard
              subtitle="Background"
              title="Clinical, operational, and technical."
              desc="I have run a $200K clinical caseload, managed operations for a 25-person multidisciplinary team, redesigned booking architecture across 6 specialties, and built LLM-powered automation for document generation. The range means I can move between the clinical floor, the back office, and the codebase."
            />
            <ValueCard
              subtitle="Process"
              title="Map, build, and stay."
              desc="I start by understanding how the work actually moves before touching any configuration. Then I build the system to match that workflow, whether that means writing automation, configuring software, or wiring up integrations. Then I stay through the first stretch of real use to adjust what needs adjusting."
            />
          </div>
        </div>
      </section>

      {/* Experience */}
      <section ref={historyRef} className="py-24 md:py-36 px-6 lg:px-12 xl:px-20 relative overflow-hidden">
        {/* Background image - centered with soft fade */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0">
            <ParallaxImage
              src="/images/experience_layers.png"
              alt="Experience"
              className="w-full h-full opacity-50"
              fadedSides={true}
              fadedVertical={true}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-transparent to-background/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/60" />
        </div>

        <div className="max-w-[1000px] mx-auto relative z-10">
          <ScrollReveal direction="up">
            <span className="block text-xs font-medium tracking-[0.3em] uppercase text-muted-foreground mb-6">Experience</span>
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-6">Work history.</h2>
            <AnimatedDivider direction="left" accent maxWidth="200px" className="mb-16" />
          </ScrollReveal>

          <div className="relative space-y-12 md:space-y-16">
            {/* Vertical timeline thread */}
            <div className="absolute left-[155px] top-8 bottom-8 w-[1px] bg-white/[0.05] hidden md:block" />
            <motion.div
              className="absolute left-[155px] top-8 bottom-8 w-[1px] bg-accent/30 origin-top hidden md:block"
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
