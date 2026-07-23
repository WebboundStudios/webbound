'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function useMagnetic<T extends HTMLElement = HTMLDivElement>(strength = 0.35) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = el.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      const distanceX = (e.clientX - centerX) * strength;
      const distanceY = (e.clientY - centerY) * strength;

      gsap.to(el, {
        x: distanceX,
        y: distanceY,
        duration: 0.15,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const { left, top, width, height } = el.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        const distanceX = (touch.clientX - centerX) * strength;
        const distanceY = (touch.clientY - centerY) * strength;

        gsap.to(el, {
          x: distanceX,
          y: distanceY,
          duration: 0.15,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      }
    };

    const handleReset = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.25,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleReset);
    el.addEventListener('touchstart', handleTouchMove, { passive: true });
    el.addEventListener('touchmove', handleTouchMove, { passive: true });
    el.addEventListener('touchend', handleReset);
    el.addEventListener('touchcancel', handleReset);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleReset);
      el.removeEventListener('touchstart', handleTouchMove);
      el.removeEventListener('touchmove', handleTouchMove);
      el.removeEventListener('touchend', handleReset);
      el.removeEventListener('touchcancel', handleReset);
    };
  }, [strength]);

  return ref;
}
