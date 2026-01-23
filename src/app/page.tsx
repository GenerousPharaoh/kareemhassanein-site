'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Workflow, Cpu, TrendingUp } from 'lucide-react';

const highlights = [
  {
    icon: Cpu,
    title: 'AI Implementation',
    description: 'Led rollouts achieving 100% adoption and measurable efficiency gains.',
  },
  {
    icon: Workflow,
    title: 'Workflow Automation',
    description: 'Built systems reducing document generation time by 85%.',
  },
  {
    icon: TrendingUp,
    title: 'Operational Results',
    description: 'Track record of $600K+ revenue generation and process optimization.',
  },
];

export default function Home() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="min-h-[80vh] flex items-center">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">
              Implementation & Workflow Optimization
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium text-gray-900 leading-tight mb-6">
              Turning technology adoption into operational results
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
              I help organizations implement AI tools, automate workflows, and optimize operations.
              Background across healthcare, legal, and technology with a track record of driving
              adoption among resistant users and delivering measurable gains.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                Get in touch
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-gray-200 text-gray-700 rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-colors"
              >
                Learn more
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-medium text-gray-900 mb-12 text-center">
              What I do
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {highlights.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="p-6 bg-white rounded-xl border border-gray-100"
                >
                  <item.icon className="w-8 h-8 text-gray-700 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Brief Background Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-2xl md:text-3xl font-medium text-gray-900 mb-6">
              Background
            </h2>
            <p className="text-gray-600 leading-relaxed mb-8">
              My career spans clinical practice, fitness management, and digital operations.
              I&apos;ve led AI tool implementations that achieved full adoption in 8 weeks,
              built automation systems for law firms, and advised medical device startups
              on clinical deployment strategies. This combination of frontline experience
              and technical capability allows me to bridge the gap between what technology
              can do and how people actually use it.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-gray-900 font-medium hover:gap-3 transition-all"
            >
              Read more about my background
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-medium text-white mb-4">
              Let&apos;s talk
            </h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              Whether you&apos;re looking to implement new technology, optimize existing workflows,
              or need advisory on clinical operations, I&apos;d be happy to connect.
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
