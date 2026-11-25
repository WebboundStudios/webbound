import { PolicyEmail, PolicyPage } from '@/components/common/PolicyPage';
import { POLICIES } from '@/constants/policies';
import { pageMetadata } from '@/lib/seo';

const policy = POLICIES.privacy;

export const metadata = pageMetadata(policy);

export default function PrivacyPage() {
  return (
    <PolicyPage policy={policy} sections={[
      {
        id: 'what-this-covers',
        title: 'What this policy covers',
        content: <p>Webbound is a web design and development studio based in India. This policy covers the information we handle when you browse our website, contact us, or work with us on a project. Websites and apps we build for clients may have their own privacy notices.</p>,
      },
      {
        id: 'information-we-collect',
        title: 'Information we collect',
        content: (
          <ul>
            <li>Our inquiry form asks for your name, email address, project type, and a message about your project. The company field is optional.</li>
            <li>When you get in touch or work with us, we may receive messages, contact details, feedback, and files you share with us, such as copy, images, or project briefs.</li>
            <li>If you hire us, we keep the information needed to quote, invoice, and record payments, such as billing details and payment references. Please keep passwords and card details out of the inquiry form.</li>
          </ul>
        ),
      },
      {
        id: 'how-we-use-information',
        title: 'How we use your information',
        content: <p>We use that information to reply to inquiries, understand your project, prepare quotes, deliver and support the work, and handle billing. We use website traffic data to see which pages people visit and improve the site. We may also use information to secure our services, resolve disputes, and meet legal obligations.</p>,
      },
      {
        id: 'analytics-and-providers',
        title: 'Analytics and service providers',
        content: (
          <>
            <p>We use <a href="https://formspree.io/legal/privacy-policy/">Formspree</a> to receive website inquiries. Vercel hosts our website and may process technical request information to serve and secure it.</p>
            <p>We use <a href="https://vercel.com/docs/analytics/privacy-policy">Vercel Web Analytics</a> to measure visits. It works without cookies and can record information such as the page visited, referring site, approximate location, and browser or device type.</p>
            <p>We use email and may use WhatsApp for conversations and Figma for design reviews. When a project needs another service, such as hosting or a payment service, we may share the information that service needs to do its job. Providers may process information outside India. We may also disclose information where the law requires it.</p>
          </>
        ),
      },
      {
        id: 'retention',
        title: 'How long we keep it',
        content: <p>If an inquiry doesn’t become a project, we keep it for up to six months after our last contact. We keep project and billing records for as long as we need them to deliver support, meet legal or accounting obligations, and resolve disputes. We may keep specific records longer when required by law.</p>,
      },
      {
        id: 'privacy-requests',
        title: 'Your choices and privacy requests',
        content: <p>Email <PolicyEmail /> to ask what information we hold about you, request a correction or deletion, withdraw consent where it applies, or raise a privacy concern. We may ask for enough information to verify your identity and handle your request in line with applicable law.</p>,
      },
    ]} />
  );
}
