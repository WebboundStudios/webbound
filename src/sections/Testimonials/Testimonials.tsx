'use client';

import React from 'react';
import { TESTIMONIALS } from '@/constants/data';
import { TextReveal } from '@/components/animations/TextReveal';
import { InfiniteMarquee } from '@/components/animations/InfiniteMarquee';
import { Quote, Star } from 'lucide-react';

export const Testimonials: React.FC = () => {
  return (
    <section
      id="testimonials"
      data-theme-bg="#F5F3EE"
      className="relative min-h-screen py-12 sm:py-20 px-0 text-[#0A0A0A] overflow-hidden flex flex-col justify-center transition-colors duration-200 w-full"
    >
      {/* Header Container */}
      <div className="max-w-4xl mx-auto px-6 relative z-10 flex flex-col space-y-4 mb-8 sm:mb-16 text-center items-center">
        <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#6B7280]">
          <span className="w-2 h-2 rounded-full bg-[#C5F52A]" />
          <span>CLIENT TESTIMONIALS</span>
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
              className="p-5 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl bg-white border border-[#0A0A0A]/[0.08] hover:border-[#C5F52A] transition-all duration-300 shadow-sm flex flex-col justify-between max-w-lg min-w-[270px] sm:min-w-[440px] lg:min-w-[480px] space-y-4 sm:space-y-6 select-none"
            >
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between">
                  <Quote className="w-6 h-6 sm:w-8 sm:h-8 text-[#0A0A0A]" />
                  <div className="flex items-center gap-1 text-[#0A0A0A]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-[#0A0A0A]" />
                    ))}
                  </div>
                </div>

                <p className="font-body-ui text-xs sm:text-base text-[#6B7280] font-light leading-relaxed italic">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              <div className="pt-4 sm:pt-6 border-t border-[#0A0A0A]/[0.06] flex items-center justify-between gap-2">
                <div>
                  <h4 className="font-section-heading text-xs sm:text-base font-bold text-[#0A0A0A]">
                    {item.author}
                  </h4>
                  <p className="text-[11px] sm:text-xs font-mono text-[#6B7280]">
                    {item.role}, <span className="text-[#0A0A0A] font-semibold">{item.company}</span>
                  </p>
                </div>

                {item.metrics && (
                  <span className="px-2 py-0.5 sm:px-3 sm:py-1 rounded-full bg-[#C5F52A] text-[#0A0A0A] font-mono text-[10px] sm:text-xs font-semibold shrink-0">
                    {item.metrics}
                  </span>
                )}
              </div>
            </div>
          ))}
        </InfiniteMarquee>
      </div>
    </section>
  );
};

