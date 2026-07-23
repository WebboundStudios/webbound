'use client';

import React, { useState, useEffect, useRef } from 'react';
import { MagneticButton } from '@/components/animations/MagneticButton';
import { TextRoll } from '@/components/animations/TextRoll';
import { NAV_LINKS } from '@/constants/data';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';

export const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const menuOverlayRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setIsVisible(currentY < 100 || currentY < lastScrollY.current);
      lastScrollY.current = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';

      // Animate menu overlay in
      if (menuOverlayRef.current) {
        gsap.fromTo(
          menuOverlayRef.current,
          { clipPath: 'inset(100% 0 0 0)' },
          { clipPath: 'inset(0% 0 0 0)', duration: 0.6, ease: 'power3.inOut' }
        );
      }

      // Stagger menu items
      if (menuItemsRef.current) {
        const items = menuItemsRef.current.querySelectorAll('.menu-item');
        gsap.fromTo(
          items,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.06, ease: 'power3.out', delay: 0.3 }
        );
      }
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const closeMenu = () => {
    if (menuOverlayRef.current) {
      gsap.to(menuOverlayRef.current, {
        clipPath: 'inset(0 0 100% 0)',
        duration: 0.5,
        ease: 'power3.inOut',
        onComplete: () => setMenuOpen(false),
      });
    } else {
      setMenuOpen(false);
    }
  };

  return (
    <>
      {/* Bottom-Docked Floating Capsule Navbar */}
      <nav
        className={`fixed bottom-5 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
        }`}
      >
        <div className="flex items-center gap-2 bg-[#0A0A0A] rounded-full px-2 py-2 shadow-[0_8px_40px_rgba(0,0,0,0.3)]">
          {/* Menu Toggle */}
          <button
            onClick={() => (menuOpen ? closeMenu() : setMenuOpen(true))}
            className="flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#1a1a1a] hover:bg-[#252525] text-white text-sm font-body-ui font-medium transition-colors"
            aria-label="Toggle Menu"
          >
            {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            <span className="text-xs tracking-wider uppercase">{menuOpen ? 'Close' : 'Menu'}</span>
          </button>

          {/* Center Brand Name */}
          <span className="px-5 text-white font-hero-display text-base font-bold tracking-tight select-none">
            Webbound
          </span>

          {/* CTA Button */}
          <a href="#contact">
            <MagneticButton variant="primary" size="sm" className="whitespace-nowrap">
              <span>Contact Us</span>
            </MagneticButton>
          </a>
        </div>
      </nav>

      {/* Full-Screen Menu Overlay */}
      {menuOpen && (
        <div
          ref={menuOverlayRef}
          className="fixed inset-0 z-40 bg-[#0A0A0A] flex flex-col justify-between p-8 md:p-16 pb-28 sm:pb-32 md:pb-36"
          style={{ clipPath: 'inset(100% 0 0 0)' }}
        >
          {/* Top Row */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-widest text-[#6B7280]">
              NAVIGATION
            </span>
            <span className="text-xs font-mono uppercase tracking-widest text-[#6B7280]">
              WEBBOUND STUDIOS
            </span>
          </div>

          {/* Center Menu Items */}
          <div ref={menuItemsRef} className="flex flex-col items-start gap-2 my-auto max-w-4xl mx-auto w-full">
            {NAV_LINKS.map((link, idx) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="menu-item group flex items-center gap-6 w-full py-3 md:py-4 border-b border-white/5 hover:border-[#C5F52A]/40 transition-colors"
              >
                <span className="text-xs font-mono text-[#6B7280] group-hover:text-[#C5F52A] transition-colors w-8">
                  0{idx + 1}
                </span>
                <TextRoll
                  center
                  className="font-hero-display text-3xl sm:text-5xl md:text-6xl font-bold text-white group-hover:text-[#C5F52A] transition-colors tracking-tight uppercase"
                >
                  {link.label}
                </TextRoll>
                <ArrowUpRight className="w-6 h-6 text-[#6B7280] group-hover:text-[#C5F52A] ml-auto opacity-0 group-hover:opacity-100 transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* Bottom Row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-8 border-t border-white/10">
            <div className="flex flex-col">
              <span className="text-xs text-[#6B7280] font-body-ui">Direct Contact</span>
              <a href="mailto:hello@webboundstudios.com" className="text-sm font-semibold text-white hover:text-[#C5F52A] transition-colors">
                <TextRoll>hello@webboundstudios.com</TextRoll>
              </a>
            </div>
            <div className="flex items-center gap-3 text-xs font-mono text-[#6B7280]">
              <span className="w-2 h-2 rounded-full bg-[#C5F52A] animate-pulse" />
              <span>ACCEPTING NEW PROJECTS</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
