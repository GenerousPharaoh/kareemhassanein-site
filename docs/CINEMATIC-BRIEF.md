# The cinematic direction: brief for the page agents

Branch `cinematic`. Kareem rejected two earlier versions (a neutral paper-and-ink system, then a
vermilion and ice-blue poster look) as dull, generic and tacky. This direction is the decision:
build every page in it, to the standard of the homepage.

## The look

- A dark racing-green stage (`--stage` #13271f), ivory type (`--ivory`), one brass light (`--brass`,
  `--brass-hi`; `--brass-ink` for small brass text on ivory). Ivory paper sections (`.paper`) give the
  page rhythm; `.night` is the deeper green. `.sheet-up` makes a section rise over the previous one
  with rounded top corners (use it where the page turns between dark and ivory).
- Display type is Bodoni Moda (`--font-display`): large, regular weight (400), tight tracking, italic
  in brass for emphasis (`<em>`). Working text is Geist. Classes: `.t-mega`, `.t-hero`, `.t-h1`,
  `.t-h2`, `.t-h3`, `.t-lede`, `.t-small`, `.prose`. `.t-label` is now a small italic serif caption in
  brass: use it rarely, never above every heading.
- Client work keeps its own palette: `paletteVars()` from `src/lib/palette.ts` sets `--case-ground`,
  `--case-ink`, `--case-accent`, `--case-accent-text` and `--case-focus`; `toneOf()` says dark or light.
  Give a section on a client ground `data-theme="light"` or `"dark"` so the header can follow it
  (`.paper` and `.night` sections are detected automatically).

## The motion (read the homepage code first: it is the reference implementation)

- `src/lib/gsap.ts`: `useGsap(ref, ({ reduce, mobile }) => {...})` runs GSAP setup scoped to a
  component with automatic cleanup; `getGsap()` gives gsap, ScrollTrigger, SplitText, Flip. GSAP 3.15,
  free, plugins included. Native scrolling only (no smooth-scroll libraries).
- `src/components/motion/SplitReveal.tsx`: a heading whose lines rise out of masks as it comes into
  view. Use it for section headings that deserve it, not for every line of text.
- `src/components/motion/RollText.tsx`: letters roll up on hover (CSS only), for strong links.
- Homepage patterns to reuse or adapt: `PathFilm` (pinned, scroll-scrubbed sequence on a sticky
  stage), `PathTrack` (pinned horizontal travel with a drawn brass line; vertical on phones),
  `WorkScenes` (sections whose background and ink travel from one client palette to the next, media
  drifting at two depths), `Beyond` (a list whose preview follows the pointer), `HomeEnd` (the ivory
  offer and the large rolling booking link).
- Page transitions are on: the layout wraps each page in a React `<ViewTransition update="page-swap">`.
  A work preview and its case page share an image: wrap the case's desktop capture in
  `<ViewTransition name={`case-${slug}`} share="case-morph" default="none">` on both sides (the homepage
  already does this). Never two elements with the same name on one page.
- Reduced motion: no movement, everything readable. No scripts: everything readable. Pinned and
  scrubbed layouts switch on only under `@media (scripting: enabled) and (prefers-reduced-motion:
  no-preference)`; their resting state must not depend on JavaScript to look right on first paint.
- GSAP owns the transforms it animates. Never centre an animated element with the CSS `translate`
  property (GSAP clears it); centre it with a wrapper instead. When CSS sets a starting state that GSAP
  then animates, use the same transform component (or only opacity) and explicit `fromTo` values.
- Choreograph each page: one strong moment per page, then calm, purposeful motion. Not the same
  fade on everything.

## Never (the AI slop check)

- the default hero (big headline, grey subline, two buttons, a reassurance line); small uppercase
  eyebrows; numbered steps (01, 02, 03); four-step "how it works" rows
- grids of same-sized rounded cards with soft shadows and icons; pill tags and badges; check-mark lists;
  stat counters; gradient blobs; glassmorphism
- the same fade-up on everything; symmetric layouts throughout
- copy patterns: "not X, just Y", lists of three, rhetorical questions as headings

## Content

Keep the wording that is there (Kareem approves every word) unless the new layout cannot hold it;
list any change in your report. No em or en dashes. First person "I". Facts only from the content
files. Never submit the booking form against the real API.

## Quality

Phones first (390 wide, then 360, 768, 1024, 1440). 44px targets, visible focus (the ring colour is
`--focus`; on client grounds opt in with `--focus: var(--case-focus)`), alt text, one h1, no layout
shift, accurate image `sizes`. Defer heavy GSAP setup for offscreen sections. Check with
`scripts/audit/scrollsheet.mjs` (scroll contact sheets), `frames.mjs`, `controls.mjs`, `motion.mjs`,
`images.mjs`, `shot.mjs`. Dev server: http://localhost:4321 (do not start another; do not run
`next build`). `npx tsc --noEmit` and `npx eslint` on your folders must be clean. Do not commit.
