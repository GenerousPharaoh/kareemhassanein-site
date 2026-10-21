import { notFound } from 'next/navigation';
import { CASES, caseBySlug } from '@/content/cases';

export function generateStaticParams() {
  return CASES.map((c) => ({ slug: c.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = caseBySlug(slug);
  return c ? { title: c.name, description: c.summary } : {};
}

export default async function CasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = caseBySlug(slug);
  if (!c) notFound();
  return (
    <div className="container section">
      <h1 className="t-h1">{c.name}</h1>
      <p className="t-lede" style={{ marginTop: 16 }}>
        {c.summary}
      </p>
    </div>
  );
}
