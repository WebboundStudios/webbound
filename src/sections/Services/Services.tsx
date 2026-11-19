'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Check, Database, Edit3, Layers, Layout, Plus } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextReveal } from '@/components/animations/TextReveal';
import { SERVICES } from '@/constants/data';
import styles from './Services.module.css';

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger);

const serviceIcons = { Layout, Edit3, Layers, Database } as const;
const splitMedia = '(min-width: 1024px) and (min-height: 680px) and (prefers-reduced-motion: no-preference)';

function ServiceCoverArtwork() {
  return (
    <div className={styles.coverArtwork}>
      <p className={`${styles.coverTitle} font-section-heading`}>
        <span>Websites &amp;</span>
        <span>web apps.</span>
      </p>
      <ul className={`${styles.coverIndex} font-body-ui`}>
        {SERVICES.map(({ id, title, iconName }) => {
          const Icon = serviceIcons[iconName as keyof typeof serviceIcons] ?? Layout;

          return (
            <li key={id}>
              <Icon aria-hidden="true" className={styles.coverIcon} strokeWidth={1.65} />
              <span>{title}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function Services() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Timeline | null>(null);

  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const media = gsap.matchMedia();
    media.add(splitMedia, () => {
      const panels = Array.from(stage.querySelectorAll('[data-service-panel]'));
      const faces = stage.querySelectorAll('[data-service-face]');
      const cue = stage.querySelector('[data-service-cue]');
      stage.setAttribute('data-split-active', '');

      const syncScene = (animation: gsap.core.Animation) => {
        stage.toggleAttribute('data-split-started', animation.time() >= 0.035);
        stage.toggleAttribute('data-split-revealed', animation.progress() >= 0.86);
      };

      const timeline = gsap.timeline({
        scrollTrigger: {
          id: 'services-reveal',
          trigger: stage,
          start: 'center center',
          end: () => '+=' + Math.round(window.innerHeight * 1.12),
          pin: true,
          scrub: 0.35,
          invalidateOnRefresh: true,
          onRefresh: ({ animation }) => {
            if (animation) syncScene(animation);
          },
        },
      });
      animationRef.current = timeline;

      timeline
        .to(panels, { x: (index) => (index - (panels.length - 1) / 2) * 17, scale: 0.975, duration: 0.34, ease: 'power2.inOut' }, 0)
        .to(faces, { borderRadius: 14, duration: 0.27, ease: 'power2.out' }, 0.05)
        .to(cue, { opacity: 0, y: 8, duration: 0.16 }, 0.02)
        .to(panels, { rotationY: 180, duration: 0.52, stagger: 0.055, ease: 'power2.inOut' }, 0.27)
        .to(panels, { rotationZ: (index) => (index - (panels.length - 1) / 2) * 1.65, duration: 0.28, ease: 'power2.out' }, 0.49)
        .to(panels, { rotationZ: 0, scale: 1, duration: 0.26, ease: 'power2.inOut' }, 0.95)
        .to({}, { duration: 0.18 });

      timeline.eventCallback('onUpdate', () => syncScene(timeline));
      syncScene(timeline);

      return () => {
        animationRef.current = null;
        stage.removeAttribute('data-split-active');
        stage.removeAttribute('data-split-started');
        stage.removeAttribute('data-split-revealed');
      };
    });

    return () => media.revert();
  }, []);

  function revealOnFocus() {
    const animation = animationRef.current;
    const trigger = animation?.scrollTrigger;
    if (!trigger || stageRef.current?.hasAttribute('data-split-revealed')) return;

    trigger.scroll(trigger.end);
    animation.progress(1);
  }

  function toggleScope(id: string) {
    setExpandedId((current) => (current === id ? null : id));

    if (!animationRef.current && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      requestAnimationFrame(() => ScrollTrigger.refresh(true));
    }
  }

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      data-theme-bg="#F5F3EE"
      className="px-6 py-16 text-[#0A0A0A] sm:py-24 md:px-12 lg:px-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 grid gap-4 md:mb-12 md:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] md:items-end md:gap-10">
          <div id="services-heading">
            <TextReveal
              as="h2"
              className="font-section-heading text-[clamp(2.75rem,6vw,5.5rem)] leading-none font-bold tracking-[-0.045em] [&>div:not(:last-child)]:mr-[0.08em]!"
            >
              What we build
            </TextReveal>
          </div>
          <div>
            <p className="font-body-ui max-w-[38ch] text-base leading-relaxed text-[#4B5563] sm:text-lg">
              See what’s included in each service.
            </p>
            <Link
              href="/services"
              className="group mt-2 inline-flex min-h-10 items-center gap-2 rounded-sm text-sm font-semibold underline decoration-black/30 underline-offset-4 transition-colors hover:text-[#425110] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#536514]"
            >
              Explore website design services
              <ArrowUpRight size={16} aria-hidden="true" className="text-[#536514] transition-transform motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>

        <div ref={stageRef} className={styles.stage} onFocusCapture={revealOnFocus}>
          <div data-service-cover aria-hidden="true" className={styles.cover}>
            <ServiceCoverArtwork />
          </div>
          <div className={`${styles.grid} grid gap-3 sm:gap-4 md:grid-cols-2`}>
            {SERVICES.map((service, index) => {
              const isExpanded = expandedId === service.id;
              const isPortfolio = service.id === 'type-3-multipage-cms';
              const Icon = serviceIcons[service.iconName as keyof typeof serviceIcons] ?? Layout;
              const titleId = `${service.id}-title`;
              const scopeId = `${service.id}-scope`;
              const toggleId = `${service.id}-toggle`;
              const cardColor = isPortfolio ? 'border-white/12 bg-[#141414] text-[#F5F3EE]' : 'border-black/14 bg-[#FFFEFC]';
              const muted = isPortfolio ? 'text-[#C5C6BD]' : 'text-[#4B5563]';
              const divider = isPortfolio ? 'border-white/16' : 'border-black/12';

              return (
                <div key={service.id} data-service-panel className={styles.panel}>
                  <div data-service-face aria-hidden="true" className={styles.face}>
                    <div className={styles.slice} style={{ left: `${index * -100}%` }}>
                      <ServiceCoverArtwork />
                    </div>
                  </div>
                  <article
                    aria-labelledby={titleId}
                    data-scope-open={isExpanded ? '' : undefined}
                    className={`${styles.card} group relative flex min-w-0 flex-col rounded-xl border px-5 pt-5 pb-2 sm:px-7 sm:pt-7 sm:pb-3 lg:px-9 lg:pt-9 ${cardColor}`}
                  >
                    <div className={`${styles.cardMain} flex-1 pb-5 sm:pb-7`}>
                      <div className={`${styles.cardHeader} flex items-start justify-between gap-3 sm:gap-5`}>
                        <h3 id={titleId} className={`${styles.title} font-section-heading max-w-[21ch] text-[clamp(1.75rem,3.1vw,3rem)] leading-[1.03] font-bold tracking-[-0.035em] text-balance`}>
                          {service.title}
                        </h3>
                        <span
                          aria-hidden="true"
                          className={`grid size-10 shrink-0 place-items-center rounded-lg sm:size-12 ${isPortfolio ? 'bg-[#C5F52A] text-[#0A0A0A]' : 'bg-[#EFEEE8] text-[#536514]'}`}
                        >
                          <Icon size={21} strokeWidth={1.7} />
                        </span>
                      </div>
                      <p className={`${styles.description} font-body-ui mt-3 max-w-[46ch] text-base leading-relaxed sm:mt-4 ${muted}`}>
                        {service.description}
                      </p>
                    </div>

                    <div className={`${styles.details} border-t ${divider}`}>
                      <button
                        id={toggleId}
                        type="button"
                        aria-expanded={isExpanded}
                        aria-controls={scopeId}
                        aria-labelledby={`${toggleId} ${titleId}`}
                        data-cursor="Details"
                        onClick={() => toggleScope(service.id)}
                        className={`font-body-ui flex min-h-12 w-full cursor-pointer items-center justify-between gap-3 rounded-md text-left text-sm font-bold ${isExpanded ? '' : 'after:absolute after:inset-0 after:rounded-xl'}`}
                      >
                        {isExpanded ? 'Hide scope' : 'View scope'}
                        <span className={`grid size-8 shrink-0 place-items-center rounded-full border transition-colors group-hover:border-[#C5F52A] group-hover:bg-[#C5F52A] group-hover:text-[#0A0A0A] group-focus-within:border-[#C5F52A] group-focus-within:bg-[#C5F52A] group-focus-within:text-[#0A0A0A] ${isExpanded ? 'border-[#C5F52A] bg-[#C5F52A] text-[#0A0A0A]' : divider}`}>
                          <Plus
                            size={16}
                            aria-hidden="true"
                            className={`transition-transform duration-300 motion-reduce:transition-none ${isExpanded ? 'rotate-45' : ''}`}
                          />
                        </span>
                      </button>
                      <div
                        id={scopeId}
                        aria-hidden={!isExpanded}
                        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out motion-reduce:transition-none ${isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                        onTransitionEnd={(event) => {
                          if (!animationRef.current && event.target === event.currentTarget && event.propertyName === 'grid-template-rows') {
                            ScrollTrigger.refresh(true);
                          }
                        }}
                      >
                        <div className="min-h-0 overflow-hidden">
                          <ul data-lenis-prevent className={`${styles.scopeList} grid gap-x-5 gap-y-2.5 pt-2 pb-5 xl:grid-cols-2 ${muted}`}>
                            {service.deliverables.map((item) => (
                              <li key={item} className="font-body-ui flex items-start gap-2 text-sm leading-snug">
                                <Check size={15} aria-hidden="true" className={`mt-0.5 shrink-0 ${isPortfolio ? 'text-[#C5F52A]' : 'text-[#536514]'}`} />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </article>
                </div>
              );
            })}
          </div>
          <p data-service-cue className={`${styles.cue} font-body-ui text-sm font-semibold text-[#4B5563]`}>Scroll to reveal the services</p>
        </div>
      </div>
    </section>
  );
}
