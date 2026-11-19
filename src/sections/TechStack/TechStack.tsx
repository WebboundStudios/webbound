'use client';

import { useState } from 'react';
import Image from 'next/image';
import { TECH_STACK } from '@/constants/data';
import { TextReveal } from '@/components/animations/TextReveal';
import { InfiniteMarquee } from '@/components/animations/InfiniteMarquee';
import type { TechItem } from '@/types';

const toolPresentation: Record<string, { logo: string; mark: string; usage: string }> = {
  nextjs: {
    logo: 'https://www.svgrepo.com/show/354113/nextjs-icon.svg',
    mark: 'N',
    usage: 'Routing and server rendering',
  },
  react: {
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1280px-React-icon.svg.png?_=20220125121207',
    mark: 'R',
    usage: 'Reusable interfaces',
  },
  typescript: {
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1280px-Typescript_logo_2020.svg.png?_=20221110153201',
    mark: 'TS',
    usage: 'Typed JavaScript',
  },
  tailwind: {
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/960px-Tailwind_CSS_Logo.svg.png',
    mark: 'TW',
    usage: 'Responsive styling',
  },
  gsap: {
    logo: 'https://gsap.com/community/uploads/monthly_2020_03/tweenmax.png.cf27916e926fbb328ff214f66b4c8429.png',
    mark: 'GSAP',
    usage: 'Timelines and scroll animation',
  },
  framer: {
    logo: 'https://assets.streamlinehq.com/image/private/w_300,h_300,ar_1/f_auto/v1/icons/vector-icons/brand-framer-motion-pk1mas1m7u9hi06fqzq77f.png/brand-framer-motion-nuunolaqtcs7zlblwkjs.png?_a=DATAiZkSZAA0',
    mark: 'FM',
    usage: 'Gestures and transitions',
  },
  lenis: {
    logo: 'https://raw.githubusercontent.com/nuxt/modules/674149075378ae7d27f3df6d906eff088539a845/icons/nuxt3-lenis.svg',
    mark: 'L',
    usage: 'Smooth scrolling',
  },
  three: {
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/WebGL_Logo.svg/1280px-WebGL_Logo.svg.png?_=20210505165026',
    mark: 'GL',
    usage: 'Custom browser graphics',
  },
  zustand: {
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpHj4UwTW4ANSlNjzQOiiOqfDa6kal9RpF0A&s',
    mark: 'Z',
    usage: 'Shared application state',
  },
  shadcn: {
    logo: 'https://images.seeklogo.com/logo-png/51/1/shadcn-ui-logo-png_seeklogo-519786.png',
    mark: 'UI',
    usage: 'Accessible UI components',
  },
};

function ToolCard({ item }: { item: TechItem }) {
  const [imageFailed, setImageFailed] = useState(false);
  const appearance = toolPresentation[item.id];

  return (
    <div
      data-cursor="Tech"
      className="group flex min-w-[200px] items-center gap-2.5 rounded-lg border border-black/10 bg-[#FFFEFC] px-3.5 py-2.5 shadow-sm transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] select-none hover:-translate-y-1 hover:border-[#C5F52A] hover:shadow-md sm:min-w-[290px] sm:gap-4 sm:rounded-xl sm:px-6 sm:py-4"
    >
      <div aria-hidden="true" className="flex size-8 shrink-0 items-center justify-center rounded-md border border-black/8 bg-[#F2F0EA] p-1.5 transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 group-hover:border-[#C5F52A] sm:size-11 sm:p-2">
        {appearance?.logo && !imageFailed ? (
          <Image
            src={appearance.logo}
            alt=""
            width={28}
            height={28}
            unoptimized
            onError={() => setImageFailed(true)}
            className="size-full object-contain"
          />
        ) : (
          <span className="font-section-heading text-[10px] font-bold leading-none">{appearance?.mark ?? item.name.slice(0, 2).toUpperCase()}</span>
        )}
      </div>
      <div className="space-y-0.5">
        <h3 className="font-section-heading text-sm leading-tight font-bold tracking-[-0.015em] sm:text-lg">{item.name}</h3>
        <p className="font-body-ui text-[11px] leading-snug text-[#4B5563] sm:text-sm">{appearance?.usage ?? item.level}</p>
      </div>
    </div>
  );
}

export function TechStack() {
  const row1 = TECH_STACK.slice(0, 5);
  const row2 = TECH_STACK.slice(5, 10);

  return (
    <section id="tech" aria-labelledby="tools-heading" data-theme-bg="#F5F3EE" className="relative overflow-hidden px-4 py-16 text-[#0A0A0A] transition-colors duration-500 sm:px-6 sm:pt-24 md:px-12">
      <div className="relative z-10 mx-auto max-w-7xl">
        <div id="tools-heading" className="mb-7 px-2 sm:mb-10 sm:px-0">
          <TextReveal as="h2" className="font-section-heading text-[clamp(2.75rem,6vw,5rem)] leading-none font-bold tracking-[-0.045em] [&>div:not(:last-child)]:mr-[0.08em]!">
            Tools we build with
          </TextReveal>
        </div>

        <div className="space-y-3 border-y border-black/10 py-5 sm:space-y-5 sm:py-7">
          <InfiniteMarquee direction="left" speed="slow" fadeColor="light">
            {row1.map((item) => <ToolCard key={item.id} item={item} />)}
          </InfiniteMarquee>

          <InfiniteMarquee direction="right" speed="slow" fadeColor="light">
            {row2.map((item) => <ToolCard key={item.id} item={item} />)}
          </InfiniteMarquee>
        </div>
      </div>
    </section>
  );
}
