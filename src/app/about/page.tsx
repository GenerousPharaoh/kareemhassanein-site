'use client';

import { Download } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import CharReveal from '@/components/CharReveal';

const experience = [
  {
    period: '2025 - Present',
    role: 'Workflow Automation',
    company: 'Tax Relief Counsel',
    desc: 'Built an LLM-based drafting automation system that reduced document generation time by 85%. Mapped intake and client communication workflows, identified bottlenecks, and created a reusable template library for repeatable output at scale.',
  },
  {
    period: '2024 - Present',
    role: 'Digital Strategy & Operations',
    company: 'Endorphins Health',
    desc: 'Redesigned booking architecture across 6 specialties, reducing intake friction. Built and deployed a 60+ page web application with booking integration and Google Reviews API. Executed local SEO across 8 GTA municipalities.',
  },
  {
    period: '2025 - Present',
    role: 'Clinical Advisor',
    company: 'Neuro-Mod',
    desc: 'Reviewing clinician workflows for a medical device startup. Documenting usability friction points and delivering workflow integration recommendations to support deployment readiness.',
  },
  {
    period: '2021 - 2024',
    role: 'Registered Physiotherapist',
    company: 'Movement Solutions',
    desc: 'Top revenue-generating clinician for 3 consecutive years. Led the rollout of Heidi AI from evaluation through go-live, achieving 100% adoption in 8 weeks, reducing documentation by 3 hours/week per practitioner, and eliminating $20K in annual admin cost.',
  }
];

export default function About() {
  return (
    <main className="bg-background text-foreground pt-20">

      {/* Hero */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 px-6 lg:px-12 border-b border-white/5">
        <div className="max-w-[900px] mx-auto">
          <ScrollReveal direction="up">
            <span className="block text-xs font-medium tracking-[0.3em] uppercase text-muted-foreground mb-6">Background</span>
            <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-10">
              How I <CharReveal delay={0.4} className="text-accent italic font-serif">got here.</CharReveal>
            </h1>
            <div className="space-y-6 text-lg md:text-xl text-muted-foreground leading-relaxed">
              <p>
                I spent years as a physiotherapist. MSc from Robert Gordon, 6,000+ patient sessions, top revenue generator at a busy clinic for three consecutive years.
              </p>
              <p>
                But I kept getting pulled into the operational side. Why is the booking system losing referrals? Why are clinicians spending three hours a day on documentation? Why did we buy this software if nobody uses it?
              </p>
              <p>
                So I started fixing those problems. Led an AI documentation rollout that hit 100% adoption in 8 weeks. Built web applications. Created automation systems that cut document generation time by 85%.
              </p>
              <p className="text-foreground">
                Now I help healthcare practices and professional services firms do the same. Find the bottlenecks, build the systems, drive the adoption.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* What I bring */}
      <section className="py-16 md:py-24 px-6 lg:px-12 border-b border-white/5">
        <div className="max-w-[900px] mx-auto">
          <ScrollReveal direction="up">
            <div className="grid md:grid-cols-2 gap-12 md:gap-16">
              <div>
                <h2 className="text-sm font-medium text-accent mb-4">Why it matters</h2>
                <h3 className="text-2xl md:text-3xl font-medium tracking-tight mb-4">Operational experience.</h3>
                <p className="text-muted-foreground leading-relaxed">
                  8,000+ hours of client-facing delivery. I know what it feels like when systems fight you instead of helping. That shapes how I map workflows, configure tools, and design automations that actually fit into real work.
                </p>
              </div>
              <div>
                <h2 className="text-sm font-medium text-accent mb-4">How I work</h2>
                <h3 className="text-2xl md:text-3xl font-medium tracking-tight mb-4">I build things.</h3>
                <p className="text-muted-foreground leading-relaxed">
                  I don&apos;t write reports and leave. I build the automation, configure the system, write the SOPs, train the team, and stick around for post-go-live support. When I&apos;m done, people are actually using it.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Experience */}
      <section className="py-16 md:py-24 px-6 lg:px-12">
        <div className="max-w-[900px] mx-auto">
          <ScrollReveal direction="up">
            <span className="block text-xs font-medium tracking-[0.3em] uppercase text-muted-foreground mb-6">Experience</span>
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-12">Work history.</h2>
          </ScrollReveal>

          <div className="space-y-12">
            {experience.map((item, i) => (
              <ScrollReveal key={item.role} direction="up" delay={i * 0.1}>
                <div className="pb-12 border-b border-white/5 last:border-b-0 last:pb-0">
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-4">
                    <h3 className="text-xl md:text-2xl font-medium">{item.role}</h3>
                    <span className="text-muted-foreground">at {item.company}</span>
                    <span className="text-sm text-muted-foreground/60">{item.period}</span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed max-w-2xl">
                    {item.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Resume CTA */}
      <section className="py-16 md:py-24 px-6 lg:px-12 border-t border-white/5">
        <div className="max-w-[900px] mx-auto text-center">
          <ScrollReveal direction="up">
            <h2 className="text-2xl md:text-3xl font-medium tracking-tight mb-8">Want the full picture?</h2>
            <a
              href="/Kareem-Hassanein-Resume.pdf"
              className="group inline-flex items-center gap-3 text-lg font-medium bg-foreground text-background px-8 py-4 rounded-full hover:bg-accent transition-all duration-500"
            >
              Download Resume
              <Download size={20} className="group-hover:translate-y-0.5 transition-transform duration-500" />
            </a>
          </ScrollReveal>
        </div>
      </section>

    </main>
  );
}
