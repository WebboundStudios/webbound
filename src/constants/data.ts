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
    id: 'web-development',
    title: 'Bespoke Web Engineering',
    subtitle: 'Next.js 15, React 19 & Scalable Architecture',
    description: 'I build ultra-fast, robust web applications using cutting-edge modern stacks. Designed for sub-second load times while rendering fluid interactive interfaces.',
    iconName: 'Code2',
    deliverables: ['Next.js 15 App Architecture', 'GPU-Accelerated Visual Logic', 'Custom API & Payment Integrations', 'Strict Type-Safe Codebases'],
    tags: ['Next.js', 'React 19', 'TypeScript', 'Tailwind CSS'],
    accentColor: '#C5F52A',
  },
  {
    id: 'creative-direction',
    title: 'Creative Direction & UI/UX Design',
    subtitle: 'Refined Motion & Bespoke Micro-Interactions',
    description: 'Sophisticated visual design systems crafted for high-end brand appeal. Every component, typography choice, color palette, and micro-animation is designed to tell your authentic story.',
    iconName: 'Palette',
    deliverables: ['Interactive Prototype Systems', 'Motion-First Design Guidelines', 'Custom Iconography & Typography', 'User Experience Optimization'],
    tags: ['Creative Direction', 'Framer', 'GSAP', 'User Experience'],
    accentColor: '#C5F52A',
  },
  {
    id: 'interactive-3d',
    title: 'Interactive Motion & Canvas Animation',
    subtitle: '60 FPS Smooth Scroll & Physics Interactions',
    description: 'Dynamic canvas graphics, WebGL shaders, particle fields, and smooth scroll physics that turn static web pages into fluid digital experiences.',
    iconName: 'Sparkles',
    deliverables: ['GSAP Premium ScrollTrigger', 'WebGL Shaders & Canvas 2D', 'Lenis Smooth Scroll Physics', 'Custom Interactive Physics'],
    tags: ['GSAP Premium', 'Canvas 2D', 'Three.js', 'WebGL'],
    accentColor: '#C5F52A',
  },
  {
    id: 'performance-seo',
    title: 'Speed Optimization & Technical SEO',
    subtitle: 'Sub-Second Load Times & Search Engine Dominance',
    description: 'Zero layout shift, instant page hydration, optimized asset pipelines, and complete Schema.org structured data to ensure maximum search visibility.',
    iconName: 'Zap',
    deliverables: ['Sub-Second Load Times', 'Structured Data Schema.org', 'Zero Cumulative Layout Shift', 'Global CDN Edge Deployment'],
    tags: ['Instant Load', 'Core Web Vitals', 'Metadata API', 'SEO'],
    accentColor: '#C5F52A',
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'the-trusted-wall',
    title: 'The Trusted Wall Architecture',
    category: 'Architecture & Luxury Interiors',
    year: '2026',
    description: 'A flagship architectural and luxury interior design studio platform for Ar. Himanshu Gautam, featuring Vastu-integrated spatial planning, interactive portfolio inspection, and dynamic project galleries.',
    client: 'The Trusted Wall Studio (Agra)',
    impact: 'Premier Architectural Studio Flagship',
    image: 'https://ik.imagekit.io/dhyh95euj/webbound/TrustedWall.webp',
    tags: ['React 19', 'GSAP', 'Sanity CMS', 'Tailwind CSS v4', 'Vite'],
    link: 'https://thetrustedwall.com/',
    featured: true,
  },
  {
    id: 'tdid-interiors',
    title: 'TDID Interiors Luxury Studio',
    category: 'Luxury Interior Design & Turnkey',
    year: '2026',
    description: 'A bespoke luxury interior design digital portal for TDID Interiors in Greater Noida, featuring custom modular kitchen lookbooks, woodwork interactive inspection, and Lenis smooth scroll.',
    client: 'TDID Interiors (Delhi NCR)',
    impact: 'Bespoke Turnkey Interior Platform',
    image: 'https://ik.imagekit.io/dhyh95euj/webbound/Tdid-interiors.webp',
    tags: ['React 19', 'Lenis Scroll', 'GSAP', 'Tailwind CSS v4', 'Formspree'],
    link: 'https://tdidinteriors.com/',
    featured: true,
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: '01',
    title: 'Deep Discovery & Brand Architecture',
    subtitle: 'Deconstructing brand essence & business goals',
    description: 'I analyze your business objectives, target audience, and market landscape 1-on-1 to establish a bold creative strategy and technical blueprint.',
    duration: 'Week 1',
    details: ['Brand Essence Audit', 'Moodboard & Typography Selection', 'Technical Architecture Blueprint', 'Motion & Interaction Mapping'],
  },
  {
    step: '02',
    title: 'Bespoke UI/UX & Motion Prototyping',
    subtitle: 'Designing for clarity and immediate visual impact',
    description: 'Every component is custom-designed by me down to the pixel. I craft responsive layouts, motion curves, micro-interactions, and lighting details.',
    duration: 'Weeks 2 - 3',
    details: ['Interactive Desktop & Mobile Prototypes', 'Design System Architecture', 'Custom Iconography & Typography Scale', 'Motion Sign-off'],
  },
  {
    step: '03',
    title: 'Precision Engineering & Motion Integration',
    subtitle: 'Writing clean code with 60 FPS fluidity',
    description: 'I write every line of code using Next.js 15, React 19, GSAP Premium, and Lenis. GPU-accelerated transforms ensure smooth performance across all devices.',
    duration: 'Weeks 4 - 6',
    details: ['Modular Component Architecture', 'GSAP ScrollTrigger Logic', 'Custom Canvas 2D & Shader Pipeline', 'Responsive Mobile Optimization'],
  },
  {
    step: '04',
    title: 'Performance Tuning & Quality Assurance',
    subtitle: 'Achieving sub-second load times',
    description: 'I rigorously test across real mobile devices, screen sizes, and network conditions to ensure zero layout shift, rapid load speeds, and strict accessibility.',
    duration: 'Week 7',
    details: ['Core Web Vitals Optimization', 'Cross-Browser & Hardware Testing', 'Accessibility (WCAG 2.1 AA) Audit', 'SEO Metadata Schema Setup'],
  },
  {
    step: '05',
    title: 'Launch & Global Edge Deployment',
    subtitle: 'Deploying to high-reliability edge infrastructure',
    description: 'Production deployment with continuous edge caching, analytics integration, Formspree endpoints, and direct 1-on-1 ongoing technical support.',
    duration: 'Week 8',
    details: ['Vercel Edge Deployment', 'Formspree Endpoint Integration', 'Post-Launch Performance Audit', '1-on-1 Direct Support'],
  },
];

export const WHY_US: WhyUsItem[] = [
  {
    id: 'no-templates',
    number: '01',
    title: 'Zero Templates. 100% Handcrafted.',
    description: 'I reject generic templates and agency bloat. Every layout grid, typography pair, and scroll animation is handcrafted by me specifically for your brand.',
    highlight: 'Handcrafted Quality',
  },
  {
    id: 'direct-collaboration',
    number: '02',
    title: '1-on-1 Direct Collaboration',
    description: 'No middle managers, account reps, or miscommunications. You work directly with the lead engineer & designer building your project.',
    highlight: 'Direct Founder Access',
  },
  {
    id: 'performance-first',
    number: '03',
    title: 'Sub-Second Load Performance',
    description: 'Rich visuals without the bloat. GPU hardware acceleration and RAF optimization ensure instant load speeds across 4G and 5G networks.',
    highlight: 'Sub-Second Speeds',
  },
  {
    id: 'refinement-standard',
    number: '04',
    title: 'Ultra-Refined Creative Direction',
    description: 'I design digital flagships with quiet luxury aesthetics inspired by modern pioneers like Apple, Stripe, and Linear.',
    highlight: 'Quiet Luxury Design',
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
    quote: 'Webbound engineered an architectural digital flagship for The Trusted Wall. His attention to spatial layout, fluid GSAP motion, and sub-second load performance exceeded our expectations.',
    author: 'Ar. Himanshu Gautam',
    role: 'Founder & Lead Architect',
    company: 'The Trusted Wall (Agra)',
    metrics: 'Flagship Architecture Platform',
  },
  {
    id: '2',
    quote: 'The level of craftsmanship and motion detail in our luxury interior portal is outstanding. Smooth scroll physics and interactive modular lookbooks gave us a distinct brand edge.',
    author: 'Founder & Principal Designer',
    role: 'Lead Interior Designer',
    company: 'TDID Interiors (Delhi NCR)',
    metrics: 'Turnkey Interior Portal',
  },
];

export const FAQS: FAQItem[] = [
  {
    id: 'timeline',
    question: 'How long does a typical project take?',
    answer: 'Most custom digital experiences take between 3 to 6 weeks depending on scope, custom canvas graphics, and interactive requirements. I work directly in focused sprints with transparent milestones.',
    category: 'Process',
  },
  {
    id: 'pricing',
    question: 'What is your project investment range?',
    answer: 'My bespoke flagship websites range from ₹75,000 to ₹3 Lakhs+ depending on custom animation, page count, and interactive canvas complexity. Every proposal is custom-scoped for your goals.',
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
  {
    id: 'maintenance',
    question: 'Do you offer post-launch support and maintenance?',
    answer: 'Yes! I provide monthly retainer options covering performance monitoring, feature upgrades, SEO optimizations, and direct priority support.',
    category: 'Services',
  },
];

export const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#projects' },
  { label: 'Process', href: '#process' },
  { label: 'Tech Stack', href: '#tech' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'FAQ', href: '#faq' },
];
