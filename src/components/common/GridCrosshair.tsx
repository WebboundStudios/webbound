'use client';

import React from 'react';

interface GridCrosshairProps {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
}

export const GridCrosshair: React.FC<GridCrosshairProps> = ({ position = 'top-left', className = '' }) => {
  const positionClasses = {
    'top-left': 'top-4 left-4',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-right': 'bottom-4 right-4',
  };

  return (
    <div
      className={`absolute ${positionClasses[position]} z-20 pointer-events-none text-white/20 hover:text-[#D4AF37] transition-colors duration-300 ${className}`}
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="7" y1="0" x2="7" y2="14" stroke="currentColor" strokeWidth="1.2" />
        <line x1="0" y1="7" x2="14" y2="7" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    </div>
  );
};
