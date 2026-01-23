'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Cpu, Workflow, FileText, Users, BarChart3, Settings } from 'lucide-react';

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
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl font-medium text-gray-900 mb-6">
              Services
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              I work with organizations to implement technology, optimize workflows,
              and improve operations. Most engagements fall into one of these areas,
              though many projects combine multiple elements.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 pb-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="p-6 bg-gray-50 rounded-xl"
              >
                <service.icon className="w-8 h-8 text-gray-700 mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {service.description}
                </p>
                <div className="space-y-2">
                  {service.examples.map((example) => (
                    <p key={example} className="text-sm text-gray-500 flex items-start gap-2">
                      <span className="text-gray-400 mt-1">-</span>
                      {example}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How I Work */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-2xl md:text-3xl font-medium text-gray-900 mb-6">
              How I work
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              I take on consulting engagements, advisory roles, and implementation projects.
              Most work starts with a conversation to understand what you&apos;re trying to
              accomplish and whether I can help.
            </p>
            <p className="text-gray-600 leading-relaxed">
              I&apos;m based in the Hamilton/Burlington area but work remotely with clients
              across North America.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-medium text-white mb-4">
              Have a project in mind?
            </h2>
            <p className="text-gray-400 mb-8">
              Let&apos;s discuss how I can help.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Get in touch
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
