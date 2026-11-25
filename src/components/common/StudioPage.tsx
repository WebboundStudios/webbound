import type { ReactNode } from 'react';
import { CustomCursor } from './CustomCursor';
import { Navbar } from './Navbar';
import { Breadcrumbs } from './Breadcrumbs';
import { Footer } from '@/sections/Footer/Footer';
import { TextReveal } from '@/components/animations/TextReveal';

type StudioPageProps = {
  title: string;
  introduction: ReactNode;
  breadcrumbs: { name: string; path: string }[];
  children: ReactNode;
  indexPage?: boolean;
};

export function StudioPage({ title, introduction, breadcrumbs, children, indexPage }: StudioPageProps) {
  return (
    <div className="site-shell min-h-screen bg-[#F5F3EE] text-[#0A0A0A]">
      <CustomCursor />
      <Navbar />
      <main className="mx-auto w-full max-w-7xl px-6 pt-8 pb-20 sm:px-10 sm:pt-12 sm:pb-28 lg:px-16">
        <Breadcrumbs items={breadcrumbs} />
        {indexPage ? (
          <header className="my-9 grid items-end gap-5 border-b border-black/20 pb-8 sm:my-12 lg:grid-cols-[1.25fr_0.75fr] lg:gap-12">
            <TextReveal as="h1" className="font-hero-display max-w-[14ch] text-[clamp(3rem,6.5vw,6.5rem)] leading-[0.98] font-semibold tracking-[-0.06em]">{title}</TextReveal>
            <p className="font-body-ui max-w-[44ch] leading-relaxed text-[#50554c] sm:text-lg">{introduction}</p>
          </header>
        ) : <header className="mt-9 mb-10 border-b border-black/15 pb-9 sm:mt-14 sm:mb-14 sm:pb-12">
          <h1 className="font-section-heading max-w-[20ch] text-[clamp(2.625rem,6.5vw,6rem)] leading-[0.98] font-extrabold tracking-[-0.045em] text-balance">
            {title}
          </h1>
          <p className="font-body-ui mt-5 max-w-[62ch] text-base leading-relaxed text-[#4B5563] sm:mt-6 sm:text-lg">
            {introduction}
          </p>
        </header>}
        {children}
      </main>
      <Footer />
    </div>
  );
}
