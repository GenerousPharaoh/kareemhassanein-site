'use client';

// Sanitized process figures for the Tax Relief Counsel case study and the
// discipline map for Endorphins. No client materials are reproduced here.

function FigureShell({ title, caption, children }: { title: string; caption: string; children: React.ReactNode }) {
  return (
    <figure className="rounded-xl md:rounded-2xl border border-white/[0.07] bg-[hsl(222,12%,11.5%)] overflow-hidden">
      <div className="p-6 md:p-10">{children}</div>
      <figcaption className="px-6 md:px-10 pb-6 md:pb-8">
        <span className="block text-base md:text-lg font-medium tracking-tight text-foreground/90 mb-1.5">{title}</span>
        <span className="block text-sm md:text-[15px] text-muted-foreground/85 leading-relaxed max-w-2xl">{caption}</span>
      </figcaption>
    </figure>
  );
}

export function TrcTimeFigure() {
  return (
    <FigureShell
      title="What changed, in time"
      caption="The before-and-after is easier to understand than a percentage: drafting a matter document went from most of an afternoon to half an hour, with the structure doing the remembering."
    >
      <div className="space-y-6">
        <div>
          <div className="flex items-baseline justify-between mb-2">
            <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-muted-foreground/70">Before</span>
            <span className="text-sm text-foreground/85 font-mono">~3 hours per matter</span>
          </div>
          <div className="h-2.5 rounded-full bg-white/[0.05] overflow-hidden">
            <div className="h-full w-full rounded-full bg-muted-foreground/40" />
          </div>
        </div>
        <div>
          <div className="flex items-baseline justify-between mb-2">
            <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-accent/80">After</span>
            <span className="text-sm text-foreground/85 font-mono">~30 minutes per matter</span>
          </div>
          <div className="h-2.5 rounded-full bg-white/[0.05] overflow-hidden">
            <div className="h-full w-[17%] rounded-full bg-accent/80" />
          </div>
        </div>
      </div>
    </FigureShell>
  );
}

const pipeline = [
  { step: 'Structured intake', note: 'The recurring questions asked once, in one place' },
  { step: 'Matter facts', note: 'Verified inputs, separated from boilerplate' },
  { step: 'Template selection', note: 'The document skeleton for this matter type' },
  { step: 'LLM-supported draft', note: 'Sections filled against the template, not free-written' },
  { step: 'Practitioner review', note: 'Facts, citations, tone, and scope checked before anything leaves' },
];

export function TrcPipelineFigure() {
  return (
    <FigureShell
      title="Intake to draft"
      caption="Each stage hands a structured artifact to the next. The practitioner stays in control of judgment calls; the system carries the repetition."
    >
      <ol className="flex flex-col md:flex-row md:items-stretch gap-3 md:gap-0">
        {pipeline.map((item, i) => (
          <li key={item.step} className="flex-1 flex md:flex-col items-start gap-3 md:gap-0">
            <div className="flex md:w-full items-center gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full border border-accent/30 bg-[hsl(222,14%,10%)] flex items-center justify-center text-[11px] font-mono text-accent/85">
                {i + 1}
              </span>
              {i < pipeline.length - 1 && (
                <span aria-hidden="true" className="hidden md:block flex-1 h-px bg-gradient-to-r from-accent/30 to-white/[0.06]" />
              )}
            </div>
            <div className="md:mt-3 md:pr-4">
              <span className="block text-sm font-medium text-foreground/90 leading-snug">{item.step}</span>
              <span className="block mt-1 text-xs text-muted-foreground/75 leading-relaxed">{item.note}</span>
            </div>
          </li>
        ))}
      </ol>
    </FigureShell>
  );
}

const library = [
  { name: 'Matter type', items: ['Shared structure and tone', 'Required sections in order'] },
  { name: 'Sections', items: ['Standard language where it holds', 'Marked slots for matter facts'] },
  { name: 'Checkpoints', items: ['Facts verified against intake', 'Citations and figures checked', 'Final read for tone and scope'] },
];

export function TrcLibraryFigure() {
  return (
    <FigureShell
      title="The template library"
      caption="What looked like bespoke legal writing turned out to have a stable skeleton. Standardizing it is what made the drafting support trustworthy."
    >
      <div className="grid md:grid-cols-3 gap-4">
        {library.map((group) => (
          <div key={group.name} className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-5">
            <span className="block text-[11px] font-medium tracking-[0.18em] uppercase text-accent/75 mb-3">{group.name}</span>
            <ul className="space-y-2">
              {group.items.map((item) => (
                <li key={item} className="flex gap-2.5 text-sm text-muted-foreground/85 leading-relaxed">
                  <span aria-hidden="true" className="mt-[0.55em] w-1 h-1 rounded-full bg-accent/50 flex-shrink-0" />
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
      <div className="flex flex-col items-center gap-5">
        <div className="px-6 py-3 rounded-full border border-accent/40 bg-accent/[0.07] text-sm font-medium text-foreground/95 tracking-tight">
          Physiotherapy
        </div>
        <div aria-hidden="true" className="h-6 w-px bg-gradient-to-b from-accent/40 to-white/[0.08]" />
        <div className="flex flex-wrap justify-center gap-2.5">
          {disciplines.map((d) => (
            <span
              key={d}
              className="px-4 py-2 rounded-full border border-white/[0.08] bg-white/[0.02] text-[13px] text-muted-foreground/90 tracking-tight"
            >
              {d}
            </span>
          ))}
        </div>
        <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-muted-foreground/55 mt-1">
          Referral pathways in both directions
        </span>
      </div>
    </FigureShell>
  );
}
