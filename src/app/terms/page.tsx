import Link from 'next/link';
import { PolicyEmail, PolicyPage } from '@/components/common/PolicyPage';
import { POLICIES } from '@/constants/policies';
import { pageMetadata } from '@/lib/seo';

const policy = POLICIES.terms;

export const metadata = pageMetadata(policy);

export default function TermsPage() {
  return (
    <PolicyPage policy={policy} sections={[
      {
        id: 'scope',
        title: 'Using this site and working with us',
        content: (
          <>
            <p>These terms apply to Webbound’s website and to our website and app design, development, and related services. Your accepted quote or project agreement sets out the details of your engagement and controls if it differs from these terms on a project-specific point, subject to applicable law.</p>
            <p>Please use the site and inquiry form for lawful purposes and respect the rights of the people whose work appears on the site.</p>
          </>
        ),
      },
      {
        id: 'initial-review',
        title: 'The first meeting and review',
        content: (
          <>
            <p>We start with a meeting to understand what you want to build. For a simple portfolio site, we share an initial sample. For a larger website or app, we walk you through a high-level plan for how it would work.</p>
            <p>You have 72 hours from when we share the sample or plan to tell us if you want to proceed. If you pass or the window ends without approval, we close the inquiry with nothing to pay. Paid work begins after you approve the quote in writing and we receive the advance.</p>
          </>
        ),
      },
      {
        id: 'quote-and-payments',
        title: 'Quotes, payments, and project changes',
        content: (
          <>
            <p>Your quote sets out the work, timeline, included revisions, advance, payment method, and any milestone payments. The advance counts toward the total. You can review the completed work before you pay the remaining balance, which is due before handover.</p>
            <p>Please provide the content, access, and feedback needed to keep the project moving. You’re responsible for having permission to use the materials you give us. If a request falls outside the agreed scope or revision rounds, we’ll agree on any extra cost or time with you before doing that work.</p>
          </>
        ),
      },
      {
        id: 'handover-and-rights',
        title: 'Handover and ownership',
        content: <p>After final payment, you receive full administrative access to your website. The quote also identifies any source repository, design files, or other deliverables included in handover and the rights that come with them. Your existing content stays yours. Third-party tools and assets remain subject to their own licence terms.</p>,
      },
      {
        id: 'support-and-running-costs',
        title: 'Support and running costs',
        content: (
          <>
            <p>Every website includes one year of support from handover. That covers technical maintenance, text edits, image swaps, project uploads, dependency updates, and uptime monitoring. We’ll quote separately for new pages, features, or major redesigns outside that scope.</p>
            <p>Domain registration and renewal, paid hosting, and other paid tools are separate from our service fee. We look for free options where they fit a small site and explain any expected third-party costs before you approve the quote.</p>
          </>
        ),
      },
      {
        id: 'cancellation-and-questions',
        title: 'Cancellations and questions',
        content: <p>See our <Link href={POLICIES.refund.path}>Refund Policy</Link> for what happens if a project ends early or a payment is incorrect. Email <PolicyEmail /> with questions or concerns about these terms or your project. Any rights you have under applicable law still apply.</p>,
      },
    ]} />
  );
}
