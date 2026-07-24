'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Maximize2, ChevronLeft, ChevronRight, RotateCcw, ArrowUpRight, Sparkles, Sliders } from 'lucide-react';
import { TextRoll } from '@/components/animations/TextRoll';
import { MagneticButton } from '@/components/animations/MagneticButton';
import { InfiniteMarquee } from '@/components/animations/InfiniteMarquee';
import { CounterAnimation } from '@/components/animations/CounterAnimation';
import { ParallaxColumns } from '@/components/animations/ParallaxColumns';

export type PreviewEffectId =
  | 'dual-text-roll'
  | 'magnetic-physics'
  | 'parallax-gallery'
  | 'infinite-marquee'
  | 'metric-counter';

interface EffectMeta {
  id: PreviewEffectId;
  title: string;
  category: string;
  library: string;
  description: string;
}

export const PREVIEW_EFFECTS: EffectMeta[] = [
  {
    id: 'dual-text-roll',
    title: 'Dual-Character Text Roll',
    category: 'Kinetic Typography',
    library: 'Framer Motion',
    description: 'Staggered dual-layer vertical rolling text animation where every character rolls up with calculated delays.',
  },
  {
    id: 'magnetic-physics',
    title: 'Magnetic Physics Pull',
    category: 'Cursor & Physics',
    library: 'Framer Spring + GSAP',
    description: 'Interactive elements pull towards cursor and touch points with spring mass, damping, and elasticity.',
  },
  {
    id: 'parallax-gallery',
    title: '4-Column Multi-Speed Parallax Gallery',
    category: 'Scroll Dynamics',
    library: 'Skiper 30 Parallax',
    description: 'Multi-speed vertical parallax columns that scroll at staggered velocities using useScroll and Lenis physics.',
  },
  {
    id: 'infinite-marquee',
    title: 'Infinite Marquee with Scroll Velocity',
    category: 'Scroll Dynamics',
    library: 'Framer RAF Loop',
    description: 'Continuous infinite marquee with scroll velocity acceleration and instant hover-pause interaction.',
  },
  {
    id: 'metric-counter',
    title: 'Numerical Metric Count-Up',
    category: 'Cursor & Physics',
    library: 'GSAP Easing Counter',
    description: 'Numerical easing increment triggered when elements enter viewport or on user interaction.',
  },
];

interface FullscreenPreviewModalProps {
  effectId: PreviewEffectId | null;
  onClose: () => void;
  onSelectEffect: (id: PreviewEffectId) => void;
}

export const FullscreenPreviewModal: React.FC<FullscreenPreviewModalProps> = ({
  effectId,
  onClose,
  onSelectEffect,
}) => {
  const [customText, setCustomText] = useState('HOVER OVER ME');
  const [counterKey, setCounterKey] = useState(0);
  const parallaxScrollRef = useRef<HTMLDivElement>(null);

  const currentEffect = PREVIEW_EFFECTS.find((e) => e.id === effectId);
  const currentIndex = PREVIEW_EFFECTS.findIndex((e) => e.id === effectId);

  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (effectId) {
      document.body.style.overflow = 'hidden';
      window.dispatchEvent(new CustomEvent('webbound:preview-scroll', { detail: { open: true } }));
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.dispatchEvent(new CustomEvent('webbound:preview-scroll', { detail: { open: false } }));
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [effectId, onClose]);

  if (!effectId || !currentEffect) return null;

  const handlePrev = () => {
    const prevIdx = (currentIndex - 1 + PREVIEW_EFFECTS.length) % PREVIEW_EFFECTS.length;
    onSelectEffect(PREVIEW_EFFECTS[prevIdx].id);
  };

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % PREVIEW_EFFECTS.length;
    onSelectEffect(PREVIEW_EFFECTS[nextIdx].id);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[99990] bg-[#0A0A0A] text-white flex flex-col justify-between p-4 sm:p-8 md:p-12 overflow-hidden select-none"
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4 shrink-0">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-[#C5F52A] text-[#0A0A0A] font-mono text-[10px] font-bold uppercase tracking-wider">
              FULL PAGE PREVIEW
            </span>
            <span className="font-mono text-xs text-white/50 hidden sm:inline">
              {currentEffect.category}  ·  {currentEffect.library}
            </span>
          </div>

          {/* Controls: Prev / Next / Close */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-white/10 p-1 rounded-full border border-white/10">
              <button
                onClick={handlePrev}
                className="p-2 rounded-full hover:bg-white/20 text-white transition-colors"
                title="Previous Effect"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="font-mono text-xs px-2 text-white/70">
                {currentIndex + 1} / {PREVIEW_EFFECTS.length}
              </span>
              <button
                onClick={handleNext}
                className="p-2 rounded-full hover:bg-white/20 text-white transition-colors"
                title="Next Effect"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/10"
              title="Close Preview (ESC)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Immersive Fullscreen Preview Canvas */}
        <div className="flex-1 flex flex-col items-center justify-center relative my-6 overflow-hidden rounded-3xl bg-[#121212] border border-white/10 p-6 sm:p-12">
          {/* Effect 1: Dual-Character Text Roll */}
          {effectId === 'dual-text-roll' && (
            <div className="w-full flex flex-col items-center justify-center space-y-8 max-w-5xl text-center">
              <div className="space-y-2">
                <span className="text-xs font-mono text-[#C5F52A] uppercase tracking-widest block">
                  Interactive Typography Stage
                </span>
                <p className="text-xs sm:text-sm font-body-ui text-white/60">
                  Hover or tap the text below to trigger full vertical letter rolling animation.
                </p>
              </div>

              {/* Giant Interactive Kinetic Text Roll */}
              <div className="w-full overflow-hidden py-8 px-4 flex items-center justify-center bg-[#0A0A0A] rounded-3xl border border-white/10 shadow-2xl">
                <TextRoll
                  center
                  className="font-hero-display text-3xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-[#C5F52A] tracking-tight uppercase cursor-pointer"
                >
                  {customText || 'HOVER OVER ME'}
                </TextRoll>
              </div>

              {/* Custom Text Field */}
              <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md">
                <input
                  type="text"
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  placeholder="Type custom text here..."
                  className="w-full px-5 py-3 rounded-xl bg-white/10 border border-white/20 text-white font-mono text-sm placeholder:text-white/40 focus:border-[#C5F52A] focus:outline-none"
                />
                <button
                  onClick={() => setCustomText('FLAGSHIP SITE')}
                  className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 font-mono text-xs text-white shrink-0 transition-colors"
                >
                  Preset Text
                </button>
              </div>
            </div>
          )}

          {/* Effect 2: Magnetic Physics Pull */}
          {effectId === 'magnetic-physics' && (
            <div className="w-full flex flex-col items-center justify-center space-y-10 max-w-4xl text-center">
              <div className="space-y-2">
                <span className="text-xs font-mono text-[#C5F52A] uppercase tracking-widest block">
                  Cursor &amp; Touch Physics Arena
                </span>
                <p className="text-xs sm:text-sm font-body-ui text-white/60">
                  Move your cursor or drag your finger near any button to experience spring mass pull.
                </p>
              </div>

              {/* Grid of Magnetic Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-3xl">
                <MagneticButton variant="primary" size="lg" strength={0.4} className="w-full">
                  <TextRoll center>PRIMARY PULL</TextRoll>
                  <ArrowUpRight className="w-4 h-4 ml-1" />
                </MagneticButton>

                <MagneticButton variant="dark" size="lg" strength={0.5} className="w-full">
                  <TextRoll center>DARK SPRING</TextRoll>
                  <Sparkles className="w-4 h-4 ml-1 text-[#C5F52A]" />
                </MagneticButton>

                <MagneticButton variant="outline-dark" size="lg" strength={0.3} className="w-full">
                  <TextRoll center>OUTLINE MOTION</TextRoll>
                </MagneticButton>

                <MagneticButton variant="secondary" size="md" strength={0.45} className="w-full">
                  <TextRoll center>EXPLORE WORK</TextRoll>
                </MagneticButton>

                <MagneticButton variant="primary" size="md" strength={0.6} className="w-full">
                  <TextRoll center>HIGH ELASTICITY</TextRoll>
                </MagneticButton>

                <MagneticButton variant="dark" size="md" strength={0.35} className="w-full">
                  <TextRoll center>BOOK CONSULT</TextRoll>
                </MagneticButton>
              </div>
            </div>
          )}

          {/* Effect 3: 4-Column Multi-Speed Parallax Gallery */}
          {effectId === 'parallax-gallery' && (
            <div className="w-full h-full flex flex-col justify-between space-y-4">
              <div className="text-center space-y-1 shrink-0">
                <span className="text-xs font-mono text-[#C5F52A] uppercase tracking-widest block">
                  Fullscreen Parallax Gallery Stage
                </span>
                <p className="text-xs font-body-ui text-white/60">
                  Scroll down inside this full-page view to see multi-speed vertical column physics.
                </p>
              </div>

              {/* Full Height Parallax Canvas */}
              <div
                ref={parallaxScrollRef}
                className="flex-1 w-full overflow-y-auto overscroll-contain touch-pan-y rounded-2xl max-h-[60vh] sm:max-h-[68vh] scrollbar-thin"
              >
                <ParallaxColumns
                  scrollContainer={parallaxScrollRef}
                  className="min-h-[820px] sm:min-h-[1000px]"
                />
              </div>
            </div>
          )}

          {/* Effect 4: Infinite Marquee with Scroll Velocity */}
          {effectId === 'infinite-marquee' && (
            <div className="w-full flex flex-col items-center justify-center space-y-8 max-w-5xl">
              <div className="text-center space-y-1">
                <span className="text-xs font-mono text-[#C5F52A] uppercase tracking-widest block">
                  Infinite Marquee RAF Loop Stage
                </span>
                <p className="text-xs sm:text-sm font-body-ui text-white/60">
                  Continuous multi-row marquee that accelerates on scroll and pauses on mouse hover or touch hold.
                </p>
              </div>

              <div className="w-full space-y-6 bg-[#0A0A0A] p-6 sm:p-10 rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
                {/* Marquee Row 1 */}
                <InfiniteMarquee direction="left" speed="medium" fadeColor="dark">
                  {['NEXT.JS 15', 'GSAP PREMIUM', 'REACT 19', 'LENIS SCROLL', 'THREE.JS', 'TAILWIND CSS'].map((tech, i) => (
                    <div
                      key={i}
                      className="px-6 py-4 rounded-2xl bg-white/10 border border-white/15 font-hero-display text-base sm:text-xl font-bold text-[#C5F52A] shrink-0"
                    >
                      {tech}
                    </div>
                  ))}
                </InfiniteMarquee>

                {/* Marquee Row 2 (Reverse) */}
                <InfiniteMarquee direction="right" speed="fast" fadeColor="dark">
                  {['FLAGSHIP WEBSITES', 'SUB-SECOND SPEED', '60FPS ANIMATIONS', 'CUSTOM CURSOR', 'KINETIC TYPE'].map((text, i) => (
                    <div
                      key={i}
                      className="px-6 py-4 rounded-2xl bg-white/5 border border-white/10 font-mono text-sm sm:text-base font-bold text-white shrink-0"
                    >
                      {text}
                    </div>
                  ))}
                </InfiniteMarquee>
              </div>
            </div>
          )}

          {/* Effect 5: Numerical Metric Count-Up */}
          {effectId === 'metric-counter' && (
            <div className="w-full flex flex-col items-center justify-center space-y-10 max-w-4xl text-center">
              <div className="space-y-2">
                <span className="text-xs font-mono text-[#C5F52A] uppercase tracking-widest block">
                  Numerical Metric Count-Up Arena
                </span>
                <p className="text-xs sm:text-sm font-body-ui text-white/60">
                  GSAP Easing count increments with configurable start/end targets.
                </p>
              </div>

              {/* Grid of Metric Counters */}
              <div key={counterKey} className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full">
                <div className="p-6 rounded-2xl bg-[#0A0A0A] border border-white/10 flex flex-col items-center justify-center space-y-2">
                  <span className="font-hero-display text-4xl sm:text-5xl font-black text-[#C5F52A]">
                    <CounterAnimation end={100} suffix="%" />
                  </span>
                  <span className="font-mono text-[10px] sm:text-xs text-white/60 uppercase tracking-widest">
                    TARGET ACCURACY
                  </span>
                </div>

                <div className="p-6 rounded-2xl bg-[#0A0A0A] border border-white/10 flex flex-col items-center justify-center space-y-2">
                  <span className="font-hero-display text-4xl sm:text-5xl font-black text-[#C5F52A]">
                    <CounterAnimation end={60} suffix="FPS" />
                  </span>
                  <span className="font-mono text-[10px] sm:text-xs text-white/60 uppercase tracking-widest">
                    FLUID RENDER RATE
                  </span>
                </div>

                <div className="p-6 rounded-2xl bg-[#0A0A0A] border border-white/10 flex flex-col items-center justify-center space-y-2">
                  <span className="font-hero-display text-4xl sm:text-5xl font-black text-[#C5F52A]">
                    <CounterAnimation end={99} suffix="+" />
                  </span>
                  <span className="font-mono text-[10px] sm:text-xs text-white/60 uppercase tracking-widest">
                    PERFORMANCE SCORE
                  </span>
                </div>

                <div className="p-6 rounded-2xl bg-[#0A0A0A] border border-white/10 flex flex-col items-center justify-center space-y-2">
                  <span className="font-hero-display text-4xl sm:text-5xl font-black text-[#C5F52A]">
                    <CounterAnimation end={1} suffix="YR" />
                  </span>
                  <span className="font-mono text-[10px] sm:text-xs text-white/60 uppercase tracking-widest">
                    FREE MAINTENANCE
                  </span>
                </div>
              </div>

              <button
                onClick={() => setCounterKey((k) => k + 1)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#C5F52A] text-[#0A0A0A] font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#b5e51a] transition-colors shadow-lg"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Re-trigger Counter Animation</span>
              </button>
            </div>
          )}
        </div>

        {/* Bottom Footer Info & CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 pt-4 shrink-0">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-section-heading text-lg font-bold text-white">
              {currentEffect.title}
            </h4>
            <p className="font-body-ui text-xs text-white/50 max-w-xl">
              {currentEffect.description}
            </p>
          </div>

          <a
            href="/#contact"
            onClick={onClose}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#C5F52A] text-[#0A0A0A] font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#b5e51a] transition-colors shrink-0"
          >
            <span>Request Effect for Your Site</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
