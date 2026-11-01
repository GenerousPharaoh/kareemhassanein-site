// Questions owners ask about price, answered plainly, on /pricing.
// Keep answers short: a sentence or two, in the first person, with no promises of results and no numbers about me.
export type FaqItem = {
  q: string;
  a: string[];
  link?: { href: string; label: string };
};

export const PRICING_FAQ: FaqItem[] = [
  {
    q: 'Why fixed prices?',
    a: ['The price is for the result, not the hours. A slow week costs you nothing extra, and a quick one is not padded out.'],
  },
  {
    q: 'Why are larger practices quoted?',
    a: [
      'The prices here are set for one location and a small team. Group practices, several locations and larger firms have more to set up and more riding on it, so I quote them after the first call.',
    ],
  },
  {
    q: 'What is not included?',
    a: [
      'The bills for your own domain, hosting, booking system and other software. They stay in your name and you pay them directly, so they keep working whoever looks after the site.',
    ],
  },
  {
    q: 'Do you guarantee results?',
    a: ['No. I report what happened, bookings or signed clients by source, and you judge the work on that.'],
  },
];
