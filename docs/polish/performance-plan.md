# Performance pass: findings and plan

Measured on the production build of commit 5038980 with `scripts/perf.mjs` (phone profile: 390
wide, 4x CPU slowdown, 1.6 Mbps, 150 ms latency; sizes are compressed transfer).

| route | LCP | LCP element | CLS | TBT | HTML | JS | CSS | images | fonts | video |
|---|---|---|---|---|---|---|---|---|---|---|
| / | 2308 | h1 | 0 | 652 | 17 | 148 | 25 | 152 | 99 | 0 |
| /work | 1560 | lede | 0.019 | 306 | 13 | 153 | 25 | 415 | 99 | 501 |
| /work/tax-relief-counsel | 2004 | video | 0 | 1113 | 14 | 153 | 25 | 299 | 99 | 501 |
| /firms | 1828 | lede | 0 | 963 | 14 | 150 | 26 | 140 | 99 | 412 |
| /clinics | 2036 | lede | 0 | 1191 | 16 | 150 | 26 | 71 | 99 | 0 |
| /pricing | 2088 | h1 | 0 | 520 | 11 | 148 | 25 | 0 | 99 | 0 |
| /about | 2020 | img | 0 | 464 | 10 | 148 | 26 | 63 | 99 | 0 |
| /book | 2024 | h1 | 0 | 1389 | 8 | 152 | 25 | 0 | 99 | 0 |
| /notes | 1224 | summary | 0 | 185 | 7 | 148 | 27 | 0 | 99 | 0 |

Targets for the phone profile: LCP under 1.8 s on every page (aim for 1.2 s), TBT under 200 ms,
CLS 0, JavaScript under 130 KB, CSS under 15 KB per page, fonts under 70 KB, no video bytes before
the page has loaded.

## Findings

1. **Main-thread layout dominates the first frame.** Every page has one long first frame (0.9 to
   1.9 s under 4x slowdown). Chrome's metrics put layout at 250 to 935 ms and style at 100 to 300 ms,
   against about 150 ms of script. Candidates to measure one at a time: `content-visibility: auto`
   with `contain-intrinsic-size: auto <height>` on sections below the first screen (likely the
   biggest win on long pages); `text-wrap: pretty` on every paragraph and `balance` on every heading
   (measure the cost; keep balance on headings if cheap); the number of size containers
   (`container-type` on every phone frame); a second full layout when the web fonts swap in.
2. **CSS ships for every page on every page.** The production build emits one 78 KB stylesheet
   (plus 24 KB and 4.5 KB) that every route loads, including the home hero stage's styles on
   /pricing and /notes. Try `experimental.cssChunking` (`'strict'`, then `false`) in
   `next.config.ts` and compare the CSS each route loads; keep whichever gives per-route CSS
   without breaking cascade order.
3. **Fonts are 99 KB.** Check which files and weights `next/font` ships (Schibsted Grotesk, Geist,
   Geist Mono); keep only the weights the design uses, confirm the fallback metric adjustment is on
   (no swap shift), and keep preloads to the fonts on the first screen.
4. **Video loads at page load.** Pages with a loop in the first screen pull 400 to 640 KB of video
   while the page is still loading on slow 4G. Start loading only after the `load` event and when
   the loop is on screen; serve smaller phone encodes (`<source media>` works again in Chrome 120+,
   Safari and Firefox); show the poster and a play control with no download when the visitor has
   Save-Data on or a 2G/3G connection.
   Several loops can play at once (the /work index): in headless dev the desktop hover phase drops about
   9% of frames, the same with every card transition off and about 0% with the videos stopped, so it is
   video decoding (software in headless; hardware on real devices, but still battery). Consider letting
   only the loop most in view play.
5. **JavaScript is about 150 KB.** Inspect the chunks: most is React and the Next runtime; check
   that no client component pulls content modules or large helpers into the bundle.
6. **/book rendered on demand** because it read `?topic=check` on the server. Done in the polish
   pass: /book and a new /book/check are both static, and the old query link redirects.

## Method

Change one thing at a time, rebuild, run `node scripts/perf.mjs --runs=3 --causes` against the
production server, and keep a change only when it measurably helps without any visible
difference (compare screenshots before and after with `scripts/shot.mjs`).
