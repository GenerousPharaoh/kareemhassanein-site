'use client';

import Link from 'next/link';
import { ArrowRight, Download } from 'lucide-react';
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
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal direction="up" distance={30}>
            <p className="text-accent font-medium tracking-wide uppercase text-sm mb-6">About</p>
            <h1 className="text-5xl md:text-7xl font-medium tracking-tighter mb-12 leading-[1.1] text-balance">
              Implementation specialist with frontline roots
            </h1>
          </ScrollReveal>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <ScrollReveal direction="up" delay={0.2} distance={20} className="space-y-8 text-xl text-muted-foreground leading-relaxed">
              <p>
                My career has taken me from personal training and fitness management to
                clinical physiotherapy, and now into digital strategy and operations consulting.
              </p>
              <p>
                This path gives me something valuable: I understand both the frontline
                experience and the technical side of implementing new tools and systems.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.3} distance={20} className="space-y-8 text-xl text-muted-foreground leading-relaxed lg:mt-24">
              <p>
                When I work with organizations on technology adoption, I know what it&apos;s
                like to be the person who has to use these tools every day. I bridge the gap
                between technical capability and clinical reality.
              </p>
              <div className="pt-8">
                <a
                  href="/Kareem-Hassanein-Resume.pdf"
                  className="inline-flex items-center gap-3 text-foreground hover:text-accent transition-all duration-300 link-underline pb-1 font-medium group text-lg"
                >
                  <Download size={20} className="group-hover:translate-y-0.5 transition-transform" />
                  Download resume
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Experience - Staggered/Offset Layout */}
      <section className="py-48 px-6 bg-card/10 relative">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal direction="up" distance={30} className="mb-24">
            <p className="text-muted-foreground mb-4 uppercase tracking-widest text-xs font-semibold">Experience</p>
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight">
              Where I&apos;ve made an impact
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-24">
            {experience.map((item, i) => (
              <ScrollReveal
                key={item.title}
                direction="up"
                distance={50}
                delay={i * 0.1}
                style={{ marginTop: item.offset }}
                className="group"
              >
                <div className="p-10 rounded-3xl border border-border bg-card/50 backdrop-blur-sm hover:border-accent/30 transition-all duration-500 hover:-translate-y-2">
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <h3 className="text-2xl font-medium mb-1 group-hover:text-accent transition-colors duration-300">{item.title}</h3>
                      <p className="text-muted-foreground font-medium">{item.company}</p>
                    </div>
                    <span className="text-sm font-semibold tracking-widest text-accent uppercase">{item.period}</span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {item.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Subtle structural element */}
        <div className="absolute top-0 right-0 w-1/3 h-full border-l border-border/20 -z-10 hidden lg:block" />
      </section>

      {/* Education - Split & Floating */}
      <section className="py-48 px-6 relative">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-24 items-center">
          <div className="order-2 lg:order-1 relative">
            <div className="grid gap-8">
              {education.map((item, i) => (
                <ScrollReveal
                  key={item.degree}
                  direction={i % 2 === 0 ? 'left' : 'right'}
                  distance={40}
                  delay={i * 0.2}
                  className={i % 2 === 0 ? '' : 'lg:translate-x-12'}
                >
                  <div className="p-8 rounded-2xl border border-border bg-card shadow-xl group hover:border-accent/20 transition-all duration-500">
                    <h3 className="text-2xl font-medium mb-2 group-hover:text-accent transition-colors duration-300">{item.degree}</h3>
                    <p className="text-lg text-foreground font-medium">{item.school}</p>
                    <p className="text-muted-foreground mt-2">{item.detail}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
            {/* Breakout border element */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] border border-border/30 rounded-[40px] -z-10 -rotate-2 pointer-events-none" />
          </div>

          <ScrollReveal direction="right" distance={80} className="order-1 lg:order-2">
            <p className="text-muted-foreground mb-4 uppercase tracking-widest text-xs font-semibold">Education</p>
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-8">
              Academic foundation
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              My clinical background is built on a strong scientific foundation, combining distal research and frontline application to drive distinction in healthcare operations.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA - Premium & Flowing */}
      <section className="py-64 px-6 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal direction="up">
            <h2 className="text-5xl md:text-7xl font-medium tracking-tighter mb-12">
              Interested in working together?
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground mb-16 max-w-2xl mx-auto text-balance">
              I&apos;m available for consulting, advisory, and high-stakes implementation projects across North America.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-3 px-12 py-6 bg-foreground text-background rounded-full font-medium hover:bg-foreground/90 transition-all duration-300 hover:scale-105 active:scale-95 text-xl"
            >
              Get in touch
              <ArrowRight size={24} />
            </Link>
          </ScrollReveal>
        </div>

        {/* Dynamic scroll background link */}
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent/20 to-transparent -z-10" />
      </section>
    </div>
  );
}
