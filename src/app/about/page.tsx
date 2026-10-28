import Link from 'next/link';
import { DisplayTitle } from '@/components/ui/DisplayTitle';
import { Disclosure } from '@/components/ui/Disclosure';
import { PortraitFrame } from '@/components/media/PortraitFrame';
import { CaseChips } from '@/components/pages/CaseChips';
import { CloseBand } from '@/components/pages/CloseBand';
import { enter } from '@/components/pages/enter';
import { pageMeta } from '@/lib/meta';
import { PORTRAIT as portrait } from '@/content/portrait';
import styles from './page.module.css';

export const metadata = pageMeta({
  title: 'About',
  description:
    'I have worked in healthcare for 13 years, across different roles. I build and run the online side of law firms and independent practices.',
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
    text: 'I walk the whole path, from the search result to the booked appointment or signed client, and tell you what is actually happening.',
  },
  {
    name: 'Plan',
    text: 'You get a short, ranked list with a fixed price beside each item. You choose what gets done.',
  },
  {
    name: 'Build',
    text: 'I design and build it, with real options to choose from. I direct AI build tools the way a lead directs a studio; every decision, review and test is mine.',
    link: { href: '/ai', label: 'How I use AI' },
  },
  {
    name: 'Run',
    text: 'I keep it working, report bookings or signed clients by source, and answer for it. Every change is logged and can be undone.',
  },
];

const QUESTIONS = [
  {
    q: 'Will you find what is actually wrong?',
    a: 'Tax Relief Counsel asked about its website. The larger problem was in the ad account, where most of the reported conversions were clicks on the consultation button. At PhysioMax, bookings had never reached Analytics, and the gap was inside the booking system, not the website.',
    cases: ['tax-relief-counsel', 'physiomax'],
  },
  {
    q: 'Will you understand my field?',
    a: 'Booking systems, practice websites and how patients choose are part of my work. At Endorphins, I named the colleges in text instead of showing their logos, which the colleges restrict. For a tax law firm, I built tools around IRS procedures, with the IRS source beside every figure.',
    cases: ['endorphins', 'tax-relief-counsel'],
  },
  {
    q: 'How fast, and what if something breaks?',
    a: 'A gear store’s redesign went live the same evening, built on a copy of its theme with a one-step rollback. A law firm’s new site launches with one DNS change, reversible the same way.',
    cases: ['techniques-combat', 'tax-relief-counsel'],
  },
  {
    q: 'Will I have to manage you?',
    a: 'There is one person to deal with: strategy, design, build, tracking and ads all stay with me. You choose between rendered designs instead of imagining them, approve a one-page list with a fixed price beside each item, and get a short update every week until handover.',
    cases: ['endorphins', 'tax-relief-counsel'],
  },
  {
    q: 'Whose side are you on?',
    a: 'Yours. Your domain, hosting, Google accounts and booking system stay in your name, and you pay those bills directly. At Endorphins, every account is in the clinic’s name and the agency has limited access. On my own practice’s ads, I keep a running log of every change, corrections included.',
    cases: ['endorphins', 'kinetikare'],
  },
];

export default function AboutPage() {
  return (
    <>
      <div className={`paper ${styles.opening}`} data-theme="light">
      <section className={`container ${styles.hero}`} aria-labelledby="about-title">
        <div className={styles.heroCopy}>
          <p className="t-label" data-enter style={enter(0)}>
            About
          </p>
          <DisplayTitle id="about-title" className={`t-h1 ${styles.title}`}>
            I know healthcare from the inside.
          </DisplayTitle>
          <p className={`t-lede ${styles.lede}`} data-enter style={enter(2)}>
            I’m Kareem Hassanein. I’ve worked in the healthcare industry for 13 years, across different roles.
            I build and run the online side of law firms and independent practices: the website, the Google profile,
            booking or intake, ads, and the tracking that ties them together.
          </p>
        </div>
        <figure className={styles.portrait} data-enter style={enter(2)}>
          <PortraitFrame
            media={portrait}
            sizes="(min-width: 960px) 263px, min(52.5vw, 230px)"
            priority
          />
        </figure>
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
            <p className="t-label">Why healthcare experience matters</p>
            <h2 id="why-title" className={`t-h2 ${styles.whyTitle}`}>
              I look beyond the website.
            </h2>
          </div>
          <div className={styles.whyBody} data-reveal>
            <p>
              Working in healthcare has shown me how people choose a practice, how booking works at the front desk,
              and how much happens between an enquiry and an appointment. Law firms have their own version of that path.
              I learn yours before changing anything.
            </p>
            <p>
              I start with the whole path, then trace the problem to its cause. A website can look like the problem when
              the gap is inside the booking system or the way leads are counted.
            </p>
            <p className={styles.whyAside}>
              Outside the practice and the build work, I volunteer as a mentor for Lab2Market Validate at McMaster University,
              supporting Canadian researchers who are taking health innovations to market.
            </p>
          </div>
        </div>
      </section>

      <section className={`paper sheet-up ${styles.how}`} aria-labelledby="how-title">
        <div className="container">
          <div className={styles.howHead} data-reveal>
            <h2 id="how-title" className="t-h2">
              I work in four steps.
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
            Why owners hire me
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
