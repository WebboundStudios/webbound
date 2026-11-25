import type { ProjectItem } from '@/types';

type ServicePage = {
  slug: string;
  focus: ProjectItem['focus'];
  name: string;
  title: string;
  description: string;
  introduction: string;
  features: { title: string; text: string }[];
  questions: { question: string; answer: string }[];
};

export const SERVICE_PAGES: ServicePage[] = [
  {
    slug: 'interior-design-website-design',
    focus: 'interiors',
    name: 'Interior design website design',
    title: 'Website Design for Interior Designers',
    description: 'Websites for interior design studios in India with galleries you can update yourself and enquiry forms tailored to your services.',
    introduction: 'We build websites for interior designers and design-build studios in India. Show how your spaces come together, explain what you handle, and make it easy for homeowners to send a useful enquiry.',
    features: [
      {
        title: 'Lookbooks clients can browse by room',
        text: 'Organise images by whole-home projects, kitchens, wardrobes, or whichever categories match your services. A case study can show room-by-room photos alongside the brief and materials. When you have permission to publish them, before-and-after photos help visitors understand the extent of the work.',
      },
      {
        title: 'A shorter path from gallery to enquiry',
        text: 'Connect the right gallery to the relevant service and contact form. For a modular kitchen quote, for example, the form can ask for the site location, approximate dimensions, and timing. We choose the fields together so your studio can make a useful first reply.',
      },
      {
        title: 'Update your portfolio yourself',
        text: 'Sign in to publish a finished project, update a service description, or swap gallery photos. We show your team how to do it at handover so you can make those updates without calling a developer.',
      },
    ],
    questions: [
      {
        question: 'How much does an interior design website cost?',
        answer: 'We quote for the pages, galleries, and editing tools your studio needs. We’ll look for free hosting where it fits and show you the cost of your website address and any paid tools before you approve the quote.',
      },
      {
        question: 'Do I need a separate page for every service?',
        answer: 'Give a service its own page when you have enough detail to explain the scope, show examples, and answer common questions. If your offering is narrow, a single page can cover your services, selected work, and enquiry form clearly.',
      },
      {
        question: 'What should I prepare before we start?',
        answer: 'Gather photos you can publish, brief notes on each project, your service areas, and the contact details you want visitors to use. If the photos are still being edited, start with a few representative projects so we can plan the galleries.',
      },
      {
        question: 'Can visitors enquire by phone or WhatsApp?',
        answer: 'Yes. We can link to the phone number or WhatsApp account you use for enquiries alongside the site form. The form can collect more detail when a project needs an initial brief or quote.',
      },
    ],
  },
];
