// Which captures the site uses. Sources live outside the repo, in the capture folder
// (C:\Work\Portfolio\captures-2026-10, or a case's captureRoot); `npm run assets` turns them into responsive
// AVIF/WebP files under public/work-media and writes src/content/media.generated.ts.
export const CAPTURES = 'C:/Work/Portfolio/captures-2026-10';

// still: [source path relative to the case folder, output name, options]
// options.crop: sharp extract box in source pixels; options.ba: also export a before/after copy
export const ASSETS = {
  'tax-relief-counsel': {
    dir: 'trc',
    stills: [
      ['stills/home-hero--desktop.png', 'home-hero--desktop', { ba: true }],
      ['stills/home-hero--phone.png', 'home-hero--phone', { ba: true }],
      ['stills/home-decoder--desktop.png', 'decoder--desktop'],
      ['stills/home-decoder--phone.png', 'decoder--phone'],
      ['stills/home-practice--desktop.png', 'practice--desktop', { crop: { left: 0, top: 0, width: 2880, height: 1500 } }],
      // The headline, for the introduction's "the website"
      ['stills/home-hero--desktop.png', 'chip-headline', { crop: { left: 112, top: 548, width: 1176, height: 560 } }],
      ['stills/home-map--desktop.png', 'map--desktop'],
      ['stills/audits-figure--desktop.png', 'audits-figure--desktop'],
      ['stills/audits-top--desktop.png', 'audits-top--desktop', { ba: true }],
      ['stills/audits-top--phone.png', 'audits-top--phone'],
      ['stills/consult--desktop.png', 'consult--desktop'],
      ['stills/consult--phone.png', 'consult--phone'],
      ['stills/attorney--desktop.png', 'attorney--desktop'],
      ['before/old-home-hero--desktop.png', 'old-home-hero--desktop', { ba: true, only: 'ba' }],
      ['before/old-home-hero--phone.png', 'old-home-hero--phone', { ba: true, only: 'ba' }],
      ['before/old-audits-top--desktop.png', 'old-audits-top--desktop', { ba: true, only: 'ba' }],
    ],
    loops: [
      ['loops/hero-arrive--desktop.mp4', 'hero-arrive--desktop'],
      ['loops/hero-arrive--phone.mp4', 'hero-arrive--phone'],
      ['loops/home-scroll--phone.mp4', 'home-scroll--phone'],
      ['loops/home-scroll--desktop.mp4', 'home-scroll--desktop'],
      ['loops/decoder--desktop.mp4', 'decoder--desktop'],
      ['loops/map--desktop.mp4', 'map--desktop'],
    ],
  },
  endorphins: {
    dir: 'endorphins',
    stills: [
      ['stills/home-hero--desktop.png', 'home-hero--desktop'],
      ['stills/home-hero--desktop.png', 'home-hero-ba--desktop', { ba: true, only: 'ba', crop: { left: 0, top: 0, width: 2880, height: 1414 } }],
      ['stills/home-hero--phone.png', 'home-hero--phone'],
      ['stills/home-index--desktop.png', 'index--desktop'],
      ['stills/lp-physio--desktop.png', 'lp-physio--desktop'],
      ['stills/lp-physio--phone.png', 'lp-physio--phone'],
      ['stills/team--desktop.png', 'team--desktop'],
      ['stills/team--phone.png', 'team--phone'],
      // The clinic's Google Maps listing (captured 2026-10-27), cut above the hours row, whose open or
      // closed state depends on the time of capture; the pin alone for the home introduction
      ['stills/maps-listing--desktop.png', 'maps-listing--desktop', { crop: { left: 144, top: 0, width: 1687, height: 1205 } }],
      ['stills/maps-listing--desktop.png', 'maps-pin', { crop: { left: 1374, top: 815, width: 100, height: 100 } }],
      // The ad page's booking button and next openings, for the home introduction
      ['stills/lp-physio--desktop.png', 'lp-book--desktop', { crop: { left: 236, top: 1080, width: 704, height: 276 } }],
      // The map around the pin and the Book Appointment button, for "the Google profile" and "booking"
      ['stills/maps-listing--desktop.png', 'chip-map', { crop: { left: 1240, top: 690, width: 640, height: 305 } }],
      ['stills/lp-physio--desktop.png', 'chip-book', { crop: { left: 2232, top: 80, width: 452, height: 164 } }],
      ['before/old-home-hero-sept--desktop.png', 'old-home-hero--desktop', { ba: true, only: 'ba' }],
    ],
    loops: [
      ['loops/index-hover--desktop.mp4', 'index-hover--desktop'],
      ['loops/home-scroll--phone.mp4', 'home-scroll--phone'],
      ['loops/lp-scroll--phone.mp4', 'lp-scroll--phone'],
    ],
  },
  physiomax: {
    dir: 'physiomax',
    stills: [
      ['stills/home-hero--desktop.png', 'home-hero--desktop', { ba: true }],
      ['stills/home-hero--phone.png', 'home-hero--phone'],
      ['stills/home-care--desktop.png', 'care--desktop', { crop: { left: 0, top: 0, width: 2560, height: 1500 } }],
      ['stills/home-clinic--desktop.png', 'clinic--desktop'],
      ['stills/treat--desktop.png', 'treat--desktop'],
      ['stills/treat--phone.png', 'treat--phone'],
      ['stills/service--desktop.png', 'service--desktop', { ba: true }],
      ['stills/service--phone.png', 'service--phone'],
      ['before/old-home-hero-aug--desktop.png', 'old-home-hero--desktop', { ba: true, only: 'ba' }],
      ['before/old-service-aug--desktop.png', 'old-service--desktop', { ba: true, only: 'ba' }],
    ],
    loops: [
      ['loops/treat-chart--desktop.mp4', 'treat-chart--desktop'],
      ['loops/home-scroll--phone.mp4', 'home-scroll--phone'],
    ],
  },
  kinetikare: {
    dir: 'kinetikare',
    captureRoot: 'C:/Work/Portfolio/captures-2026-11',
    stills: [
      ['stills/home-hero--desktop.png', 'home-hero-2026-11--desktop'],
      ['stills/home-hero--phone.png', 'home-hero-2026-11--phone'],
      ['stills/home-journey--desktop.png', 'journey-2026-11--desktop'],
      ['stills/home-atlas--desktop.png', 'atlas-2026-11--desktop'],
      ['stills/home-services--desktop.png', 'services-2026-11--desktop', { crop: { left: 0, top: 0, width: 2880, height: 1800 } }],
      ['stills/knee-hub--desktop.png', 'knee-hub-2026-11--desktop'],
      ['stills/knee-hub--phone.png', 'knee-hub-2026-11--phone'],
      ['stills/condition--desktop.png', 'condition-2026-11--desktop', { ba: true }],
      ['stills/condition--phone.png', 'condition-2026-11--phone', { ba: true }],
      ['stills/condition-quiz--desktop.png', 'quiz-2026-11--desktop'],
      ['stills/knee-evidence--desktop.png', 'evidence-2026-11--desktop', { crop: { left: 0, top: 0, width: 2880, height: 1700 } }],
      ['stills/heel--phone.png', 'heel-2026-11--phone'],
      ['before/old-condition-sept--desktop.jpg', 'old-condition--desktop', { ba: true, only: 'ba' }],
      ['before/old-condition-sept--phone.jpg', 'old-condition--phone', { ba: true, only: 'ba' }],
    ],
    loops: [
      ['loops/condition-scroll--phone.mp4', 'condition-scroll-2026-11--phone'],
      ['loops/quiz--desktop.mp4', 'quiz-2026-11--desktop'],
      ['loops/home-scroll--phone.mp4', 'home-scroll-2026-11--phone'],
      ['loops/atlas-scroll--desktop.mp4', 'atlas-scroll-2026-11--desktop'],
    ],
  },
  'techniques-combat': {
    dir: 'techniques',
    stills: [
      ['stills/hero-burst--desktop--t7000.png', 'home-hero--desktop', { ba: true }],
      ['stills/hero-burst--phone--t8500.png', 'home-hero--phone', { ba: true }],
      ['stills/hero-burst--phone--t2500.png', 'home-hero-alt--phone'],
      ['stills/home-campaign--desktop.png', 'campaign--desktop'],
      ['stills/product--desktop.png', 'product--desktop', { ba: true }],
      ['stills/product--phone.png', 'product--phone'],
      ['stills/collection--desktop.png', 'collection--desktop'],
      ['before/old-home-hero--desktop.png', 'old-home-hero--desktop', { ba: true, only: 'ba' }],
      ['before/old-home-hero--phone.png', 'old-home-hero--phone', { ba: true, only: 'ba' }],
      ['before/old-product--desktop.png', 'old-product--desktop', { ba: true, only: 'ba' }],
    ],
    loops: [
      ['loops/hero-film--desktop.mp4', 'hero-film--desktop'],
      ['loops/hero-film--phone.mp4', 'hero-film--phone'],
      ['loops/film-strip--desktop.mp4', 'film-strip--desktop'],
      ['loops/product-scroll--phone.mp4', 'product-scroll--phone'],
    ],
  },
  'travel-journal': {
    dir: 'travel',
    stills: [
      ['stills/home-hero--desktop.png', 'home-hero--desktop'],
      ['stills/home-hero--phone.png', 'home-hero--phone'],
      ['stills/home-hello--desktop.png', 'hello--desktop'],
      ['stills/travels-top--desktop.png', 'travels-top--desktop'],
      ['stills/travels-top--phone.png', 'travels-top--phone'],
      ['stills/travels-stamps--desktop.png', 'stamps--desktop'],
      ['stills/footer--desktop.png', 'footer--desktop'],
    ],
    loops: [
      ['loops/opening--desktop.mp4', 'opening--desktop'],
      ['loops/home-chapter--desktop.mp4', 'chapter--desktop'],
      ['loops/travels-scroll--phone.mp4', 'travels-scroll--phone'],
    ],
  },
  wedding: {
    dir: 'wedding',
    stills: [
      ['stills/hero--desktop.png', 'hero--desktop'],
      ['stills/hero--phone.png', 'hero--phone'],
      ['stills/welcome--desktop.png', 'welcome--desktop'],
      ['stills/day--desktop.png', 'day--desktop'],
      ['stills/day--phone.png', 'day--phone'],
      ['stills/story--desktop.png', 'story--desktop', { crop: { left: 0, top: 0, width: 2752, height: 2400 } }],
    ],
    loops: [
      ['loops/opening--desktop.mp4', 'opening--desktop'],
      ['loops/opening--phone.mp4', 'opening--phone'],
      ['loops/home-scroll--phone.mp4', 'home-scroll--phone'],
    ],
  },
};
