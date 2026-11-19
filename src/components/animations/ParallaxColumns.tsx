'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, MotionValue, useScroll, useTransform } from 'framer-motion';

const defaultImages = [
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=800&q=80',
];

export const ParallaxColumns: React.FC<{
  className?: string;
  paused?: boolean;
  scrollContainer?: React.RefObject<HTMLElement | null>;
}> = ({ className = '', paused = false, scrollContainer }) => {
  const galleryRef = useRef<HTMLDivElement>(null);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  const { scrollYProgress } = useScroll({
    container: scrollContainer,
    target: galleryRef,
    offset: ['start end', 'end start'],
  });

  const { height } = dimension;
  const y1 = useTransform(scrollYProgress, [0, 1], [height * 0.18, -height * 0.18]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-height * 0.22, height * 0.22]);
  const y3 = useTransform(scrollYProgress, [0, 1], [height * 0.15, -height * 0.15]);
  const y4 = useTransform(scrollYProgress, [0, 1], [-height * 0.20, height * 0.20]);

  useEffect(() => {
    const resize = () => {
      setDimension({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('resize', resize);
    resize();

    return () => window.removeEventListener('resize', resize);
  }, []);

  return (
    <div
      ref={galleryRef}
      className={`relative flex h-80 sm:h-[420px] md:h-[480px] gap-2 sm:gap-4 overflow-hidden bg-[#0A0A0A] p-2 sm:p-4 rounded-2xl select-none ${className}`}
    >
      <Column images={[defaultImages[0], defaultImages[1], defaultImages[2], defaultImages[3]]} y={paused ? undefined : y1} />
      <Column images={[defaultImages[4], defaultImages[5], defaultImages[6], defaultImages[7]]} y={paused ? undefined : y2} />
      <Column images={[defaultImages[8], defaultImages[9], defaultImages[10], defaultImages[11]]} y={paused ? undefined : y3} />
      <Column images={[defaultImages[12], defaultImages[13], defaultImages[14], defaultImages[15]]} y={paused ? undefined : y4} />
    </div>
  );
};

type ColumnProps = {
  images: string[];
  y?: MotionValue<number>;
};

const Column = ({ images, y }: ColumnProps) => {
  return (
    <motion.div
      className="relative -my-36 flex min-w-0 flex-1 flex-col gap-2.5 sm:-my-52 sm:gap-4 md:-my-64"
      style={{ y }}
    >
      {images.map((src, i) => (
        <div key={i} className="relative min-h-40 w-full flex-1 overflow-hidden rounded-xl border border-white/10 bg-[#252820] shadow-xl sm:min-h-56 md:min-h-64">
          <Image
            src={src}
            alt=""
            fill
            unoptimized
            className="pointer-events-none object-cover"
          />
        </div>
      ))}
    </motion.div>
  );
};
