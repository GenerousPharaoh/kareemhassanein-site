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
      {/* Flagship About Hero */}
      <section className="py-48 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto z-10 relative">
          <ScrollReveal direction="up" distance={30}>
            <p className="text-accent font-bold tracking-[0.5em] uppercase text-[10px] mb-10 opacity-70">The Narrative</p>
            <h1 className="text-8xl md:text-[140px] font-medium tracking-tighter mb-20 leading-[0.75]">
              Frontline Roots. <br />
              <span className="text-accent italic">Digital Impact.</span>
            </h1>
          </ScrollReveal>

          <div className="grid lg:grid-cols-2 gap-32 items-start mt-24">
            <ScrollReveal direction="up" delay={0.2} distance={30} className="space-y-12 text-3xl text-muted-foreground leading-relaxed font-light">
              <p>
                My path from clinical practice to digital strategy gives me a <span className="text-foreground">unique advantage</span>: I know what it&apos;s like to use technology when time is scarce and the stakes are high.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.3} distance={30} className="space-y-12 text-3xl text-muted-foreground leading-relaxed lg:mt-48 font-light">
              <p>
                I bridge the gap between technical capability and operational reality, ensuring that systems don&apos;t just exist—they drive <span className="text-accent">real performance.</span>
              </p>
              <div className="pt-12">
                <a
                  href="/Kareem-Hassanein-Resume.pdf"
                  className="group inline-flex items-center gap-6 px-12 py-6 border border-white/10 rounded-full hover:bg-white/5 transition-all duration-700 text-2xl font-medium"
                >
                  <Download size={32} className="group-hover:translate-y-2 transition-transform duration-500" />
                  <span className="link-underline pb-1">Review Resume</span>
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Extreme Parallax Slashes */}
        <ScrollReveal direction="none" parallaxVelocity={0.15} className="absolute top-0 right-[-10%] w-2/3 h-full bg-accent/[0.03] -skew-x-[35deg] -z-10 group/bg">
          <div className="w-full h-full" />
        </ScrollReveal>
        <ScrollReveal direction="none" parallaxVelocity={-0.1} className="absolute bottom-[20%] left-[-5%] w-1/3 h-[2px] bg-accent/20 rotate-[20deg] -z-10">
          <div className="w-full h-full" />
        </ScrollReveal>
      </section>

      {/* Experience - Layered Glass Layout */}
      <section className="py-72 px-6 bg-card/20 relative mask-skew-down overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal direction="left" distance={100} className="mb-40">
            <p className="text-accent font-bold tracking-[0.3em] uppercase text-[10px] mb-8">Execution History</p>
            <h2 className="text-7xl md:text-[120px] font-medium tracking-tighter leading-[0.8] mb-12">
              The <span className="italic">Arc.</span>
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
            {experience.map((item, i) => (
              <ScrollReveal
                key={item.title}
                direction="none"
                delay={i * 0.1}
                className="group/exp"
                parallaxVelocity={0.03 * (i + 1)}
              >
                <div
                  className="glass-premium p-16 rounded-[4.5rem] hover:border-accent/40 transition-all duration-1000 group-hover/exp:-translate-y-6 flex flex-col"
                  style={{ transform: `rotate(${i % 2 === 0 ? '-2deg' : '2deg'})` }}
                >
                  <div className="flex flex-col mb-12">
                    <span className="text-[10px] font-bold tracking-[0.4em] text-accent uppercase mb-4 opacity-70">{item.period}</span>
                    <h3 className="text-5xl font-medium group-hover/exp:text-accent transition-colors duration-700 leading-tight tracking-tighter">{item.title}</h3>
                    <p className="text-2xl text-muted-foreground font-light mt-3">{item.company}</p>
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

      {/* Education - Extreme Geometric Slash */}
      <section className="py-72 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-40 items-center">
          <div className="order-2 lg:order-1 relative">
            <div className="grid gap-16 relative z-10">
              {education.map((item, i) => (
                <ScrollReveal
                  key={item.degree}
                  direction="none"
                  delay={i * 0.2}
                >
                  <div
                    className="glass-premium p-16 rounded-[4rem] group hover:border-accent/50 transition-all duration-1000"
                    style={{ transform: `rotate(${i % 2 === 0 ? '3deg' : '-3deg'})` }}
                  >
                    <h3 className="text-5xl font-medium mb-4 group-hover:text-accent transition-colors duration-700 leading-none tracking-tighter italic">{item.degree}</h3>
                    <p className="text-3xl text-foreground font-light">{item.school}</p>
                    <p className="text-muted-foreground mt-6 text-xl font-light italic opacity-60 uppercase tracking-widest">{item.detail}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {/* Bold Background Geometric Mask */}
            <ScrollReveal direction="none" parallaxVelocity={0.2} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160%] h-[40%] bg-accent/[0.04] mask-slash rotate-[25deg] -z-10">
              <div className="w-full h-full" />
            </ScrollReveal>
          </div>

          <ScrollReveal direction="right" distance={100} className="order-1 lg:order-2">
            <p className="text-accent font-bold tracking-[0.4em] uppercase text-[10px] mb-10">Foundation</p>
            <h2 className="text-7xl md:text-[140px] font-medium tracking-tighter mb-16 leading-[0.8]">
              Scientific <br /> <span className="italic">Rigor.</span>
            </h2>
            <p className="text-4xl text-muted-foreground leading-[1.3] font-light max-w-xl">
              Building operative excellence on a core of research and application.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA - Closing Aggressive Slash */}
      <section className="py-[30vh] px-6 relative overflow-hidden bg-foreground text-background mask-diagonal-left">
        <div className="max-w-7xl mx-auto text-center py-24 z-10 relative">
          <ScrollReveal direction="up" parallaxVelocity={0.05}>
            <p className="text-background/40 font-bold tracking-[0.6em] uppercase text-[10px] mb-12">Inquiry</p>
            <h2 className="text-8xl md:text-[180px] lg:text-[220px] font-medium tracking-tighter mb-24 leading-[0.7]">
              Let&apos;s Build <br /> <span className="italic underline decoration-accent underline-offset-[30px]">Value.</span>
            </h2>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-10 px-24 py-12 bg-background text-foreground rounded-full font-bold hover:scale-110 active:scale-95 transition-all duration-700 text-4xl shadow-2xl"
            >
              Collaborate
              <ArrowRight size={48} />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
