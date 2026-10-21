import Link from 'next/link';
import { HeroStage } from '@/components/home/HeroStage';
import { PathBand } from '@/components/home/PathBand';
import { SelectedWork } from '@/components/home/SelectedWork';
import { STORIES } from '@/components/home/stories';
import styles from '@/components/home/Home.module.css';
import { Picture } from '@/components/media/Picture';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { BEYOND_CASES, PRACTICE_CASES } from '@/content/cases';
import { PRICE_LINE, PRICE_NOTE } from '@/content/offers';
import { PATH } from '@/content/path';
import { SITE } from '@/content/site';
import { still } from '@/lib/media';

const STEPS = [
  { name: 'Assess', text: 'I walk the whole path, from the search result to the booked appointment, and tell you what is actually happening.' },
  { name: 'Plan', text: 'You get a short, ranked list with a fixed price beside each item. You choose.' },
  { name: 'Build', text: 'I design and build it, with real options to choose from. I direct AI build tools the way a lead directs a studio; every decision, review and test is mine.' },
  { name: 'Run', text: 'I keep it healthy, report what booked, and answer for it. Every change is logged and can be undone.' },
];

export default function Home() {
  const [lead, ...practices] = PRACTICE_CASES;
  const portrait = still('site/portrait', 'Kareem Hassanein');

  return (
    <>
      <section className={styles.hero}>
        <div className={`container ${styles.heroGrid}`}>
          <div className={styles.heroText}>
            <p className="t-label" data-enter style={{ ['--i' as string]: 0 }}>
              {SITE.descriptor}
            </p>
            <h1 className={styles.heroTitle} data-enter style={{ ['--i' as string]: 1 }}>
              From a Google search to a booked appointment, every step working and counted.
            </h1>
            <p className={styles.heroLede} data-enter style={{ ['--i' as string]: 2 }}>
              I build and run the online side of law firms and of dental and medical practices: the website, your Google profile, booking or intake, ads,
              and the tracking that ties them together.
            </p>
            <ul className={styles.points} data-enter style={{ ['--i' as string]: 3 }}>
              <li>One person owns the whole path</li>
              <li>Written to your college’s or law society’s rules</li>
              <li>Every account stays in your name</li>
            </ul>
            <div className={styles.ctas} data-enter style={{ ['--i' as string]: 4 }}>
              <ButtonLink href={SITE.bookingHref} arrow track="hero-book">
                Book a 20-minute call
              </ButtonLink>
              <ButtonLink href={SITE.checkHref} variant="ghost" track="hero-check">
                Start with a website check, $1,500
              </ButtonLink>
            </div>
            <p className={styles.reply} data-enter style={{ ['--i' as string]: 5 }}>
              {SITE.reply}
            </p>
          </div>
          <div className={styles.heroStage} data-enter style={{ ['--i' as string]: 3 }}>
            <HeroStage stories={STORIES} />
          </div>
        </div>
      </section>

      <section className={`night section ${styles.path}`} aria-labelledby="path-h">
        <div className="container">
          <div className={styles.head}>
            <p className="t-label">The path</p>
            <h2 id="path-h" className="t-h2">
              Where practices lose people
            </h2>
            <p className="t-lede">
              Most practices have the path split between a web designer, an agency, a booking system and Google. Nobody owns the gaps between them. I do.
            </p>
          </div>
          <PathBand stops={PATH} />
        </div>
      </section>

      <section className="section" aria-labelledby="work-h">
        <div className="container">
          <div className={styles.headRow}>
            <div className={styles.head}>
              <p className="t-label">Selected work</p>
              <h2 id="work-h" className="t-h2">
                Proof from practices like yours
              </h2>
            </div>
            <ButtonLink href="/work" variant="text" arrow>
              All work
            </ButtonLink>
          </div>
          <SelectedWork lead={lead} practices={practices} beyond={BEYOND_CASES} />
        </div>
      </section>

      <section className={`section ${styles.who}`} aria-labelledby="who-h">
        <div className={`container ${styles.whoGrid}`}>
          <div className={styles.portrait} data-reveal>
            <Picture media={portrait} sizes="(min-width: 960px) 420px, 80vw" />
          </div>
          <div className={styles.whoText}>
            <p className="t-label">Who you work with</p>
            <h2 id="who-h" className="t-h2">
              A clinician who builds
            </h2>
            <p className={styles.whoLead}>
              I am a Registered Physiotherapist and I still treat patients every week, so I know regulated practice from the inside: how people choose a
              professional, how booking works at the front desk, and what a regulator will and will not let you say.
            </p>
            <p className={styles.whoBody}>
              I work on a practice the way I work with a patient. I assess before I treat, fix the cause rather than the symptom, and check the result
              afterwards.
            </p>
            <ButtonLink href="/about" variant="text" arrow>
              More about me
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className={`section ${styles.how}`} aria-labelledby="how-h">
        <div className="container">
          <div className={styles.head}>
            <p className="t-label">How it works</p>
            <h2 id="how-h" className="t-h2">
              Assess, plan, build, run
            </h2>
          </div>
          <ol className={styles.steps}>
            {STEPS.map((s, i) => (
              <li key={s.name} className={styles.step} data-reveal>
                <span className={styles.stepNum} aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className={styles.stepName}>{s.name}</h3>
                <p className={styles.stepText}>{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" aria-labelledby="prices-h">
        <div className="container">
          <div className={styles.headRow}>
            <div className={styles.head}>
              <p className="t-label">Ways to work together</p>
              <h2 id="prices-h" className="t-h2">
                Fixed prices, published
              </h2>
            </div>
            <ButtonLink href="/pricing" variant="text" arrow>
              What each includes
            </ButtonLink>
          </div>
          <ul className={styles.prices}>
            {PRICE_LINE.map((p, i) => (
              <li key={p.label} className={styles.price} data-reveal>
                <Link href={i === 0 ? '/pricing#check' : '/pricing'} className={styles.priceLink}>
                  <span className={styles.priceLabel}>{p.label}</span>
                  <span className={styles.priceValue}>{p.price}</span>
                </Link>
              </li>
            ))}
          </ul>
          <p className={styles.priceNote}>{PRICE_NOTE}</p>
        </div>
      </section>

      <section className={`night section ${styles.close}`} aria-labelledby="close-h">
        <div className={`container ${styles.closeIn}`}>
          <h2 id="close-h" className={styles.closeTitle}>
            Not sure where to start?
          </h2>
          <p className={styles.closeText}>Book a call, or begin with the website check. Its full cost comes off any work that follows within 60 days.</p>
          <div className={styles.ctas}>
            <ButtonLink href={SITE.bookingHref} arrow track="close-book">
              Book a 20-minute call
            </ButtonLink>
            <ButtonLink href={SITE.checkHref} variant="ghost" track="close-check">
              Start with a website check, $1,500
            </ButtonLink>
          </div>
          <p className={styles.closeReply}>{SITE.reply}</p>
        </div>
      </section>
    </>
  );
}
