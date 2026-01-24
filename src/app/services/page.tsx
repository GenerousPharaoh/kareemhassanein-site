'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

const domains = [
  {
    category: 'Implementation',
    title: 'AI Tool Adoption & SOPs',
    description: 'Independent evaluation, configuration, and rollout of agentic AI systems for clinical and professional teams. Ensuring 100% adoption through peer-led enablement.',
    points: ['Heidi AI Workflow Rollout', 'Clinical SOP Development', 'User Adoption Mapping'],
  },
  {
    category: 'Automation',
    title: 'Agentic Workflow DevOps',
    description: 'Engineering complex automated workflows using Claude Code and Google Antigravity platforms to optimize high-volume documentation and correspondence.',
    points: ['85% Reduction in Template Time', 'CI/CD Pipeline Configuration', 'API Integration Concepts'],
  },
  {
    category: 'Architecture',
    title: 'Client Acquisition Streams',
    description: 'Designing end-to-end digital pathways that prioritize search visibility and conversion through deep local SEO and platform integration.',
    points: ['Jane App Booking Integration', 'Local SEO Architecture', 'Conversion-Focused UX'],
  },
  {
    category: 'Advisory',
    title: 'Clinical Strategy',
    description: 'Bridging the bridge between technical med-tech innovation and frontline clinical reality to identify adoption barriers and market fit.',
    points: ['Market Validation Support', 'Deployment Strategy', 'Adoption Root Cause Analysis'],
  },
];

export default function Services() {
  return (
    <div className="pt-24 overflow-hidden">
      {/* Capability Hero */}
      <section className="py-48 px-6 relative">
        <div className="max-w-6xl mx-auto z-10 relative">
          <ScrollReveal direction="up" distance={30}>
            <p className="text-[10px] font-bold tracking-[0.5em] uppercase opacity-30 mb-12">Capabilities</p>
            <h1 className="text-8xl md:text-[140px] font-medium tracking-tighter mb-20 leading-[0.75]">
              Strategic <br />
              <span className="opacity-40 italic font-light">Enablement.</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2} distance={30}>
            <p className="text-3xl md:text-5xl text-muted-foreground leading-[1.2] max-w-4xl text-balance font-light">
              I implement technology that <span className="text-foreground">people actually use</span>, and build systems that drive <span className="text-foreground">measurable organizational scale.</span>
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* The Domains - Grid */}
      <section className="py-64 px-6 bg-card/10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-24">
          {domains.map((domain, i) => (
            <ScrollReveal
              key={domain.title}
              direction="up"
              delay={i * 0.1}
              className="space-y-12 group"
            >
              <div className="space-y-6">
                <p className="text-[10px] font-bold tracking-[0.4em] uppercase opacity-20">{domain.category}</p>
                <h3 className="text-5xl font-medium tracking-tighter leading-none group-hover:text-accent transition-colors duration-700 italic">
                  {domain.title}
                </h3>
                <div className="h-[1px] w-12 bg-foreground/10 group-hover:w-full transition-all duration-1000" />
              </div>

              <p className="text-2xl text-muted-foreground font-light leading-relaxed">
                {domain.description}
              </p>

              <ul className="grid gap-4 pt-4 border-l border-white/[0.02] pl-12">
                {domain.points.map((point) => (
                  <li key={point} className="flex items-center gap-6 opacity-30 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="w-1 h-1 rounded-full bg-accent" />
                    <span className="text-lg font-medium tracking-tight mb-1">{point}</span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* The Protocol */}
      <section className="py-80 px-6 border-t border-white/[0.02]">
        <div className="max-w-6xl mx-auto text-center">
          <ScrollReveal direction="up">
            <h2 className="text-6xl md:text-9xl font-medium tracking-tighter mb-20 leading-[0.8] text-balance">
              Building <br />
              <span className="opacity-30 italic font-light">Adoptable Systems.</span>
            </h2>
          </ScrollReveal>

          <div className="max-w-2xl mx-auto mt-24">
            <ScrollReveal direction="up" delay={0.2} className="space-y-12 text-2xl text-muted-foreground font-light leading-relaxed">
              <p>
                My specialization is in technical engagements where <span className="text-foreground">user adoption</span> is the primary bottleneck for organizational ROI.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-6 pt-12 text-2xl font-medium link-underline pb-1"
              >
                Inquire for engagement
                <ArrowRight size={32} className="opacity-20 translate-y-1" />
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
