'use client';

import { motion } from 'framer-motion';
import React from 'react';
import { cn } from '@/lib/utils';

const STAGGER = 0.035;

export const TextRoll: React.FC<{
  children: string;
  className?: string;
  center?: boolean;
}> = ({ children, className, center = false }) => {
  return (
    <motion.span
      initial="initial"
      whileHover="hovered"
      whileTap="hovered"
      className={cn('relative inline-block overflow-hidden cursor-pointer select-none align-middle py-0.5', className)}
      style={{
        lineHeight: 1.05,
      }}
    >
      <div className="inline-flex items-center justify-center">
        {children.split('').map((l, i) => {
          const delay = center
            ? STAGGER * Math.abs(i - (children.length - 1) / 2)
            : STAGGER * i;

          return (
            <motion.span
              variants={{
                initial: {
                  y: 0,
                },
                hovered: {
                  y: '-120%',
                },
              }}
              transition={{
                duration: 0.3,
                ease: [0.33, 1, 0.68, 1],
                delay,
              }}
              className="inline-block"
              key={i}
            >
              {l === ' ' ? '\u00A0' : l}
            </motion.span>
          );
        })}
      </div>
      <div className="absolute inset-0 inline-flex items-center justify-center">
        {children.split('').map((l, i) => {
          const delay = center
            ? STAGGER * Math.abs(i - (children.length - 1) / 2)
            : STAGGER * i;

          return (
            <motion.span
              variants={{
                initial: {
                  y: '120%',
                },
                hovered: {
                  y: 0,
                },
              }}
              transition={{
                duration: 0.3,
                ease: [0.33, 1, 0.68, 1],
                delay,
              }}
              className="inline-block"
              key={i}
            >
              {l === ' ' ? '\u00A0' : l}
            </motion.span>
          );
        })}
      </div>
    </motion.span>
  );
};
