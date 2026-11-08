import { CloseBand } from '@/components/pages/CloseBand';
import { enter } from '@/components/pages/enter';
import { pageMeta } from '@/lib/meta';
import { PageHead } from '@/components/pages/PageHead';
import { Rise } from '@/components/ui/Rise';
import styles from './page.module.css';

export const metadata = pageMeta({
  title: 'How I use AI',
  description:
    'I use AI tools to draft code and text and run checks. I review and test the changes, and you approve the wording before publication.',
  path: '/ai',
});

const TOOLS = ['Write code to my instructions', 'Check code for errors', 'Draft text for me to rewrite', 'Run tests and checks across a site'];

const ME = [
  'Plan the website and choose what to build',
  'Review the generated code and text',
  'Test the site on phones and computers',
  'Approve changes for launch',
];

const SETTINGS = [
  { term: 'Your accounts', value: 'Your Google accounts and your booking system stay in your name. I work in them with access you grant, and you can remove it at any time.' },
  { term: 'Your wording', value: 'You approve the wording before I publish it.' },
];

export default function AiPage() {
  return (
    <>
      <div className={`container ${styles.top}`}>
        <PageHead
          measure="wide"
          label="Tools"
          title="How I use AI"
          lede="AI tools write and check code, draft text and run tests for me. I review and test every change myself before it goes live."
        />

        {/* The tools' rows come up, then mine */}
        <Rise as="section" items="li" className={styles.split} aria-labelledby="split-title" data-enter style={enter(3)}>
          <h2 id="split-title" className="sr-only">
            Who does what
          </h2>
          <div className={styles.panel}>
            <p className={`t-label ${styles.panelLabel}`}>The tools</p>
            <ul className={styles.list}>
              {TOOLS.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
          <div className={`paper ${styles.panel} ${styles.panelMe}`} data-theme="light">
            <p className={`t-label ${styles.panelLabel}`}>
              <span className={styles.dot} aria-hidden="true" />
              Me
            </p>
            <ul className={styles.list}>
              {ME.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
        </Rise>
      </div>

      <section className={`container section ${styles.settings}`} aria-labelledby="settings-title">
        <h2 id="settings-title" className={`t-h2 ${styles.settingsTitle}`} data-reveal>
          Settings and accounts
        </h2>
        <dl className={styles.facts}>
          {SETTINGS.map((s) => (
            <div key={s.term} className={styles.fact} data-reveal>
              <dt className="t-label">{s.term}</dt>
              <dd>{s.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <CloseBand
        title="Discuss a project"
        line="Ask about the design, development and review process on a 20-minute call."
        track="ai-close"
      />
    </>
  );
}
