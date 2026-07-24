'use client';

import React, { useRef, useEffect } from 'react';
import { motion, useAnimationFrame, useMotionValue, useTransform, useSpring, wrap } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { SITE_CONFIG } from '@/constants/data';

interface TiltedMarqueeProps {
  text?: string;
  link?: string;
  className?: string;
}

export const TiltedMarquee: React.FC<TiltedMarqueeProps> = ({
  text = SITE_CONFIG.email,
  link = `mailto:${SITE_CONFIG.email}`,
  className = '',
}) => {
  const baseX = useMotionValue(0);
  const targetDir = useRef<number>(1);
  const currentDir = useRef<number>(1);

  // Dynamic spring tilt & arrow rotation physics
  const rawTilt = useMotionValue(-3);
  const tiltDeg = useSpring(rawTilt, { stiffness: 160, damping: 28 });

  const rawArrowRot = useMotionValue(0);
  const arrowRotDeg = useSpring(rawArrowRot, { stiffness: 220, damping: 22 });

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const deltaY = currentScrollY - lastScrollY;

      if (Math.abs(deltaY) > 0.5) {
        if (deltaY > 0) {
          targetDir.current = 1; // Down -> right to left
          rawTilt.set(-3);
          rawArrowRot.set(185);
        } else {
          targetDir.current = -1; // Up -> left to right
          rawTilt.set(3);
          rawArrowRot.set(90);
        }
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [rawTilt, rawArrowRot]);

  useAnimationFrame((_, delta) => {
    currentDir.current += (targetDir.current - currentDir.current) * 0.08;
    const moveStep = 0.05 * currentDir.current * (delta / 16.66);
    baseX.set(baseX.get() - moveStep);
  });

  const xTransform = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);

  const marqueeItems = [1, 2, 3, 4];

  return (
    <div className={`relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-visible py-6 sm:py-10 select-none ${className}`}>
      <a
        href={link}
        data-cursor="Contact"
        className="block relative z-10 group"
      >
        <div className="relative w-full h-[60px] sm:h-[90px] lg:h-[110px] flex items-center justify-center">
          {/* Banner extends 170% width starting from -35% left offset so rotated ends spill past screen edges */}
          <motion.div
            className="absolute left-[-35%] w-[170%] bg-[#C5F52A] text-[#0A0A0A] py-2 sm:py-3.5 flex items-center overflow-hidden shadow-2xl group-hover:bg-white transition-colors duration-300 border-y-2 border-[#0A0A0A]"
            style={{ rotate: tiltDeg }}
          >
            <motion.div
              className="flex w-max items-center gap-[3vw] px-5 will-change-transform"
              style={{ x: xTransform }}
            >
              {marqueeItems.map((_, i) => (
                <div key={i} className="flex items-center shrink-0 gap-[3vw]">
                  <h1 className="font-hero-display lg:text-[5vw] text-3xl sm:text-5xl uppercase font-black tracking-tight leading-none">
                    {text}
                  </h1>
                  <motion.div
                    style={{ rotate: arrowRotDeg }}
                    className="w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 rounded-full bg-[#0A0A0A] text-[#C5F52A] flex items-center justify-center shrink-0 group-hover:bg-[#C5F52A] group-hover:text-[#0A0A0A] transition-colors duration-300 ml-2 shadow-md"
                  >
                    <ArrowUpRight className="w-4 h-4 sm:w-7 sm:h-7 lg:w-9 lg:h-9 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </a>
    </div>
  );
};
