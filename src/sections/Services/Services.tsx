'use client';

import React, { useState } from 'react';
import { SERVICES } from '@/constants/data';
import { TextReveal } from '@/components/animations/TextReveal';
import { TextRoll } from '@/components/animations/TextRoll';
import { Layout, Edit3, Layers, Database, ChevronRight } from 'lucide-react';
import { useTilt } from '@/hooks/useTilt';

const iconMap: Record<string, React.ReactNode> = {
  Layout: <Layout className="w-6 h-6 text-[#0A0A0A]" />,
  Edit3: <Edit3 className="w-6 h-6 text-[#0A0A0A]" />,
  Layers: <Layers className="w-6 h-6 text-[#0A0A0A]" />,
  Database: <Database className="w-6 h-6 text-[#0A0A0A]" />,
};

interface ServiceCardProps {
  service: typeof SERVICES[0];
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, index, isExpanded, onToggle }) => {
  const tiltRef = useTilt<HTMLDivElement>(8);

  return (
    <div
      ref={tiltRef}
      onClick={onToggle}
      className={`relative pl-7 pr-7 sm:pl-9 sm:pr-9 pt-7 pb-7 sm:pt-9 sm:pb-9 rounded-3xl bg-white border-l-4 border-t border-r border-b transition-all duration-300 cursor-pointer group flex flex-col justify-between shadow-xs hover:shadow-md ${
        isExpanded
          ? 'border-l-[#C5F52A] border-t-[#0A0A0A]/[0.06] border-r-[#0A0A0A]/[0.06] border-b-[#0A0A0A]/[0.06]'
          : 'border-l-[#0A0A0A]/10 border-t-[#0A0A0A]/[0.06] border-r-[#0A0A0A]/[0.06] border-b-[#0A0A0A]/[0.06] hover:border-l-[#C5F52A]'
      }`}
      data-cursor="Expand"
    >
      <div>
        <div className="flex flex-wrap items-start justify-between gap-3 mb-6">
          <div className="p-3 rounded-xl bg-[#F5F3EE]">
            {iconMap[service.iconName] || <Layout className="w-6 h-6 text-[#0A0A0A]" />}
          </div>
          {service.priceRange && (
            <span className="font-mono text-[11px] text-[#6B7280] tracking-wider">{service.priceRange}</span>
          )}
        </div>

        {/* Index marker */}
        <span className="font-mono text-[10px] text-[#0A0A0A]/20 tracking-widest uppercase block mb-2">
          0{index + 1}
        </span>

        {/* Title & Subtitle */}
        <h3 className="font-section-heading text-2xl sm:text-3xl font-bold text-[#0A0A0A] transition-colors duration-300">
          {service.title}
        </h3>
        <p className="text-xs font-mono text-[#6B7280] uppercase tracking-wider mt-1.5">
          {service.subtitle}
        </p>

        {/* Description */}
        <p className="mt-4 font-body-ui text-sm text-[#6B7280] font-light leading-relaxed">
          {service.description}
        </p>

        {/* Expandable Deliverables */}
        <div
          className={`overflow-hidden transition-all duration-300 ${
            isExpanded ? 'max-h-96 opacity-100 mt-6 pt-6 border-t border-[#0A0A0A]/[0.06]' : 'max-h-0 opacity-0'
          }`}
        >
          <span className="text-xs uppercase font-mono tracking-widest text-[#0A0A0A] mb-3 block font-bold">
            Deliverables
          </span>
          <ul className="space-y-1.5">
            {service.deliverables.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-xs font-body-ui text-[#6B7280]">
                <span className="text-[#C5F52A] font-mono shrink-0 mt-px">—</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 mt-6 border-t border-[#0A0A0A]/[0.06] text-xs font-mono">
        <div className="flex flex-wrap gap-1.5">
          {service.tags.map((tag, i) => (
            <span key={i} className="text-[#6B7280] text-[11px] after:content-[','] last:after:content-[''] after:ml-0.5">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-1 font-bold text-[#0A0A0A] shrink-0 self-start sm:self-auto">
          <TextRoll center>{isExpanded ? 'Less' : 'Details'}</TextRoll>
          <ChevronRight className={`w-3.5 h-3.5 transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`} />
        </div>
      </div>
    </div>
  );
};

export const Services: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="services" data-theme-bg="#F5F3EE" className="relative py-24 sm:py-32 px-6 md:px-12 lg:px-20 text-[#0A0A0A] transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col space-y-3 mb-16">
          <div className="flex items-center gap-4">
            <span className="font-mono text-[10px] text-[#0A0A0A]/20 tracking-widest uppercase">03 /</span>
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#6B7280]">Offering &amp; Pricing</span>
          </div>
          <TextReveal
            as="h2"
            className="font-section-heading text-3xl sm:text-5xl md:text-6xl font-bold text-[#0A0A0A] tracking-tight leading-tight max-w-4xl"
          >
            Tailored Development Tiers Designed For Every Brand Stage.
          </TextReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-start">
          {SERVICES.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
              isExpanded={expandedId === service.id}
              onToggle={() => toggleExpand(service.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
