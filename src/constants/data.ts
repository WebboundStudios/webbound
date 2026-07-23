import { ServiceItem, ProjectItem, TestimonialItem, FAQItem, TechItem, ProcessStep, WhyUsItem } from '@/types';

export const SITE_CONFIG = {
  name: 'Webbound',
  tagline: 'High-Craft Digital Engineering & Creative Direction',
  description: 'Independent creative engineer & designer crafting bespoke, ultra-fast, and visually captivating flagship web experiences for ambitious brands.',
  url: 'https://webboundstudios.com',
  email: 'hello@webboundstudios.com',
  location: 'Agra, India',
  stats: [
    { label: 'Bespoke Projects', value: 65, suffix: '+' },
    { label: 'Sub-Second Speed Target', value: 100, suffix: '%' },
    { label: 'Client Satisfaction', value: 99, suffix: '%' },
    { label: 'Years of Craft', value: 6, suffix: '+' },
  ]
};

export const SERVICES: ServiceItem[] = [
  {
    id: 'type-1-single-page-static',
    title: 'Type 1: Single-Page Static Site',
    subtitle: 'High-Impact Brand Presence & Essential Information',
    description: 'Bespoke single-page website engineered with static data for lightweight, lightning-fast loading and essential brand presentation.',
    iconName: 'Layout',
    priceRange: '₹8,000 – ₹9,000',
    tierBadge: 'Type 1 Offering',
    deliverables: [
      'Single-Page Responsive Architecture',
      'Static Brand & Essential Content Presentation',
      'Sub-Second Performance Optimization',
      'Contact Form & Location Mapping',
    ],
    tags: ['React 19', 'Tailwind CSS', 'Vite / Next.js', 'Static Data'],
    accentColor: '#C5F52A',
  },
  {
    id: 'type-2-single-page-cms',
    title: 'Type 2: Single-Page Dynamic CMS Site',
    subtitle: 'Integrated Headless CMS for Instant Content Updates',
    description: 'Single-page flagship website equipped with an intuitive CMS portal. Easily create projects, publish blogs, and upload content like study materials or PDFs without writing code.',
    iconName: 'Edit3',
    priceRange: '₹12,000 – ₹15,000',
    tierBadge: 'Type 2 Offering',
    deliverables: [
      'Single-Page Flagship Layout',
      'Dynamic CMS Integration (Sanity / Headless)',
      'Dynamic Blog & Project Management Portal',
      'PDF & Study Material Media Upload Manager',
    ],
    tags: ['Sanity CMS', 'Next.js 15', 'Dynamic Content', 'GSAP Motion'],
    accentColor: '#C5F52A',
  },
  {
    id: 'type-3-multipage-cms',
    title: 'Type 3: Multi-Page Dynamic CMS Platform',
    subtitle: 'Expanded Multi-Page Routes & Full CMS Suite',
    description: 'Comprehensive multi-page digital platform combining expanded spatial layouts with all Type 2 dynamic CMS capabilities (blogs, project management, and media uploads).',
    iconName: 'Layers',
    priceRange: '₹17,000 – ₹20,000',
    tierBadge: 'Type 3 Offering',
    deliverables: [
      'Dedicated Multi-Page Routes & Navigation',
      'Full CMS Suite (Blogs, Portfolios, Media)',
      'Advanced Spatial Layouts & Motion Physics',
      'SEO Structured Data & Dynamic Metadata API',
    ],
    tags: ['Multi-Page', 'Sanity CMS', 'Next.js App Router', 'Lenis Physics'],
    accentColor: '#C5F52A',
  },
  {
    id: 'type-4-fullstack-custom',
    title: 'Type 4: Custom Full-Stack Web Application',
    subtitle: 'Bespoke Node.js, Express & Custom Backend Logic',
    description: 'Enterprise full-stack platforms powered by custom Node.js, Express, databases (MongoDB/PostgreSQL), REST/GraphQL APIs, user authentication, and custom business logic.',
    iconName: 'Database',
    priceRange: 'Custom Quote (Discussed Beforehand)',
    tierBadge: 'Type 4 Offering',
    deliverables: [
      'Custom Node.js & Express API Servers',
      'Database Architecture (MongoDB / PostgreSQL)',
      'User Authentication & Role Management',
      'Custom Payment & Workflow Integrations',
    ],
    tags: ['Node.js', 'Express', 'Full-Stack', 'Custom APIs'],
    accentColor: '#C5F52A',
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'the-trusted-wall',
    title: 'The Trusted Wall Architecture',
    category: 'Architecture & Luxury Interiors',
    year: '2026',
    tier: 'Type 3: Multi-Page Dynamic CMS Platform',
    description: 'A flagship architectural and luxury interior design studio platform for Ar. Himanshu Gautam, built under our Type 3 package with Sanity CMS for dynamic project creation, blog updates, and spatial galleries.',
    client: 'The Trusted Wall Studio (Agra)',
    impact: 'Type 3 Multi-Page CMS Flagship',
    image: 'https://ik.imagekit.io/dhyh95euj/webbound/TrustedWall.webp',
    tags: ['Type 3 Package', 'Sanity CMS', 'React 19', 'GSAP', 'Vite'],
    link: 'https://thetrustedwall.com/',
    featured: true,
  },
  {
    id: 'tdid-interiors',
    title: 'TDID Interiors Luxury Studio',
    category: 'Luxury Interior Design & Turnkey',
    year: '2026',
    tier: 'Type 1: Single-Page Flagship',
    description: 'A bespoke single-page luxury interior design portal for TDID Interiors in Greater Noida, built under our Type 1 package featuring custom modular kitchen lookbooks and Lenis smooth scroll.',
    client: 'TDID Interiors (Delhi NCR)',
    impact: 'Type 1 Single-Page Flagship',
    image: 'https://ik.imagekit.io/dhyh95euj/webbound/Tdid-interiors.webp',
    tags: ['Type 1 Package', 'React 19', 'Lenis Scroll', 'GSAP', 'Formspree'],
    link: 'https://tdidinteriors.com/',
    featured: true,
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: '01',
    title: 'Rapid Discovery & Strategy',
    subtitle: 'Deconstructing brand essence & technical requirements',
    description: 'I analyze your goals 1-on-1 to establish the site architecture, typography, and motion plan within 24 hours.',
    duration: 'Day 1 – 2',
    details: ['Brand Essence Audit', 'Architecture Blueprint', 'Typography & Palette Selection', '1-Year Maintenance Plan'],
  },
  {
    step: '02',
    title: 'Bespoke UI/UX & Motion Prototyping',
    subtitle: 'Designing for clarity & immediate visual impact',
    description: 'Every layout grid, component, and animation curve is custom-designed down to the pixel for your brand.',
    duration: 'Days 3 – 5',
    details: ['Desktop & Mobile Prototypes', 'Custom Design System', 'Micro-Interactions', 'CMS Structure Blueprint'],
  },
  {
    step: '03',
    title: 'Precision Engineering & CMS Integration',
    subtitle: 'Writing clean code with 60 FPS fluidity',
    description: 'I build your platform using Next.js 15, React 19, GSAP, and Headless CMS for rapid dynamic content updates.',
    duration: 'Days 6 – 9',
    details: ['Component Architecture', 'GSAP ScrollTrigger Logic', 'Sanity/Headless CMS Integration', 'Mobile Optimization'],
  },
  {
    step: '04',
    title: 'Performance Tuning & Speed Audit',
    subtitle: 'Achieving sub-second load times',
    description: 'Rigorously tested across real devices and network speeds to ensure instant hydration, zero layout shift, and SEO readiness.',
    duration: 'Days 10 – 12',
    details: ['Core Web Vitals Audit', 'Cross-Device Testing', 'SEO Metadata & Schema', 'Content Upload Training'],
  },
  {
    step: '05',
    title: 'Final Launch & 1-Year Free Maintenance',
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
    description: 'No waiting months for a website. Most custom platforms are engineered, tested, and handed over within 1 to 2 weeks (3 to 14 days).',
    highlight: '1-2 Week Handover',
  },
  {
    id: 'free-maintenance',
    number: '02',
    title: '1 Year Free Maintenance & Edits',
    description: 'Every project comes with 1 Full Year of Included Free Maintenance and Free Small Content Changes (text, image, blog updates).',
    highlight: '1-Year Free Support',
  },
  {
    id: 'no-templates',
    number: '03',
    title: 'Zero Templates. 100% Handcrafted.',
    description: 'I reject generic templates and agency bloat. Every layout grid, typography pair, and scroll animation is handcrafted specifically for your brand.',
    highlight: 'Handcrafted Quality',
  },
  {
    id: 'direct-collaboration',
    number: '04',
    title: '1-on-1 Direct Collaboration',
    description: 'No middle managers or miscommunications. You work directly with the lead engineer & designer building your project.',
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
    quote: 'Webbound engineered an architectural digital flagship for The Trusted Wall under the Type 3 package. His attention to spatial layout, CMS integration, and sub-second load performance exceeded our expectations.',
    author: 'Ar. Himanshu Gautam',
    role: 'Founder & Lead Architect',
    company: 'The Trusted Wall (Agra)',
    metrics: 'Type 3 Architecture Platform',
  },
  {
    id: '2',
    quote: 'The level of craftsmanship and motion detail in our luxury interior portal is outstanding. Smooth scroll physics and interactive modular lookbooks under the Type 1 package gave us a distinct brand edge.',
    author: 'Founder & Principal Designer',
    role: 'Lead Interior Designer',
    company: 'TDID Interiors (Delhi NCR)',
    metrics: 'Type 1 Interior Portal',
  },
];

export const FAQS: FAQItem[] = [
  {
    id: 'timeline',
    question: 'How fast do you build and handover websites?',
    answer: 'I build and deliver websites in days, not months! Most projects are completely handed over within 1 to 2 weeks (3 to 14 days). Plus, every website includes 1 Full Year of Free Maintenance & Free Small Content Changes.',
    category: 'Process',
  },
  {
    id: 'maintenance',
    question: 'What is included in the 1-Year Free Maintenance guarantee?',
    answer: 'Every website includes 1 Full Year of Included Free Maintenance and Free Small Content Changes (updating text, swapping images, blog/project formatting, performance monitoring, and technical maintenance) at zero extra cost!',
    category: 'Services',
  },
  {
    id: 'pricing',
    question: 'What are your package pricing tiers and investment ranges?',
    answer: 'I offer 4 distinct service tiers: Type 1 (Single-Page Static Site) ranges from ₹8,000 to ₹9,000. Type 2 (Single-Page Dynamic CMS Site for blogs, projects & study materials) ranges from ₹12,000 to ₹15,000. Type 3 (Multi-Page Dynamic CMS Platform) ranges from ₹17,000 to ₹20,000. Type 4 (Custom Full-Stack Web App with Node.js/Express & custom backend logic) is custom-quoted after discussion.',
    category: 'Engagement',
  },
  {
    id: 'performance',
    question: 'How do you ensure sub-second load times across mobile networks?',
    answer: 'I enforce strict GPU hardware acceleration, RAF loop synchronization, dynamic code splitting, asset preloading, and edge CDN compression so animations never compromise speed.',
    category: 'Technical',
  },
  {
    id: 'collaboration',
    question: 'How do we collaborate during the project?',
    answer: 'You work directly 1-on-1 with me through Figma reviews, staging preview links, and direct WhatsApp/Slack communication. No middle managers or delays.',
    category: 'Process',
  },
];

export const NAV_LINKS = [
  { label: 'About', href: '/#about' },
  { label: 'Services', href: '/#services' },
  { label: 'Work', href: '/#projects' },
  { label: 'Process', href: '/#process' },
  { label: 'Tech Stack', href: '/#tech' },
  { label: 'Motion Lab', href: '/animations' },
  { label: 'Testimonials', href: '/#testimonials' },
  { label: 'FAQ', href: '/#faq' },
];
