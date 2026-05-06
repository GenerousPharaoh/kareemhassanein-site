'use client';

import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import ParallaxImage from '@/components/ParallaxImage';
import AnimatedDivider from '@/components/AnimatedDivider';
import useIsMobile from '@/hooks/useIsMobile';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useRef } from 'react';


const experience = [
  {
    period: '2024 - Present',
    role: 'Digital Strategy & Operations',
    company: 'Endorphins Health',
    desc: <>Led operational and digital infrastructure buildout for a <span className="text-accent/80">6-specialty multidisciplinary clinic</span> while launching the physiotherapy service line as sole clinician. Redesigned and relaunched the clinic website, managed referral pathways across 5 disciplines, and built out local SEO across <span className="text-foreground/90">8 GTA municipalities</span>.</>,
  },
  {
    period: '2025 - Present',
    role: 'Workflow Automation',
    company: 'Tax Relief Counsel',
    desc: <>Built an LLM-based drafting automation system that reduced document generation time by <span className="text-accent/80">85%</span>. Mapped intake and client communication workflows to surface bottlenecks, created SOPs for consistency, and built a <span className="text-foreground/90">reusable template library</span> the firm can run without starting from scratch each time.</>,
  },
  {
    period: '2025 - Present',
    role: 'Clinical Advisor',
    company: 'Neuro-Mod',
    desc: <>Reviewing clinical deployment strategies for a medical device startup. Documenting <span className="text-foreground/90">usability friction</span> in clinician workflows and delivering integration recommendations to support deployment readiness.</>,
  },
  {
    period: '2021 - 2024',
    role: 'Registered Physiotherapist',
    company: 'Private Physiotherapy Clinic',
    desc: <>Top revenue-generating clinician for <span className="text-foreground/90">3 consecutive years</span> on a team of 6, generating <span className="text-accent/80">$600K+ annually</span> through retention workflows and high rebooking rates. Led the rollout of an AI clinical documentation tool (Heidi AI) from evaluation through go-live, achieving <span className="text-accent/80">100% adoption in 8 weeks</span>, cutting documentation by <span className="text-foreground/90">3 hours/week per clinician</span>, and eliminating $20K in annual admin cost.</>,
  }
];

function ValueCard({ title, subtitle, desc }: { title: string; subtitle: string; desc: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -20px 0px" }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="group relative p-8 md:p-10 rounded-lg bg-gradient-to-br from-[hsl(222,12%,13%)] to-[hsl(222,12%,11%)] border border-white/[0.06] hover:border-accent/20 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/20 transition-all duration-500 overflow-hidden"
    >
      {/* Accent top edge */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent/30 via-accent/10 to-transparent" />
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

function ExperienceItem({ item, index }: { item: { period: string; role: string; company: string; desc: React.ReactNode }; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="group relative grid md:grid-cols-[140px_1fr] gap-4 md:gap-8 p-4 md:p-6 -mx-4 md:-mx-6 rounded-xl hover:bg-white/[0.03] transition-all duration-500"
    >
      {/* Timeline dot, visible on desktop with offset for the parent spacing */}
      <div className="absolute left-[175px] top-8 w-[9px] h-[9px] rounded-full border-2 border-accent/40 bg-background z-10 hidden md:block group-hover:border-accent group-hover:bg-accent/20 transition-all duration-500" />

      {/* Left column - Period and index */}
      <div className="flex md:flex-col items-baseline md:items-start gap-3 md:gap-1.5">
        <span className="text-3xl md:text-4xl font-light text-accent/20 leading-none group-hover:text-accent/35 transition-colors duration-500">
          0{index + 1}
        </span>
        <span className="text-xs text-muted-foreground/50 font-mono tracking-wide">
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
  const shouldReduceMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const disableScrollMotion = shouldReduceMotion || isMobile;

  // Hero parallax
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const springConfig = { stiffness: 80, damping: 35 };
  const heroBgY = useSpring(useTransform(heroProgress, [0, 1], [0, disableScrollMotion ? 0 : 100]), springConfig);
  const heroTextY = useSpring(useTransform(heroProgress, [0, 1], [0, disableScrollMotion ? 0 : 40]), springConfig);

  return (
    <main className="bg-background text-foreground pt-20">

      {/* Hero */}
      <section ref={heroRef} className="min-h-svh relative overflow-hidden px-6 lg:px-12 xl:px-20 flex flex-col justify-center">

        {/* Cinematic Background with Parallax */}
        <motion.div style={{ y: heroBgY }} className="absolute inset-0 z-0 will-change-transform flex items-center justify-center">
          <ParallaxImage
            src="/images/mapping.webp"
            alt=""
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
                className="font-medium tracking-tight mb-8 leading-[0.9]"
                style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
              >
                Kareem<br />Hassanein
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-[1px] w-12 bg-accent mb-8 origin-left"
              />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-1.5 max-w-[280px]"
              >
                <p className="text-lg md:text-xl text-foreground/85 font-medium tracking-wide leading-tight">
                  Clinical Implementation Advisor
                </p>
                <p className="text-sm md:text-base text-muted-foreground/80 italic font-serif font-light leading-snug">
                  for Health-Tech &amp; Service Innovation
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="flex gap-2 mt-4"
              >
                <span className="text-[10px] font-medium tracking-[0.15em] uppercase text-muted-foreground/50 px-3 py-1 rounded-full border border-white/[0.06]">MSc PT</span>
                <span className="text-[10px] font-medium tracking-[0.15em] uppercase text-muted-foreground/50 px-3 py-1 rounded-full border border-white/[0.06]">BSc Kin</span>
              </motion.div>
            </div>

            {/* Narrative Column (Right) */}
            <div className="space-y-12 md:space-y-14 relative">
              {/* Vertical accent "spine" */}
              <div className="absolute -left-6 lg:-left-12 top-2 bottom-2 w-[1px] bg-gradient-to-b from-accent/40 via-accent/10 to-transparent" />

              {/* Bio — first person throughout, sets credentials and scope */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-6 md:space-y-7"
              >
                <p className="text-lg md:text-xl text-foreground/85 leading-relaxed font-light tracking-tight">
                  I&apos;m a practicing <span className="text-foreground">physiotherapist and clinical implementation advisor</span> working with health-tech and health innovation startups on digital adoption, product rollout, and the practical realities of bringing new tools into care delivery and service operations. I bring a McMaster background in kinesiology and graduate training in physiotherapy from Robert Gordon University, where I completed my <span className="text-foreground">MSc with Distinction</span>.
                </p>
                <p className="text-base md:text-lg text-muted-foreground/85 leading-relaxed font-light">
                  My perspective is grounded in <span className="text-foreground/90">thousands of hours of coaching and patient care</span>, along with hands-on clinic operations and experience introducing digital tools into clinical and professional settings. I help founders understand how their product fits into existing routines, what it asks of clinicians, patients, and teams, and how to adjust the design, workflow, or rollout so it has a better chance of becoming part of routine use.
                </p>
                <p className="text-base md:text-lg text-muted-foreground/85 leading-relaxed font-light">
                  My advisory work is especially relevant to teams building <span className="text-foreground/90">rehabilitation, patient engagement, AI documentation, clinical workflow, and service innovation</span> tools.
                </p>
              </motion.div>

              {/* Hairline accent before the personal narrative continuation */}
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className="h-[1px] w-16 bg-accent/35 origin-left"
              />

              {/* Continued narrative */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="text-xl md:text-2xl text-foreground/70 leading-relaxed font-light tracking-tight">
                  I spent years on the frontline. Personal trainer, fitness manager, physiotherapist. I built caseloads, managed operations for a <span className="text-foreground">25-person team</span>, and was the <span className="text-foreground">highest-revenue clinician</span> at my practice for three consecutive years. The through-line has always been the same: <span className="text-accent/90 font-normal">getting people to adopt and stick with</span> new systems, routines, or behaviours.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="text-lg md:text-xl text-muted-foreground/80 leading-relaxed font-light">
                  Whether it was a patient following through on a home exercise program, a trainer learning a sales process, or a clinician adopting new documentation software, the challenge was always the same. <span className="text-foreground/90">People resist systems that add friction to their day.</span> The gap between how a tool is designed and <span className="text-accent/80">how it gets used</span> is where most rollouts fall apart.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="h-[1px] w-12 bg-accent/40 mb-8" />
                <p className="text-lg md:text-xl text-muted-foreground/80 leading-relaxed font-light">
                  Now I work across healthcare, legal, and med-tech environments, running implementations inside practices and advising founders on how their tools <span className="text-foreground/90">fit into the routines of clinicians and patients</span>. I <span className="text-foreground/90">map workflows before touching configuration</span>, talk to the people who will use the system, and <span className="text-foreground/90">stay through adoption</span>.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>

      </section>

      {/* Divider */}
      <div className="px-6 lg:px-12 xl:px-20 py-4">
        <AnimatedDivider direction="left" accent maxWidth="200px" />
      </div>

      {/* What I bring */}
      <section className="py-16 md:py-24 px-6 lg:px-12 xl:px-20">
        <div className="max-w-[900px] mx-auto">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -20px 0px" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mb-10 md:mb-12"
          >
            <span className="text-[10px] md:text-xs font-medium tracking-[0.25em] uppercase text-accent mb-3 block">
              What I Bring
            </span>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-5 md:gap-6">
            <ValueCard
              subtitle="Background"
              title="Clinical, operational, and technical."
              desc={<>I have generated <span className="text-accent/80">$600K+ in clinical revenue</span>, managed a <span className="text-foreground/90">25-person team</span>, rebuilt a clinic website, and built LLM-powered automation for document generation.</>}
            />
            <ValueCard
              subtitle="Process"
              title="Map, build, and stay."
              desc={<>I sit with the team and watch the workflow run before changing anything. Then I build the system to match it, whether that means writing automation, configuring software, or wiring up integrations. After launch, I <span className="text-accent/80">stay through the first weeks</span> and fix what comes up.</>}
            />
          </div>
        </div>
      </section>

      {/* Mentorship */}
      <section className="py-12 md:py-16 px-6 lg:px-12 xl:px-20">
        <div className="max-w-[900px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -20px 0px" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-[10px] md:text-xs font-medium tracking-[0.25em] uppercase text-accent mb-4 block">
              Mentorship
            </span>
            <h3 className="text-2xl md:text-3xl font-medium tracking-tight mb-5">
              Lab2Market Validate <span className="text-accent/90 italic font-serif">at</span> McMaster University
            </h3>
            <p className="text-base md:text-lg text-muted-foreground/80 leading-relaxed max-w-2xl font-light">
              Volunteer mentor for the <span className="text-foreground/90">June 2026 cohort</span>, supporting Canadian researchers as they test and commercialize <span className="text-foreground/90">MedTech innovations</span> through the McMaster Industry Liaison Office&apos;s Lab2Market program.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Experience */}
      <section ref={historyRef} className="py-28 md:py-40 px-6 lg:px-12 xl:px-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[hsl(222,14%,10%)]/35" />

        <div className="max-w-[1000px] mx-auto relative z-10">
          <ScrollReveal direction="up">
            <span className="block text-xs font-medium tracking-[0.3em] uppercase text-muted-foreground mb-6">Experience</span>
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-6">Work <span className="text-accent/90 italic font-serif">history.</span></h2>
            <AnimatedDivider direction="left" accent maxWidth="200px" className="mb-12" />
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

      {/* CTA Section */}
      <section className="py-24 md:py-32 px-6 lg:px-12 xl:px-20 relative overflow-hidden">
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -20px 0px" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="h-[1px] w-20 mx-auto mb-10 bg-gradient-to-r from-transparent via-accent/50 to-transparent" style={{ boxShadow: '0 0 16px rgba(176,141,87,0.12)' }} />
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-6 text-balance">
              What that looks like in practice.
            </h2>
            <p className="text-lg text-muted-foreground/80 font-light leading-relaxed mb-10 max-w-xl mx-auto">
              See the services I offer, or reach out if you already know what you need.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <Link
                href="/services"
                className="group inline-flex items-center gap-3 text-sm md:text-base font-medium px-8 py-4 rounded-full bg-accent text-background hover:bg-accent/90 transition-all duration-300"
              >
                View services
                <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform duration-300" />
              </Link>
              <Link
                href="/contact"
                className="text-sm md:text-base font-medium text-foreground/70 px-8 py-4 rounded-full border border-white/[0.1] hover:text-foreground hover:border-accent/30 hover:bg-white/[0.03] hover:shadow-[0_0_20px_rgba(176,141,87,0.06)] transition-all duration-300"
              >
                Get in touch
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </main>
  );
}
