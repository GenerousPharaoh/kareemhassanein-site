import { pageMeta } from '@/lib/meta';
import { AskList } from '@/components/sales/AskList';
import { BuildList, type BuildItem } from '@/components/sales/BuildList';
import { CaseBand } from '@/components/sales/CaseBand';
import { CloseCall } from '@/components/sales/CloseCall';
import { Faq } from '@/components/sales/Faq';
import { Hero } from '@/components/sales/Hero';
import { HeroPhone } from '@/components/sales/HeroPhone';
import { pickLine, pickLoop, pickStill, requireCase } from '@/components/sales/pick';
import { PriceLine } from '@/components/sales/PriceLine';
import { FIRM_FAQ } from '@/content/faq';

export const metadata = pageMeta({
  title: 'Websites, intake and Google Ads for law firms',
  description:
    'Websites, intake, CRM handoff, Google Ads and tracking for law firms, and for tax and accounting firms, in Canada and the US. Every account stays in the firm’s name.',
  path: '/firms',
});

const ASKS = [
  'Our ads report leads that never become clients.',
  'We cannot tell which campaign brought in a signed client.',
  'Intake loses the lead source on the way into our CRM.',
  'Our older articles no longer match the current rules.',
  'The templates broke after a plugin update.',
  'Switching sites feels too risky.',
];

const BUILD: BuildItem[] = [
  {
    title: 'Practice area pages in plain language',
    text: 'Someone with a problem finds the page for it, understands where they stand, and knows what to do next.',
  },
  {
    title: 'Tools that answer a reader’s own situation',
    text: 'A reader works out their own deadline or next step before they call, with the source beside every figure, so they arrive informed.',
  },
  {
    title: 'Intake that screens and routes each request',
    text: 'Requests that fit go straight to your scheduler and the rest come to you to review, so consultation time goes to the right clients.',
  },
  {
    title: 'The lead’s source, carried into your CRM',
    text: 'You can see which search or campaign brought in each signed client, and a conversion counts only once the lead is delivered, so your ads learn from real leads, not clicks.',
  },
  {
    title: 'Launches you can reverse in one step',
    text: 'Every old address is redirected, the new site goes live with one change, and the old one stays a step away until you are sure.',
  },
];

export default function FirmsPage() {
  const trc = requireCase('tax-relief-counsel');

  return (
    <>
      <Hero
        label="For firms"
        title={
          <>
            From search to <em>signed.</em>
          </>
        }
        lede="Websites, intake, CRM handoff, Google Ads and tracking for law firms, and for tax and accounting firms, in Canada and the US. I build and run all of it myself, and every account stays in the firm’s name."
        track="firms-hero"
        specs={[
          { term: 'Your CRM', detail: 'Clio and others, learned before anything changes' },
          { term: 'Wording', detail: 'To your law society’s or bar’s rules' },
          { term: 'Client information', detail: 'Never goes into AI tools' },
          { term: 'Your accounts', detail: 'Stay in the firm’s name' },
        ]}
        aside={
          <HeroPhone
            palette={trc.palette}
            loop={pickLoop(trc, 'hero-arrive--phone')}
            domain={trc.domain}
            caption="The rebuilt home page of Tax Relief Counsel, a tax law firm in Washington, D.C. Finished, and waiting on launch."
          />
        }
      />

      <AskList
        id="firm-asks"
        title="What firm owners ask me to fix"
        items={ASKS}
        note="These are often connected. The gap that loses a lead’s source on the way into the CRM is usually the same one that hides which campaign worked."
      />

      <BuildList
        id="firm-build"
        title="What I build"
        intro="Each piece works on its own. Together they carry a reader from the first search to a signed engagement, with the source attached all the way."
        items={BUILD}
      />

      <CaseBand
        c={trc}
        findings={[
          pickLine(trc.found, 'Most of the conversions'),
          pickLine(trc.found, 'Audit campaigns'),
          pickLine(trc.found, 'A missing template'),
        ]}
        wide={{
          loop: pickLoop(trc, 'decoder--desktop'),
          caption: 'The notice decoder: choosing a notice shows its deadline and what it means.',
        }}
        phone={{ still: pickStill(trc, 'consult--phone'), caption: 'Intake on a phone: each request is screened before anyone books.' }}
      />

      <PriceLine id="firm-prices" track="firms" />

      <Faq id="firm-faq" title="Questions firm owners ask" intro="If yours is not here, ask me on the call." items={FIRM_FAQ} />

      <CloseCall
        id="firm-close"
        track="firms-close"
        title={
          <>
            Tell me where the leads go missing. <span>I will tell you what I would fix first.</span>
          </>
        }
        text="Book a 20-minute call and tell me what is not working. If you would rather see the whole picture first, start with the website check: its cost comes off any work within 60 days."
      />
    </>
  );
}
