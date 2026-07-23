'use client';

import React, { useEffect, useRef, useState } from 'react';
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
  'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=800&q=80',
];

export const ParallaxColumns: React.FC<{ className?: string }> = ({ className = '' }) => {
  const galleryRef = useRef<HTMLDivElement>(null);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  const { scrollYProgress } = useScroll({
    target: galleryRef,
    offset: ['start end', 'end start'],
  });

  const { height } = dimension;
  const y1 = useTransform(scrollYProgress, [0, 1], [0, height * 0.7]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 1.3]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 0.5]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 1.1]);

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
      className={`relative flex h-80 sm:h-[400px] md:h-[450px] gap-[1.5vw] overflow-hidden bg-[#0A0A0A] p-[1.5vw] rounded-2xl select-none ${className}`}
    >
      <Column images={[defaultImages[0], defaultImages[1], defaultImages[2]]} y={y1} />
      <Column images={[defaultImages[3], defaultImages[4], defaultImages[5]]} y={y2} />
      <Column images={[defaultImages[6], defaultImages[7], defaultImages[8]]} y={y3} />
      <Column images={[defaultImages[9], defaultImages[10], defaultImages[11]]} y={y4} />
    </div>
  );
};

type ColumnProps = {
  images: string[];
  y: MotionValue<number>;
};

const Column = ({ images, y }: ColumnProps) => {
  return (
    <motion.div
      className="relative -top-[30%] flex h-full w-1/4 flex-col gap-[1.5vw] first:-top-[30%] [&:nth-child(2)]:-top-[60%] [&:nth-child(3)]:-top-[30%] [&:nth-child(4)]:-top-[50%]"
      style={{ y }}
    >
      {images.map((src, i) => (
        <div key={i} className="relative h-36 sm:h-64 md:h-72 w-full overflow-hidden rounded-xl border border-white/10 shadow-xl shrink-0">
          <img
            src={src}
            alt="Parallax Showcase"
            className="pointer-events-none w-full h-full object-cover"
          />
        </div>
      ))}
    </motion.div>
  );
};
