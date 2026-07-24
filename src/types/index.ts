export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  deliverables: string[];
  tags: string[];
  priceRange?: string;
  tierBadge?: string;
  accentColor?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  year: string;
  description: string;
  client: string;
  impact: string;
  image: string;
  videoUrl?: string;
  tags: string[];
  link?: string;
  featured: boolean;
  tier?: string;
  longDescription?: string;
  challenge?: string;
  solution?: string;
  role?: string;
  githubLink?: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar?: string;
  metrics?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface TechItem {
  id: string;
  name: string;
  category: 'frontend' | 'animation' | 'backend' | 'design' | 'tools';
  icon: string;
  level: string;
  description: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  details: string[];
}

export interface WhyUsItem {
  id: string;
  number: string;
  title: string;
  description: string;
  highlight: string;
}
