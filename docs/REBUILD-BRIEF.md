# khassanein.bio rebuild: brief for everyone working on it

Branch `rebuild-2026`. Nothing here goes to `main` (which deploys the live site) until Kareem approves.

## What the site is for

Kareem Hassanein owns the whole path from a Google search to a booked appointment for independent practices: the website, the Google profile, booking or intake, ads, and the tracking that ties them together. He has worked in the healthcare industry for 13 years, across different roles, and he builds and runs this work himself. Lead with that breadth of healthcare experience. His education may be referenced, but do not describe him as a Registered Physiotherapist or make registration his differentiator. Do not imply 13 years of clinical practice.

Readers: owners and partners of law firms (Canada and US), dental practices and private-pay medical clinics. Physio, chiro and massage clinics are welcome but no longer lead. They read on a phone, between patients or meetings.

The site must let an owner, on a phone:
1. understand what he does and who it is for within ten seconds;
2. see proof from their own kind of practice within one scroll;
3. know roughly what it costs before talking to him;
4. book a call in two taps;
5. feel that the site itself is the proof: fast, accessible, and better made than anything their agency has shown them.

Quality bar: Kareem expects award-level craft. Calm and exact, with strong type, generous space and no decoration of its own; the client work brings the colour. Every detail matters: alignment, spacing rhythm, hover and focus states, phone layouts, loading, motion. Nothing generic or templated.

## Design system (read `src/app/globals.css` first)

- Neutrals: `--paper`, `--paper-2`, `--card`, `--ink`, `--ink-2`, `--muted`, `--faint`, `--rule`, `--rule-soft`. One signal colour, `--signal` (deep green, for booked, counted, working), with `--signal-soft`. Dark sections use the `.night` class, which remaps the tokens.
- Type: `--font-display` (Schibsted Grotesk, heavy, tight tracking) for headings; `--font-body` (Geist) for text; `--font-mono` (Geist Mono) for small labels and data. Classes: `.t-hero`, `.t-h1`, `.t-h2`, `.t-h3`, `.t-lede`, `.t-small`, `.t-label`, `.prose`.
- Layout: `.container` (max 1240px with safe side gutters), `.section` (fluid vertical padding). Use CSS grid and flex with `gap`, never margin stacks. Every layout must work at 390px wide with no horizontal scroll.
- Client palettes: each case in `src/content/cases.ts` has `palette` (ground, ink, muted, rule, accent). Case bands use those colours, the same in every theme.
- Motion: add `data-reveal` to a block for a CSS scroll-linked entrance (no JS, visible where unsupported). `data-enter` with `style={{'--i': n}}` for first-screen entrances. Respect `prefers-reduced-motion`. Hover styles only inside `@media (hover: hover)`. No animation libraries.
- Styling: CSS Modules next to each component (`Thing.module.css`). No Tailwind, no new dependencies.

## Shared components (do not edit these; ask Kareem's lead agent if you need a change)

- `@/lib/media`: `still(key, alt)`, `baStill(key, alt)`, `loop(key, label)` return typed media from `public/work-media`. Keys are listed in `src/content/media.generated.ts`.
- `@/components/media/Picture`: `<Picture media={still} sizes="..." priority?>` (AVIF + WebP, intrinsic size). Always pass an honest `sizes`.
- `@/components/media/LoopVideo`: `<LoopVideo loop={loop} />` plays only on screen, pauses off screen, waits for a tap with reduced motion, has a pause control.
- `@/components/media/Frames`: `BrowserFrame` (with `domain`), `PhoneFrame`, `ScreenFrame`.
- `@/components/media/Plate`: desktop page in a browser frame with the phone overlapping.
- `@/components/media/BeforeAfter`: before and after slider (`before`, `after`, `label`).
- `@/components/ui/ButtonLink` (`variant` solid, ghost or text; `arrow`; `track`), `@/components/ui/CopyEmail`.
- Content: `@/content/site` (`SITE`, `NAV`), `@/content/cases` (`CASES`, `caseBySlug`, `PRACTICE_CASES`, `BEYOND_CASES`), `@/content/offers` (`OFFERS`, `PRICE_NOTE`, `PRICE_LINE`), `@/content/path` (`PATH`, the six stops).
- Booking: every booking button links to `SITE.bookingHref` (`/book` until Cal.com exists). The website check links to `SITE.checkHref`.

## Voice and content rules (non-negotiable)

- First person singular: "I". Never "we", "us", "our team".
- Plain, calm, specific; short sentences. Write from the reader's side: their worries, their words.
- No em dashes or en dashes used as dashes anywhere. Use commas, colons, full stops or parentheses.
- Never: "specialist", "specialized", "expert", "best", "advanced", "leading", "cutting-edge", "state-of-the-art", "seamless", "solutions", "digital transformation", "unlock", "elevate", "empower", guarantees of rankings or bookings, superlatives, emojis.
- The approved exception to the rule against numbers about Kareem is 13 years in healthcare, across different roles. Do not turn this into 13 years of clinical practice or web work. No other numbers about Kareem (clients, hours, projects). Never mention hours or hourly billing. Client numbers only as already written in `cases.ts`.
- No categorical claims ("always", "never", "everyone"); prefer "often", "usually", "can".
- Canadian spelling (colour, centre, licence as a noun).
- Prices exactly as in `offers.ts`: the check at $1,500, everything else "from". Prices in CAD; US firms pay the same figures in USD; larger practices are quoted.
- Never mention: the drafting workflow at Tax Relief Counsel, AI scribes or clinical documentation, Collins Liver Health, Prism, SideyMMA, Play Date, any legal or College matters. Do not name other brands as style references.
- Techniques: the drop in fake checkouts came from the checkout protection the owner switched on. Credit it; never claim it.
- Travel journal: not public yet; show the craft, not the membership offer. Wedding: the Peru landscapes are licensed stock; never imply otherwise.
- Every page ends with a way to book a call. "Replies within one business day" is the promise, never "always available".
- This copy is a draft for Kareem's markup; he approves every visible word before launch. Write it as if it will ship.

## Engineering rules

- Kareem's interaction preference: hovering must not move, tilt, scale or lift cards, containers, project previews or the hero screen. Keep hover feedback to colour, borders and underlines. Do not reintroduce cursor-following previews.

- Server Components by default; `'use client'` only for real interaction, and keep client components small.
- Accessible: one `h1` per page, ordered headings, landmarks, descriptive alt text (already on media), visible focus, 44px touch targets, labels on every form field, `aria-live` for form status.
- Performance: the first screen must paint fast on a phone. No layout shift (media have intrinsic sizes). Media below the first screen lazy-load (Picture and LoopVideo already do). Keep client JS minimal.
- Every page exports `metadata` with a specific `title` and `description` (the root layout adds " · Kareem Hassanein").
- Links between pages use `next/link`.

## Checking your work

- A dev server runs at http://localhost:4321 (started by the lead; do not start another, do not run `next build`; the machine is short of memory).
- Screenshots: `node scripts/shot.mjs /your-route` (desktop 1440 and phone 390; add `--full` for the whole page, `--phone` or `--desktop` for one size). It prints horizontal overflow and console errors. Open the JPEGs in `output/shots/` and look at them properly. Fix what you see; check again.
- Type-check: `npx tsc --noEmit`. Lint your files: `npx eslint src/app/<route> src/components/<yours>`.
- Do not commit; the lead agent commits.

## Reference

The approved direction, as Kareem saw it: the case plates review page (`C:\Users\karee\AppData\Local\Temp\claude\C--Users-karee\11484a63-bcea-4445-ba5c-a9ec5c895c14\scratchpad\case-plates\case-plates.html`): neutral frame, strong type, each case in a band of its own palette, desktop and phone plates, loops, before and after sliders. The plan with the page outlines and copy drafts: `C:\Users\karee\AppData\Local\Temp\claude\C--Users-karee\11484a63-bcea-4445-ba5c-a9ec5c895c14\scratchpad\portfolio-plan.html` (sections 05 to 08, 12, 13 and 17).
