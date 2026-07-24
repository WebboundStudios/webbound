'use client';

import React from 'react';
import { TECH_STACK } from '@/constants/data';
import { TextReveal } from '@/components/animations/TextReveal';
import { InfiniteMarquee } from '@/components/animations/InfiniteMarquee';

const techLogoMap: Record<string, string> = {
  nextjs: 'https://www.svgrepo.com/show/354113/nextjs-icon.svg',
  react: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1280px-React-icon.svg.png?_=20220125121207',
  typescript: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1280px-Typescript_logo_2020.svg.png?_=20221110153201',
  tailwind: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/960px-Tailwind_CSS_Logo.svg.png',
  gsap: 'https://gsap.com/community/uploads/monthly_2020_03/tweenmax.png.cf27916e926fbb328ff214f66b4c8429.png',
  framer: 'https://assets.streamlinehq.com/image/private/w_300,h_300,ar_1/f_auto/v1/icons/vector-icons/brand-framer-motion-pk1mas1m7u9hi06fqzq77f.png/brand-framer-motion-nuunolaqtcs7zlblwkjs.png?_a=DATAiZkSZAA0',
  lenis: 'https://raw.githubusercontent.com/nuxt/modules/674149075378ae7d27f3df6d906eff088539a845/icons/nuxt3-lenis.svg',
  three: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/WebGL_Logo.svg/1280px-WebGL_Logo.svg.png?_=20210505165026',
  zustand: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpHj4UwTW4ANSlNjzQOiiOqfDa6kal9RpF0A&s',
  shadcn: 'https://images.seeklogo.com/logo-png/51/1/shadcn-ui-logo-png_seeklogo-519786.png',
};

export const TechStack: React.FC = () => {
  const row1 = TECH_STACK.slice(0, 5);
  const row2 = TECH_STACK.slice(5, 10);

  return (
    <section id="tech" data-theme-bg="#F5F3EE" className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 text-[#0A0A0A] overflow-hidden transition-colors duration-500">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col space-y-3 mb-8 sm:mb-16 text-center items-center">
          <div className="flex items-center gap-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#6B7280]">The tools behind the work</span>
          </div>
          <TextReveal
            as="h2"
            className="font-section-heading text-3xl sm:text-5xl md:text-6xl font-bold text-[#0A0A0A] tracking-tight leading-tight max-w-3xl"
          >
            Engineered With Premium Modern Technologies.
          </TextReveal>
        </div>

        {/* Marquee Rows */}
        <div className="space-y-3 sm:space-y-5">
          <InfiniteMarquee direction="left" speed="slow" fadeColor="light">
            {row1.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-2.5 sm:gap-4 px-3.5 py-2.5 sm:px-6 sm:py-4 rounded-xl sm:rounded-2xl bg-white border border-[#0A0A0A]/[0.06] hover:border-[#C5F52A] transition-all duration-300 group min-w-[200px] sm:min-w-[290px] shadow-sm select-none"
                data-cursor="Tech"
              >
                <div className="w-8 h-8 sm:w-11 sm:h-11 p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-white border border-[#0A0A0A]/[0.08] group-hover:border-[#C5F52A] transition-all duration-300 flex items-center justify-center shrink-0">
                  <img
                    src={techLogoMap[item.id]}
                    alt={`${item.name} logo`}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h4 className="font-section-heading text-xs sm:text-lg font-bold text-[#0A0A0A]">
                    {item.name}
                  </h4>
                  <p className="text-[10px] sm:text-xs font-mono text-[#6B7280]">{item.level}</p>
                </div>
              </div>
            ))}
          </InfiniteMarquee>

          <InfiniteMarquee direction="right" speed="slow" fadeColor="light">
            {row2.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-2.5 sm:gap-4 px-3.5 py-2.5 sm:px-6 sm:py-4 rounded-xl sm:rounded-2xl bg-white border border-[#0A0A0A]/[0.06] hover:border-[#C5F52A] transition-all duration-300 group min-w-[200px] sm:min-w-[290px] shadow-sm select-none"
                data-cursor="Tech"
              >
                <div className="w-8 h-8 sm:w-11 sm:h-11 p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-white border border-[#0A0A0A]/[0.08] group-hover:border-[#C5F52A] transition-all duration-300 flex items-center justify-center shrink-0">
                  <img
                    src={techLogoMap[item.id]}
                    alt={`${item.name} logo`}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h4 className="font-section-heading text-xs sm:text-lg font-bold text-[#0A0A0A]">
                    {item.name}
                  </h4>
                  <p className="text-[10px] sm:text-xs font-mono text-[#6B7280]">{item.level}</p>
                </div>
              </div>
            ))}
          </InfiniteMarquee>
        </div>
      </div>
    </section>
  );
};
