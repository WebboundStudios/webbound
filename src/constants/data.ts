import { ServiceItem, TestimonialItem, FAQItem, TechItem, ProcessStep, WhyUsItem } from '@/types';

export { SITE_CONFIG } from './site';

export const SERVICES: ServiceItem[] = [
  {
    id: 'type-1-single-page-static',
    title: 'Single-page website',
    subtitle: 'High-Impact Brand Presence & Instant Conversion',
    description: 'A one-page website with an inquiry form, a studio map, and responsive layouts for phones and desktops.',
    iconName: 'Layout',
    tierBadge: 'Starter Studio Tier',
    deliverables: [
      'Bespoke Responsive Architecture',
      'Fluid 60 FPS Micro-Interactions',
      'Contact Funnel & Studio Map Integration',
      'Core Web Vitals & Search Optimization',
    ],
    tags: ['Bespoke Landing', 'Sub-Second', 'SEO Tuned', 'Zero Template'],
    accentColor: '#C5F52A',
  },

  {
    id: 'type-2-single-page-cms',
    title: 'Website you can update',
    subtitle: 'Publish projects, photos, and articles yourself',
    description: 'Sign in to add a project, swap a photo, or update text. We show you how to make everyday changes without hiring a developer.',
    iconName: 'Edit3',
    tierBadge: 'Growth Tier',
    deliverables: [
      'An editing area for your team',
      'Project pages and photo galleries',
      'A place to publish articles',
      'Fast-loading images',
      'Editable titles and descriptions for search results',
      'A walkthrough at handover',
    ],
    tags: ['Easy updates', 'Photo galleries', 'Search settings', 'Project pages'],
    accentColor: '#C5F52A',
  },

  {
    id: 'type-3-multipage-cms',
    title: 'Multi-page studio website',
    subtitle: 'Comprehensive Digital Flagship With Bespoke Motion',
    description: 'A portfolio for architecture and interiors studios with room for your services, galleries, and past work. Your team can add new projects as they’re completed.',
    iconName: 'Layers',
    tierBadge: 'Most Selected',
    deliverables: [
      'Multi-Page Bespoke Grid Architecture',
      'An editing area for your projects and galleries',
      'Spatial Visual Galleries & Lookbooks',
      'Inertial Smooth Scroll (Lenis & GSAP)',
      'Sub-Second Edge Media Pipelines',
      'Dedicated Service & Inquiry Funnels',
      '1 Year Included Free Maintenance',
    ],
    tags: [
      'Multi-Page Flagship',
      'Spatial Design',
      'Easy updates',
      'Lenis + GSAP',
      'Edge CDN',
    ],
    accentColor: '#C5F52A',
  },

  {
    id: 'type-4-fullstack-custom',
    title: 'Custom web application',
    subtitle: 'Bespoke Logic, Database Architecture & Edge APIs',
    description: 'A web application for a specific workflow, such as customer portals, quote calculators, or online bookings.',
    iconName: 'Database',
    tierBadge: 'Enterprise Tier',
    deliverables: [
      'Custom Edge APIs & Next.js Endpoints',
      'Secure Database Architecture (PostgreSQL / Mongo)',
      'User Authentication & Protected Dashboards',
      'Custom Calculation & Booking Engines',
      'Third-Party Payment & Tool Integrations',
      'Global Scalable Edge Infrastructure',
    ],
    tags: [
      'Full-Stack',
      'Edge APIs',
      'Database',
      'Authentication',
      'Custom Logic',
    ],
    accentColor: '#C5F52A',
  },
  {
    id: 'android-app-development',
    title: 'Android app development',
    subtitle: 'Custom mobile apps for Android',
    description: 'Custom Android apps for booking, tracking orders, or managing work on the go.',
    iconName: 'Smartphone',
    deliverables: [
      'App design and development',
      'Accounts and push notifications',
      'API and backend integrations',
      'Testing on Android devices',
      'Google Play release preparation',
    ],
    tags: ['Android', 'Mobile apps'],
    accentColor: '#C5F52A',
  },
];

export { PROJECTS } from './work-data';

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: '01',
    title: 'Discovery & Strategy',
    subtitle: 'Deconstructing brand essence & technical requirements',
    description: 'I analyze your goals 1-on-1 to establish the site architecture, typography, and motion plan within 24 hours.',
    duration: 'Day 1 – 2',
    details: ['Brand Essence Audit', 'Architecture Blueprint', 'Typography & Palette Selection', '1-Year Maintenance Plan'],
  },
  {
    step: '02',
    title: 'Design & Motion',
    subtitle: 'Designing for clarity & immediate visual impact',
    description: 'Every layout grid, component, and animation curve is custom-designed down to the pixel for your brand.',
    duration: 'Days 3 – 5',
    details: ['Desktop & Mobile Prototypes', 'Custom Design System', 'Micro-Interactions', 'Plan for Website Updates'],
  },
  {
    step: '03',
    title: 'Web Development',
    subtitle: 'Writing clean code with 60 FPS fluidity',
    description: 'We build your site and set up an editing area so your team can make everyday updates.',
    duration: 'Days 6 – 9',
    details: ['Component Architecture', 'GSAP ScrollTrigger Logic', 'Website Editing Setup', 'Mobile Optimization'],
  },
  {
    step: '04',
    title: 'Performance & QA',
    subtitle: 'Achieving sub-second load times',
    description: 'Rigorously tested across real devices and network speeds to ensure instant hydration, zero layout shift, and SEO readiness.',
    duration: 'Days 10 – 12',
    details: ['Core Web Vitals Audit', 'Cross-Device Testing', 'SEO Metadata & Schema', 'Content Upload Training'],
  },
  {
    step: '05',
    title: 'Launch & Support',
    subtitle: 'Deploying to global edge CDN with ongoing support',
    description: 'Production deployment with 1 Full Year of Included Free Maintenance & Free Small Content Changes.',
    duration: 'Day 14 (Handover)',
    details: ['Vercel Edge Deployment', 'Complete Site Handover', '1 Year Free Maintenance', 'Free Small Content Updates'],
  },
];

export const WHY_US: WhyUsItem[] = [
  {
    id: 'rapid-handover',
    number: '01',
    title: 'Rapid 1–2 Week Handover',
    description: 'Bespoke design without the 4-month agency drag. Most custom platforms are engineered, tested, and handed over within 7 to 14 business days.',
    highlight: '7–14 Day Delivery',
  },
  {
    id: 'free-maintenance',
    number: '02',
    title: '1 Year Free Maintenance & Edits',
    description: 'Every build includes 365 days of complimentary technical care, covering copy edits, asset swaps, project uploads, and 24/7 uptime monitoring.',
    highlight: '365 Days Included Care',
  },
  {
    id: 'no-templates',
    number: '03',
    title: 'Zero Templates. 100% Handcrafted.',
    description: 'No WordPress page builders or generic Webflow clones. Every layout grid, motion curve, and typography pairing is custom-written in Next.js and GSAP.',
    highlight: 'Bespoke Engineering',
  },
  {
    id: 'direct-collaboration',
    number: '04',
    title: '1-on-1 Direct Collaboration',
    description: 'Direct communication with the lead engineer and designer building your site. No account managers, ticket queues, or diluted vision.',
    highlight: 'Direct Founder Access',
  },
];

export const TECH_STACK: TechItem[] = [
  { id: 'nextjs', name: 'Next.js 15', category: 'frontend', icon: 'Globe', level: 'App Router / Server Components', description: 'React Framework for Production' },
  { id: 'react', name: 'React 19', category: 'frontend', icon: 'Atom', level: 'Concurrent Mode & Hooks', description: 'UI Library' },
  { id: 'typescript', name: 'TypeScript', category: 'frontend', icon: 'Code', level: 'Strict Type System', description: 'Type-Safe Javascript' },
  { id: 'tailwind', name: 'Tailwind CSS v4', category: 'frontend', icon: 'Wind', level: 'CSS Variables & Utility Classes', description: 'Styling Engine' },
  { id: 'gsap', name: 'GSAP Premium', category: 'animation', icon: 'Zap', level: 'ScrollTrigger, SplitText, MorphSVG, Inertia', description: 'Animation Standard' },
  { id: 'framer', name: 'Framer Motion', category: 'animation', icon: 'Layers', level: 'Gestures & Micro-Interactions', description: 'React Motion Library' },
  { id: 'lenis', name: 'Lenis Scroll', category: 'animation', icon: 'MousePointer', level: 'Smooth Scroll & RAF Sync', description: 'Scroll Physics' },
  { id: 'three', name: 'Canvas 2D / WebGL', category: 'animation', icon: 'Box', level: 'Interactive Lighting & Particle Engine', description: 'Graphics Engine' },
  { id: 'zustand', name: 'Zustand', category: 'tools', icon: 'Cpu', level: 'Global Reactive State', description: 'State Management' },
  { id: 'shadcn', name: 'Shadcn UI', category: 'frontend', icon: 'Component', level: 'Accessible Primitive Components', description: 'UI System' },
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: '1',
    quote: 'Working with Webbound was a smooth experience from start to finish. They understood how we wanted to present our architectural work and delivered a fast, modern website that reflects our brand perfectly. The CMS also makes updating projects much easier.',
    excerpt: 'The CMS also makes updating projects much easier.',
    author: 'Ar. Himanshu Gautam',
    role: 'Founder & Lead Architect',
    company: 'The Trusted Wall (Agra)',
    metrics: 'Type 3 Architecture Platform',
  },
  {
    id: '2',
    quote: 'We wanted a clean, premium website that would showcase our interior projects without feeling cluttered. Webbound delivered exactly that. The site feels fast, looks great on every device, and has received positive feedback from our clients.',
    excerpt: 'The site feels fast, looks great on every device, and has received positive feedback from our clients.',
    author: 'Ripul Taneja',
    role: 'Founder & Principal Designer',
    company: 'TDID Interiors (Delhi NCR)',
    metrics: 'Type 1 Interior Platform',
  },
  {
    id: '3',
    quote: "The entire process was well organized and collaborative. Webbound paid attention to the details, kept us updated throughout the project, and built a website that represents our studio in a professional way. We're very happy with the final result.",
    excerpt: 'The entire process was well organized and collaborative.',
    author: 'Ar. Akshay Jain',
    role: 'Founder & Principal Architect',
    company: 'Studio Kalagya (Jabalpur)',
    metrics: 'Type 2 Architecture Platform',
  },
  {
    id: '4',
    quote: "Webbound created a website that showcases our interior projects in a clean and professional way. It has become much easier for potential clients to explore our work, and we've received great feedback on the design, speed, and overall experience.",
    excerpt: 'It has become much easier for potential clients to explore our work',
    author: 'Raj Suroliya',
    role: 'Founder',
    company: 'Forever Interior (Jaipur)',
    metrics: 'Type 3 Interior Platform',
  },
];

export const FAQS: FAQItem[] = [
  {
    id: 'timeline',
    question: 'How long does a website take?',
    answer: 'Most custom websites take 7 to 14 business days. We agree on the scope and timeline before work starts.',
    category: 'Process',
  },
  {
    id: 'pricing',
    question: 'How much does a custom website or app cost?',
    answer: 'Your quote covers only the pages or screens, features, and integrations we agree on. If you’re starting small, we can help you decide what’s worth including at launch. You’ll know what’s included and what it costs before work starts.',
    category: 'Engagement',
  },
  {
    id: 'running-costs',
    question: 'What will it cost to keep my website online?',
    answer: 'We use free hosting when it fits your site. For a simple site, your domain (your website address) may be your only recurring cost. If you need paid hosting or tools, we’ll explain those costs before you approve the quote.',
    category: 'Engagement',
  },
  {
    id: 'maintenance',
    question: 'What’s included in the first year of support?',
    answer: 'Support includes technical maintenance, copy edits, image swaps, project uploads, dependency updates, and uptime monitoring.',
    category: 'Services',
  },
  {
    id: 'project-types',
    question: 'What kinds of websites and apps do you build?',
    answer: 'We build single-page websites, sites you can update yourself, larger studio portfolios, custom web apps, and Android apps.',
    category: 'Engagement',
  },
  {
    id: 'performance',
    question: 'How do you make a site load quickly on mobile?',
    answer: 'We resize and compress images, split the code by page, and load assets as needed. We check the result across devices and connection speeds.',
    category: 'Technical',
  },
  {
    id: 'collaboration',
    question: 'How do we work together?',
    answer: 'You can reach the team on WhatsApp, review designs with us in Figma, and try a live preview of your site before launch.',
    category: 'Process',
  },
];

export const NAV_LINKS = [
  { label: 'About', href: '/#about' },
  { label: 'Services', href: '/#services' },
  { label: 'Work', href: '/work' },
  { label: 'Process', href: '/#process' },
  { label: 'Tech Stack', href: '/#tech' },
  { label: 'Motion Lab', href: '/animations' },
  { label: 'Testimonials', href: '/#testimonials' },
  { label: 'FAQ', href: '/#faq' },
];
