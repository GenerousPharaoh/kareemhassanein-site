'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Layers, Workflow, BarChart3, ShieldCheck, ArrowRight } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

const solutions = [
  {
    index: '01',
    title: 'AI Intelligence Implementation',
    desc: 'Strategic architecture and rollout of agentic systems (Heidi AI) for clinical teams. Evaluating technical barriers and constructing SOPs built for field adoption.',
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
    title: 'Visibility Architecture',
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
      <div className="glow-blob top-[15%] -left-[10%] opacity-10" />

      {/* Capabilities Hero: Narrative visual of Harmony */}
      <section className="py-40 lg:py-64 px-6 lg:px-0 relative overflow-hidden">
        <div className="section-container grid lg:grid-cols-[1.5fr_1fr] gap-32 items-end">
          <div>
            <ScrollReveal direction="none" className="mb-10">
              <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-accent-secondary/60">Service Protocol</span>
            </ScrollReveal>
            <h1 className="text-8xl md:text-[140px] font-medium tracking-tighter mb-20 leading-[0.75]">
              System <br />
              {"&"} <span className="opacity-40 italic font-light">Harmony.</span>
            </h1>
          </div>
          <ScrollReveal direction="right" distance={80} className="relative aspect-square lg:aspect-video rounded-[4rem] overflow-hidden glass-pearl p-2 floating mb-12">
            <Image
              src="/assets/harmony.png"
              alt="System Harmony"
              fill
              className="object-cover opacity-60 hover:opacity-100 transition-all duration-[5s]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent z-10" />
          </ScrollReveal>
        </div>
      </section>

      {/* Outcome-Driven Capability Grid: Clear & Uncluttered */}
      <section className="py-64 lg:py-80 bg-white/[0.01] border-y border-white/5">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-px bg-white/10 border border-white/10 overflow-hidden rounded-[4rem]">
            {solutions.map((module, i) => (
              <ScrollReveal
                key={module.title}
                direction="up"
                delay={i * 0.1}
                className="group p-16 lg:p-24 bg-[#0d0f12] hover:bg-white/[0.02] transition-all duration-1000 flex flex-col justify-between border-b last:border-0 border-white/5"
              >
                <div className="flex justify-between items-start mb-16">
                  <div className="w-16 h-16 rounded-[2rem] bg-white/[0.02] border border-white/5 flex items-center justify-center group-hover:border-accent-secondary transition-colors duration-1000">
                    {module.icon}
                  </div>
                  <span className="text-7xl font-light tracking-tighter text-white/5 italic opacity-40 group-hover:opacity-100 transition-opacity duration-1000">0{module.index}</span>
                </div>

                <div className="space-y-12 mb-20">
                  <h3 className="text-5xl font-medium tracking-tight leading-none group-hover:text-accent-secondary transition-colors duration-1000">{module.title}</h3>
                  <p className="text-3xl font-light text-muted-foreground leading-relaxed max-w-2xl text-balance">
                    {module.desc}
                  </p>
                </div>

                <div className="pt-20 border-t border-white/5 space-y-10">
                  <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-accent-secondary/60">Module Outcomes</p>
                  <ul className="grid md:grid-cols-2 gap-x-12 gap-y-12">
                    {module.outcomes.map(point => (
                      <li key={point} className="flex gap-6 text-xl text-muted-foreground font-light tracking-tight pb-4 border-b border-white/[0.02] items-center group/item hover:text-foreground transition-colors duration-500">
                        <ChevronRight className="w-5 h-5 text-accent-secondary opacity-20 group-hover/item:opacity-100 group-hover/item:translate-x-2 transition-all duration-500" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Atmospheric Closure */}
      <section className="py-80 lg:py-[30vh] text-center px-6">
        <div className="section-container relative z-10 space-y-32">
          <ScrollReveal direction="up">
            <h2 className="text-8xl md:text-[180px] font-medium tracking-tighter mb-24 leading-[0.75] text-balance">
              Building <br /> <span className="text-accent underline decoration-[2px] underline-offset-[24px]">Harmony.</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2} className="space-y-24 max-w-4xl mx-auto">
            <p className="text-3xl md:text-5xl text-muted-foreground font-light leading-snug text-balance">
              Engineering high-stakes implementation where <span className="text-foreground italic decoration-accent-secondary underline decoration-[1px] underline-offset-8">user adoption</span> is the critical bottleneck.
            </p>
            <div className="pt-24">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-12 text-5xl font-bold tracking-tight text-foreground link-underline pb-4 px-12"
              >
                Inquire for Architecture
                <ArrowRight size={72} className="opacity-10 group-hover:opacity-100 group-hover:translate-x-4 transition-all duration-1000" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
