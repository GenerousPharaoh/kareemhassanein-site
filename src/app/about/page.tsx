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
    <div className="pt-24 overflow-hidden">
      {/* Hero Section */}
      <section className="py-40 px-6 relative">
        <div className="max-w-6xl mx-auto z-10 relative">
          <ScrollReveal direction="up" distance={30}>
            <p className="text-accent font-medium tracking-[0.4em] uppercase text-[10px] mb-8 opacity-80">The Narrative</p>
            <h1 className="text-6xl md:text-9xl font-medium tracking-tighter mb-16 leading-[0.8] text-balance">
              Frontline Roots. <br />
              Digital <span className="text-accent">Impact.</span>
            </h1>
          </ScrollReveal>

          <div className="grid lg:grid-cols-2 gap-24 items-start mt-12">
            <ScrollReveal direction="up" delay={0.2} distance={20} className="space-y-10 text-2xl text-muted-foreground leading-relaxed font-light">
              <p>
                My path from clinical practice to digital strategy gives me a unique advantage: I know what it&apos;s like to use technology when time is scarce and the stakes are high.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.3} distance={20} className="space-y-10 text-2xl text-muted-foreground leading-relaxed lg:mt-32 font-light">
              <p>
                I bridge the gap between technical capability and operational reality, ensuring that systems don&apos;t just exist—they get adopted and drive revenue.
              </p>
              <div className="pt-8">
                <a
                  href="/Kareem-Hassanein-Resume.pdf"
                  className="inline-flex items-center gap-4 text-foreground hover:scale-110 transition-all duration-500 group text-2xl font-medium"
                >
                  <Download size={32} className="group-hover:translate-y-2 transition-transform" />
                  <span className="link-underline pb-1">Review Resume</span>
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>
        {/* Aggressive Background Slash */}
        <div className="absolute top-0 right-0 w-[60%] h-full bg-accent/5 -skew-x-[30deg] translate-x-1/2 -z-10 pointer-events-none" />
      </section>

      {/* Experience Section - Angular Overlap */}
      <section className="py-64 px-6 bg-card/20 relative mask-skew-down">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal direction="up" distance={30} className="mb-32">
            <p className="text-muted-foreground mb-6 uppercase tracking-[0.3em] text-[10px] font-bold">Execution</p>
            <h2 className="text-5xl md:text-8xl font-medium tracking-tighter leading-none">
              Professional <br /> Arc.
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
            {experience.map((item, i) => (
              <ScrollReveal
                key={item.title}
                direction="none"
                delay={i * 0.1}
                className="group"
              >
                <div
                  className="p-16 rounded-[4rem] border border-border bg-background/50 backdrop-blur-md hover:border-accent/40 transition-all duration-700 hover:-translate-y-4 shadow-2xl"
                  style={{ transform: `rotate(${i % 2 === 0 ? '-2deg' : '2deg'})` }}
                >
                  <div className="flex flex-col mb-10">
                    <span className="text-[10px] font-bold tracking-[0.4em] text-accent uppercase mb-4 opacity-60 font-mono">{item.period}</span>
                    <h3 className="text-4xl font-medium group-hover:text-accent transition-colors duration-500 leading-tight">{item.title}</h3>
                    <p className="text-xl text-muted-foreground font-medium mt-2">{item.company}</p>
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

      {/* Education - Extreme Slash */}
      <section className="py-64 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-32 items-center">
          <div className="order-2 lg:order-1 relative">
            <div className="grid gap-12">
              {education.map((item, i) => (
                <ScrollReveal
                  key={item.degree}
                  direction="none"
                  delay={i * 0.2}
                >
                  <div
                    className="p-12 rounded-[3.5rem] border border-border bg-card shadow-2xl group hover:border-accent/40 transition-all duration-700"
                    style={{ transform: `rotate(${i % 2 === 0 ? '2deg' : '-2deg'})` }}
                  >
                    <h3 className="text-4xl font-medium mb-4 group-hover:text-accent transition-colors duration-500 leading-tight">{item.degree}</h3>
                    <p className="text-2xl text-foreground font-medium">{item.school}</p>
                    <p className="text-muted-foreground mt-4 text-xl font-light italic opacity-80">{item.detail}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
            {/* Bold Geometric Slash */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[30%] bg-accent/5 mask-slash -z-10 rotate-[25deg] pointer-events-none" />
          </div>

          <ScrollReveal direction="right" distance={80} className="order-1 lg:order-2">
            <p className="text-muted-foreground mb-6 uppercase tracking-[0.3em] text-[10px] font-bold">Foundation</p>
            <h2 className="text-5xl md:text-8xl font-medium tracking-tighter mb-12 leading-[0.85]">
              Academic <br /> Rigor.
            </h2>
            <p className="text-3xl text-muted-foreground leading-relaxed font-light max-w-xl">
              Building operative excellence on a scientific core. Robert Gordon University & McMaster.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA - Closing Slash */}
      <section className="py-80 px-6 relative overflow-hidden bg-foreground text-background mask-diagonal-left transition-all duration-1000">
        <div className="max-w-5xl mx-auto text-center py-24 z-10 relative">
          <ScrollReveal direction="up">
            <h2 className="text-6xl md:text-9xl font-medium tracking-tighter mb-20 leading-[0.75]">
              Let&apos;s build <br /> <span className="text-background underline decoration-accent underline-offset-[20px]">value.</span>
            </h2>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-6 px-20 py-10 bg-background text-foreground rounded-full font-medium hover:scale-110 active:scale-95 transition-all duration-500 text-3xl"
            >
              Get in touch
              <ArrowRight size={40} />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
