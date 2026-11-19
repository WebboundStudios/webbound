'use client';

import React, { useRef, useEffect, useState, useSyncExternalStore } from 'react';
import { motion, useAnimationFrame, useMotionValue, useTransform, useSpring, wrap } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { SITE_CONFIG } from '@/constants/data';

const reducedMotionQuery = '(prefers-reduced-motion: reduce)';

function subscribeToReducedMotion(onChange: () => void) {
  const preference = window.matchMedia(reducedMotionQuery);
  preference.addEventListener('change', onChange);
  return () => preference.removeEventListener('change', onChange);
}

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
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const prefersReducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    () => window.matchMedia(reducedMotionQuery).matches,
    () => false,
  );

  const baseX = useMotionValue(0);
  const targetDir = useRef<number>(1);
  const currentDir = useRef<number>(1);

  // Dynamic spring tilt & arrow rotation physics
  const rawTilt = useMotionValue(-3);
  const tiltDeg = useSpring(rawTilt, { stiffness: 160, damping: 28 });

  const rawArrowRot = useMotionValue(0);
  const arrowRotDeg = useSpring(rawArrowRot, { stiffness: 220, damping: 22 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { rootMargin: '150px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView || prefersReducedMotion) return;

    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
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
        ticking = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isInView, prefersReducedMotion, rawTilt, rawArrowRot]);

  useAnimationFrame((_, delta) => {
    if (!isInView || prefersReducedMotion) return;
    currentDir.current += (targetDir.current - currentDir.current) * 0.08;
    const moveStep = 0.05 * currentDir.current * (delta / 16.66);
    baseX.set(baseX.get() - moveStep);
  });

  const xTransform = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);

  const marqueeItems = [1, 2, 3, 4];
  const atIndex = text.indexOf('@');
  const label = atIndex < 0 ? text : (
    <>
      {text.slice(0, atIndex)}<span className="text-[#C5F52A]">@</span>{text.slice(atIndex + 1)}
    </>
  );

  return (
    <div ref={containerRef} className={`relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-visible py-6 sm:py-10 select-none ${className}`}>
      <a
        href={link}
        aria-label={text}
        data-cursor="Contact"
        className="block relative z-10 group"
      >
        <div aria-hidden="true" className="relative flex h-[clamp(3.75rem,8.5vw,8rem)] w-full items-center justify-center">
          {/* Banner extends 170% width starting from -35% left offset so rotated ends spill past screen edges */}
          <motion.div
            className="absolute left-[-35%] flex w-[170%] items-center overflow-hidden bg-[#0A0A0A] py-[clamp(0.75rem,1.45vw,1.75rem)] text-[#F5F3EE] shadow-lg will-change-transform motion-reduce:transform-none!"
            style={{ rotate: tiltDeg }}
          >
            <motion.div
              className="flex w-max items-center will-change-transform motion-reduce:w-full motion-reduce:transform-none! motion-reduce:justify-center"
              style={{ x: xTransform }}
            >
              {/* Include the trailing space in each repeat so the two track halves match. */}
              {marqueeItems.map((item) => (
                <div
                  key={item}
                  className={`flex min-w-[70vw] shrink-0 items-center justify-between gap-[clamp(0.875rem,2.4vw,3rem)] pr-[clamp(0.875rem,2.4vw,3rem)] motion-reduce:min-w-0 motion-reduce:pr-0 ${item === 1 ? '' : 'motion-reduce:hidden'}`}
                >
                  <span className="font-section-heading text-[clamp(1.125rem,5.4vw,6.5rem)] leading-[1.05] font-extrabold tracking-[-0.045em] whitespace-nowrap">
                    {label}
                  </span>
                  <motion.div
                    style={{ rotate: arrowRotDeg }}
                    className="flex size-[clamp(1.75rem,3.65vw,4.25rem)] shrink-0 items-center justify-center rounded-full bg-[#C5F52A] text-[#0A0A0A] transition-colors duration-300 ease-out group-hover:bg-[#DCF974] group-focus-visible:bg-[#DCF974] motion-reduce:transform-none!"
                  >
                    <ArrowUpRight className="size-1/2 transition-transform duration-300 ease-out motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5 motion-safe:group-focus-visible:translate-x-0.5 motion-safe:group-focus-visible:-translate-y-0.5 motion-safe:group-active:scale-90" />
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
