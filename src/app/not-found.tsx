import { ButtonLink } from '@/components/ui/ButtonLink';

export const metadata = { title: 'Page not found' };

export default function NotFound() {
  return (
    <div className="container section">
      <p className="t-label">404</p>
      <h1 className="t-h1" style={{ marginTop: 12, maxWidth: '14ch' }}>
        This page took a wrong turn.
      </h1>
      <p className="t-lede" style={{ marginTop: 20 }}>
        The address may have changed when the site was rebuilt. The work and the prices are a click away.
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 32 }}>
        <ButtonLink href="/" arrow>
          Home
        </ButtonLink>
        <ButtonLink href="/work" variant="ghost">
          See the work
        </ButtonLink>
      </div>
    </div>
  );
}
