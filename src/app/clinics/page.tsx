import { pageMeta } from '@/lib/meta';
import { BuildList } from '@/components/sales/BuildList';
import { CaseCardsSection } from '@/components/sales/CaseCards';
import { CloseCall } from '@/components/sales/CloseCall';
import { Hero } from '@/components/sales/Hero';
import { HeroStage } from '@/components/sales/HeroStage';
import { pickLine, pickLoop, pickStill, requireCase } from '@/components/sales/pick';
import { PriceLine } from '@/components/sales/PriceLine';

export const metadata = pageMeta({
  title: 'Websites, online booking and Google Ads for clinics',
  description: 'Websites, online booking, Google profiles, ads and tracking for clinics. I bring 13 years of experience in healthcare, across different roles.',
  path: '/clinics',
});

export default function ClinicsPage() {
  const endorphins = requireCase('endorphins');
  const physiomax = requireCase('physiomax');
  const kinetikare = requireCase('kinetikare');
  const facts = (c: typeof endorphins) => c.measured?.map((m) => m.fact);

  return (
    <>
      <Hero
        label="Services for clinics"
        title={<>From search to <em>seen.</em></>}
        lede="Websites, online booking, Google profiles, ads and tracking for dental, medical and health clinics. I bring 13 years of experience in healthcare, across different roles."
        track="clinics-hero"
        stage={<HeroStage palette={endorphins.palette} desktop={pickStill(endorphins, 'lp-physio--desktop')} phone={pickLoop(endorphins, 'lp-scroll--phone')} domain={endorphins.domain} caption="Endorphins: its physiotherapy ad page, with the next openings read live from Jane." />}
      />

      <CaseCardsSection
        id="clinic-work"
        title="Recent clinic work"
        concise
        items={[
          { c: endorphins, point: { label: 'Shipped', text: pickLine(endorphins.shipped, 'Three ad landing pages') } },
          { c: physiomax, point: { label: 'Measured', text: pickLine(facts(physiomax), 'All 11 practitioners') } },
          { c: kinetikare, point: { label: 'Measured', text: pickLine(facts(kinetikare), 'Largest paint') } },
        ]}
      />

      <BuildList id="clinic-booking" title="What I build" items={[
        { title: 'Websites', text: 'Clear, fast pages that help people choose a service and practitioner.' },
        { title: 'Online booking', text: 'Direct links to the right calendar, with bookings tracked through to confirmation.' },
        { title: 'Search and ads', text: 'Google profiles, landing pages and campaigns, measured by bookings and calls.' },
      ]} />

      <PriceLine id="clinic-prices" track="clinics" />
      <CloseCall id="clinic-close" track="clinics-close" title="Tell me what you have in mind." text="Book a 20-minute call. There is nothing to prepare except your site address." />
    </>
  );
}
