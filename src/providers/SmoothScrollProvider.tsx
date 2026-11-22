'use client';

import React, { createContext, useCallback, useContext, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePathname } from 'next/navigation';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

function nativeScrollTo(top: number, immediate: boolean) {
  window.scrollTo({ top, behavior: immediate ? 'instant' : 'smooth' });
}

const PageScrollContext = createContext(nativeScrollTo);
export const usePageScrollTo = () => useContext(PageScrollContext);

export const SmoothScrollProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();
  const scrollTo = useCallback((top: number, immediate: boolean) => {
    if (lenisRef.current) lenisRef.current.scrollTo(top, { immediate });
    else nativeScrollTo(top, immediate);
  }, []);

  useEffect(() => {
    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Mobile / touch devices already have hardware-accelerated 120Hz asynchronous
    // momentum scrolling in the browser compositor thread. Virtual scroll engines
    // (like Lenis) on touch devices introduce non-passive touch listeners,
    // compositor delays, and conflicts with dynamic address bar resizing.
    // We only enable Lenis on fine-pointer devices (desktop/trackpad/mouse).
    const isTouchDevice =
      window.matchMedia('(pointer: coarse)').matches ||
      ('ontouchstart' in window && !window.matchMedia('(pointer: fine)').matches);

    if (isTouchDevice) {
      // Allow native scroll; ensure ScrollTrigger works smoothly with native scroll
      ScrollTrigger.refresh();
      return;
    }

    const lenis = new Lenis({
      // Slightly shorter duration + a steeper expo-out curve = the scroll
      // settles faster while keeping a smooth, weighted feel.
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -12 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1,
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

  // Refresh the scroll integration after a route change.
  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;

    lenis.start();
    ScrollTrigger.refresh();
  }, [pathname]);

  return <PageScrollContext.Provider value={scrollTo}>{children}</PageScrollContext.Provider>;
};
