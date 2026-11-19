'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { PROJECTS } from '@/constants/data';
import type { ProjectItem } from '@/types';

const ProjectDetail = dynamic(() => import('@/components/projects/ProjectDetail').then((module) => module.ProjectDetail), { ssr: false });

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
            <Link
              href="/work"
              className="mt-3 inline-flex min-h-10 items-center gap-1.5 text-sm font-semibold text-[#C5F52A] underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C5F52A]"
            >
              See all website case studies <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="border-b border-white/15">
          {PROJECTS.map((project, index) => (
            <article className="group relative grid gap-6 border-t border-white/15 py-7 sm:py-10 lg:grid-cols-12 lg:items-center lg:gap-12 lg:py-14" key={project.id}>
              <div className={'rounded-xl border border-white/12 bg-[#151515] p-2 sm:p-3 lg:col-span-7 ' + (index % 2 ? 'lg:order-2' : '')}>
                <div data-case-cover style={{ aspectRatio: project.coverAspectRatio }} className="relative aspect-video overflow-hidden rounded-md bg-[#1B1B1B]">
                  <Image
                    src={project.image}
                    alt={project.imageAlt}
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
                <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
                  <Link
                    href={`/work/${project.id}`}
                    prefetch={false}
                    className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#C5F52A] underline-offset-4 after:absolute after:inset-0 after:rounded-lg hover:underline focus-visible:after:outline-2 focus-visible:after:outline-offset-4 focus-visible:after:outline-[#C5F52A]"
                  >
                    Read case study<span className="sr-only"> for {project.title}</span>
                    <ArrowUpRight size={17} aria-hidden="true" />
                  </Link>
                  <button
                    type="button"
                    aria-label={'Quick preview of ' + project.title}
                    aria-haspopup="dialog"
                    className="relative z-10 min-h-11 rounded-full border border-white/25 px-4 text-sm font-semibold hover:border-[#C5F52A] hover:text-[#C5F52A]"
                    onClick={({ currentTarget: trigger }) => {
                      const cover = trigger.closest('article')?.querySelector<HTMLDivElement>('[data-case-cover]');
                      if (cover) setOpenCase((current) => current ?? { project, trigger, cover });
                    }}
                  >
                    Quick preview
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {openCase && <ProjectDetail key={openCase.project.id} {...openCase} onClose={() => setOpenCase(null)} />}
    </section>
  );
}
