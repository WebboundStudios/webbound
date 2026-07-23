'use client';

import React, { useEffect, useRef } from 'react';
import { NAV_LINKS, SITE_CONFIG } from '@/constants/data';
import { ArrowUp } from 'lucide-react';
import { TextRoll } from '@/components/animations/TextRoll';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const Footer: React.FC = () => {
  const footerRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const svgWrapperRef = useRef<HTMLDivElement>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const footer = footerRef.current;
    const path = pathRef.current;
    const wrapper = svgWrapperRef.current;
    if (!footer || !path || !wrapper) return;

    // Curved arc initial state path (extending far beyond 100vw viewport screen edges)
    const curvedPath = 'M -350 320 Q 500 -120 1350 320';
    // Flat straight final state path
    const flatPath = 'M 0 140 Q 500 140 1000 140';

    const ctx = gsap.context(() => {
      // Set initial states (oversized 2.4x scale extending past monitor edges)
      gsap.set(path, { attr: { d: curvedPath } });
      gsap.set(wrapper, { scale: 2.4, transformOrigin: 'center center' });

      // Scrubbed scroll animation: reduce curvature to flat & scale down to 1.0 over full footer scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footer,
          start: 'top 50%',
          end: 'bottom 95%',
          scrub: 1,
        },
      });

      tl.to(
        path,
        {
          attr: { d: flatPath },
          ease: 'power1.inOut',
        },
        0
      ).to(
        wrapper,
        {
          scale: 1,
          ease: 'power1.inOut',
        },
        0
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} data-theme-bg="#0A0A0A" className="relative bg-[#0A0A0A] text-white pt-24 pb-12 px-6 md:px-12 lg:px-20 border-t border-white/10 overflow-hidden transition-colors duration-500">
      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start justify-between">
          {/* Brand Info (5 Cols) */}
          <div className="md:col-span-5 space-y-6">
            <span className="font-hero-display text-2xl font-black text-white tracking-tight">
              Webbound<span className="text-[#C5F52A]">.</span>
            </span>
            <p className="font-body-ui text-sm text-[#9CA3AF] font-light leading-relaxed max-w-sm">
              {SITE_CONFIG.description}
            </p>
            <div className="flex items-center gap-3 text-xs font-mono text-white font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#C5F52A] animate-pulse" />
              <span>ACCEPTING SELECT NEW FREELANCE PROJECTS FOR {currentYear}</span>
            </div>
          </div>

          {/* Nav Links Column (4 Cols) */}
          <div className="md:col-span-4 space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-[#9CA3AF] block font-semibold">
              QUICK NAVIGATION
            </span>
            <div className="grid grid-cols-2 gap-3">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-body-ui text-sm text-[#9CA3AF] hover:text-[#C5F52A] transition-colors duration-300 w-fit font-medium"
                >
                  <TextRoll center>{link.label}</TextRoll>
                </a>
              ))}
            </div>
          </div>

          {/* Social Links & Back To Top (3 Cols) */}
          <div className="md:col-span-3 space-y-6 flex flex-col items-start md:items-end">
            <button
              onClick={scrollToTop}
              className="group inline-flex items-center gap-3 px-5 py-3 rounded-full bg-[#141414] border border-white/10 hover:border-[#C5F52A] text-xs font-mono text-white transition-all duration-300 cursor-pointer shadow-sm"
              aria-label="Back to top"
            >
              <span>BACK TO TOP</span>
              <div className="w-6 h-6 rounded-full bg-white/10 text-white flex items-center justify-center group-hover:bg-[#C5F52A] group-hover:text-[#0A0A0A] transition-colors">
                <ArrowUp className="w-3.5 h-3.5" />
              </div>
            </button>

            <div className="flex items-center gap-3">
              {/* GitHub */}
              <a
                href="https://github.com/webboundstudios"
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-full bg-[#141414] border border-white/10 hover:border-[#C5F52A] hover:bg-[#C5F52A] text-white hover:text-[#0A0A0A] transition-all shadow-sm"
                aria-label="GitHub"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>
              {/* Twitter / X */}
              <a
                href="https://twitter.com/webboundstudios"
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-full bg-[#141414] border border-white/10 hover:border-[#C5F52A] hover:bg-[#C5F52A] text-white hover:text-[#0A0A0A] transition-all shadow-sm"
                aria-label="Twitter"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              {/* LinkedIn */}
              <a
                href="https://linkedin.com/company/webboundstudios"
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-full bg-[#141414] border border-white/10 hover:border-[#C5F52A] hover:bg-[#C5F52A] text-white hover:text-[#0A0A0A] transition-all shadow-sm"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Oversized Brand Typography — Curved-to-Flat Scrubbed Scroll Transformation */}
        <div ref={containerRef} className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-visible py-8 sm:py-12 select-none border-t border-white/10">
          <div ref={svgWrapperRef} className="w-full flex items-center justify-center will-change-transform cursor-pointer group" data-cursor="Webbound">
            <svg
              className="w-full h-auto overflow-visible select-none"
              viewBox="0 0 1000 220"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <path id="webbound-footer-curve" ref={pathRef} d="M -350 320 Q 500 -120 1350 320" />
              </defs>
              <text className="font-hero-display font-black tracking-tighter fill-white select-none opacity-95 transition-transform duration-300 group-hover:scale-[1.02]" style={{ fontSize: '135px' }}>
                <textPath href="#webbound-footer-curve" startOffset="50%" textAnchor="middle">
                  WEBBOUND<tspan fill="#C5F52A">.</tspan>
                </textPath>
              </text>
            </svg>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#9CA3AF]">
          <span>
            © {currentYear} {SITE_CONFIG.name}. All Rights Reserved.
          </span>
          <span className="text-[#9CA3AF]">
            Engineered with Next.js 15, React 19 & GSAP Premium.
          </span>
        </div>
      </div>
    </footer>
  );
};
