'use client';

import { useState, useEffect, useId, useRef, type MouseEvent } from 'react';
import { MagneticButton } from '@/components/animations/MagneticButton';
import { NAV_LINKS, SITE_CONFIG } from '@/constants/data';
import { Menu, X, ArrowRight, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import styles from './Navbar.module.css';

const menuGroups = [
  { title: 'Studio', links: NAV_LINKS.slice(0, 4) },
  { title: 'Explore', links: NAV_LINKS.slice(4) },
];
const contactHref = '/#contact';
const reducedMotion = '(prefers-reduced-motion: reduce)';

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [currentLocation, setCurrentLocation] = useState('');
  const menuId = useId();
  const lastScrollY = useRef(0);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const paneRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const animationRef = useRef<gsap.core.Timeline | gsap.core.Tween | null>(null);
  const closing = useRef(false);

  useEffect(() => {
    let frame = 0;

    const handleScroll = () => {
      if (frame) return;

      frame = requestAnimationFrame(() => {
        const currentY = window.scrollY;
        const delta = currentY - lastScrollY.current;

        if (currentY < 100) {
          setIsVisible(true);
          lastScrollY.current = currentY;
        } else if (Math.abs(delta) > 10) {
          setIsVisible(delta < 0);
          lastScrollY.current = currentY;
        }

        frame = 0;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    return () => {
      animationRef.current?.kill();
      if (dialog?.open) {
        dialog.close();
        window.dispatchEvent(new CustomEvent('webbound:scroll-lock', { detail: { open: false } }));
      }
    };
  }, []);

  function openMenu() {
    const dialog = dialogRef.current;
    const pane = paneRef.current;
    if (!dialog || !pane || dialog.open) return;

    setCurrentLocation(window.location.pathname + window.location.hash);
    dialog.showModal();
    dialog.scrollTop = 0;
    closeRef.current?.focus({ preventScroll: true });
    setMenuOpen(true);
    window.dispatchEvent(new CustomEvent('webbound:scroll-lock', { detail: { open: true } }));

    const links = pane.querySelectorAll('[data-menu-link]');
    if (window.matchMedia(reducedMotion).matches) {
      gsap.set([pane, ...links], { clearProps: 'clipPath,opacity,transform' });
      return;
    }

    animationRef.current = gsap.timeline()
      .fromTo(pane,
        { clipPath: 'inset(100% 0 0 0)' },
        { clipPath: 'inset(0% 0 0 0)', duration: 0.56, ease: 'power3.inOut', clearProps: 'clipPath' },
      )
      .fromTo(links,
        { y: 14, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.43, stagger: 0.035, ease: 'power3.out', clearProps: 'opacity,transform' },
        0.21,
      );
  }

  function closeMenu(destination?: string) {
    const dialog = dialogRef.current;
    const pane = paneRef.current;
    if (!dialog?.open || !pane || closing.current) return;
    closing.current = true;
    animationRef.current?.kill();

    const finish = () => {
      dialog.close();
      closing.current = false;
      setMenuOpen(false);
      triggerRef.current?.focus({ preventScroll: true });
      window.dispatchEvent(new CustomEvent('webbound:scroll-lock', { detail: { open: false } }));
      if (destination) window.location.assign(destination);
    };

    if (window.matchMedia(reducedMotion).matches) {
      finish();
      return;
    }

    animationRef.current = gsap.to(pane, {
      clipPath: 'inset(0% 0 100% 0)',
      duration: 0.36,
      ease: 'power3.inOut',
      onComplete: finish,
    });
  }

  function followMenuLink(event: MouseEvent<HTMLAnchorElement>) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();

    const { href, hash } = event.currentTarget;
    closeMenu(href !== window.location.href || hash ? href : undefined);
  }

  return (
    <>
      {/* Bottom-Docked Floating Capsule Navbar */}
      <nav
        aria-label="Quick navigation"
        className={`fixed bottom-4 sm:bottom-5 left-1/2 -translate-x-1/2 z-50 transition-all duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)] w-max max-w-[calc(100vw-1.5rem)] motion-reduce:transition-none ${
          isVisible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-12 opacity-0 focus-within:pointer-events-auto focus-within:translate-y-0 focus-within:opacity-100'
        }`}
      >
        <div className="flex items-center justify-between gap-1 sm:gap-1.5 bg-[#11110f]/95 backdrop-blur-xl rounded-full p-1 sm:p-1.5 border border-white/15 shadow-[0_18px_55px_rgba(0,0,0,0.24)] max-w-full">
          {/* Menu Toggle */}
          <button
            ref={triggerRef}
            type="button"
            onClick={openMenu}
            className="flex items-center gap-1.5 sm:gap-2.5 px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-full bg-white/[0.08] hover:bg-white/[0.14] text-white text-xs sm:text-sm font-body-ui font-medium transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-90 shrink-0"
            aria-haspopup="dialog"
            aria-controls={menuId}
            aria-expanded={menuOpen}
          >
            <Menu className="w-3.5 h-3.5 sm:w-4 sm:h-4" aria-hidden="true" />
            <span className="text-[10px] sm:text-xs tracking-wider uppercase">Menu</span>
          </button>

          {/* Center Brand Name */}
          <span className="px-2 sm:px-5 text-white font-hero-display text-xs sm:text-[15px] font-bold tracking-[0.02em] select-none shrink-0 truncate">
            WEBBOUND<span className="text-[#C5F52A]">.</span>
          </span>

          {/* CTA Button */}
          <a href={contactHref} className="shrink-0">
            <MagneticButton variant="primary" size="sm" className="!px-3.5 !py-2 sm:!px-5 sm:!py-2.5 !text-[10px] sm:!text-xs whitespace-nowrap">
              <span>Contact Us</span>
            </MagneticButton>
          </a>
        </div>
      </nav>

      <dialog
        ref={dialogRef}
        id={menuId}
        aria-label="Site menu"
        className={styles.dialog}
        data-lenis-prevent
        onCancel={(event) => {
          event.preventDefault();
          closeMenu();
        }}
      >
        <div ref={paneRef} className={styles.pane}>
          <div className={styles.layout}>
            <div className={styles.header}>
              <a href="/" aria-label="Webbound home" onClick={followMenuLink} className={styles.wordmark}>
                WEBBOUND<span>.</span>
              </a>
              <button ref={closeRef} type="button" onClick={() => closeMenu()} className={styles.close}>
                Close <X size={17} aria-hidden="true" />
              </button>
            </div>

            <nav aria-label="Main navigation" className={styles.navigation}>
              {menuGroups.map(({ title, links }, groupIndex) => (
                <div key={title} className={groupIndex === 0 ? styles.primary : styles.secondary}>
                  <h2 className={styles.groupTitle}>{title}</h2>
                  <ul>
                    {links.map((link) => (
                      <li key={link.href}>
                        <a
                          href={link.href}
                          onClick={followMenuLink}
                          aria-current={currentLocation === link.href ? (link.href.includes('#') ? 'location' : 'page') : undefined}
                          className={styles.link}
                          data-menu-link
                        >
                          <span>{link.label}</span>
                          <ArrowRight aria-hidden="true" className={styles.arrow} />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>

            <div className={styles.contact}>
              <a href={`mailto:${SITE_CONFIG.email}`} className={styles.email}>{SITE_CONFIG.email}</a>
              <a href={contactHref} onClick={followMenuLink} className={styles.inquiry}>
                Start a project <ArrowUpRight size={17} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
