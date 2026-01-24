'use client';

import { Download, HeartPulse, Binary } from 'lucide-react';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';

const roadmap = [
  {
    period: '2024 - Present',
    title: 'Digital Strategy & Operations',
    company: 'Endorphins Health',
    focus: 'Healthcare Operations',
    points: [
      'Leading digital operations across 6 specialties',
      'Redesigned booking architecture in Jane App',
      'Built patient acquisition and referral systems'
    ]
  },
  {
    period: '2025 - Present',
    title: 'Workflow Automation Consultant',
    company: 'Tax Relief Counsel',
    focus: 'Legal Tech',
    points: [
      'Built automation with Claude Code',
      'Reduced document generation time by 85%',
      'Defined SOPs for case management'
    ]
  },
  {
    period: '2021 - 2024',
    title: 'Registered Physiotherapist',
    company: 'Movement Solutions',
    focus: 'Clinical Practice',
    points: [
      'Led Heidi AI rollout with 100% adoption',
      'Highest revenue clinician for 3 years',
      'Generated $600K+ annually'
    ]
  }
];

import ParallaxImage from '@/components/ParallaxImage';

export default function About() {
  return (
    <main className="pt-24 overflow-hidden relative bg-background">
      {/* Ambient glow */}
      <div className="glow-blob top-[10%] -left-[10%] opacity-[0.02]" />

      {/* Identity Hero: Unified Cohesive Reveal Pattern */}
      <section className="py-40 px-6 lg:px-0 relative overflow-hidden perspective-3000">
        <div className="section-container">
          <ScrollReveal direction="up" distance={20} blur={20} staggerChildren={0.2} className="grid lg:grid-cols-[1fr_1fr] gap-20 lg:gap-32 items-center">
            <motion.div>
              <motion.span variants={{ hidden: { opacity: 0 }, visible: { opacity: 0.3 } }} className="block text-[10px] font-bold tracking-[0.5em] uppercase mb-10">
                About
              </motion.span>
              <motion.h1 variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }} className="text-7xl md:text-[140px] font-medium tracking-tighter mb-20 leading-[0.75]">
                Background <br /><span className="opacity-30 italic font-light font-serif">& Experience.</span>
              </motion.h1>
            </motion.div>
            <motion.div variants={{ hidden: { opacity: 0, x: 30, filter: 'blur(30px)' }, visible: { opacity: 1, x: 0, filter: 'blur(0px)' } }} className="group mb-12">
              <ParallaxImage src="/assets/n_logic.png" alt="Operational Logic" className="aspect-[4/5] w-full rounded-[2rem]" />
            </motion.div>
          </ScrollReveal>
        </div>
      </section>

      {/* Section Divider */}
      <div className="divider-subtle w-full" />

      {/* Practitioner vs Architect: Unified Cohesive Reveal Pattern */}
      <section className="py-40 lg:py-64 bg-white/[0.005]">
        <div className="section-container">
          <ScrollReveal direction="up" distance={20} blur={20} staggerChildren={0.25} className="grid lg:grid-cols-2 gap-40 items-start">
            <motion.div variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }} className="space-y-16">
              <div className="flex items-center gap-8">
                <div className="w-12 h-12 rounded-2xl bg-white/[0.01] border border-white/5 flex items-center justify-center">
                  <HeartPulse className="text-muted-foreground w-6 h-6" />
                </div>
                <h2 className="text-5xl font-medium tracking-tight">Clinical roots.</h2>
              </div>
              <p className="text-3xl font-light text-muted-foreground leading-relaxed max-w-xl italic">
                MSc Physiotherapy with Distinction. I spent years as a clinician before moving into operations and consulting.
              </p>
            </motion.div>

            <motion.div variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }} className="space-y-16 lg:pt-48 border-l border-white/5 pl-24 ml-auto">
              <div className="flex items-center gap-8">
                <div className="w-12 h-12 rounded-2xl bg-white/[0.01] border border-white/5 flex items-center justify-center">
                  <Binary className="text-muted-foreground w-6 h-6" />
                </div>
                <h2 className="text-5xl font-medium tracking-tight">Technical focus.</h2>
              </div>
              <p className="text-3xl font-light text-muted-foreground leading-relaxed max-w-xl">
                Now I help organizations implement AI tools and build automation systems that people actually use.
              </p>
            </motion.div>
          </ScrollReveal>
        </div>
      </section>

      {/* Section Divider */}
      <div className="divider-subtle w-full" />

      {/* Compact Roadmap: Unified Vertical Narrative Pattern */}
      {/* Timeline: Individual High-Fidelity Floating Cards */}
      <section className="py-40 lg:py-64 relative bg-white/[0.002]">
        <div className="section-container">
          <ScrollReveal direction="up" distance={30} blur={30} staggerChildren={0.2}>
            <div className="mb-48 flex justify-between items-end">
              <div className="max-w-xl">
                <motion.p variants={{ hidden: { opacity: 0 }, visible: { opacity: 0.3 } }} className="text-[10px] font-bold tracking-[0.4em] uppercase mb-8">Experience</motion.p>
                <motion.h2 variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="text-8xl md:text-[140px] font-medium tracking-tighter leading-[0.75] mb-12">Timeline.</motion.h2>
              </div>
            </div>

            <div className="flex flex-col">
              {roadmap.map((item) => (
                <motion.div
                  key={item.title}
                  variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                  className="group grid md:grid-cols-[1fr_2fr_1fr] py-16 border-b border-white/10 items-start gap-8"
                >
                  <span className="text-xs font-bold tracking-widest uppercase opacity-40">{item.period}</span>

                  <div className="space-y-4">
                    <h3 className="text-4xl font-serif font-medium tracking-tight text-foreground/90 group-hover:text-foreground transition-colors duration-500">
                      {item.title}
                    </h3>
                    <p className="text-lg text-muted-foreground font-light">{item.company}</p>
                    <ul className="space-y-2 mt-6">
                      {item.points.map((point) => (
                        <li key={point} className="text-muted-foreground/60 text-sm leading-relaxed">
                          • {point}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="hidden md:flex justify-end">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-20 group-hover:opacity-40 transition-opacity">
                      {item.focus}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Section Divider */}
      <div className="divider-subtle w-full" />

      <section className="py-32 md:py-48 text-center px-6 bg-white/[0.005]">
        <ScrollReveal direction="up" blur={40} className="w-full" viewport={{ once: true, margin: "-20%" }}>
          <h2 className="text-8xl md:text-[160px] font-medium tracking-tighter mb-24 leading-[0.7] text-balance">
            Want to <br /><span className="opacity-40 italic font-light font-serif">know more?</span>
          </h2>
          <a
            href="/Kareem-Hassanein-Resume.pdf"
            className="group inline-flex items-center gap-12 text-3xl font-bold tracking-tight text-foreground link-underline pb-4 px-12 transition-all"
          >
            Download resume
            <Download size={48} className="opacity-10 group-hover:translate-y-4 transition-all duration-1000" />
          </a>
        </ScrollReveal>
      </section>
    </main>
  );
}
