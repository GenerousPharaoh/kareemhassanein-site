'use client';

import { Download, ChevronRight, Hash } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

const roadmap = [
  {
    period: '2024 - Present',
    title: 'Digital Strategy & Operations Lead',
    company: 'Endorphins Health',
    focus: 'Multidisciplinary System Architecture',
    points: [
      'Built endorphinshealth.com supporting acquisition across 6 specialties',
      'Engineered Jane App booking architecture and referral flows',
      'Configured technical local SEO and acquisition pipelines'
    ]
  },
  {
    period: '2025 - Present',
    title: 'Operations Consultant',
    company: 'Tax Relief Counsel',
    focus: 'Agentic Automation',
    points: [
      'Eliminated 85% of document drafting friction via Claude Code',
      'Integrated automated client correspondence workflows',
      'Increased team capacity without additional technical overhead'
    ]
  },
  {
    period: '2025 - Present',
    title: 'Clinical Advisor',
    company: 'Neuro-Mod',
    focus: 'Medical Device Usability',
    points: [
      'Reviewed clinical adoption barriers for AR pain-management',
      'Supported market validation for early go-to-market planning',
      'Advised on clinician-facing workflow integration'
    ]
  },
  {
    period: '2021 - 2024',
    title: 'Registered Physiotherapist',
    company: 'Movement Solutions',
    focus: 'Core Clinical Implementation',
    points: [
      'Spearheaded transition to Heidi AI documentation software',
      'Generated $600K treatment revenue over 36 months',
      'Developed SOPs for peer evaluation and software rollout'
    ]
  }
];

export default function About() {
  return (
    <div className="pt-24 overflow-hidden relative">
      <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none -z-10" />

      {/* Architectural Hero */}
      <section className="py-48 px-6 relative">
        <div className="max-w-7xl mx-auto z-10 relative">
          <div className="grid lg:grid-cols-[2fr_1fr] gap-24 items-start">
            <div>
              <ScrollReveal direction="none" className="mb-12">
                <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-accent">Identity Profile</span>
              </ScrollReveal>
              <h1 className="text-7xl md:text-[140px] font-medium tracking-tighter mb-20 leading-[0.75]">
                Identity <br /> & <span className="opacity-40 italic">Logic.</span>
              </h1>
            </div>
            <div className="lg:pt-48 pb-12 border-b border-white/5">
              <ScrollReveal delay={0.2}>
                <p className="text-2xl text-muted-foreground font-light leading-relaxed">
                  Synthesizing clinical precision with technical operational scale. Architecting the bridge between healthcare necessity and digital efficiency.
                </p>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Layered Bio Section */}
      <section className="py-72 px-6 bg-white/[0.01] border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-40">
            <ScrollReveal direction="up" className="space-y-16">
              <div className="flex items-center gap-6">
                <Hash className="text-accent w-6 h-6" />
                <h2 className="text-4xl font-medium tracking-tight">The Clinical Layer.</h2>
              </div>
              <p className="text-2xl text-muted-foreground font-light leading-relaxed">
                MSc Physiotherapy with Distinction from Robert Gordon, Scotland. Trained in systemic evaluation and diagnostic workflows. I deliver care that respects objective data and human adherence.
              </p>
              <ul className="space-y-6 pt-12 border-l border-white/5 pl-12">
                {['MSc Physiotherapy (Distinction)', 'BSc Kinesiology (Honours)', '2,000+ Coaching Hours'].map(item => (
                  <li key={item} className="text-xl font-light text-foreground">{item}</li>
                ))}
              </ul>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2} className="space-y-16">
              <div className="flex items-center gap-6">
                <Hash className="text-accent w-6 h-6" />
                <h2 className="text-4xl font-medium tracking-tight">The Technical Layer.</h2>
              </div>
              <p className="text-2xl text-muted-foreground font-light leading-relaxed">
                Applying agentic automation and CI/CD stability to professional operations. Claude Code for complex workflow re-engineering and Antigravity for technical deployment.
              </p>
              <ul className="space-y-6 pt-12 border-l border-white/5 pl-12">
                {['Agentic DevOps (Claude Code)', 'System Workflow Mapping', 'API Functional Conceptualization'].map(item => (
                  <li key={item} className="text-xl font-light text-foreground">{item}</li>
                ))}
              </ul>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Non-Linear Roadmap */}
      <section className="py-72 px-6">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal direction="up" className="mb-40">
            <p className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-30 mb-8">Career Architecture</p>
            <h2 className="text-6xl md:text-9xl font-medium tracking-tighter leading-none mb-12">The Roadmap.</h2>
          </ScrollReveal>

          <div className="space-y-2px bg-white/5 border border-white/5 overflow-hidden">
            {roadmap.map((item, i) => (
              <ScrollReveal
                key={item.title}
                direction="none"
                delay={i * 0.1}
                className="bg-[#050608] group"
              >
                <div className="grid lg:grid-cols-[1fr_2fr_1fr] gap-12 p-16 items-start hover:bg-white/[0.02] transition-all duration-700">
                  <div className="space-y-3">
                    <span className="text-[10px] font-bold tracking-widest text-accent italic">{item.period}</span>
                    <h3 className="text-3xl font-medium tracking-tight whitespace-nowrap">{item.title}</h3>
                    <p className="text-muted-foreground font-light">{item.company}</p>
                  </div>

                  <div className="space-y-8">
                    <p className="text-xl font-medium text-secondary-foreground">{item.focus}</p>
                    <ul className="space-y-4 pr-12">
                      {item.points.map(point => (
                        <li key={point} className="flex gap-4 text-muted-foreground font-light leading-relaxed">
                          <ChevronRight className="w-4 h-4 text-accent mt-1 flex-shrink-0" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="hidden lg:flex justify-end opacity-10 group-hover:opacity-100 transition-opacity">
                    <span className="text-8xl font-medium tracking-tighter text-white/5 italic">0{roadmap.length - i}</span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* High-Fi Resume CTA */}
      <section className="py-80 px-6 text-center bg-white/[0.01]">
        <ScrollReveal direction="up">
          <div className="mb-16 titanium-border p-12 inline-block max-w-xl text-left">
            <p className="text-xl text-muted-foreground font-light leading-relaxed mb-12">
              For a granular audit of my clinical revenue metrics, technical integration logs, and institutional accreditation history.
            </p>
            <a
              href="/Kareem Hassanein - Resume January 2026.pdf"
              className="flex items-center gap-6 text-2xl font-bold tracking-tight text-accent link-underline pb-1"
            >
              Access Technical Dossier
              <Download size={24} />
            </a>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
