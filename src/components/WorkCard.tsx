'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ScreenFrame, { FrameChrome } from '@/components/ScreenFrame';
import { HoverReel } from '@/components/Showreel';
import type { Project } from '@/lib/work';

// Stand-in visual for projects without public screenshots (client work).
function ProcessVisual() {
  const rows = [
    { label: 'Before', width: '100%', accent: false, value: '~3 hrs' },
    { label: 'After', width: '17%', accent: true, value: '~30 min' },
  ];
  return (
    <div className="relative rounded-xl md:rounded-2xl overflow-hidden ring-1 ring-white/[0.09] bg-[hsl(222,12%,11.5%)] shadow-[0_30px_70px_-25px_rgba(0,0,0,0.7)]">
      <FrameChrome url="drafting workflow · confidential" />
      <div className="aspect-[16/10] flex flex-col justify-center gap-7 px-8 md:px-12">
        {rows.map((row) => (
          <div key={row.label}>
            <div className="flex items-baseline justify-between mb-2.5">
              <span className={`text-[10px] font-medium tracking-[0.2em] uppercase ${row.accent ? 'text-accent/80' : 'text-muted-foreground/70'}`}>
                {row.label}
              </span>
              <span className="text-xs md:text-sm text-foreground/80 font-mono">{row.value} per matter</span>
            </div>
            <div className="h-2 rounded-full bg-white/[0.05] overflow-hidden">
              <div
                className={`h-full rounded-full ${row.accent ? 'bg-accent/80' : 'bg-muted-foreground/40'}`}
                style={{ width: row.width }}
              />
            </div>
          </div>
        ))}
        <p className="text-xs text-muted-foreground/65 leading-relaxed max-w-sm">
          Client documents are confidential; the case study shows the reconstructed process instead.
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
}

export default function WorkCard({ project, index = 0, variant = 'stack', flip = false, className = '' }: WorkCardProps) {
  const [hovered, setHovered] = useState(false);

  // The card's chosen still leads; the project's other desktop screens
  // cycle behind it while the pointer rests on the card.
  const reelItems = project.card
    ? [
        project.card,
        ...project.gallery.filter((shot) => shot.frame === 'browser' && shot.src !== project.card?.src),
      ]
    : [];

  const visual = (
    <div className="transition-transform duration-700 ease-out-expo group-hover:-translate-y-1.5">
      {reelItems.length > 1 ? (
        <HoverReel
          items={reelItems}
          active={hovered}
          sizes={variant === 'row' ? '(max-width: 1024px) 100vw, 680px' : '(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 640px'}
        />
      ) : project.card ? (
        <ScreenFrame shot={project.card} sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 640px" />
      ) : (
        <ProcessVisual />
      )}
    </div>
  );

  const text = (
    <div className={variant === 'row' ? 'lg:py-6' : 'mt-6 md:mt-7'}>
      <span className="flex items-center gap-3 text-[10px] md:text-[11px] font-medium tracking-[0.22em] uppercase text-accent/75 mb-3">
        <span aria-hidden="true" className="h-px w-8 bg-accent/40 group-hover:w-12 transition-all duration-700" />
        {project.category}
      </span>
      <h3
        className={`font-medium tracking-tight text-foreground/95 group-hover:text-accent transition-colors duration-500 ${
          variant === 'row' ? 'text-3xl md:text-4xl lg:text-[2.6rem] leading-[1.08]' : 'text-2xl md:text-3xl'
        }`}
      >
        {project.title}
      </h3>
      <p className="mt-4 text-[15px] md:text-base text-muted-foreground/85 leading-relaxed max-w-xl">
        {project.summary}
      </p>
      {variant === 'row' && (
        <p className="mt-5 text-[12px] tracking-[0.08em] uppercase text-muted-foreground/55 leading-loose max-w-md hidden md:block">
          {project.contribution.slice(0, 4).join(' · ')}
        </p>
      )}
      <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-foreground/75 group-hover:text-accent transition-colors duration-500">
        View case study
        <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform duration-500" />
      </span>
    </div>
  );

  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.8, delay: (index % 2) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className={`group ${className}`}
    >
      <Link
        href={`/work/${project.slug}`}
        className="block focus-visible:outline-none"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {variant === 'row' ? (
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            <div className={`lg:col-span-7 ${flip ? 'lg:order-2' : ''}`}>{visual}</div>
            <div className={`lg:col-span-5 ${flip ? 'lg:order-1' : ''}`}>{text}</div>
          </div>
        ) : (
          <>
            {visual}
            {text}
          </>
        )}
      </Link>
    </motion.article>
  );
}
