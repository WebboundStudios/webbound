'use client';

import React, { useState } from 'react';
import { useMagnetic } from '@/hooks/useMagnetic';

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  strength = 0.3,
  onClick,
  ...props
}) => {
  const magneticRef = useMagnetic<HTMLButtonElement>(strength);
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newRipple = { x, y, id: Date.now() };

    setRipples((prev) => [...prev, newRipple]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 600);

    if (onClick) onClick(e);
  };

  const baseStyles =
    'relative inline-flex items-center justify-center font-body-ui font-semibold rounded-full overflow-hidden transition-all duration-200 select-none cursor-pointer group active:scale-95';

  const sizeStyles = {
    sm: 'px-5 py-2.5 text-xs tracking-wider uppercase',
    md: 'px-7 py-3.5 text-xs tracking-widest uppercase',
    lg: 'px-9 py-4 text-xs sm:text-sm tracking-widest uppercase',
  };

  const variantStyles = {
    primary:
      'bg-[#C5F52A] text-[#0A0A0A] border border-[#C5F52A] hover:bg-[#B8E625] hover:shadow-[0_0_30px_rgba(197,245,42,0.3)] shadow-sm',
    secondary:
      'bg-[#0A0A0A] text-white border border-[#0A0A0A] hover:bg-[#1a1a1a] shadow-sm',
    outline:
      'bg-transparent text-[#0A0A0A] border border-[#0A0A0A]/20 hover:border-[#0A0A0A] hover:bg-[#0A0A0A]/5',
    dark:
      'bg-[#0A0A0A] text-white border border-white/10 hover:border-[#C5F52A] hover:bg-[#141414]',
  };

  return (
    <button
      ref={magneticRef}
      onClick={handleClick}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {/* Ripple elements */}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute bg-black/10 rounded-full animate-ping pointer-events-none -translate-x-1/2 -translate-y-1/2"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: 120,
            height: 120,
          }}
        />
      ))}

      {/* Button content */}
      <span className="relative z-10 flex items-center gap-2 group-hover:translate-x-0.5 transition-transform duration-200">
        {children}
      </span>
    </button>
  );
};
