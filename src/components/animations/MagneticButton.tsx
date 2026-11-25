'use client';

import { useState, type ComponentProps, type MouseEvent } from 'react';
import { Button, ButtonAnchor } from '@/components/ui/Button';
import { useMagnetic } from '@/hooks/useMagnetic';

type MagneticButtonProps = { strength?: number } & (
  | (Omit<ComponentProps<typeof Button>, 'decoration' | 'ref'> & { href?: undefined })
  | Omit<ComponentProps<typeof ButtonAnchor>, 'decoration' | 'ref'>
);

export function MagneticButton({ strength = 0.3, ...props }: MagneticButtonProps) {
  const magneticRef = useMagnetic<HTMLButtonElement | HTMLAnchorElement>(strength);
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  const addRipple = (e: MouseEvent<HTMLElement>) => {
    if (e.detail === 0 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - 1;
    const y = e.clientY - rect.top - 1;
    const newRipple = { x, y, id: performance.now() };

    setRipples((prev) => [...prev, newRipple]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 600);
  };

  const setRef = (element: HTMLAnchorElement | HTMLButtonElement | null) => {
    magneticRef.current = element;
  };
  const decoration = ripples.map((ripple) => (
    <span
      key={ripple.id}
      aria-hidden="true"
      className="pointer-events-none absolute size-[120px] -translate-1/2 animate-ping rounded-full bg-black/10"
      style={{ left: ripple.x, top: ripple.y }}
    />
  ));

  if (props.href !== undefined) {
    const { onClick, ...linkProps } = props;
    return <ButtonAnchor {...linkProps} ref={setRef} decoration={decoration} onClick={(event) => {
      addRipple(event);
      onClick?.(event);
    }} />;
  }

  const { onClick, ...buttonProps } = props;
  return <Button {...buttonProps} ref={setRef} decoration={decoration} onClick={(event) => {
    addRipple(event);
    onClick?.(event);
  }} />;
}
