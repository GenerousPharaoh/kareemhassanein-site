'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Cpu, Workflow, FileText, Users, BarChart3, Settings, Layers } from 'lucide-react';

const services = [
  {
    icon: Cpu,
    title: 'AI Tool Implementation',
    description: 'End-to-end implementation of AI tools in clinical and professional settings. From evaluation and vendor selection through training, go-live, and post-launch stabilization.',
    examples: [
      'Led Heidi AI rollout achieving 100% adoption in 8 weeks',
      'Reduced documentation time by 3 hours/week per practitioner',
      'Eliminated $20K in annual administrative costs',
    ],
  },
  {
    icon: Workflow,
    title: 'Workflow Automation',
    description: 'Building automation systems that reduce manual work and increase throughput. Identifying bottlenecks and implementing solutions that scale.',
    examples: [
      'Built Claude Code automation reducing document generation by 85%',
      'Automated client intake and correspondence workflows',
      'Created reusable template libraries for consistent output at scale',
    ],
  },
  {
    icon: FileText,
    title: 'Process Design & SOPs',
    description: 'Transforming ad-hoc tasks into structured, repeatable workflows. Creating Standard Operating Procedures that enable consistency and quality.',
    examples: [
      'Defined SOPs for law firm case management',
      'Redesigned clinic booking architecture across 6 specialties',
      'Reduced intake friction through process optimization',
    ],
  },
  {
    icon: Users,
    title: 'Training & Enablement',
    description: 'Driving technology adoption among resistant users. Designing training programs that address real concerns and demonstrate immediate value.',
    examples: [
      'Achieved full clinician adoption of new documentation systems',
      'Created training materials for multi-provider scheduling',
      'Supported user onboarding and post-go-live stabilization',
    ],
  },
  {
    icon: BarChart3,
    title: 'Clinical Advisory',
    description: 'Advising health-tech and med-tech companies on clinical workflows, deployment strategies, and product-market fit in healthcare settings.',
    examples: [
      'Reviewed deployment strategies for medical device startup',
      'Provided input on interface design and workflow integration',
      'Supported market validation and go-to-market planning',
    ],
  },
  {
    icon: Settings,
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
    <div className="noise">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 animated-gradient" />
        <div className="absolute inset-0 bg-grid-pattern opacity-30" />

        {/* Decorative orbs */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-6"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium text-accent border border-accent/20">
                <Layers size={14} />
                Services
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-medium leading-tight mb-8"
            >
              How I can <span className="gradient-text">help</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-xl text-muted-foreground leading-relaxed"
            >
              I work with organizations to implement technology, optimize workflows,
              and improve operations. Most engagements fall into one of these areas,
              though many projects combine multiple elements.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="relative py-24 bg-card">
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -6 }}
                className="group relative p-8 rounded-2xl border-gradient hover-lift"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative">
                  {/* Icon */}
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-accent/10 text-accent mb-6 group-hover:scale-110 transition-transform duration-300">
                    <service.icon size={28} />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-medium text-foreground mb-4">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Examples */}
                  <div className="space-y-3">
                    {service.examples.map((example) => (
                      <div key={example} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                        <p className="text-sm text-muted-foreground">{example}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How I Work */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 animated-gradient" />
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />

        {/* Decorative circles */}
        <motion.div
          className="absolute top-1/2 -left-20 w-40 h-40 border border-accent/20 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-20 w-60 h-60 border border-accent/10 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-medium text-foreground mb-8">
                How I <span className="gradient-text">work</span>
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                I take on consulting engagements, advisory roles, and implementation projects.
                Most work starts with a conversation to understand what you&apos;re trying to
                accomplish and whether I can help.
              </p>
              <p className="text-xl text-muted-foreground leading-relaxed">
                I&apos;m based in the Hamilton/Burlington area but work remotely with clients
                across North America.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 bg-card overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-foreground mb-6">
              Have a project in <span className="gradient-text">mind</span>?
            </h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-xl mx-auto">
              Let&apos;s discuss how I can help.
            </p>
            <Link
              href="/contact"
              className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 text-lg font-medium text-background bg-accent rounded-xl overflow-hidden hover-lift glow"
            >
              <span className="relative z-10">Get in touch</span>
              <ArrowRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-accent-light to-accent"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.4 }}
              />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
