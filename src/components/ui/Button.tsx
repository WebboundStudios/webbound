import Link from 'next/link';
import { ArrowUpRight, Mail } from 'lucide-react';
import type { ComponentPropsWithRef, ReactNode } from 'react';
import { cn } from '@/lib/utils';
import styles from './Button.module.css';

type Appearance = {
  variant?: 'primary' | 'secondary' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  icon?: ReactNode;
  flow?: boolean;
  decoration?: ReactNode;
  children: ReactNode;
};

type ButtonProps = Appearance & ComponentPropsWithRef<'button'>;
type ButtonAnchorProps = Appearance & ComponentPropsWithRef<'a'> & { href: string };
type ButtonLinkProps = Appearance & ComponentPropsWithRef<typeof Link>;

function ButtonContent({ variant, icon, flow, decoration, children }: Appearance) {
  const glyph = icon ?? (variant === 'secondary' ? <Mail strokeWidth={2.2} /> : <ArrowUpRight strokeWidth={2.5} />);

  return (
    <span className={styles.surface} data-flow={Boolean(glyph && flow)}>
      {decoration}
      {glyph && <span className={styles.leading} aria-hidden="true">{glyph}</span>}
      <span className={styles.label}>{children}</span>
      {glyph && flow && <span className={styles.trailing} aria-hidden="true">{glyph}</span>}
    </span>
  );
}

export function Button({
  variant = 'primary', size = 'md', icon, flow = true, decoration, children, className, type = 'button', ...props
}: ButtonProps) {
  return (
    <button type={type} className={cn(styles.button, className)} data-variant={variant} data-size={size} {...props}>
      <ButtonContent variant={variant} icon={icon} flow={flow} decoration={decoration}>{children}</ButtonContent>
    </button>
  );
}

export function ButtonAnchor({
  variant = 'primary', size = 'md', icon, flow = true, decoration, children, className, ...props
}: ButtonAnchorProps) {
  return (
    <a className={cn(styles.button, className)} data-variant={variant} data-size={size} {...props}>
      <ButtonContent variant={variant} icon={icon} flow={flow} decoration={decoration}>{children}</ButtonContent>
    </a>
  );
}

export function ButtonLink({
  variant = 'primary', size = 'md', icon, flow = true, decoration, children, className, ...props
}: ButtonLinkProps) {
  return (
    <Link className={cn(styles.button, className)} data-variant={variant} data-size={size} {...props}>
      <ButtonContent variant={variant} icon={icon} flow={flow} decoration={decoration}>{children}</ButtonContent>
    </Link>
  );
}
