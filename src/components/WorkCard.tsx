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

export default function WorkCard({ project, index = 0 }: { project: Project; index?: number }) {
  const [hovered, setHovered] = useState(false);

  // The card's chosen still leads; the project's other desktop screens
  // cycle behind it while the pointer rests on the card.
  const reelItems = project.card
    ? [
        project.card,
        ...project.gallery.filter((shot) => shot.frame === 'browser' && shot.src !== project.card?.src),
      ]
    : [];

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.7, delay: (index % 2) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group"
    >
      <Link
        href={`/work/${project.slug}`}
        className="block focus-visible:outline-none"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="transition-transform duration-500 ease-out-expo group-hover:-translate-y-1">
          {reelItems.length > 1 ? (
            <HoverReel items={reelItems} active={hovered} />
          ) : project.card ? (
            <ScreenFrame shot={project.card} sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 640px" />
          ) : (
            <ProcessVisual />
          )}
        </div>
        <div className="mt-6 md:mt-7">
          <span className="block text-[10px] md:text-[11px] font-medium tracking-[0.22em] uppercase text-accent/75 mb-2.5">
            {project.category}
          </span>
          <h3 className="text-2xl md:text-3xl font-medium tracking-tight text-foreground/95 group-hover:text-accent transition-colors duration-500">
            {project.title}
          </h3>
          <p className="mt-3 text-[15px] md:text-base text-muted-foreground/85 leading-relaxed max-w-xl">
            {project.summary}
          </p>
          <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-foreground/75 group-hover:text-accent transition-colors duration-500">
            View case study
            <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform duration-500" />
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
