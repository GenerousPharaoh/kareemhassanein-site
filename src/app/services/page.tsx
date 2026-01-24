'use client';

import { motion } from 'framer-motion';
import { ChevronRight, Layers, Workflow, BarChart3, ShieldCheck, LucideIcon } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import ParallaxImage from '@/components/ParallaxImage';
import MaskedReveal from '@/components/MaskedReveal';
import AnimatedGrid from '@/components/AnimatedGrid';

const solutions = [
  {
    index: '01',
    title: 'AI Tool Setup',
    desc: 'Evaluation and rollout of AI tools like Heidi AI for clinical teams. I handle the training, go-live, and making sure the staff actually likes using it.',
    outcomes: ['Evaluation and selection', 'Direct staff training', 'Process documentation', 'Support after launch'],
    icon: Layers
  },
  {
    index: '02',
    title: 'Workflow Automation',
    desc: 'Building simple automation systems that reduce manual chores. Using tools like Claude Code to cut document time and intake friction.',
    outcomes: ['Process automation', 'Intake optimization', 'Email workflows', 'Custom tool build'],
    icon: Workflow
  },
  {
    index: '03',
    title: 'Operations Support',
    desc: 'Improving how clinics run. Booking systems, referral tracking, and getting patient acquisition right on Jane App or similar tools.',
    outcomes: ['Booking system design', 'Referral tracking', 'Local SEO setup', 'Jane App optimization'],
    icon: BarChart3
  },
  {
    index: '04',
    title: 'Clinical Advisory',
    desc: 'Showing health-tech companies how clinicians actually work. Feedback on usability and advice on how to get tools adopted by medical staff.',
    outcomes: ['Usability testing', 'Clinic workflow review', 'Direct staff feedback', 'Product validation'],
    icon: ShieldCheck
  }
];

function IconDraw({ Icon }: { Icon: LucideIcon }) {
  return (
    <div className="w-16 h-16 rounded-[2rem] bg-white/[0.01] border border-white/5 flex items-center justify-center group-hover:border-foreground/20 transition-all duration-1000 shadow-inner">
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
                Capability
              </motion.span>
              <motion.h1 variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }} className="text-8xl md:text-[130px] font-medium tracking-tighter mb-20 leading-[0.75]">
                How I <br />
                <span className="opacity-40 italic font-light font-serif">
                  <MaskedReveal delay={0.3} className="py-2" direction="up">help.</MaskedReveal>
                </span>
              </motion.h1>
            </motion.div>
            <motion.div variants={{ hidden: { opacity: 0, x: 30, filter: 'blur(30px)' }, visible: { opacity: 1, x: 0, filter: 'blur(0px)' } }} className="group mb-12">
              <ParallaxImage src="/assets/n_strategy.png" alt="Strategy Outcome" className="aspect-[4/5] w-full rounded-[2rem]" />
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
                  className={`h-full p-16 lg:p-24 rounded-[4rem] glass-card hover:bg-white/[0.04] transition-all duration-1000 flex flex-col justify-between group-hover:-translate-y-4`}
                >
                  <div className="space-y-16">
                    <div className="flex justify-between items-start">
                      <IconDraw Icon={module.icon} />
                      <span className="text-7xl font-light tracking-tighter text-white/5 italic opacity-40 group-hover:opacity-100 transition-opacity duration-1000">0{module.index}</span>
                    </div>

                    <div className="space-y-10">
                      <h3 className="text-5xl font-medium tracking-tight group-hover:text-foreground transition-all duration-1000 leading-none">{module.title}</h3>
                      <p className="text-2xl font-light text-muted-foreground leading-relaxed max-w-2xl text-balance italic">
                        {module.desc}
                      </p>
                    </div>
                  </div>

                  <div className="pt-20 border-t border-white/5 space-y-10">
                    <p className="text-[10px] font-bold tracking-[0.5em] uppercase opacity-20">Deliverables</p>
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

    </main>
  );
}
