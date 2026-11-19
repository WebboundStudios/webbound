'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { MagneticButton } from '@/components/animations/MagneticButton';
import { TextRoll } from '@/components/animations/TextRoll';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import { HeroCore } from '@/components/ui/hero-core';

const heroHighlights = [
  { title: 'Design', description: 'Custom studio websites' },
  { title: 'CMS', description: 'Update pages and projects on your own' },
  { title: '1 year', description: 'Support after launch' },
];

if (typeof window !== 'undefined') {
  gsap.registerPlugin(SplitText);
}

export const Hero: React.FC = () => {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const bottomBarRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    let cancelled = false;
    let headlineSplit: SplitText | undefined;
    let headlineTween: gsap.core.Tween | undefined;

    document.fonts.ready.then(() => {
      if (cancelled) return;

      // Headline entrance with 3D perspective
      const headline = headlineRef.current;
      if (headline && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        headlineSplit = new SplitText(headline.querySelectorAll('[data-headline-part]'), {
          type: 'words,chars',
          tag: 'span',
          charsClass: 'hero-headline-char',
          aria: 'none',
        });
        headlineTween = gsap.fromTo(
          headline.querySelectorAll('.hero-headline-char, [data-headline-accent]'),
          { opacity: 0, y: 60, rotateX: -45 },
          {
            opacity: 1, y: 0, rotateX: 0,
            duration: 1.2, stagger: 0.025, ease: 'expo.out', delay: 0.25,
          }
        );
      }

      // Description
      if (subtextRef.current) {
        gsap.fromTo(
          subtextRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1, delay: 1.1, ease: 'expo.out' }
        );
      }

      // CTAs
      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.9, delay: 1.3, ease: 'expo.out' }
        );
      }

      // Staggered highlight entrances in the bottom bar
      if (bottomBarRef.current) {
        const highlights = bottomBarRef.current.querySelectorAll('[data-hero-highlight]');
        gsap.fromTo(
          highlights,
          { opacity: 0, y: 28 },
          {
            opacity: 1, y: 0,
            duration: 0.8, stagger: 0.1, ease: 'expo.out', delay: 1.5,
          }
        );
      }

      // Scroll indicator
      if (scrollIndicatorRef.current) {
        gsap.fromTo(
          scrollIndicatorRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.7, delay: 1.8, ease: 'power2.out' }
        );
      }

      // Sine-wave drift for the floating accent orb
      if (orbRef.current) {
        gsap.set(orbRef.current, { opacity: 0 });
        gsap.to(orbRef.current, {
          opacity: 1, duration: 2, delay: 0.8, ease: 'power1.inOut',
        });
        gsap.to(orbRef.current, {
          x: 40, y: -30, duration: 6,
          ease: 'sine.inOut', repeat: -1, yoyo: true,
        });
        gsap.to(orbRef.current, {
          scale: 1.15, duration: 4,
          ease: 'sine.inOut', repeat: -1, yoyo: true, delay: 1,
        });
      }
    });

    return () => {
      cancelled = true;
      headlineTween?.kill();
      headlineSplit?.revert();
    };
  }, []);

  return (
    <section data-theme-bg="#F5F3EE" className="relative min-h-screen bg-[#F5F3EE] flex flex-col justify-between pt-6 md:pt-10 pb-6 md:pb-10 px-6 md:px-12 lg:px-16 xl:min-h-[calc(100svh_-_6rem)] xl:justify-start xl:gap-12 overflow-hidden text-[#0A0A0A] transition-colors duration-300">

      {/* Floating accent orb */}
      <div
        ref={orbRef}
        className="absolute top-[15%] left-[10%] w-[280px] h-[280px] md:w-[420px] md:h-[420px] rounded-full pointer-events-none opacity-0"
        style={{
          background: 'radial-gradient(circle, rgba(197, 245, 42, 0.12) 0%, rgba(197, 245, 42, 0.04) 50%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="max-w-360 mx-auto w-full relative z-10 my-auto py-2 md:py-4 xl:py-0">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 xl:gap-8 items-center">
          {/* Content and actions in the left column */}
          <div className="space-y-4 md:space-y-5">
            <p className="font-body-ui text-sm font-medium text-[#4B5563]">
              Independent web studio based in India
            </p>

            {/* Main Headline */}
            <div className="@container" style={{ perspective: '800px' }}>
              <h1
                ref={headlineRef}
                className="font-hero-display text-[clamp(1rem,8.25cqw,4.75rem)] font-black tracking-[-0.035em] [word-spacing:0.09em] text-[#0A0A0A] leading-[0.95] min-[295px]:whitespace-nowrap"
                aria-label="Digital platforms built for longevity."
                data-cursor="Explore"
              >
                <span className="block" data-headline-part aria-hidden="true">DIGITAL PLATFORMS</span>
                <span className="mt-[0.1em] block" aria-hidden="true">
                  <span className="inline-block align-middle" data-headline-accent>
                    <TextRoll center className="text-[#C5F52A] bg-[#0A0A0A] px-[0.14em] py-0.5 rounded-lg -rotate-1 shadow-sm">
                      BUILT
                    </TextRoll>
                  </span>{' '}
                  <span className="inline-block align-middle" data-headline-part>FOR LONGEVITY.</span>
                </span>
              </h1>
            </div>

            <p
              ref={subtextRef}
              className="font-body-ui text-sm sm:text-base md:text-lg text-[#4B5563] font-light leading-relaxed max-w-xl"
            >
              I design and build websites for architecture and interior design studios, with project galleries and content you can update yourself.
            </p>

            <div ref={ctaRef} className="pt-1">
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <a href="#contact">
                  <MagneticButton variant="primary" size="md">
                    <TextRoll center>START A PROJECT</TextRoll>
                    <ArrowUpRight className="w-4 h-4 ml-1" />
                  </MagneticButton>
                </a>
                <a href="#projects">
                  <MagneticButton variant="outline" size="md">
                    <TextRoll center>VIEW SELECTED WORK</TextRoll>
                  </MagneticButton>
                </a>
              </div>

            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <HeroCore />
          </div>
        </div>
      </div>

      <div
        ref={bottomBarRef}
        className="max-w-360 mx-auto w-full relative z-10 pt-5 md:pt-6 pb-2 md:pb-4 border-t border-[#0A0A0A]/[0.08] flex flex-col md:flex-row items-center justify-between gap-4"
      >
        <ul className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-10 text-left w-full md:w-auto">
          {heroHighlights.map(({ title, description }) => (
            <li
              key={title}
              data-hero-highlight
              className="flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 w-fit"
            >
              <span className="font-hero-display text-xl sm:text-2xl lg:text-3xl font-black text-[#0A0A0A] tracking-[-0.02em]">
                {title}
              </span>
              <span className="font-body-ui text-[10px] sm:text-[11px] uppercase tracking-wider text-[#6B7280] mt-0.5">
                {description}
              </span>
            </li>
          ))}
        </ul>

        {/* Scroll indicator with an animated chevron */}
        <a
          ref={scrollIndicatorRef}
          href="#about"
          className="hidden md:flex items-center gap-2.5 text-[11px] uppercase tracking-[0.2em] text-[#6B7280] hover:text-[#0A0A0A] transition-colors duration-300 font-mono group opacity-0"
        >
          <span className="group-hover:translate-y-px transition-transform duration-200">Scroll</span>
          <span className="flex items-center justify-center w-7 h-7 rounded-full border border-[#0A0A0A]/15 group-hover:border-[#0A0A0A]/40 transition-all duration-300">
            <ChevronDown className="w-3.5 h-3.5 animate-bounce" style={{ animationDuration: '2s' }} />
          </span>
        </a>
      </div>
    </section>
  );
};
