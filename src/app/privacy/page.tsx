import { CloseBand } from '@/components/pages/CloseBand';
import { enter } from '@/components/pages/enter';
import { pageMeta } from '@/lib/meta';
import { PageHead } from '@/components/pages/PageHead';
import { SITE } from '@/content/site';
import styles from './page.module.css';

export const metadata = pageMeta({
  title: 'Privacy',
  description:
    'How I handle information you send through the request form, the services that process it, and hosting logs. This site has no advertising trackers.',
  path: '/privacy',
});

const SUMMARY = [
  { term: 'Form information', value: 'What you choose to send' },
  { term: 'Used for', value: 'Replying to you' },
  { term: 'Advertising trackers', value: 'None' },
];

export default function PrivacyPage() {
  return (
    <>
      <div className={`container ${styles.page}`}>
        <PageHead
          label={<time dateTime="2026-10">Last updated October 2026</time>}
          title="Privacy"
          lede="I use the information you send through this site to reply to your request. Resend and Gmail handle the email, and Vercel hosts the site and keeps server logs."
        />

        <dl className={styles.summary} data-enter style={enter(3)}>
          {SUMMARY.map((s) => (
            <div key={s.term} className={styles.summaryItem}>
              <dt className="t-label">{s.term}</dt>
              <dd>{s.value}</dd>
            </div>
          ))}
        </dl>

        {/* On wide screens the body shows in the first screen, so it enters after the heading and summary */}
        <div className={styles.body} data-enter style={enter(4)}>
          <aside className={styles.side} aria-label="Contact for privacy questions">
            <p className="t-label">Questions</p>
            <p>
              I am responsible for this site and what it collects. Write to me at{' '}
              <a href={`mailto:${SITE.email}`} className={styles.mail}>
                {SITE.email}
              </a>
              .
            </p>
          </aside>

          <div className={`prose ${styles.prose}`}>
            <h2>What the form collects</h2>
            <p>
              When you send a request, the form collects your name, your email address, your company or project if you add it,
              and your message. The form sends these details when you press send.
            </p>

            <h2>How it reaches me</h2>
            <p>The form sends your message through Resend to my Gmail inbox. These services process the message to deliver and store it.</p>

            <h2>How I use it</h2>
            <p>I use your information to reply to your request. I do not sell it or share it for advertising.</p>

            <h2>What the site does not do</h2>
            <p>This site has no advertising trackers.</p>

            <h2>Hosting</h2>
            <p>
              The site is hosted on Vercel, which keeps standard server logs when you visit. The form also uses your IP
              address temporarily to limit repeated submissions.
            </p>

            <h2>Please do not send</h2>
            <p>
              Patient information, client files or passwords. I never ask for them by email or through this form. When work
              needs access to an account, you add me as a user in your own account.
            </p>

            <h2>Seeing or deleting what you sent</h2>
            <p>
              Email me at <a href={`mailto:${SITE.email}`}>{SITE.email}</a> and I will tell you what I have, or delete your
              messages and confirm when it is done.
            </p>

            <h2>Changes</h2>
            <p>If anything here changes, I will update this page and the date at the top.</p>
          </div>
        </div>
      </div>

      <CloseBand
        title="Questions about any of this?"
        line="Write to me, or book a call about your project. There is nothing to prepare."
        check={false}
        track="privacy-close"
      />
    </>
  );
}
