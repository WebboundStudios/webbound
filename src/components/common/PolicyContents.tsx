'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useEffect, useRef, useState, type ReactNode } from 'react';

type PolicyContentsProps = {
  sections: { id: string; title: string }[];
  children: ReactNode;
};

export function PolicyContents({ sections, children }: PolicyContentsProps) {
  const articleRef = useRef<HTMLElement>(null);
  const [activeId, setActiveId] = useState(sections[0]?.id);

  useEffect(() => {
    const article = articleRef.current;
    const targets = article?.querySelectorAll<HTMLElement>('[data-policy-section]');
    if (!article || !targets?.length) return;

    let frame = 0;
    const updateActiveSection = () => {
      frame = 0;
      const threshold = Number.parseFloat(getComputedStyle(targets[0]).scrollMarginTop) + 2;
      let current = targets[0].id;
      for (const target of targets) {
        if (target.getBoundingClientRect().top > threshold) break;
        current = target.id;
      }
      setActiveId(current);
    };
    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateActiveSection);
    };

    const observer = new ResizeObserver(scheduleUpdate);
    observer.observe(article);
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    scheduleUpdate();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      window.cancelAnimationFrame(frame);
    };
  }, [sections]);

  return (
    <div className="grid items-start gap-8 md:grid-cols-[minmax(11rem,15rem)_minmax(0,1fr)] lg:gap-14">
      <aside className="md:sticky md:top-8">
        <nav aria-labelledby="policy-contents-heading" className="rounded-xl border border-black/12 bg-[#FFFEFB] p-4 md:rounded-none md:border-0 md:bg-transparent md:p-0">
          <h2 id="policy-contents-heading" className="mb-2 text-xs font-bold tracking-[0.15em] text-[#4B5563] uppercase md:mb-3 md:pl-4">Table of contents</h2>
          <ul className="grid sm:grid-cols-2 md:grid-cols-1 md:border-l md:border-black/15">
            {sections.map(({ id, title }) => (
              <li key={id}>
                <a href={`#${id}`} aria-current={activeId === id ? 'location' : undefined} className="relative flex min-h-10 items-center py-2 text-sm leading-snug text-[#41473C] hover:text-brand-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#405211] aria-[current=location]:font-bold aria-[current=location]:text-[#405211] md:pl-4 md:before:absolute md:before:inset-y-2 md:before:-left-0.5 md:before:w-1 md:before:rounded-full md:before:content-[''] md:aria-[current=location]:before:bg-brand-accent">
                  {title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-7 hidden rounded-xl border border-black/12 bg-[#FFFEFB] p-4 md:block">
          <p className="text-sm font-bold">Questions about this policy?</p>
          <Link href="/#contact" className="mt-1 inline-flex min-h-9 items-center gap-1.5 text-sm font-semibold text-[#405211] underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2">
            Contact Webbound <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>
      </aside>

      <article ref={articleRef} className="grid min-w-0 max-w-[68ch] gap-10 md:gap-12">
        {children}
      </article>
    </div>
  );
}
