'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export interface StaircaseLoaderProps {
  status: 'idle' | 'entering' | 'exiting';
  onEnterComplete?: () => void;
  onExitComplete?: () => void;
  panelCount?: number;
}

export const StaircaseLoader: React.FC<StaircaseLoaderProps> = ({
  status,
  onEnterComplete,
  onExitComplete,
  panelCount = 5,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (status === 'idle') return;

    const ctx = gsap.context(() => {
      const panels = panelsRef.current.filter(Boolean);
      if (!panels.length) return;

      if (status === 'entering') {
        // Ensure container is visible and interactive during cover phase
        if (containerRef.current) {
          containerRef.current.style.pointerEvents = 'auto';
        }

        // Set initial transform state for panels: off-screen bottom
        gsap.set(panels, {
          yPercent: 100,
          transformOrigin: 'bottom center',
        });

        // Animate panels sliding up to cover the screen sequentially
        gsap.to(panels, {
          yPercent: 0,
          duration: 0.65,
          stagger: 0.05,
          ease: 'power4.inOut',
          onComplete: () => {
            if (onEnterComplete) onEnterComplete();
          },
        });
      } else if (status === 'exiting') {
        // Animate panels sliding up and away to reveal detail / grid
        gsap.to(panels, {
          yPercent: -100,
          duration: 0.6,
          stagger: 0.05,
          ease: 'power4.inOut',
          onComplete: () => {
            if (containerRef.current) {
              containerRef.current.style.pointerEvents = 'none';
            }
            if (onExitComplete) onExitComplete();
          },
        });
      }
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [status, onEnterComplete, onExitComplete]);

  if (status === 'idle') return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[99995] pointer-events-auto flex w-full h-full overflow-hidden select-none"
    >
      {Array.from({ length: panelCount }).map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) panelsRef.current[i] = el;
          }}
          className="flex-1 h-full bg-[#0A0A0A] border-r border-white/[0.04] relative staircase-panel"
        >
          {/* Subtle accent glow accentuating the cinematic panels */}
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#C5F52A]/40 to-transparent opacity-60" />
        </div>
      ))}
    </div>
  );
};
