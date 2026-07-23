'use client';

import React from 'react';
import { WHY_US } from '@/constants/data';
import { TextReveal } from '@/components/animations/TextReveal';
import { Shield, Cpu, Gauge, Trophy } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  '01': <Shield className="w-6 h-6 text-[#0A0A0A]" />,
  '02': <Gauge className="w-6 h-6 text-[#0A0A0A]" />,
  '03': <Trophy className="w-6 h-6 text-[#0A0A0A]" />,
  '04': <Cpu className="w-6 h-6 text-[#0A0A0A]" />,
};

export const WhyUs: React.FC = () => {
  return (
    <section id="why-us" data-theme-bg="#F5F3EE" className="relative bg-[#F5F3EE] py-28 sm:py-32 px-6 md:px-12 lg:px-20 text-[#0A0A0A] transition-colors duration-200">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col space-y-3 mb-16 text-center items-center">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#6B7280]">
            <span className="w-2 h-2 rounded-full bg-[#C5F52A]" />
            <span>WHY WORK WITH ME</span>
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
              className="p-8 sm:p-10 rounded-3xl bg-white border border-[#0A0A0A]/[0.08] hover:border-[#C5F52A] transition-all duration-300 space-y-6 flex flex-col justify-between h-full group shadow-xs hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3 rounded-2xl bg-[#C5F52A]/20">
                    {iconMap[item.number]}
                  </div>
                  <span className="font-mono text-3xl font-black text-[#0A0A0A]/10 group-hover:text-[#0A0A0A]/20 transition-colors">
                    {item.number}
                  </span>
                </div>

                <h3 className="font-section-heading text-2xl font-bold text-[#0A0A0A] transition-colors duration-300">
                  {item.title}
                </h3>

                <p className="mt-3 font-body-ui text-sm text-[#6B7280] font-light leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#0A0A0A]/[0.06] flex items-center justify-between text-xs font-mono">
                <span className="text-[#0A0A0A] uppercase tracking-wider font-bold">
                  {item.highlight}
                </span>
                <span className="text-[#6B7280]">PERSONAL COMMITMENT</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
