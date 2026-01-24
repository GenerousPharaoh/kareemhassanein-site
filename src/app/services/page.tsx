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
      {/* Flagship Services Hero */}
      <section className="py-[25vh] px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto z-10 relative">
          <ScrollReveal direction="up" distance={30}>
            <p className="text-accent font-bold tracking-[0.5em] uppercase text-[10px] mb-12 opacity-70">Expertise Domains</p>
            <h1 className="text-8xl md:text-[140px] font-medium tracking-tighter mb-20 leading-[0.75]">
              Strategic <br /> <span className="text-accent italic">Enablement.</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2} distance={30}>
            <p className="text-4xl md:text-5xl text-muted-foreground leading-[1.2] max-w-4xl text-balance font-light">
              I implement technology that <span className="text-foreground">people actually use</span>, and build systems that drive <span className="text-foreground underline decoration-accent underline-offset-[10px]">real growth</span>.
            </p>
          </ScrollReveal>
        </div>

        {/* Aggressive Visual Geometry */}
        <ScrollReveal direction="none" parallaxVelocity={-0.1} className="absolute bottom-0 left-0 w-full h-[45vh] bg-accent/[0.04] -skew-y-6 translate-y-1/2 -z-10 border-t border-accent/20">
          <div className="w-full h-full" />
        </ScrollReveal>
      </section>

      {/* Services Grid - Complex Glass Cards */}
      <section className="py-72 px-6 bg-[#09090b] relative mask-skew-up mt-24">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
            {services.map((service, i) => (
              <ScrollReveal
                key={service.title}
                direction="none"
                delay={i * 0.1}
                className="group/service"
                parallaxVelocity={0.03 * (i % 3)}
              >
                <div
                  className="h-full p-16 rounded-[5rem] glass-premium hover:border-accent/50 transition-all duration-1000 group-hover/service:-translate-y-8 flex flex-col shadow-[0_40px_100px_rgba(0,0,0,0.6)]"
                  style={{ transform: `rotate(${i % 2 === 0 ? '3deg' : '-3deg'})` }}
                >
                  <h3 className="text-5xl font-medium mb-12 group-hover/service:text-accent transition-colors duration-700 leading-none tracking-tighter italic">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-20 text-2xl flex-grow font-light">
                    {service.description}
                  </p>

                  <div className="space-y-10">
                    <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-accent opacity-50">Impact Outcomes</p>
                    <ul className="grid gap-8">
                      {service.examples.map((example) => (
                        <li key={example} className="flex items-start gap-8 group/item">
                          <CheckCircle2 size={28} className="text-accent mt-1 flex-shrink-0 opacity-20 group-hover/item:opacity-100 transition-all duration-500" />
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

      {/* Process - Layered Motion Section */}
      <section className="py-80 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <ScrollReveal direction="up" distance={100} parallaxVelocity={0.1}>
            <div className="grid lg:grid-cols-2 gap-40 items-center">
              <div>
                <p className="text-accent font-bold tracking-[0.4em] uppercase text-[10px] mb-10">Operational Protocol</p>
                <h2 className="text-7xl md:text-[140px] font-medium tracking-tighter mb-12 leading-[0.7]">
                  High Stakes. <br /> <span className="italic">High Touch.</span>
                </h2>
              </div>
              <div className="space-y-12 text-3xl text-muted-foreground leading-relaxed font-light">
                <p>
                  I specialize in technical engagements where <span className="text-foreground italic">user adoption</span> is the critical bottleneck for organizational ROI.
                </p>
                <p>
                  Scaling operations through precise, data-driven methodology across North America.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
        {/* Dynamic Architectural Slash */}
        <ScrollReveal direction="none" parallaxVelocity={0.2} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250%] h-[1px] bg-accent/40 rotate-[15deg] -z-10">
          <div className="w-full h-full" />
        </ScrollReveal>
      </section>

      {/* Final Call to Advance */}
      <section className="py-[35vh] px-6 bg-foreground text-background mask-diagonal-right relative overflow-hidden">
        <div className="max-w-7xl mx-auto text-center py-24 z-10 relative">
          <ScrollReveal direction="up" parallaxVelocity={0.1}>
            <p className="text-background/40 font-bold tracking-[0.8em] uppercase text-[10px] mb-16">Engagement</p>
            <h2 className="text-8xl md:text-[180px] lg:text-[260px] font-medium tracking-tighter mb-24 leading-[0.6]">
              Ready to <br /> <span className="text-accent italic underline decoration-[12px] underline-offset-[40px]">Advance?</span>
            </h2>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-10 px-28 py-14 bg-background text-foreground rounded-full font-bold hover:scale-110 active:scale-95 transition-all duration-700 text-5xl shadow-[0_50px_100px_rgba(0,0,0,0.5)]"
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
