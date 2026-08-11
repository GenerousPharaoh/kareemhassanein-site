'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import WorkCard from '@/components/WorkCard';
import { advisory, principalProjects } from '@/lib/work';

const ease = [0.16, 1, 0.3, 1] as const;

const featuredSlugs = ['kinetikare', 'endorphins', 'tax-relief-counsel'];
const featured = featuredSlugs
  .map((slug) => principalProjects.find((project) => project.slug === slug))
  .filter((project): project is (typeof principalProjects)[number] => Boolean(project));

const principles = [
  {
    title: 'Start with the work as it is',
    body: 'Observe the real process, including the workarounds, edge cases, and handoffs that formal diagrams usually miss.',
  },
  {
    title: 'Make the structure visible',
    body: 'Turn scattered inputs, decisions, and responsibilities into a system people can understand and operate.',
  },
  {
    title: 'Design for adoption',
    body: 'Fit the solution to the people using it, with clear expectations, practical support, and room to learn from use.',
  },
  {
    title: 'Stay through the finish',
    body: 'Test, refine, and close the gaps between a promising idea and dependable day-to-day delivery.',
  },
];

const proof = [
  { value: '100%', label: 'team adoption within eight weeks for an AI documentation rollout' },
  { value: '~30 min', label: 'to draft a legal matter document, down from about three hours' },
  { value: '60+', label: 'pages in a patient education and booking platform' },
  { value: '6', label: 'clinical specialties coordinated through one digital experience' },
];

export default function Home() {
  return (
    <main className="overflow-hidden bg-background text-foreground">
      <section className="relative px-6 pb-20 pt-32 sm:px-8 md:pb-28 md:pt-40 lg:px-12 xl:px-20">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-14 lg:grid-cols-12 lg:items-end lg:gap-16">
            <div className="lg:col-span-8">
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease }}
                className="mb-7 text-xs font-semibold uppercase tracking-[0.2em] text-accent/82"
              >
                Kareem Hassanein · Implementation &amp; Operations
              </motion.p>
              <h1 className="max-w-[1040px] text-[clamp(2.6rem,8.5vw,8rem)] font-medium leading-[0.87] tracking-[-0.07em]">
                <span className="block overflow-hidden pb-[0.08em]">
                  <motion.span initial={{ y: '105%' }} animate={{ y: 0 }} transition={{ duration: 1, delay: 0.08, ease }} className="block">
                    I find friction,
                  </motion.span>
                </span>
                <span className="block overflow-hidden pb-[0.08em]">
                  <motion.span initial={{ y: '105%' }} animate={{ y: 0 }} transition={{ duration: 1, delay: 0.18, ease }} className="block">
                    solve it, and
                  </motion.span>
                </span>
                <span className="block overflow-hidden pb-[0.09em]">
                  <motion.span initial={{ y: '105%' }} animate={{ y: 0 }} transition={{ duration: 1, delay: 0.28, ease }} className="block font-serif font-normal italic text-accent">
                    make it stick.
                  </motion.span>
                </span>
              </h1>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.42, ease }}
              className="border-l border-white/[0.12] pl-6 lg:col-span-4 lg:mb-4 lg:pl-8"
            >
              <p className="max-w-lg text-lg leading-relaxed text-foreground/76 lg:text-xl">
                I&rsquo;m an implementation and operations consultant with a clinical background. I translate real
                workflows into practical processes and digital tools, guide adoption, and refine the work until it
                holds up in day-to-day use.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row xl:gap-2">
                <Link
                  href="/work"
                  className="group inline-flex min-h-12 items-center justify-center gap-3 whitespace-nowrap rounded-full bg-accent px-5 text-sm font-semibold text-background transition-colors duration-500 hover:bg-accent/90"
                >
                  Explore the work
                  <ArrowDown aria-hidden="true" size={16} className="transition-transform duration-500 group-hover:translate-y-0.5" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex min-h-12 items-center justify-center whitespace-nowrap rounded-full border border-white/[0.14] px-5 text-sm font-semibold text-foreground/78 transition-colors duration-500 hover:border-accent/45 hover:text-foreground"
                >
                  Start a conversation
                </Link>
              </div>
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-12 border-t border-white/[0.1] pt-5 text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground md:mt-16"
          >
            Clinical implementation · Workflow automation · Service design · Digital delivery
          </motion.p>
        </div>
      </section>

      <section aria-label="Selected outcomes" className="border-y border-white/[0.09]">
        <dl className="mx-auto grid max-w-[1440px] sm:grid-cols-2 lg:grid-cols-4">
          {proof.map((item, index) => (
            <div
              key={item.value}
              className={`border-white/[0.09] px-6 py-8 sm:px-8 lg:px-10 ${index > 0 ? 'border-t' : ''} ${
                index === 1 ? 'sm:border-l sm:border-t-0' : ''
              } ${index === 3 ? 'sm:border-l' : ''} ${index > 0 ? 'lg:border-l lg:border-t-0' : ''}`}
            >
              <dd className="text-3xl font-semibold tracking-[-0.045em] text-accent md:text-4xl">{item.value}</dd>
              <dt className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">{item.label}</dt>
            </div>
          ))}
        </dl>
      </section>

      <section className="px-6 py-24 sm:px-8 md:py-32 lg:px-12 xl:px-20">
        <div className="mx-auto max-w-[1320px]">
          <ScrollReveal direction="up" className="mb-16 md:mb-24">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-accent/80">Selected work</p>
            <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
              <h2 className="max-w-4xl text-4xl font-medium tracking-[-0.045em] sm:text-5xl md:text-6xl lg:col-span-8">
                Outcomes, decisions, and the work behind them.
              </h2>
              <p className="max-w-md text-base leading-relaxed text-muted-foreground lg:col-span-4">
                Three examples of implementation across healthcare platforms, clinic operations, and professional
                services.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid gap-24 md:gap-32">
            {featured.map((project, index) => (
              <WorkCard key={project.slug} project={project} index={index} variant="row" flip={index % 2 === 1} />
            ))}
          </div>

          <div className="mt-16 border-t border-white/[0.09] pt-8 text-right md:mt-24">
            <Link href="/work" className="group inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-foreground/74 hover:text-accent">
              See all work
              <ArrowUpRight aria-hidden="true" size={16} className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y border-white/[0.09] px-6 py-24 sm:px-8 md:py-32 lg:px-12 xl:px-20">
        <div className="mx-auto grid max-w-[1320px] gap-14 lg:grid-cols-12 lg:gap-20">
          <ScrollReveal direction="up" className="lg:col-span-5">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-accent/80">Working principles</p>
            <h2 className="max-w-xl text-4xl font-medium tracking-[-0.045em] sm:text-5xl">
              Practical systems start with a clear view of the work.
            </h2>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground">
              The tool can change. The discipline stays consistent: understand the workflow, expose the structure,
              support adoption, and refine what happens in use.
            </p>
            <figure className="relative mt-10 aspect-[4/3] overflow-hidden rounded-[1.5rem] border border-white/[0.1] bg-white/[0.02]">
              <Image
                src="/images/work/kinetikare-conditions.webp"
                alt="The KinetiKare condition library, organized by body region"
                fill
                sizes="(min-width: 1024px) 500px, calc(100vw - 3rem)"
                className="object-cover object-top"
              />
            </figure>
          </ScrollReveal>

          <ol className="border-t border-white/[0.11] lg:col-span-7">
            {principles.map((item, index) => (
              <li key={item.title} className="grid gap-4 border-b border-white/[0.11] py-7 sm:grid-cols-[4rem_1fr] sm:gap-6">
                <span className="font-mono text-xs text-accent/78">0{index + 1}</span>
                <div>
                  <h3 className="text-xl font-medium tracking-tight text-foreground">{item.title}</h3>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">{item.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="px-6 py-24 sm:px-8 md:py-32 lg:px-12 xl:px-20">
        <div className="mx-auto max-w-[1320px]">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
            <ScrollReveal direction="up" className="lg:col-span-5">
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-accent/80">Current advisory work</p>
              <h2 className="max-w-xl text-4xl font-medium tracking-[-0.045em] sm:text-5xl">Clinical context, applied early.</h2>
              <figure className="relative mt-10 aspect-[4/3] overflow-hidden rounded-[1.5rem] border border-white/[0.1] bg-white/[0.02]">
                <Image
                  src="/images/work/endorphins-services.webp"
                  alt="Six clinical services presented as one coordinated clinic at Endorphins"
                  fill
                  sizes="(min-width: 1024px) 500px, calc(100vw - 3rem)"
                  className="object-cover object-top"
                />
              </figure>
            </ScrollReveal>
            <div className="border-t border-white/[0.11] lg:col-span-7">
              {advisory.map((item) => (
                <article key={item.title} className="grid gap-4 border-b border-white/[0.11] py-7 sm:grid-cols-[11rem_1fr] sm:gap-8">
                  <h3 className="text-lg font-medium tracking-tight text-foreground">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">{item.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
