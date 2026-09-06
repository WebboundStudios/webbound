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
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#6B7280]">A little about the work</span>
          </div>
          <TextReveal
            as="h2"
            className="font-section-heading text-3xl sm:text-5xl md:text-6xl font-bold text-[#0A0A0A] tracking-[-0.02em] leading-[1.05] max-w-4xl"
          >
            A Creative Engineer Obsessed With Digital Distinction.
          </TextReveal>
        </div>

        {/* Asymmetrical Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main Story Narrative (7 Cols) */}
          <div className="lg:col-span-7 space-y-6 text-[#6B7280] font-body-ui text-lg font-light leading-relaxed">
            <p className="text-xl text-[#0A0A0A] font-normal leading-relaxed">
              I build websites with a simple conviction: your digital presence should never look or feel like an off-the-shelf template. It should be a tactile, bespoke flagship that communicates taste, commands trust, and loads instantly.
            </p>
            <p>
              I bridge the gap between editorial art direction and rigorous software engineering. By combining Next.js 15, React 19, and 60 FPS motion physics (GSAP & Lenis), I deliver platforms that look striking on desktop, glide smoothly on mobile, and stay fast for years.
            </p>

            {/* Feature Highlights — left-border accent, clean human copy */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              <div className="pl-4 border-l-2 border-[#C5F52A] space-y-1.5 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:pl-5">
                <h4 className="font-section-heading text-[#0A0A0A] font-bold text-base">Pure Craftsmanship</h4>
                <p className="text-xs text-[#6B7280] leading-normal">
                  Zero theme marketplaces or page builders. Every grid, interaction, and transition is built custom from scratch.
                </p>
              </div>

              <div className="pl-4 border-l-2 border-[#0A0A0A] space-y-1.5 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:pl-5 hover:border-[#C5F52A]">
                <h4 className="font-section-heading text-[#0A0A0A] font-bold text-base">Direct 1-on-1 Access</h4>
                <p className="text-xs text-[#6B7280] leading-normal">
                  You work directly with the lead engineer and designer. No account managers, ticket queues, or lost feedback.
                </p>
              </div>
            </div>
          </div>

          {/* Right Tactile Studio Directive Card (5 Cols) */}
          <div className="lg:col-span-5">
            <div className="p-7 sm:p-9 rounded-3xl bg-[#0A0A0A] text-white space-y-6 shadow-2xl border border-white/10 relative overflow-hidden group">
              {/* Subtle top ambient glow */}
              <div className="absolute top-0 right-0 w-36 h-36 bg-[#C5F52A]/10 rounded-full blur-3xl pointer-events-none" />

              <div className="flex items-center justify-between border-b border-white/10 pb-5 relative z-10">
                <span className="text-[11px] uppercase font-mono tracking-widest text-[#C5F52A] font-bold flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C5F52A] animate-pulse" />
                  STUDIO DIRECTIVES
                </span>
                <span className="text-[10px] font-mono text-white/50 uppercase tracking-wider">
                  STANDARD // 2026
                </span>
              </div>

              <div className="space-y-4 relative z-10 font-body-ui">
                <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/5 hover:border-[#C5F52A]/40 transition-colors">
                  <div className="flex items-center justify-between text-xs font-mono font-bold text-white mb-1">
                    <span className="text-[#C5F52A]">01 // ARCHITECTURE</span>
                    <span className="text-white/40 font-normal">Next.js 15 & React 19</span>
                  </div>
                  <p className="text-xs text-[#9CA3AF] font-light leading-relaxed">
                    Server components, edge caching, and sub-second Core Web Vitals across every viewport.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/5 hover:border-[#C5F52A]/40 transition-colors">
                  <div className="flex items-center justify-between text-xs font-mono font-bold text-white mb-1">
                    <span className="text-[#C5F52A]">02 // FLUID MOTION</span>
                    <span className="text-white/40 font-normal">GSAP & Lenis</span>
                  </div>
                  <p className="text-xs text-[#9CA3AF] font-light leading-relaxed">
                    Hardware-accelerated 60 FPS physics. Natural inertial scrolling that never feels sluggish.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/5 hover:border-[#C5F52A]/40 transition-colors">
                  <div className="flex items-center justify-between text-xs font-mono font-bold text-white mb-1">
                    <span className="text-[#C5F52A]">03 // PEACE OF MIND</span>
                    <span className="text-white/40 font-normal">365 Days Care</span>
                  </div>
                  <p className="text-xs text-[#9CA3AF] font-light leading-relaxed">
                    1 full year of included technical maintenance, copy updates, and ongoing monitoring post-launch.
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-white/50 relative z-10">
                <span>AUTHENTIC HUMAN CRAFT</span>
                <span className="text-[#C5F52A]">ZERO TEMPLATES</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};