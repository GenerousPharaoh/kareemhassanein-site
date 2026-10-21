import { CloseBand } from '@/components/pages/CloseBand';
import { enter } from '@/components/pages/enter';
import { pageMeta } from '@/lib/meta';
import { PageHead } from '@/components/pages/PageHead';
import styles from './page.module.css';

export const metadata = pageMeta({
  title: 'How I use AI',
  description:
    'AI tools help me build. I review and test every change myself and decide what ships, and nothing that speaks for your practice goes live without your approval.',
  path: '/ai',
});

const TOOLS = ['Write code to my instructions', 'Check code for errors', 'Draft text for me to rewrite', 'Run tests and checks across a site'];

const ME = [
  'Decide what gets built, and how',
  'Review every change',
  'Test it myself, on phones and computers',
  'Decide what ships, and answer for it',
];

const SETTINGS = [
  { term: 'Your accounts', value: 'Your Google accounts and your booking system stay in your name. I work in them with access you grant, and you can remove it at any time.' },
  { term: 'Your wording', value: 'Nothing that speaks for your practice goes live until you have approved it.' },
];

export default function AiPage() {
  return (
    <>
      <div className={`container ${styles.top}`}>
        <PageHead
          measure="wide"
          label="How I use AI"
          title={
            <>
              I use AI to build.
              <br /> I decide what ships.
            </>
          }
          lede="AI tools write and check code, draft text and run tests for me. I review and test every change myself before it goes live."
        />

        <section className={styles.split} aria-labelledby="split-title" data-enter style={enter(3)}>
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
          <div className={`night ${styles.panel} ${styles.panelMe}`}>
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
        </section>
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
        title="Questions about how I work?"
        line="Ask on the call. It takes 20 minutes, and there is nothing to prepare except your site address."
        track="ai-close"
      />
    </>
  );
}
