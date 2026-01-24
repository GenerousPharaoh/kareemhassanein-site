'use client';

import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

const services = [
  {
    title: 'AI Tool Implementation',
    description: 'End-to-end implementation of AI tools in clinical and professional settings. From evaluation through to post-launch stabilization.',
    examples: [
      'Led Heidi AI rollout (100% adoption)',
      'Reduced doc time by 3hr/week',
      'Eliminated $20K admin costs',
    ],
    marginTop: '0px'
  },
  {
    title: 'Workflow Automation',
    description: 'Building automation systems that reduce manual work and increase throughput. Identifying and scaling solutions.',
    examples: [
      'Built Claude Code automation (85% gain)',
      'Automated intake & correspondence',
      'Created reusable template libraries',
    ],
    marginTop: '60px'
  },
  {
    title: 'Process Design & SOPs',
    description: 'Transforming ad-hoc tasks into structured, repeatable workflows. Creating SOPs that enable consistency.',
    examples: [
      'Defined SOPs for Law Firm management',
      'Redesigned clinic booking architecture',
      'Reduced intake friction via optimization',
    ],
    marginTop: '30px'
  },
  {
    title: 'Training & Enablement',
    description: 'Driving technology adoption among resistant users. Designing programs that demonstrate immediate impact.',
    examples: [
      'Achieved full clinician adoption',
      'Created training for multi-provider sets',
      'Post-go-live stabilization support',
    ],
    marginTop: '80px'
  },
  {
    title: 'Clinical Advisory',
    description: 'Advising health-tech med-tech companies on clinical workflows and product-market fit in healthcare settings.',
    examples: [
      'Reviewed deployment for MedDevice startup',
      'Workflow integration input',
      'Market validation & GTM planning',
    ],
    marginTop: '120px'
  },
  {
    title: 'Operations Optimization',
    description: 'Improving throughput, reducing friction, and optimizing capacity across clinical and professional service ops.',
    examples: [
      'Integrated multi-provider scheduling',
      'Increase reviews by 125% via QR',
      'Optimized $600K+ revenue operations',
    ],
    marginTop: '40px'
  },
];

export default function Services() {
  return (
    <div className="pt-24 overflow-hidden">
      {/* Hero Section */}
      <section className="py-48 px-6 relative">
        <div className="max-w-7xl mx-auto z-10 relative">
          <ScrollReveal direction="up" distance={30}>
            <p className="text-accent font-bold tracking-[0.5em] uppercase text-[10px] mb-12 opacity-80">Capabilities</p>
            <h1 className="text-7xl md:text-9xl lg:text-[140px] font-medium tracking-tighter mb-20 leading-[0.75] text-balance">
              Strategic <br /> <span className="text-accent italic">Enablement.</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2} distance={30}>
            <p className="text-3xl md:text-4xl text-muted-foreground leading-[1.3] max-w-4xl text-balance font-light">
              I implement technology that <span className="text-foreground">people actually use</span>, and build systems that drive <span className="text-foreground italic">measurable organizational growth.</span>
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Services Grid - Sophisticated Assymetry */}
      <section className="py-64 px-6 bg-card relative">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
            {services.map((service, i) => (
              <ScrollReveal
                key={service.title}
                direction="up"
                delay={i * 0.1}
                className="group"
                style={{ marginTop: service.marginTop }}
              >
                <div className="h-full p-16 rounded-[4rem] glass-premium transition-all duration-1000 group-hover:border-accent/40 flex flex-col">
                  <h3 className="text-4xl font-medium mb-10 group-hover:text-accent transition-colors duration-700 leading-none tracking-tighter italic">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-16 text-2xl flex-grow font-light">
                    {service.description}
                  </p>

                  <div className="space-y-10">
                    <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-accent opacity-50">Impact Indicators</p>
                    <ul className="grid gap-6">
                      {service.examples.map((example) => (
                        <li key={example} className="flex items-start gap-6 group/item">
                          <CheckCircle2 size={24} className="text-accent mt-1 flex-shrink-0 opacity-20 group-hover/item:opacity-100 transition-all duration-500" />
                          <span className="text-xl text-foreground font-light leading-snug">{example}</span>
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

      {/* Protocol Section */}
      <section className="py-80 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal direction="up">
            <div className="grid lg:grid-cols-2 gap-40 items-center">
              <div>
                <p className="text-accent font-bold tracking-[0.4em] uppercase text-[10px] mb-12 opacity-80">The Protocol</p>
                <h2 className="text-6xl md:text-9xl font-medium tracking-tighter mb-12 leading-[0.8] text-balance">
                  High Stakes. <br /> <span className="italic">High Touch.</span>
                </h2>
              </div>
              <div className="space-y-12 text-3xl text-muted-foreground leading-relaxed font-light">
                <p>
                  I specialize in technical engagements where <span className="text-foreground italic underline decoration-accent underline-offset-8">user adoption</span> is the critical bottleneck for organizational ROI.
                </p>
                <p>
                  Remote-first delivery for elite professional service firms and multi-specialty healthcare clinics.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-[30vh] px-6 bg-foreground text-background lg:rounded-[10rem] mx-6 mb-12">
        <div className="max-w-7xl mx-auto text-center py-24">
          <ScrollReveal direction="up">
            <h2 className="text-8xl md:text-[180px] font-medium tracking-tighter mb-24 leading-[0.7]">
              Ready to <br /> <span className="italic">Advance?</span>
            </h2>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-10 px-28 py-14 bg-background text-foreground rounded-full font-bold hover:scale-[1.05] active:scale-95 transition-all duration-700 text-5xl shadow-2xl"
            >
              Consult Kareem
              <ArrowRight size={64} />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
