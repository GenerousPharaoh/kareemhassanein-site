'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const services = [
  {
    title: 'AI Tool Implementation',
    description: 'End-to-end implementation of AI tools in clinical and professional settings. From evaluation and vendor selection through training, go-live, and post-launch stabilization.',
    examples: [
      'Led Heidi AI rollout achieving 100% adoption in 8 weeks',
      'Reduced documentation time by 3 hours/week per practitioner',
      'Eliminated $20K in annual administrative costs',
    ],
  },
  {
    title: 'Workflow Automation',
    description: 'Building automation systems that reduce manual work and increase throughput. Identifying bottlenecks and implementing solutions that scale.',
    examples: [
      'Built Claude Code automation reducing document generation by 85%',
      'Automated client intake and correspondence workflows',
      'Created reusable template libraries for consistent output at scale',
    ],
  },
  {
    title: 'Process Design & SOPs',
    description: 'Transforming ad-hoc tasks into structured, repeatable workflows. Creating Standard Operating Procedures that enable consistency and quality.',
    examples: [
      'Defined SOPs for law firm case management',
      'Redesigned clinic booking architecture across 6 specialties',
      'Reduced intake friction through process optimization',
    ],
  },
  {
    title: 'Training & Enablement',
    description: 'Driving technology adoption among resistant users. Designing training programs that address real concerns and demonstrate immediate value.',
    examples: [
      'Achieved full clinician adoption of new documentation systems',
      'Created training materials for multi-provider scheduling',
      'Supported user onboarding and post-go-live stabilization',
    ],
  },
  {
    title: 'Clinical Advisory',
    description: 'Advising health-tech and med-tech companies on clinical workflows, deployment strategies, and product-market fit in healthcare settings.',
    examples: [
      'Reviewed deployment strategies for medical device startup',
      'Provided input on interface design and workflow integration',
      'Supported market validation and go-to-market planning',
    ],
  },
  {
    title: 'Operations Optimization',
    description: 'Improving throughput, reducing friction, and optimizing capacity across clinical and professional service operations.',
    examples: [
      'Integrated multi-provider scheduling reducing intake friction',
      'Implemented QR-based feedback increasing reviews by 125%',
      'Managed operations generating $600K+ in annual revenue',
    ],
  },
];

export default function Services() {
  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-muted-foreground mb-4">Services</p>
            <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-8">
              How I can help
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg text-muted-foreground leading-relaxed"
          >
            I work with organizations to implement technology, optimize workflows,
            and improve operations. Most engagements fall into one of these areas,
            though many projects combine multiple elements.
          </motion.p>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 px-6 bg-card/30">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                  duration: 0.8,
                  delay: i * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="p-8 rounded-2xl border border-border hover:border-muted/50 transition-colors duration-500"
              >
                <h3 className="text-xl font-medium mb-4">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {service.description}
                </p>
                <ul className="space-y-3">
                  {service.examples.map((example) => (
                    <li key={example} className="flex items-start gap-3">
                      <span className="w-1 h-1 rounded-full bg-accent mt-2.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{example}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How I Work */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-muted-foreground mb-4">Process</p>
            <h2 className="text-3xl font-medium tracking-tight mb-8">
              How I work
            </h2>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                I take on consulting engagements, advisory roles, and implementation projects.
                Most work starts with a conversation to understand what you&apos;re trying to
                accomplish and whether I can help.
              </p>
              <p>
                I&apos;m based in the Hamilton/Burlington area but work remotely with clients
                across North America.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-3xl font-medium tracking-tight mb-6">
              Have a project in mind?
            </h2>
            <p className="text-muted-foreground mb-10">
              Let&apos;s discuss how I can help.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-foreground text-background rounded-full font-medium hover:bg-foreground/90 transition-colors duration-300"
            >
              Get in touch
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
