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
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal direction="up" distance={30}>
            <p className="text-accent font-medium tracking-wide uppercase text-sm mb-6">Services</p>
            <h1 className="text-5xl md:text-7xl font-medium tracking-tighter mb-12 leading-[1.1] text-balance">
              How I can help
            </h1>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2} distance={20}>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl text-balance">
              I work with organizations to implement technology, optimize workflows,
              and improve operations. Most engagements fall into one of these areas,
              though many projects combine multiple elements.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Services - Dynamic Asymmetric Grid */}
      <section className="py-48 px-6 bg-card/10 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {services.map((service, i) => (
              <ScrollReveal
                key={service.title}
                direction="up"
                distance={60}
                delay={i * 0.1}
                style={{ marginTop: service.offset }}
                className="group"
              >
                <div className="h-full p-10 rounded-3xl border border-border bg-card/40 backdrop-blur-md hover:border-accent/30 transition-all duration-500 hover:-translate-y-2 flex flex-col">
                  <h3 className="text-3xl font-medium mb-6 group-hover:text-accent transition-colors duration-300">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-10 text-lg flex-grow">
                    {service.description}
                  </p>

                  <div className="space-y-4 mb-4">
                    <p className="text-xs font-bold uppercase tracking-widest text-accent/80">Key Outcomes</p>
                    <ul className="space-y-4">
                      {service.examples.map((example) => (
                        <li key={example} className="flex items-start gap-4 group/item">
                          <CheckCircle2 size={18} className="text-accent mt-1 flex-shrink-0 opacity-40 group-hover/item:opacity-100 transition-opacity" />
                          <span className="text-sm text-foreground/80 leading-snug">{example}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Abstract background elements */}
        <div className="absolute top-1/4 left-0 w-full h-[1px] bg-border/20 -z-10" />
        <div className="absolute bottom-1/4 left-0 w-full h-[1px] bg-border/20 -z-10" />
      </section>

      {/* How I Work - Large Scale Parallax */}
      <section className="py-64 px-6 relative overflow-hidden">
        <div className="max-w-5xl mx-auto relative z-10">
          <ScrollReveal direction="up" distance={100} parallaxVelocity={0.15}>
            <div className="grid lg:grid-cols-2 gap-24 items-center">
              <div>
                <p className="text-muted-foreground mb-4 uppercase tracking-widest text-xs font-semibold">Process</p>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tighter mb-8 leading-none">
                  High-touch, high-impact
                </h2>
              </div>
              <div className="space-y-8 text-xl text-muted-foreground leading-relaxed">
                <p>
                  I take on consulting engagements, advisory roles, and implementation projects where adoption is the bottleneck.
                </p>
                <p>
                  I&apos;m based in the Hamilton/Burlington area but work remotely with clients across North America, bringing a clinical perspective to technical operations.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Structural breakout */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[1px] bg-border/30 rotate-6 -z-10" />
      </section>

      {/* CTA */}
      <section className="py-64 px-6 bg-card/5">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal direction="up">
            <h2 className="text-5xl md:text-7xl font-medium tracking-tighter mb-12 leading-none">
              Have a project in mind?
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground mb-16 max-w-2xl mx-auto text-balance">
              Let&apos;s discuss how I can help your organization bridge the gap between technology and adoption.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-3 px-12 py-6 bg-foreground text-background rounded-full font-medium hover:bg-foreground/90 transition-all duration-300 hover:scale-105 active:scale-95 text-xl"
            >
              Get in touch
              <ArrowRight size={24} />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
