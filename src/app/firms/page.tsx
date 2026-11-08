import { pageMeta } from '@/lib/meta';
import { AskList } from '@/components/sales/AskList';
import { BuildList, type BuildItem } from '@/components/sales/BuildList';
import { CaseBand } from '@/components/sales/CaseBand';
import { CloseCall } from '@/components/sales/CloseCall';
import { Faq } from '@/components/sales/Faq';
import { Hero } from '@/components/sales/Hero';
import { HeroStage } from '@/components/sales/HeroStage';
import { pickLine, pickLoop, pickStill, requireCase } from '@/components/sales/pick';
import { PriceLine } from '@/components/sales/PriceLine';
import { FIRM_FAQ } from '@/content/faq';

export const metadata = pageMeta({
  title: 'Websites, intake and Google Ads for law firms',
  description:
    'I build websites and intake forms, connect them to the firm’s CRM, and manage Google Ads and tracking for law, tax and accounting firms in Canada and the US.',
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
    title: 'Service and practice area pages',
    text: 'I explain the firm’s services in plain language and give readers a clear way to make an enquiry.',
  },
  {
    title: 'Interactive tools with source references',
    text: 'I build tools such as notice decoders and deadline calculators, with a source reference beside each figure.',
  },
  {
    title: 'Enquiry forms and scheduling',
    text: 'I route requests using the firm’s screening criteria. Suitable requests reach the scheduler; other requests go to the firm for review.',
  },
  {
    title: 'Enquiry sources in your CRM',
    text: 'I pass the enquiry and its source to your CRM, preserve the fields your automations need and check for duplicate conversion events.',
  },
  {
    title: 'Launch plan and redirects',
    text: 'I map old page addresses to the new site and prepare instructions for restoring the previous site if needed.',
  },
];

export default function FirmsPage() {
  const trc = requireCase('tax-relief-counsel');

  return (
    <>
      <Hero
        label="For firms"
        title="Websites and intake for firms"
        lede="I build websites and intake forms, connect them to your CRM, and manage Google Ads and tracking for law, tax and accounting firms in Canada and the US. Your accounts stay in the firm’s name."
        track="firms-hero"
        specs={[
          { term: 'Your CRM', detail: 'Clio or the system your firm already uses' },
          { term: 'Wording', detail: 'To your law society’s or bar’s rules' },
          { term: 'Client information', detail: 'Never goes into AI tools' },
          { term: 'Your accounts', detail: 'Stay in the firm’s name' },
        ]}
        stage={
          <HeroStage
            palette={trc.palette}
            desktop={pickStill(trc, 'home-hero--desktop')}
            phone={pickLoop(trc, 'home-scroll--phone')}
            domain={trc.domain}
            caption="The rebuilt Tax Relief Counsel home page. The site is complete and awaiting launch."
          />
        }
      />

      <AskList
        id="firm-asks"
        title="What firm owners ask me to fix"
        items={ASKS}
        note="I check the website, enquiry forms, CRM fields and ad conversions to see where information is lost."
      />

      <BuildList
        id="firm-build"
        title="What I build"
        intro="The scope can include service pages, interactive tools, intake forms, CRM connections and ad tracking."
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

      <Faq id="firm-faq" title="Questions about working with me" items={FIRM_FAQ} />

      <CloseCall
        id="firm-close"
        track="firms-close"
        title="Discuss your website or intake"
        text="Describe the problem on a 20-minute call, or request a website check. The check is credited in full toward any work within 60 days."
      />
    </>
  );
}
