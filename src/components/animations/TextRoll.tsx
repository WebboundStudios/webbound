'use client';

import React from 'react';

interface TextRollProps {
  children: string;
  className?: string;
}

export const TextRoll: React.FC<TextRollProps> = ({ children, className = '' }) => {
  return (
    <span
      className={`relative inline-flex flex-col overflow-hidden h-[1.15em] select-none whitespace-nowrap group/roll cursor-pointer leading-none ${className}`}
    >
      {/* Primary White Text Layer */}
      <span className="block whitespace-nowrap transition-transform duration-300 ease-out group-hover/roll:-translate-y-full">
        {children}
      </span>
      {/* Secondary Gold Text Layer (Hidden by overflow-hidden) */}
      <span className="block whitespace-nowrap transition-transform duration-300 ease-out group-hover/roll:-translate-y-full text-[#D4AF37]">
        {children}
      </span>
    </span>
  );
};
