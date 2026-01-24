'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Briefcase, GraduationCap, Award } from 'lucide-react';

const experience = [
  {
    title: 'Digital Strategy & Operations Lead',
    company: 'Endorphins Health and Wellness Centre',
    period: 'Oct 2024 - Present',
    description: 'Leading digital operations and workflow enablement across 6 specialties. Redesigned booking architecture, integrated multi-provider scheduling, and reduced intake friction.',
    highlights: ['6 specialties integrated', 'Reduced intake friction', 'Multi-provider scheduling'],
  },
  {
    title: 'Workflow Automation Consultant',
    company: 'Tax Relief Counsel (LegalTech)',
    period: 'Jan 2025 - Present',
    description: 'Built Claude Code automation system reducing document generation time by 85%. Defined SOPs for case management and automated client intake workflows.',
    highlights: ['85% time reduction', 'SOPs defined', 'Intake automation'],
  },
  {
    title: 'Clinical Advisor',
    company: 'Neuro-Mod (Medical Device Startup)',
    period: 'Jul 2025 - Present',
    description: 'Reviewing clinical deployment strategies, interface design, and clinician workflow integration. Supporting market validation and go-to-market planning.',
    highlights: ['Clinical strategy', 'Interface design', 'Market validation'],
  },
  {
    title: 'Registered Physiotherapist',
    company: 'Movement Solutions Physiotherapy',
    period: 'Oct 2021 - Sep 2024',
    description: 'Led Heidi AI implementation achieving 100% clinician adoption in 8 weeks. Highest revenue-generating clinician for 3 consecutive years.',
    highlights: ['100% AI adoption', '$600K+ revenue', 'Top performer'],
  },
];

const education = [
  {
    degree: 'Master of Science, Physiotherapy',
    school: 'Robert Gordon University, Aberdeen',
    note: 'with Distinction',
    year: '2018-2019',
  },
  {
    degree: 'Bachelor of Science, Kinesiology',
    school: 'McMaster University, Hamilton',
    note: 'Honours',
    year: '2011-2016',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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

export default function About() {
  return (
    <div className="noise">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 animated-gradient" />
        <div className="absolute inset-0 bg-grid-pattern opacity-30" />

        {/* Decorative orb */}
        <motion.div
          className="absolute top-1/3 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-3xl"
          >
            <motion.div variants={itemVariants} className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium text-accent border border-accent/20">
                <Award size={14} />
                About Me
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-medium leading-tight mb-8"
            >
              Implementation specialist with <span className="gradient-text">frontline roots</span>
            </motion.h1>

            <motion.p variants={itemVariants} className="text-xl text-muted-foreground leading-relaxed mb-6">
              I&apos;m an implementation specialist with a background in clinical operations,
              now focused on AI adoption, workflow automation, and process optimization.
            </motion.p>

            <motion.p variants={itemVariants} className="text-xl text-muted-foreground leading-relaxed mb-8">
              My career has taken me from personal training and fitness management to
              clinical physiotherapy, and now into digital strategy and operations consulting.
              This path has given me something valuable: I understand both the frontline
              experience and the technical side of implementing new tools and systems.
            </motion.p>

            <motion.div variants={itemVariants}>
              <a
                href="/Kareem-Hassanein-Resume.pdf"
                className="group inline-flex items-center gap-3 px-6 py-3 rounded-xl border border-border hover:border-accent/50 hover:bg-accent/5 transition-all"
              >
                <Download size={20} className="text-accent" />
                <span className="text-foreground">Download Resume</span>
                <ArrowRight size={18} className="text-muted-foreground group-hover:translate-x-1 group-hover:text-accent transition-all" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="relative py-24 bg-card">
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-12"
          >
            <div className="p-3 rounded-xl bg-accent/10 text-accent">
              <Briefcase size={24} />
            </div>
            <h2 className="text-3xl md:text-4xl font-medium text-foreground">
              Experience
            </h2>
          </motion.div>

          <div className="space-y-6">
            {experience.map((item, index) => (
              <motion.div
                key={item.title + item.company}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="relative p-6 md:p-8 rounded-2xl border-gradient hover-lift">
                  <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
                      <div>
                        <h3 className="text-xl font-medium text-foreground mb-1">
                          {item.title}
                        </h3>
                        <p className="text-accent">{item.company}</p>
                      </div>
                      <span className="text-sm text-muted-foreground bg-background/50 px-3 py-1 rounded-full w-fit">
                        {item.period}
                      </span>
                    </div>

                    <p className="text-muted-foreground leading-relaxed mb-4">
                      {item.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {item.highlights.map((highlight) => (
                        <span
                          key={highlight}
                          className="text-xs px-3 py-1 rounded-full bg-accent/10 text-accent border border-accent/20"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 animated-gradient" />
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-12"
          >
            <div className="p-3 rounded-xl bg-accent/10 text-accent">
              <GraduationCap size={24} />
            </div>
            <h2 className="text-3xl md:text-4xl font-medium text-foreground">
              Education
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {education.map((item, index) => (
              <motion.div
                key={item.degree}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                whileHover={{ y: -4 }}
                className="group p-6 md:p-8 rounded-2xl border-gradient hover-lift"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative">
                  <span className="text-sm text-accent font-medium">{item.year}</span>
                  <h3 className="text-xl font-medium text-foreground mt-2 mb-1">
                    {item.degree}
                  </h3>
                  {item.note && (
                    <span className="inline-block px-2 py-0.5 text-xs rounded bg-accent/20 text-accent-light mb-3">
                      {item.note}
                    </span>
                  )}
                  <p className="text-muted-foreground">{item.school}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 bg-card overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-foreground mb-6">
              Interested in working <span className="gradient-text">together</span>?
            </h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-xl mx-auto">
              I&apos;m available for consulting, advisory, and implementation projects.
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
