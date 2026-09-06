'use client';

import React, { useState } from 'react';
import { SERVICES } from '@/constants/data';
import { TextReveal } from '@/components/animations/TextReveal';
import { TextRoll } from '@/components/animations/TextRoll';
import { Layout, Edit3, Layers, Database, ChevronDown, ArrowUpRight, Check } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Layout: <Layout className="w-5 h-5" />,
  Edit3: <Edit3 className="w-5 h-5" />,
  Layers: <Layers className="w-5 h-5" />,
  Database: <Database className="w-5 h-5" />,
};

// Distinct editorial colorways for each service tier
const TIER_STYLES = [
  {
    bg: 'bg-white',
    text: 'text-[#0A0A0A]',
    border: 'border-[#0A0A0A]/10',
    subtext: 'text-[#6B7280]',
    tagBg: 'bg-[#0A0A0A]/5 border-[#0A0A0A]/10 text-[#0A0A0A]',
    accent: '#C5F52A',
    badge: 'STARTER STUDIO TIER',
  },
  {
    bg: 'bg-[#141414]',
    text: 'text-white',
    border: 'border-white/10',
    subtext: 'text-[#9CA3AF]',
    tagBg: 'bg-white/10 border-white/10 text-white',
    accent: '#C5F52A',
    badge: 'DYNAMIC CMS TIER',
  },
  {
    bg: 'bg-[#181520]',
    text: 'text-white',
    border: 'border-white/10',
    subtext: 'text-[#A1A1AA]',
    tagBg: 'bg-white/10 border-white/10 text-[#E4D9FF]',
    accent: '#A78BFA',
    badge: 'SIGNATURE SPATIAL TIER',
  },
  {
    bg: 'bg-white',
    text: 'text-[#0A0A0A]',
    border: 'border-[#0A0A0A]/15',
    subtext: 'text-[#6B7280]',
    tagBg: 'bg-[#0A0A0A]/5 border-[#0A0A0A]/10 text-[#0A0A0A]',
    accent: '#C5F52A',
    badge: 'CUSTOM APPLICATION TIER',
  },
];

export const Services: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="services" data-theme-bg="#F5F3EE" className="relative py-28 sm:py-36 px-6 md:px-12 lg:px-20 text-[#0A0A0A] transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20 pb-8 border-b border-[#0A0A0A]/[0.08]">
          <div className="flex flex-col space-y-3 max-w-3xl">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#0A0A0A]" />
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#6B7280]">
                Capabilities &bull; What We Deliver
              </span>
            </div>
            <TextReveal
              as="h2"
              className="font-section-heading text-4xl sm:text-5xl lg:text-6xl font-black text-[#0A0A0A] tracking-[-0.03em] leading-[1.05]"
            >
              Tailored engineering for every brand scale.
            </TextReveal>
          </div>

          <p className="font-body-ui text-sm sm:text-base text-[#6B7280] font-light leading-relaxed max-w-md">
            Whether you need a sub-second single-page flagship or an enterprise multi-page headless architecture — every tier is engineered from scratch with zero template bloat.
          </p>
        </div>

        {/* Asymmetric 12-Column Grid Flow */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {SERVICES.map((service, index) => {
            const isExpanded = expandedId === service.id;
            const style = TIER_STYLES[index % TIER_STYLES.length];
            // Alternating column span rhythm: 7-5, then 5-7
            const colSpan = (index === 0 || index === 3) ? 'lg:col-span-7' : 'lg:col-span-5';

            return (
              <div
                key={service.id}
                onClick={() => toggleExpand(service.id)}
                className={`${colSpan} relative p-8 sm:p-10 rounded-[32px] ${style.bg} ${style.text} border ${style.border} shadow-sm hover:shadow-xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer group flex flex-col justify-between`}
                data-cursor="Details"
              >
                {/* Card Header */}
                <div>
                  <div className="flex items-center justify-between gap-3 mb-6 pb-4 border-b border-current/10">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-current/5">
                        {iconMap[service.iconName] || <Layout className="w-5 h-5" />}
                      </div>
                      <span className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] opacity-70">
                        0{index + 1} // {style.badge}
                      </span>
                    </div>
                    {service.tierBadge && (
                      <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider font-semibold bg-[#C5F52A] text-[#0A0A0A]">
                        {service.tierBadge}
                      </span>
                    )}
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="font-section-heading text-2xl sm:text-3xl font-bold tracking-tight leading-snug">
                    {service.title}
                  </h3>
                  <p className={`text-xs font-mono uppercase tracking-wider mt-2 ${style.subtext}`}>
                    {service.subtitle}
                  </p>

                  {/* Description */}
                  <p className={`mt-4 font-body-ui text-sm sm:text-base font-light leading-relaxed ${style.subtext}`}>
                    {service.description}
                  </p>

                  {/* Expandable Deliverables List */}
                  <div
                    className={`overflow-hidden transition-all duration-400 ease-out ${
                      isExpanded ? 'max-h-96 opacity-100 mt-6 pt-6 border-t border-current/10' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <span className="text-[11px] uppercase font-mono tracking-widest font-bold block mb-3 opacity-90">
                      Deliverable Scope:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {service.deliverables.map((item, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs font-body-ui opacity-80">
                          <Check className="w-3.5 h-3.5 text-[#C5F52A] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="pt-6 mt-6 border-t border-current/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-1.5">
                    {service.tags.slice(0, 3).map((tag, i) => (
                      <span
                        key={i}
                        className={`px-2.5 py-0.5 rounded-full border text-[10px] font-mono tracking-wide ${style.tagBg}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold tracking-wider shrink-0">
                    <TextRoll center>{isExpanded ? 'Collapse Scope' : 'View Full Scope'}</TextRoll>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};