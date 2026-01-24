'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';

const work = [
  {
    metric: '100%',
    label: 'Adoption rate',
    description: 'Led Heidi AI rollout achieving full clinician adoption in 8 weeks',
  },
  {
    metric: '85%',
    label: 'Time reduction',
    description: 'Built automation systems reducing document generation time',
  },
  {
    metric: '$600K+',
    label: 'Revenue generated',
    description: 'Highest performing clinician for three consecutive years',
  },
];

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.15], [0, -50]);

  return (
    <div ref={containerRef} className="relative">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center px-6">
        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="max-w-3xl mx-auto text-center"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-muted-foreground mb-6"
          >
            Implementation & Workflow Optimization
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.1] tracking-tight mb-8"
          >
            I help organizations adopt technology and optimize the way they work
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg text-muted-foreground leading-relaxed mb-12 max-w-2xl mx-auto"
          >
            From AI implementation to workflow automation, I bridge the gap between
            what technology can do and how people actually use it.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-foreground text-background rounded-full font-medium hover:bg-foreground/90 transition-colors duration-300"
            >
              Get in touch
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 text-foreground rounded-full font-medium border border-border hover:bg-white/5 transition-colors duration-300"
            >
              Learn more
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Work Section */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-muted-foreground mb-4">Results</p>
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-16 max-w-2xl">
              Track record of driving adoption and delivering measurable operational gains
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {work.map((item, i) => (
              <motion.div
                key={item.metric}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                  duration: 0.8,
                  delay: i * 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group"
              >
                <p className="text-4xl md:text-5xl font-medium text-gradient mb-2">
                  {item.metric}
                </p>
                <p className="text-sm text-muted-foreground uppercase tracking-wide mb-4">
                  {item.label}
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-muted-foreground mb-4">Background</p>
              <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-8">
                From clinical practice to digital operations
              </h2>
              <div className="space-y-6 text-muted-foreground leading-relaxed">
                <p>
                  My path from physiotherapy to implementation consulting gives me
                  something valuable: I understand both frontline workflows and the
                  technical side of making new tools actually work.
                </p>
                <p>
                  I&apos;ve led AI implementations that achieved full adoption in 8 weeks,
                  built automation systems for law firms, and advised med-tech startups
                  on clinical deployment.
                </p>
              </div>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 mt-8 text-foreground hover:text-accent transition-colors duration-300 link-underline"
              >
                Read more
                <ArrowRight size={16} />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-4"
            >
              {[
                { role: 'Digital Strategy & Operations Lead', company: 'Endorphins Health' },
                { role: 'Workflow Automation Consultant', company: 'Tax Relief Counsel' },
                { role: 'Clinical Advisor', company: 'Neuro-Mod' },
              ].map((item) => (
                <div
                  key={item.role}
                  className="p-6 rounded-2xl border border-border hover:border-muted/50 transition-colors duration-500"
                >
                  <p className="font-medium mb-1">{item.role}</p>
                  <p className="text-sm text-muted-foreground">{item.company}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-32 px-6 bg-card/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-16"
          >
            <p className="text-muted-foreground mb-4">Services</p>
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-6">
              How I can help
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              I work with organizations to implement technology, optimize workflows,
              and improve operations.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              'AI Tool Implementation',
              'Workflow Automation',
              'Process Design & SOPs',
              'Training & Enablement',
              'Clinical Advisory',
              'Operations Optimization',
            ].map((service, i) => (
              <motion.div
                key={service}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="p-6 rounded-2xl border border-border hover:border-muted/50 transition-all duration-500 group"
              >
                <p className="font-medium group-hover:text-accent transition-colors duration-300">
                  {service}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mt-12"
          >
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-foreground hover:text-accent transition-colors duration-300 link-underline"
            >
              View all services
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight mb-6">
              Let&apos;s work together
            </h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
              Whether you&apos;re implementing new technology or optimizing existing workflows,
              I&apos;d be happy to connect.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-foreground text-background rounded-full font-medium hover:bg-foreground/90 transition-colors duration-300"
            >
              Start a conversation
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
