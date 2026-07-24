'use client';

import React from 'react';
import { TextReveal } from '@/components/animations/TextReveal';
import { CounterAnimation } from '@/components/animations/CounterAnimation';
import { ShieldCheck, Zap } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section id="about" data-theme-bg="#F5F3EE" className="relative py-36 px-6 md:px-12 lg:px-20 text-[#0A0A0A] overflow-hidden transition-colors duration-500">
      {/* Decorative arc */}
      <div className="absolute top-20 right-20 w-[400px] h-[400px] rounded-full border border-dashed border-[#0A0A0A]/[0.04] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col space-y-3 mb-16">
          {/* Numbered section marker */}
            <div className="flex items-center gap-4">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#6B7280]">A little about the work</span>
          </div>
          <TextReveal
            as="h2"
            className="font-section-heading text-3xl sm:text-5xl md:text-6xl font-bold text-[#0A0A0A] tracking-tight leading-tight max-w-4xl"
          >
            A Creative Engineer Obsessed With Digital Distinction.
          </TextReveal>
        </div>

        {/* Asymmetrical Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main Story Narrative (7 Cols) */}
          <div className="lg:col-span-7 space-y-6 text-[#6B7280] font-body-ui text-lg font-light leading-relaxed">
            <p className="text-xl text-[#0A0A0A] font-normal">
              I craft digital experiences with a singular conviction: websites should never feel like static brochures. They should be living, breathing brand assets that mesmerize users and out-convert competitors.
            </p>
            <p>
              I bridge the gap between high-art creative direction and rigorous software engineering. By pairing fluid visual motion (GSAP, WebGL, Lenis) with Next.js 15 App Router performance, I deliver bespoke digital flagships that load instantly and leave a lasting impression.
            </p>

            {/* Feature Highlights — left-border accent, no icon box */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-6">
              <div className="pl-4 border-l-2 border-[#C5F52A] space-y-1">
                <h4 className="font-section-heading text-[#0A0A0A] font-bold text-base">Uncompromised Quality</h4>
                <p className="text-xs text-[#6B7280]">Zero templates. Bespoke architecture built for long-term scalability.</p>
              </div>

              <div className="pl-4 border-l-2 border-[#0A0A0A] space-y-1">
                <h4 className="font-section-heading text-[#0A0A0A] font-bold text-base">GPU Motion Physics</h4>
                <p className="text-xs text-[#6B7280]">Liquid smooth 60fps scroll animations tailored for high-end feel.</p>
              </div>
            </div>
          </div>

          {/* Right Highlight Box (5 Cols) */}
          <div className="lg:col-span-5">
            <div className="p-8 sm:p-10 rounded-3xl bg-[#0A0A0A] text-white space-y-8">
              <div className="flex items-center justify-between border-b border-white/10 pb-6">
                <span className="text-xs uppercase font-mono tracking-widest text-[#C5F52A]">
                  CRAFT METRICS
                </span>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div>
                  <span className="font-hero-display text-4xl sm:text-5xl font-black text-white block">
                    <CounterAnimation end={100} suffix="%" />
                  </span>
                  <span className="text-xs font-body-ui text-[#9CA3AF] uppercase tracking-wider mt-1 block">
                    Sub-Second Target
                  </span>
                </div>

                <div>
                  <span className="font-hero-display text-4xl sm:text-5xl font-black text-[#C5F52A] block">
                    <CounterAnimation end={6} suffix="+" />
                  </span>
                  <span className="text-xs font-body-ui text-[#9CA3AF] uppercase tracking-wider mt-1 block">
                    Years Experience
                  </span>
                </div>

                <div>
                  <span className="font-hero-display text-4xl sm:text-5xl font-black text-white block">
                    <CounterAnimation end={65} suffix="+" />
                  </span>
                  <span className="text-xs font-body-ui text-[#9CA3AF] uppercase tracking-wider mt-1 block">
                    Projects Delivered
                  </span>
                </div>

                <div>
                  <span className="font-hero-display text-4xl sm:text-5xl font-black text-[#C5F52A] block">
                    <CounterAnimation end={100} suffix="%" />
                  </span>
                  <span className="text-xs font-body-ui text-[#9CA3AF] uppercase tracking-wider mt-1 block">
                    Custom Crafted
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 text-xs text-[#9CA3AF] italic font-body-ui">
                &ldquo;Every project is approached as a bespoke digital asset engineered to elevate brand authority.&rdquo;
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
