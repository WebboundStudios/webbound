'use client';

import React, { useEffect, useRef } from 'react';
import { PROCESS_STEPS } from '@/constants/data';
import { TextReveal } from '@/components/animations/TextReveal';
import { TextRoll } from '@/components/animations/TextRoll';
import { ShieldCheck } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const Process: React.FC = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const activeLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeline = timelineRef.current;
    const activeLine = activeLineRef.current;
    if (!timeline || !activeLine) return;

    const ctx = gsap.context(() => {
      gsap.to(activeLine, {
        height: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: timeline,
          start: 'top 60%',
          end: 'bottom 70%',
          scrub: 0.3,
        },
      });

      const stepNodes = timeline.querySelectorAll('.process-step-node');
      stepNodes.forEach((node) => {
        gsap.fromTo(
          node,
          {
            scale: 1,
            backgroundColor: '#FFFFFF',
            color: '#6B7280',
            borderColor: 'rgba(10, 10, 10, 0.12)',
          },
          {
            scale: 1.2,
            backgroundColor: '#C5F52A',
            color: '#0A0A0A',
            borderColor: '#0A0A0A',
            boxShadow: '0 0 30px rgba(197, 245, 42, 0.8)',
            duration: 0.3,
            scrollTrigger: {
              trigger: node,
              start: 'top 60%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="process" data-theme-bg="#F5F3EE" className="relative py-20 sm:py-32 px-4 sm:px-12 lg:px-20 text-[#0A0A0A] overflow-hidden transition-colors duration-500">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-20">
          <div className="flex flex-col space-y-3">
            <div className="flex items-center gap-4">
              <span className="font-mono text-[10px] text-[#0A0A0A]/20 tracking-widest uppercase">04 /</span>
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#6B7280]">How the work comes together</span>
            </div>
            <TextReveal
              as="h2"
              className="font-section-heading text-3xl sm:text-5xl md:text-6xl font-bold text-[#0A0A0A] tracking-tight leading-tight max-w-4xl"
            >
              Rapid Delivery In Days, Not Months.
            </TextReveal>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0A0A0A] text-[#C5F52A] text-xs font-mono font-bold tracking-tight shadow-sm shrink-0 w-fit">
            <ShieldCheck className="w-3.5 h-3.5 text-[#C5F52A]" />
            <TextRoll center>1 YR FREE MAINTENANCE</TextRoll>
          </div>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative ml-2 sm:ml-8 space-y-10 sm:space-y-16 pl-7 sm:pl-16">
          {/* Track */}
          <div className="absolute left-[11px] sm:left-[23px] top-[14px] bottom-[14px] w-0.5 sm:w-1 -translate-x-1/2 pointer-events-none z-0">
            <div className="w-full h-full bg-[#0A0A0A]/10 rounded-full" />
            <div
              ref={activeLineRef}
              className="absolute top-0 left-0 w-full bg-[#C5F52A] rounded-full shadow-[0_0_12px_#C5F52A]"
              style={{ height: '0%' }}
            >
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-[#C5F52A] shadow-[0_0_18px_#C5F52A,0_0_36px_#C5F52A]" />
            </div>
          </div>

          {/* Steps */}
          {PROCESS_STEPS.map((stepItem) => (
            <div key={stepItem.step} className="relative group z-10">
              {/* Node */}
              <div className="process-step-node absolute -left-[32px] sm:-left-[69px] top-0 w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-[11px] sm:text-xs font-mono font-bold transition-all duration-300 border border-[#0A0A0A]/12 shadow-xs bg-white text-[#6B7280]">
                {stepItem.step}
              </div>

              {/* Card */}
              <div className="p-5 sm:p-10 rounded-2xl sm:rounded-3xl bg-white border border-[#0A0A0A]/[0.08] hover:border-[#C5F52A] transition-all duration-300 space-y-4 sm:space-y-6 shadow-xs hover:shadow-md">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#0A0A0A]/[0.06] pb-4 sm:pb-6">
                  <div>
                    <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[#6B7280] block">
                      {stepItem.subtitle}
                    </span>
                    <h3 className="font-section-heading text-xl sm:text-3xl font-bold text-[#0A0A0A] mt-0.5">
                      {stepItem.title}
                    </h3>
                  </div>
                  {/* Duration — just the value, no "TIMELINE:" prefix */}
                  <span className="font-mono text-xs text-[#6B7280] shrink-0">{stepItem.duration}</span>
                </div>

                <p className="font-body-ui text-sm sm:text-base text-[#6B7280] font-light leading-relaxed">
                  {stepItem.description}
                </p>

                {/* Deliverables — simple comma-separated text, no icon chips */}
                <p className="text-xs font-mono text-[#0A0A0A]/50 leading-relaxed">
                  {stepItem.details.join(' · ')}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
