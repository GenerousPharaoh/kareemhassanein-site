'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowUpRight, Check } from 'lucide-react';
import ScreenFrame, { FrameChrome, type FrameTone } from '@/components/ScreenFrame';
import ScrollReveal from '@/components/ScrollReveal';
import { HoverReel } from '@/components/Showreel';
import type { Project } from '@/lib/work';

function ConfidentialVisual({ project, tone = 'dark' }: { project: Project; tone?: FrameTone }) {
  if (project.slug === 'clinical-documentation') {
    // This branch used to hardcode a dark panel and ignore the tone prop it
    // was handed, so on the cream work band it rendered as a black slab beside
    // the light Tax Relief Counsel visual. Same failure mode that retired
    // EndorphinsPathwaysFigure: anything that can land inside .paper has to
    // take a tone rather than assume the dark surface.
    const isLight = tone === 'light';
    const shell = isLight
      ? 'border-black/[0.1] bg-white shadow-[0_26px_60px_-30px_rgba(35,28,14,0.45)]'
      : 'border-white/[0.1] bg-[#171a1f] shadow-[0_28px_70px_-32px_rgba(0,0,0,0.9)]';
    const rule = isLight ? 'border-black/[0.1]' : 'border-white/[0.09]';
    const label = isLight ? 'text-[#705829]' : 'text-accent/80';
    const value = isLight ? 'text-[#1c1812]' : 'text-foreground';
    const body = isLight ? 'text-[#57503f]' : 'text-muted-foreground';
    const faint = isLight ? 'text-[#6b6353]' : 'text-foreground/58';
    const track = isLight ? 'bg-black/[0.12]' : 'bg-white/[0.16]';
    const fill = isLight ? 'bg-[#705829]/80' : 'bg-accent/75';
    const cap = isLight ? 'border-[#705829] bg-white' : 'border-accent bg-[#171a1f]';

    return (
      <div className={`overflow-hidden rounded-xl border md:rounded-2xl ${shell}`}>
        <FrameChrome url="implementation record · private clinic" tone={tone} />
        <div className="flex aspect-[16/10] flex-col justify-between p-6 sm:p-8 md:p-10">
          <div className={`flex items-start justify-between gap-8 border-b pb-6 ${rule}`}>
            <div>
              <p className={`text-xs font-semibold uppercase tracking-[0.18em] ${label}`}>Rollout outcome</p>
              <p className={`mt-3 text-5xl font-medium tracking-[-0.06em] sm:text-6xl ${value}`}>8 weeks</p>
              <p className={`mt-2 text-sm ${body}`}>to full-team use</p>
            </div>
            <p className={`max-w-36 text-right font-mono text-xs leading-relaxed ${faint}`}>
              Evaluation<br />Configuration<br />Support<br />Refinement
            </p>
          </div>
          <div>
            <div className={`mb-3 flex justify-between font-mono text-[11px] ${faint}`}>
              <span>Start</span>
              <span>Week 2</span>
              <span>Week 4</span>
              <span>Week 6</span>
              <span>Week 8</span>
            </div>
            <div className={`relative h-px ${track}`}>
              <div className={`absolute inset-y-[-2px] left-0 w-full ${fill}`} />
              <div className={`absolute right-0 top-[-5px] h-3 w-3 border ${cap}`} />
            </div>
            <p className={`mt-5 max-w-md text-sm leading-relaxed ${body}`}>
              Configuration, training, support, and refinement stayed connected to how practitioners documented care.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Layered template-and-draft composition: the mechanism made visible
  // (reusable slots become filled fields) without a word of client content.
  const light = tone === 'light';
  const desk = light ? 'bg-[#E4DDCB]' : 'bg-[#14171c]';
  const sheet = light ? 'border-black/[0.09] bg-white' : 'border-white/[0.09] bg-[#1d2127]';
  const bar = light ? 'bg-[#ddd5c2]' : 'bg-white/[0.1]';
  const barSoft = light ? 'bg-[#e9e2d1]' : 'bg-white/[0.06]';
  const tag = light ? 'text-[#705829]' : 'text-accent/80';
  const slotOpen = light ? 'border-[#8a6d33]/50 text-[#705829]' : 'border-accent/45 text-accent/80';
  const slotFilled = light
    ? 'border-[#705829]/45 bg-[#705829]/[0.14] text-[#5d481f]'
    : 'border-accent/40 bg-accent/[0.14] text-accent';
  const inkFaint = light ? 'text-[#6b6353]' : 'text-white/45';

  const Slot = ({ label, filled = false, w }: { label: string; filled?: boolean; w: string }) => (
    <span
      className={`flex h-4 ${w} shrink-0 items-center justify-center rounded-[4px] border font-mono text-[7px] font-medium uppercase tracking-[0.14em] ${
        filled ? slotFilled : `border-dashed ${slotOpen}`
      }`}
    >
      {label}
    </span>
  );

  const Bar = ({ w, soft = false }: { w: string; soft?: boolean }) => (
    <span className={`h-1.5 ${w} rounded-full ${soft ? barSoft : bar}`} />
  );

  return (
    <div
      className={`overflow-hidden rounded-xl md:rounded-2xl ${
        light
          ? 'border border-black/[0.1] bg-white shadow-[0_26px_60px_-30px_rgba(35,28,14,0.45)]'
          : 'border border-white/[0.1] bg-[#171a1f] shadow-[0_28px_70px_-32px_rgba(0,0,0,0.9)]'
      }`}
    >
      <FrameChrome url="drafting workflow · confidential" tone={tone} />
      <div className={`relative aspect-[16/10] overflow-hidden ${desk}`}>
        {/* Template sheet */}
        <div className={`absolute left-[6%] top-[9%] w-[52%] rounded-lg border p-4 sm:p-5 ${sheet} ${light ? 'shadow-[0_18px_40px_-22px_rgba(35,28,14,0.5)]' : 'shadow-[0_18px_40px_-20px_rgba(0,0,0,0.8)]'}`}>
          <p className={`mb-3 font-mono text-[8px] font-semibold uppercase tracking-[0.22em] ${tag}`}>Template</p>
          <div className={`mb-3 h-2 w-2/5 rounded-full ${bar}`} />
          <div className="space-y-2">
            <div className="flex items-center gap-2"><Bar w="w-full" soft /></div>
            <div className="flex items-center gap-2"><Bar w="w-1/4" soft /><Slot label="client" w="w-16" /><Bar w="w-1/3" soft /></div>
            <div className="flex items-center gap-2"><Bar w="w-full" soft /></div>
            <div className="flex items-center gap-2"><Slot label="tax years" w="w-20" /><Bar w="w-1/2" soft /></div>
            <div className="flex items-center gap-2"><Bar w="w-2/3" soft /><Slot label="amount" w="w-16" /></div>
            <div className="flex items-center gap-2"><Bar w="w-3/4" soft /></div>
          </div>
        </div>

        {/* Draft sheet, assembled from the template */}
        <div className={`absolute bottom-[8%] right-[6%] w-[56%] rounded-lg border p-4 sm:p-5 ${sheet} ${light ? 'shadow-[0_26px_55px_-24px_rgba(35,28,14,0.62)]' : 'shadow-[0_26px_55px_-22px_rgba(0,0,0,0.92)]'}`}>
          <p className={`mb-3 font-mono text-[8px] font-semibold uppercase tracking-[0.22em] ${tag}`}>Draft</p>
          <div className={`mb-3 h-2 w-1/2 rounded-full ${bar}`} />
          <div className="space-y-2">
            <div className="flex items-center gap-2"><Bar w="w-full" /></div>
            <div className="flex items-center gap-2"><Bar w="w-1/4" /><Slot label="client" filled w="w-16" /><Bar w="w-1/3" /></div>
            <div className="flex items-center gap-2"><Slot label="tax years" filled w="w-20" /><Bar w="w-1/2" /></div>
            <div className="flex items-center gap-2"><Bar w="w-2/3" /><Slot label="amount" filled w="w-16" /></div>
            <div className="flex items-center gap-2"><Bar w="w-full" /></div>
          </div>
          <div className={`mt-4 flex items-center gap-2 border-t pt-3 ${light ? 'border-black/[0.08]' : 'border-white/[0.08]'}`}>
            <span className={`flex h-4 w-4 items-center justify-center rounded-full border ${light ? 'border-[#705829]/60' : 'border-accent/60'}`}>
              <Check aria-hidden="true" size={9} className={light ? 'text-[#705829]' : 'text-accent'} />
            </span>
            <span className={`font-mono text-[8px] font-semibold uppercase tracking-[0.22em] ${inkFaint}`}>
              Practitioner reviewed
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

interface WorkCardProps {
  project: Project;
  summary?: string;
  index?: number;
  variant?: 'stack' | 'row';
  flip?: boolean;
  className?: string;
  headingLevel?: 2 | 3;
  tone?: FrameTone;
}

export default function WorkCard({
  project,
  summary,
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
    <HoverReel items={reelItems} paused={hovered} sizes={cardSizes} tone={tone} />
  ) : project.card ? (
    <ScreenFrame shot={project.card} sizes={cardSizes} tone={tone} />
  ) : (
    <ConfidentialVisual project={project} tone={tone} />
  );
  const light = tone === 'light';

  return (
    // The card is the evidence, so it resolves on the shared `figure` beat
    // rather than carrying its own timing. ScrollReveal also owns the mobile
    // branch: blur and scale are too expensive during iOS URL-bar resize, and
    // MotionConfig's reduced-motion strips transforms but not filters.
    <ScrollReveal variant="figure" delay={(index % 2) * 0.08} className={className}>
      <article className="group">
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
            <p className={`mb-4 text-xs font-semibold uppercase tracking-[0.18em] ${light ? 'text-[#705829]' : 'text-accent/80'}`}>
              {project.category}
            </p>
            <Heading
              className={`${variant === 'row' ? 'text-3xl sm:text-4xl lg:text-[2.8rem]' : 'text-2xl sm:text-3xl'} font-medium leading-[1.02] tracking-[-0.045em] transition-colors duration-500 ${light ? 'text-[#1c1812] group-hover:text-[#705829]' : 'text-foreground group-hover:text-accent'}`}
            >
              {project.title}
            </Heading>
            <p className={`mt-5 max-w-xl text-[15px] leading-relaxed sm:text-base ${light ? 'text-[#57503f]' : 'text-muted-foreground'}`}>
              {summary ?? project.summary}
            </p>

            {project.cardOutcome && (
              <p className={`mt-6 border-t pt-4 text-sm font-medium leading-relaxed ${light ? 'border-black/[0.12] text-[#3d372c]' : 'border-white/[0.11] text-foreground/84'}`}>
                {project.cardOutcome}
              </p>
            )}

            <span className={`mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold transition-colors duration-500 ${light ? 'text-[#1c1812]/74 group-hover:text-[#705829]' : 'text-foreground/74 group-hover:text-accent'}`}>
              View project
              <ArrowUpRight aria-hidden="true" size={16} className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </div>
        </div>
      </Link>
      </article>
    </ScrollReveal>
  );
}
