'use client';

import { InfiniteMarquee } from '@/components/animations/InfiniteMarquee';
import { TextReveal } from '@/components/animations/TextReveal';
import { TESTIMONIALS } from '@/constants/data';

export function Testimonials() {
  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      data-theme-bg="#F5F3EE"
      className="relative w-full overflow-hidden py-16 text-[#0A0A0A] transition-colors duration-200 sm:py-24"
    >
      <div className="mx-auto w-[calc(100%-3rem)] max-w-7xl md:w-[calc(100%-6rem)]">
        <div id="testimonials-heading" className="mb-7 border-t border-black/12 pt-8 sm:mb-10 sm:pt-12">
          <TextReveal
            as="h2"
            className="font-section-heading text-[clamp(2.5rem,5.5vw,4.75rem)] leading-[1.05] font-bold tracking-[-0.045em] [&>div:not(:last-child)]:mr-[0.08em]!"
          >
            What our clients say
          </TextReveal>
        </div>
      </div>

      <div className="w-full border-y border-black/10 py-3 sm:py-5">
        <InfiniteMarquee direction="left" speed="slow" pauseOnHover={true} fadeColor="light" interactiveScroll={true}>
          {TESTIMONIALS.map((item) => (
            <div key={item.id} className="flex w-64 shrink-0 py-2 sm:w-72 lg:w-80">
              <figure
                className="flex w-full flex-col gap-3 rounded-xl border border-black/10 bg-[#FFFEFC] p-4 transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] select-none hover:-translate-y-1.5 hover:border-black/20 hover:shadow-sm sm:p-5"
              >
                <figcaption className="group flex items-center gap-2.5">
                  <span aria-hidden="true" className="flex size-8 shrink-0 items-center justify-center rounded-full border border-black/10 bg-[#F2F0EA] font-section-heading text-[10px] font-bold transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 group-hover:border-[#C5F52A]">
                    {item.author.split(' ').slice(-2).map((name) => name.charAt(0)).join('')}
                  </span>
                  <div className="min-w-0">
                    <p className="font-section-heading text-sm leading-tight font-bold">{item.author}</p>
                    <p className="font-body-ui mt-0.5 text-xs leading-snug text-[#4B5563]">{item.company.split(' (')[0]}</p>
                  </div>
                </figcaption>
                <blockquote className="font-body-ui text-sm leading-relaxed text-[#242424]">
                  <p>&ldquo;{item.excerpt ?? item.quote}&rdquo;</p>
                </blockquote>
              </figure>
            </div>
          ))}
        </InfiniteMarquee>
      </div>
    </section>
  );
}
