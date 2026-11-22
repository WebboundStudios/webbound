'use client';

import { useEffect, useRef } from 'react';
import { ArrowUp, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { NAV_LINKS, SITE_CONFIG } from '@/constants/data';
import styles from './Footer.module.css';

const curvedWordmarkPath = 'M -350 320 Q 500 -120 1350 320';
const flatWordmarkPath = 'M 0 140 Q 500 140 1000 140';
const initialWordmarkScale = 1.85;
const reducedMotionQuery = '(prefers-reduced-motion: reduce)';

const socialLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com/webboundstudios',
    icon: 'M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z',
  },
  {
    label: 'X',
    href: 'https://twitter.com/webboundstudios',
    icon: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/company/webboundstudios',
    icon: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z',
  },
];

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const footer = footerRef.current;
    const stage = stageRef.current;
    const path = pathRef.current;
    const wordmark = wordmarkRef.current;
    if (!footer || !stage || !path || !wordmark) return;

    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const timeline = gsap.timeline({ paused: true });

      timeline
        .fromTo(path, { attr: { d: curvedWordmarkPath } }, { attr: { d: flatWordmarkPath }, ease: 'power1.out' }, 0)
        .fromTo(wordmark, { scale: initialWordmarkScale, transformOrigin: 'center bottom' }, { scale: 1, ease: 'power1.out', force3D: true }, 0);

      // Pinned sections above the footer can change its document offset after load.
      // Measure in viewport coordinates while the footer is visible.
      const update = (_time: number, deltaMs: number) => {
        const bounds = stage.getBoundingClientRect();
        const inset = Math.max(0, (bounds.height - wordmark.offsetHeight * initialWordmarkScale) / 2);
        const start = bounds.top + inset;
        const bottom = footer.getBoundingClientRect().bottom;
        const distance = Math.max(1, bottom - start);
        const target = bottom <= window.innerHeight + 1 ? 1 :
          gsap.utils.clamp(0, 1, (window.innerHeight - start) / distance);
        const remaining = target - timeline.progress();
        if (remaining === 0) return;
        timeline.progress(Math.abs(remaining) < 0.001 ? target :
          target - remaining * Math.exp(-Math.min(deltaMs, 64) / 95));
      };
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          gsap.ticker.add(update);
        } else {
          gsap.ticker.remove(update);
          timeline.progress(entry.boundingClientRect.bottom <= 0 ? 1 : 0);
        }
      });
      observer.observe(footer);

      return () => {
        observer.disconnect();
        gsap.ticker.remove(update);
      };
    });

    media.add(reducedMotionQuery, () => {
      gsap.set(path, { attr: { d: flatWordmarkPath } });
    });

    return () => media.revert();
  }, []);

  function scrollToTop() {
    const behavior = window.matchMedia(reducedMotionQuery).matches ? 'auto' : 'smooth';
    window.scrollTo({ top: 0, behavior });
  }

  return (
    <footer ref={footerRef} data-theme-bg="#0A0A0A" className={`${styles.footer} flex min-h-dvh flex-col border-t border-white/12 bg-[#0A0A0A] text-white`}>
      <div className={`${styles.main} px-6 pt-7 pb-5 sm:pt-11 sm:pb-8 md:px-12 lg:px-20 lg:pt-14 lg:pb-10`}>
        <div className={`${styles.columns} mx-auto grid max-w-7xl gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)_auto] lg:gap-x-12`}>
          <div className={`${styles.brand} sm:col-span-2 lg:col-span-1`}>
            <p className="font-hero-display text-2xl leading-none font-bold sm:text-3xl">
              Webbound<span className="text-[#C5F52A]">.</span>
            </p>
            <p className="font-body-ui mt-2 max-w-[36ch] text-sm leading-relaxed text-[#BDBDB7] sm:mt-4">
              {SITE_CONFIG.description}
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <h2 className={`${styles.heading} font-section-heading mb-1.5 text-sm font-bold sm:mb-3`}>Explore</h2>
            <ul className={`${styles.navLinks} grid grid-cols-3 gap-x-3 gap-y-0.5 sm:grid-cols-2 sm:gap-y-1`}>
              {NAV_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    className={`${styles.navLink} font-body-ui inline-flex min-h-7 items-center text-sm text-[#BDBDB7] underline-offset-4 transition-colors hover:text-[#C5F52A] hover:underline focus-visible:text-[#C5F52A]`}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className={`${styles.heading} font-section-heading mb-2 hidden text-sm font-bold sm:block`}>Contact</h2>
            <div className="flex flex-wrap items-center justify-between gap-x-5 gap-y-2 sm:flex-col sm:items-start sm:gap-y-4">
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="group font-section-heading inline-flex min-h-8 items-center gap-1.5 text-base font-bold underline decoration-white/35 underline-offset-4 transition-colors hover:text-[#C5F52A] sm:text-lg"
              >
                {SITE_CONFIG.email}
                <ArrowUpRight size={16} aria-hidden="true" className="shrink-0 text-[#C5F52A] transition-transform motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5" />
              </a>
              <ul aria-label="Social links" className="flex items-center gap-2">
                {socialLinks.map(({ label, href, icon }) => (
                  <li key={href}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={label}
                      className="inline-flex size-9 items-center justify-center rounded-full border border-white/22 text-white transition-colors hover:border-[#C5F52A] hover:bg-[#C5F52A] hover:text-[#0A0A0A]"
                    >
                      <svg aria-hidden="true" className="size-3.5 fill-current" viewBox="0 0 24 24">
                        <path d={icon} />
                      </svg>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div ref={stageRef} aria-hidden="true" className={`${styles.stage} flex flex-1 flex-col justify-center overflow-hidden border-t border-white/12 pt-[clamp(0.75rem,2.8vw,3rem)]`}>
        <div
          ref={wordmarkRef}
          className={`${styles.wordmark} mx-auto w-full select-none will-change-transform`}
        >
          <svg className="block h-auto w-full overflow-visible" viewBox="0 0 1000 220" preserveAspectRatio="xMidYMid meet">
            <defs>
              <path id="webbound-footer-curve" ref={pathRef} d={curvedWordmarkPath} />
            </defs>
            <text className="font-hero-display fill-white font-black tracking-tighter opacity-95" style={{ fontSize: '152px' }}>
              <textPath href="#webbound-footer-curve" startOffset="50%" textAnchor="middle">
                WEBBOUND<tspan fill="#C5F52A">.</tspan>
              </textPath>
            </text>
          </svg>
        </div>
      </div>

      <div className={`${styles.legal} border-t border-white/12 px-6 pt-2 pb-20 sm:pt-3 sm:pb-24 md:px-12 lg:px-20`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <p suppressHydrationWarning className="font-body-ui text-xs text-[#BDBDB7]">
            © {currentYear} {SITE_CONFIG.name}.
          </p>
          <button
            type="button"
            onClick={scrollToTop}
            className="group font-body-ui inline-flex min-h-11 shrink-0 cursor-pointer items-center gap-2 rounded-full py-1 pl-3 text-sm font-semibold text-white transition-colors hover:text-[#C5F52A]"
          >
            Back to top
            <span className="flex size-8 items-center justify-center rounded-full border border-white/22 transition-colors group-hover:border-[#C5F52A] group-hover:bg-[#C5F52A] group-hover:text-[#0A0A0A]">
              <ArrowUp size={15} aria-hidden="true" className="transition-transform motion-safe:group-hover:-translate-y-0.5" />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
