import { enter } from '@/components/pages/enter';
import { PageHead } from '@/components/pages/PageHead';
import { RequestForm, type Topic } from '@/components/pages/RequestForm';
import { OFFERS } from '@/content/offers';
import { SITE } from '@/content/site';
import styles from './page.module.css';

// The booking page, shared by /book (the call chosen) and /book/check (the website check chosen).
// Each is static, so the right choice is already in the HTML and nothing changes once it loads.

export const BOOK_META = {
  title: 'Book a call',
  description:
    'Tell me what you want to build or improve for your business or personal project. I reply within one business day to set up a 20-minute call, or to start a website check.',
  path: '/book',
};

const check = OFFERS.find((o) => o.id === 'check');
const CHECK_PRICE = check?.price ?? '$1,500';
const CHECK_NOTE = `I walk your whole path from search to booked, then send a recorded walkthrough and a ranked list with a fixed price beside each fix, within five business days. ${
  check?.terms ?? ''
}`.trim();

export function BookView({ initialTopic }: { initialTopic: Topic }) {
  return (
    <div className={`container ${styles.layout}`}>
      <PageHead
        className={styles.head}
        label="Book a call"
        title="Tell me what you have in mind."
        lede="A few lines about what you want to build or improve are enough. I read every request myself."
      />

      <section className={styles.formCol} aria-label="Send a request" data-enter style={enter(1)}>
        <div className={`paper ${styles.card}`} data-form-card="" data-theme="light">
          <RequestForm initialTopic={initialTopic} checkPrice={CHECK_PRICE} checkNote={CHECK_NOTE} email={SITE.email} />
        </div>
      </section>

      <aside className={styles.aside} aria-labelledby="next-title" data-enter style={enter(2)}>
        <div className={styles.next}>
          <h2 id="next-title" className={styles.asideTitle}>
            What happens next
          </h2>
          <p>I reply within one business day to arrange a call or confirm the website check. Any paid work is agreed before it starts.</p>
        </div>

      </aside>
    </div>
  );
}
