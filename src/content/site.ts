// One place for the name, contact details and booking links, so a new name or
// booking tool later is a change here, not a rebuild.
export const SITE = {
  name: 'Kareem Hassanein',
  descriptor: 'Websites, booking, search and ads for independent practices',
  url: 'https://www.khassanein.bio',
  email: 'kareem.hassanein@gmail.com',
  linkedin: 'https://www.linkedin.com/in/kareemhassanein',
  location: 'Burlington, Ontario',
  reply: 'Replies within one business day',
  // Swap for the Cal.com link once it exists; every booking button reads this.
  bookingHref: '/book',
  checkHref: '/book/check',
  // Shared with kinetikarephysio.com so search engines connect the physiotherapist and the digital work.
  personId: 'https://www.kinetikarephysio.com/#person',
  orgId: 'https://www.khassanein.bio/#practice',
} as const;

export const NAV = [
  { href: '/work', label: 'Work' },
  { href: '/firms', label: 'Law firms' },
  { href: '/clinics', label: 'Clinics' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/about', label: 'About' },
] as const;

export const FOOTER_NAV = [
  { href: '/work', label: 'Work' },
  { href: '/firms', label: 'Law firms' },
  { href: '/clinics', label: 'Clinics' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/notes', label: 'Notes' },
  { href: '/about', label: 'About' },
  { href: '/ai', label: 'How I use AI' },
  { href: '/privacy', label: 'Privacy' },
] as const;
