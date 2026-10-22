import Link from 'next/link';
import { CopyEmail } from '@/components/ui/CopyEmail';
import { FOOTER_NAV, SITE } from '@/content/site';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.top}`}>
        <div className={styles.contact}>
          <p className={styles.label}>Write to me</p>
          <CopyEmail className={styles.email} />
          <p className={styles.reply}>{SITE.reply}.</p>
        </div>
        <nav className={styles.nav} aria-label="Footer">
          {FOOTER_NAV.map((item) => (
            <Link key={item.href} href={item.href} className={styles.link}>
              {item.label}
            </Link>
          ))}
          <a href={SITE.linkedin} className={styles.link} rel="noopener">
            LinkedIn
          </a>
        </nav>
      </div>
      {/* The name, as wide as the page */}
      <p className={styles.wordmark} aria-hidden="true">
        Kareem Hassanein
      </p>
      <div className={`container ${styles.base}`}>
        <p>
          © {new Date().getFullYear()} {SITE.name}. {SITE.descriptor}, from {SITE.location}.
        </p>
        <p>Every account stays in your name.</p>
      </div>
    </footer>
  );
}
