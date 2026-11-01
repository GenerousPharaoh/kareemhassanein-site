import { headers } from 'next/headers';
import { Suspense } from 'react';
import { CloseBand } from '@/components/pages/CloseBand';
import { enter } from '@/components/pages/enter';
import { Keep } from '@/components/pages/Keep';
import { PageHead } from '@/components/pages/PageHead';
import { LookForm } from '@/components/look/LookForm';
import { Looking, ReportError, ReportView } from '@/components/look/Report';
import { allowLook, clientIp } from '@/lib/look/limit';
import { look, LookError, normalizeAddress, type Report } from '@/lib/look/report';
import { pageMeta } from '@/lib/meta';
import styles from './page.module.css';

export const metadata = pageMeta({
  title: 'A first look at your site',
  description:
    'Paste your site address. In a few seconds you see what Google sees, how the page opens on a phone, where booking or intake goes, what is being counted, and the words a college or law society may question.',
  path: '/look',
});

export const maxDuration = 20;

// What the look reads, in the order the check walks the path
const LOOKS_FOR = [
  { title: 'What Google sees', text: 'The title and description, the canonical address, whether crawlers are let in, the structured data, and a link to your Google profile.' },
  { title: 'On a phone', text: 'The phone layout, the weight of the first page, images with no set size, the main heading, and how fast the server answers.' },
  { title: 'Booking or intake', text: 'Where Book goes and whether it goes anywhere, whether the phone number is tappable, and the privacy policy beside your forms.' },
  { title: 'What is counted', text: 'Analytics and Tag Manager, a tag that stopped collecting in 2023, a tag manager loading twice, and conversions that fire on a click.' },
  { title: 'Wording', text: 'The words colleges and law societies tend to question.' },
];

const hostOf = (url: string) => {
  try {
    return normalizeAddress(url).hostname.replace(/^www\./, '');
  } catch {
    return url.slice(0, 80);
  }
};

async function read(url: string): Promise<{ report: Report } | { message: string }> {
  try {
    return { report: await look(url) };
  } catch (error) {
    return { message: error instanceof LookError ? error.message : 'The page could not be read.' };
  }
}

async function Result({ url }: { url: string }) {
  const ip = clientIp(await headers());
  if (!allowLook(ip)) return <ReportError host={hostOf(url)} message="Too many looks from here for now. Try again in a few minutes, or book a call and I will look with you." />;
  const outcome = await read(url);
  return 'report' in outcome ? <ReportView report={outcome.report} /> : <ReportError host={hostOf(url)} message={outcome.message} />;
}

type Props = { searchParams: Promise<{ url?: string | string[] }> };

export default async function LookPage({ searchParams }: Props) {
  const params = await searchParams;
  const url = (typeof params.url === 'string' ? params.url : '').trim().slice(0, 500);

  return (
    <>
      <div className={`container ${styles.top}`}>
        <PageHead
          label="First look"
          title={
            <>
              <span className={styles.quiet}>Paste your address.</span>
              <br />I read the page the way the check begins.
            </>
          }
          lede="What Google sees, how it opens on a phone, where booking goes, what is being counted and the words a college or law society may question, in a few seconds, from the page itself."
          measure="wide"
        >
          <LookForm initial={url} track="look" large autoFocus={!url} onPage />
        </PageHead>
      </div>

      {url ? (
        <Suspense key={url} fallback={<Looking host={hostOf(url)} />}>
          <Result url={url} />
        </Suspense>
      ) : (
        <section className={`container ${styles.looksFor}`} aria-labelledby="looks-for" data-enter style={enter(4)}>
          <h2 id="looks-for" className={styles.looksForTitle}>
            What it reads
          </h2>
          <ul className={styles.list}>
            {LOOKS_FOR.map((item) => (
              <li key={item.title} className={styles.item}>
                <h3 className={styles.itemTitle}>{item.title}</h3>
                <p className={styles.itemText}>{item.text}</p>
              </li>
            ))}
          </ul>
          <p className={styles.further}>
            The website check goes where a script cannot: your Google profile itself, the booking path on a real phone, what the ad account counts, and a
            recorded walkthrough with a fixed price beside each fix.
          </p>
        </section>
      )}

      <CloseBand
        title={
          <>
            Rather talk it through? <Keep>20 minutes</Keep> is enough.
          </>
        }
        line="Bring your site address. I will read it with you on the call."
        track="look-close"
      />
    </>
  );
}
