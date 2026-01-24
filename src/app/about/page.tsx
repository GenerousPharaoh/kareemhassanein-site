'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';

const experience = [
  {
    title: 'Digital Strategy & Operations Lead',
    company: 'Endorphins Health and Wellness Centre',
    period: '2024 - Present',
    description: 'Leading digital operations across 6 specialties. Redesigned booking architecture and reduced intake friction.',
  },
  {
    title: 'Workflow Automation Consultant',
    company: 'Tax Relief Counsel',
    period: '2025 - Present',
    description: 'Built Claude Code automation reducing document generation time by 85%. Defined SOPs for case management.',
  },
  {
    title: 'Clinical Advisor',
    company: 'Neuro-Mod',
    period: '2025 - Present',
    description: 'Reviewing clinical deployment strategies and interface design. Supporting market validation.',
  },
  {
    title: 'Registered Physiotherapist',
    company: 'Movement Solutions Physiotherapy',
    period: '2021 - 2024',
    description: 'Led Heidi AI implementation achieving 100% adoption. Highest revenue-generating clinician for 3 years.',
  },
];

const education = [
  {
    degree: 'MSc Physiotherapy',
    school: 'Robert Gordon University',
    detail: 'with Distinction',
  },
  {
    degree: 'BSc Kinesiology',
    school: 'McMaster University',
    detail: 'Honours',
  },
];

export default function About() {
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
            <p className="text-muted-foreground mb-4">About</p>
            <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-8">
              Implementation specialist with frontline roots
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6 text-lg text-muted-foreground leading-relaxed"
          >
            <p>
              My career has taken me from personal training and fitness management to
              clinical physiotherapy, and now into digital strategy and operations consulting.
            </p>
            <p>
              This path gives me something valuable: I understand both the frontline
              experience and the technical side of implementing new tools and systems.
              When I work with organizations on technology adoption, I know what it&apos;s
              like to be the person who has to use these tools every day.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10"
          >
            <a
              href="/Kareem-Hassanein-Resume.pdf"
              className="inline-flex items-center gap-2 text-foreground hover:text-accent transition-colors duration-300 link-underline"
            >
              <Download size={16} />
              Download resume
            </a>
          </motion.div>
        </div>
      </section>

      {/* Experience */}
      <section className="py-20 px-6 bg-card/30">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-muted-foreground mb-4">Experience</p>
            <h2 className="text-3xl font-medium tracking-tight mb-12">
              Where I&apos;ve worked
            </h2>
          </motion.div>

          <div className="space-y-12">
            {experience.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                  duration: 0.8,
                  delay: i * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group"
              >
                <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 mb-3">
                  <div>
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="text-muted-foreground">{item.company}</p>
                  </div>
                  <p className="text-sm text-muted">{item.period}</p>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-muted-foreground mb-4">Education</p>
            <h2 className="text-3xl font-medium tracking-tight mb-12">
              Background
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {education.map((item, i) => (
              <motion.div
                key={item.degree}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                  duration: 0.8,
                  delay: i * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <h3 className="font-medium mb-1">{item.degree}</h3>
                <p className="text-muted-foreground">{item.school}</p>
                <p className="text-sm text-muted mt-1">{item.detail}</p>
              </motion.div>
            ))}
          </div>
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
              Interested in working together?
            </h2>
            <p className="text-muted-foreground mb-10">
              I&apos;m available for consulting, advisory, and implementation projects.
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
