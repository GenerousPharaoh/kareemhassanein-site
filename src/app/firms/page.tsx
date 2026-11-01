import { pageMeta } from '@/lib/meta';
import { LookBand } from '@/components/look/LookBand';
import { CaseBand } from '@/components/sales/CaseBand';
import { CloseCall } from '@/components/sales/CloseCall';
import { Hero } from '@/components/sales/Hero';
import { HeroStage } from '@/components/sales/HeroStage';
import { pickLine, pickLoop, pickStill, requireCase } from '@/components/sales/pick';
import { PriceLine } from '@/components/sales/PriceLine';

export const metadata = pageMeta({
  title: 'Websites, intake and Google Ads for law firms',
  description: 'Websites, intake, CRM handoff, Google Ads and tracking for law, tax and accounting firms in Canada and the US.',
  path: '/firms',
});

export default function FirmsPage() {
  const trc = requireCase('tax-relief-counsel');
  return (
    <>
      <Hero
        label="Services for law firms"
        title={<>From search to <em>signed.</em></>}
        lede="Websites, intake and Google Ads for law, tax and accounting firms in Canada and the US."
        track="firms-hero"
        stage={<HeroStage palette={trc.palette} desktop={pickStill(trc, 'home-hero--desktop')} phone={pickLoop(trc, 'home-scroll--phone')} domain={trc.domain} caption="The rebuilt home page of Tax Relief Counsel, a tax law firm in Washington, D.C. Finished, and waiting on launch." />}
      />

      <CaseBand
        c={trc}
        findings={[pickLine(trc.found, 'Most of the conversions'), pickLine(trc.found, 'Audit campaigns'), pickLine(trc.found, 'A missing template')]}
        wide={{ loop: pickLoop(trc, 'decoder--desktop'), caption: 'The notice decoder: choosing a notice shows its deadline and what it means.' }}
        phone={{ still: pickStill(trc, 'consult--phone'), caption: 'Intake on a phone: each request is screened before anyone books.' }}
      />

      <LookBand
        id="firm-look"
        track="firms-look"
        title="See what I would see first."
        text="Paste the firm’s address. In a few seconds: what Google sees, where the consultation request goes, whether a click is being counted as a lead, and the words the bar may question."
      />

      <PriceLine id="firm-prices" track="firms" />
      <CloseCall id="firm-close" track="firms-close" title="Tell me about the firm." text="Twenty minutes, your site address, and whatever the ad account has been reporting." />
    </>
  );
}
