'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, SplitText);
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
    if (!el) return;

    // Wait until fonts are loaded
    document.fonts.ready.then(() => {
      const split = new SplitText(el, {
        type: type,
        wordsClass: 'inline-block mr-[0.25em] last:mr-0',
      });
      const targets = type === 'chars' ? split.chars : type === 'words' ? split.words : split.lines;

      gsap.fromTo(
        targets,
        {
          opacity: 0,
          y: 40,
          rotateX: -30,
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: duration,
          stagger: stagger,
          delay: delay,
          ease: 'power3.out',
          scrollTrigger: scrollTrigger
            ? {
                trigger: el,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              }
            : undefined,
        }
      );
    });
  }, [type, stagger, delay, duration, scrollTrigger]);

  return (
    <Component ref={containerRef} className={`perspective-1000 ${className}`}>
      {children}
    </Component>
  );
};
