'use client';

import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

const services = [
  {
    title: 'AI Tool Implementation',
    description: 'End-to-end implementation of AI tools in clinical and professional settings. From evaluation and vendor selection through training, go-live, and post-launch stabilization.',
    examples: [
      'Led Heidi AI rollout achieving 100% adoption in 8 weeks',
      'Reduced documentation time by 3 hours/week per practitioner',
      'Eliminated $20K in annual administrative costs',
    ],
    offset: '0'
  },
  {
    title: 'Workflow Automation',
    description: 'Building automation systems that reduce manual work and increase throughput. Identifying bottlenecks and implementing solutions that scale.',
    examples: [
      'Built Claude Code automation reducing document generation by 85%',
      'Automated client intake and correspondence workflows',
      'Created reusable template libraries for consistent output at scale',
    ],
    offset: '80px'
  },
  {
    title: 'Process Design & SOPs',
    description: 'Transforming ad-hoc tasks into structured, repeatable workflows. Creating Standard Operating Procedures that enable consistency and quality.',
    examples: [
      'Defined SOPs for law firm case management',
      'Redesigned clinic booking architecture across 6 specialties',
      'Reduced intake friction through process optimization',
    ],
    offset: '40px'
  },
  {
    title: 'Training & Enablement',
    description: 'Driving technology adoption among resistant users. Designing training programs that address real concerns and demonstrate immediate value.',
    examples: [
      'Achieved full clinician adoption of new documentation systems',
      'Created training materials for multi-provider scheduling',
      'Supported user onboarding and post-go-live stabilization',
    ],
    offset: '120px'
  },
  {
    title: 'Clinical Advisory',
    description: 'Advising health-tech and med-tech companies on clinical workflows, deployment strategies, and product-market fit in healthcare settings.',
    examples: [
      'Reviewed deployment strategies for medical device startup',
      'Provided input on interface design and workflow integration',
      'Supported market validation and go-to-market planning',
    ],
    offset: '60px'
  },
  {
    title: 'Operations Optimization',
    description: 'Improving throughput, reducing friction, and optimizing capacity across clinical and professional service operations.',
    examples: [
      'Integrated multi-provider scheduling reducing intake friction',
      'Implemented QR-based feedback increasing reviews by 125%',
      'Managed operations generating $600K+ in annual revenue',
    ],
    offset: '140px'
  },
];

export default function Services() {
  return (
    <div className="pt-24 overflow-hidden">
      {/* Hero */}
      <section className="py-32 px-6 relative">
        <div className="max-w-4xl mx-auto z-10 relative">
          <ScrollReveal direction="up" distance={30}>
            <p className="text-accent font-medium tracking-[0.3em] uppercase text-[10px] mb-6">Services</p>
            <h1 className="text-5xl md:text-8xl font-medium tracking-tighter mb-12 leading-[0.9] text-balance">
              How I can help
            </h1>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2} distance={20}>
            <p className="text-2xl md:text-3xl text-muted-foreground leading-relaxed max-w-2xl text-balance font-light">
              I work with organizations to implement technology, optimize workflows,
              and improve operations.
            </p>
          </ScrollReveal>
        </div>
        {/* Background Angular Element */}
        <div className="absolute bottom-0 left-0 w-full h-[300px] bg-accent/5 -skew-y-6 -z-10 pointer-events-none" />
      </section>

      {/* Services - Angular Layout */}
      <section className="py-48 px-6 bg-card/20 relative mask-skew-up">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {services.map((service, i) => (
              <ScrollReveal
                key={service.title}
                direction="none"
                delay={i * 0.1}
                className="group"
              >
                <div
                  className="h-full p-12 rounded-[2.5rem] border border-border bg-background/50 backdrop-blur-md hover:border-accent/40 transition-all duration-700 hover:-translate-y-4 flex flex-col"
                  style={{ transform: `rotate(${i % 2 === 0 ? '1deg' : '-1deg'})` }}
                >
                  <h3 className="text-4xl font-medium mb-8 group-hover:text-accent transition-colors duration-300 leading-tight">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-12 text-xl flex-grow font-light">
                    {service.description}
                  </p>

                  <div className="space-y-6 mb-4">
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent">Key Outcomes</p>
                    <ul className="grid gap-4">
                      {service.examples.map((example) => (
                        <li key={example} className="flex items-start gap-4 group/item">
                          <CheckCircle2 size={24} className="text-accent mt-1 flex-shrink-0 opacity-20 group-hover/item:opacity-100 transition-opacity" />
                          <span className="text-base text-foreground/80 leading-snug">{example}</span>
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

      {/* Process - Full Screen Angular */}
      <section className="py-64 px-6 relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <ScrollReveal direction="up" distance={100} parallaxVelocity={0.1}>
            <div className="grid lg:grid-cols-2 gap-24 items-center">
              <div>
                <p className="text-muted-foreground mb-4 uppercase tracking-[0.2em] text-[10px] font-bold">Process</p>
                <h2 className="text-5xl md:text-8xl font-medium tracking-tighter mb-8 leading-[0.85]">
                  High-touch, high-impact
                </h2>
              </div>
              <div className="space-y-8 text-2xl text-muted-foreground leading-relaxed font-light">
                <p>
                  I take on consulting engagements and advisory roles where adoption is the bottleneck.
                </p>
                <p>
                  Bringing a clinical perspective to technical operations, focused across North America.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
        {/* Abstract Slash */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[1px] bg-border/40 rotate-[15deg] -z-10" />
      </section>

      {/* CTA */}
      <section className="py-80 px-6 bg-foreground text-background mask-diagonal-right">
        <div className="max-w-4xl mx-auto text-center py-24">
          <ScrollReveal direction="up">
            <h2 className="text-6xl md:text-9xl font-medium tracking-tighter mb-16 leading-[0.8]">
              Have a project in mind?
            </h2>
            <p className="text-2xl md:text-3xl text-background/80 mb-20 max-w-2xl mx-auto text-balance font-light leading-relaxed">
              Let&apos;s discuss how I can help your organization bridge the gap between technology and adoption.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-4 px-16 py-8 bg-background text-foreground rounded-full font-medium hover:scale-110 active:scale-95 transition-all duration-500 text-2xl"
            >
              Get in touch
              <ArrowRight size={32} />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
