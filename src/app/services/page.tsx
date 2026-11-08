import Link from 'next/link';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { PageHead } from '@/components/pages/PageHead';
import { CloseBand } from '@/components/pages/CloseBand';
import { SITE } from '@/content/site';
import { pageMeta } from '@/lib/meta';
import styles from './page.module.css';

export const metadata = pageMeta({
  title: 'Websites, online stores and marketing',
  description: SITE.description,
  path: '/services',
});

const SERVICES = [
  {
    id: 'websites',
    title: 'Websites and online stores',
    body: 'I plan the pages, organise the content, design the layouts and build the site. I work on new websites, rebuilds and changes to existing online stores.',
    detail: 'I show you design options and test the site on phones and computers. You approve the wording and design before launch.',
    href: '/work/techniques-combat',
    label: 'See the store redesign',
  },
  {
    id: 'marketing',
    title: 'Search and advertising',
    body: 'I manage Google profiles, search visibility, landing pages and Google Ads. I review search terms, the pages visitors reach and the actions recorded as conversions.',
    detail: 'You can hire me to review an account, make specific changes or manage it over time. You pay ad spend directly to Google, separately from my fee.',
    href: '/notes/google-ads-leads-button-clicks',
    label: 'Read how I check ad tracking',
  },
  {
    id: 'connections',
    title: 'Enquiries, booking and tracking',
    body: 'I connect forms, booking and the tools you use to receive and follow up enquiries. I check what happens after someone clicks, where the request arrives and which actions your systems can report.',
    detail: 'I distinguish completed requests and confirmed bookings from button clicks, and explain what your tools can and cannot measure.',
    href: '/work/physiomax',
    label: 'See the booking and tracking work',
  },
];

export default function ServicesPage() {
  return (
    <>
      <div className={`container ${styles.page}`}>
        <PageHead
          label="Services"
          title="Websites and online marketing"
          lede="I design and build websites and online stores, manage search and advertising, and connect forms, booking and tracking. You can hire me for a project or ongoing support."
        >
          <ButtonLink href="/work" variant="text" arrow>View my work</ButtonLink>
          <ButtonLink href="/pricing" variant="text" arrow>See the prices</ButtonLink>
        </PageHead>

        <div className={styles.services}>
          {SERVICES.map((service) => (
            <section key={service.id} id={service.id} className={styles.service} aria-labelledby={`${service.id}-title`}>
              <h2 id={`${service.id}-title`} className={styles.title}>{service.title}</h2>
              <div className={styles.copy}>
                <p className={styles.body}>{service.body}</p>
                <p className={styles.detail}>{service.detail}</p>
                <Link href={service.href} className={styles.link}>{service.label}</Link>
              </div>
            </section>
          ))}
        </div>
      </div>

      <section className={`paper ${styles.engagements}`} aria-labelledby="engagements-title" data-theme="light">
        <div className={`container ${styles.engagementInner}`}>
          <h2 id="engagements-title" className={styles.title}>Projects and ongoing support</h2>
          <div className={styles.copy}>
            <p className={styles.body}>You can hire me for a website check, a focused fix, a larger project or a new website. I agree the scope and price before work starts.</p>
            <p className={styles.detail}>For ongoing work, I maintain the website and manage the search, advertising and tracking included in your plan. Your accounts stay in your name. I report the changes made and the results recorded.</p>
            <Link href="/pricing" className={styles.link}>Compare projects and monthly plans</Link>
          </div>
        </div>
      </section>

      <div className={`container ${styles.experience}`}>
        <p>See details of my work for <Link href="/clinics">clinics</Link> and <Link href="/firms">professional services firms</Link>.</p>
      </div>

      <CloseBand title="Discuss a project" line="Describe the site or marketing work you need, including anything you already have in place." track="services-close" />
    </>
  );
}
