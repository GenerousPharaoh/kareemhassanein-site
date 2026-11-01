import { DisplayTitle } from '@/components/ui/DisplayTitle';
import { Disclosure } from '@/components/ui/Disclosure';
import { PortraitFrame } from '@/components/media/PortraitFrame';
import { CaseChips } from '@/components/pages/CaseChips';
import { CloseBand } from '@/components/pages/CloseBand';
import { Process } from '@/components/pages/Process';
import { enter } from '@/components/pages/enter';
import { pageMeta } from '@/lib/meta';
import { PORTRAIT as portrait } from '@/content/portrait';
import styles from './page.module.css';

export const metadata = pageMeta({
  title: 'About',
  description:
    'I design and build websites for businesses and personal projects, and run the systems around them. My background includes 13 years in healthcare, across different roles.',
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
    text: 'I learn what you want to build or improve, look at what is already there, and work out what needs to happen.',
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
    text: 'For ongoing work, I look after the site and report what matters to your business: enquiries, bookings or sales. Every change is logged and can be undone.',
  },
];

const QUESTIONS = [
  {
    q: 'Will you find what is actually wrong?',
    a: 'Tax Relief Counsel asked about its website. The larger problem was in the ad account, where most of the reported conversions were clicks on the consultation button. At PhysioMax, bookings had never reached Analytics, and the gap was inside the booking system, not the website.',
    cases: ['tax-relief-counsel', 'physiomax'],
  },
  {
    q: 'How fast, and what if something breaks?',
    a: 'A gear store’s redesign went live the same evening, built on a copy of its theme with a one-step rollback. A law firm’s new site launches with one DNS change, reversible the same way.',
    cases: ['techniques-combat', 'tax-relief-counsel'],
  },
  {
    q: 'Will I have to manage you?',
    a: 'No. You choose between rendered designs instead of imagining them, and you get a short update every week until handover. Endorphins’ owner and agency got one briefing and every account stayed in the clinic’s name.',
    cases: ['endorphins', 'tax-relief-counsel'],
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
            <span className={styles.titleLine}>I design it.</span>{' '}
            <span className={styles.titleLine}>I build it.</span>{' '}
            <span className={styles.titleLine}>I run it.</span>
          </DisplayTitle>
          <p className={`t-lede ${styles.lede}`} data-enter style={enter(2)}>
            I’m Kareem Hassanein. I take on the whole path a client walks, from the search to the booking, and I do
            the work myself: strategy, design, build, tracking and ads, with one person to deal with throughout.
          </p>
        </div>
        <figure className={styles.portrait}>
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

      <Process steps={STEPS} />

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

      <CloseBand line="Bring your site address and whatever has been bothering you about it." track="about-close" />
    </>
  );
}
