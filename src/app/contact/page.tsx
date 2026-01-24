'use client';

import { motion } from 'framer-motion';
import { Mail, Linkedin, MapPin, ArrowUpRight } from 'lucide-react';

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

export default function Contact() {
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
            <p className="text-muted-foreground mb-4">Contact</p>
            <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-8">
              Let&apos;s start a conversation
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg text-muted-foreground leading-relaxed"
          >
            Whether you have a project in mind, want to discuss a potential collaboration,
            or just want to connect, I&apos;d be happy to hear from you.
          </motion.p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20 px-6 bg-card/30">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-6">
            {contactMethods.map((method, i) => (
              <motion.a
                key={method.label}
                href={method.href}
                target={method.href.startsWith('http') ? '_blank' : undefined}
                rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  delay: i * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group flex items-center gap-6 p-6 rounded-2xl border border-border hover:border-muted/50 transition-all duration-500"
              >
                <div className="p-4 rounded-xl bg-card text-accent">
                  <method.icon size={24} />
                </div>

                <div className="flex-1">
                  <p className="text-sm text-muted-foreground mb-1">{method.label}</p>
                  <p className="text-lg font-medium group-hover:text-accent transition-colors duration-300">
                    {method.value}
                  </p>
                  <p className="text-sm text-muted mt-1">{method.description}</p>
                </div>

                <ArrowUpRight
                  size={20}
                  className="text-muted-foreground group-hover:text-accent transition-colors duration-300"
                />
              </motion.a>
            ))}

            {/* Location */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex items-center gap-6 p-6 rounded-2xl border border-border"
            >
              <div className="p-4 rounded-xl bg-card text-accent">
                <MapPin size={24} />
              </div>

              <div className="flex-1">
                <p className="text-sm text-muted-foreground mb-1">Location</p>
                <p className="text-lg font-medium">Hamilton / Burlington, Ontario</p>
                <p className="text-sm text-muted mt-1">Available for remote work across North America</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Availability */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-3 mb-6">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-sm font-medium">Currently available</span>
            </div>
            <p className="text-muted-foreground">
              I typically respond to inquiries within 24-48 hours.<br />
              For urgent matters, email is the fastest way to reach me.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
