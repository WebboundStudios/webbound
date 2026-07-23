'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const PARTICLE_COORDS = [
  { cx: 160, cy: 100 },
  { cx: 142.43, cy: 142.43 },
  { cx: 100, cy: 160 },
  { cx: 57.57, cy: 142.43 },
  { cx: 40, cy: 100 },
  { cx: 57.57, cy: 57.57 },
  { cx: 100, cy: 40 },
  { cx: 142.43, cy: 57.57 },
];

export const GSAPAnimatedSVG: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<SVGSVGElement>(null);
  const frameRef = useRef<SVGRectElement>(null);
  const wPathRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);
  const ring1Ref = useRef<SVGCircleElement>(null);
  const ring2Ref = useRef<SVGCircleElement>(null);
  const particlesGroupRef = useRef<SVGGElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const svg = containerRef.current;
    const wPath = wPathRef.current;
    const dot = dotRef.current;
    const frame = frameRef.current;
    const ring1 = ring1Ref.current;
    const ring2 = ring2Ref.current;
    const particlesGroup = particlesGroupRef.current;

    if (!svg || !wPath || !dot || !frame) return;

    const ctx = gsap.context(() => {
      const length = wPath.getTotalLength();

      // Continuous ambient rotation on outer tech rings
      gsap.to(ring1, {
        rotation: 360,
        transformOrigin: '50% 50%',
        duration: 24,
        repeat: -1,
        ease: 'none',
      });

      gsap.to(ring2, {
        rotation: -360,
        transformOrigin: '50% 50%',
        duration: 18,
        repeat: -1,
        ease: 'none',
      });

      // Creation - Disruption - Reformation Loop Timeline
      const masterTl = gsap.timeline({ repeat: -1, repeatDelay: 0.8 });

      const particles = particlesGroup?.children ? Array.from(particlesGroup.children) : [];

      masterTl
        // 1. Initial State
        .set(wPath, { strokeDasharray: length, strokeDashoffset: length, opacity: 1 })
        .set(frame, { scale: 0.8, opacity: 0, rotation: -15, transformOrigin: '50% 50%' })
        .set(dot, { scale: 0, opacity: 0, transformOrigin: '50% 50%' })
        .set(particles, { scale: 0.5, x: 0, y: 0, opacity: 0 })

        // 2. Glass Frame & Particles Reveal
        .to(frame, {
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: 1.2,
          ease: 'power3.out',
        })
        .to(
          particles,
          {
            scale: 1,
            opacity: 0.6,
            duration: 0.8,
            stagger: 0.05,
            ease: 'back.out(1.5)',
          },
          '-=0.8'
        )

        // 3. Draw Webbound Logo "W" Stroke
        .to(
          wPath,
          {
            strokeDashoffset: 0,
            duration: 1.8,
            ease: 'power3.inOut',
          },
          '-=0.6'
        )

        // 4. Accent Neon Dot Pop
        .to(
          dot,
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: 'back.out(2)',
          },
          '-=0.3'
        )

        // 5. Glow Hold Pulse
        .to([wPath, dot], {
          filter: 'drop-shadow(0 0 10px rgba(197, 245, 42, 0.8))',
          duration: 1,
          yoyo: true,
          repeat: 1,
        })

        // 6. Hold Formed Logo
        .to({}, { duration: 1.5 })

        // 7. DISRUPT / DISSOLVE LOGO
        .to(
          wPath,
          {
            strokeDashoffset: length,
            opacity: 0,
            duration: 0.9,
            ease: 'power2.in',
          },
          'disrupt'
        )
        .to(
          dot,
          {
            scale: 2,
            opacity: 0,
            duration: 0.6,
            ease: 'power2.in',
          },
          'disrupt'
        )
        .to(
          frame,
          {
            scale: 1.15,
            opacity: 0,
            rotation: 15,
            duration: 0.8,
            ease: 'power3.in',
          },
          'disrupt'
        )
        .to(
          particles,
          {
            x: (i) => Math.cos((i * Math.PI) / 4) * 60,
            y: (i) => Math.sin((i * Math.PI) / 4) * 60,
            opacity: 0,
            scale: 0,
            duration: 0.8,
            ease: 'power3.out',
          },
          'disrupt'
        );
    }, svg);

    return () => ctx.revert();
  }, [mounted]);

  return (
    <svg
      ref={containerRef}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-64 h-64 md:w-96 md:h-96 ${className}`}
      suppressHydrationWarning
    >
      <defs>
        <linearGradient id="webbound_logo_grad" x1="48" y1="68" x2="152" y2="132" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0A0A0A" />
          <stop offset="0.6" stopColor="#0A0A0A" />
          <stop offset="1" stopColor="#C5F52A" />
        </linearGradient>
      </defs>

      {/* Outer Orbiting Ring 1 */}
      <circle
        ref={ring1Ref}
        cx="100"
        cy="100"
        r="92"
        stroke="#0A0A0A"
        strokeOpacity="0.1"
        strokeWidth="1.5"
        strokeDasharray="8 8"
      />

      {/* Inner Orbiting Ring 2 */}
      <circle
        ref={ring2Ref}
        cx="100"
        cy="100"
        r="78"
        stroke="#C5F52A"
        strokeOpacity="0.35"
        strokeWidth="1.5"
        strokeDasharray="18 10 4 10"
      />

      {/* Disruption Floating Particles */}
      <g ref={particlesGroupRef}>
        {PARTICLE_COORDS.map((pt, i) => (
          <circle key={i} cx={pt.cx} cy={pt.cy} r="2.5" fill="#C5F52A" />
        ))}
      </g>

      {/* Wireframe Outline Background Frame */}
      <rect
        ref={frameRef}
        x="36"
        y="36"
        width="128"
        height="128"
        rx="28"
        fill="none"
        stroke="#0A0A0A"
        strokeOpacity="0.15"
        strokeWidth="1.5"
      />

      {/* Webbound Iconic 'W' Stroke Path */}
      <path
        ref={wPathRef}
        d="M48 68 L74 132 L100 82 L126 132 L152 68"
        stroke="url(#webbound_logo_grad)"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Webbound Center Lime Dot */}
      <circle ref={dotRef} cx="100" cy="82" r="7.5" fill="#C5F52A" stroke="#0A0A0A" strokeWidth="1" />
    </svg>
  );
};

