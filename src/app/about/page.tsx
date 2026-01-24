'use client';

import Link from 'next/link';
import { Download, ArrowRight } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

const experience = [
  {
    title: 'Digital Strategy & Operations Lead',
    company: 'Endorphins Health and Wellness Centre',
    period: '2024 - Present',
    description: 'Leading digital operations across 6 specialties. Redesigned booking architecture and reduced intake friction.',
    offset: '0'
  },
  {
    title: 'Workflow Automation Consultant',
    company: 'Tax Relief Counsel',
    period: '2025 - Present',
    description: 'Built Claude Code automation reducing document generation time by 85%. Defined SOPs for case management.',
    offset: '40px'
  },
  {
    title: 'Clinical Advisor',
    company: 'Neuro-Mod',
    period: '2025 - Present',
    description: 'Reviewing clinical deployment strategies and interface design. Supporting market validation.',
    offset: '20px'
  },
  {
    title: 'Registered Physiotherapist',
    company: 'Movement Solutions Physiotherapy',
    period: '2021 - 2024',
    description: 'Led Heidi AI implementation achieving 100% adoption. Highest revenue-generating clinician for 3 years.',
    offset: '60px'
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
    <div className="pt-24 overflow-hidden">
      {/* Hero */}
      <section className="py-32 px-6 relative">
        <div className="max-w-4xl mx-auto z-10 relative">
          <ScrollReveal direction="up" distance={30}>
            <p className="text-accent font-medium tracking-[0.3em] uppercase text-[10px] mb-6">About</p>
            <h1 className="text-5xl md:text-8xl font-medium tracking-tighter mb-12 leading-[0.9] text-balance">
              Implementation specialist with frontline roots
            </h1>
          </ScrollReveal>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <ScrollReveal direction="up" delay={0.2} distance={20} className="space-y-8 text-xl text-muted-foreground leading-relaxed">
              <p>
                My career has taken me from personal training and fitness management to
                clinical physiotherapy, and now into digital strategy and operations consulting.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.3} distance={20} className="space-y-8 text-xl text-muted-foreground leading-relaxed lg:mt-24">
              <p>
                I understand both the frontline experience and the technical side of implementing new tools and systems. I bridge the gap between technical capability and clinical reality.
              </p>
              <div className="pt-8">
                <a
                  href="/Kareem-Hassanein-Resume.pdf"
                  className="inline-flex items-center gap-3 text-foreground hover:text-accent transition-all duration-300 group text-xl"
                >
                  <Download size={24} className="group-hover:translate-y-1 transition-transform" />
                  <span className="link-underline pb-1 font-medium">Download resume</span>
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>
        {/* Background Angular Element */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-accent/5 -skew-x-12 translate-x-1/4 -z-10 pointer-events-none" />
      </section>

      {/* Experience - Angular Layout */}
      <section className="py-48 px-6 bg-card/20 relative mask-skew-down">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal direction="up" distance={30} className="mb-24">
            <p className="text-muted-foreground mb-4 uppercase tracking-[0.2em] text-[10px] font-bold">Experience</p>
            <h2 className="text-4xl md:text-7xl font-medium tracking-tighter leading-none">
              Where I&apos;ve made an impact
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-24">
            {experience.map((item, i) => (
              <ScrollReveal
                key={item.title}
                direction="none"
                delay={i * 0.1}
                className="group"
              >
                <div
                  className="p-12 rounded-[2.5rem] border border-border bg-background/50 backdrop-blur-md hover:border-accent/40 transition-all duration-700 hover:-translate-y-4"
                  style={{ transform: `rotate(${i % 2 === 0 ? '-1deg' : '1deg'})` }}
                >
                  <div className="flex flex-col mb-8">
                    <span className="text-[10px] font-bold tracking-[0.3em] text-accent uppercase mb-2">{item.period}</span>
                    <h3 className="text-3xl font-medium group-hover:text-accent transition-colors duration-300 leading-tight">{item.title}</h3>
                    <p className="text-lg text-muted-foreground font-medium mt-1">{item.company}</p>
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-xl">
                    {item.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Education - Angled & Slashing */}
      <section className="py-64 px-6 relative overflow-hidden">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-24 items-center">
          <div className="order-2 lg:order-1 relative">
            <div className="grid gap-8">
              {education.map((item, i) => (
                <ScrollReveal
                  key={item.degree}
                  direction="none"
                  delay={i * 0.2}
                >
                  <div
                    className="p-10 rounded-3xl border border-border bg-card shadow-2xl group hover:border-accent/30 transition-all duration-500"
                    style={{ transform: `rotate(${i % 2 === 0 ? '1deg' : '-1deg'})` }}
                  >
                    <h3 className="text-3xl font-medium mb-2 group-hover:text-accent transition-colors duration-300 leading-tight">{item.degree}</h3>
                    <p className="text-xl text-foreground font-medium">{item.school}</p>
                    <p className="text-muted-foreground mt-2 text-lg">{item.detail}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
            {/* Background Slash */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] h-[40%] bg-accent/5 mask-slash -z-10 rotate-12 pointer-events-none" />
          </div>

          <ScrollReveal direction="right" distance={80} className="order-1 lg:order-2">
            <p className="text-muted-foreground mb-4 uppercase tracking-[0.2em] text-[10px] font-bold">Education</p>
            <h2 className="text-4xl md:text-7xl font-medium tracking-tighter mb-8 leading-none">
              Academic foundation
            </h2>
            <p className="text-2xl text-muted-foreground leading-relaxed font-light">
              My clinical background is built on a strong scientific foundation, combining distal research and frontline application to drive distinction in healthcare operations.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA - Final Angular Slash */}
      <section className="py-80 px-6 relative overflow-hidden bg-foreground text-background mask-diagonal-left transition-all duration-1000">
        <div className="max-w-4xl mx-auto text-center py-24">
          <ScrollReveal direction="up">
            <h2 className="text-6xl md:text-9xl font-medium tracking-tighter mb-16 leading-[0.8]">
              Interested in working together?
            </h2>
            <p className="text-2xl md:text-3xl text-background/80 mb-20 max-w-2xl mx-auto text-balance font-light leading-relaxed">
              I&apos;m available for consulting, advisory, and high-stakes implementation projects across North America.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-4 px-16 py-8 bg-background text-foreground rounded-full font-medium hover:scale-110 active:scale-95 transition-all duration-500 text-2xl"
            >
              Get in touch
              <ArrowRight size={32} />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
