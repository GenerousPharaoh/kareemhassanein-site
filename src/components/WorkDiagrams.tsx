'use client';

// Reconstructed process figures for confidential work and a discipline map for
// Endorphins. No client documents, patient information, or private records are
// reproduced here.

interface FigureShellProps {
  title: string;
  caption: string;
  children: React.ReactNode;
  className?: string;
}

function FigureShell({ title, caption, children, className = '' }: FigureShellProps) {
  return (
    <figure
      className={`figure-shadow relative overflow-hidden rounded-[10px] border border-white/[0.09] bg-[hsl(var(--surface))] ${className}`}
    >
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-accent/35" />
      <div className="p-6 sm:p-8 md:p-10">{children}</div>
      <figcaption className="border-t border-white/[0.07] px-6 py-5 sm:px-8 md:px-10 md:py-6">
        <span className="block text-base md:text-lg font-medium tracking-tight text-foreground/95 mb-1.5">
          {title}
        </span>
        <span className="block max-w-2xl text-sm md:text-[15px] text-muted-foreground/85 leading-relaxed">
          {caption}
        </span>
      </figcaption>
    </figure>
  );
}

const clinicalPhases = [
  { index: '01', label: 'Evaluate' },
  { index: '02', label: 'Configure' },
  { index: '03', label: 'Train' },
  { index: '04', label: 'Support' },
  { index: '05', label: 'Refine' },
];

export function ClinicalAdoptionFigure() {
  return (
    <FigureShell
      title="Adoption was the implementation target"
      caption="The reconstructed view shows the rollout logic without identifying the clinic or any practitioner. Full team adoption was reached within eight weeks."
      className="h-full"
    >
      <div className="flex flex-col gap-9 md:gap-11">
        <div className="grid grid-cols-[1fr_auto] items-end gap-6 border-b border-white/[0.08] pb-7">
          <div>
            <span className="block text-[11px] font-medium tracking-[0.2em] uppercase text-muted-foreground/70 mb-3">
              Team adoption
            </span>
            <span className="block text-5xl sm:text-6xl font-medium tracking-[-0.055em] text-foreground">
              100%
            </span>
          </div>
          <div className="text-right pb-1">
            <span className="block text-[11px] font-medium tracking-[0.18em] uppercase text-muted-foreground/80 mb-1">
              Reached by
            </span>
            <span className="block text-xl sm:text-2xl font-medium tracking-tight text-accent">Week 8</span>
          </div>
        </div>

        <ol className="grid grid-cols-1 gap-0 sm:grid-cols-5">
          {clinicalPhases.map((phase, index) => (
            <li
              key={phase.label}
              className="relative border-t border-white/[0.1] py-4 sm:border-l sm:border-t-0 sm:px-3 sm:py-0 first:sm:border-l-0 first:sm:pl-0 last:sm:pr-0"
            >
            <span className="block font-mono text-xs tracking-[0.18em] text-accent/75 mb-1.5">
                {phase.index}
              </span>
              <span className="block text-sm font-medium text-foreground/90">{phase.label}</span>
              {index < clinicalPhases.length - 1 && (
                <span aria-hidden="true" className="absolute right-0 top-1/2 hidden h-px w-3 bg-accent/25 sm:block" />
              )}
            </li>
          ))}
        </ol>

        <div className="border-l-2 border-accent/45 pl-4">
          <span className="block text-[11px] font-medium tracking-[0.18em] uppercase text-muted-foreground/80 mb-1.5">
            Sustained result
          </span>
          <span className="block text-base text-foreground/90">
            Approximately three hours saved each week per practitioner
          </span>
        </div>
      </div>
    </FigureShell>
  );
}

const clinicalWorkflow = [
  {
    title: 'Observe the existing routine',
    note: 'Evaluate how documentation fits into the clinical day before changing the workflow.',
  },
  {
    title: 'Configure around real use',
    note: 'Set the platform up around the team, its documentation needs, and shared expectations.',
  },
  {
    title: 'Train and support go-live',
    note: 'Give practitioners a clear operating method and direct support while it becomes familiar.',
  },
  {
    title: 'Refine from practice',
    note: 'Use live feedback to remove remaining friction and strengthen the documented process.',
  },
];

export function ClinicalWorkflowFigure() {
  return (
    <FigureShell
      title="Implementation continued after training"
      caption="The rollout was managed as an operating change. Configuration, support, and refinement stayed connected to the way practitioners actually documented care."
    >
      <ol className="grid gap-0 md:grid-cols-4">
        {clinicalWorkflow.map((item, index) => (
          <li
            key={item.title}
            className="relative border-t border-white/[0.08] py-6 md:border-l md:border-t-0 md:px-6 md:py-0 first:md:border-l-0 first:md:pl-0 last:md:pr-0"
          >
            <span className="mb-5 flex h-8 w-8 items-center justify-center rounded-[4px] border border-accent/30 bg-accent/[0.06] font-mono text-[11px] text-accent">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="block text-base font-medium leading-snug text-foreground/95">{item.title}</span>
            <span className="mt-2 block text-sm leading-relaxed text-muted-foreground/80">{item.note}</span>
          </li>
        ))}
      </ol>
    </FigureShell>
  );
}

export function TrcWorkflowHeroFigure() {
  const inputs = ['Structured intake', 'Verified matter facts', 'Template selection'];
  const checks = ['Facts', 'Citations', 'Tone', 'Scope'];

  return (
    <FigureShell
      title="Structure carries the repetition"
      caption="This reconstructed system view contains no matter documents. Verified inputs enter a reusable drafting structure, and practitioner review remains the final control."
      className="h-full"
    >
      <div className="grid gap-6 md:grid-cols-[0.9fr_auto_1.1fr] md:items-stretch">
        <div className="rounded-[6px] border border-white/[0.08] bg-white/[0.02] p-5">
          <span className="block text-[11px] font-medium tracking-[0.19em] uppercase text-muted-foreground/80 mb-5">
            Matter inputs
          </span>
          <ol className="space-y-3">
            {inputs.map((input, index) => (
              <li key={input} className="flex items-center gap-3 border-b border-white/[0.07] pb-3 last:border-b-0 last:pb-0">
                <span className="font-mono text-xs text-accent/75">0{index + 1}</span>
                <span className="text-sm text-foreground/88">{input}</span>
              </li>
            ))}
          </ol>
        </div>

        <div aria-hidden="true" className="flex items-center justify-center">
          <span className="h-6 w-px bg-accent/35 md:h-px md:w-8" />
        </div>

        <div className="relative overflow-hidden rounded-[6px] border border-accent/25 bg-accent/[0.045] p-5">
          <div className="absolute inset-y-0 left-0 w-[3px] bg-accent/55" />
          <span className="block text-[11px] font-medium tracking-[0.19em] uppercase text-accent/75 mb-4">
            Controlled draft
          </span>
          <div className="space-y-2.5" aria-hidden="true">
            <span className="block h-2 w-3/4 rounded-[2px] bg-foreground/25" />
            <span className="block h-2 w-full rounded-[2px] bg-foreground/[0.12]" />
            <span className="block h-2 w-5/6 rounded-[2px] bg-foreground/[0.12]" />
            <span className="block h-2 w-2/3 rounded-[2px] bg-foreground/[0.12]" />
          </div>
          <div className="mt-6 border-t border-white/[0.08] pt-4">
            <span className="block text-[10px] font-medium tracking-[0.16em] uppercase text-muted-foreground/80 mb-2">
              Practitioner review
            </span>
            <div className="flex flex-wrap gap-x-4 gap-y-1.5">
              {checks.map((check) => (
                <span key={check} className="text-xs text-foreground/82">
                  {check}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </FigureShell>
  );
}

export function TrcTimeFigure() {
  return (
    <FigureShell
      title="What changed, in time"
      caption="The before and after is easier to understand than a percentage: drafting a matter document went from approximately three hours to about 30 minutes."
    >
      <div className="space-y-7">
        <div>
          <div className="flex items-baseline justify-between gap-6 mb-2.5">
            <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-muted-foreground/70">Before</span>
            <span className="text-sm text-foreground/85 font-mono">~3 hours per matter</span>
          </div>
          <div className="h-2.5 overflow-hidden rounded-[2px] bg-white/[0.05]">
            <div className="h-full w-full bg-muted-foreground/40" />
          </div>
        </div>
        <div>
          <div className="flex items-baseline justify-between gap-6 mb-2.5">
            <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-accent/80">After</span>
            <span className="text-sm text-foreground/85 font-mono">~30 minutes per matter</span>
          </div>
          <div className="h-2.5 overflow-hidden rounded-[2px] bg-white/[0.05]">
            <div className="h-full w-[17%] bg-accent/80" />
          </div>
        </div>
      </div>
    </FigureShell>
  );
}

const pipeline = [
  { step: 'Structured intake', note: 'The recurring questions asked once, in one place' },
  { step: 'Matter facts', note: 'Verified inputs separated from boilerplate' },
  { step: 'Template selection', note: 'The document skeleton for this matter type' },
  { step: 'LLM-supported draft', note: 'Sections filled against the template, not free-written' },
  { step: 'Practitioner review', note: 'Facts, citations, tone, and scope checked before anything leaves' },
];

export function TrcPipelineFigure() {
  return (
    <FigureShell
      title="Intake to draft"
      caption="Each stage hands a structured artifact to the next. The practitioner stays in control of judgment calls while the system carries the repetition."
    >
      <ol className="grid gap-0 md:grid-cols-5">
        {pipeline.map((item, index) => (
          <li
            key={item.step}
            className="relative border-t border-white/[0.08] py-5 md:border-l md:border-t-0 md:px-4 md:py-0 first:md:border-l-0 first:md:pl-0 last:md:pr-0"
          >
            <span className="mb-4 flex h-7 w-7 items-center justify-center rounded-[4px] border border-accent/30 bg-accent/[0.05] text-[11px] font-mono text-accent/85">
              {index + 1}
            </span>
            <span className="block text-sm font-medium text-foreground/90 leading-snug">{item.step}</span>
            <span className="block mt-1.5 text-xs text-muted-foreground/80 leading-relaxed">{item.note}</span>
          </li>
        ))}
      </ol>
    </FigureShell>
  );
}

const library = [
  { name: 'Matter type', items: ['Shared structure and tone', 'Required sections in order'] },
  { name: 'Sections', items: ['Standard language where it holds', 'Marked slots for matter facts'] },
  {
    name: 'Checkpoints',
    items: ['Facts verified against intake', 'Citations and figures checked', 'Final read for tone and scope'],
  },
];

export function TrcLibraryFigure() {
  return (
    <FigureShell
      title="The template library"
      caption="What looked bespoke had a stable skeleton. Standardizing that structure is what made the drafting support repeatable and reviewable."
    >
      <div className="grid gap-4 md:grid-cols-3">
        {library.map((group, index) => (
          <div key={group.name} className="border-t border-white/[0.1] pt-5 md:border-l md:border-t-0 md:px-5 md:pt-0 first:md:border-l-0 first:md:pl-0 last:md:pr-0">
            <span className="block text-xs font-mono tracking-[0.18em] text-accent/75 mb-2">
              0{index + 1}
            </span>
            <span className="block text-[11px] font-medium tracking-[0.18em] uppercase text-accent/80 mb-3">
              {group.name}
            </span>
            <ul className="space-y-2.5">
              {group.items.map((item) => (
                <li key={item} className="border-l border-white/[0.12] pl-3 text-sm text-muted-foreground/85 leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </FigureShell>
  );
}

const disciplines = ['Chiropractic', 'Massage Therapy', 'Athletic Therapy', 'Chiropody', 'Acupuncture'];

export function EndorphinsPathwaysFigure() {
  return (
    <FigureShell
      title="One clinic, six disciplines"
      caption="Physiotherapy was introduced as a peer to five established services, with referral pathways in both directions so a patient can move between disciplines without leaving the clinic."
    >
      <div className="grid gap-5 md:grid-cols-[0.72fr_auto_1.28fr] md:items-center">
        <div className="rounded-[6px] border border-accent/35 bg-accent/[0.06] px-6 py-5">
          <span className="block text-[10px] font-medium tracking-[0.18em] uppercase text-accent/70 mb-1.5">New service line</span>
          <span className="block text-lg font-medium text-foreground/95">Physiotherapy</span>
        </div>
        <span aria-hidden="true" className="mx-auto h-7 w-px bg-accent/35 md:h-px md:w-10" />
        <div className="grid gap-px overflow-hidden rounded-[6px] border border-white/[0.08] bg-white/[0.08] sm:grid-cols-2">
          {disciplines.map((discipline) => (
            <span key={discipline} className="bg-[hsl(220,14%,10.5%)] px-4 py-3 text-sm text-muted-foreground/90">
              {discipline}
            </span>
          ))}
          <span className="bg-[hsl(220,14%,10.5%)] px-4 py-3 text-[11px] font-medium tracking-[0.14em] uppercase text-accent/75">
            Referrals both ways
          </span>
        </div>
      </div>
    </FigureShell>
  );
}
