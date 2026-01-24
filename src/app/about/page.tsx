'use client';

import Link from 'next/link';
import { Download } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

const experience = [
  {
    title: 'Digital Strategy & Operations Lead',
    company: 'Endorphins Health and Wellness Centre',
    period: '2024 - Present',
    description: 'Lead digital operations for a multi-specialty clinic spanning 6 specialties. Designed and built search-optimized infrastructure and multi-provider booking architectures (Jane App).',
  },
  {
    title: 'Operations Consultant (Process Automation)',
    company: 'Tax Relief Counsel',
    period: '2025 - Present',
    description: 'Architecting agentic workflows using Claude Code to automate document drafting and client correspondence, reducing baseline template generation time by 85%.',
  },
  {
    title: 'Clinical Advisor',
    company: 'Neuro-Mod (Medical Device Startup)',
    period: '2025 - Present',
    description: 'Advising on clinical usability and adoption barriers for AR-based pain management tools, focusing on clinician workflow integration and market validation.',
  },
  {
    title: 'Registered Physiotherapist',
    company: 'Movement Solutions Physiotherapy',
    period: '2021 - 2024',
    description: 'Generated $600K+ in treatment revenue while spearheading the clinic-wide adoption of Heidi AI, ensuring seamless integration for a team of 6 clinicians.',
  },
];

const education = [
  {
    degree: 'MSc Physiotherapy',
    school: 'Robert Gordon University (Distinction)',
    detail: 'Hamilton, ON | Scotland',
  },
  {
    degree: 'BSc Kinesiology',
    school: 'McMaster University (Honours)',
    detail: 'Hamilton, ON',
  },
];

export default function About() {
  return (
    <div className="pt-24 overflow-hidden">
      {/* Identity Hero */}
      <section className="py-48 px-6 relative">
        <div className="max-w-6xl mx-auto z-10 relative">
          <ScrollReveal direction="up" distance={30}>
            <p className="text-[10px] font-bold tracking-[0.5em] uppercase opacity-30 mb-12">The Narrative</p>
            <h1 className="text-7xl md:text-[140px] font-medium tracking-tighter mb-20 leading-[0.75] text-balance">
              Practice Meet <br />
              <span className="opacity-40 italic font-light">Procedure.</span>
            </h1>
          </ScrollReveal>

          <div className="grid lg:grid-cols-2 gap-32 items-start mt-24">
            <ScrollReveal direction="up" delay={0.2} distance={30} className="space-y-12 text-3xl text-muted-foreground leading-relaxed font-light">
              <p>
                My entry into digital strategy wasn&apos;t through a screen, but through the <span className="text-foreground">frontline friction</span> of clinical healthcare.
              </p>
              <p>
                I&apos;ve spent thousands of hours in the gap between what technology promises and what users actually need. My work is about bridging that gap.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.3} distance={30} className="space-y-12 text-3xl text-muted-foreground leading-relaxed lg:mt-48 font-light">
              <p>
                From automating legal workflows to stabilizing AI adoption in healthcare, I build systems that respect human time and drive <span className="text-foreground">organizational scale.</span>
              </p>
              <div className="pt-12">
                <a
                  href="/Kareem-Hassanein-Resume.pdf"
                  className="group inline-flex items-center gap-6 px-10 py-5 border border-white/5 rounded-full hover:bg-white/10 transition-all duration-700 text-xl font-medium"
                >
                  <Download size={24} className="group-hover:translate-y-1 transition-transform duration-500 opacity-40 group-hover:opacity-100" />
                  <span className="link-underline pb-1">Resume</span>
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-64 px-6 bg-card/10">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal direction="up" className="mb-40">
            <h2 className="text-5xl md:text-8xl font-medium tracking-tighter">
              Professional Arc.
            </h2>
          </ScrollReveal>

          <div className="space-y-32">
            {experience.map((item, i) => (
              <ScrollReveal
                key={item.title}
                direction="up"
                delay={i * 0.1}
                className="grid lg:grid-cols-[1fr_2fr] gap-12 items-start group"
              >
                <div className="space-y-2">
                  <p className="text-[10px] font-bold tracking-[0.4em] uppercase opacity-20">{item.period}</p>
                  <h3 className="text-3xl font-medium tracking-tight group-hover:text-accent transition-colors duration-500">{item.title}</h3>
                  <p className="text-xl text-muted-foreground font-light">{item.company}</p>
                </div>
                <p className="text-2xl text-muted-foreground leading-relaxed font-light">
                  {item.description}
                </p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Education & Foundations */}
      <section className="py-72 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.5fr_1fr] gap-40 items-start">
          <div className="grid gap-16">
            {education.map((item, i) => (
              <ScrollReveal
                key={item.degree}
                direction="up"
                delay={i * 0.2}
                className="space-y-6"
              >
                <h3 className="text-5xl font-medium tracking-tighter italic opacity-40">{item.degree}</h3>
                <p className="text-3xl font-light">{item.school}</p>
                <p className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-20">{item.detail}</p>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal direction="up" delay={0.4}>
            <div className="space-y-10 border-l border-white/[0.02] pl-16">
              <p className="text-[10px] font-bold tracking-[0.4em] uppercase opacity-20">Scientific Core</p>
              <p className="text-4xl font-medium tracking-tighter leading-tight">
                Building <br /> operative <br /> excellence on <br /> academic <br /> rigor.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-80 px-6 text-center border-t border-white/[0.02]">
        <ScrollReveal direction="up">
          <h2 className="text-6xl md:text-[140px] font-medium tracking-tighter mb-24 leading-[0.7]">
            Build <br /> <span className="opacity-30 italic font-light">Value.</span>
          </h2>
          <Link
            href="/contact"
            className="text-2xl font-light link-underline pb-2"
          >
            Start a project
          </Link>
        </ScrollReveal>
      </section>
    </div>
  );
}
