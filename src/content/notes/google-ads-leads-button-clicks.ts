import type { Note } from './types';

export const googleAdsLeads: Note = {
  slug: 'google-ads-leads-button-clicks',
  title: 'Your Google Ads leads might be button clicks. How to check in ten minutes.',
  summary:
    'If your ad account reports more leads than your inbox received, it may be counting clicks. How to see what it counts, and what to change.',
  audience: 'For law firms and practices running Google Ads',
  month: '2026-10',
  monthLabel: 'October 2026',
  cases: ['tax-relief-counsel', 'kinetikare'],
  check:
    'The website check covers your conversion actions, your forms or booking, and the path each lead takes to your inbox or CRM, with a fixed price beside each fix.',
  body: [
    {
      type: 'p',
      text: 'Google Ads has a column called Conversions, and many owners read it as their number of leads. It is really a count of whatever the account was set up to count. Sometimes that is a delivered inquiry. Often it is something earlier: a click on a Book or Request a Consultation button, a visit to a page, or a tap on a phone number.',
    },
    {
      type: 'p',
      text: 'I have found this in a tax law firm’s account, where most of the reported conversions were clicks on the consultation button, and in my own practice’s account, where the booking the ads optimised for was really a page view. You can check yours in about ten minutes.',
    },
    { type: 'h2', id: 'why-it-matters', text: 'Why it matters' },
    {
      type: 'p',
      text: 'If your campaigns use automated bidding, Google spends your budget looking for more of whatever counts as a conversion. Count button clicks, and it learns to find people who click buttons. Your cost per lead also looks lower than it is, because clicks that did not become an inquiry are counted as if they had.',
    },
    { type: 'h2', id: 'list-what-it-counts', kicker: 'Step 1 · 2 minutes', text: 'List what the account counts' },
    {
      type: 'p',
      text: 'In Google Ads, open the list of conversion actions. At the time of writing it sits under Goals, then Conversions. Google renames and moves its menus from time to time, so if it has moved, search the account’s help for “conversion actions”.',
    },
    { type: 'p', text: 'Each row is one thing the account counts. For each one, write down four things:' },
    {
      type: 'ul',
      items: [
        '**The name.** Whoever set the action up chose it, so treat it as a label, not proof. An action called Lead can still fire on a click.',
        '**The source,** such as the website, phone calls, or an import from Google Analytics or a CRM.',
        '**Primary or secondary.** Primary actions fill the Conversions column and steer automated bidding. Secondary actions are still recorded, under All conversions, but do not steer bidding.',
        '**The count setting,** One or Every. For leads, One is usually right. Every counts the same person again if they submit twice.',
      ],
    },
    { type: 'h2', id: 'what-makes-it-fire', kicker: 'Step 2 · 3 minutes', text: 'Find out what makes each primary action fire' },
    { type: 'p', text: 'Open each primary action and look at what has to happen for it to count. It usually comes down to one of four things:' },
    {
      type: 'ul',
      items: [
        '**A click** on a button or link, such as Book, Request a Consultation or a phone number. This counts interest, not a lead. The person may not finish the form or reach your booking page.',
        '**A page view,** usually a thank-you or confirmation page. It is only as good as the page. If the page can be reached without sending anything, reloaded, or opened again from a confirmation email, it counts more than once.',
        '**An event from your form or booking system** that fires once a request is sent or a booking is made. This is usually what you want, as long as it fires once per request.',
        '**An import** from Google Analytics or your CRM. The definition then lives in that system, so check which event is imported and what triggers it there.',
      ],
    },
    {
      type: 'callout',
      label: 'If you cannot tell',
      text: 'When an action was set up in Google Tag Manager or in your site’s code, the trigger lives there, not in Google Ads. Ask whoever set it up one question: what exactly has to happen for this to count?',
    },
    { type: 'h2', id: 'click-lead-client', text: 'A click, a lead and a client are different things' },
    { type: 'p', text: 'It helps to name the three things an account could be counting:' },
    {
      type: 'ul',
      items: [
        '**A click** on a button: someone showed interest.',
        '**A delivered lead:** a form was sent and reached your inbox or CRM, or a call connected and lasted long enough to be a conversation.',
        '**A booking or a signed client:** what you are paying for. It usually lives only in your booking system or CRM, and reaches Google Ads through an integration or an import.',
      ],
    },
    {
      type: 'p',
      text: 'Make the furthest of these you can record reliably your primary action. Keep the click as a secondary action if you like. It is useful for seeing where people drop out, as long as it does not steer bidding.',
    },
    { type: 'h2', id: 'compare', kicker: 'Step 3 · 5 minutes', text: 'Compare the account with what actually arrived' },
    {
      type: 'p',
      text: 'Pick a recent month that ended at least a couple of weeks ago. Google Ads credits each conversion to the day of the ad click, so the most recent days are still filling in.',
    },
    {
      type: 'p',
      text: 'In your campaigns report, break the conversions down by conversion action. Most reports offer this as a segment. Then count what arrived from ads in the same month: inquiries in your inbox or CRM with an ads source, or the new patients or clients who told the front desk they found you through an ad.',
    },
    {
      type: 'p',
      text: 'If the account reports far more conversions than you received, the difference is what it counts that is not a lead. If the two are close, the tracking is probably sound, and the next question is how many of those leads became clients.',
    },
    { type: 'h2', id: 'what-to-change', text: 'What to change' },
    {
      type: 'ul',
      items: [
        '**Make the delivered lead, booking or signed client the primary action,** and set button clicks to secondary.',
        '**Fire the lead conversion only after the request is delivered,** not when someone presses the button or opens the form. On the tax firm’s rebuilt site, the conversion fires once a request has reached the firm, and carries an ID so the same request cannot count twice.',
        '**Count calls that last long enough to be a conversation.** Google lets you set a minimum call length for calls from ads.',
        '**Write down the date of the change.** The Conversions column does not rewrite the past. In my own account, after I moved button clicks to secondary, the earlier weeks still included them. Compare before and after by conversion action, not by the total.',
        '**Expect the number to drop.** Fewer conversions after a fix is the account telling the truth. If the campaigns bid automatically toward conversions, give them time to adjust before you judge the change.',
      ],
    },
    { type: 'h2', id: 'search-terms', text: 'One more look while you are there' },
    {
      type: 'p',
      text: 'Open the search terms report and read what people typed before they clicked. In the tax firm’s account, the audit campaigns were reaching people looking for the IRS phone number. No conversion setting fixes that; negative keywords do.',
    },
  ],
};
