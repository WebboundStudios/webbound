'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger);

const benefits = [
  {
    label: 'Delivery',
    title: '7–14 business days',
    description: 'That’s the usual turnaround for a custom website. We agree on your scope and launch date before work starts.',
    details: [
      { label: 'Before the build', text: 'Agree on the site structure and review the design together.' },
      { label: 'Before launch', text: 'Try the site on a staging link and give feedback.' },
    ],
  },
  {
    label: 'Aftercare',
    title: 'A year of support',
    description: 'Every website includes a year of technical maintenance and small content updates.',
    details: [
      { label: 'Content updates', text: 'Copy edits, image swaps, and project uploads.' },
      { label: 'Technical care', text: 'Dependency updates and uptime monitoring.' },
    ],
  },
  {
    label: 'Development',
    title: 'Built for your content',
    description: 'I design the layout around the work you need to show and build it as custom components.',
    details: [
      { label: 'Publishing', text: 'A CMS can let your team add projects and edit pages.' },
      { label: 'Motion', text: 'Transitions designed around your galleries and navigation.' },
    ],
  },
  {
    label: 'Performance',
    title: 'Tested on real devices',
    description: 'I check the site across screen sizes and connection speeds before it goes live.',
    details: [
      { label: 'Images', text: 'Responsive image sizes and compressed files.' },
      { label: 'Page speed', text: 'Core Web Vitals checks and a review for layout shifts.' },
    ],
  },
  {
    label: 'Collaboration',
    title: 'Work directly with me',
    description: 'The same person designs and builds your site. You can ask me about decisions as the work takes shape.',
    details: [
      { label: 'Design reviews', text: 'Figma and a live staging link for feedback.' },
      { label: 'Communication', text: 'A shared Slack or WhatsApp channel.' },
    ],
  },
];

export function WhyUs() {
  const sceneRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const scene = sceneRef.current;
    const spacer = scene?.parentElement;
    const stack = scene?.querySelector<HTMLElement>('.card-stack');
    if (!scene || !spacer || !stack) return;

    const cards = Array.from(stack.querySelectorAll<HTMLElement>('.card-stack__item'));
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let context: gsap.Context | null = null;
    let frame = 0;

    const reset = () => {
      context?.revert();
      context = null;
      cards.forEach((card) => card.style.removeProperty('transform'));
      scene.removeAttribute('data-stack-pinned');
    };

    const update = () => {
      const wasPinned = !!context;
      if (reducedMotion.matches) {
        reset();
        if (wasPinned) ScrollTrigger.refresh();
        return;
      }

      scene.setAttribute('data-stack-pinned', '');
      const style = getComputedStyle(scene);
      const contentHeight = stack.offsetHeight + parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);

      if (contentHeight > window.innerHeight + 1) {
        reset();
        if (wasPinned) ScrollTrigger.refresh();
        return;
      }

      if (!context) {
        context = gsap.context(() => {
          const peek = () => gsap.utils.clamp(8, window.innerWidth < 768 ? 10 : 14, window.innerHeight * 0.015);
          const timeline = gsap.timeline({
            defaults: { duration: 0.76, ease: 'power1.inOut' },
            scrollTrigger: {
              id: 'why-us-stack',
              trigger: scene,
              start: 'top top',
              end: () => '+=' + Math.round((cards.length - 1) * Math.max(320, window.innerHeight * 0.72)),
              pin: true,
              pinSpacer: spacer,
              pinSpacing: true,
              scrub: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          cards.slice(1).forEach((card, index) => {
            const position = index + 0.24;
            timeline.fromTo(card, { y: () => window.innerHeight }, { y: 0, immediateRender: true }, position);

            cards.slice(0, index + 1).forEach((previous, previousIndex) => {
              const depth = index + 1 - previousIndex;
              timeline.to(previous, { y: () => -depth * peek(), scale: 1 - depth * 0.025 }, position);
            });
          });

          // Reserve scroll distance for the final card once the stack settles.
          timeline.to({}, { duration: 0.28 });
        }, scene);
      }
      ScrollTrigger.refresh();
    };

    const schedule = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        update();
      });
    };
    const observer = new ResizeObserver(schedule);
    observer.observe(stack);
    window.addEventListener('resize', schedule);
    reducedMotion.addEventListener('change', update);
    update();

    return () => {
      window.removeEventListener('resize', schedule);
      reducedMotion.removeEventListener('change', update);
      observer.disconnect();
      cancelAnimationFrame(frame);
      reset();
    };
  }, []);

  return (
    <section id="why-us" aria-labelledby="why-us-heading" data-theme-bg="#F5F3EE" className="relative bg-[#F5F3EE] pt-24 text-[#0A0A0A]">
      <div className="mx-auto mb-9 max-w-7xl px-4 text-center sm:mb-12 sm:px-8 md:px-12">
        <p className="font-body-ui mb-4 text-sm font-medium text-[#4B5563]">Why Webbound</p>
        <h2
          id="why-us-heading"
          className="font-section-heading mx-auto max-w-4xl text-4xl leading-tight font-bold tracking-[-0.035em] text-balance sm:text-5xl lg:text-6xl"
        >
          What it’s like to work together
        </h2>
      </div>

      <div>
        <div ref={sceneRef} className="card-stack-scene bg-[#F5F3EE] px-4 pb-24 sm:px-8 md:px-12">
          <div className="card-stack">
            {benefits.map(({ label, title, description, details }, index) => (
              <article key={label} aria-labelledby={'why-us-card-' + index} className="card-stack__item">
                <header className="font-body-ui flex items-center justify-between gap-4 border-b border-black/15 pb-3.5 text-sm font-semibold sm:pb-5">
                  <span>{label}</span>
                  <span className="text-xs font-medium tabular-nums opacity-70" aria-label={'Card ' + (index + 1) + ' of ' + benefits.length}>
                    {String(index + 1).padStart(2, '0')} / {String(benefits.length).padStart(2, '0')}
                  </span>
                </header>

                <div className="grid flex-1 content-center gap-5 sm:gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-end lg:gap-12">
                  <div>
                    <h3 id={'why-us-card-' + index} className="card-stack__item-h text-balance">{title}</h3>
                    <p className="font-body-ui mt-3 max-w-[40ch] text-sm leading-relaxed opacity-85 sm:mt-4 sm:text-base lg:text-lg">{description}</p>
                  </div>

                  <dl className="font-body-ui divide-y divide-black/15 border-t border-black/15 text-sm">
                    {details.map((detail) => (
                      <div key={detail.label} className="grid gap-1 py-2.5 sm:grid-cols-[minmax(7rem,1fr)_2fr] sm:gap-3 sm:py-3.5">
                        <dt className="font-semibold">{detail.label}</dt>
                        <dd className="max-w-[36ch] leading-normal opacity-85">{detail.text}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
