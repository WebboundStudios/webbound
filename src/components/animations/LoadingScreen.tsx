'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useLoadingStore } from '@/providers/LoadingProvider';

export const LoadingScreen: React.FC = () => {
  const { isLoading, finishLoading } = useLoadingStore();
  const [percent, setPercent] = useState<number>(0);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isLoading) return;

    // Lock page scrolling during loading state
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    const preventScroll = (e: Event) => {
      e.preventDefault();
    };

    const preventKeyScroll = (e: KeyboardEvent) => {
      if (['Space', 'PageUp', 'PageDown', 'End', 'Home', 'ArrowUp', 'ArrowDown'].includes(e.code)) {
        e.preventDefault();
      }
    };

    window.addEventListener('wheel', preventScroll, { passive: false });
    window.addEventListener('touchmove', preventScroll, { passive: false });
    window.addEventListener('keydown', preventKeyScroll, { passive: false });

    const ctx = gsap.context(() => {
      // Counter animation
      const obj = { val: 0 };
      gsap.to(obj, {
        val: 100,
        duration: 2.2,
        ease: 'power2.inOut',
        onUpdate: () => {
          setPercent(Math.round(obj.val));
        },
      });

      // Exit transition — slide up
      gsap.to(containerRef.current, {
        yPercent: -100,
        duration: 0.8,
        ease: 'expo.inOut',
        delay: 2.5,
        onComplete: () => {
          finishLoading();
        },
      });
    }, containerRef);

    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      window.removeEventListener('wheel', preventScroll);
      window.removeEventListener('touchmove', preventScroll);
      window.removeEventListener('keydown', preventKeyScroll);
      ctx.revert();
    };
  }, [isLoading, finishLoading]);

  if (!isLoading) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[10000] flex flex-col justify-between bg-[#C5F52A] select-none"
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between px-8 md:px-16 pt-8">
        <span className="font-hero-display text-2xl md:text-3xl font-black text-[#0A0A0A] uppercase tracking-tight">
          LOADING
        </span>
        <span className="font-body-ui text-xs md:text-sm font-medium text-[#0A0A0A]/60 uppercase tracking-widest">
          PLEASE WAIT
        </span>
      </div>

      {/* Giant Counter — Center */}
      <div className="flex items-center justify-center flex-1">
        <span className="font-hero-display text-[12rem] sm:text-[16rem] md:text-[22rem] lg:text-[28rem] font-black text-[#0A0A0A] leading-none tracking-tighter select-none">
          {percent}
        </span>
      </div>

      {/* Bottom Bar with Progress Line */}
      <div className="px-8 md:px-16 pb-8 space-y-4">
        {/* Progress Line */}
        <div className="w-full h-[2px] bg-[#0A0A0A]/20 relative overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-[#0A0A0A] transition-all duration-100 ease-out"
            style={{ width: `${percent}%` }}
          />
        </div>

        {/* Bottom Labels */}
        <div className="flex items-center justify-between">
          <span className="font-body-ui text-xs md:text-sm text-[#0A0A0A]/60 uppercase tracking-widest">
            PREPARING EXPERIENCE
          </span>
          <span className="font-hero-display text-xs md:text-sm font-bold text-[#0A0A0A] uppercase tracking-widest">
            LOADING ASSETS
          </span>
        </div>
      </div>
    </div>
  );
};
