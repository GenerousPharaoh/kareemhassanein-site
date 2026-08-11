'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import ScreenFrame, { FrameChrome, type FrameTone } from '@/components/ScreenFrame';
import { HoverReel } from '@/components/Showreel';
import type { Project } from '@/lib/work';

function ConfidentialVisual({ project, tone = 'dark' }: { project: Project; tone?: FrameTone }) {
  if (project.slug === 'clinical-documentation') {
    return (
      <div className="overflow-hidden rounded-xl border border-white/[0.1] bg-[#171a1f] shadow-[0_28px_70px_-32px_rgba(0,0,0,0.9)] md:rounded-2xl">
        <FrameChrome url="implementation record · private clinic" />
        <div className="flex aspect-[16/10] flex-col justify-between p-6 sm:p-8 md:p-10">
          <div className="flex items-start justify-between gap-8 border-b border-white/[0.09] pb-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent/80">Adoption outcome</p>
              <p className="mt-3 text-5xl font-medium tracking-[-0.06em] text-foreground sm:text-6xl">100%</p>
              <p className="mt-2 text-sm text-muted-foreground">of the physiotherapy team</p>
            </div>
            <p className="max-w-36 text-right font-mono text-xs leading-relaxed text-foreground/58">
              Evaluation<br />Configuration<br />Support<br />Refinement
            </p>
          </div>
          <div>
            <div className="mb-3 flex justify-between font-mono text-[11px] text-foreground/52">
              <span>Start</span>
              <span>Week 2</span>
              <span>Week 4</span>
              <span>Week 6</span>
              <span>Week 8</span>
            </div>
            <div className="relative h-px bg-white/[0.16]">
              <div className="absolute inset-y-[-2px] left-0 w-full bg-accent/75" />
              <div className="absolute right-0 top-[-5px] h-3 w-3 border border-accent bg-[#171a1f]" />
            </div>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
              Adoption was handled as a workflow problem, with training, configuration, and support adjusted around
              clinical use.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const stages = [
    { name: 'Structured intake', note: 'The recurring questions, asked once' },
    { name: 'Matter facts', note: 'Verified inputs, separated from boilerplate' },
    { name: 'Template', note: 'The document skeleton for the matter type' },
    { name: 'Supported draft', note: 'Sections filled against the template' },
    { name: 'Practitioner review', note: 'Facts, citations, and tone checked' },
  ];

  const light = tone === 'light';
  return (
    <div
      className={`overflow-hidden rounded-xl md:rounded-2xl ${
        light
          ? 'border border-black/[0.1] bg-white shadow-[0_26px_60px_-30px_rgba(35,28,14,0.45)]'
          : 'border border-white/[0.1] bg-[#171a1f] shadow-[0_28px_70px_-32px_rgba(0,0,0,0.9)]'
      }`}
    >
      <FrameChrome url="drafting workflow · confidential" tone={tone} />
      <div className="flex aspect-[16/10] flex-col justify-center gap-1 px-6 py-6 sm:px-8 md:px-10">
        {stages.map((stage, i) => (
          <div
            key={stage.name}
            className={`flex items-baseline gap-4 border-b py-2.5 last:border-b-0 sm:py-3 ${
              light ? 'border-black/[0.07]' : 'border-white/[0.06]'
            }`}
          >
            <span className={`w-5 font-mono text-[11px] ${light ? 'text-[#8a6d33]' : 'text-accent/70'}`}>{i + 1}</span>
            <span className={`min-w-0 flex-1 text-sm font-medium sm:text-[15px] ${light ? 'text-[#211c13]' : 'text-foreground/88'}`}>
              {stage.name}
            </span>
            <span className={`hidden max-w-[45%] text-right text-xs leading-snug sm:block ${light ? 'text-[#6b6353]' : 'text-muted-foreground'}`}>
              {stage.note}
            </span>
          </div>
        ))}
        <p className={`mt-4 text-xs leading-relaxed ${light ? 'text-[#6b6353]' : 'text-muted-foreground'}`}>
          Client documents are confidential; the project page shows the reconstructed process.
        </p>
      </div>
    </div>
  );
}

interface WorkCardProps {
  project: Project;
  index?: number;
  variant?: 'stack' | 'row';
  flip?: boolean;
  className?: string;
  headingLevel?: 2 | 3;
  tone?: FrameTone;
}

export default function WorkCard({
  project,
  index = 0,
  variant = 'stack',
  flip = false,
  className = '',
  headingLevel = 3,
  tone = 'dark',
}: WorkCardProps) {
  const Heading = headingLevel === 2 ? 'h2' : 'h3';
  const [hovered, setHovered] = useState(false);

  // The card still leads; the project's other desktop screens cycle behind
  // it while the pointer rests on the card.
  const reelItems = project.card
    ? [
        project.card,
        ...project.gallery.filter((shot) => shot.frame === 'browser' && shot.src !== project.card?.src),
      ]
    : [];
  const cardSizes = variant === 'row' ? '(max-width: 1024px) 100vw, 680px' : '(max-width: 768px) 100vw, 640px';

  const visual = reelItems.length > 1 ? (
    <HoverReel items={reelItems} active={hovered} sizes={cardSizes} tone={tone} />
  ) : project.card ? (
    <ScreenFrame shot={project.card} sizes={cardSizes} tone={tone} />
  ) : (
    <ConfidentialVisual project={project} tone={tone} />
  );
  const light = tone === 'light';

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.8, delay: (index % 2) * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className={`group ${className}`}
    >
      <Link
        href={`/work/${project.slug}`}
        aria-label={`View ${project.title} project`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="block rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-accent"
      >
        <div className={variant === 'row' ? 'grid items-center gap-8 lg:grid-cols-12 lg:gap-16' : ''}>
          <div className={`${variant === 'row' ? `lg:col-span-7 ${flip ? 'lg:order-2' : ''}` : ''} transition-transform duration-700 ease-out-expo group-hover:-translate-y-1`}>
            {visual}
          </div>

          <div className={`${variant === 'row' ? `lg:col-span-5 lg:py-5 ${flip ? 'lg:order-1' : ''}` : 'mt-7'}`}>
            <p className={`mb-4 text-xs font-semibold uppercase tracking-[0.18em] ${light ? 'text-[#8a6d33]' : 'text-accent/80'}`}>
              {project.contextLabel ?? project.category}
            </p>
            <Heading
              className={`${variant === 'row' ? 'text-3xl sm:text-4xl lg:text-[2.8rem]' : 'text-2xl sm:text-3xl'} font-medium leading-[1.02] tracking-[-0.045em] transition-colors duration-500 ${light ? 'text-[#1c1812] group-hover:text-[#8a6d33]' : 'text-foreground group-hover:text-accent'}`}
            >
              {project.title}
            </Heading>
            <p className={`mt-5 max-w-xl text-[15px] leading-relaxed sm:text-base ${light ? 'text-[#57503f]' : 'text-muted-foreground'}`}>{project.summary}</p>


            <span className={`mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold transition-colors duration-500 ${light ? 'text-[#1c1812]/74 group-hover:text-[#8a6d33]' : 'text-foreground/74 group-hover:text-accent'}`}>
              View project
              <ArrowUpRight aria-hidden="true" size={16} className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
