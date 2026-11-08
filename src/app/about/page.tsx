import Link from 'next/link';
import { DisplayTitle } from '@/components/ui/DisplayTitle';
import { Disclosure } from '@/components/ui/Disclosure';
import { CaseChips } from '@/components/pages/CaseChips';
import { CloseBand } from '@/components/pages/CloseBand';
import { enter } from '@/components/pages/enter';
import { pageMeta } from '@/lib/meta';
import styles from './page.module.css';

export const metadata = pageMeta({
  title: 'About',
  description:
    'I have worked in healthcare for 13 years, across different roles. I work directly with business owners on websites, online stores and online marketing.',
  path: '/about',
});

const FACTS = [
  { term: 'Experience', lines: ['13 years in healthcare', 'Across different roles'] },
  { term: 'Education', lines: ['MSc Physiotherapy, Robert Gordon University', 'BSc Kinesiology, McMaster University'] },
  { term: 'Mentoring', lines: ['Lab2Market Validate', 'McMaster University'] },
  { term: 'Based in', lines: ['Burlington, Ontario', 'Working across Canada and the US'] },
];

const STEPS = [
  {
    name: 'Assess',
    text: 'I review the website, ads, forms, booking and tracking. I identify problems and check which customer actions your systems can report.',
  },
  {
    name: 'Plan',
    text: 'I give you a list of recommended changes in priority order, with a fixed price for each. You choose the work you want to go ahead with.',
  },
  {
    name: 'Build',
    text: 'I show you design options, build the agreed work and test it on phones and computers. You approve the wording and design before launch.',
    link: { href: '/ai', label: 'How I use AI' },
  },
  {
    name: 'Run',
    text: 'For ongoing work, I maintain the site and manage the marketing included in your plan. I keep a record of changes and report the results your systems can measure.',
  },
];

const QUESTIONS = [
  {
    q: 'How do you identify the problem?',
    a: 'Tax Relief Counsel asked about its website. The larger problem was in the ad account, where most of the reported conversions were clicks on the consultation button. At PhysioMax, bookings had never reached Analytics, and the gap was inside the booking system, not the website.',
    cases: ['tax-relief-counsel', 'physiomax'],
  },
  {
    q: 'How do you approach an unfamiliar business?',
    a: 'I ask about your services or products, review the existing site and tools, and agree the requirements with you. For Techniques, the work centred on product pages, shopping and video. For Endorphins, it centred on service information and practitioner booking.',
    cases: ['techniques-combat', 'endorphins'],
  },
  {
    q: 'How do you handle a website launch?',
    a: 'A gear store’s redesign went live the same evening, built on a copy of its theme with a one-step rollback. A law firm’s new site launches with one DNS change, reversible the same way.',
    cases: ['techniques-combat', 'tax-relief-counsel'],
  },
  {
    q: 'Who will I work with?',
    a: 'You work directly with me on planning, design, development, tracking and ads. I show you design options, confirm the scope and fixed price, and send a weekly update until handover.',
    cases: ['endorphins', 'tax-relief-counsel'],
  },
  {
    q: 'Who owns the website and accounts?',
    a: 'Your domain, hosting, Google accounts and booking system stay in your name, and you pay those bills directly. At Endorphins, the clinic owns the accounts and grants limited access to its agency. I keep a record of changes made to the accounts I manage.',
    cases: ['endorphins', 'kinetikare'],
  },
];

export default function AboutPage() {
  return (
    <>
      <div className={`paper ${styles.opening}`} data-theme="light">
      <section className={`container ${styles.hero}`} aria-labelledby="about-title">
        <div className={styles.heroCopy}>
          <DisplayTitle id="about-title" className={`t-h1 ${styles.title}`}>
            About me
          </DisplayTitle>
          <p className={`t-lede ${styles.lede}`} data-enter style={enter(2)}>
            I’m Kareem Hassanein. I’ve worked in the healthcare industry for 13 years, across different roles.
            I work directly with business owners on websites, online stores, search and advertising,
            including the tools for enquiries, booking and tracking.
          </p>
        </div>
        <dl className={styles.facts} data-enter style={enter(3)}>
          {FACTS.map((f) => (
            <div key={f.term} className={styles.fact}>
              <dt className="t-label">{f.term}</dt>
              {f.lines.map((line, i) => (
                <dd key={line} className={i === 0 ? styles.factMain : styles.factSub}>
                  {line}
                </dd>
              ))}
            </div>
          ))}
        </dl>
      </section>
      </div>

      <section className={`container ${styles.whySection}`} aria-labelledby="why-title">
        <div className={styles.why}>
          <div className={styles.whyHead} data-reveal>
            <h2 id="why-title" className={`t-h2 ${styles.whyTitle}`}>
              How I review a site
            </h2>
          </div>
          <div className={styles.whyBody} data-reveal>
            <p>
              I test how someone gets from a search result or ad to the website, then to an enquiry, booking or purchase.
              I check the pages they use, the forms they complete and where the information is sent.
            </p>
            <p>
              If bookings are missing from Analytics, I check the booking integration and confirmation pages.
              If an ad account reports more leads than you received, I check which actions it counts as conversions.
            </p>
            <p className={styles.whyAside}>
              I also volunteer as a mentor for Lab2Market Validate at McMaster University,
              supporting Canadian researchers who are taking health innovations to market.
            </p>
          </div>
        </div>
      </section>

      <section className={`paper sheet-up ${styles.how}`} aria-labelledby="how-title">
        <div className="container">
          <div className={styles.howHead} data-reveal>
            <h2 id="how-title" className="t-h2">
              Working with me
            </h2>
          </div>
          <ol className={styles.steps}>
            {STEPS.map((s, i) => (
              <li key={s.name} className={styles.step} data-reveal>
                <span className={styles.node} aria-hidden="true" />
                <p className={`t-label ${styles.stepNum}`} aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h3 className={styles.stepName}>{s.name}</h3>
                <p className={styles.stepText}>{s.text}</p>
                {s.link ? (
                  <Link href={s.link.href} className={styles.stepLink}>
                    {s.link.label}
                    <svg viewBox="0 0 16 16" aria-hidden="true">
                      <path d="M3 8h9.5M8.5 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                ) : null}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={`section sheet-up ${styles.hireBand}`} aria-labelledby="hire-title">
        <div className={`container ${styles.hire}`}>
        <div className={styles.hireHead} data-reveal>
          <h2 id="hire-title" className="t-h2">
            Questions about working with me
          </h2>
        </div>
        <div className={styles.rows}>
          {QUESTIONS.map((item) => (
            <Disclosure key={item.q} title={item.q}>
              <div className={styles.answer}>
                <p>{item.a}</p>
                <CaseChips slugs={item.cases} label={`Cases for: ${item.q}`} />
              </div>
            </Disclosure>
          ))}
        </div>
        </div>
      </section>

      <CloseBand track="about-close" />
    </>
  );
}
