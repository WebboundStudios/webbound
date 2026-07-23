'use client';

import React, { useRef, useEffect } from 'react';
import { motion, useAnimationFrame, useMotionValue, useTransform, wrap } from 'framer-motion';

interface InfiniteMarqueeProps {
  children: React.ReactNode;
  direction?: 'left' | 'right';
  speed?: 'slow' | 'medium' | 'fast';
  pauseOnHover?: boolean;
  fadeColor?: 'light' | 'dark' | 'none';
  className?: string;
  interactiveScroll?: boolean;
}

export const InfiniteMarquee: React.FC<InfiniteMarqueeProps> = ({
  children,
  direction = 'left',
  speed = 'medium',
  pauseOnHover = true,
  fadeColor = 'light',
  className = '',
  interactiveScroll = true,
}) => {
  const baseX = useMotionValue(0);
  const isHovered = useRef(false);

  // Speed values (percent per frame)
  const speedValues = {
    slow: 0.012,
    medium: 0.025,
    fast: 0.05,
  };

  const baseSpeed = speedValues[speed];

  // 1 = right-to-left (standard for 'left'), -1 = left-to-right (standard for 'right')
  const baseDir = direction === 'left' ? 1 : -1;
  const baseDirRef = useRef<number>(baseDir);
  baseDirRef.current = baseDir;

  const targetDirection = useRef<number>(baseDir);
  const currentDirection = useRef<number>(baseDir);
  const scrollVelocity = useRef<number>(0);

  useEffect(() => {
    if (!interactiveScroll) return;

    let lastScrollY = window.scrollY;
    let lastTime = performance.now();

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const currentTime = performance.now();
      const deltaY = currentScrollY - lastScrollY;
      const deltaTime = Math.max(1, currentTime - lastTime);

      if (Math.abs(deltaY) > 0.5) {
        if (deltaY > 0) {
          // Scrolling DOWN -> normal direction for this row
          targetDirection.current = baseDirRef.current;
        } else {
          // Scrolling UP -> reverse direction for this row
          targetDirection.current = -baseDirRef.current;
        }

        // Add proportional scroll velocity boost
        const v = (deltaY / deltaTime) * 0.02;
        scrollVelocity.current = Math.min(Math.max(v, -0.12), 0.12);
      }

      lastScrollY = currentScrollY;
      lastTime = currentTime;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [interactiveScroll]);

  useAnimationFrame((_, delta) => {
    if (pauseOnHover && isHovered.current) return;

    // Smoothly decay scroll velocity
    scrollVelocity.current *= 0.92;

    // Interpolate direction for realistic momentum easing
    currentDirection.current += (targetDirection.current - currentDirection.current) * 0.08;

    const velocityBoost = Math.abs(scrollVelocity.current);
    const moveStep = (baseSpeed + velocityBoost) * currentDirection.current * (delta / 16.66);

    baseX.set(baseX.get() - moveStep);
  });

  // Seamless wrap between -50% and 0%
  const xTransform = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);

  const fadeGradientClass = {
    light: 'from-[#F5F3EE]',
    dark: 'from-[#0A0A0A]',
    none: 'hidden',
  };

  return (
    <div
      className={`overflow-hidden w-full relative ${className}`}
      onMouseEnter={() => {
        isHovered.current = true;
      }}
      onMouseLeave={() => {
        isHovered.current = false;
      }}
    >
      {/* Gradient edge masks matching section theme */}
      {fadeColor !== 'none' && (
        <>
          <div
            className={`absolute top-0 bottom-0 left-0 w-24 sm:w-44 bg-gradient-to-r ${fadeGradientClass[fadeColor]} to-transparent z-10 pointer-events-none`}
          />
          <div
            className={`absolute top-0 bottom-0 right-0 w-24 sm:w-44 bg-gradient-to-l ${fadeGradientClass[fadeColor]} to-transparent z-10 pointer-events-none`}
          />
        </>
      )}

      <motion.div
        className="flex w-max space-x-6 will-change-transform"
        style={{ x: xTransform }}
      >
        {children}
        {children}
        {children}
        {children}
      </motion.div>
    </div>
  );
};


