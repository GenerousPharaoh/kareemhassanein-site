'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Layers, Workflow, BarChart3, ShieldCheck, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';

const solutions = [
  {
    index: '01',
    title: 'AI Intelligence Implementation',
    desc: 'Strategic architecture and rollout of agentic systems (Heidi AI) for clinical teams. Evaluating technical barriers and constructing SOPs built for immediate field adoption.',
    outcomes: ['SOP System Architecture', 'Technical Tool Baseline Configuration', 'Post-Deployment Stability Auditing'],
    icon: <Layers className="w-5 h-5 opacity-40" />
  },
  {
    index: '02',
    title: 'Agentic Workflow DevOps',
    desc: 'Engineering complex automated modules via Claude Code and Google Antigravity platforms. Reduction in operational friction by 85% via modular automation logic.',
    outcomes: ['Modular Automation Blueprints', 'CI/CD Pipeline System Auditing', 'Reduction in baseline operational friction'],
    icon: <Workflow className="w-5 h-5 opacity-40" />
  },
  {
    index: '03',
    title: 'Discovery Infrastructure',
    desc: 'Constructing search-optimized acquisition streams with technical local SEO and Jane App functional integration. Linking presence to patient conversion.',
    outcomes: ['Local SEO Technical Infrastructure', 'Jane App pathway integration', 'Technical Conversion Audits'],
    icon: <BarChart3 className="w-5 h-5 opacity-40" />
  },
  {
    index: '04',
    title: 'Implementation Advisory',
    desc: 'Consulting for med-tech and health-tech platforms on clinical usability, adoption barriers, and market validation within clinical workflows.',
    outcomes: ['Med-Tech Adoption Root Cause Audit', 'Technical Usability Workflow Mapping', 'Early Market Fit Strategy'],
    icon: <ShieldCheck className="w-5 h-5 opacity-40" />
  }
];

export default function Services() {
  return (
    <main className="pt-24 overflow-hidden relative">
      {/* Capability Hero: Fixed Spacing & High-Fi Blur */}
      <section className="py-40 px-6 lg:px-0 relative overflow-hidden">
        <div className="section-container grid lg:grid-cols-[1.3fr_0.7fr] gap-32 items-end">
          <motion.div>
            <ScrollReveal direction="none" blur={30} className="mb-10">
              <span className="text-[10px] font-bold tracking-[0.4em] uppercase opacity-30">Operational Capabilities</span>
            </ScrollReveal>
            <ScrollReveal direction="up" distance={40} blur={20} delay={0.2}>
              <h1 className="text-8xl md:text-[130px] font-medium tracking-tighter mb-20 leading-[0.75]">
                System <br />
                {"&"} <span className="opacity-30 italic font-light font-serif">Scale.</span>
              </h1>
            </ScrollReveal>
          </motion.div>
          <ScrollReveal direction="right" distance={80} blur={40} delay={0.4} className="relative aspect-square lg:aspect-video rounded-[3rem] overflow-hidden glass-frosted p-2 gentle-float mb-12">
            <Image
              src="/assets/strategy.png"
              alt="Strategic Advisory"
              fill
              className="object-cover opacity-70 hover:opacity-100 transition-all duration-[5s]"
            />
          </ScrollReveal>
        </div>
      </section>

      {/* Outcome-Driven Capability Dossiers: Staggered Blur-Reveals */}
      <section className="py-40 lg:py-64 bg-white/[0.01] border-y border-white/5">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-10">
            {solutions.map((module, i) => (
              <ScrollReveal
                key={module.title}
                direction="up"
                delay={i * 0.15}
                blur={20}
                className="group relative"
              >
                <div className="h-full p-16 lg:p-20 rounded-[4rem] glass-frosted hover:bg-white/[0.04] transition-all duration-1000 flex flex-col justify-between group-hover:-translate-y-4">
                  <div className="space-y-16">
                    <div className="flex justify-between items-start">
                      <div className="w-16 h-16 rounded-3xl bg-white/[0.02] border border-white/5 flex items-center justify-center group-hover:border-foreground/20 transition-all duration-1000">
                        {module.icon}
                      </div>
                      <span className="text-7xl font-light tracking-tighter text-white/5 italic opacity-40 group-hover:opacity-100 transition-opacity duration-1000">0{module.index}</span>
                    </div>

                    <div className="space-y-10">
                      <h3 className="text-5xl font-medium tracking-tight h-[2.5em] lg:h-auto group-hover:text-foreground transition-colors duration-1000">{module.title}</h3>
                      <p className="text-3xl font-light text-muted-foreground leading-relaxed max-w-2xl text-balance italic">
                        {module.desc}
                      </p>
                    </div>
                  </div>

                  <div className="pt-16 mt-16 border-t border-white/5 space-y-10">
                    <p className="text-[10px] font-bold tracking-[0.4em] uppercase opacity-30">Technical Outcomes</p>
                    <ul className="grid md:grid-cols-2 gap-x-12 gap-y-10">
                      {module.outcomes.map(point => (
                        <li key={point} className="flex gap-6 text-xl text-muted-foreground font-light tracking-tight pb-2 border-b border-white/[0.02] items-center group/item hover:text-foreground transition-colors duration-500">
                          <ChevronRight className="w-5 h-5 text-foreground opacity-20 group-hover/item:opacity-100 group-hover/item:translate-x-2 transition-all duration-500" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Atmospheric Closure */}
      <section className="py-80 lg:py-[20vh] text-center px-6">
        <ScrollReveal direction="up" blur={40}>
          <h2 className="text-8xl md:text-[180px] font-medium tracking-tighter mb-24 leading-[0.75] text-balance">
            Build <br /> <span className="opacity-10 italic font-light font-serif">the Outcome.</span>
          </h2>
          <div className="pt-24 flex justify-center">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-12 text-5xl font-bold tracking-tight text-foreground link-underline pb-4 px-12"
            >
              Inquire for Architecture
              <ArrowRight size={72} className="opacity-10 group-hover:opacity-100 group-hover:translate-x-4 transition-all duration-1000" />
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </main>
  );
}
