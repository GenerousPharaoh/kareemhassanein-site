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
        title="Page not found"
        lede="There is no page at this address. You can return home or view my work."
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
