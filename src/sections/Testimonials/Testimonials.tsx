'use client';

import React from 'react';
import { TESTIMONIALS } from '@/constants/data';
import { TextReveal } from '@/components/animations/TextReveal';
import { InfiniteMarquee } from '@/components/animations/InfiniteMarquee';

export const Testimonials: React.FC = () => {
  return (
    <section
      id="testimonials"
      data-theme-bg="#F5F3EE"
      className="relative min-h-screen py-12 sm:py-20 px-0 text-[#0A0A0A] overflow-hidden flex flex-col justify-center transition-colors duration-200 w-full"
    >
      {/* Header Container */}
      <div className="max-w-4xl mx-auto px-6 relative z-10 flex flex-col space-y-4 mb-8 sm:mb-16 text-center items-center">
        <div className="flex items-center gap-4">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#6B7280]">Words from clients</span>
        </div>
        <TextReveal
          as="h2"
          className="font-section-heading text-3xl sm:text-5xl md:text-6xl font-bold text-[#0A0A0A] tracking-tight leading-tight max-w-3xl"
        >
          Endorsed By Leaders At Visionary Companies.
        </TextReveal>
      </div>

      {/* Full-width Marquee Container */}
      <div className="w-full relative z-10">
        <InfiniteMarquee direction="left" speed="slow" pauseOnHover={true} fadeColor="light" interactiveScroll={true}>
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl bg-white border border-[#0A0A0A]/[0.08] hover:border-[#0A0A0A]/20 transition-all duration-300 shadow-sm flex flex-col justify-between max-w-lg min-w-[270px] sm:min-w-[440px] lg:min-w-[480px] space-y-5 sm:space-y-6 select-none"
            >
              <div className="space-y-4">
                {/* Rating — typographic, not icon array */}
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-[#0A0A0A]/40 tracking-wider">★★★★★ 5.0</span>
                  {item.metrics && (
                    <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded bg-[#C5F52A] text-[#0A0A0A] font-mono text-[10px] sm:text-xs font-semibold">
                      {item.metrics}
                    </span>
                  )}
                </div>

                {/* Quote — typographic opening mark, no icon */}
                <p className="font-body-ui text-sm sm:text-base text-[#0A0A0A] font-normal leading-relaxed">
                  <span className="text-[#C5F52A] font-hero-display text-2xl leading-none mr-1 align-text-top">&ldquo;</span>
                  {item.quote}
                </p>
              </div>

              <div className="pt-4 border-t border-[#0A0A0A]/[0.06] flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#F5F3EE] border border-[#0A0A0A]/10 flex items-center justify-center font-mono font-bold text-xs text-[#0A0A0A]">
                  {item.author.charAt(0)}
                </div>
                <div>
                  <h4 className="font-section-heading text-sm font-bold text-[#0A0A0A]">
                    {item.author}
                  </h4>
                  <p className="text-[11px] font-mono text-[#6B7280]">
                    {item.role}, <span className="text-[#0A0A0A]/70">{item.company}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </InfiniteMarquee>
      </div>
    </section>
  );
};
