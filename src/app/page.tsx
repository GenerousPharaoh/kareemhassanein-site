'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Cpu, Workflow, TrendingUp, Sparkles } from 'lucide-react';

const highlights = [
  {
    icon: Cpu,
    title: 'AI Implementation',
    description: 'Led rollouts achieving 100% adoption. Reduced documentation time by 3 hours per week per practitioner.',
    stat: '100%',
    statLabel: 'Adoption Rate',
  },
  {
    icon: Workflow,
    title: 'Workflow Automation',
    description: 'Built systems reducing document generation time by 85%. Automated intake and correspondence workflows.',
    stat: '85%',
    statLabel: 'Time Saved',
  },
  {
    icon: TrendingUp,
    title: 'Operational Results',
    description: 'Track record of $600K+ revenue generation. Highest performing clinician for 3 consecutive years.',
    stat: '$600K+',
    statLabel: 'Revenue Generated',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div className="noise">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 animated-gradient" />
        <div className="absolute inset-0 bg-grid-pattern opacity-30" />

        {/* Floating orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        <motion.div style={{ y, opacity }} className="relative max-w-7xl mx-auto px-6 lg:px-8 py-32 pt-40">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-4xl"
          >
            {/* Badge */}
            <motion.div variants={itemVariants} className="mb-8">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium text-accent border border-accent/20">
                <Sparkles size={14} className="animate-pulse" />
                Implementation & Workflow Optimization
              </span>
            </motion.div>

            {/* Main headline */}
            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.1] mb-8"
            >
              <span className="text-foreground">Turning technology adoption into </span>
              <span className="gradient-text">operational results</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-12 max-w-2xl"
            >
              I help organizations implement AI tools, automate workflows, and optimize operations
              with a track record of driving adoption among resistant users.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-medium text-background bg-accent rounded-xl overflow-hidden hover-lift"
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
              <Link
                href="/about"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-medium text-foreground border border-border rounded-xl hover:border-accent/50 hover:bg-accent/5 transition-all"
              >
                Learn more
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-muted rounded-full flex justify-center p-2"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-accent rounded-full"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Highlights Section */}
      <section className="relative py-32 bg-card">
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-medium text-foreground mb-4">
              What I deliver
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Measurable results across implementation, automation, and operations
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ y: -8 }}
                className="group relative p-8 rounded-2xl border-gradient hover-lift cursor-default"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative">
                  {/* Icon */}
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-accent/10 text-accent mb-6 group-hover:scale-110 transition-transform duration-300">
                    <item.icon size={28} />
                  </div>

                  {/* Stat */}
                  <div className="mb-4">
                    <span className="text-4xl font-bold gradient-text">{item.stat}</span>
                    <span className="block text-sm text-muted-foreground mt-1">{item.statLabel}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-medium text-foreground mb-3">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Background Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 animated-gradient" />
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />

        {/* Decorative elements */}
        <motion.div
          className="absolute top-1/2 -left-32 w-64 h-64 border border-accent/20 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute top-1/2 -right-32 w-96 h-96 border border-accent/10 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-medium text-foreground mb-8">
                The bridge between <span className="gradient-text">frontline experience</span> and technical implementation
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                My career spans clinical practice, fitness management, and digital operations.
                I&apos;ve led AI tool implementations that achieved full adoption in 8 weeks,
                built automation systems for law firms, and advised medical device startups
                on clinical deployment strategies.
              </p>
              <p className="text-xl text-muted-foreground leading-relaxed mb-12">
                This combination of frontline experience and technical capability allows me to
                bridge the gap between what technology can do and how people actually use it.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-3 text-lg text-accent hover:text-accent-light transition-colors group"
              >
                Read more about my background
                <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 bg-card overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />

        {/* Glowing orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium text-foreground mb-6">
              Let&apos;s build something <span className="gradient-text">exceptional</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              Whether you&apos;re looking to implement new technology, optimize existing workflows,
              or need advisory on clinical operations, I&apos;d be happy to connect.
            </p>
            <Link
              href="/contact"
              className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 text-xl font-medium text-background bg-accent rounded-xl overflow-hidden hover-lift glow"
            >
              <span className="relative z-10">Start a conversation</span>
              <ArrowRight size={24} className="relative z-10 group-hover:translate-x-1 transition-transform" />
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
