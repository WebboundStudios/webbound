'use client';

import { useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { motion, useScroll, useSpring, useTransform, type MotionValue } from 'framer-motion';

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
      { label: 'Communication', text: 'A shared WhatsApp chat.' },
    ],
  },
];

function FlipCard({ index, progress, enabled, children }: {
  index: number;
  progress: MotionValue<number>;
  enabled: boolean;
  children: ReactNode;
}) {
  const last = benefits.length - 1;
  const transform = useTransform(() => {
    const step = progress.get() * last;
    const entry = index === 0 ? 1 : Math.min(1, Math.max(0, (step - index + 1) / 0.7));
    const exit = index === last ? 0 : Math.min(1, Math.max(0, step - index));
    const depth = (1 - entry) * Math.min(index * 12, 34);
    const scale = 1 - (1 - entry) * Math.min(index * 0.012, 0.035);
    return `translateY(calc(${depth}px - ${exit * 62}% - ${exit * 56}svh)) rotateX(${exit * 22}deg) scale(${scale})`;
  });
  return (
    <motion.article
      aria-labelledby={'why-us-card-' + index}
      className="card-stack__item"
      style={enabled ? { transform, zIndex: benefits.length - index } : undefined}
    >
      {children}
    </motion.article>
  );
}

export function WhyUs() {
  const track = useRef<HTMLDivElement>(null);
  const deck = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const { scrollYProgress } = useScroll({ target: track, offset: ['start start', 'end end'] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 22, mass: 0.8, restDelta: 0.0005 });

  useLayoutEffect(() => {
    const cards = Array.from(deck.current!.children) as HTMLElement[];
    const preference = window.matchMedia('(prefers-reduced-motion: no-preference)');
    function update() {
      const tallest = Math.max(...cards.map(card => card.offsetHeight));
      setEnabled(preference.matches && tallest + 68 <= window.innerHeight);
    }
    update();
    const observer = new ResizeObserver(update);
    cards.forEach(card => observer.observe(card));
    window.addEventListener('resize', update);
    preference.addEventListener('change', update);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', update);
      preference.removeEventListener('change', update);
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

      <div ref={track} className="card-stack-track" data-flip={enabled || undefined} style={{ '--card-count': benefits.length } as CSSProperties}>
        <div className="card-stack-stage px-4 sm:px-8 md:px-12">
        <div ref={deck} className="card-stack">
          {benefits.map(({ label, title, description, details }, index) => (
            <FlipCard key={label} index={index} enabled={enabled} progress={progress}>
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
            </FlipCard>
          ))}
        </div>
        </div>
      </div>
    </section>
  );
}
