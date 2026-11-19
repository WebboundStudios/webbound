'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { ProjectDetail } from '@/components/projects/ProjectDetail';
import { PROJECTS } from '@/constants/data';
import type { ProjectItem } from '@/types';

type OpenCase = {
  project: ProjectItem;
  trigger: HTMLButtonElement;
  cover: HTMLDivElement;
};

export function Projects() {
  const [openCase, setOpenCase] = useState<OpenCase | null>(null);

  return (
    <section
      id="projects"
      aria-labelledby="selected-work-heading"
      data-theme-bg="#0A0A0A"
      className="bg-[#0A0A0A] px-6 py-20 text-white sm:py-24 md:px-12 lg:px-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 grid gap-5 md:mb-14 md:grid-cols-[minmax(0,1fr)_minmax(0,25rem)] md:items-end md:gap-12">
          <h2 id="selected-work-heading" className="font-section-heading text-[clamp(3rem,7vw,6rem)] leading-none font-bold tracking-[-0.045em]">
            Selected work<span className="text-[#C5F52A]">.</span>
          </h2>
          <div>
            <p className="font-body-ui text-base leading-relaxed text-white/70 md:text-lg">
              Websites and content platforms for architecture and interiors studios.
            </p>
            <a
              href="#contact"
              className="mt-3 inline-flex min-h-10 items-center gap-1.5 text-sm font-semibold text-[#C5F52A] underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C5F52A]"
            >
              Request portfolio <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="border-b border-white/15">
          {PROJECTS.map((project, index) => (
            <article className="group relative grid gap-6 border-t border-white/15 py-7 sm:py-10 lg:grid-cols-12 lg:items-center lg:gap-12 lg:py-14" key={project.id}>
              <div className={'rounded-xl border border-white/12 bg-[#151515] p-2 sm:p-3 lg:col-span-7 ' + (index % 2 ? 'lg:order-2' : '')}>
                <div data-case-cover style={{ aspectRatio: project.coverAspectRatio }} className="relative aspect-video overflow-hidden rounded-md bg-[#1B1B1B]">
                  <Image
                    src={project.image}
                    alt=""
                    fill
                    sizes="(max-width: 767px) calc(100vw - 48px), (max-width: 1023px) calc(100vw - 96px), (max-width: 1439px) 52vw, 724px"
                    className="object-cover"
                  />
                </div>
              </div>
              <div className={'lg:col-span-5 ' + (index % 2 ? 'lg:pr-5' : 'lg:pl-5')}>
                <p className="font-body-ui text-sm text-white/65">{project.category}</p>
                <h3 className="font-section-heading mt-2 max-w-[18ch] text-3xl leading-[1.04] font-bold tracking-[-0.035em] text-balance sm:text-4xl lg:text-[clamp(2.25rem,3.5vw,3.75rem)]">
                  {project.title}
                </h3>
                <p className="font-body-ui mt-4 max-w-[42ch] text-base leading-relaxed text-white/70">{project.description}</p>
                <span aria-hidden="true" className="mt-5 inline-flex min-h-11 items-center gap-3 text-sm font-semibold transition-colors group-hover:text-[#C5F52A] group-focus-within:text-[#C5F52A] motion-reduce:transition-none">
                  <span className="grid size-11 place-items-center rounded-full border border-white/25 transition-colors group-hover:border-[#C5F52A] group-hover:bg-[#C5F52A] group-hover:text-black group-focus-within:border-[#C5F52A] group-focus-within:bg-[#C5F52A] group-focus-within:text-black motion-reduce:transition-none">
                    <ArrowUpRight size={19} />
                  </span>
                  Read case study
                </span>
              </div>
              <button
                type="button"
                aria-label={'View case study for ' + project.title}
                aria-haspopup="dialog"
                data-cursor="View"
                className="absolute inset-0 cursor-pointer rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C5F52A]"
                onClick={({ currentTarget: trigger }) => {
                  const cover = trigger.parentElement?.querySelector<HTMLDivElement>('[data-case-cover]');
                  if (cover) setOpenCase((current) => current ?? { project, trigger, cover });
                }}
              />
            </article>
          ))}
        </div>
      </div>

      {openCase && <ProjectDetail key={openCase.project.id} {...openCase} onClose={() => setOpenCase(null)} />}
    </section>
  );
}
