'use client';

import React from 'react';

interface GradientBorderProps {
  children: React.ReactNode;
  className?: string;
}

export const GradientBorder: React.FC<GradientBorderProps> = ({ children, className = '' }) => {
  return (
    <div className={`relative p-[1px] rounded-2xl bg-gradient-to-b from-white/15 via-white/5 to-white/0 hover:from-[#D4AF37]/50 hover:via-white/10 hover:to-[#1F6FEB]/30 transition-all duration-200 group ${className}`}>
      <div className="w-full h-full rounded-[15px] bg-[#101827] relative z-10 overflow-hidden">
        {children}
      </div>
    </div>
  );
};
