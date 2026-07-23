'use client';

import React, { useState } from 'react';
import { SERVICES } from '@/constants/data';
import { TextReveal } from '@/components/animations/TextReveal';
import { TextRoll } from '@/components/animations/TextRoll';
import { Layout, Edit3, Layers, Database, ChevronRight, CheckCircle2, Tag } from 'lucide-react';
import { useTilt } from '@/hooks/useTilt';

const iconMap: Record<string, React.ReactNode> = {
  Layout: <Layout className="w-7 h-7 text-[#0A0A0A]" />,
  Edit3: <Edit3 className="w-7 h-7 text-[#0A0A0A]" />,
  Layers: <Layers className="w-7 h-7 text-[#0A0A0A]" />,
  Database: <Database className="w-7 h-7 text-[#0A0A0A]" />,
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
      className={`relative p-7 sm:p-9 rounded-3xl bg-white border transition-all duration-300 cursor-pointer group flex flex-col justify-between shadow-xs hover:shadow-md ${
        isExpanded ? 'border-[#C5F52A] ring-2 ring-[#C5F52A]/30' : 'border-[#0A0A0A]/[0.06] hover:border-[#C5F52A]'
      }`}
      data-cursor="Expand"
    >
      {/* Accent top line */}
      <div
        className={`absolute top-0 left-8 right-8 h-[2px] bg-[#C5F52A] transition-opacity duration-300 rounded-full ${
          isExpanded ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
        }`}
      />

      <div>
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="p-3.5 rounded-2xl bg-[#C5F52A]/15 group-hover:bg-[#C5F52A] transition-colors duration-300">
            {iconMap[service.iconName] || <Layout className="w-7 h-7 text-[#0A0A0A]" />}
          </div>
          {service.priceRange && (
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#0A0A0A] text-[#C5F52A] text-xs font-mono font-bold tracking-tight shadow-xs">
              <Tag className="w-3.5 h-3.5 text-[#C5F52A]" />
              <span>{service.priceRange}</span>
            </div>
          )}
        </div>

        {/* Title & Subtitle */}
        <h3 className="font-section-heading text-2xl sm:text-3xl font-bold text-[#0A0A0A] transition-colors duration-300">
          {service.title}
        </h3>
        <p className="text-xs font-mono text-[#6B7280] uppercase tracking-wider mt-2 font-medium">
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
            KEY DELIVERABLES:
          </span>
          <ul className="space-y-2">
            {service.deliverables.map((item, i) => (
              <li key={i} className="flex items-center gap-2 text-xs font-body-ui text-[#6B7280]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C5F52A] shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Footer info: tags & expandable trigger */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 mt-6 border-t border-[#0A0A0A]/[0.06] text-xs font-mono">
        <div className="flex flex-wrap gap-2">
          {service.tags.map((tag, i) => (
            <span key={i} className="px-2.5 py-1 rounded-full bg-[#F5F3EE] text-[#6B7280] text-[11px] sm:text-xs">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-1 font-bold text-[#0A0A0A] shrink-0 self-start sm:self-auto group-hover:text-[#0A0A0A]">
          <TextRoll center>{isExpanded ? 'Show Less' : 'Package Details'}</TextRoll>
          <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`} />
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
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#6B7280]">
            <span className="w-2 h-2 rounded-full bg-[#C5F52A]" />
            <span>OFFERING PACKAGES & PRICING</span>
          </div>
          <TextReveal
            as="h2"
            className="font-section-heading text-3xl sm:text-5xl md:text-6xl font-bold text-[#0A0A0A] tracking-tight leading-tight max-w-4xl"
          >
            Tailored Development Tiers Designed For Every Brand Stage.
          </TextReveal>
        </div>

        {/* 4 Tier Grid — items-start prevents adjacent grid items from stretching */}
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
