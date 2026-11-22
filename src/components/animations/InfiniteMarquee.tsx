'use client';

import React, { useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useTransform, wrap } from 'framer-motion';
import { useMarqueeFrame } from '@/hooks/useMarqueeFrame';

interface InfiniteMarqueeProps {
  children: React.ReactNode;
  direction?: 'left' | 'right';
  speed?: 'slow' | 'medium' | 'fast';
  pauseOnHover?: boolean;
  fadeColor?: 'light' | 'dark' | 'none';
  className?: string;
  interactiveScroll?: boolean;
  paused?: boolean;
}

export const InfiniteMarquee: React.FC<InfiniteMarqueeProps> = ({
  children,
  direction = 'left',
  speed = 'medium',
  pauseOnHover = true,
  fadeColor = 'light',
  className = '',
  interactiveScroll = true,
  paused = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef);
  const baseX = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);

  // Speed values (percent per frame)
  const speedValues = {
    slow: 0.012,
    medium: 0.025,
    fast: 0.05,
  };

  const baseSpeed = speedValues[speed];

  // 1 = right-to-left (standard for 'left'), -1 = left-to-right (standard for 'right')
  const baseDir = direction === 'left' ? 1 : -1;
  const targetDirection = useRef<number>(baseDir);
  const currentDirection = useRef<number>(baseDir);
  const scrollVelocity = useRef<number>(0);

  useMarqueeFrame(isInView && !paused && !(pauseOnHover && isHovered), (delta, scrollDelta) => {
    if (interactiveScroll && Math.abs(scrollDelta) > 0.5) {
      targetDirection.current = scrollDelta > 0 ? baseDir : -baseDir;
      scrollVelocity.current = Math.min(Math.abs(scrollDelta) / Math.max(1, delta) * 0.02, 0.12);
    }

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
      ref={containerRef}
      className={`overflow-hidden w-full relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchCancel={() => setIsHovered(false)}
      onTouchEnd={() => setIsHovered(false)}
    >
      {/* Gradient edge masks matching section theme */}
      {fadeColor !== 'none' && (
        <>
          <div
            className={`absolute top-0 bottom-0 left-0 w-10 sm:w-44 bg-gradient-to-r ${fadeGradientClass[fadeColor]} to-transparent z-10 pointer-events-none`}
          />
          <div
            className={`absolute top-0 bottom-0 right-0 w-10 sm:w-44 bg-gradient-to-l ${fadeGradientClass[fadeColor]} to-transparent z-10 pointer-events-none`}
          />
        </>
      )}

      <motion.div
        className="flex w-max space-x-3 pr-3 will-change-transform sm:space-x-6 sm:pr-6"
        style={{ x: xTransform }}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
};

