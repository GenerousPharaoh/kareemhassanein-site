'use client';

import { motion } from 'framer-motion';
import { Mail, Linkedin, MapPin, Send } from 'lucide-react';

const contactMethods = [
  {
    icon: Mail,
    label: 'Email',
    value: 'kareem.hassanein@gmail.com',
    href: 'mailto:kareem.hassanein@gmail.com',
    description: 'Best for detailed inquiries',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/kareemhassanein',
    href: 'https://linkedin.com/in/kareemhassanein',
    description: 'Connect professionally',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export default function Contact() {
  return (
    <div className="noise">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 animated-gradient" />
        <div className="absolute inset-0 bg-grid-pattern opacity-30" />

        {/* Floating orbs */}
        <motion.div
          className="absolute top-1/3 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5] }}
          transition={{ duration: 8, repeat: Infinity }}
        />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-32 pt-40">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left side - Content */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants} className="mb-6">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium text-accent border border-accent/20">
                  <Send size={14} />
                  Get in Touch
                </span>
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="text-4xl md:text-5xl lg:text-6xl font-medium leading-tight mb-8"
              >
                Let&apos;s start a <span className="gradient-text">conversation</span>
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="text-xl text-muted-foreground leading-relaxed mb-12"
              >
                Whether you have a project in mind, want to discuss a potential collaboration,
                or just want to connect, I&apos;d be happy to hear from you.
              </motion.p>

              {/* Location */}
              <motion.div
                variants={itemVariants}
                className="flex items-center gap-4 text-muted-foreground"
              >
                <div className="p-3 rounded-xl bg-accent/10 text-accent">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-foreground font-medium">Hamilton / Burlington, Ontario</p>
                  <p className="text-sm">Available for remote work across North America</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Right side - Contact Methods */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-6"
            >
              {contactMethods.map((method, index) => (
                <motion.a
                  key={method.label}
                  href={method.href}
                  target={method.href.startsWith('http') ? '_blank' : undefined}
                  rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="group flex items-center gap-6 p-6 rounded-2xl border-gradient hover-lift cursor-pointer"
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-accent/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative p-4 rounded-xl bg-accent/10 text-accent group-hover:bg-accent group-hover:text-background transition-colors duration-300">
                      <method.icon size={24} />
                    </div>
                  </div>

                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground mb-1">{method.label}</p>
                    <p className="text-lg text-foreground font-medium group-hover:text-accent transition-colors">
                      {method.value}
                    </p>
                    <p className="text-sm text-muted mt-1">{method.description}</p>
                  </div>

                  <div className="text-muted-foreground group-hover:text-accent transition-colors">
                    <svg
                      className="w-6 h-6 transform group-hover:translate-x-1 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </motion.a>
              ))}

              {/* Availability note */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="p-6 rounded-2xl glass border border-accent/10"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-sm font-medium text-foreground">Currently available</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  I typically respond to inquiries within 24-48 hours. For urgent matters,
                  email is the fastest way to reach me.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
