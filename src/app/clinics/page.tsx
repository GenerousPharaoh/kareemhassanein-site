import { pageMeta } from '@/lib/meta';
import { AskList } from '@/components/sales/AskList';
import { BuildList, type BuildItem } from '@/components/sales/BuildList';
import { CaseCardsSection } from '@/components/sales/CaseCards';
import { CloseCall } from '@/components/sales/CloseCall';
import { Faq } from '@/components/sales/Faq';
import { Hero } from '@/components/sales/Hero';
import { HeroStage } from '@/components/sales/HeroStage';
import { pickLine, pickLoop, pickStill, requireCase } from '@/components/sales/pick';
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
  'Our Google listing has incorrect details.',
];

const BOOKING: BuildItem[] = [
  {
    title: 'Practitioner and service booking links',
    text: 'I link patients to the calendar for the practitioner or treatment they choose.',
  },
  {
    title: 'Available appointments on landing pages',
    text: 'Where the booking system supports it, I show available appointments on the page before a patient starts booking.',
  },
  {
    title: 'Booking and call tracking',
    text: 'I set up Analytics and Google Ads to record completed bookings and calls, with their source where the systems support it.',
  },
  {
    title: 'Practitioner booking settings',
    text: 'I check online booking permissions and calendar settings to identify why a practitioner’s available times are not showing.',
  },
  {
    title: 'Account ownership',
    text: 'The clinic owns the website, domain, Google profile, Analytics and ad account. I work with the access you grant and can coordinate with your agency.',
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
        title="Websites and booking for clinics"
        lede="I’ve worked in healthcare for 13 years, across different roles. I build websites, connect online booking and manage Google profiles, ads and tracking for dental, medical and health clinics. Your accounts stay in the clinic’s name."
        track="clinics-hero"
        specs={[
          { term: 'Booking', detail: 'Jane, or the system you already use' },
          { term: 'Wording', detail: 'To your college’s rules' },
          { term: 'Patient information', detail: 'Not needed, and never in AI tools' },
          { term: 'Your accounts', detail: 'Stay in the clinic’s name' },
        ]}
        stage={
          <HeroStage
            palette={endorphins.palette}
            desktop={pickStill(endorphins, 'lp-physio--desktop')}
            phone={pickLoop(endorphins, 'lp-scroll--phone')}
            domain={endorphins.domain}
            caption="Endorphins: its physiotherapy ad page, with the next openings read live from Jane."
          />
        }
      />

      <AskList
        id="clinic-asks"
        title="What clinic owners ask me to fix"
        items={ASKS}
        note="I compare the website and ad reports with what the booking system records, then check the links and settings behind any differences."
      />

      <BuildList
        id="clinic-booking"
        label="Booking"
        title="Booking links and tracking"
        intro="I check where booking links lead, which practitioners can be booked online and whether completed bookings reach your reports."
        items={BOOKING}
      />

      <Wording
        id="clinic-wording"
        title="Clinic website content"
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
        sheetNote="Examples of wording I review against the applicable advertising standard."
      />

      <CaseCardsSection
        id="clinic-work"
        label="The work"
        title="Recent clinic work"
        intro="Website, booking and tracking work for Endorphins, PhysioMax and my own practice, KinetiKare."
        items={[
          { c: endorphins, point: { label: 'Completed', text: pickLine(endorphins.shipped, 'Three ad landing pages') } },
          { c: physiomax, point: { label: 'Measured', text: pickLine(facts(physiomax), 'All 11 practitioners') } },
          { c: kinetikare, point: { label: 'Measured', text: pickLine(facts(kinetikare), 'Largest page element') } },
        ]}
      />

      <PriceLine id="clinic-prices" track="clinics" />

      <Faq id="clinic-faq" title="Questions about working with me" items={CLINIC_FAQ} />

      <CloseCall
        id="clinic-close"
        track="clinics-close"
        title="Discuss your website or booking"
        text="Describe the problem on a 20-minute call, or request a website check. The check is credited in full toward any work within 60 days."
      />
    </>
  );
}
