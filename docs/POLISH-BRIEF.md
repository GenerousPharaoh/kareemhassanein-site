# Polish pass: brief for the auditing agents

Read `docs/REBUILD-BRIEF.md` first; every rule there still applies (voice, no em dashes, no new
dependencies, nothing to `main`, the lead commits).

Kareem's words: audit every button, every transition and every micro-animation, and make sure it
all runs smoothly and looks and functions exceptionally. This pass is that audit, and the fixes.
The site must feel calm, exact and expensive: nothing jumps, flashes, lags, clips or wobbles, and
every control answers a touch or a click at once.

## What "exceptional" means here (the standard you audit against)

### Motion
- One timing system, defined in `src/app/globals.css`: `--dur-press` (120ms), `--dur-hover`
  (200ms), `--dur-ui` (320ms), `--dur-move` (560ms); curves `--ease-out` (entrances and most
  movement), `--ease-in-out` (things that travel and settle), `--ease-in` (exits), `--ease-colour`
  (colour and shadow). Replace stray values (`0.25s ease`, `0.3s`, `0.35s`) with these tokens unless
  a component has a written reason for its own timing (the hero stage's story beats do).
- Anything that moves uses `transform` or `opacity` only. Colour, background and shadow changes are
  fine on small elements; never animate width, height, top, left, margin, padding or font-size.
- Exits are faster than entrances. Nothing animates on first paint except the planned `data-enter`
  entrances. Nothing replays because React re-rendered.
- No double exposures: when one surface replaces another (the phone menu over the page, a tab
  panel, a slide), the old one must not show through the new one's type mid-transition. Prefer an
  opaque surface that arrives quickly with its content staggered in after.
- Reduced motion (`prefers-reduced-motion: reduce`): no movement at all, state changes are instant
  or a short fade, videos do not autoplay, smooth scrolling is off. Check every component.
- Frame budget: in the production build at 4x CPU slowdown on a phone profile, interactions drop no
  frames and scrolling drops under 1 percent. Every moving animation runs on the compositor.

### Controls (every button, link, tab, toggle, slider, disclosure, form field)
- States, all designed and consistent across the site: rest, hover (only inside
  `@media (hover: hover)`), focus-visible (2px `--focus` ring, never clipped by `overflow: hidden`;
  put it on the card with `:has(:focus-visible)` when the link is stretched), pressed (`:active`,
  instant feedback on touch, for example a slight scale to 0.98 or a darker fill, within
  `--dur-press`), disabled, and for async actions loading, success and error.
- Touch targets at least 44 by 44px on phones (extend with a transparent `::before` or `::after` when
  the visual must stay compact; the audit tool measures pseudo-element hit areas).
- No default tap flash (removed globally); the pressed state replaces it.
- Text never wraps inside a button at 360px. Icons sit on the optical centre. Arrow nudges move the
  same distance everywhere.
- Every control has an accessible name; toggles expose state (`aria-pressed`, `aria-expanded`,
  `aria-selected`); live regions announce async results.

### House interaction patterns (use these everywhere so the site feels like one hand made it)
- Solid and ghost buttons: hover changes the fill or ring (`--dur-hover`, `--ease-colour`) and nudges
  the arrow 3px right (`--dur-ui`, `--ease-out`); pressed scales to 0.97 (`--dur-press`).
  `src/components/ui/ButtonLink` is the reference; match it in any other button.
- Text links: the underline colour strengthens on hover; no movement.
- Whole-card links (stretched link): hover lifts the card 3px and deepens its shadow (`--dur-ui`,
  `--ease-out`), media inside may scale to 1.02 over `--dur-move`; pressed scales the card to 0.99;
  the focus ring sits on the card via `:has(:focus-visible)`.
- Chips, tabs and toggles: colour and fill change only (`--dur-hover`); the selected one is solid ink
  or carries `aria-pressed` / `aria-selected` styling; no layout jump between states.
- Disclosures (FAQ `details`): the panel opens with a short height and opacity transition where the
  browser supports it (`::details-content` with `interpolate-size: allow-keywords`), instantly elsewhere;
  the plus icon rotates to a cross over `--dur-ui`.
- Copy and form feedback: a state change (Copied, Sent) cross-fades in place without moving
  neighbours, and is announced through a live region.

### Layout and finish
- Alignment to the container edges and to each other; consistent spacing rhythm; headings balance
  (no one-word last lines); images crop on purpose; radii and shadows come from a small set.
- No horizontal scroll at 360, 390, 768, 1024 or 1440 wide. No layout shift during load or
  interaction.
- The phone is the main device: judge everything at 390 wide first.

## Who owns what (edit only your own files)

- System and home: `src/app/globals.css`, `src/app/layout.tsx`, `src/app/page.tsx`,
  `src/app/not-found.tsx`, `src/components/{site,ui,media,home}/**`, `src/lib/**`.
- Work: `src/app/work/**`, `src/components/work/**`.
- Sales and pages: `src/app/{firms,clinics,pricing,about,book,ai,privacy,notes}/**`,
  `src/components/{sales,pages}/**`, `src/content/faq.ts`, `src/content/notes/**`.
- The lead owns `src/content/{site,cases,offers,path}.ts`, `next.config.ts` and the scripts.
  If you need a change in a file you do not own, send the lead a message (SendMessage to `main`)
  with the exact change; do not edit it yourself.
- Performance work beyond your own pages (fonts, CSS chunking, the cost of the first layout,
  video loading strategy) is a separate pass after this one; do fix image `sizes` and anything
  in your own files that makes a page slower.

## Tools (all headless, all in `scripts/`; the dev server is http://localhost:4321)

- `node scripts/audit/css.mjs --inventory`: every stylesheet; hover outside `(hover: hover)`,
  layout-property animation, `transition: all`, `:focus` without `-visible`, and an inventory of
  every duration and curve in use.
- `node scripts/audit/controls.mjs [/route ...] [--phone|--desktop]`: every control on the page:
  touch target size, accessible name, controls covered by other controls, the full keyboard Tab
  walk (each stop must be visible, on screen, and look different when focused, by pixel
  comparison), broken links and anchors, broken images, sideways overflow at 360px, console errors.
  With no route it runs every page (slow; prefer your own routes).
- `node scripts/audit/motion.mjs [/route ...] [--phone|--desktop] [--cpu=4] [--base=URL]`: scrolls
  the page, hovers every card and button, presses every in-page control (never links, never form
  submits), opens and closes the phone menu; reports dropped frames, long frames with their cause,
  layout shift, and every animation Chrome could not run on the compositor. Failure reason 8192 is
  a paint property (acceptable on small elements); anything else on a `transform` or `opacity`
  animation is a real problem.
- `node scripts/audit/frames.mjs /route "step;step;last-step" [--phone] [--rate=0.2] [--max=24]
  [--clip=<css>|viewport] [--name=label]`: a slow-motion contact sheet of one interaction (steps:
  hover, unhover, click, tap, focus, key, scroll, scrollby, wait, drag). Use it on every transition
  you judge, before and after fixing it, and look at the sheet. CSS module class names are hashed,
  so select with `[class*="Component-module"][class*="__name"]` or by role and aria attributes.
- `node scripts/audit/images.mjs [/route ...]`: every responsive image at phone 3x, laptop 1x and
  large 2x; lists files far larger than they are shown (a `sizes` that claims too much width) and
  ones too soft. Fix every "too big" in your area.
- `node scripts/shot.mjs /route [--phone|--desktop] [--full]`: still screenshots. Full-page phone
  captures taller than 16,384 device pixels repeat at the bottom (a Chrome limit), so check long
  phone pages screen by screen with `--y=`.
- Real numbers need the production build, which only the lead runs. Do not run `next build`.

Run one tool at a time; the machine is short of memory. Do not start another dev server.

## Layout notes from the build

- In Chrome a sticky grid item is bounded by the whole grid, not its own rows; wrap it if it must
  stop earlier.
- Client accent colours are too faint for small text on light grounds; use `--case-accent-text`
  (set by `paletteVars` in `src/lib/palette.ts`) for any small accent text, `--case-accent` for
  dots, rules and large type.

## Things already found (verify, then fix or confirm)

- Phone menu: fades in over the page, so its large links overlap the hero type mid-transition; no
  exit animation (it vanishes); links do not stagger. Make it an opaque sheet with the links
  arriving after, and a quick exit. Body scroll lock, focus trap and Escape exist; keep them.
- Hero stage (`HeroStage.module.css`): the typing effect animates `width` (layout each step);
  consider `clip-path: inset()` steps. Check every story beat with `frames.mjs`.
- Paint-property transitions are everywhere at `0.2s ease` or `0.25s ease`; move them to tokens.
- Sticky header shadow transitions on scroll; check it does not flicker at the threshold.
- The cards' focus ring was clipped by `overflow: hidden` on the homepage (fixed there with
  `:has()`); check every other card component for the same fault.

## Opportunity: page transitions (do this only if it can be flawless)

Next 16 with React 19.3 supports `<ViewTransition>` from `react` with no configuration; read
`node_modules/next/dist/docs/01-app/02-guides/view-transitions.md`. Two uses would make the site feel
slicker: a quiet cross-fade between pages (150 to 200ms, no sliding of the whole page), and a shared
element from a work card's image to the case page's hero image. Conditions: no added delay before
navigation, nothing during reduced motion, correct scroll position after navigating, works on
phone, no layout shift, no flash of the old page, no effect on the first-load performance numbers.
If any of that fails, leave it out and say why.

## How to work and report

1. Audit first, with evidence: run the tools on your routes at phone and desktop, then go through
   every control and transition by hand with `frames.mjs` and screenshots. Write
   `docs/polish/<your-area>.md`: one row per finding (where, what is wrong, why it matters, the fix,
   evidence path), most visible first.
2. Fix, in your own files only. Stay visually and verbally faithful to the design: polish, do not
   redesign, and do not change visible wording (Kareem approves every word; list wording you think
   is wrong in your report instead).
3. Re-verify every fix with the same tool and add the after evidence to the report. Run
   `npx tsc --noEmit` and `npx eslint` on your files. Do not commit.
4. Forms: never submit the real booking form against the real API. To see success and error states,
   intercept the request in your headless browser (`page.route('**/api/**', ...)`) and fulfil it
   yourself.
