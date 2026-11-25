import Link from 'next/link';
import { PolicyEmail, PolicyPage } from '@/components/common/PolicyPage';
import { POLICIES } from '@/constants/policies';
import { pageMetadata } from '@/lib/seo';

const policy = POLICIES.refund;

export const metadata = pageMetadata(policy);

export default function RefundPage() {
  return (
    <PolicyPage policy={policy} sections={[
      {
        id: 'free-review',
        title: 'The free review period',
        content: <p>You have 72 hours after we share your sample or high-level project plan to decide whether to continue. If you decline or the review period ends without approval, we close the inquiry and you owe nothing. This review window applies before you commit to paid work.</p>,
      },
      {
        id: 'client-cancellation',
        title: 'If you cancel after paying',
        content: (
          <ul>
            <li><strong>Before paid work starts.</strong> We refund your advance in full.</li>
            <li><strong>After paid work starts.</strong> We apply payments to the agreed work already completed by the time we receive your cancellation. We explain the calculation and refund the unused balance. If the completed work uses the full advance, there is no unused advance to refund.</li>
            <li><strong>Separate third-party purchases.</strong> If you approved a separate purchase before we made it, such as a domain or paid tool, any refund for that purchase follows the agreed terms, the provider’s refund rules, and applicable law.</li>
          </ul>
        ),
      },
      {
        id: 'webbound-cancellation',
        title: 'If Webbound cancels the project',
        content: <p>If we cancel a project before finishing it, we refund any payments for work we haven’t delivered. We’ll explain the refund amount and what has been delivered in writing.</p>,
      },
      {
        id: 'billing-errors',
        title: 'Billing errors and delivery problems',
        content: <p>If you were charged twice, charged the wrong amount, or received something different from what we agreed to deliver, let us know. We’ll review what happened and correct verified billing errors. Your right to any remedy under applicable law still applies.</p>,
      },
      {
        id: 'request-a-refund',
        title: 'How to cancel or request a refund',
        content: (
          <>
            <p>Email <PolicyEmail /> with your project name, any invoice or payment reference you have, and a brief explanation. We’ll confirm the outcome, any amount due back, and the expected timing in writing. Where possible, we’ll return the refund using the original payment method.</p>
            <p>Read this policy alongside the <Link href={POLICIES.terms.path}>Terms of Use</Link> and your accepted quote or project agreement. Any mandatory rights under applicable law take precedence.</p>
          </>
        ),
      },
    ]} />
  );
}
