'use client';

import { useEffect, useId, useRef } from 'react';

type CurvedTextProps = {
  bend?: number;
  fontSize?: number;
  playOnceOnView?: boolean;
  playing?: boolean;
  text?: string;
};

const sampleText = 'Design with purpose · Move with intent';

// Adapted from Aceternity UI's Wispr Flow text animation.
export function CurvedText({
  bend = 72,
  fontSize = 23,
  playOnceOnView = false,
  playing = false,
  text = sampleText,
}: CurvedTextProps) {
  const pathId = useId();
  const svgRef = useRef<SVGSVGElement>(null);
  const animationRef = useRef<SVGAnimateElement>(null);
  const started = useRef(false);
  const path = `M 24 106 C 105 ${106 - bend}, 150 ${106 - bend}, 244 106 S 392 ${106 + bend}, 496 106`;

  useEffect(() => {
    const svg = svgRef.current;
    const animation = animationRef.current;
    if (!svg || !animation) return;

    if (playOnceOnView) {
      if (started.current) return;

      const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.intersectionRatio < 0.6 || preference.matches) return;

        animation.beginElement();
        started.current = true;
        observer.disconnect();
      }, { threshold: 0.6 });

      observer.observe(svg);
      return () => observer.disconnect();
    }

    if (!playing) {
      svg.pauseAnimations();
      return;
    }

    svg.unpauseAnimations();
    if (!started.current) {
      animation.beginElement();
      started.current = true;
    }
  }, [playing, playOnceOnView]);

  return (
    <svg ref={svgRef} viewBox="0 0 520 200" role="img" aria-label={text} className="block h-auto w-full">
      <path id={pathId} d={path} fill="none" stroke="currentColor" strokeDasharray="2 5" strokeOpacity="0.3" />
      <text dy="-7" fill="currentColor" fontSize={fontSize} className="font-section-heading font-bold">
        <textPath href={`#${pathId}`} startOffset="5%">
          {text}
          <animate
            ref={animationRef}
            attributeName="startOffset"
            begin="indefinite"
            dur={playOnceOnView ? '1.6s' : '12s'}
            values={playOnceOnView ? '5%;11%;5%' : '5%;100%;-85%;5%'}
            keyTimes={playOnceOnView ? '0;0.5;1' : '0;0.51;0.51;1'}
            repeatCount={playOnceOnView ? '1' : 'indefinite'}
          />
        </textPath>
      </text>
    </svg>
  );
}
