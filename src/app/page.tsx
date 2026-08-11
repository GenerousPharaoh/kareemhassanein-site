'use client';

import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useRef } from 'react';
import ScreenFrame from '@/components/ScreenFrame';
import WorkCard from '@/components/WorkCard';
import ScrollReveal from '@/components/ScrollReveal';
import AnimatedDivider from '@/components/AnimatedDivider';
import Magnetic from '@/components/Magnetic';
import useIsMobile from '@/hooks/useIsMobile';
import { projects, advisory, areasOfWork } from '@/lib/work';

const ease = [0.16, 1, 0.3, 1] as const;

const approach = [
  {
    title: 'Understand',
    desc: 'See how the work actually happens and what users are already doing around the formal process.',
  },
  {
    title: 'Structure',
    desc: 'Turn the workflow, content, edge cases, and user needs into a coherent system.',
  },
  {
    title: 'Deliver',
    desc: 'Configure, build, or implement the solution using the tools appropriate to the project.',
  },
  {
    title: 'Refine',
    desc: 'Test it in use, identify what still creates friction, and improve it until the experience holds together.',
  },
];

const heroShots = {
  kinetikare: projects.find((p) => p.slug === 'kinetikare')?.card,
  endorphins: projects.find((p) => p.slug === 'endorphins')?.card,
  wedding: {
    src: '/images/work/wedding-travel-mobile.webp',
    alt: 'Wedding website travel guide on a phone',
    width: 390,
    height: 844,
    frame: 'phone' as const,
  },
};

// Numbered section eyebrow, echoing the guided-chapter rhythm: numeral,
// hairline, label.
function Eyebrow({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-3.5 text-[10px] md:text-xs font-medium tracking-[0.28em] uppercase text-accent/70 mb-5">
      <span className="font-serif italic text-base md:text-lg leading-none text-accent/50 tracking-normal normal-case">{n}</span>
      <span aria-hidden="true" className="h-px w-10 bg-accent/30" />
      {children}
    </p>
  );
}

// Soft wash that deepens mid-section and dissolves at both edges, so
// sections blend instead of switching.
function SectionWash() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-b from-transparent via-[hsl(222,15%,7.2%)] to-transparent opacity-80"
    />
  );
}

// Masked line reveal for the display name.
function RevealLine({ children, delay, className = '' }: { children: React.ReactNode; delay: number; className?: string }) {
  return (
    <span className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
      <motion.span
        initial={{ y: '105%' }}
        animate={{ y: 0 }}
        transition={{ duration: 1.1, delay, ease }}
        className={`block ${className}`}
      >
        {children}
      </motion.span>
    </span>
  );
}

export default function Home() {
  const large = projects.filter((p) => p.size === 'large');
  const small = projects.filter((p) => p.size === 'small');
  const isMobile = useIsMobile();
  const heroRef = useRef<HTMLElement>(null);

  // Scroll drift: the collage eases upward slightly slower than the page.
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const collageY = useSpring(useTransform(scrollYProgress, [0, 1], [0, isMobile ? 0 : 70]), {
    stiffness: 80,
    damping: 30,
  });
  const textY = useSpring(useTransform(scrollYProgress, [0, 1], [0, isMobile ? 0 : 30]), {
    stiffness: 80,
    damping: 30,
  });

  // Mouse parallax: layers drift at different depths.
  const mouseX = useSpring(0, { stiffness: 50, damping: 18 });
  const mouseY = useSpring(0, { stiffness: 50, damping: 18 });
  const mainX = useTransform(mouseX, (v) => v * -12);
  const mainY = useTransform(mouseY, (v) => v * -8);
  const endoX = useTransform(mouseX, (v) => v * -24);
  const endoY = useTransform(mouseY, (v) => v * -14);
  const phoneX = useTransform(mouseX, (v) => v * -34);
  const phoneY = useTransform(mouseY, (v) => v * -20);

  const handleHeroMouse = (e: React.MouseEvent<HTMLElement>) => {
    if (isMobile) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <main className="min-h-svh bg-background text-foreground overflow-hidden">
      {/* Hero */}
      <section
        ref={heroRef}
        onMouseMove={handleHeroMouse}
        className="relative flex items-center pt-32 pb-16 md:pt-40 md:pb-24 px-5 sm:px-6 md:px-12 xl:px-20 bg-background overflow-hidden"
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
          <div className="absolute -top-32 -left-32 w-[42rem] h-[42rem] rounded-full bg-accent/[0.05] blur-3xl" />
          <div className="absolute -bottom-40 -right-24 w-[36rem] h-[36rem] rounded-full bg-accent/[0.04] blur-3xl" />
        </div>

        <div className="relative z-10 w-full max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-12 gap-y-14 gap-x-10 lg:gap-x-14 items-center">
            {/* Editorial column */}
            <motion.div style={{ y: textY }} className="lg:col-span-6 text-left space-y-6 md:space-y-7">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.1, ease }}
                className="flex"
              >
                <span className="inline-flex items-center gap-2 text-[9.5px] sm:text-[10px] md:text-[11px] font-medium tracking-[0.18em] sm:tracking-[0.2em] uppercase text-foreground/65 px-3.5 py-2 rounded-full border border-white/[0.07] bg-[hsl(222,12%,13%)]/80 backdrop-blur-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_8px_rgba(176,141,87,0.5)]" />
                  Healthcare · Workflow · Digital Systems
                </span>
              </motion.div>

              <h1 className="font-medium leading-[0.92] tracking-[-0.04em]" style={{ fontSize: 'clamp(2.6rem, 7.5vw, 5rem)' }}>
                <RevealLine delay={0.18}>Kareem</RevealLine>
                <RevealLine delay={0.3} className="text-accent/90 italic font-serif">
                  Hassanein.
                </RevealLine>
              </h1>

              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 1, delay: 0.42 }}
                className="h-[1px] w-16 bg-accent/40 origin-left"
              />

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.48, ease }}
                className="max-w-[32rem] text-xl sm:text-2xl md:text-[1.7rem] text-foreground/90 font-light leading-[1.25] tracking-tight"
              >
                Selected work across healthcare, operations, and digital experience.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.58, ease }}
                className="max-w-[33rem] text-[15px] sm:text-base md:text-lg text-foreground/70 font-light leading-relaxed"
              >
                I&rsquo;m a practicing physiotherapist whose work extends into clinical implementation, service design,
                workflow automation, product advisory, and AI-enabled digital delivery. This portfolio shows how I
                translate real clinical and operational needs into clear, usable systems.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.66, ease }}
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-1"
              >
                <Magnetic>
                  <Link
                    href="/work"
                    className="group flex items-center justify-center gap-2.5 text-sm md:text-base font-medium w-full sm:w-auto px-7 py-3.5 rounded-full bg-accent text-background hover:bg-accent/90 transition-all duration-300"
                  >
                    View selected work
                    <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform duration-300" />
                  </Link>
                </Magnetic>
                <Magnetic strength={0.16}>
                  <a
                    href="#approach"
                    className="flex items-center justify-center text-sm md:text-base font-medium text-foreground/80 w-full sm:w-auto text-center px-7 py-3.5 rounded-full border border-white/[0.14] hover:text-foreground hover:border-accent/35 hover:bg-white/[0.03] transition-all duration-300"
                  >
                    About my approach
                  </a>
                </Magnetic>
              </motion.div>
            </motion.div>

            {/* Project screens: single clean frame on mobile, parallax collage from tablet up */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.35, ease }}
              style={{ y: collageY }}
              className="lg:col-span-6 w-full"
            >
              <div className="relative max-w-[680px] mx-auto sm:pb-14 sm:pr-10">
                {heroShots.kinetikare && (
                  <motion.div style={isMobile ? undefined : { x: mainX, y: mainY }} className="w-full sm:w-[88%]">
                    <ScreenFrame
                      shot={heroShots.kinetikare}
                      priority
                      sizes="(max-width: 768px) 100vw, 560px"
                    />
                  </motion.div>
                )}
                {heroShots.endorphins && (
                  <motion.div
                    style={isMobile ? undefined : { x: endoX, y: endoY }}
                    className="absolute right-0 -bottom-4 w-[58%] hidden sm:block"
                  >
                    <ScreenFrame shot={heroShots.endorphins} sizes="380px" />
                  </motion.div>
                )}
                <motion.div
                  style={isMobile ? undefined : { x: phoneX, y: phoneY }}
                  className="absolute -bottom-6 right-[52%] w-[24%] max-w-[150px] hidden sm:block"
                >
                  <ScreenFrame shot={heroShots.wedding} sizes="150px" />
                </motion.div>
                <div aria-hidden="true" className="absolute -inset-8 -z-10 rounded-[48px] bg-accent/[0.05] blur-2xl" />
              </div>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent z-[2] pointer-events-none" />
      </section>

      {/* Featured projects */}
      <section className="py-24 md:py-32 relative z-10 w-full px-6 md:px-12 xl:px-20 overflow-hidden">
        <SectionWash />
        <div className="max-w-[1280px] mx-auto relative z-10">
          <ScrollReveal direction="up" className="mb-14 md:mb-20">
            <Eyebrow n="01">Selected Work</Eyebrow>
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-balance leading-[1.05]">
              Four projects, <span className="text-accent/90 italic font-serif">in depth.</span>
            </h2>
            <AnimatedDivider direction="left" accent maxWidth="200px" className="mt-6" />
          </ScrollReveal>

          <div className="grid gap-20 md:gap-28">
            {large.map((project, i) => (
              <WorkCard key={project.slug} project={project} index={i} variant="row" flip={i % 2 === 1} />
            ))}
          </div>
          <div className="grid md:grid-cols-2 gap-14 md:gap-12 mt-20 md:mt-28">
            {small.map((project, i) => (
              <WorkCard key={project.slug} project={project} index={i} className={i === 1 ? 'md:mt-20' : ''} />
            ))}
          </div>
        </div>
      </section>

      {/* Supporting advisory work */}
      <section className="py-24 md:py-32 px-6 md:px-12 xl:px-20">
        <div className="max-w-[1280px] mx-auto">
          <ScrollReveal direction="up">
            <Eyebrow n="02">Beyond the featured projects</Eyebrow>
            <h2 className="text-2xl md:text-3xl font-medium tracking-tight mb-10 md:mb-12">
              Selected implementation &amp; advisory <span className="text-accent/90 italic font-serif">work.</span>
            </h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-5 md:gap-6">
            {advisory.map((item, i) => (
              <ScrollReveal key={item.title} direction="up" delay={i * 0.06}>
                <div className="group/card relative h-full p-7 md:p-8 rounded-lg border border-white/[0.06] bg-[hsl(222,12%,11.5%)] hover:border-accent/25 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/25 transition-all duration-500 overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent/0 via-accent/0 to-transparent group-hover/card:from-accent/50 group-hover/card:via-accent/15 transition-all duration-700" />
                  <h3 className="text-lg md:text-xl font-medium tracking-tight mb-3">{item.title}</h3>
                  <p className="text-sm md:text-[15px] text-muted-foreground/85 leading-relaxed">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Approach */}
      <section id="approach" className="py-24 md:py-32 px-6 md:px-12 xl:px-20 relative overflow-hidden scroll-mt-24">
        <SectionWash />
        <div className="max-w-[1280px] mx-auto relative z-10">
          <div className="grid lg:grid-cols-[0.9fr_1.4fr] gap-12 lg:gap-20 items-start">
            <ScrollReveal direction="up" className="lg:sticky lg:top-32">
              <Eyebrow n="03">How I approach the work</Eyebrow>
              <h2 className="text-3xl md:text-4xl font-medium tracking-tight leading-[1.1] mb-6 text-balance">
                Fit the system to the workflow, <span className="text-accent/90 italic font-serif">not the other way around.</span>
              </h2>
              <p className="text-base md:text-lg text-muted-foreground/80 leading-relaxed">
                Systems fail when they add friction to the days of the people expected to use them. The projects above
                hold up because the workflow came first and the tools came second.
              </p>
            </ScrollReveal>

            <div className="grid sm:grid-cols-2 gap-4 md:gap-5">
              {approach.map((item, i) => (
                <ScrollReveal key={item.title} direction="up" delay={i * 0.06}>
                  <div className="group/card h-full p-7 md:p-8 rounded-lg border border-white/[0.06] bg-[hsl(222,12%,11.5%)] hover:border-accent/25 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/25 transition-all duration-500">
                    <span className="block text-xl font-serif italic text-accent/70 mb-4 group-hover/card:text-accent transition-colors duration-500">
                      0{i + 1}
                    </span>
                    <h3 className="text-xl md:text-2xl font-medium tracking-tight mb-3">{item.title}</h3>
                    <p className="text-sm md:text-[15px] text-muted-foreground/85 leading-relaxed">{item.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Areas of work */}
      <section className="py-24 md:py-32 px-6 md:px-12 xl:px-20">
        <div className="max-w-[1280px] mx-auto">
          <ScrollReveal direction="up">
            <Eyebrow n="04">Areas of work</Eyebrow>
            <h2 className="text-2xl md:text-3xl font-medium tracking-tight mb-10 md:mb-12">
              Where the projects <span className="text-accent/90 italic font-serif">come from.</span>
            </h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {areasOfWork.map((item, i) => (
              <ScrollReveal key={item.title} direction="up" delay={i * 0.05}>
                <div className="h-full p-6 md:p-7 rounded-lg border border-white/[0.06] bg-[hsl(222,12%,11.5%)] hover:border-accent/25 hover:-translate-y-1 transition-all duration-500">
                  <h3 className="text-base md:text-lg font-medium tracking-tight mb-2.5">{item.title}</h3>
                  <p className="text-[13px] md:text-sm text-muted-foreground/85 leading-relaxed">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* About preview */}
      <section className="py-20 md:py-28 px-6 md:px-12 xl:px-20 relative overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60rem] h-[40rem] rounded-full bg-accent/[0.04] blur-3xl" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <ScrollReveal direction="up">
            <p className="flex items-center justify-center gap-3.5 text-[10px] md:text-xs font-medium tracking-[0.3em] uppercase text-accent/70 mb-6">
              <span className="font-serif italic text-base md:text-lg leading-none text-accent/50 tracking-normal normal-case">05</span>
              <span aria-hidden="true" className="h-px w-10 bg-accent/30" />
              About
            </p>
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight leading-[1.08] text-balance mb-6">
              A clinical background applied <span className="text-accent/90 italic font-serif">beyond the treatment room.</span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground/85 leading-relaxed max-w-xl mx-auto mb-10">
              Working close to patients and providers made me interested in the systems around care: how people find a
              service, how information moves, and why some workflows become routine while others create friction.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <Magnetic>
                <Link
                  href="/about"
                  className="group flex items-center justify-center gap-2.5 text-sm md:text-base font-medium w-full sm:w-auto px-7 py-3.5 rounded-full bg-accent text-background hover:bg-accent/90 transition-all duration-300"
                >
                  More about me
                  <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform duration-300" />
                </Link>
              </Magnetic>
              <Magnetic strength={0.16}>
                <Link
                  href="/contact"
                  className="flex items-center justify-center text-sm md:text-base font-medium text-foreground/80 w-full sm:w-auto text-center px-7 py-3.5 rounded-full border border-white/[0.14] hover:text-foreground hover:border-accent/35 hover:bg-white/[0.03] transition-all duration-300"
                >
                  Get in touch
                </Link>
              </Magnetic>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
