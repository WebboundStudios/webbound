'use client';

import React, { useEffect, useRef } from 'react';
import { PROCESS_STEPS } from '@/constants/data';
import { TextReveal } from '@/components/animations/TextReveal';
import { Clock, CheckCircle2 } from 'lucide-react';
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
      // 1. Animate active solid neon line height from 0% to 100% between Point 1 and Point 5
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

      // 2. Scale up and illuminate each node in neon lime as the line crosses it
      const stepNodes = timeline.querySelectorAll('.process-step-node');
      stepNodes.forEach((node) => {
        gsap.fromTo(
          node,
          {
            scale: 1,
            backgroundColor: '#FFFFFF',
            color: '#6B7280',
            borderColor: 'rgba(10, 10, 10, 0.12)',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
          },
          {
            scale: 1.25,
            backgroundColor: '#C5F52A',
            color: '#0A0A0A',
            borderColor: '#0A0A0A',
            boxShadow: '0 0 35px rgba(197, 245, 42, 0.95), 0 0 15px rgba(197, 245, 42, 0.8)',
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
    <section id="process" data-theme-bg="#F5F3EE" className="relative py-32 px-6 md:px-12 lg:px-20 text-[#0A0A0A] overflow-hidden transition-colors duration-200">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col space-y-3 mb-20">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#6B7280]">
            <span className="w-2 h-2 rounded-full bg-[#C5F52A]" />
            <span>OUR METHODOLOGY</span>
          </div>
          <TextReveal
            as="h2"
            className="font-section-heading text-3xl sm:text-5xl md:text-6xl font-bold text-[#0A0A0A] tracking-tight leading-tight max-w-4xl"
          >
            A Rigorous Journey From Concept To Launch.
          </TextReveal>
        </div>

        {/* Timeline Process Container */}
        <div ref={timelineRef} className="relative ml-4 md:ml-8 space-y-16 pl-10 md:pl-16">
          {/* Active Animated Solid Neon Line Track from Point 1 to Point 5 */}
          <div className="absolute left-[15px] md:left-[23px] top-[18px] bottom-[18px] w-1 -translate-x-1/2 pointer-events-none z-0">
            {/* Solid Background Base Track */}
            <div className="w-full h-full bg-[#0A0A0A]/10 rounded-full" />

            {/* GSAP Animated Solid Neon Line Moving With Scroll */}
            <div
              ref={activeLineRef}
              className="absolute top-0 left-0 w-full bg-[#C5F52A] rounded-full shadow-[0_0_15px_#C5F52A]"
              style={{ height: '0%' }}
            >
              {/* Traveling Glowing Line Head Tip */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-4 h-4 rounded-full bg-[#C5F52A] shadow-[0_0_20px_#C5F52A,0_0_40px_#C5F52A]" />
            </div>
          </div>

          {/* Timeline Steps */}
          {PROCESS_STEPS.map((stepItem) => (
            <div key={stepItem.step} className="relative group z-10">
              {/* Step Point Node (01 - 05) */}
              <div className="process-step-node absolute -left-[45px] md:-left-[69px] top-0 w-9 h-9 rounded-full flex items-center justify-center text-xs font-mono font-bold transition-all duration-300 border border-[#0A0A0A]/12 shadow-xs bg-white text-[#6B7280]">
                {stepItem.step}
              </div>

              {/* Step Card */}
              <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[#0A0A0A]/[0.08] hover:border-[#C5F52A] transition-all duration-300 space-y-6 shadow-sm hover:shadow-md">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#0A0A0A]/[0.06] pb-6">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-widest text-[#6B7280] group-hover:text-[#0A0A0A] transition-colors block font-semibold">
                      {stepItem.subtitle}
                    </span>
                    <h3 className="font-section-heading text-2xl md:text-3xl font-bold text-[#0A0A0A] mt-1">
                      {stepItem.title}
                    </h3>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F5F3EE] border border-[#0A0A0A]/[0.06] text-xs font-mono text-[#6B7280] w-fit">
                    <Clock className="w-3.5 h-3.5 text-[#0A0A0A]" />
                    <span>TIMELINE: {stepItem.duration}</span>
                  </div>
                </div>

                <p className="font-body-ui text-sm md:text-base text-[#6B7280] font-light leading-relaxed">
                  {stepItem.description}
                </p>

                {/* Deliverables Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
                  {stepItem.details.map((detail, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs font-body-ui text-[#0A0A0A] p-3 rounded-xl bg-[#F5F3EE] border border-[#0A0A0A]/[0.04]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#0A0A0A] shrink-0" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


