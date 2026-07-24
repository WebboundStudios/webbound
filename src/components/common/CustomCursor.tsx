'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [cursorText, setCursorText] = useState<string>('');
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isDarkBg, setIsDarkBg] = useState<boolean>(false);

  useEffect(() => {
    if (window.innerWidth < 1024) return;

    document.body.classList.add('custom-cursor-enabled');
    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    let posX = 0;
    let posY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const checkBgTheme = (x: number, y: number) => {
      const el = document.elementFromPoint(x, y) as HTMLElement | null;
      if (!el) return;

      // 1. Direct check for explicit dark container, modal, or dark section parent
      const darkParent = el.closest('[data-theme-bg="#0A0A0A"], .dark, [class*="bg-[#0A0A0A]"], [class*="bg-[#121212]"], [class*="bg-[#141414]"], [class*="bg-black"]');
      if (darkParent) {
        setIsDarkBg(true);
        return;
      }

      // 2. Direct check for explicit light section
      const lightParent = el.closest('[data-theme-bg="#F5F3EE"]');
      if (lightParent) {
        setIsDarkBg(false);
        return;
      }

      // 3. Computed background color luminance check up the DOM chain
      let current: HTMLElement | null = el;
      while (current && current !== document.body) {
        const bg = getComputedStyle(current).backgroundColor;
        if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') {
          const match = bg.match(/\d+/g);
          if (match && match.length >= 3) {
            const r = parseInt(match[0], 10);
            const g = parseInt(match[1], 10);
            const b = parseInt(match[2], 10);
            const brightness = (r * 299 + g * 587 + b * 114) / 1000;
            setIsDarkBg(brightness < 140);
            return;
          }
        }
        current = current.parentElement;
      }

      // 4. Fallback to main/body background theme
      const mainEl = document.querySelector('main');
      const bodyBg = getComputedStyle(mainEl || document.body).backgroundColor;
      const match = bodyBg.match(/\d+/g);
      if (match && match.length >= 3) {
        const r = parseInt(match[0], 10);
        const g = parseInt(match[1], 10);
        const b = parseInt(match[2], 10);
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;
        setIsDarkBg(brightness < 140);
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) setIsVisible(true);
      gsap.set(dot, { x: mouseX, y: mouseY });

      checkBgTheme(mouseX, mouseY);
    };

    // Fast snappy RAF tracking (0.45 lerp for instantaneous feel)
    const render = () => {
      posX += (mouseX - posX) * 0.45;
      posY += (mouseY - posY) * 0.45;
      gsap.set(cursor, { x: posX, y: posY });
      requestAnimationFrame(render);
    };
    const rafId = requestAnimationFrame(render);

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactiveEl = target.closest('a, button, [data-cursor], input, textarea, select') as HTMLElement;

      if (interactiveEl) {
        setIsHovered(true);
        const label = interactiveEl.getAttribute('data-cursor');
        setCursorText(label || '');
      } else {
        setIsHovered(false);
        setCursorText('');
      }
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseover', onMouseOver, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      document.body.classList.remove('custom-cursor-enabled');
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(rafId);
    };
  }, [isVisible]);

  return (
    <>
      {/* Outer Follower Ring */}
      <div
        ref={cursorRef}
        className={`hidden lg:flex items-center justify-center text-center pointer-events-none fixed top-0 left-0 z-[100000] -translate-x-1/2 -translate-y-1/2 rounded-full border transition-all duration-300 ease-out ${
          isVisible ? 'opacity-100' : 'opacity-0'
        } ${
          isHovered
            ? cursorText
              ? 'w-16 h-16 bg-[#C5F52A] border-transparent text-[#0A0A0A] shadow-lg scale-100'
              : 'w-10 h-10 bg-[#C5F52A]/20 border-[#C5F52A] scale-105'
            : `w-6 h-6 bg-transparent ${isDarkBg ? 'border-[#C5F52A]' : 'border-[#0A0A0A]/40'}`
        }`}
      >
        {cursorText && (
          <span className="uppercase tracking-widest text-[10px] font-mono font-bold leading-none text-center select-none text-[#0A0A0A] block">
            {cursorText}
          </span>
        )}
      </div>

      {/* Center Precise Dot */}
      <div
        ref={dotRef}
        className={`hidden lg:block pointer-events-none fixed top-0 left-0 z-[100000] w-2.5 h-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full transition-colors duration-200 ${
          isDarkBg ? 'bg-[#C5F52A] shadow-[0_0_10px_rgba(197,245,42,0.9)]' : 'bg-[#0A0A0A]'
        } ${isVisible && !cursorText ? 'opacity-100' : 'opacity-0'}`}
      />
    </>
  );
};
