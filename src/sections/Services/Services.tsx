'use client';

import React, { useState } from 'react';
import { SERVICES } from '@/constants/data';
import { TextReveal } from '@/components/animations/TextReveal';
import { Code2, Palette, Sparkles, Zap, ChevronRight, CheckCircle2 } from 'lucide-react';
import { useTilt } from '@/hooks/useTilt';

const iconMap: Record<string, React.ReactNode> = {
  Code2: <Code2 className="w-7 h-7 text-[#0A0A0A]" />,
  Palette: <Palette className="w-7 h-7 text-[#0A0A0A]" />,
  Sparkles: <Sparkles className="w-7 h-7 text-[#0A0A0A]" />,
  Zap: <Zap className="w-7 h-7 text-[#0A0A0A]" />,
};

const ServiceCard: React.FC<{ service: typeof SERVICES[0]; index: number }> = ({ service, index }) => {
  const tiltRef = useTilt<HTMLDivElement>(8);
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      ref={tiltRef}
      onClick={() => setExpanded(!expanded)}
      className="relative p-8 rounded-3xl bg-white border border-[#0A0A0A]/[0.06] hover:border-[#C5F52A] transition-all duration-300 cursor-pointer group flex flex-col justify-between"
      data-cursor="Expand"
    >
      {/* Accent top line */}
      <div className="absolute top-0 left-8 right-8 h-[2px] bg-[#C5F52A] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />

      <div>
        <div className="flex items-center justify-between mb-8">
          <div className="p-3.5 rounded-2xl bg-[#C5F52A]/15 group-hover:bg-[#C5F52A] transition-colors duration-300">
            {iconMap[service.iconName] || <Code2 className="w-7 h-7 text-[#0A0A0A]" />}
          </div>
          <span className="font-mono text-xs text-[#6B7280] tracking-widest uppercase">
            0{index + 1}
          </span>
        </div>

        {/* Title & Subtitle */}
        <h3 className="font-section-heading text-2xl md:text-3xl font-bold text-[#0A0A0A] group-hover:text-[#0A0A0A] transition-colors duration-300">
          {service.title}
        </h3>
        <p className="text-xs font-mono text-[#6B7280] uppercase tracking-wider mt-2">
          {service.subtitle}
        </p>

        {/* Description */}
        <p className="mt-4 font-body-ui text-sm text-[#6B7280] font-light leading-relaxed">
          {service.description}
        </p>

        {/* Expandable Deliverables */}
        <div
          className={`overflow-hidden transition-all duration-300 ${
            expanded ? 'max-h-96 opacity-100 mt-6 pt-6 border-t border-[#0A0A0A]/[0.06]' : 'max-h-0 opacity-0'
          }`}
        >
          <span className="text-xs uppercase font-mono tracking-widest text-[#0A0A0A] mb-3 block">
            CORE DELIVERABLES:
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

      {/* Card Footer Action */}
      <div className="mt-8 pt-4 border-t border-[#0A0A0A]/[0.06] flex items-center justify-between text-xs font-body-ui text-[#6B7280]">
        <div className="flex items-center gap-2">
          {service.tags.slice(0, 3).map((tag, i) => (
            <span key={i} className="px-2.5 py-1 rounded-lg bg-[#F5F3EE] text-[10px] font-mono text-[#6B7280]">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-1 font-semibold text-[#0A0A0A] group-hover:text-[#C5F52A] transition-colors">
          <span>{expanded ? 'Collapse' : 'Learn More'}</span>
          <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${expanded ? 'rotate-90' : 'group-hover:translate-x-1'}`} />
        </div>
      </div>
    </div>
  );
};

export const Services: React.FC = () => {
  return (
    <section id="services" data-theme-bg="#F5F3EE" className="relative py-32 px-6 md:px-12 lg:px-20 text-[#0A0A0A] transition-colors duration-200">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#6B7280]">
            <span className="w-2 h-2 rounded-full bg-[#C5F52A]" />
            <span>EXPERT CAPABILITIES</span>
          </div>
          <TextReveal
            as="h2"
            className="font-section-heading text-3xl sm:text-5xl md:text-6xl font-bold text-[#0A0A0A] tracking-tight leading-tight max-w-4xl"
          >
            Engineering Experiences That Elevate Brand Value.
          </TextReveal>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SERVICES.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
