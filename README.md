# khassanein.bio

Kareem Hassanein's portfolio and booking site, built with Next.js, React, TypeScript and CSS Modules.

## Development

Install the locked dependencies with `npm ci`, then run `npm run dev`. The development server uses port 4321.

- `npm run build`: create the production build.
- `npm run start`: serve the production build on port 4322.
- `npm run typecheck`: check TypeScript.
- `npm run lint`: run ESLint.
- `npm run assets`: regenerate media from the local source captures configured in `scripts/work-assets.mjs`.

Generated media is committed under `public/work-media`, so builds do not need the original captures.

## Configuration

The contact endpoint requires the server-only `RESEND_API_KEY` environment variable. Keep local credentials in `.env.local`, which is excluded from Git. Configure deployment credentials in Vercel.

Contact details and booking links are in `src/content/site.ts`. Prices are in `src/content/offers.ts`.

## Deployment

Vercel builds the repository with `npm run build`. Preview deployments are reviewed before a release reaches `main`, which deploys the production site.
