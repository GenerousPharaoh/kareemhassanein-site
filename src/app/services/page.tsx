'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Layers, Workflow, BarChart3, ShieldCheck, ArrowRight } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

const solutions = [
  {
    index: '01',
    title: 'AI Intelligence Implementation',
    desc: 'Strategic architecture and rollout of agentic systems (Heidi AI) for clinical teams. Evaluating technical barriers and constructing SOPs built for immediate field adoption.',
    outcomes: ['SOP System Architecture', 'Technical configuration roadmap', 'Post-deployment stabilization'],
    icon: <Layers className="w-6 h-6 text-accent" />
  },
  {
    index: '02',
    title: 'Agentic Workflow DevOps',
    desc: 'Engineering complex automated modules via Claude Code and Google Antigravity. Reduction of manual operational time by 85% through modular automation logic.',
    outcomes: ['Modular automation blueprints', 'CI/CD Stability auditing', 'Manual friction elimination'],
    icon: <Workflow className="w-6 h-6 text-accent-secondary" />
  },
  {
    index: '03',
    title: 'Visibility Architecture',
    desc: 'Constructing search-optimized acquisition streams with technical local SEO and Jane App functional integration. Linking technical presence to patient conversion.',
    outcomes: ['Technical SEO Infrastructure', 'Jane App pathway integration', 'Technical Conversion Audits'],
    icon: <BarChart3 className="w-6 h-6 text-accent" />
  },
  {
    index: '04',
    title: 'Implementation Advisory',
    desc: 'Consulting for med-tech and health-tech platforms on clinical usability, adoption root-causes, and go-to-market strategies within clinical workflows.',
    outcomes: ['Adoption barrier mapping', 'Technical usability auditing', 'Strategic market validation'],
    icon: <ShieldCheck className="w-6 h-6 text-accent-secondary" />
  }
];

export default function Services() {
  return (
    <div className="pt-24 overflow-hidden relative">
      <div className="glow-blob top-[15%] -left-[10%] opacity-15" />

      {/* High-Fi Capability Hero */}
      <section className="py-48 px-6 lg:px-24 relative">
        <div className="max-w-[1400px] mx-auto z-10 relative grid lg:grid-cols-[1.5fr_1fr] gap-32 items-end">
          <div>
            <ScrollReveal direction="none" className="mb-12">
              <span className="text-[11px] font-bold tracking-[0.5em] uppercase text-accent bg-accent/10 px-6 py-2 rounded-full">System Capabilities</span>
            </ScrollReveal>
            <h1 className="text-8xl md:text-[140px] font-medium tracking-tighter mb-20 leading-[0.75]">
              Protocol <br />
              & <span className="text-accent italic font-light">Scale.</span>
            </h1>
          </div>
          <ScrollReveal direction="right" distance={100} className="relative aspect-square lg:aspect-video rounded-[4rem] overflow-hidden glass-vivid p-2 floating mb-12">
            <Image
              src="/assets/precision.png"
              alt="Technical Precision"
              fill
              className="object-cover opacity-80 group-hover:opacity-100 transition-all duration-1000"
            />
          </ScrollReveal>
        </div>
      </section>

      {/* Capability Matrix - Vivid & Robust Cards */}
      <section className="py-80 px-6 lg:px-24 border-t border-white/10 bg-[#111418]/30">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
            {solutions.map((module, i) => (
              <ScrollReveal
                key={module.title}
                direction="up"
                delay={i * 0.1}
                className="group relative p-2"
              >
                <div className="h-full p-20 rounded-[5rem] glass-vivid hover:bg-white/[0.04] transition-all duration-1000 flex flex-col justify-between group-hover:-translate-y-4">
                  <div className="space-y-16">
                    <div className="flex justify-between items-start">
                      <div className="w-20 h-20 rounded-[2.5rem] bg-white/[0.03] border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:border-accent group-hover:bg-accent/5 transition-all duration-1000">
                        {module.icon}
                      </div>
                      <span className="text-7xl font-light tracking-tighter text-white/5 opacity-40 group-hover:opacity-100 transition-opacity italic">0{module.index}</span>
                    </div>

                    <div className="space-y-10">
                      <h3 className="text-5xl font-medium tracking-tight h-[2.5em] lg:h-auto">{module.title}</h3>
                      <p className="text-3xl font-light text-muted-foreground leading-relaxed text-balance">
                        {module.desc}
                      </p>
                    </div>
                  </div>

                  <div className="pt-20 mt-20 border-t border-white/10 space-y-12">
                    <p className="text-[11px] font-bold tracking-[0.4em] uppercase text-accent-secondary">Operational Outcomes</p>
                    <ul className="grid md:grid-cols-2 gap-x-12 gap-y-10">
                      {module.outcomes.map((point) => (
                        <li key={point} className="flex gap-8 text-2xl text-foreground font-light tracking-tight pb-4 border-b border-white/[0.05] items-start group/item">
                          <ChevronRight className="w-6 h-6 text-accent opacity-20 group-hover/item:opacity-100 group-hover/item:text-accent-secondary transition-all" />
                          <span className="group-hover/item:translate-x-2 transition-transform duration-500">{point}</span>
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

      {/* Deployment Narrative - Closing Punch */}
      <section className="py-[30vh] px-6 lg:px-24 text-center border-t border-white/10 relative overflow-hidden">
        <div className="glow-blob bottom-[10%] right-[10%] opacity-20" />
        <div className="max-w-7xl mx-auto space-y-32 relative z-10">
          <ScrollReveal direction="up">
            <h2 className="text-7xl md:text-[180px] font-medium tracking-tight mb-24 leading-[0.75] text-balance">
              Building <br /> <span className="text-accent italic font-light">The Result.</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2} className="space-y-24 text-3xl md:text-5xl text-muted-foreground font-light leading-snug max-w-5xl mx-auto text-balance">
            <p>
              I specialize in technical engagements where user adoption is the critical bottleneck. Implementation that sticks. ROI that is verifiable.
            </p>
            <div className="pt-24 flex justify-center">
              <Link
                href="/contact"
                className="group flex items-center gap-12 text-4xl font-bold tracking-tight text-foreground link-underline pb-4 px-12"
              >
                Inquire for Architecture
                <ArrowRight size={64} className="opacity-10 group-hover:opacity-100 group-hover:translate-x-8 transition-all duration-[1.5s] text-accent-secondary" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
