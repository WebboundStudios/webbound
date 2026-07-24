'use client';

import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePathname } from 'next/navigation';
import { useLoadingStore } from '@/providers/LoadingProvider';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const SmoothScrollProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const lenisRef = useRef<Lenis | null>(null);
  const { isLoading } = useLoadingStore();
  const pathname = usePathname();

  useEffect(() => {
    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    // Full-screen demos use their own native scroll container. Pausing Lenis
    // while one is open prevents two scroll engines from competing for input.
    const handlePreviewScroll = (event: Event) => {
      const open = (event as CustomEvent<{ open?: boolean }>).detail?.open;
      if (open) {
        lenis.stop();
      } else {
        lenis.start();
      }
    };
    window.addEventListener('webbound:preview-scroll', handlePreviewScroll);
    window.addEventListener('webbound:scroll-lock', handlePreviewScroll);

    // Sync Lenis scroll with GSAP ScrollTrigger
    lenis.on('scroll', () => {
      ScrollTrigger.update();
    });

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateTicker);
      window.removeEventListener('webbound:preview-scroll', handlePreviewScroll);
      window.removeEventListener('webbound:scroll-lock', handlePreviewScroll);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Control Lenis smooth scroll based on loading state and active route
  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;

    if (pathname !== '/') {
      // Non-homepage routes (e.g. /animations) don't use preloader, ensure Lenis is started
      lenis.start();
      ScrollTrigger.refresh();
    } else if (isLoading) {
      lenis.stop();
    } else {
      lenis.start();
      ScrollTrigger.refresh();
    }
  }, [isLoading, pathname]);

  return <>{children}</>;
};
