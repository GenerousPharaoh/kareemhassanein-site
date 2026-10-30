import { CloseBand } from '@/components/pages/CloseBand';
import { enter } from '@/components/pages/enter';
import { pageMeta } from '@/lib/meta';
import { PageHead } from '@/components/pages/PageHead';
import { Rise } from '@/components/ui/Rise';
import styles from './page.module.css';

export const metadata = pageMeta({
  title: 'How I use AI',
  description:
    'AI tools help me build. I review and test every change myself and decide what ships, and nothing published on your behalf goes live without your approval.',
  path: '/ai',
});

const TOOLS = ['Write code to my instructions', 'Check code for errors', 'Draft text for me to rewrite', 'Run tests and checks across a site'];

const ME = [
  'Decide what gets built, and how',
  'Review every change',
  'Test it myself, on phones and computers',
  'Decide what ships, and answer for it',
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
              <span className={styles.quiet}>I use AI to build.</span>
              <br /> I decide what ships.
            </>
          }
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
          <p className={styles.approval}>Nothing published on your behalf goes live until you have approved it.</p>
        </Rise>
      </div>

      <CloseBand
        title="Questions about how I work?"
        line="Ask on the call. It takes 20 minutes, and there is nothing to prepare."
        track="ai-close"
      />
    </>
  );
}
