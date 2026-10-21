import { CopyEmail } from '@/components/ui/CopyEmail';
import { enter } from '@/components/pages/enter';
import { Keep } from '@/components/pages/Keep';
import { pageMeta } from '@/lib/meta';
import { PageHead } from '@/components/pages/PageHead';
import { RequestForm, type Topic } from '@/components/pages/RequestForm';
import { OFFERS } from '@/content/offers';
import { SITE } from '@/content/site';
import styles from './page.module.css';

export const metadata = pageMeta({
  title: 'Book a call',
  description:
    'Tell me what is not working at your practice or firm. I reply within one business day to set up a 20-minute call, or to start a website check.',
  path: '/book',
});

const check = OFFERS.find((o) => o.id === 'check');
const CHECK_PRICE = check?.price ?? '$1,500';
const CHECK_NOTE = `I walk your whole path from search to booked, then send a recorded walkthrough and a ranked list with a fixed price beside each fix, within five business days. ${
  check?.terms ?? ''
}`.trim();

const NEXT = [
  <>
    I reply within one business day with times for a <Keep>20-minute</Keep> call.
  </>,
  <>On the call, you tell me what is not working. There is nothing to prepare except your site address.</>,
  <>
    If there is a clear next step, I recommend one: usually the website check, or the matching fix when the problem is
    obvious.
  </>,
];

type Props = { searchParams: Promise<{ topic?: string | string[] }> };

export default async function BookPage({ searchParams }: Props) {
  const { topic } = await searchParams;
  const initialTopic: Topic = (Array.isArray(topic) ? topic[0] : topic) === 'check' ? 'check' : 'call';

  return (
    <div className={`container ${styles.layout}`}>
      <PageHead
        className={styles.head}
        label="Book a call"
        title="Tell me what is not working."
        lede="A few lines about your practice or firm are enough. I read every request myself."
      />

      <section className={styles.formCol} aria-label="Request a call" data-enter style={enter(3)}>
        <div className={styles.card}>
          <RequestForm initialTopic={initialTopic} checkPrice={CHECK_PRICE} checkNote={CHECK_NOTE} email={SITE.email} />
        </div>
      </section>

      <aside className={styles.aside} aria-labelledby="next-title" data-enter style={enter(4)}>
        <h2 id="next-title" className={styles.asideTitle}>
          What happens next
        </h2>
        <ol className={styles.next}>
          {NEXT.map((line, i) => (
            <li key={i} className={styles.nextItem}>
              <span className={styles.nextNum} aria-hidden="true">
                {i + 1}
              </span>
              <p>{line}</p>
            </li>
          ))}
        </ol>

        <div className={styles.mail}>
          <p className="t-label">Prefer email?</p>
          <CopyEmail className={styles.mailAddress} />
        </div>

        <p className={styles.safe}>
          <svg viewBox="0 0 20 20" aria-hidden="true">
            <rect x="4" y="9" width="12" height="8.5" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <path d="M6.75 9V6.75a3.25 3.25 0 0 1 6.5 0V9" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          <span>
            I never ask for passwords or patient information by email. When work needs access, you add me as a user in your
            own accounts.
          </span>
        </p>
      </aside>
    </div>
  );
}
