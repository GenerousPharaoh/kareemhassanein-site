'use client';

import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import ParallaxImage from '@/components/ParallaxImage';
import CharReveal from '@/components/CharReveal';
import { useRef } from 'react';

const roadmap = [
  {
    period: '2025 - Present',
    title: 'Automation',
    company: 'Tax Relief Counsel',
    desc: 'A solo tax lawyer was spending hours on repetitive document assembly. I built a Claude-powered system that generates court-ready documents from intake data. 85% faster than before.',
    img: '/assets/n_implementation.png'
  },
  {
    period: '2024 - Present',
    title: 'Operations',
    company: 'Endorphins Health',
    desc: 'A 6-practitioner clinic with booking chaos and lost referrals. I rebuilt their Jane App configuration, automated follow-ups, and built tracking for referral sources. $600K+ in attributed revenue.',
    img: '/assets/n_strategy.png'
  },
  {
    period: '2025 - Present',
    title: 'Advisory',
    company: 'Neuro-Mod (Startup)',
    desc: 'A medical device startup building tools for clinicians. I review their interface designs and flag usability issues before they ship.',
    img: '/assets/n_logic.png'
  },
  {
    period: '2021 - 2024',
    title: 'Clinical',
    company: 'Movement Solutions Physio',
    desc: 'Before any of this, I was a physiotherapist. Three years as the top revenue generator at a busy clinic. I led the rollout of Heidi AI for clinical documentation and got 100% team adoption in 8 weeks.',
    img: '/assets/n_synergy.png'
  }
];

const gallery = [
  { src: '/images/bridging.png', label: 'Healthcare' },
  { src: '/assets/precision.png', label: 'Legal' },
  { src: '/assets/mapping.png', label: 'Process Design' },
  { src: '/assets/n_strategy.png', label: 'Implementation' }
];

function BioSection({ title, label, text, img, isReversed }: { title: string, label: string, text: string, img: string, isReversed?: boolean }) {
  const ref = useRef(null);

  return (
    <section ref={ref} className="min-h-[80vh] flex items-center relative overflow-hidden border-b border-white/5">
      <div className="max-w-[1600px] mx-auto w-full grid lg:grid-cols-2 items-center">
        <div className={`px-12 lg:px-24 py-24 space-y-10 ${isReversed ? 'lg:order-2' : ''}`}>
          <ScrollReveal direction="up">
            <span className="text-accent font-mono text-sm tracking-[0.4em] uppercase block mb-6">{label}</span>
            <h2 className="text-6xl md:text-8xl font-medium tracking-tighter leading-[0.8] mb-10 italic font-serif">
              {title}
            </h2>
            <p className="text-xl md:text-2xl font-light text-muted-foreground leading-relaxed max-w-lg">
              {text}
            </p>
          </ScrollReveal>
        </div>
        <div className={`relative h-[50vh] lg:h-full ${isReversed ? 'lg:order-1' : ''}`}>
          <ParallaxImage
            src={img}
            alt={title}
            className="h-full w-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-30 pointer-events-none" />
        </div>
      </div>
    </section>
  );
}

export default function About() {
  return (
    <main className="bg-background text-foreground pt-20">

      {/* Cinematic Identity Hero */}
      <section className="min-h-screen flex items-center justify-center relative border-b border-white/5 overflow-hidden px-6 md:px-24 py-32">

        {/* Full-Bleed Background Layer */}
        <div className="absolute inset-0 z-0">
          <ParallaxImage
            src="/images/digital-cathedral.png"
            alt="Architecture"
            className="w-full h-full opacity-20"
          />
          <div className="absolute inset-0 bg-background/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background" />
        </div>

        <div className="relative z-10 text-center md:text-left w-full max-w-[1400px]">
          <ScrollReveal direction="up">
            <span className="block text-[10px] font-bold tracking-[1em] uppercase mb-12 opacity-30">Background</span>
            <h1 className="text-[8vw] md:text-[6vw] font-medium tracking-tighter leading-[0.9] mb-12">
              Physiotherapist <CharReveal delay={0.4} className="text-accent italic font-serif">first.</CharReveal>
            </h1>
            <div className="max-w-2xl space-y-6 mx-auto md:mx-0">
              <p className="text-xl md:text-2xl font-light text-muted-foreground leading-relaxed">
                I spent years treating patients. MSc from Robert Gordon, top biller at a busy clinic, the whole trajectory.
              </p>
              <p className="text-xl md:text-2xl font-light text-muted-foreground leading-relaxed">
                But I kept getting pulled into the operational side. Why is the booking system losing referrals? Why are clinicians spending three hours a day on documentation? Why did we buy this software if nobody uses it?
              </p>
              <p className="text-xl md:text-2xl font-light text-foreground/90 leading-relaxed">
                Eventually I realized I was more interested in fixing those problems than treating another rotator cuff. So now that&apos;s what I do.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Chapters */}
      <BioSection
        label="Where I started"
        title="Physiotherapy"
        text="MSc with Distinction from Robert Gordon University. I treated patients for years, but I kept noticing the same thing: clinicians drowning in admin work that better systems could handle."
        img="/assets/precision.png"
      />

      <BioSection
        label="What I do now"
        title="Implementation"
        text="I figure out why software isn't getting used and fix it. That usually means rebuilding configurations, automating the tedious parts, and training teams on workflows that actually make sense."
        img="/images/image-2.png"
        isReversed
      />

      {/* Visual Evidence Gallery */}
      <section className="py-32 overflow-hidden border-b border-white/5 bg-white/[0.002]">
        <div className="px-12 lg:px-32 mb-24">
          <span className="text-[10px] font-bold tracking-[0.5em] uppercase opacity-30 mb-8 block">Industries</span>
          <h2 className="text-6xl md:text-9xl font-medium tracking-tighter">Where I work.</h2>
        </div>

        <div className="flex gap-12 px-12 lg:px-32 overflow-x-auto pb-24 no-scrollbar scroll-smooth">
          {gallery.map((item, i) => (
            <motion.div
              key={item.src}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex-shrink-0 w-[80vw] md:w-[600px] group"
            >
              <div className="aspect-[16/10] w-full rounded-2xl shadow-2xl relative">
                <ParallaxImage
                  src={item.src}
                  alt={item.label}
                  className="w-full h-full rounded-2xl border border-white/5"
                />
                <div className="absolute bottom-6 left-6 text-[10px] font-mono tracking-widest uppercase opacity-60 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full pointer-events-none">
                  {item.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Experience Track */}
      <section className="py-40 px-12 lg:px-32 bg-white/[0.005]">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-6xl md:text-9xl font-medium tracking-tighter mb-40 opacity-20">History.</h2>
          <div className="space-y-40">
            {roadmap.map((item) => (
              <div key={item.title} className="grid lg:grid-cols-[1fr_2fr] gap-20 items-start">
                <div className="sticky top-40">
                  <span className="text-xs font-bold tracking-widest uppercase opacity-40 block mb-4">{item.period}</span>
                  <h3 className="text-4xl text-accent font-serif italic">{item.title}</h3>
                  <p className="text-muted-foreground mt-4">{item.company}</p>
                </div>
                <div className="space-y-12">
                  <p className="text-3xl md:text-5xl font-light leading-snug">{item.desc}</p>
                  <div className="aspect-video w-full rounded-3xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000 border border-white/5">
                    <ParallaxImage src={item.img} alt={item.title} className="w-full h-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-40 text-center border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-[0.08] pointer-events-none">
          <ParallaxImage src="/images/glow.png" alt="Atmospheric Glow" className="w-full h-full object-cover" />
        </div>
        <ScrollReveal direction="up" className="relative z-10">
          <h2 className="text-7xl md:text-[120px] font-medium tracking-tighter mb-24 opacity-80">Resume</h2>
          <a
            href="/Kareem-Hassanein-Resume.pdf"
            className="group inline-flex items-center gap-12 text-3xl font-bold tracking-tight text-accent link-underline pb-4 px-12 transition-all hover:scale-105"
          >
            Download PDF
            <Download size={48} className="opacity-40 group-hover:translate-y-4 transition-all duration-1000" />
          </a>
        </ScrollReveal>
      </section>

    </main>
  );
}
