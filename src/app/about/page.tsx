'use client';

import { Download } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import CharReveal from '@/components/CharReveal';

const experience = [
  {
    period: '2025 - Present',
    role: 'Automation',
    company: 'Tax Relief Counsel',
    desc: 'A solo tax lawyer was spending hours on repetitive document assembly. I built a Claude-powered system that generates court-ready documents from intake data. 85% faster than before.',
  },
  {
    period: '2024 - Present',
    role: 'Operations',
    company: 'Endorphins Health',
    desc: 'A 6-practitioner clinic with booking chaos and lost referrals. I rebuilt their Jane App configuration, automated follow-ups, and built tracking for referral sources. $600K+ in attributed revenue.',
  },
  {
    period: '2025 - Present',
    role: 'Advisory',
    company: 'Neuro-Mod (Startup)',
    desc: 'A medical device startup building tools for clinicians. I review their interface designs and flag usability issues before they ship.',
  },
  {
    period: '2021 - 2024',
    role: 'Clinical',
    company: 'Movement Solutions Physio',
    desc: 'Before any of this, I was a physiotherapist. Three years as the top revenue generator at a busy clinic. I led the rollout of Heidi AI for clinical documentation and got 100% team adoption in 8 weeks.',
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
                I spent years treating patients. MSc from Robert Gordon, top biller at a busy clinic, the whole trajectory.
              </p>
              <p>
                But I kept getting pulled into the operational side. Why is the booking system losing referrals? Why are clinicians spending three hours a day on documentation? Why did we buy this software if nobody uses it?
              </p>
              <p className="text-foreground">
                Eventually I realized I was more interested in fixing those problems than treating another rotator cuff. So now that&apos;s what I do.
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
                <h3 className="text-2xl md:text-3xl font-medium tracking-tight mb-4">Clinical experience.</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Most implementation consultants have never used the software in a real workflow. I have. I know what it feels like when the system fights you instead of helping. That changes how I approach the work.
                </p>
              </div>
              <div>
                <h2 className="text-sm font-medium text-accent mb-4">How I work</h2>
                <h3 className="text-2xl md:text-3xl font-medium tracking-tight mb-4">Hands on.</h3>
                <p className="text-muted-foreground leading-relaxed">
                  I don&apos;t write reports and leave. I get into the system, rebuild the configuration, document the workflows, and train the team. When I&apos;m done, people are actually using the thing.
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
