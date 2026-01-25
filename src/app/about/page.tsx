'use client';

import { Download } from 'lucide-react';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import CharReveal from '@/components/CharReveal';
import ParallaxImage from '@/components/ParallaxImage';
import AmbientParticles from '@/components/AmbientParticles';

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
    desc: 'Reviewing clinician workflows for a medical device startup. Documenting usability friction points and delivering workflow integration recommendations to support deployment readiness.',
  },
  {
    period: '2021 - 2024',
    role: 'Registered Physiotherapist',
    company: 'Movement Solutions',
    desc: 'Top revenue-generating clinician for 3 consecutive years. Led the rollout of Heidi AI from evaluation through go-live, achieving 100% adoption in 8 weeks, reducing documentation by 3 hours/week per practitioner, and eliminating $20K in annual admin cost.',
  }
];

const ease = [0.16, 1, 0.3, 1] as const;

export default function About() {
  return (
    <main className="bg-background text-foreground pt-16 md:pt-20">

      {/* Hero */}
      <section className="min-h-[60vh] md:min-h-[70vh] flex items-center relative border-b border-white/5 overflow-hidden px-6 lg:px-12">

        {/* Ambient Particles */}
        <AmbientParticles count={12} className="z-[1]" />

        {/* Cinematic Background */}
        <div className="absolute inset-0 z-0">
          <ParallaxImage
            src="/images/digital-cathedral.png"
            alt="Architecture"
            className="w-full h-full opacity-20"
            intensity="subtle"
            overlay="both"
          />
        </div>

        {/* Animated gradient orb */}
        <motion.div
          className="absolute top-1/3 right-0 w-[200px] h-[200px] md:w-[400px] md:h-[400px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, hsl(38 30% 75% / 0.12) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
          animate={{
            x: [0, -30, 0],
            y: [0, 20, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="max-w-[900px] mx-auto relative z-10 py-20 md:py-32">
          <ScrollReveal direction="up">
            <motion.span
              className="block text-[10px] md:text-xs font-medium tracking-[0.2em] md:tracking-[0.3em] uppercase text-muted-foreground mb-4 md:mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease, delay: 0.2 }}
            >
              Background
            </motion.span>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-medium tracking-tight mb-8 md:mb-10">
              How I <CharReveal delay={0.4} className="text-accent italic font-serif">got here.</CharReveal>
            </h1>
            <div className="space-y-4 md:space-y-6 text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease, delay: 0.3 }}
              >
                I spent years as a physiotherapist. MSc from Robert Gordon, 6,000+ patient sessions, top revenue generator at a busy clinic for three consecutive years.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease, delay: 0.4 }}
              >
                But I kept getting pulled into the operational side. Why is the booking system losing referrals? Why are clinicians spending three hours a day on documentation? Why did we buy this software if nobody uses it?
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease, delay: 0.5 }}
              >
                So I started fixing those problems. Led an AI documentation rollout that hit 100% adoption in 8 weeks. Built web applications. Created automation systems that cut document generation time by 85%.
              </motion.p>
              <motion.p
                className="text-foreground"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease, delay: 0.6 }}
              >
                Now I help healthcare practices and professional services firms do the same. Find the bottlenecks, build the systems, drive the adoption.
              </motion.p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* What I bring */}
      <section className="py-12 md:py-24 px-6 lg:px-12 border-b border-white/5 relative overflow-hidden">
        {/* Subtle background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent pointer-events-none" />

        <div className="max-w-[900px] mx-auto relative z-10">
          <ScrollReveal direction="up">
            <div className="grid md:grid-cols-2 gap-8 md:gap-16">
              <motion.div
                className="p-6 md:p-0 rounded-2xl md:rounded-none border border-white/5 md:border-0 bg-white/[0.01] md:bg-transparent"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-xs md:text-sm font-medium text-accent mb-3 md:mb-4">Why it matters</h2>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-medium tracking-tight mb-3 md:mb-4">Operational experience.</h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  8,000+ hours of client-facing delivery. I know what it feels like when systems fight you instead of helping. That shapes how I map workflows, configure tools, and design automations that actually fit into real work.
                </p>
              </motion.div>
              <motion.div
                className="p-6 md:p-0 rounded-2xl md:rounded-none border border-white/5 md:border-0 bg-white/[0.01] md:bg-transparent"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-xs md:text-sm font-medium text-accent mb-3 md:mb-4">How I work</h2>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-medium tracking-tight mb-3 md:mb-4">I build things.</h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  I don&apos;t write reports and leave. I build the automation, configure the system, write the SOPs, train the team, and stick around for post-go-live support. When I&apos;m done, people are actually using it.
                </p>
              </motion.div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Experience */}
      <section className="py-12 md:py-24 px-6 lg:px-12 relative">
        {/* Decorative line */}
        <motion.div
          className="absolute left-6 md:left-12 lg:left-1/2 lg:-translate-x-[450px] top-0 w-[1px] h-16 md:h-24 bg-gradient-to-b from-transparent via-accent/30 to-transparent hidden lg:block"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease }}
        />

        <div className="max-w-[900px] mx-auto">
          <ScrollReveal direction="up">
            <span className="block text-[10px] md:text-xs font-medium tracking-[0.2em] md:tracking-[0.3em] uppercase text-muted-foreground mb-4 md:mb-6">Experience</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight mb-8 md:mb-12">Work history.</h2>
          </ScrollReveal>

          <div className="space-y-8 md:space-y-12">
            {experience.map((item, i) => (
              <ScrollReveal key={item.role} direction="up" delay={i * 0.1}>
                <motion.div
                  className="pb-8 md:pb-12 border-b border-white/5 last:border-b-0 last:pb-0 group"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex flex-wrap items-baseline gap-x-3 md:gap-x-4 gap-y-1 mb-3 md:mb-4">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-medium group-hover:text-accent transition-colors duration-500">{item.role}</h3>
                    <span className="text-sm md:text-base text-muted-foreground">at {item.company}</span>
                    <span className="text-xs md:text-sm text-muted-foreground/60">{item.period}</span>
                  </div>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl">
                    {item.desc}
                  </p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Resume CTA */}
      <section className="py-12 md:py-24 px-6 lg:px-12 border-t border-white/5 relative overflow-hidden">
        {/* Background glow */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, hsl(38 30% 75% / 0.08) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="max-w-[900px] mx-auto text-center relative z-10">
          <ScrollReveal direction="up">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-medium tracking-tight mb-6 md:mb-8">Want the full picture?</h2>
            <a
              href="/Kareem-Hassanein-Resume.pdf"
              className="group relative inline-flex items-center gap-3 text-base md:text-lg font-medium bg-foreground text-background px-6 md:px-8 py-3 md:py-4 rounded-full overflow-hidden transition-all duration-500"
            >
              <span className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
              <span className="relative z-10">Download Resume</span>
              <Download size={18} className="relative z-10 group-hover:translate-y-0.5 transition-transform duration-500" />
            </a>
          </ScrollReveal>
        </div>
      </section>

    </main>
  );
}
