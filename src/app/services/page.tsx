'use client';

import Link from 'next/link';
import { ChevronRight, BarChart3, Database, Layers, ShieldCheck } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

const modules = [
  {
    index: '01',
    title: 'Implementation Architecture',
    desc: 'End-to-end configuration and rollout of agentic AI systems (Heidi AI) and clinic infrastructure (Jane App). Bridging software possibility and operational stability.',
    outcomes: ['SOP Workflow Development', 'Stakeholder Training & Enablement', 'Post-Launch Stabilization'],
    icon: <Layers className="w-6 h-6 text-accent" />
  },
  {
    index: '02',
    title: 'Workflow DevOps',
    desc: 'Engineering automated document pipelines and client correspondence modules through Claude Code and agentic deployment logic.',
    outcomes: ['Modular Automation Logic', 'CI/CD Pipeline Auditing', 'Reduction in Manual Friction'],
    icon: <Database className="w-6 h-6 text-accent" />
  },
  {
    index: '03',
    title: 'Acquisition Engineering',
    desc: 'Linking clinical services to digital discoverability through local SEO architecture, Google Search Console optimization, and review capture loops.',
    outcomes: ['Patient Pathway Optimization', 'Crawlability Improvement', 'Conversion Rate Refinement'],
    icon: <BarChart3 className="w-6 h-6 text-accent" />
  },
  {
    index: '04',
    title: 'Clinical Usability Advisory',
    desc: 'Technical consultation for health-tech startups on adoption barriers, clinical workflow integration, and market validation pathways.',
    outcomes: ['Adherence Barrier Mapping', 'Technical Usability Audit', 'Market Fit Validation'],
    icon: <ShieldCheck className="w-6 h-6 text-accent" />
  }
];

export default function Services() {
  return (
    <div className="pt-24 overflow-hidden relative">
      <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none -z-10" />

      {/* Broad Capabilities Hero */}
      <section className="py-48 px-6 relative">
        <div className="max-w-7xl mx-auto z-10 relative">
          <div className="grid lg:grid-cols-[1.5fr_1fr] gap-24 items-end">
            <div>
              <ScrollReveal direction="none" className="mb-12">
                <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-accent">Service Infrastructure</span>
              </ScrollReveal>
              <h1 className="text-7xl md:text-[140px] font-medium tracking-tighter mb-20 leading-[0.75]">
                Protocol <br /> & <span className="opacity-40 italic">Capability.</span>
              </h1>
            </div>
            <div className="pb-16 lg:pb-32 border-l border-white/5 pl-12">
              <ScrollReveal delay={0.2}>
                <p className="text-2xl text-muted-foreground font-light leading-relaxed">
                  I implement technology that people actually use. My services are built on the roadmap to organizational scale through precise technical enablement.
                </p>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Module-Based Service Grid */}
      <section className="py-72 px-6 bg-white/[0.01] border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-px bg-white/5 border border-white/5 overflow-hidden">
            {modules.map((module, i) => (
              <ScrollReveal
                key={module.title}
                direction="up"
                delay={i * 0.1}
                className="bg-[#050608] p-16 space-y-12 hover:bg-white/[0.02] transition-all duration-700"
              >
                <div className="flex justify-between items-center">
                  <div className="p-4 bg-white/[0.02] border border-white/5">
                    {module.icon}
                  </div>
                  <span className="text-6xl font-medium tracking-tighter text-white/5 italic">{module.index}</span>
                </div>

                <div className="space-y-8">
                  <h3 className="text-5xl font-medium tracking-tighter leading-none italic">{module.title}</h3>
                  <p className="text-2xl text-muted-foreground font-light leading-relaxed">
                    {module.desc}
                  </p>
                </div>

                <div className="space-y-6 pt-12 border-t border-white/5">
                  <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-accent">Module Outcomes</p>
                  <ul className="grid md:grid-cols-2 gap-6">
                    {module.outcomes.map(point => (
                      <li key={point} className="flex gap-4 text-lg text-foreground font-light tracking-tight pb-2 border-b border-white/[0.02]">
                        <ChevronRight className="w-4 h-4 text-accent mt-1 opacity-40" />
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

      {/* Complexity & ROI Section */}
      <section className="py-80 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <ScrollReveal direction="up" className="space-y-16">
            <h2 className="text-6xl md:text-9xl font-medium tracking-tighter leading-[0.75] mb-12">
              Engineering <br /> <span className="opacity-30 italic">High-Stakes ROI.</span>
            </h2>
            <p className="text-2xl text-muted-foreground font-light leading-relaxed mb-20">
              I specialize in technical engagements where user adoption is the critical bottleneck for organizational scaling. I build the systems that drive the revenue.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-6 text-3xl font-bold tracking-tight text-accent link-underline pb-2 px-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
            >
              Initiate Technical Consultation
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
