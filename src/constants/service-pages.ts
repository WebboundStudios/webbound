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
    slug: 'architecture-website-design',
    focus: 'architecture',
    name: 'Architecture website design',
    title: 'Website Design for Architects',
    description: 'Websites for architecture firms in India with project archives, photography, detailed case study pages, and a CMS your team can update.',
    introduction: 'I design and build websites for architecture practices in India. Give prospective clients a way to explore your built work, understand your approach, and get in touch about a brief.',
    features: [
      {
        title: 'A portfolio organised around your work',
        text: 'I plan the project archive around how clients browse your practice, such as by building type, location, or stage. Each project can have its own page with a brief, photography, drawings, and credits. A residential client can find relevant projects without going through the whole archive.',
      },
      {
        title: 'Room for drawings and photography',
        text: 'Layouts can pair wide photographs with elevations, detail shots, and captions. I use responsive image sizes so a phone can load a smaller file while a desktop can show more detail. The project story remains readable alongside the gallery.',
      },
      {
        title: 'A publishing workflow for your team',
        text: 'With a CMS, your team can create a project page, choose a cover image, reorder the gallery, and add credits. I shape the editing fields around what you already document for each project and review the publishing workflow at handover.',
      },
    ],
    questions: [
      {
        question: 'What should an architecture project page include?',
        answer: 'Start with the project type, location, and a short description of the brief. Show the finished work alongside any plans or process images that explain an important design decision. Include photographer and collaborator credits, and check which client and site details are approved for publication.',
      },
      {
        question: 'Can we launch with a small portfolio?',
        answer: 'Yes. A studio profile, a short selection of work, and a clear enquiry form can fit on one page. A project archive and CMS are helpful when you have enough work to organise by type or want to publish updates regularly.',
      },
      {
        question: 'Can you rebuild an existing architecture website?',
        answer: 'Yes. I start by reviewing the pages, project photography, and existing URLs. We decide what to carry over and map redirects for pages that move so visitors with old links can still find the work.',
      },
    ],
  },
  {
    slug: 'interior-design-website-design',
    focus: 'interiors',
    name: 'Interior design website design',
    title: 'Website Design for Interior Designers',
    description: 'Websites for interior design studios in India with room galleries, lookbooks, a CMS, and enquiry forms tailored to your services.',
    introduction: 'I build websites for interior designers and design-build studios in India. Show how your spaces come together, explain what you handle, and make it easy for homeowners to send a useful enquiry.',
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
        title: 'New projects without a rebuild',
        text: 'A CMS lets you publish a finished home, update a service description, or change gallery photos on your own. I arrange the editing screens around your services and the way your team organises images.',
      },
    ],
    questions: [
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
