'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const GSAPAnimatedSVG: React.FC<{ className?: string }> = ({ className = '' }) => {
  const containerRef = useRef<SVGSVGElement>(null);
  const ring1Ref = useRef<SVGCircleElement>(null);
  const ring2Ref = useRef<SVGCircleElement>(null);
  const ring3Ref = useRef<SVGCircleElement>(null);
  const path1Ref = useRef<SVGPathElement>(null);
  const path2Ref = useRef<SVGPathElement>(null);

  useEffect(() => {
    const svg = containerRef.current;
    if (!svg) return;

    const ctx = gsap.context(() => {
      // 1. Continuous opposite rotations of SVG rings
      gsap.to(ring1Ref.current, {
        rotation: 360,
        transformOrigin: '50% 50%',
        duration: 25,
        repeat: -1,
        ease: 'none',
      });

      gsap.to(ring2Ref.current, {
        rotation: -360,
        transformOrigin: '50% 50%',
        duration: 18,
        repeat: -1,
        ease: 'none',
      });

      gsap.to(ring3Ref.current, {
        rotation: 360,
        transformOrigin: '50% 50%',
        duration: 32,
        repeat: -1,
        ease: 'none',
      });

      // 2. Stroke drawing animation on paths
      const paths = [path1Ref.current, path2Ref.current];
      paths.forEach((path) => {
        if (!path) return;
        const length = path.getTotalLength();
        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });

        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 3,
          ease: 'power2.inOut',
          repeat: -1,
          yoyo: true,
          repeatDelay: 0.8,
        });
      });

      // 3. Dynamic Morphing SVG Path Loop
      const morphPath = path1Ref.current;
      if (morphPath) {
        const d1 = 'M100 20 L180 100 L100 180 L20 100 Z'; // Diamond
        const d2 = 'M100 10 L190 60 L160 170 L40 170 L10 60 Z'; // Pentagon
        const d3 = 'M100 25 L135 65 L180 75 L145 115 L155 165 L100 135 L45 165 L55 115 L20 75 L65 65 Z'; // Star

        const tl = gsap.timeline({ repeat: -1, yoyo: true });
        tl.to(morphPath, { attr: { d: d2 }, duration: 3, ease: 'sine.inOut' })
          .to(morphPath, { attr: { d: d3 }, duration: 3, ease: 'sine.inOut' })
          .to(morphPath, { attr: { d: d1 }, duration: 3, ease: 'sine.inOut' });
      }
    }, svg);

    return () => ctx.revert();
  }, []);

  return (
    <svg
      ref={containerRef}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-64 h-64 md:w-96 md:h-96 ${className}`}
    >
      <defs>
        <linearGradient id="svg_grad_1" x1="0" y1="0" x2="200" y2="200" gradientUnits="userSpaceOnUse">
          <stop stopColor="#C5F52A" />
          <stop offset="0.5" stopColor="#0A0A0A" />
          <stop offset="1" stopColor="#C5F52A" />
        </linearGradient>
      </defs>

      {/* Outer Dashed Orbiting Ring 1 */}
      <circle
        ref={ring1Ref}
        cx="100"
        cy="100"
        r="90"
        stroke="currentColor"
        strokeOpacity="0.2"
        strokeWidth="1.5"
        strokeDasharray="8 8"
      />

      {/* Middle Orbiting Ring 2 */}
      <circle
        ref={ring2Ref}
        cx="100"
        cy="100"
        r="70"
        stroke="url(#svg_grad_1)"
        strokeWidth="2"
        strokeDasharray="20 10 5 10"
      />

      {/* Inner Orbiting Ring 3 */}
      <circle
        ref={ring3Ref}
        cx="100"
        cy="100"
        r="48"
        stroke="currentColor"
        strokeOpacity="0.3"
        strokeWidth="1"
        strokeDasharray="4 4"
      />

      {/* Dynamic Morphing Geometric Path */}
      <path
        ref={path1Ref}
        d="M100 20 L180 100 L100 180 L20 100 Z"
        stroke="#C5F52A"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Secondary Animated Inner Path */}
      <path
        ref={path2Ref}
        d="M100 40 L160 100 L100 160 L40 100 Z"
        stroke="currentColor"
        strokeOpacity="0.5"
        strokeWidth="1.5"
        strokeDasharray="6 4"
      />

      {/* Center Animated Pulsing Core */}
      <circle cx="100" cy="100" r="5" fill="#C5F52A" className="animate-pulse" />
      <circle cx="100" cy="100" r="14" stroke="#C5F52A" strokeOpacity="0.4" strokeWidth="1" />
    </svg>
  );
};
