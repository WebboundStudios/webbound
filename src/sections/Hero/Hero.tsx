'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { MagneticButton } from '@/components/animations/MagneticButton';
import { TextRoll } from '@/components/animations/TextRoll';
import { CounterAnimation } from '@/components/animations/CounterAnimation';
import { ArrowUpRight, ChevronDown, MoreVertical, Code2, Zap } from 'lucide-react';
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
  const heroArtRef = useRef<HTMLDivElement>(null);

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

      // Hero Visual Art (Famebros Style)
      if (heroArtRef.current) {
        gsap.fromTo(
          heroArtRef.current,
          { opacity: 0, scale: 0.9, y: 30 },
          { opacity: 1, scale: 1, y: 0, duration: 1.2, delay: 0.6, ease: 'expo.out' }
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
    <section data-theme-bg="#F5F3EE" className="relative min-h-screen bg-[#F5F3EE] flex flex-col justify-between pt-6 md:pt-10 pb-6 md:pb-10 px-6 md:px-12 lg:px-16 overflow-hidden text-[#0A0A0A] transition-colors duration-300">

      {/* Floating Accent Orb — ambient depth */}
      <div
        ref={orbRef}
        className="absolute top-[15%] left-[10%] w-[280px] h-[280px] md:w-[420px] md:h-[420px] rounded-full pointer-events-none opacity-0"
        style={{
          background: 'radial-gradient(circle, rgba(197, 245, 42, 0.12) 0%, rgba(197, 245, 42, 0.04) 50%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="max-w-7xl mx-auto w-full relative z-10 my-auto py-2 md:py-4">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          {/* Left Column — Content & Actions */}
          <div className="lg:col-span-6 xl:col-span-7 space-y-4 md:space-y-5">
            {/* Slanted Physical Studio Sticker */}
            <div className="inline-block transform -rotate-3 hover:rotate-0 transition-transform duration-300 select-none">
              <div className="px-3.5 py-1 rounded-full bg-[#0A0A0A] text-[#C5F52A] border border-[#0A0A0A] font-mono text-[10px] sm:text-[11px] font-bold tracking-widest uppercase shadow-md flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5F52A] animate-ping" />
                <span>STUDIO SPEC &bull; CRAFT OVER TEMPLATES</span>
              </div>
            </div>

            {/* Editorial Kicker */}
            <div ref={kickerRef} className="flex items-center gap-3">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#6B7280]">
                Based in India
              </span>
              <span className="h-px w-8 bg-[#0A0A0A]/20" />
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#0A0A0A]/60">
                High-Craft Digital Engineering
              </span>
            </div>

            {/* Main Headline */}
            <div style={{ perspective: '800px' }}>
              <h1
                ref={headlineRef}
                className="font-hero-display text-4xl sm:text-6xl md:text-6xl lg:text-[4.25rem] xl:text-[4.75rem] font-black tracking-[-0.035em] text-[#0A0A0A] leading-[0.95] overflow-hidden"
                data-cursor="Explore"
              >
                DIGITAL PLATFORMS{' '}
                <TextRoll center className="inline-block text-[#C5F52A] bg-[#0A0A0A] px-2.5 py-0.5 rounded-lg -rotate-1 shadow-sm">
                  BUILT
                </TextRoll>{' '}
                FOR LONGEVITY.
              </h1>
            </div>

            <p
              ref={subtextRef}
              className="font-body-ui text-sm sm:text-base md:text-lg text-[#4B5563] font-light leading-relaxed max-w-xl"
            >
              We engineer bespoke digital flagships, spatial architecture portals, and headless CMS systems for brands that refuse to look like a cookie-cutter template.
            </p>

            <div ref={ctaRef} className="space-y-4 pt-1">
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

              {/* Unscripted AI Prompt Runner (WhyCreatives Hallmark) */}
              <div className="pt-2 flex flex-wrap items-center gap-2 text-xs font-mono text-[#6B7280]">
                <span className="text-[11px] uppercase tracking-wider text-[#0A0A0A]/50">Verify our standard:</span>
                <a
                  href="https://chatgpt.com/?q=Analyze+WebBound+Studios+engineering+and+UI+craft+for+bespoke+websites"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white border border-[#0A0A0A]/10 text-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-[#C5F52A] transition-all shadow-xs"
                >
                  <span>Ask ChatGPT</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
                <a
                  href="https://claude.ai/new?q=Review+WebBound+Studios+for+high-craft+digital+engineering"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white border border-[#0A0A0A]/10 text-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-[#C5F52A] transition-all shadow-xs"
                >
                  <span>Ask Claude</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column — Webbound Visual Hero Artwork */}
          <div className="lg:col-span-6 xl:col-span-5 flex justify-center lg:justify-end">
            <div
              ref={heroArtRef}
              className="relative w-full max-w-[400px] lg:max-w-[430px] h-[340px] sm:h-[390px] lg:h-[410px] bg-[#d9f7c9] rounded-[42%_46%_38%_44%] border-[1.5px] border-[#171717] flex items-center justify-center isolation-isolate shadow-lg group"
            >
              {/* Concentric Orbit Rings */}
              <div className="absolute w-[450px] h-[280px] border-[1.5px] border-[#171717] rounded-full -left-[30px] top-[50px] -rotate-[25deg] opacity-20 pointer-events-none" />
              <div className="absolute w-[350px] h-[460px] border-[1.5px] border-[#171717] rounded-full -right-[110px] -top-[20px] rotate-[35deg] opacity-20 pointer-events-none" />

              {/* Central Dashboard Card */}
              <div className="w-[220px] sm:w-[245px] bg-white p-4 sm:p-5 rounded-2xl border-[1.5px] border-[#171717] shadow-[8px_9px_0_#171717] absolute top-[18%] left-1/2 -translate-x-1/2 -rotate-[5deg] z-10 transition-all duration-300 group-hover:rotate-0 group-hover:scale-105">
                <div className="flex items-center justify-between font-mono text-[10px] sm:text-[11px] font-bold text-[#171717]">
                  <span>Lighthouse Score</span>
                  <MoreVertical className="w-3.5 h-3.5 text-[#171717]" />
                </div>

                <div className="font-hero-display text-4xl sm:text-5xl font-black text-[#171717] tracking-tighter mt-2 sm:mt-3 flex items-baseline">
                  99<span className="text-xl sm:text-2xl font-bold ml-0.5">/100</span>
                </div>

                <p className="font-mono text-[9px] sm:text-[10px] font-semibold text-[#6B7280] mt-0.5">
                  Avg. across client builds
                </p>

                {/* Score Bars */}
                <div className="h-[52px] sm:h-[60px] flex items-end gap-[6px] mt-3">
                  <div className="w-full bg-[#C5F52A] rounded-t-[3px] border border-[#171717]/10" style={{ height: '70%' }} />
                  <div className="w-full bg-[#C5F52A] rounded-t-[3px] border border-[#171717]/10" style={{ height: '78%' }} />
                  <div className="w-full bg-[#C5F52A] rounded-t-[3px] border border-[#171717]/10" style={{ height: '82%' }} />
                  <div className="w-full bg-[#C5F52A] rounded-t-[3px] border border-[#171717]/10" style={{ height: '88%' }} />
                  <div className="w-full bg-[#C5F52A] rounded-t-[3px] border border-[#171717]/10" style={{ height: '90%' }} />
                  <div className="w-full bg-[#C5F52A] rounded-t-[3px] border border-[#171717]/10" style={{ height: '96%' }} />
                  <div className="w-full bg-[#C5F52A] rounded-t-[3px] border border-[#171717]/10" style={{ height: '100%' }} />
                </div>
              </div>

              {/* Floating Badge 1 - Top Right */}
              <div className="absolute right-1.5 sm:right-3 top-5 sm:top-6 flex items-center gap-2 px-3 py-2 bg-[#171717] text-white rounded-xl shadow-[4px_4px_0_#fff] z-20 border border-[#171717] hover:scale-105 transition-transform duration-200">
                <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-[#C5F52A]" />
                <div>
                  <b className="block text-[11px] sm:text-[12px] font-bold leading-tight">Ships in 2–3 Weeks</b>
                  <small className="block text-[8px] sm:text-[9px] text-[#ddd] mt-0.5">Design → dev → deployed</small>
                </div>
              </div>

              {/* Floating Badge 2 - Bottom Left */}
              <div className="absolute left-1.5 sm:left-3 bottom-5 sm:bottom-6 flex items-center gap-2 px-3 py-2 bg-[#171717] text-white rounded-xl shadow-[4px_4px_0_#fff] z-20 border border-[#171717] hover:scale-105 transition-transform duration-200">
                <Code2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#C5F52A]" />
                <div>
                  <b className="block text-[11px] sm:text-[12px] font-bold leading-tight">&lt; 0.9s Load Time</b>
                  <small className="block text-[8px] sm:text-[9px] text-[#ddd] mt-0.5">Core Web Vitals ready</small>
                </div>
              </div>

              {/* Sparkle accents */}
              <div className="absolute right-6 sm:right-10 bottom-[55px] text-2xl sm:text-3xl text-[#171717] animate-pulse select-none">✦</div>
              <div className="absolute left-8 sm:left-12 top-6 text-2xl sm:text-3xl text-white animate-pulse select-none">✦</div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Bottom Bar: Animated Key Metrics + Scroll Indicator */}
      <div
        ref={bottomBarRef}
        className="max-w-7xl mx-auto w-full relative z-10 pt-5 md:pt-6 pb-2 md:pb-4 border-t border-[#0A0A0A]/[0.08] flex flex-col md:flex-row items-center justify-between gap-4"
      >
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-10 text-left w-full md:w-auto">
          {SITE_CONFIG.stats.map((stat, idx) => (
            <div
              key={idx}
              data-stat
              className="flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 w-fit"
            >
              <span className="font-hero-display text-xl sm:text-2xl lg:text-3xl font-black text-[#0A0A0A] tracking-[-0.02em]">
                <CounterAnimation end={stat.value} duration={2} delay={1.2} suffix={stat.suffix} />
              </span>
              <span className="font-body-ui text-[10px] sm:text-[11px] uppercase tracking-wider text-[#6B7280] mt-0.5">
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