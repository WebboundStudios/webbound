import type { ReactNode } from 'react';
import { CustomCursor } from './CustomCursor';
import { Navbar } from './Navbar';
import { Breadcrumbs } from './Breadcrumbs';
import { Footer } from '@/sections/Footer/Footer';

type StudioPageProps = {
  title: string;
  introduction: string;
  breadcrumbs: { name: string; path: string }[];
  children: ReactNode;
};

export function StudioPage({ title, introduction, breadcrumbs, children }: StudioPageProps) {
  return (
    <div className="site-shell min-h-screen bg-[#F5F3EE] text-[#0A0A0A]">
      <CustomCursor />
      <Navbar />
      <main className="mx-auto w-full max-w-7xl px-6 pt-8 pb-20 sm:px-10 sm:pt-12 sm:pb-28 lg:px-16">
        <Breadcrumbs items={breadcrumbs} />
        <header className="mt-9 mb-10 border-b border-black/15 pb-9 sm:mt-14 sm:mb-14 sm:pb-12">
          <h1 className="font-section-heading max-w-[20ch] text-[clamp(2.625rem,6.5vw,6rem)] leading-[0.98] font-extrabold tracking-[-0.045em] text-balance">
            {title}
          </h1>
          <p className="font-body-ui mt-5 max-w-[62ch] text-base leading-relaxed text-[#4B5563] sm:mt-6 sm:text-lg">
            {introduction}
          </p>
        </header>
        {children}
      </main>
      <Footer />
    </div>
  );
}
