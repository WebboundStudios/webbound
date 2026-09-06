'use client';

import React from 'react';
import { TextReveal } from '@/components/animations/TextReveal';
import { Clock, ShieldCheck, Sparkles, Zap, UserCheck, CheckCircle2, ArrowUpRight, Gauge } from 'lucide-react';

export const WhyUs: React.FC = () => {
  return (
    <section id="why-us" data-theme-bg="#F5F3EE" className="relative bg-[#F5F3EE] pt-24 pb-36 px-4 sm:px-8 md:px-12 text-[#0A0A0A] transition-colors duration-200">
      <div className="max-w-7xl mx-auto relative z-10 mb-16 sm:mb-20">
        {/* Section Header */}
        <div className="flex flex-col space-y-3 text-center items-center">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#0A0A0A]" />
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#6B7280]">
              The WebBound Standard &bull; Why Us
            </span>
          </div>
          <TextReveal
            as="h2"
            className="font-section-heading text-4xl sm:text-5xl lg:text-6xl font-black text-[#0A0A0A] tracking-[-0.03em] leading-tight max-w-4xl text-center"
          >
            Engineering standards that set us apart from ordinary agencies.
          </TextReveal>
        </div>
      </div>

      {/* Osmo 3D Stacking Cards Container */}
      <div className="card-stack">
        {/* Card 1: Rapid 1–2 Week Handover */}
        <div className="card-stack__item group">
          <div className="card-stack__item-inner">
            <div className="card-stack__item-top">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-1.5 rounded-lg bg-black/10 text-inherit">
                    <Clock className="w-4 h-4" />
                  </div>
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] opacity-75">
                    01 // RAPID VELOCITY
                  </span>
                </div>
                <h2 className="card-stack__item-h">
                  Rapid 1–2 Week Handover
                </h2>
              </div>

              <div className="space-y-3">
                <p className="card-stack__item-p opacity-85">
                  No waiting months for a website. Most custom platforms are engineered, tested, and handed over within 1 to 2 weeks (3 to 14 days) without compromising craft.
                </p>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/10 text-inherit font-mono text-[10px] font-bold uppercase tracking-wider border border-black/10">
                  <Zap className="w-3 h-3" />
                  <span>3 to 14 Days Typical Delivery</span>
                </div>
              </div>
            </div>

            {/* Visual Bottom Graphic: Milestone Sprint Pipeline */}
            <div className="card-stack__item-bottom p-5 sm:p-7 flex flex-col justify-between">
              <div className="flex items-center justify-between pb-3 border-b border-black/10 text-xs font-mono opacity-65">
                <span>SPRINT PIPELINE TIMELINE</span>
                <span className="font-bold">100% ON-TIME RATE</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-auto py-2">
                <div className="p-3.5 rounded-xl bg-white/70 border border-black/10 shadow-xs backdrop-blur-xs">
                  <p className="font-mono text-[10px] opacity-60">DAYS 1–2</p>
                  <p className="font-sans text-xs sm:text-sm font-bold mt-0.5">Architecture & Blueprint</p>
                </div>
                <div className="p-3.5 rounded-xl bg-white/70 border border-black/10 shadow-xs backdrop-blur-xs">
                  <p className="font-mono text-[10px] opacity-60">DAYS 3–5</p>
                  <p className="font-sans text-xs sm:text-sm font-bold mt-0.5">Bespoke UI & 60 FPS Motion</p>
                </div>
                <div className="p-3.5 rounded-xl bg-white/70 border border-black/10 shadow-xs backdrop-blur-xs">
                  <p className="font-mono text-[10px] opacity-60">DAYS 6–9</p>
                  <p className="font-sans text-xs sm:text-sm font-bold mt-0.5">Headless CMS & Edge API</p>
                </div>
                <div className="p-3.5 rounded-xl bg-black/90 text-white border border-black shadow-xs">
                  <p className="font-mono text-[10px] text-[#C5F52A]">DAYS 10–14</p>
                  <p className="font-sans text-xs sm:text-sm font-bold text-white mt-0.5">Speed Audit & Launch</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: 1 Year Free Maintenance & Edits */}
        <div className="card-stack__item is--2 group">
          <div className="card-stack__item-inner">
            <div className="card-stack__item-top">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-1.5 rounded-lg bg-black/10 text-inherit">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] opacity-75">
                    02 // ONGOING CONFIDENCE
                  </span>
                </div>
                <h2 className="card-stack__item-h">
                  1 Year Free Maintenance & Edits
                </h2>
              </div>

              <div className="space-y-3">
                <p className="card-stack__item-p opacity-85">
                  Every project comes with 1 Full Year of Included Free Maintenance and Free Small Content Changes (text, image, blog updates). Zero surprise retainers.
                </p>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/10 text-inherit font-mono text-[10px] font-bold uppercase tracking-wider border border-black/10">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>365 Days Included Post-Launch SLA</span>
                </div>
              </div>
            </div>

            {/* Visual Bottom Graphic: Peace-of-Mind SLA Dashboard */}
            <div className="card-stack__item-bottom p-5 sm:p-7 flex flex-col justify-between">
              <div className="flex items-center justify-between pb-3 border-b border-black/10 text-xs font-mono opacity-65">
                <span>PEACE-OF-MIND POST LAUNCH SLA</span>
                <span className="font-bold">12 MONTHS INCLUDED</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-auto py-2">
                <div className="p-3.5 rounded-xl bg-white/70 border border-black/10 shadow-xs backdrop-blur-xs">
                  <p className="font-mono text-[10px] opacity-60">CONTENT EDITS</p>
                  <p className="font-sans text-xs sm:text-sm font-bold mt-0.5">Free Text & Media Updates</p>
                </div>
                <div className="p-3.5 rounded-xl bg-white/70 border border-black/10 shadow-xs backdrop-blur-xs">
                  <p className="font-mono text-[10px] opacity-60">SECURITY</p>
                  <p className="font-sans text-xs sm:text-sm font-bold mt-0.5">Automated Edge Backups</p>
                </div>
                <div className="p-3.5 rounded-xl bg-white/70 border border-black/10 shadow-xs backdrop-blur-xs">
                  <p className="font-mono text-[10px] opacity-60">SLA RESPONSE</p>
                  <p className="font-sans text-xs sm:text-sm font-bold mt-0.5">&lt; 24h Turnaround</p>
                </div>
                <div className="p-3.5 rounded-xl bg-black/90 text-white border border-black shadow-xs">
                  <p className="font-mono text-[10px] text-[#C5F52A]">RETAINER FEES</p>
                  <p className="font-sans text-xs sm:text-sm font-bold text-white mt-0.5">$0 Monthly Retainer</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Zero Templates. 100% Handcrafted */}
        <div className="card-stack__item is--3 group">
          <div className="card-stack__item-inner">
            <div className="card-stack__item-top">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-1.5 rounded-lg bg-black/10 text-inherit">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] opacity-75">
                    03 // PURE CRAFTSMANSHIP
                  </span>
                </div>
                <h2 className="card-stack__item-h">
                  Zero Templates. 100% Handcrafted.
                </h2>
              </div>

              <div className="space-y-3">
                <p className="card-stack__item-p opacity-85">
                  We reject generic WordPress themes, page-builder bloat, and AI cookie-cutters. Every layout grid, custom animation, and typography scale is crafted specifically for your brand.
                </p>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/10 text-inherit font-mono text-[10px] font-bold uppercase tracking-wider border border-black/10">
                  <Sparkles className="w-3 h-3" />
                  <span>Next.js 15 &bull; React 19 &bull; GSAP Physics</span>
                </div>
              </div>
            </div>

            {/* Visual Bottom Graphic: Craft Quality Benchmark */}
            <div className="card-stack__item-bottom p-5 sm:p-7 flex flex-col justify-between">
              <div className="flex items-center justify-between pb-3 border-b border-black/10 text-xs font-mono opacity-65">
                <span>ENGINEERING COMPARISON</span>
                <span className="font-bold">PROVEN BY CODE</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-auto py-2">
                <div className="p-3.5 rounded-xl bg-white/70 border border-black/10 shadow-xs backdrop-blur-xs">
                  <p className="font-mono text-[10px] opacity-60">CORE PERFORMANCE</p>
                  <p className="font-sans text-xs sm:text-sm font-bold mt-0.5">0.42s First Contentful Paint</p>
                  <p className="text-[11px] opacity-70 mt-1">Zero cumulative layout shifts</p>
                </div>
                <div className="p-3.5 rounded-xl bg-white/70 border border-black/10 shadow-xs backdrop-blur-xs">
                  <p className="font-mono text-[10px] opacity-60">MOTION FIDELITY</p>
                  <p className="font-sans text-xs sm:text-sm font-bold mt-0.5">60 FPS Hardware Physics</p>
                  <p className="text-[11px] opacity-70 mt-1">GPU-accelerated compositing</p>
                </div>
                <div className="p-3.5 rounded-xl bg-white/70 border border-black/10 shadow-xs backdrop-blur-xs">
                  <p className="font-mono text-[10px] opacity-60">DEPENDENCY BLOAT</p>
                  <p className="font-sans text-xs sm:text-sm font-bold mt-0.5">Zero Third-Party Themes</p>
                  <p className="text-[11px] opacity-70 mt-1">100% custom component tree</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 4: Sub-Second Speed & 99+ Lighthouse */}
        <div className="card-stack__item is--4 group">
          <div className="card-stack__item-inner">
            <div className="card-stack__item-top">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-1.5 rounded-lg bg-black/10 text-inherit">
                    <Gauge className="w-4 h-4" />
                  </div>
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] opacity-75">
                    04 // SPEED AUDIT GUARANTEE
                  </span>
                </div>
                <h2 className="card-stack__item-h">
                  99+ Lighthouse & Edge Speed
                </h2>
              </div>

              <div className="space-y-3">
                <p className="card-stack__item-p opacity-85">
                  Performance is an engineering discipline, not an afterthought. We optimize asset payloads, critical CSS paths, and edge caching so your platform loads instantly anywhere in the world.
                </p>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/10 text-inherit font-mono text-[10px] font-bold uppercase tracking-wider border border-black/10">
                  <Zap className="w-3 h-3" />
                  <span>Sub-Second Load Time Guaranteed</span>
                </div>
              </div>
            </div>

            {/* Visual Bottom Graphic: Lighthouse 99 Audit Scorecard */}
            <div className="card-stack__item-bottom p-5 sm:p-7 flex flex-col justify-between">
              <div className="flex items-center justify-between pb-3 border-b border-black/10 text-xs font-mono opacity-65">
                <span>GOOGLE LIGHTHOUSE AUDIT</span>
                <span className="font-bold">VERIFIED CORE VITALS</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-auto py-2">
                <div className="p-3.5 rounded-xl bg-white/70 border border-black/10 shadow-xs backdrop-blur-xs flex flex-col items-center text-center">
                  <div className="w-10 h-10 rounded-full border-2 border-emerald-600 flex items-center justify-center font-bold text-sm text-emerald-700 mb-1">
                    99
                  </div>
                  <span className="font-mono text-[10px] opacity-70">PERFORMANCE</span>
                </div>
                <div className="p-3.5 rounded-xl bg-white/70 border border-black/10 shadow-xs backdrop-blur-xs flex flex-col items-center text-center">
                  <div className="w-10 h-10 rounded-full border-2 border-emerald-600 flex items-center justify-center font-bold text-sm text-emerald-700 mb-1">
                    100
                  </div>
                  <span className="font-mono text-[10px] opacity-70">ACCESSIBILITY</span>
                </div>
                <div className="p-3.5 rounded-xl bg-white/70 border border-black/10 shadow-xs backdrop-blur-xs flex flex-col items-center text-center">
                  <div className="w-10 h-10 rounded-full border-2 border-emerald-600 flex items-center justify-center font-bold text-sm text-emerald-700 mb-1">
                    100
                  </div>
                  <span className="font-mono text-[10px] opacity-70">BEST PRACTICES</span>
                </div>
                <div className="p-3.5 rounded-xl bg-white/70 border border-black/10 shadow-xs backdrop-blur-xs flex flex-col items-center text-center">
                  <div className="w-10 h-10 rounded-full border-2 border-emerald-600 flex items-center justify-center font-bold text-sm text-emerald-700 mb-1">
                    100
                  </div>
                  <span className="font-mono text-[10px] opacity-70">SEO AUDIT</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 5: 1-on-1 Direct Collaboration */}
        <div className="card-stack__item is--5 group">
          <div className="card-stack__item-inner">
            <div className="card-stack__item-top">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-1.5 rounded-lg bg-black/10 text-inherit">
                    <UserCheck className="w-4 h-4" />
                  </div>
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] opacity-75">
                    05 // FOUNDER ACCESSIBILITY
                  </span>
                </div>
                <h2 className="card-stack__item-h">
                  1-on-1 Direct Collaboration
                </h2>
              </div>

              <div className="space-y-3">
                <p className="card-stack__item-p opacity-85">
                  No middle managers, no junior handoffs, no miscommunications. You work directly with the lead digital engineer and designer building your project from start to finish.
                </p>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/10 text-inherit font-mono text-[10px] font-bold uppercase tracking-wider border border-black/10">
                  <ArrowUpRight className="w-3 h-3" />
                  <span>Direct Communication Channel</span>
                </div>
              </div>
            </div>

            {/* Visual Bottom Graphic: Direct Collaboration Channels */}
            <div className="card-stack__item-bottom p-5 sm:p-7 flex flex-col justify-between">
              <div className="flex items-center justify-between pb-3 border-b border-black/10 text-xs font-mono opacity-65">
                <span>COLLABORATION ARCHITECTURE</span>
                <span className="font-bold">ZERO INTERMEDIARIES</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-auto py-2">
                <div className="p-3.5 rounded-xl bg-white/70 border border-black/10 shadow-xs backdrop-blur-xs">
                  <p className="font-mono text-[10px] opacity-60">DIRECT LINE</p>
                  <p className="font-sans text-xs sm:text-sm font-bold mt-0.5">Private Slack & WhatsApp</p>
                  <p className="text-[11px] opacity-70 mt-1">Instant answers directly from builder</p>
                </div>
                <div className="p-3.5 rounded-xl bg-white/70 border border-black/10 shadow-xs backdrop-blur-xs">
                  <p className="font-mono text-[10px] opacity-60">TRANSPARENCY</p>
                  <p className="font-sans text-xs sm:text-sm font-bold mt-0.5">Asynchronous Video Demos</p>
                  <p className="text-[11px] opacity-70 mt-1">Clear sprint walkthroughs on Loom</p>
                </div>
                <div className="p-3.5 rounded-xl bg-black/90 text-white border border-black shadow-xs">
                  <p className="font-mono text-[10px] text-[#C5F52A]">ACCOUNTABILITY</p>
                  <p className="font-sans text-xs sm:text-sm font-bold text-white mt-0.5">1-on-1 Lead Commitment</p>
                  <p className="text-[11px] text-white/60 mt-1">Focused roster, zero agency churn</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};