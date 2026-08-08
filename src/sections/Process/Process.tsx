'use client';

import React, { useEffect, useRef } from 'react';
import { PROCESS_STEPS } from '@/constants/data';
import { TextReveal } from '@/components/animations/TextReveal';
import { TextRoll } from '@/components/animations/TextRoll';
import { ShieldCheck, Compass, Palette, Code2, Gauge, Rocket } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const STEP_ICONS = [Compass, Palette, Code2, Gauge, Rocket];
const STEP_PROGRESS = [20, 40, 65, 85, 100];

export const Process: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const pinWrapper = pinWrapperRef.current;
    const container = containerRef.current;
    if (!section || !pinWrapper || !container) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Setup function for GSAP scrub animation
      const setupAnimations = (isDesktop: boolean) => {
        const layoutSelector = isDesktop ? '.desktop-timeline' : '.mobile-timeline';
        const layoutContainer = container.querySelector(layoutSelector);
        if (!layoutContainer) return null;

        const nodes = Array.from(layoutContainer.querySelectorAll('.timeline-node-circle')) as HTMLElement[];
        const lineFills = Array.from(layoutContainer.querySelectorAll('.timeline-line-fill')) as HTMLElement[];
        const progressFills = Array.from(layoutContainer.querySelectorAll('.timeline-progress-fill')) as HTMLElement[];

        if (nodes.length === 0) return null;

        // Reset initial states
        nodes.forEach((node) => {
          gsap.set(node, {
            scale: 1,
            backgroundColor: '#0A0A0A',
            color: '#FFFFFF',
            boxShadow: 'none',
          });
        });

        lineFills.forEach((fill) => {
          if (isDesktop) {
            gsap.set(fill, { scaleX: 0, scaleY: 1, transformOrigin: 'left center' });
          } else {
            gsap.set(fill, { scaleX: 1, scaleY: 0, transformOrigin: 'top center' });
          }
        });

        progressFills.forEach((fill) => {
          gsap.set(fill, { width: '0%' });
        });

        const mainTl = gsap.timeline();

        // Step 0 activation — a touch of back-ease overshoot on scale
        // makes each node feel like it "arrives" rather than just appears.
        mainTl.to(nodes[0], {
          scale: 1.15,
          backgroundColor: '#C5F52A',
          color: '#0A0A0A',
          boxShadow: '0 0 25px rgba(197, 245, 42, 0.85)',
          duration: 0.15,
          ease: 'back.out(2.5)',
        }, 0);

        if (progressFills[0]) {
          mainTl.to(progressFills[0], {
            width: `${STEP_PROGRESS[0]}%`,
            backgroundColor: '#C5F52A',
            duration: 0.1,
          }, 0);
        }

        // Loop step animations
        for (let i = 0; i < PROCESS_STEPS.length - 1; i++) {
          const fill = lineFills[i];
          const nextNode = nodes[i + 1];
          const nextProgress = progressFills[i + 1];

          if (fill) {
            mainTl.to(fill, {
              scaleX: 1,
              scaleY: 1,
              ease: 'none',
              duration: 1,
            });
          }

          if (nextNode) {
            mainTl.to(
              nextNode,
              {
                scale: 1.15,
                backgroundColor: '#C5F52A',
                color: '#0A0A0A',
                boxShadow: '0 0 25px rgba(197, 245, 42, 0.85)',
                duration: 0.15,
                ease: 'back.out(2.5)',
              },
              `>-0.05`
            );
          }

          if (nextProgress) {
            mainTl.to(
              nextProgress,
              {
                width: `${STEP_PROGRESS[i + 1]}%`,
                backgroundColor: '#C5F52A',
                duration: 0.1,
              },
              `<`
            );
          }
        }

        return mainTl;
      };

      // Desktop (xl: 1280px+): Pinned animation
      mm.add('(min-width: 1280px)', () => {
        const desktopTl = setupAnimations(true);
        if (!desktopTl) return;

        ScrollTrigger.create({
          trigger: section,
          pin: pinWrapper,
          start: 'top top',
          end: '+=1600',
          scrub: 0.5,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          animation: desktopTl,
        });
      });

      // Mobile / Tablet (<1280px): Unpinned, smooth vertical scroll scrub
      mm.add('(max-width: 1279px)', () => {
        const mobileTl = setupAnimations(false);
        if (!mobileTl) return;

        const mobileWrapper = container.querySelector('.mobile-timeline');

        ScrollTrigger.create({
          trigger: mobileWrapper || container,
          start: 'top 75%',
          end: 'bottom 40%',
          scrub: 0.5,
          animation: mobileTl,
        });
      });
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="process"
      data-theme-bg="#F5F3EE"
      className="relative min-h-screen text-[#0A0A0A] overflow-hidden transition-colors duration-500"
    >
      <div ref={pinWrapperRef} className="max-w-7xl mx-auto w-full relative z-10 min-h-screen xl:h-screen flex flex-col justify-center py-12 xl:py-16 px-4 sm:px-8 lg:px-12 xl:px-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 xl:mb-12">
          <div className="flex flex-col space-y-3">
            <div className="flex items-center gap-4">
              <span className="font-mono text-[10px] text-[#0A0A0A]/30 tracking-widest uppercase">04 / PROCESS</span>
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#6B7280]">Our Development Lifecycle</span>
            </div>
            <TextReveal
              as="h2"
              className="font-section-heading text-3xl sm:text-5xl md:text-6xl font-bold text-[#0A0A0A] tracking-[-0.02em] leading-tight max-w-4xl"
            >
              Rapid Delivery In Days, Not Months.
            </TextReveal>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0A0A0A] text-[#C5F52A] text-xs font-mono font-bold tracking-tight shadow-sm shrink-0 w-fit">
            <ShieldCheck className="w-3.5 h-3.5 text-[#C5F52A]" />
            <TextRoll center>1 YR FREE MAINTENANCE</TextRoll>
          </div>
        </div>

        <div ref={containerRef} className="w-full">
          {/* DESKTOP TIMELINE (xl:grid 5-column horizontal layout) */}
          <div className="desktop-timeline hidden xl:grid grid-cols-5 gap-6 items-stretch">
            {PROCESS_STEPS.map((stepItem, idx) => {
              const Icon = STEP_ICONS[idx % STEP_ICONS.length];
              const isLast = idx === PROCESS_STEPS.length - 1;
              const progressVal = STEP_PROGRESS[idx];

              return (
                <div key={stepItem.step} className="flex flex-col justify-between h-full relative group">
                  {/* Node & Connecting Line Row */}
                  <div className="flex items-center w-full gap-4 relative h-12">
                    <div className="timeline-node-circle w-12 h-12 rounded-full bg-[#0A0A0A] text-white flex items-center justify-center shrink-0 z-10 transition-all duration-300 shadow-sm">
                      <Icon className="w-5.5 h-5.5" />
                    </div>

                    {!isLast && (
                      <div className="flex-1 h-[2px] bg-[#0A0A0A]/15 relative overflow-hidden rounded-full">
                        <div className="timeline-line-fill absolute inset-0 bg-[#C5F52A] rounded-full shadow-[0_0_10px_#C5F52A]" />
                      </div>
                    )}
                  </div>

                  {/* Content Block */}
                  <div className="flex flex-col flex-1 justify-between pt-5 space-y-4">
                    <div className="space-y-2 min-h-[110px]">
                      <h3 className="font-section-heading text-lg font-bold text-[#0A0A0A] tracking-[-0.01em]">
                        {stepItem.title}
                      </h3>
                      <p className="font-body-ui text-xs text-[#6B7280] font-light leading-relaxed">
                        {stepItem.description}
                      </p>
                    </div>

                    <div className="min-h-[38px] flex items-end">
                      <p className="text-[11px] font-mono text-[#0A0A0A]/40 leading-relaxed">
                        {stepItem.details.join(' · ')}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#0A0A0A]/[0.08] space-y-1.5 shrink-0">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-1.5 bg-[#0A0A0A]/10 rounded-full overflow-hidden">
                          <div className="timeline-progress-fill h-full bg-[#0A0A0A]/30 rounded-full transition-all duration-300" />
                        </div>
                        <span className="font-mono text-xs font-semibold text-[#0A0A0A]/70 min-w-[36px] text-right">
                          {progressVal}%
                        </span>
                      </div>
                      <p className="font-mono text-[11px] text-[#6B7280]">{stepItem.duration}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* MOBILE / TABLET TIMELINE (xl:hidden 2-column vertical timeline matching user image) */}
          <div className="mobile-timeline xl:hidden flex flex-col space-y-0">
            {PROCESS_STEPS.map((stepItem, idx) => {
              const Icon = STEP_ICONS[idx % STEP_ICONS.length];
              const isLast = idx === PROCESS_STEPS.length - 1;
              const progressVal = STEP_PROGRESS[idx];

              return (
                <div key={stepItem.step} className="flex flex-row gap-4 sm:gap-6 items-start group">
                  {/* Left Column: Node Icon Circle + Vertical Line */}
                  <div className="flex flex-col items-center shrink-0 self-stretch">
                    <div className="timeline-node-circle w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#0A0A0A] text-white flex items-center justify-center shrink-0 z-10 transition-all duration-300 shadow-sm">
                      <Icon className="w-5 h-5" />
                    </div>

                    {!isLast && (
                      <div className="flex-1 w-[2px] min-h-[90px] bg-[#0A0A0A]/15 my-3 relative overflow-hidden rounded-full">
                        <div className="timeline-line-fill absolute inset-0 bg-[#C5F52A] rounded-full shadow-[0_0_10px_#C5F52A]" />
                      </div>
                    )}
                  </div>

                  {/* Right Column: Content Block */}
                  <div className="flex flex-col flex-1 pb-8 space-y-3">
                    <div className="space-y-1">
                      <h3 className="font-section-heading text-lg sm:text-xl font-bold text-[#0A0A0A] tracking-[-0.01em]">
                        {stepItem.title}
                      </h3>
                      <p className="font-body-ui text-xs sm:text-sm text-[#6B7280] font-light leading-relaxed">
                        {stepItem.description}
                      </p>
                    </div>

                    <p className="text-[11px] font-mono text-[#0A0A0A]/40 leading-relaxed">
                      {stepItem.details.join(' · ')}
                    </p>

                    <div className="pt-2 space-y-1.5">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-1.5 bg-[#0A0A0A]/10 rounded-full overflow-hidden">
                          <div className="timeline-progress-fill h-full bg-[#0A0A0A]/30 rounded-full transition-all duration-300" />
                        </div>
                        <span className="font-mono text-xs font-semibold text-[#0A0A0A]/70 min-w-[36px] text-right">
                          {progressVal}%
                        </span>
                      </div>
                      <p className="font-mono text-[11px] text-[#6B7280]">{stepItem.duration}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};