import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Page not found | Kareem Hassanein',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="flex min-h-[82svh] items-center bg-background px-6 pb-24 pt-32 text-foreground sm:px-8 md:pt-40 lg:px-12 xl:px-20">
      <div className="mx-auto grid w-full max-w-[1320px] gap-14 lg:grid-cols-12 lg:items-end lg:gap-20">
        <div className="enter-fade lg:col-span-8">
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-accent/80">Error 404</p>
          <h1 className="max-w-4xl text-[clamp(3.2rem,8vw,7.8rem)] font-medium leading-[0.9] tracking-[-0.065em]">
            This path doesn&rsquo;t lead anywhere.
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
            The page may have moved, or the address may be incomplete. The main portfolio and project index are still
            available below.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="/" className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-accent px-7 text-sm font-semibold text-background">
              <ArrowLeft aria-hidden="true" size={16} className="transition-transform duration-500 group-hover:-translate-x-0.5" />
              Return home
            </Link>
            <Link href="/work" className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-white/[0.14] px-7 text-sm font-semibold text-foreground/78 hover:border-accent/45 hover:text-foreground">
              Browse the work
              <ArrowUpRight aria-hidden="true" size={16} className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>

        <aside aria-label="Route status" className="enter-fade border-y border-white/[0.1] py-6 font-mono text-xs text-muted-foreground lg:col-span-4">
          <div className="flex justify-between border-b border-white/[0.08] pb-4">
            <span>Request</span>
            <span className="text-foreground/80">Unknown route</span>
          </div>
          <div className="flex justify-between pt-4">
            <span>Next step</span>
            <span className="text-accent">Choose a valid path</span>
          </div>
        </aside>
      </div>
    </main>
  );
}
