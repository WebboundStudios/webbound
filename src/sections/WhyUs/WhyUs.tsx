'use client';

import React from 'react';
import { WHY_US } from '@/constants/data';
import { TextReveal } from '@/components/animations/TextReveal';
import { Shield, Cpu, Gauge, Trophy } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  '01': <Shield className="w-5 h-5 text-[#0A0A0A]" />,
  '02': <Gauge className="w-5 h-5 text-[#0A0A0A]" />,
  '03': <Trophy className="w-5 h-5 text-[#0A0A0A]" />,
  '04': <Cpu className="w-5 h-5 text-[#0A0A0A]" />,
};

export const WhyUs: React.FC = () => {
  return (
    <section id="why-us" data-theme-bg="#F5F3EE" className="relative bg-[#F5F3EE] py-28 sm:py-32 px-6 md:px-12 lg:px-20 text-[#0A0A0A] overflow-hidden transition-colors duration-200">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col space-y-3 mb-16 text-center items-center">
          <div className="flex items-center gap-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#6B7280]">Why clients come back</span>
          </div>
          <TextReveal
            as="h2"
            className="font-section-heading text-3xl sm:text-5xl md:text-6xl font-bold text-[#0A0A0A] tracking-tight leading-tight max-w-3xl"
          >
            Why Visionary Brands Entrust Me With Their Flagship Digital Assets.
          </TextReveal>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {WHY_US.map((item) => (
            <div
              key={item.id}
              className="p-8 sm:p-10 rounded-3xl bg-white border border-[#0A0A0A]/[0.08] hover:border-[#C5F52A] transition-all duration-300 space-y-5 flex flex-col justify-between h-full group shadow-xs hover:shadow-md"
            >
              <div>
                <div className="flex items-start justify-between mb-5">
                  <div className="p-2.5 rounded-xl bg-[#F5F3EE] group-hover:bg-[#C5F52A]/20 transition-colors duration-300">
                    {iconMap[item.number]}
                  </div>
                  <span className="font-mono text-4xl font-black text-[#0A0A0A]/[0.06] group-hover:text-[#0A0A0A]/[0.10] transition-colors">
                    {item.number}
                  </span>
                </div>

                <h3 className="font-section-heading text-xl font-bold text-[#0A0A0A] transition-colors duration-300">
                  {item.title}
                </h3>

                <p className="mt-2 font-body-ui text-sm text-[#6B7280] font-light leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#0A0A0A]/[0.06]">
                <span className="font-mono text-[11px] uppercase tracking-wider text-[#0A0A0A] font-bold">
                  {item.highlight}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
