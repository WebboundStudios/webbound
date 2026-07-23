'use client';

import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const ScrollThemeController: React.FC = () => {
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>('[data-theme-bg]');
    const mainEl = document.querySelector<HTMLElement>('main');
    if (!sections.length || !mainEl) return;

    const ctx = gsap.context(() => {
      sections.forEach((section) => {
        const bg = section.getAttribute('data-theme-bg');
        if (!bg) return;

        const isDark = bg === '#0A0A0A';
        const textColor = isDark ? '#FFFFFF' : '#0A0A0A';

        const applyTheme = () => {
          gsap.to([mainEl, document.body], {
            backgroundColor: bg,
            color: textColor,
            duration: 0.35,
            ease: 'power2.out',
            overwrite: 'auto',
          });
        };

        ScrollTrigger.create({
          trigger: section,
          start: 'top 90%',
          end: 'bottom 10%',
          onEnter: applyTheme,
          onEnterBack: applyTheme,
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return null;
};
