'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface LogoProps {
  className?: string;
  symbolOnly?: boolean;
  animated?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = '', symbolOnly = false, animated = true }) => {
  const pathRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    if (!animated || !pathRef.current) return;

    const path = pathRef.current;
    const length = path.getTotalLength();

    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length,
    });

    gsap.to(path, {
      strokeDashoffset: 0,
      duration: 1.8,
      ease: 'power3.out',
      delay: 0.2,
    });

    if (dotRef.current) {
      gsap.fromTo(
        dotRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, delay: 1.5, ease: 'back.out(2)' }
      );
    }
  }, [animated]);

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* GSAP Animated SVG Symbol Mark */}
      <svg
        width="38"
        height="38"
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-9 h-9 transition-transform duration-300 hover:scale-110 cursor-pointer"
      >
        <rect width="44" height="44" rx="10" fill="#0A0A0A" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        <path
          ref={pathRef}
          d="M10 14L16 30L22 17L28 30L34 14"
          stroke="url(#logo_grad_1)"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle ref={dotRef} cx="22" cy="17" r="2.5" fill="#C5F52A" />
        <defs>
          <linearGradient id="logo_grad_1" x1="10" y1="14" x2="34" y2="30" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFFFFF" />
            <stop offset="0.5" stopColor="#C5F52A" />
            <stop offset="1" stopColor="#B8E625" />
          </linearGradient>
        </defs>
      </svg>

      {!symbolOnly && (
        <div className="flex flex-col">
          <span className="font-hero-display text-xl font-bold tracking-tight text-white leading-none">
            WEBBOUND<span className="text-[#C5F52A]">.</span>
          </span>
          <span className="font-body-ui text-[10px] tracking-[0.25em] text-[#9CA3AF] uppercase leading-none mt-1 font-medium">
            STUDIOS
          </span>
        </div>
      )}
    </div>
  );
};
