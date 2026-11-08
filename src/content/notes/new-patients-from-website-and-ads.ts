import type { Note } from './types';

export const newPatientsSource: Note = {
  slug: 'new-patients-from-website-and-ads',
  title: 'How to see which new patients came from your website and ads',
  summary:
    'What you can count when your booking system reports bookings, what to do when it cannot, and how to keep patient information out of it.',
  audience: 'For dental and medical practices',
  month: '2026-10',
  monthLabel: 'October 2026',
  cases: ['physiomax', 'endorphins'],
  check:
    'The website check covers your booking links, integrations and tracking, including what the booking system can report, with a fixed price for each recommended fix.',
  body: [
    {
      type: 'p',
      text: 'To see which new patients came from your website or ads, first check whether your booking system can send completed bookings to Google. That determines which tracking you can use.',
    },
    { type: 'p', text: 'Both situations can be measured. They need different set-ups.' },
    { type: 'h2', id: 'when-it-reports', text: 'When your booking system reports bookings' },
    {
      type: 'p',
      text: 'Some online booking systems send a booking event to Google Analytics and Google Ads themselves. Jane, for example, does it through its Google integration. Once it is set up, each online booking appears in Analytics with the source that brought the visitor, and the booking can be the conversion your ads count.',
    },
    { type: 'p', text: 'Check these settings after connecting the booking system:' },
    {
      type: 'ul',
      items: [
        '**It reports to the right accounts.** At PhysioMax, the booking system’s Google integration sent bookings to the ads account but not to Analytics, and a separate setting pointed at a different Analytics property. Bookings had never reached the clinic’s reports.',
        '**It counts bookings, not clicks or page views.** A booking event should fire once per completed booking. A click on Book is not a booking, and neither is a page that patients reopen to check their appointment.',
        '**The visit keeps its source.** Booking usually happens on the booking system’s own web address. Unless Analytics treats your site and the booking site as one visit, which Google calls cross-domain measurement, a booking that started with an ad can show up as coming from your own website.',
      ],
    },
    {
      type: 'p',
      text: 'An online booking is not necessarily a new patient. Existing patients book online too, so this gives you all online bookings by source. The monthly check below is where you separate new patients from returning ones.',
    },
    { type: 'h2', id: 'when-it-cannot', text: 'When your booking system cannot report bookings' },
    {
      type: 'p',
      text: 'Some booking and practice management systems cannot send bookings to Google. Depending on what the system supports, a confirmation page, a request form and call tracking can provide additional counts.',
    },
    { type: 'h3', text: 'A confirmation page on your own site' },
    {
      type: 'p',
      text: 'If your booking or request form can send people to a web address when they finish, point it at a confirmation page on your own site and count each visit as a booking. Keep the page out of search results and your menus, so the only way to reach it is to finish booking, and count it once per visit so a reload does not add another.',
    },
    {
      type: 'p',
      text: 'If the system cannot send people anywhere, a short request form on your own site is the fallback: the patient asks for a time, the front desk confirms it, and you count each delivered request.',
    },
    { type: 'h3', text: 'Call tracking' },
    {
      type: 'p',
      text: 'Many new patients phone instead of booking online, and a count of online bookings misses them. Google Ads can count calls from your ads, and a forwarding number shown to visitors who arrived from an ad can count calls from your site as well. Set a minimum call length, so wrong numbers and hang-ups do not count.',
    },
    {
      type: 'p',
      text: 'Keep your real number on your Google Business Profile, in directories and on printed material. And count calls without recording them: calls to a practice are full of health information that does not belong in a call tracking account.',
    },
    { type: 'h3', text: 'A monthly check against the front desk' },
    {
      type: 'p',
      text: 'Ask every new patient how they found you, when they book or at their first visit, and record the answer in a field with fixed choices: Google search, Google Maps, an ad, a friend or family member, another practitioner, other. A free-text field fills with spelling variations, and an optional one is often left blank.',
    },
    {
      type: 'p',
      text: 'Once a month, put three counts side by side: new patients by source from your practice system, bookings and calls in Google Ads, and website bookings in Analytics. Use totals; a report that lists patients by name does not need to leave the practice system.',
    },
    {
      type: 'p',
      text: 'The three will rarely match exactly. People remember differently, and someone who saw an ad may search your name before calling. You are looking for the trend, and for gaps large enough to mean something is broken.',
    },
    { type: 'h2', id: 'patient-privacy', text: 'Patient information and tracking' },
    {
      type: 'p',
      text: 'None of this needs patient information in Analytics or Google Ads. Counting that a booking happened, where the visitor came from and, if you like, a value, is enough.',
    },
    {
      type: 'ul',
      items: [
        '**Keep identifying details out.** No names, emails, phone numbers, birth dates or reasons for visit in page addresses, event names or event details. Check your forms and confirmation page: some put what a patient typed into the web address, and Analytics records the address of every page it sees.',
        '**Leave out what a booking was for.** If your booking system sends the name of the treatment, make sure it cannot reveal a condition.',
        '**Decide on purpose before sending customer data to Google.** Google Ads can send a hashed copy of the email address or phone number a person entered with each conversion, to match it to their Google account. For a health practice, that should be a deliberate choice your privacy policy describes. In my own practice’s account, it is off.',
        '**Keep patient lists out of advertising.** Ad platforms offer to match a customer list to their users. For a health practice, a patient list is health information.',
        '**Say what you measure.** Your privacy policy should explain in plain words what the site counts and which services receive it, and cover any health information your forms collect.',
        '**Ask for consent where it is required.** If the rules that apply to your practice require consent before analytics or ad tags run, use a banner that holds the tags until the visitor agrees. A banner that only shows a message does not do that.',
      ],
    },
  ],
};
