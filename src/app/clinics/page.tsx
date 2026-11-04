import { pageMeta } from '@/lib/meta';
import { LookBand } from '@/components/look/LookBand';
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
          { c: kinetikare, point: { label: 'On the site', text: pickLine(kinetikare.shipped, 'Condition guides') } },
        ]}
      />

      <LookBand
        id="clinic-look"
        track="clinics-look"
        title="See what I would see first."
        text="Paste the clinic’s address. In a few seconds: what Google sees, where Book goes and whether it goes anywhere, what is being counted, and the words your college may question."
      />

      <PriceLine id="clinic-prices" track="clinics" />
      <CloseCall id="clinic-close" track="clinics-close" title="Tell me about the clinic." text="Twenty minutes, your site address and the name of your booking system are enough." />
    </>
  );
}
