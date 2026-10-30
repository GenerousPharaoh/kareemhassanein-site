import Link from 'next/link';
import { CopyEmail } from '@/components/ui/CopyEmail';
import { FOOTER_NAV, SERVICES, SITE } from '@/content/site';
import { PORTRAIT } from '@/content/portrait';
import { Picture } from '@/components/media/Picture';
import styles from './Footer.module.css';
import { MotionControl } from './MotionControl';

export function Footer() {
  return (
    <footer className={styles.footer} data-theme="light">
      <div className={`paper ${styles.sheet}`}>
      <div className={styles.top}>
        <div className={styles.contact}>
          <div className={styles.identity}>
            <Picture media={PORTRAIT} sizes="60px" className={styles.portrait} />
            <p>{SITE.name}<span>{SITE.location}</span></p>
          </div>
          <h2 className={styles.title}><a href={`mailto:${SITE.email}`}>Write to me<svg viewBox="0 0 40 40" aria-hidden="true"><path d="M8 32 32 8M8 8h24v24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></a></h2>
          <CopyEmail className={styles.email} />
          <p className={styles.reply}>{SITE.reply}.</p>
        </div>
        <div className={styles.directory}>
        <nav className={styles.nav} aria-label="Footer: explore">
          <p className={styles.label}>Explore</p>
          {FOOTER_NAV.map((item) => (
            <Link key={item.href} href={item.href} className={styles.link}>
              {item.label}
            </Link>
          ))}
        </nav>
        <nav className={styles.nav} aria-label="Footer: services">
          <p className={styles.label}>Services</p>
          {SERVICES.map((item) => <Link key={item.href} href={item.href} className={styles.link}>{item.label}</Link>)}
          <Link href="/pricing" className={styles.link}>Pricing</Link>
          <Link href={SITE.bookingHref} className={styles.link}>Book a call</Link>
        </nav>
        </div>
      </div>
      <div className={styles.base}>
        <p>© {new Date().getFullYear()} {SITE.name}</p>
        <nav className={styles.utilities} aria-label="Footer: other links">
          <Link href="/privacy">Privacy</Link>
          <a href={SITE.linkedin} rel="noopener">LinkedIn<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 13 13 3M3 3h10v10" fill="none" stroke="currentColor" strokeWidth="1.2" /></svg></a>
          <a href="#top" className={styles.back}>Back to top<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 13V3M3 8l5-5 5 5" fill="none" stroke="currentColor" strokeWidth="1.2" /></svg></a>
          <MotionControl />
        </nav>
      </div>
      </div>
    </footer>
  );
}
