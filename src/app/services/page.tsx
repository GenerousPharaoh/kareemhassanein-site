'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight, Layers, Workflow, BarChart3, ShieldCheck, ArrowRight } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import ParallaxImage from '@/components/ParallaxImage';
import TextScramble from '@/components/TextScramble';
import AnimatedGrid from '@/components/AnimatedGrid';

const solutions = [
  {
    index: '01',
    title: 'AI Tool Implementation',
    desc: 'End-to-end rollout of AI tools like Heidi AI for clinical teams. From evaluation through training, go-live, and making sure it actually sticks.',
    outcomes: ['Tool evaluation and selection', 'Training and onboarding', 'SOP development', 'Post-launch support'],
    icon: Layers
  },
  {
    index: '02',
    title: 'Workflow Automation',
    desc: 'Building automation systems that reduce manual work. Using tools like Claude Code to cut document generation time by 85%.',
    outcomes: ['Process automation', 'Template systems', 'Intake optimization', 'Correspondence workflows'],
    icon: Workflow
  },
  {
    index: '03',
    title: 'Operations Optimization',
    desc: 'Improving how clinics and professional services run. Booking systems, referral pathways, and patient acquisition.',
    outcomes: ['Booking system design', 'Referral pathways', 'Local SEO setup', 'Jane App configuration'],
    icon: BarChart3
  },
  {
    index: '04',
    title: 'Clinical Advisory',
    desc: 'Advising health-tech companies on clinical workflows, usability, and what it takes to get clinicians to actually adopt new tools.',
    outcomes: ['Usability review', 'Adoption strategy', 'Workflow integration', 'Market validation'],
    icon: ShieldCheck
  }
];

import { LucideIcon } from 'lucide-react';

function IconDraw({ Icon }: { Icon: LucideIcon }) {
  return (
    <div className="w-16 h-16 rounded-[2rem] bg-white/[0.01] border border-white/5 flex items-center justify-center group-hover:border-foreground/20 transition-all duration-1000">
      <Icon className="w-6 h-6 opacity-40 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
}

export default function Services() {
  return (
    <main className="pt-24 overflow-hidden relative bg-background">
      <AnimatedGrid />
      <div className="glow-blob top-[15%] -left-[10%] opacity-[0.03]" />

      {/* Capability Hero */}
      <section className="py-40 px-6 lg:px-0 relative overflow-hidden perspective-3000">
        <div className="section-container">
          <ScrollReveal direction="up" distance={20} blur={20} staggerChildren={0.2} className="grid lg:grid-cols-[1fr_1fr] gap-20 lg:gap-32 items-center">
            <motion.div>
              <motion.span variants={{ hidden: { opacity: 0 }, visible: { opacity: 0.3 } }} className="block text-[10px] font-bold tracking-[0.6em] uppercase mb-10">
                Services
              </motion.span>
              <motion.h1 variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }} className="text-8xl md:text-[130px] font-medium tracking-tighter mb-20 leading-[0.75]">
                How I can <br />
                <span className="opacity-40 italic font-light font-serif">
                  <TextScramble delay={0.3}>help.</TextScramble>
                </span>
              </motion.h1>
            </motion.div>
            <motion.div variants={{ hidden: { opacity: 0, x: 30, filter: 'blur(30px)' }, visible: { opacity: 1, x: 0, filter: 'blur(0px)' } }} className="group mb-12">
              <ParallaxImage src="/assets/n_strategy.png" alt="Strategic Outcome" className="aspect-[4/5] w-full rounded-[2rem]" />
            </motion.div>
          </ScrollReveal>
        </div>
      </section>

      {/* Section Divider */}
      <div className="divider-subtle w-full" />

      {/* Outcome-Driven Capability Dossiers */}
      <section className="py-40 lg:py-64 bg-white/[0.005]">
        <div className="section-container">
          <ScrollReveal direction="up" distance={20} blur={20} staggerChildren={0.15} className="grid lg:grid-cols-2 gap-10">
            {solutions.map((module) => (
              <motion.div
                key={module.title}
                variants={{
                  hidden: { opacity: 0, y: 15, filter: 'blur(10px)' },
                  visible: { opacity: 1, y: 0, filter: 'blur(0px)' }
                }}
                className="group relative"
              >
                <div
                  className={`h-full p-16 lg:p-20 rounded-[4rem] glass-card glass-narrative hover:bg-white/[0.04] transition-all duration-1000 flex flex-col justify-between group-hover:-translate-y-4 before:bg-[url('/assets/n_story_bg_${module.index}.png')]`}
                >
                  <div className="space-y-16">
                    <div className="flex justify-between items-start">
                      <IconDraw Icon={module.icon} />
                      <span className="text-7xl font-light tracking-tighter text-white/5 italic opacity-40 group-hover:opacity-100 transition-opacity duration-1000">0{module.index}</span>
                    </div>

                    <div className="space-y-10">
                      <h3 className="text-5xl font-medium tracking-tight h-[2.2em] lg:h-auto group-hover:text-foreground transition-all duration-1000 leading-none">{module.title}</h3>
                      <p className="text-2xl font-light text-muted-foreground leading-relaxed max-w-2xl text-balance italic">
                        {module.desc}
                      </p>
                    </div>
                  </div>

                  <div className="pt-20 border-t border-white/5 space-y-10">
                    <p className="text-[10px] font-bold tracking-[0.5em] uppercase opacity-20">What you get</p>
                    <ul className="grid md:grid-cols-2 gap-x-12 gap-y-12">
                      {module.outcomes.map(point => (
                        <li key={point} className="flex gap-6 text-xl text-muted-foreground font-light tracking-tight pb-4 border-b border-white/[0.02] items-center group/item hover:text-foreground transition-all duration-700">
                          <ChevronRight className="w-5 h-5 opacity-10 group-hover/item:opacity-100 transition-all duration-500" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* Section Divider */}
      <div className="divider-subtle w-full" />

      {/* High-Fi Final Call */}
      <section className="py-96 text-center px-6 bg-white/[0.005]">
        <div className="section-container relative z-10 space-y-32">
          <ScrollReveal direction="up" blur={40} distance={20} staggerChildren={0.2}>
            <motion.h2 variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }} className="text-8xl md:text-[180px] font-medium tracking-tighter mb-24 leading-[0.75] text-balance">
              Have a <br /><span className="opacity-40 italic font-light font-serif">project?</span>
            </motion.h2>

            <motion.div variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }} className="space-y-32 max-w-4xl mx-auto">
              <p className="text-3xl md:text-5xl text-muted-foreground font-light leading-snug text-balance italic border-x border-white/5 px-20">
                I focus on implementations where <span className="text-foreground border-b border-white/10 italic">people actually adopt</span> the tools.
              </p>
              <div className="pt-24 flex justify-center">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-12 text-5xl font-bold tracking-tight text-foreground link-underline pb-4 px-12 transition-all"
                >
                  Let&apos;s talk
                  <ArrowRight size={72} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-6 transition-all duration-[1.5s]" />
                </Link>
              </div>
            </motion.div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
