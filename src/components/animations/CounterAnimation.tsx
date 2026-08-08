'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface CounterAnimationProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  delay?: number;
}

export const CounterAnimation: React.FC<CounterAnimationProps> = ({
  end,
  duration = 2,
  prefix = '',
  suffix = '',
  className = '',
  delay = 0,
}) => {
  const [count, setCount] = useState(0);
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const obj = { val: 0 };
    const tween = gsap.to(obj, {
      val: end,
      duration: duration,
      delay: delay,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        toggleActions: 'play none none none',
      },
      onUpdate: () => {
        setCount(Math.round(obj.val));
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [end, duration, delay]);

  return (
    <span ref={containerRef} className={className}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
};
