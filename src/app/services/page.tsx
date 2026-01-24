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
  },
  {
    title: 'Workflow Automation',
    description: 'Building automation systems that reduce manual work and increase throughput. Identifying and scaling solutions.',
    examples: [
      'Built Claude Code automation (85% gain)',
      'Automated intake & correspondence',
      'Created reusable template libraries',
    ],
  },
  {
    title: 'Process Design & SOPs',
    description: 'Transforming ad-hoc tasks into structured, repeatable workflows. Creating SOPs that enable consistency.',
    examples: [
      'Defined SOPs for Law Firm management',
      'Redesigned clinic booking architecture',
      'Reduced intake friction via optimization',
    ],
  },
  {
    title: 'Training & Enablement',
    description: 'Driving technology adoption among resistant users. Designing programs that demonstrate immediate impact.',
    examples: [
      'Achieved full clinician adoption',
      'Created training for multi-provider sets',
      'Post-go-live stabilization support',
    ],
  },
  {
    title: 'Clinical Advisory',
    description: 'Advising health-tech med-tech companies on clinical workflows and product-market fit in healthcare settings.',
    examples: [
      'Reviewed deployment for MedDevice startup',
      'Workflow integration input',
      'Market validation & GTM planning',
    ],
  },
  {
    title: 'Operations Optimization',
    description: 'Improving throughput, reducing friction, and optimizing capacity across clinical and professional service ops.',
    examples: [
      'Integrated multi-provider scheduling',
      'Increase reviews by 125% via QR',
      'Optimized $600K+ revenue operations',
    ],
  },
];

export default function Services() {
  return (
    <div className="pt-24 overflow-hidden">
      {/* Hero Section */}
      <section className="py-40 px-6 relative">
        <div className="max-w-6xl mx-auto z-10 relative">
          <ScrollReveal direction="up" distance={30}>
            <p className="text-accent font-medium tracking-[0.4em] uppercase text-[10px] mb-8 opacity-80">Capabilities</p>
            <h1 className="text-6xl md:text-9xl font-medium tracking-tighter mb-16 leading-[0.8] text-balance">
              Strategic <br /> <span className="text-accent">Enablement.</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2} distance={20}>
            <p className="text-3xl md:text-4xl text-muted-foreground leading-relaxed max-w-3xl text-balance font-light">
              I implement technology that people actually use, and build systems that drive real growth.
            </p>
          </ScrollReveal>
        </div>
        {/* Bold Bottom Slash */}
        <div className="absolute bottom-0 left-0 w-full h-[40vh] bg-accent/5 -skew-y-6 translate-y-1/2 -z-10 pointer-events-none border-t border-accent/10" />
      </section>

      {/* Services Grid - Extreme Angular */}
      <section className="py-64 px-6 bg-card/20 relative mask-skew-up mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-16">
            {services.map((service, i) => (
              <ScrollReveal
                key={service.title}
                direction="none"
                delay={i * 0.1}
                className="group"
              >
                <div
                  className="h-full p-16 rounded-[4.5rem] border border-border bg-background/50 backdrop-blur-md hover:border-accent/40 transition-all duration-700 hover:-translate-y-4 flex flex-col shadow-2xl"
                  style={{ transform: `rotate(${i % 2 === 0 ? '2deg' : '-2deg'})` }}
                >
                  <h3 className="text-4xl font-medium mb-10 group-hover:text-accent transition-colors duration-500 leading-tight">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-16 text-2xl flex-grow font-light">
                    {service.description}
                  </p>

                  <div className="space-y-8">
                    <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent opacity-60">Impact Points</p>
                    <ul className="grid gap-6">
                      {service.examples.map((example) => (
                        <li key={example} className="flex items-start gap-6 group/item">
                          <CheckCircle2 size={24} className="text-accent mt-1 flex-shrink-0 opacity-20 group-hover/item:opacity-100 transition-opacity" />
                          <span className="text-lg text-foreground/80 leading-snug font-medium">{example}</span>
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

      {/* Process - Geometric Slash */}
      <section className="py-64 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <ScrollReveal direction="up" distance={100} parallaxVelocity={0.1}>
            <div className="grid lg:grid-cols-2 gap-32 items-center">
              <div>
                <p className="text-muted-foreground mb-8 uppercase tracking-[0.4em] text-[10px] font-bold opacity-60">Protocol</p>
                <h2 className="text-6xl md:text-9xl font-medium tracking-tighter mb-12 leading-[0.75]">
                  High Stakes. <br /> High Touch.
                </h2>
              </div>
              <div className="space-y-10 text-3xl text-muted-foreground leading-relaxed font-light">
                <p>
                  I specialize in engagements where user adoption is the critical bottleneck for organizational ROI.
                </p>
                <p>
                  Remote-first delivery for elite clinics and professional service firms across the continent.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
        {/* Aggressive Visual Slash */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[2px] bg-accent/30 rotate-[12deg] -z-10" />
      </section>

      {/* Closing CTA */}
      <section className="py-80 px-6 bg-foreground text-background mask-diagonal-right">
        <div className="max-w-5xl mx-auto text-center py-24">
          <ScrollReveal direction="up">
            <h2 className="text-7xl md:text-[160px] font-medium tracking-tighter mb-20 leading-[0.7]">
              Ready to <br /> <span className="text-accent underline decoration-8 underline-offset-[30px]">Advance?</span>
            </h2>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-8 px-20 py-10 bg-background text-foreground rounded-full font-medium hover:scale-110 active:scale-95 transition-all duration-500 text-3xl"
            >
              Consult Kareem
              <ArrowRight size={48} />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
