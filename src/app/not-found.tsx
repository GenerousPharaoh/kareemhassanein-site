import { PageHead } from '@/components/pages/PageHead';
import { ButtonLink } from '@/components/ui/ButtonLink';
import styles from './not-found.module.css';

export const metadata = { title: 'Page not found' };

/** Opens like every other page (the shared head and its entrance) and fills the first screen. */
export default function NotFound() {
  return (
    <div className={`container section ${styles.page}`}>
      <PageHead
        label="404"
        title="This page took a wrong turn."
        lede="The address may have changed when the site was rebuilt. The work and the prices are a click away."
      >
        <div className={styles.actions}>
          <ButtonLink href="/" arrow>
            Home
          </ButtonLink>
          <ButtonLink href="/work" variant="ghost">
            See the work
          </ButtonLink>
        </div>
      </PageHead>
    </div>
  );
}
