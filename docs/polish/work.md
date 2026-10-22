# Polish pass: the work area

Routes: `/work` and the seven case pages. Files: `src/app/work/**`, `src/components/work/**`.
Judged at 390 wide first, then 360, 375x667, 768, 1024, 1440 and 1920. Evidence paths are under
`output/` in the repo (git-ignored); helper scripts I wrote for this pass are listed at the end.

## Findings, most visible first

| # | Where | What was wrong | Fix | Evidence (before, after) |
|---|---|---|---|---|
| 1 | `/work` filter chips, the list below them | Changing the filter was a double exposure: under "Clinics" the navy Tax Relief Counsel card faded out while Endorphins slid up from below the fold through it, both half visible for about 150ms. Under "Beyond practices" cards flew up from 2,000px below. The default root cross-fade also blended the chips, so for about 100ms both the old and the new chip sat half filled. | A choreographed fade-through (`WorkFilter.tsx`, `WorkFilter.module.css`). Before the transition the filter attribute is flipped, measured and flipped back in one task (never painted), so it is known which items on screen stay, leave, arrive or move. Only items on screen are named. What stays is left alone (no flicker, live video). What leaves fades out where it is (`--dur-hover`, `--ease-in`). What arrives or moves rises into place after the exit (`--dur-ui`, `--ease-out`, delayed `--dur-hover`). The page itself swaps at once. Scoped by the transition type `work-filter`, so it never touches another view transition. Clicks pass through during it. Reduced motion, or a browser without transition types and classes: instant. Without JavaScript: the chips are hidden and every case shows. | Before: `output/frames/filter-clinics-desktop-before.jpg` (frames 3 to 8), `output/frames/filter-firms-desktop-before.jpg`. After: `output/frames/filter-clinics-desktop-after.jpg`, `output/frames/filter-beyond-desktop-after.jpg`, `output/frames/filter-back-all-desktop-after.jpg`, `output/frames/filter-beyond-phone-final.jpg` |
| 2 | Filter chips, selection | When the selection moved, each chip's label passed through a fill of its own colour (ink on mid-grey, then light on mid-grey), so a label vanished for a few frames. | The new choice fills at `--dur-press` while the old one releases at `--dur-hover`; the label colour changes in one step about a third of the way in, where the fill is mid-grey (lowest contrast about 3.6:1, never invisible). | Before: `output/frames/filter-beyond-phone-after.jpg` (frames 2 to 6). After: `output/polish-work/frames/chips-select-zoom-final.jpg` |
| 3 | Before and after sliders on phones (shared `BeforeAfter`, fixed by the system agent) | Touch drags were driven by the transparent range input: the line moved in whole-percent steps (3.5px on a phone) and followed the input's thumb-inset mapping, up to about 7px off the finger near the edges (finger at 15% gave 13%). The Before and After tags stayed in their corners and labelled the wrong image once the line passed them. | Reported with the exact change; the system agent made the range ignore pointers, captured on the stage, and hid each tag when the line reaches it. Re-checked with CDP touch: the line follows the finger exactly, the page does not scroll. | Before: `output/polish-work/frames/ba-touch-trc-before.jpg`. After: `output/polish-work/frames/ba-touch-trc-after.jpg` |
| 4 | `/work` first card on small phones | The scroll-linked reveal (`entry 0% entry 55%`) left the first card part-way through its entrance at rest: opacity 0.78 on a 375x667 phone, 0.93 at 360x740, so the first case looked washed out until you scrolled. | Range `entry 0% entry min(55%, 30vh)`: no change for short blocks, tall ones finish within a third of the screen. First set in my modules, then adopted globally by the system agent; my overrides are removed. | Before: `output/polish-work/reveal-before.txt`. After: `output/polish-work/reveal-after.txt` (empty: nothing on screen rests part-drawn at the top or bottom of any work page, at four screen sizes), `output/polish-work/frames/reveal-pairs-phone-after.jpg` |
| 5 | `/work` first screen on load | The title and lede rose in while the chips, the group heading and the first card were already fully drawn, so the text looked late rather than choreographed (the case header animates its whole first screen in order). | The chips (`--i: 2`) and the list (`--i: 3`) join the entrance. Both are wrappers the filter never hides, so the entrance plays once and never replays on a filter change. | Before: `output/polish-work/frames/load-work-phone-before.jpg`. After: `output/polish-work/frames/load-work-phone-after.jpg` |
| 6 | Image weight, case headers and galleries | 36 `sizes` mismatches across the case pages. The worst: on Endorphins and KinetiKare the header plate (shared `Plate` defaults, `90vw`) made a 390px phone at 3x download the 1600 file for a 314px slot, the page's LCP image (Endorphins 63KB instead of 33KB, KinetiKare 38KB instead of 21KB). The phone row claimed 64vw or 260px for phones 248px or 157px wide; phone sliders claimed `calc(100vw - 40px)` for a 326px frame; the live header phone under-claimed at 360. | Honest `sizes` from the real geometry, in `layout.ts`: `phoneRowSizes(count)` (the row's width depends on how many phones share it), `pairSizes()` (340px frame, 7px bezel), a cap for a capture alone in its row, `LIVE_PHONE_SIZES`; the next-case peek corrected to 705px. The Plate defaults now carry the same values (system agent), so the header relies on them. | Before: `output/polish-work/images-before.txt`, `output/polish-work/sizes-before.txt`. After: `output/polish-work/images-after.txt` ("Every image downloads about the size it is shown at"), `output/polish-work/sizes-after.txt` (0 mismatches at 9 screen sizes) |
| 7 | `/work` card hover | The hover animated `box-shadow` on the whole card for 600ms (a full repaint every frame; 32 animations Chrome could not composite per visit), lifted 4px and nudged the arrow 4px, off the house values. | The deeper shadow is a `::before` layer that fades its opacity (compositor). Lift 3px over `--dur-ui`, media scale over `--dur-move`, arrow 3px. With reduced motion only the shadow fades in. | Before: `output/polish-work/motion-before-1.txt` (CaseCard box-shadow x32), `output/frames/card-hover-compact-desktop-before.jpg`. After: `output/polish-work/motion-after.txt` (none), `output/polish-work/frames/card-press-desktop-after.jpg` |
| 8 | `/work` card pressed state | Pressed feedback existed only on touch screens, and any press inside the card, including the loop's pause button, shrank the card as if opening the case. | `.card:has(.link:active)`: scale 0.99 at `--dur-press` with any input (lift plus press under a pointer). A 50ms wait on touch keeps the list from pulsing when a scroll starts on a card. Pressing the pause button leaves the card alone and toggles the loop without navigating. | After: `output/polish-work/frames/card-press-desktop-after.jpg` (rest, hover -3px, pressed 0.99 within 60ms, released, rest), `output/polish-work/frames/card-pause-press-desktop-after.jpg` |
| 9 | Focus rings on dark case grounds | The focus blue measured 2.88:1 on Tax Relief Counsel's navy and 3.08:1 on the travel journal's, under the 3:1 a focus indicator needs (case header back link, loop buttons in the screens band, next-case band). | The header, the screens band and the next-case band opt in to `--case-focus` (the system agent's token: `#8ab4ff` on dark grounds, 7:1 or more). Paper sections and the `/work` card rings, which sit on paper, keep the page blue. | Before: `output/polish-work/tab-back-trc-before.png`. After: `output/polish-work/tab-back-trc-token.png`, `output/polish-work/tab-band-pause-trc-after.png`, `output/polish-work/tab-next-kinetikare-token.png` |
| 10 | Card focus ring | The ring was drawn by the link's stretched `::after`; correct visually, but not the house pattern and it did not follow the card. | Ring on the card itself with `:has(.link:focus-visible)` (2px, 4px offset, follows the radius and the lift). | Before: `output/frames/card-focus-compact-before.jpg`. After: `output/polish-work/tab-card-compact-after.png` |
| 11 | `/work` card loop button on phones | Below 600px the card's phone is hidden, yet the loop's play and pause button was still pushed to the bottom left as if the phone covered the corner. | Moved left only from 600px, where the phone shows. | After: `output/polish-work/work-phone-700-after.jpg` (the before shot from the first pass was overwritten) |
| 12 | `/work` "Beyond practices" filter | Shown alone, the second group kept its large top padding, so its heading sat about twice as far below the chips as "Law firms and clinics" does under "All". | `padding-top: 0` on that group when it is the only one shown. | Before: `output/frames/filter-beyond-phone-after.jpg` (frames 14 to 18). After: `output/frames/filter-beyond-phone-final.jpg` |
| 13 | Filter chips, states | "All" was 43 by 44px on phones; no pressed state; timings `0.25s ease`; in the phone scroll row the 4px padding would clip a focus ring (it needs 5px). | `min-width: 44px`; pressed fill `--paper-2` at `--dur-press`; tokens throughout; 6px padding in the scroll row. | Before: `output/polish-work/controls-before-1.txt`. After: `output/polish-work/controls-after.txt` (all 16 route and device runs OK) |
| 14 | Next-case band | No pressed state; timings 0.8s and 0.35s; arrow nudge 4px; peek image `sizes` 640px for a 705px column. | Pressed: the page rises 8px and the arrow nudges at `--dur-press` (under a pointer the risen page gives back to 10px; 50ms wait on touch). Frame over `--dur-move`, arrow 3px over `--dur-ui`; honest `sizes`. | Before: `output/frames/nextcase-hover-desktop-before.jpg`. After: `output/polish-work/frames/nextcase-press-desktop-after.jpg` (rest 0, hover -14px, pressed -10px, released, rest) |
| 15 | Case header back link | Timings `0.2s ease` and `0.3s`; no pressed state; the arrow nudge ran with reduced motion. | Tokens; pressed turns it full ink at `--dur-press`; the nudge only without reduced motion. | `node scripts/audit/css.mjs --inventory`: no stray durations or curves left in the work area |
| 16 | `/work` layout shift on slow loads (CLS 0.019 in `docs/polish/performance-plan.md`) | Every card's kind label wraps to two lines in next/font's generated "Geist Mono Fallback" (an adjusted Arial) and fits on one in Geist Mono, so when the mono font swaps in after first paint the first card's text moves up 17px. Every real monospace font (Cascadia Mono, Consolas, Courier New, generic monospace) breaks exactly like Geist Mono. | Not my file: reported to the lead with the fix, `adjustFontFallback: false` on `Geist_Mono` in `src/app/layout.tsx`. | Reproduced with a throttled load (1 of 2 runs, 0.0195 at about 1.9s); line counts per card with and without the web font in the report |

## Verified, no change needed

- Case headers at 360, 390, 768, 1024 and 1440: the plate and phone overlap sits correctly for both
  header types (live loop and Plate); the entrance runs back link, kind and title, question, services,
  then the plate with the loop already running (`output/polish-work/frames/load-trc-phone-before.jpg`,
  `output/polish-work/screens/hdr-widths.jpg`).
- Scroll-linked reveals on the long case pages: tied to scroll position, so nothing can stay hidden
  after a fast scroll; with the new range a gallery or comparison row is fully drawn within about
  240px of scroll (`output/polish-work/frames/reveal-pairs-phone-after.jpg`).
- Rapid chip clicks (60ms apart, faster than the 520ms transition), phone and desktop: always end in
  the right state, the right pressed chip and the right announcement, with no transition names left
  behind and no errors.
- Keyboard: every Tab stop on all eight routes is visible and shows a focus change near the control;
  the loop pause buttons inside cards are reachable and their ring is not clipped.
- No horizontal overflow at 360 on any work route; no console errors.

## Open, not fixable in my files

- The filter's view transition shows one long frame (about 66ms) at the snapshot capture on desktop in
  headless Chrome, with no script attributed (software rendering); on a 3x phone profile 0.4% of
  frames drop. Worth one look on real hardware in the production build.
- `/work` drops about 9% of frames while hovering cards in headless dev; switching every card
  transition off changes nothing, stopping the videos takes it to 1 drop. It is software video
  decoding, already in the performance plan (let only the loop most in view play).
- The LoopVideo icon swap animates the `scale` property on `<svg>` icons, which Chrome cannot run on
  the compositor (reported to the lead; `transform: scale()` or a wrapping span fixes it).
- Page transitions (the brief's opportunity): left out. A card-to-hero morph cannot be made flawless
  from my files alone: the case header's `data-enter` entrance would fade the morph's target from
  0.01 opacity (and replay after the transition if suppressed during it), the root cross-fade and the
  home page's cards belong to the system agent, browser back and scroll restoration would need
  matching names on both pages, and prefetching differs between dev and production.

## Wording for Kareem (not changed)

- `src/content/cases.ts` line 302, KinetiKare hero loop label: "a few questions, never a diagnosis."
  A categorical "never"; perhaps "a few questions, not a diagnosis."
- `src/content/cases.ts` line 208, PhysioMax: "bookings had never reached it." A plain past fact,
  probably fine; listed because the brief avoids "never".
- The many "every" lines in the cases ("every old address mapped", "every practitioner bookable")
  state the scope of delivered work and read as facts, so I left them off this list.

## Helper scripts written for this pass (scratchpad, not in the repo)

In `C:\Users\karee\AppData\Local\Temp\claude\C--Users-karee\11484a63-bcea-4445-ba5c-a9ec5c895c14\scratchpad\polish-work\`:
`sizes-check.mjs` (sizes claim against rendered width, 9 screens), `reveal-probe.mjs` (part-drawn
reveals at rest), `screens.mjs` (screen-by-screen sheets), `load-frames.mjs` (first-load entrance in
slow motion), `press.mjs` (pressed states without navigating), `ba-touch.mjs` (CDP touch drag of a
slider), `filter-frames.mjs` and `filter-loaf.mjs` (frames and long frames while filtering),
`hover-ab.mjs` (hover cost A/B), `cls.mjs` (layout shifts on a throttled load), `font-fallback.mjs`
and `font-mono-test.mjs` (label wrapping per font), `chip-zoom.mjs`, `rapid.mjs`, `tab-to.mjs`.
