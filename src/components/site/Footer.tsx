import Link from 'next/link';
import { FOOTER_NAV, SITE } from '@/content/site';
import { CopyEmail } from '@/components/ui/CopyEmail';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={`night ${styles.footer}`}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.lead}>
          <p className={styles.mark}>
            <span className={styles.dot} aria-hidden="true" />
            {SITE.name}
          </p>
          <p className={styles.descriptor}>{SITE.descriptor}, from {SITE.location}. Working with law firms and practices across Canada and the US.</p>
        </div>
        <div className={styles.contact}>
          <p className="t-label">Write to me</p>
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
      <div className={`container ${styles.base}`}>
        <p>© {new Date().getFullYear()} {SITE.name}</p>
        <p>Every account stays in your name.</p>
      </div>
    </footer>
  );
}
