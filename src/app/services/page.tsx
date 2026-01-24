'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Layers, Workflow, BarChart3, ShieldCheck } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

const solutions = [
  {
    index: '01',
    title: 'AI System Implementation',
    desc: 'Rollout of agentic systems (Heidi AI) for multi-specialty clinical operations. Establishing technical SOPs, configuration models, and peer enablement programs.',
    outcomes: ['SOP Workflow Technical Architecture', 'Technical Tool Baseline Configuration', 'Post-Deployment Stability Auditing'],
    icon: <Layers className="w-6 h-6" />
  },
  {
    index: '02',
    title: 'Agentic Workflow DevOps',
    desc: 'Building custom automated modules using Claude Code and Google Antigravity platforms to optimize high-volume documentation and client correspondence.',
    outcomes: ['Modular Documentation Automation', 'CI/CD Pipeline System Auditing', 'Reduction in baseline operational friction'],
    icon: <Workflow className="w-6 h-6" />
  },
  {
    index: '03',
    title: 'Digital Patient Infrastructure',
    desc: 'Constructing search-optimized patient discoverability pathways with deep Jane App booking integration and local GSC technical fixes.',
    outcomes: ['Local SEO Technical Architecture', 'Jane App Functional Integration', 'Conversion Pathway Refinement'],
    icon: <BarChart3 className="w-6 h-6" />
  },
  {
    index: '04',
    title: 'Clinical Strategy Advisory',
    desc: 'Advising health-tech med-tech startups on clinical usability, adoption barriers, and market validation as they deploy into clinical settings.',
    outcomes: ['Med-Tech Adoption Root Cause Audit', 'Technical Usability Workflow Mapping', 'Early Market Fit Strategy'],
    icon: <ShieldCheck className="w-6 h-6" />
  }
];

export default function Services() {
  return (
    <div className="pt-24 overflow-hidden relative">
      {/* Capability Hero */}
      <section className="py-48 px-6 lg:px-16 relative">
        <div className="max-w-7xl mx-auto z-10 relative">
          <div className="grid lg:grid-cols-[1.5fr_1fr] gap-24 items-end">
            <div>
              <ScrollReveal direction="none" className="mb-12">
                <span className="text-[10px] font-bold tracking-[0.5em] uppercase opacity-40">Operational Capabilities</span>
              </ScrollReveal>
              <h1 className="text-7xl md:text-[140px] font-medium tracking-tighter mb-20 leading-[0.75]">
                Systems <br />
                & <span className="opacity-40 italic font-light">Scale.</span>
              </h1>
            </div>
            <ScrollReveal direction="right" distance={40} className="relative aspect-square lg:aspect-video rounded-[4rem] overflow-hidden glass-organic p-1 mb-20">
              <Image
                src="/assets/mapping.png"
                alt="Mapping Illustration"
                fill
                className="object-cover opacity-60"
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Outcome-Driven Capability Modules */}
      <section className="py-72 px-6 lg:px-16 border-t border-white/[0.03] bg-[#242933]/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-24">
            {solutions.map((module, i) => (
              <ScrollReveal
                key={module.title}
                direction="up"
                delay={i * 0.1}
                className="group p-16 rounded-[4rem] glass-organic hover:bg-white/[0.05] transition-all duration-1000 flex flex-col justify-between border border-white/5"
              >
                <div className="flex justify-between items-start mb-16">
                  <div className="w-16 h-16 rounded-[1.5rem] bg-white/[0.03] flex items-center justify-center opacity-40 group-hover:opacity-100 transition-opacity">
                    {module.icon}
                  </div>
                  <span className="text-6xl font-light tracking-tighter text-white/5 opacity-50 group-hover:opacity-100 transition-opacity italic">0{module.index}</span>
                </div>

                <div className="space-y-10">
                  <h3 className="text-5xl font-medium tracking-tighter leading-none">{module.title}</h3>
                  <p className="text-2xl text-muted-foreground font-light leading-relaxed">
                    {module.desc}
                  </p>
                </div>

                <div className="pt-16 mt-16 border-t border-white/5 space-y-10">
                  <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-accent opacity-40">Strategic Outcomes</p>
                  <ul className="space-y-6">
                    {module.outcomes.map(point => (
                      <li key={point} className="flex gap-6 text-xl text-foreground font-light tracking-tight pb-2 border-b border-white/[0.02] items-center">
                        <ChevronRight className="w-5 h-5 text-accent opacity-20 group-hover:opacity-100 transition-opacity" />
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

      {/* Deployment Narrative */}
      <section className="py-80 px-6 lg:px-16 text-center border-t border-white/[0.03]">
        <div className="max-w-4xl mx-auto space-y-24">
          <ScrollReveal direction="up">
            <h2 className="text-6xl md:text-9xl font-medium tracking-tighter leading-[0.75]">
              Systemic <br /> <span className="opacity-40 italic font-light">ROI.</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2} className="space-y-16 text-3xl text-muted-foreground font-light leading-relaxed max-w-3xl mx-auto">
            <p>
              My engagements are architected for organizational ROI where user adoption is the primary bottleneck. I implement the systems that drive the revenue.
            </p>
            <div className="pt-12">
              <Link
                href="/contact"
                className="text-3xl font-bold tracking-tight text-foreground link-underline pb-4 px-12"
              >
                Inquire for Architecture
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
