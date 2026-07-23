'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { MagneticButton } from '@/components/animations/MagneticButton';
import { TextRoll } from '@/components/animations/TextRoll';
import { GSAPAnimatedSVG } from '@/components/animations/GSAPAnimatedSVG';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { SITE_CONFIG } from '@/constants/data';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(SplitText);
}

export const Hero: React.FC = () => {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.fonts.ready.then(() => {
      if (headlineRef.current) {
        const split = new SplitText(headlineRef.current, {
          type: 'words,chars',
          wordsClass: 'inline-block mr-[0.25em] last:mr-0',
        });
        gsap.fromTo(
          split.chars,
          {
            opacity: 0,
            y: 80,
            rotateX: -60,
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.9,
            stagger: 0.02,
            ease: 'power3.out',
            delay: 0.2,
          }
        );
      }

      if (subtextRef.current) {
        gsap.fromTo(
          subtextRef.current,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.8, delay: 0.8, ease: 'power3.out' }
        );
      }

      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7, delay: 1, ease: 'power3.out' }
        );
      }

      if (badgeRef.current) {
        gsap.fromTo(
          badgeRef.current,
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 0.7, delay: 0.1, ease: 'back.out(1.5)' }
        );
      }
    });
  }, []);

  return (
    <section data-theme-bg="#F5F3EE" className="relative min-h-screen bg-[#F5F3EE] flex flex-col justify-between pt-24 pb-12 px-6 md:px-12 lg:px-20 overflow-hidden text-[#0A0A0A] transition-colors duration-300">
      {/* GSAP Animated Floating SVG Emblem Background Element */}
      <div className="absolute top-1/4 right-[5%] opacity-20 lg:opacity-40 pointer-events-none hidden sm:block">
        <GSAPAnimatedSVG className="w-80 h-80 lg:w-[480px] lg:h-[480px]" />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10 my-auto">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column — Headline */}
          <div className="lg:col-span-8 space-y-8">
            {/* Status Badge */}
            <div
              ref={badgeRef}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[#0A0A0A]/10 bg-white/50"
            >
              <span className="w-2 h-2 rounded-full bg-[#C5F52A] animate-pulse" />
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#6B7280]">
                <TextRoll center>INDEPENDENT CREATIVE ENGINEER</TextRoll>
              </span>
            </div>

            {/* Main Headline */}
            <h1
              ref={headlineRef}
              className="font-hero-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter text-[#0A0A0A] leading-[0.95] overflow-hidden"
              data-cursor="Explore"
            >
              YOUR BRAND{' '}
              <TextRoll center className="inline-block text-[#C5F52A]">
                DESERVES
              </TextRoll>{' '}
              MORE THAN A PRETTY SITE.
            </h1>
          </div>

          {/* Right Column — Description & CTA */}
          <div className="lg:col-span-4 flex flex-col justify-end space-y-8 lg:pt-32">
            <p
              ref={subtextRef}
              className="font-body-ui text-base sm:text-lg text-[#6B7280] font-light leading-relaxed"
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

      {/* Hero Bottom Bar: Key Metrics */}
      <div className="max-w-7xl mx-auto w-full relative z-10 pt-10 border-t border-[#0A0A0A]/[0.08] flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-12 text-left w-full md:w-auto">
          {SITE_CONFIG.stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col">
              <span className="font-hero-display text-2xl sm:text-3xl font-black text-[#0A0A0A]">
                {stat.value}
                <span className="text-[#C5F52A]">{stat.suffix}</span>
              </span>
              <span className="font-body-ui text-[11px] uppercase tracking-wider text-[#6B7280] mt-0.5">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Scroll Hint */}
        <a
          href="#about"
          className="hidden md:flex items-center gap-3 text-xs uppercase tracking-widest text-[#6B7280] hover:text-[#0A0A0A] transition-colors font-body-ui group"
        >
          <span>SCROLL TO DISCOVER</span>
          <div className="w-9 h-9 rounded-full border border-[#0A0A0A]/10 flex items-center justify-center group-hover:border-[#C5F52A] group-hover:bg-[#C5F52A] transition-all">
            <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
          </div>
        </a>
      </div>
    </section>
  );
};
