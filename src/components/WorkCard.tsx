'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import ScreenFrame, { FrameChrome } from '@/components/ScreenFrame';
import type { Project } from '@/lib/work';

function ConfidentialVisual({ project }: { project: Project }) {
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

  return (
    <div className="overflow-hidden rounded-xl border border-white/[0.1] bg-[#171a1f] shadow-[0_28px_70px_-32px_rgba(0,0,0,0.9)] md:rounded-2xl">
      <FrameChrome url="drafting workflow · confidential" />
      <div className="grid aspect-[16/10] grid-cols-2 divide-x divide-white/[0.09]">
        <div className="flex flex-col justify-between p-6 sm:p-8 md:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Before</p>
          <div>
            <p className="text-4xl font-medium tracking-[-0.05em] text-foreground sm:text-5xl">~3 hrs</p>
            <p className="mt-3 max-w-44 text-sm leading-relaxed text-muted-foreground">Drafted largely from scratch for each matter.</p>
          </div>
        </div>
        <div className="flex flex-col justify-between bg-accent/[0.06] p-6 sm:p-8 md:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent/80">Structured workflow</p>
          <div>
            <p className="text-4xl font-medium tracking-[-0.05em] text-accent sm:text-5xl">~30 min</p>
            <p className="mt-3 max-w-44 text-sm leading-relaxed text-foreground/66">Reusable templates with quality checkpoints.</p>
          </div>
        </div>
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
}

export default function WorkCard({
  project,
  index = 0,
  variant = 'stack',
  flip = false,
  className = '',
  headingLevel = 3,
}: WorkCardProps) {
  const Heading = headingLevel === 2 ? 'h2' : 'h3';
  const visual = project.card ? (
    <ScreenFrame
      shot={project.card}
      sizes={variant === 'row' ? '(max-width: 1024px) 100vw, 680px' : '(max-width: 768px) 100vw, 640px'}
    />
  ) : (
    <ConfidentialVisual project={project} />
  );

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
        className="block rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-accent"
      >
        <div className={variant === 'row' ? 'grid items-center gap-8 lg:grid-cols-12 lg:gap-16' : ''}>
          <div className={`${variant === 'row' ? `lg:col-span-7 ${flip ? 'lg:order-2' : ''}` : ''} transition-transform duration-700 ease-out-expo group-hover:-translate-y-1`}>
            {visual}
          </div>

          <div className={`${variant === 'row' ? `lg:col-span-5 lg:py-5 ${flip ? 'lg:order-1' : ''}` : 'mt-7'}`}>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-accent/80">
              {project.contextLabel ?? project.category}
            </p>
            <Heading
              className={`${variant === 'row' ? 'text-3xl sm:text-4xl lg:text-[2.8rem]' : 'text-2xl sm:text-3xl'} font-medium leading-[1.02] tracking-[-0.045em] text-foreground transition-colors duration-500 group-hover:text-accent`}
            >
              {project.title}
            </Heading>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted-foreground sm:text-base">{project.summary}</p>

            {project.proof && (
              <dl className="mt-7 grid grid-cols-3 border-y border-white/[0.09] py-4">
                {project.proof.map((item) => (
                  <div key={`${item.value}-${item.label}`} className="border-l border-white/[0.09] px-3 first:border-l-0 first:pl-0">
                    <dt className="text-[10px] font-medium leading-tight text-muted-foreground sm:text-xs">{item.label}</dt>
                    <dd className="mb-1 text-base font-semibold tracking-tight text-foreground sm:text-lg">{item.value}</dd>
                  </div>
                ))}
              </dl>
            )}

            <span className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-foreground/74 transition-colors duration-500 group-hover:text-accent">
              View project
              <ArrowUpRight aria-hidden="true" size={16} className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
