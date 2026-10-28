import { pageMeta } from '@/lib/meta';
import { AskList } from '@/components/sales/AskList';
import { BuildList, type BuildItem } from '@/components/sales/BuildList';
import { CaseCardsSection } from '@/components/sales/CaseCards';
import { CloseCall } from '@/components/sales/CloseCall';
import { Faq } from '@/components/sales/Faq';
import { Hero } from '@/components/sales/Hero';
import { HeroPhone } from '@/components/sales/HeroPhone';
import { pickLine, pickLoop, requireCase } from '@/components/sales/pick';
import { PriceLine } from '@/components/sales/PriceLine';
import { Added, Removed, Wording } from '@/components/sales/Wording';
import { CLINIC_FAQ } from '@/content/faq';

export const metadata = pageMeta({
  title: 'Websites, online booking and Google Ads for clinics',
  description:
    'Websites, online booking, Google profiles, ads and tracking for clinics. I bring 13 years of experience in healthcare, across different roles.',
  path: '/clinics',
});

const ASKS = [
  'The Book button goes to the wrong place.',
  'We cannot tell which bookings and calls came from the website or the ads.',
  'Our agency’s numbers do not match the front desk.',
  'We are not sure what we are allowed to say.',
  'The site is slow on phones.',
  'Our Google listing is a mess.',
];

const BOOKING: BuildItem[] = [
  {
    title: 'Booking links straight to each practitioner and service',
    text: 'A patient who wants a particular practitioner or treatment lands on that calendar in one tap, not on a search through the whole clinic.',
  },
  {
    title: 'The next real openings, on your ad pages',
    text: 'Where the booking system allows it, a patient sees when they could actually be seen, before they decide.',
  },
  {
    title: 'Online bookings and calls, counted',
    text: 'In Analytics and Google Ads, so you know which bookings came from search, the site or an ad, and your ads learn from bookings, not clicks.',
  },
  {
    title: 'Online booking switched on properly, practitioner by practitioner',
    text: 'Every setting that can hide a practitioner’s times is checked in the booking system itself, so nobody shows an empty calendar by mistake.',
  },
  {
    title: 'Every account in the clinic’s name',
    text: 'The website, domain, Google profile, Analytics and ad account belong to the clinic, and your agency gets the access it needs and no more.',
  },
];

export default function ClinicsPage() {
  const endorphins = requireCase('endorphins');
  const physiomax = requireCase('physiomax');
  const kinetikare = requireCase('kinetikare');
  const facts = (c: typeof endorphins) => c.measured?.map((m) => m.fact);

  return (
    <>
      <Hero
        label="For clinics"
        title={
          <>
            From search to <em>seen.</em>
          </>
        }
        lede="Websites, online booking, Google profiles, ads and tracking for dental, medical and health clinics. I bring 13 years of experience in healthcare, across different roles. I build and run it myself, and every account stays in the clinic’s name."
        track="clinics-hero"
        specs={[
          { term: 'Booking', detail: 'Jane, or the system you already use' },
          { term: 'Wording', detail: 'To your college’s rules' },
          { term: 'Patient information', detail: 'Not needed, and never in AI tools' },
          { term: 'Your accounts', detail: 'Stay in the clinic’s name' },
        ]}
        aside={
          <HeroPhone
            palette={endorphins.palette}
            loop={pickLoop(endorphins, 'lp-scroll--phone')}
            domain={endorphins.domain}
            caption="Endorphins: its physiotherapy ad page, with the next openings read live from Jane."
          />
        }
      />

      <AskList
        id="clinic-asks"
        title="What clinic owners ask me to fix"
        items={ASKS}
        note="These are often connected. When bookings are not counted where they happen, the agency’s report and the front desk’s calendar will not agree."
      />

      <BuildList
        id="clinic-booking"
        label="Booking"
        title="Booking, done properly"
        intro="A patient who has decided to book can still be lost between the Book button and the calendar. This is usually where I start."
        items={BOOKING}
      />

      <Wording
        id="clinic-wording"
        title={
          <>
            Written to your college’s rules. <span>You approve every word.</span>
          </>
        }
        text="Before I write for your clinic, I read the advertising standard your college sets: what you can call yourself, what you can promise, and how testimonials and logos can be used. Nothing goes live until you have approved it."
        examples={[
          { slug: 'endorphins', name: 'Endorphins', text: 'The colleges named in plain text instead of shown as logos.' },
          { slug: 'physiomax', name: 'PhysioMax', text: 'Outcome claims removed, and a service the clinic does not offer taken down, with a redirect.' },
          { slug: 'kinetikare', name: 'KinetiKare', text: 'Every research card linked to its source, and when to see a doctor first on every condition page.' },
        ]}
        lines={[
          <>
            Our <Removed>specialists</Removed> <Added>physiotherapists</Added> treat sports injuries.
          </>,
          <>
            <Removed>Guaranteed pain relief</Removed> <Added>Treatment for back and neck pain</Added>
          </>,
          <>
            <Removed>The best</Removed> <Added>Family</Added> dental care in Burlington.
          </>,
        ]}
        sheetNote="The kinds of words I flag. Your college’s standard decides what stays."
      />

      <CaseCardsSection
        id="clinic-work"
        label="The work"
        title="Recent clinic work"
        intro="Each case shows what I found, what I decided and what shipped. One of them is my own practice."
        items={[
          { c: endorphins, point: { label: 'Shipped', text: pickLine(endorphins.shipped, 'Three ad landing pages') } },
          { c: physiomax, point: { label: 'Measured', text: pickLine(facts(physiomax), 'All 11 practitioners') } },
          { c: kinetikare, point: { label: 'Measured', text: pickLine(facts(kinetikare), 'Largest paint') } },
        ]}
      />

      <PriceLine id="clinic-prices" track="clinics" />

      <Faq id="clinic-faq" title="Questions clinic owners ask" intro="If yours is not here, ask me on the call." items={CLINIC_FAQ} />

      <CloseCall
        id="clinic-close"
        track="clinics-close"
        title={
          <>
            Tell me where patients get lost. <span>I will tell you what I would fix first.</span>
          </>
        }
        text="Book a 20-minute call and tell me what is not working. If you would rather see the whole picture first, start with the website check: its cost comes off any work within 60 days."
      />
    </>
  );
}
