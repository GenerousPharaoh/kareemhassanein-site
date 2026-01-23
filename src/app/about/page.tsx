'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';

const experience = [
  {
    title: 'Digital Strategy & Operations Lead',
    company: 'Endorphins Health and Wellness Centre',
    period: 'Oct 2024 - Present',
    description: 'Leading digital operations and workflow enablement across 6 specialties. Redesigned booking architecture, integrated multi-provider scheduling, and reduced intake friction.',
  },
  {
    title: 'Workflow Automation Consultant',
    company: 'Tax Relief Counsel (LegalTech)',
    period: 'Jan 2025 - Present',
    description: 'Built Claude Code automation system reducing document generation time by 85%. Defined SOPs for case management and automated client intake workflows.',
  },
  {
    title: 'Clinical Advisor',
    company: 'Neuro-Mod (Medical Device Startup)',
    period: 'Jul 2025 - Present',
    description: 'Reviewing clinical deployment strategies, interface design, and clinician workflow integration. Supporting market validation and go-to-market planning.',
  },
  {
    title: 'Registered Physiotherapist',
    company: 'Movement Solutions Physiotherapy',
    period: 'Oct 2021 - Sep 2024',
    description: 'Led Heidi AI implementation achieving 100% clinician adoption in 8 weeks. Highest revenue-generating clinician for 3 consecutive years. Generated $600K+ in revenue while leading operational improvements.',
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

export default function About() {
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
              About
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              I&apos;m an implementation specialist with a background in clinical operations,
              now focused on AI adoption, workflow automation, and process optimization.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              My career has taken me from personal training and fitness management to
              clinical physiotherapy, and now into digital strategy and operations consulting.
              This path has given me something valuable: I understand both the frontline
              experience and the technical side of implementing new tools and systems.
            </p>
            <a
              href="/Kareem-Hassanein-Resume.pdf"
              className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-colors"
            >
              <Download size={18} />
              Download Resume
            </a>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-medium text-gray-900 mb-12">
              Experience
            </h2>
            <div className="space-y-8">
              {experience.map((item, index) => (
                <motion.div
                  key={item.title + item.company}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="p-6 bg-white rounded-xl border border-gray-100"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        {item.title}
                      </h3>
                      <p className="text-gray-600">{item.company}</p>
                    </div>
                    <p className="text-sm text-gray-500 mt-1 md:mt-0">
                      {item.period}
                    </p>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Education Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-medium text-gray-900 mb-12">
              Education
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {education.map((item, index) => (
                <motion.div
                  key={item.degree}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="p-6 bg-gray-50 rounded-xl"
                >
                  <p className="text-sm text-gray-500 mb-2">{item.year}</p>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">
                    {item.degree}
                    {item.note && (
                      <span className="text-gray-500 font-normal"> ({item.note})</span>
                    )}
                  </h3>
                  <p className="text-gray-600">{item.school}</p>
                </motion.div>
              ))}
            </div>
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
              Interested in working together?
            </h2>
            <p className="text-gray-400 mb-8">
              I&apos;m available for consulting, advisory, and implementation projects.
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
