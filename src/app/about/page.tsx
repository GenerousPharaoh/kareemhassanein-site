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
    marginTop: '0px'
  },
  {
    title: 'Workflow Automation Consultant',
    company: 'Tax Relief Counsel',
    period: '2025 - Present',
    description: 'Built Claude Code automation reducing document generation time by 85%. Defined SOPs for case management.',
    marginTop: '60px'
  },
  {
    title: 'Clinical Advisor',
    company: 'Neuro-Mod',
    period: '2025 - Present',
    description: 'Reviewing clinical deployment strategies and interface design. Supporting market validation.',
    marginTop: '20px'
  },
  {
    title: 'Registered Physiotherapist',
    company: 'Movement Solutions Physiotherapy',
    period: '2021 - 2024',
    description: 'Led Heidi AI implementation achieving 100% adoption. Highest revenue-generating clinician for 3 years.',
    marginTop: '80px'
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
      {/* Hero Section */}
      <section className="py-48 px-6 relative">
        <div className="max-w-6xl mx-auto z-10 relative text-center">
          <ScrollReveal direction="up" distance={30}>
            <p className="text-accent font-bold tracking-[0.4em] uppercase text-[10px] mb-12 opacity-80">The Narrative</p>
            <h1 className="text-6xl md:text-8xl lg:text-[140px] font-medium tracking-tighter mb-20 leading-[0.85] text-balance">
              Frontline Roots. <br />
              <span className="text-accent italic">Digital Impact.</span>
            </h1>
          </ScrollReveal>

          <div className="grid lg:grid-cols-2 gap-24 items-start mt-24 text-left">
            <ScrollReveal direction="up" delay={0.2} distance={30} className="space-y-12 text-2xl text-muted-foreground leading-relaxed font-light">
              <p>
                My path from clinical practice to digital strategy gives me a <span className="text-foreground">unique advantage</span>: I know what it&apos;s like to use technology when time is scarce and the stakes are high.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.3} distance={30} className="space-y-12 text-2xl text-muted-foreground leading-relaxed lg:mt-32 font-light">
              <p>
                I bridge the gap between technical capability and operational reality, ensuring that systems don&apos;t just exist—they drive <span className="text-accent">real performance</span> for organizations.
              </p>
              <div className="pt-12">
                <a
                  href="/Kareem-Hassanein-Resume.pdf"
                  className="group inline-flex items-center gap-4 px-10 py-5 border border-white/10 rounded-full hover:bg-white/5 transition-all duration-700 text-xl font-medium"
                >
                  <Download size={24} className="group-hover:translate-y-1 transition-transform duration-500" />
                  <span className="link-underline pb-1">Review Resume</span>
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Experience Section - Sophisticated Asymmetry */}
      <section className="py-64 px-6 bg-card/40 relative">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal direction="left" distance={40} className="mb-40">
            <p className="text-accent font-bold tracking-[0.3em] uppercase text-[10px] mb-8">Professional History</p>
            <h2 className="text-5xl md:text-8xl font-medium tracking-tighter leading-none">
              The <span className="text-accent italic">Arc.</span>
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-24">
            {experience.map((item, i) => (
              <ScrollReveal
                key={item.title}
                direction="up"
                delay={i * 0.1}
                className="group"
                style={{ marginTop: item.marginTop }}
              >
                <div className="p-16 rounded-[3rem] glass-premium transition-all duration-1000 group-hover:border-accent/40 flex flex-col h-full">
                  <div className="flex flex-col mb-12">
                    <span className="text-[10px] font-bold tracking-[0.4em] text-accent uppercase mb-4 opacity-70">{item.period}</span>
                    <h3 className="text-4xl font-medium group-hover:text-accent transition-colors duration-700 leading-tight tracking-tighter">{item.title}</h3>
                    <p className="text-xl text-muted-foreground font-light mt-3">{item.company}</p>
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-2xl font-light">
                    {item.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Education - Clean Layout */}
      <section className="py-72 px-6 relative">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.5fr_1fr] gap-40 items-center">
          <div className="grid gap-12">
            {education.map((item, i) => (
              <ScrollReveal
                key={item.degree}
                direction="up"
                delay={i * 0.2}
              >
                <div className="p-16 rounded-[3rem] border border-white/[0.03] bg-card/50 transition-all duration-1000">
                  <h3 className="text-5xl font-medium mb-4 leading-none tracking-tighter">{item.degree}</h3>
                  <p className="text-3xl text-foreground font-light">{item.school}</p>
                  <p className="text-muted-foreground mt-6 text-xl font-light italic opacity-60 uppercase tracking-widest">{item.detail}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal direction="right" distance={80}>
            <p className="text-accent font-bold tracking-[0.4em] uppercase text-[10px] mb-10">Academic Foundation</p>
            <h2 className="text-6xl md:text-9xl font-medium tracking-tighter mb-16 leading-[0.85]">
              Scientific <br /> <span className="italic">Rigor.</span>
            </h2>
            <p className="text-3xl text-muted-foreground leading-relaxed font-light">
              Building operative excellence on a scientific foundation of research and clinical application.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-80 px-6 relative overflow-hidden flex items-center justify-center">
        <ScrollReveal direction="up">
          <div className="max-w-7xl mx-auto text-center relative z-10">
            <h2 className="text-7xl md:text-[140px] font-medium tracking-tighter mb-20 leading-[0.7]">
              Let&apos;s Build <br /> <span className="text-accent italic">Value.</span>
            </h2>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-8 px-24 py-12 bg-foreground text-background rounded-full font-bold hover:scale-[1.05] active:scale-95 transition-all duration-700 text-4xl"
            >
              Collaborate
              <ArrowRight size={48} />
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
