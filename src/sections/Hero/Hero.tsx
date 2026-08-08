'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { MagneticButton } from '@/components/animations/MagneticButton';
import { TextRoll } from '@/components/animations/TextRoll';
import { CounterAnimation } from '@/components/animations/CounterAnimation';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import { SITE_CONFIG } from '@/constants/data';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(SplitText);
}

export const Hero: React.FC = () => {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const kickerRef = useRef<HTMLDivElement>(null);
  const bottomBarRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    document.fonts.ready.then(() => {
      // Headline — 3D char entrance with perspective
      if (headlineRef.current) {
        const split = new SplitText(headlineRef.current, {
          type: 'words,chars',
          wordsClass: 'inline-block mr-[0.25em] last:mr-0',
        });
        gsap.fromTo(
          split.chars,
          { opacity: 0, y: 60, rotateX: -45 },
          {
            opacity: 1, y: 0, rotateX: 0,
            duration: 1.2, stagger: 0.025, ease: 'expo.out', delay: 0.25,
          }
        );
      }

      // Kicker line
      if (kickerRef.current) {
        gsap.fromTo(
          kickerRef.current,
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.8, delay: 0.1, ease: 'power2.out' }
        );
      }

      // Right column — description
      if (subtextRef.current) {
        gsap.fromTo(
          subtextRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1, delay: 1.1, ease: 'expo.out' }
        );
      }

      // Right column — CTAs
      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.9, delay: 1.3, ease: 'expo.out' }
        );
      }

      // Bottom bar — staggered stat entrances
      if (bottomBarRef.current) {
        const statEls = bottomBarRef.current.querySelectorAll('[data-stat]');
        gsap.fromTo(
          statEls,
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

      // Floating accent orb — ambient sine-wave drift
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
  }, []);

  return (
    <section data-theme-bg="#F5F3EE" className="relative min-h-screen bg-[#F5F3EE] flex flex-col justify-between pt-10 md:pt-16 pb-12 px-6 md:px-12 lg:px-20 overflow-hidden text-[#0A0A0A] transition-colors duration-300">

      {/* Floating Accent Orb — ambient depth */}
      <div
        ref={orbRef}
        className="absolute top-[15%] left-[10%] w-[280px] h-[280px] md:w-[420px] md:h-[420px] rounded-full pointer-events-none opacity-0"
        style={{
          background: 'radial-gradient(circle, rgba(197, 245, 42, 0.12) 0%, rgba(197, 245, 42, 0.04) 50%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="max-w-7xl mx-auto w-full relative z-10 my-auto">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column — Headline */}
          <div className="lg:col-span-7 space-y-5">
            {/* Editorial Kicker */}
            <div ref={kickerRef} className="flex items-center gap-3">
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#6B7280]">
                ↗ Independent studio
              </span>
              <span className="h-px w-8 bg-[#0A0A0A]/20" />
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#0A0A0A]/30">Web design · Development</span>
            </div>

            {/* Main Headline — perspective container for richer 3D entrance */}
            <div style={{ perspective: '800px' }}>
              <h1
                ref={headlineRef}
                className="font-hero-display text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-8xl font-black tracking-[-0.035em] text-[#0A0A0A] leading-[0.92] overflow-hidden"
                data-cursor="Explore"
              >
                YOUR BRAND{' '}
                <TextRoll center className="inline-block text-[#C5F52A]">
                  DESERVES
                </TextRoll>{' '}
                MORE THAN A PRETTY SITE.
              </h1>
            </div>
          </div>

          {/* Right Column — Description & CTA (vertically centered) */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-8 lg:pl-8">
            {/* Decorative vertical accent line (large screens only) */}
            <div className="hidden lg:block absolute left-[calc(58.33%+0.5rem)] top-[30%] bottom-[30%] w-px bg-gradient-to-b from-transparent via-[#0A0A0A]/10 to-transparent" />

            <p
              ref={subtextRef}
              className="font-body-ui text-base sm:text-lg text-[#6B7280] font-light leading-relaxed max-w-md"
            >
              {SITE_CONFIG.description}
            </p>

            <div ref={ctaRef} className="flex flex-col sm:flex-row items-start gap-4">
              <a href="#contact">
                <MagneticButton variant="primary" size="md">
                  <TextRoll center>LET&apos;S TALK</TextRoll>
                  <ArrowUpRight className="w-4 h-4 ml-1" />
                </MagneticButton>
              </a>
              <a href="#projects">
                <MagneticButton variant="outline" size="md">
                  <TextRoll center>VIEW WORK</TextRoll>
                </MagneticButton>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Bottom Bar: Animated Key Metrics + Scroll Indicator */}
      <div
        ref={bottomBarRef}
        className="max-w-7xl mx-auto w-full relative z-10 pt-10 border-t border-[#0A0A0A]/[0.08] flex flex-col md:flex-row items-center justify-between gap-6"
      >
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-12 text-left w-full md:w-auto">
          {SITE_CONFIG.stats.map((stat, idx) => (
            <div
              key={idx}
              data-stat
              className="flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 w-fit"
            >
              <span className="font-hero-display text-2xl sm:text-3xl font-black text-[#0A0A0A] tracking-[-0.02em]">
                <CounterAnimation end={stat.value} duration={2} delay={1.2} suffix={stat.suffix} />
              </span>
              <span className="font-body-ui text-[11px] uppercase tracking-wider text-[#6B7280] mt-0.5">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Scroll Indicator — animated chevron pill */}
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