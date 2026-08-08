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
  // Ref (not state) because it's read every RAF frame inside the loop that
  // already owns this element's transform — GSAP rewrites `transform` each
  // tick, so scale feedback has to be composed there, not via a CSS class.
  const isPressedRef = useRef<boolean>(false);
  // Mirrors `isVisible` without being a effect dependency — see fix below.
  const isVisibleRef = useRef<boolean>(false);

  useEffect(() => {
    if (window.innerWidth < 1024) return;

    document.body.classList.add('custom-cursor-enabled');
    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    // Fix: center via GSAP's own xPercent/yPercent instead of Tailwind's
    // -translate-x-1/2 -translate-y-1/2. GSAP owns this element's transform
    // every frame (see render() below); a CSS percentage-based translate
    // gets silently discarded the moment GSAP writes its own x/y, since
    // GSAP recomposes the whole `transform` from its internal cache rather
    // than merging with the class-based one. Setting xPercent/yPercent
    // here puts the -50%/-50% centering *inside* that cache so it's
    // preserved on every subsequent x/y/scale/rotate update.
    gsap.set([cursor, dot], { xPercent: -50, yPercent: -50 });

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

      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        setIsVisible(true);
      }
      gsap.set(dot, { x: mouseX, y: mouseY });

      checkBgTheme(mouseX, mouseY);
    };

    // Fast snappy RAF tracking (0.45 lerp for instantaneous feel)
    const render = () => {
      posX += (mouseX - posX) * 0.45;
      posY += (mouseY - posY) * 0.45;

      const pressScale = isPressedRef.current ? 0.86 : 1;
      gsap.set(cursor, { x: posX, y: posY, scale: pressScale });

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
      isVisibleRef.current = false;
      setIsVisible(false);
    };

    // Tactile press feedback: the ring compresses slightly on click,
    // the kind of small detail that reads as "considered" rather than default.
    const onMouseDown = () => {
      isPressedRef.current = true;
      gsap.to(dot, { scale: 0.5, duration: 0.15, ease: 'power2.out' });
    };
    const onMouseUp = () => {
      isPressedRef.current = false;
      gsap.to(dot, { scale: 1, duration: 0.5, ease: 'back.out(2.5)' });
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseover', onMouseOver, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('mousedown', onMouseDown, { passive: true });
    window.addEventListener('mouseup', onMouseUp, { passive: true });

    return () => {
      document.body.classList.remove('custom-cursor-enabled');
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      cancelAnimationFrame(rafId);
    };
    // Runs once on mount. isVisible was previously a dependency here, which
    // meant the whole effect — including posX/posY/mouseX/mouseY — reset to
    // 0 every time visibility flipped (i.e. every mouse enter/leave), making
    // the cursor visibly snap to the top-left corner and fly back in. It's
    // tracked via isVisibleRef above instead so the effect can stay mounted.
  }, []);

  return (
    <>
      {/* Outer Follower Ring — centering is handled entirely by GSAP's
          xPercent/yPercent (set once on mount, above) rather than a CSS
          translate class, since GSAP owns this element's transform every
          frame and would otherwise silently discard a CSS-based center. */}
      <div
        ref={cursorRef}
        className={`hidden lg:flex items-center justify-center text-center pointer-events-none fixed top-0 left-0 z-[100000] rounded-full border transition-[width,height,background-color,border-color,box-shadow,opacity] duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isVisible ? 'opacity-100' : 'opacity-0'
        } ${
          isHovered
            ? cursorText
              ? 'w-16 h-16 bg-[#C5F52A] border-transparent text-[#0A0A0A] shadow-lg'
              : 'w-10 h-10 bg-[#C5F52A]/20 border-[#C5F52A]'
            : `w-6 h-6 bg-transparent ${isDarkBg ? 'border-[#C5F52A]' : 'border-[#0A0A0A]/40'}`
        }`}
      >
        {cursorText && (
          <span className="uppercase tracking-widest text-[10px] font-mono font-bold leading-none text-center select-none text-[#0A0A0A] block">
            {cursorText}
          </span>
        )}
      </div>

      {/* Center Precise Dot — see note above; centered via GSAP xPercent/yPercent */}
      <div
        ref={dotRef}
        className={`hidden lg:block pointer-events-none fixed top-0 left-0 z-[100000] w-2.5 h-2.5 rounded-full transition-[background-color,box-shadow,opacity] duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isDarkBg ? 'bg-[#C5F52A] shadow-[0_0_10px_rgba(197,245,42,0.9)]' : 'bg-[#0A0A0A]'
        } ${isVisible && !cursorText ? 'opacity-100' : 'opacity-0'}`}
      />
    </>
  );
};