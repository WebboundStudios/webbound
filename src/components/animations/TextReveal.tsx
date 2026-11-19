'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(SplitText);
}

interface TextRevealProps {
  children: React.ReactNode;
  as?: React.ElementType;
  className?: string;
  type?: 'chars' | 'words' | 'lines';
  stagger?: number;
  delay?: number;
  duration?: number;
  scrollTrigger?: boolean;
}

export const TextReveal: React.FC<TextRevealProps> = ({
  children,
  as: Component = 'h2',
  className = '',
  type = 'words',
  stagger = 0.04,
  delay = 0,
  duration = 0.9,
  scrollTrigger = true,
}) => {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let cancelled = false;
    let split: SplitText | undefined;
    let tween: gsap.core.Tween | undefined;

    function prepare(target: HTMLElement) {
      void document.fonts.ready.then(() => {
        if (cancelled) return;
        split = new SplitText(target, { type });
        const targets = type === 'chars' ? split.chars : type === 'words' ? split.words : split.lines;

        tween = gsap.from(targets, {
          y: 14,
          rotateX: -15,
          duration,
          stagger,
          delay,
          ease: 'power3.out',
          clearProps: 'transform',
        });
      });
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      prepare(el);
    }, { rootMargin: '0px 0px -12% 0px' });

    if (scrollTrigger) observer.observe(el);
    else prepare(el);

    return () => {
      cancelled = true;
      observer.disconnect();
      tween?.kill();
      split?.revert();
    };
  }, [type, stagger, delay, duration, scrollTrigger]);

  return (
    <Component ref={containerRef} className={`perspective-1000 ${className}`}>
      {children}
    </Component>
  );
};
