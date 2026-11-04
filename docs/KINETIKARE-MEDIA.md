# KinetiKare portfolio media

Refreshed from the public site on 3 November 2026 (Toronto time).

The current source captures live in `C:/Work/Portfolio/captures-2026-11/kinetikare`.
`scripts/work-assets.mjs` selects them through the case's `captureRoot`. Other cases
continue to use the October capture folder.

The refresh includes the home hero, the body-region guide, the care journey,
services, the knee hub, the kneecap condition page, its pattern check, the evidence
section and the plantar fasciitis page. It replaces the removed home sport strip
and topic grid. Captions describe the current layouts. The case gallery includes
the desktop body-region walkthrough and current phone walkthroughs. The homepage
wall and work listings use the refreshed media.

Desktop viewports are 1440 by 900; phone viewports are 390 by 844. Stills use two
and three pixels per CSS pixel respectively. The silent MP4 recordings are
compressed to 1600 pixels wide on desktop and 780 on phones, with WebP posters.
The capture browser blocks analytics and declines cookie consent. It does not
submit a booking or contact form.

The public case presents the current site as patient education and marketing
for a solo physiotherapy practice. Do not reintroduce before-and-after
comparisons or a redesign narrative. Historical comparison assets remain at
their existing URLs for cached pages, but are not part of the current case.

To repeat the refresh on this capture workstation:

```text
node scripts/capture-kinetikare.mjs
npm run assets -- kinetikare
```

The capture script uses the same Playwright installation as `scripts/shot.mjs`,
plus the existing capture helpers and FFmpeg in the October `_tools` folder.
It accepts `--stills`, `--loops` and `--filter=name` for a partial re-capture.
Source URL, timestamp, dimensions and video durations are recorded in the
source folder's manifests. Generated responsive images, posters, videos and
wall thumbnails belong in `public/work-media`; raw captures stay outside Git.

Updated public filenames include `2026-11` to distinguish these captures from
the archived version. The production media route revalidates cached files.
Keep historical filenames unchanged; use another version in the output names
and content references for a future capture refresh.
