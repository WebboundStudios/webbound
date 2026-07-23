'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/common/Navbar';
import { CustomCursor } from '@/components/common/CustomCursor';
import { Footer } from '@/sections/Footer/Footer';
import { TextRoll } from '@/components/animations/TextRoll';
import { TextReveal } from '@/components/animations/TextReveal';
import { MagneticButton } from '@/components/animations/MagneticButton';
import { InfiniteMarquee } from '@/components/animations/InfiniteMarquee';
import { CounterAnimation } from '@/components/animations/CounterAnimation';
import { ParallaxColumns } from '@/components/animations/ParallaxColumns';
import { useLoadingStore } from '@/providers/LoadingProvider';
import { ArrowLeft, ArrowUpRight, Sparkles, Play, Code2, Layers, Cpu, Zap, Compass, MoveUpRight } from 'lucide-react';

type CategoryType = 'all' | 'typography' | 'vector' | 'physics' | 'scroll';

interface AnimationShowcaseItem {
  id: string;
  title: string;
  category: CategoryType;
  categoryLabel: string;
  description: string;
  techTags: string[];
  complexity: 'Fluid 60FPS' | 'GPU Accelerated' | 'Physics Engine' | 'GSAP Timeline';
}

const CATEGORIES = [
  { id: 'all', label: 'All Experiments' },
  { id: 'typography', label: 'Kinetic Typography' },
  { id: 'physics', label: 'Cursor & Physics' },
  { id: 'scroll', label: 'Scroll Dynamics' },
] as const;

export default function AnimationsLabPage() {
  const [activeCategory, setActiveCategory] = useState<CategoryType>('all');
  const { finishLoading } = useLoadingStore();

  useEffect(() => {
    // Ensure smooth scroll and Lenis physics are active on mount
    finishLoading();
  }, [finishLoading]);

  return (
    <main className="relative min-h-screen bg-[#F5F3EE] text-[#0A0A0A] selection:bg-[#C5F52A] selection:text-[#0A0A0A] transition-colors duration-300">
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Floating Capsule Navbar */}
      <Navbar />

      {/* Hero Header Section */}
      <section className="relative pt-32 pb-20 px-6 md:px-12 lg:px-20 border-b border-[#0A0A0A]/[0.08] overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-[#C5F52A]/15 blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Back Link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#6B7280] hover:text-[#0A0A0A] transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>BACK TO HOME</span>
          </Link>

          <div className="flex flex-col space-y-4 max-w-4xl">
            {/* Editorial kicker — no pill */}
            <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] text-[#0A0A0A]/20 tracking-widest uppercase">Lab /</span>
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#6B7280]">Creative Engineering Lab</span>
            </div>

            <h1 className="font-hero-display text-4xl sm:text-6xl md:text-7xl font-black text-[#0A0A0A] tracking-tight leading-[0.95]">
              Interactive Motion &amp; <br />
              <span className="text-[#0A0A0A] relative inline-block">
                Animation Playground
                <span className="absolute bottom-0 left-0 right-0 h-2.5 bg-[#C5F52A]/35 -z-10" />
              </span>
            </h1>

            <p className="font-body-ui text-lg sm:text-xl text-[#6B7280] font-light leading-relaxed max-w-2xl pt-2">
              A curated collection of bespoke kinetic typography, GPU-accelerated motion, cursor physics, and scroll dynamics engineered for flagship web experiences.
            </p>
          </div>

          {/* Filter Bar */}
          <div className="flex items-center gap-2 flex-wrap pt-12">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as CategoryType)}
                className={`px-5 py-2.5 rounded-full text-xs font-mono tracking-wider uppercase transition-all duration-300 ${
                  activeCategory === cat.id
                    ? 'bg-[#0A0A0A] text-[#C5F52A] shadow-md scale-105'
                    : 'bg-white/80 border border-[#0A0A0A]/10 text-[#6B7280] hover:text-[#0A0A0A] hover:bg-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Experiments Showcase Grid */}
      <section className="py-20 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">

          {/* Card 2: Kinetic Dual-Character Text Roll */}
          {(activeCategory === 'all' || activeCategory === 'typography') && (
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[#0A0A0A]/[0.08] hover:border-[#C5F52A] transition-all duration-300 flex flex-col justify-between space-y-8 group shadow-xs hover:shadow-xl">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-[#6B7280]">
                    — Kinetic Typography
                  </span>
                  <span className="text-xs font-mono text-[#0A0A0A]/30">Framer Motion</span>
                </div>
                <h3 className="font-section-heading text-2xl font-bold text-[#0A0A0A]">
                  Dual-Character Text Roll
                </h3>
                <p className="mt-2 text-sm font-body-ui text-[#6B7280] font-light leading-relaxed">
                  Hover over the text below to trigger a dual-layer vertical rolling text animation where every character rolls up with staggering delay.
                </p>
              </div>

              {/* Interactive Preview Canvas */}
              <div className="relative w-full h-72 rounded-2xl bg-[#0A0A0A] border border-white/10 flex flex-col items-center justify-center p-6 space-y-4 text-white">
                <TextRoll center className="font-hero-display text-4xl sm:text-5xl font-black text-[#C5F52A] tracking-tight uppercase cursor-pointer">
                  HOVER OVER ME
                </TextRoll>
                <span className="text-xs font-mono text-[#9CA3AF] uppercase tracking-widest">
                  Try hovering the text above
                </span>
              </div>

              <div className="pt-4 border-t border-[#0A0A0A]/[0.06] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-[#F5F3EE] text-[10px] font-mono text-[#0A0A0A]">Framer Motion</span>
                  <span className="px-2.5 py-1 rounded-md bg-[#F5F3EE] text-[10px] font-mono text-[#0A0A0A]">Letter Stagger</span>
                </div>
                <a
                  href="/#contact"
                  className="inline-flex items-center gap-1.5 text-xs font-bold font-body-ui text-[#0A0A0A] hover:text-[#C5F52A] transition-colors"
                >
                  <span>Request Effect</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          )}

          {/* Card 3: Magnetic Physics Buttons */}
          {(activeCategory === 'all' || activeCategory === 'physics') && (
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[#0A0A0A]/[0.08] hover:border-[#C5F52A] transition-all duration-300 flex flex-col justify-between space-y-8 group shadow-xs hover:shadow-xl">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-[#6B7280]">
                    — Cursor &amp; Physics
                  </span>
                  <span className="text-xs font-mono text-[#0A0A0A]/30">Framer Spring</span>
                </div>
                <h3 className="font-section-heading text-2xl font-bold text-[#0A0A0A]">
                  Magnetic Physics Pull
                </h3>
                <p className="mt-2 text-sm font-body-ui text-[#6B7280] font-light leading-relaxed">
                  Move your cursor near the buttons below. The interactive elements pull towards the cursor with spring mass and elasticity.
                </p>
              </div>

              {/* Interactive Preview Canvas */}
              <div className="relative w-full h-72 rounded-2xl bg-[#F5F3EE] border border-[#0A0A0A]/[0.06] flex items-center justify-center gap-4 p-6">
                <MagneticButton variant="primary" size="lg">
                  <TextRoll center>MAGNETIC BTN</TextRoll>
                  <ArrowUpRight className="w-4 h-4 ml-1" />
                </MagneticButton>

                <MagneticButton variant="outline" size="md">
                  <TextRoll center>EXPLORE</TextRoll>
                </MagneticButton>
              </div>

              <div className="pt-4 border-t border-[#0A0A0A]/[0.06] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-[#F5F3EE] text-[10px] font-mono text-[#0A0A0A]">Spring Physics</span>
                  <span className="px-2.5 py-1 rounded-md bg-[#F5F3EE] text-[10px] font-mono text-[#0A0A0A]">Cursor Distance</span>
                </div>
                <a
                  href="/#contact"
                  className="inline-flex items-center gap-1.5 text-xs font-bold font-body-ui text-[#0A0A0A] hover:text-[#C5F52A] transition-colors"
                >
                  <span>Request Effect</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          )}

          {/* Card 4: 4-Column Multi-Speed Parallax Gallery */}
          {(activeCategory === 'all' || activeCategory === 'scroll') && (
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[#0A0A0A]/[0.08] hover:border-[#C5F52A] transition-all duration-300 flex flex-col justify-between space-y-8 group shadow-xs hover:shadow-xl md:col-span-2">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-[#6B7280]">
                    — Scroll Dynamics
                  </span>
                  <span className="text-xs font-mono text-[#0A0A0A]/30">Skiper 30 Parallax</span>
                </div>
                <h3 className="font-section-heading text-2xl font-bold text-[#0A0A0A]">
                  4-Column Multi-Speed Parallax Gallery
                </h3>
                <p className="mt-2 text-sm font-body-ui text-[#6B7280] font-light leading-relaxed">
                  Scroll down over this section to experience multi-speed vertical parallax columns that scroll at staggered velocities using Framer Motion useScroll and Lenis smooth scroll physics.
                </p>
              </div>

              {/* Interactive Preview Canvas */}
              <div className="relative w-full overflow-hidden rounded-2xl">
                <ParallaxColumns />
              </div>

              <div className="pt-4 border-t border-[#0A0A0A]/[0.06] flex items-center justify-between">
                <p className="text-[10px] font-mono text-[#0A0A0A]/30">Multi-Speed Y Transform  ·  useScroll Offset</p>
                <a
                  href="/#contact"
                  className="inline-flex items-center gap-1.5 text-xs font-bold font-body-ui text-[#0A0A0A] hover:text-[#C5F52A] transition-colors shrink-0"
                >
                  <span>Request Effect</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          )}

          {/* Card 5: Infinite Marquee with Hover Pause */}
          {(activeCategory === 'all' || activeCategory === 'scroll') && (
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[#0A0A0A]/[0.08] hover:border-[#C5F52A] transition-all duration-300 flex flex-col justify-between space-y-8 group shadow-xs hover:shadow-xl">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-[#6B7280]">
                    — Scroll Dynamics
                  </span>
                  <span className="text-xs font-mono text-[#0A0A0A]/30">Framer RAF Loop</span>
                </div>
                <h3 className="font-section-heading text-2xl font-bold text-[#0A0A0A]">
                  Infinite Marquee with Scroll Velocity
                </h3>
                <p className="mt-2 text-sm font-body-ui text-[#6B7280] font-light leading-relaxed">
                  Smooth continuous infinite marquee that automatically accelerates when scrolling and pauses gracefully on mouse hover.
                </p>
              </div>

              {/* Interactive Preview Canvas */}
              <div className="relative w-full h-72 rounded-2xl bg-[#F5F3EE] border border-[#0A0A0A]/[0.06] flex items-center justify-center overflow-hidden p-2">
                <InfiniteMarquee direction="left" speed="slow" fadeColor="none">
                  {['NEXT.JS 15', 'GSAP PREMIUM', 'REACT 19', 'LENIS SCROLL', 'THREE.JS'].map((tech, i) => (
                    <div
                      key={i}
                      className="px-6 py-3 rounded-xl bg-white border border-[#0A0A0A]/10 font-mono text-sm font-bold text-[#0A0A0A] shadow-xs shrink-0"
                    >
                      {tech}
                    </div>
                  ))}
                </InfiniteMarquee>
              </div>

              <div className="pt-4 border-t border-[#0A0A0A]/[0.06] flex items-center justify-between">
                <p className="text-[10px] font-mono text-[#0A0A0A]/30">RAF Loop  ·  Hover Pause</p>
                <a
                  href="/#contact"
                  className="inline-flex items-center gap-1.5 text-xs font-bold font-body-ui text-[#0A0A0A] hover:text-[#C5F52A] transition-colors"
                >
                  <span>Request Effect</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          )}

          {/* Card 6: Dynamic Metric Counter */}
          {(activeCategory === 'all' || activeCategory === 'physics') && (
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[#0A0A0A]/[0.08] hover:border-[#C5F52A] transition-all duration-300 flex flex-col justify-between space-y-8 group shadow-xs hover:shadow-xl">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-[#6B7280]">
                    — Cursor &amp; Physics
                  </span>
                  <span className="text-xs font-mono text-[#0A0A0A]/30">GSAP Counter</span>
                </div>
                <h3 className="font-section-heading text-2xl font-bold text-[#0A0A0A]">
                  Numerical Metric Count-Up
                </h3>
                <p className="mt-2 text-sm font-body-ui text-[#6B7280] font-light leading-relaxed">
                  Smooth numerical easing increment triggered when elements enter the viewport or on user interaction.
                </p>
              </div>

              {/* Interactive Preview Canvas */}
              <div className="relative w-full h-72 rounded-2xl bg-[#0A0A0A] border border-white/10 flex items-center justify-center p-6 text-center">
                <div className="space-y-2">
                  <span className="font-hero-display text-6xl sm:text-7xl font-black text-[#C5F52A] block">
                    <CounterAnimation end={100} suffix="%" />
                  </span>
                  <span className="text-xs font-mono text-[#9CA3AF] uppercase tracking-widest block">
                    Sub-Second Target
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-[#0A0A0A]/[0.06] flex items-center justify-between">
                <p className="text-[10px] font-mono text-[#0A0A0A]/30">GSAP Easing  ·  Numeric Interpolation</p>
                <a
                  href="/#contact"
                  className="inline-flex items-center gap-1.5 text-xs font-bold font-body-ui text-[#0A0A0A] hover:text-[#C5F52A] transition-colors"
                >
                  <span>Request Effect</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Footer Banner */}
      <section className="py-20 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
        <div className="p-10 sm:p-16 rounded-3xl bg-[#0A0A0A] text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="space-y-4 max-w-2xl relative z-10">
            <span className="text-xs font-mono uppercase tracking-widest text-[#C5F52A]">
              WANT CUSTOM MOTION FOR YOUR BRAND?
            </span>
            <h2 className="font-hero-display text-3xl sm:text-5xl font-bold tracking-tight">
              Ready to Engineer Your Flagship Website?
            </h2>
            <p className="text-sm font-body-ui text-[#9CA3AF] font-light">
              Let&apos;s build a bespoke digital flagship with liquid smooth animations, sub-second speed targets, and 1 year of included free maintenance.
            </p>
          </div>

          <a href="/#contact" className="shrink-0 relative z-10">
            <MagneticButton variant="primary" size="lg">
              <TextRoll center>BOOK A CONSULTATION</TextRoll>
              <ArrowUpRight className="w-5 h-5 ml-1" />
            </MagneticButton>
          </a>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
