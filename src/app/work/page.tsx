import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { StudioPage } from '@/components/common/StudioPage';
import { CaseStudyButton } from '@/components/projects/CaseStudyButton';
import { PROJECTS } from '@/constants/data';
import { pageMetadata } from '@/lib/seo';

const path = '/work';

export const metadata = pageMetadata({
  path,
  title: 'Architecture & Interior Design Website Case Studies',
  description: 'See Webbound’s website case studies for architecture and interiors studios, covering portfolio galleries, CMS publishing, and project enquiries.',
});

export default function WorkPage() {
  return (
    <StudioPage indexPage
      title="Website case studies"
      introduction="A selection of architecture and interior design studio websites. See what each studio needed and how the website was built around its work."
      breadcrumbs={[{ name: 'Work', path }]}
    >
      <div className="grid items-end gap-y-12 md:grid-cols-12 md:gap-x-8 lg:gap-y-20">
        {PROJECTS.map((project, index) => (
          <article id={project.id} key={project.id} className={'group relative min-w-0 ' + (index % 4 === 0 || index % 4 === 3 ? 'md:col-span-7' : 'md:col-span-5')}>
            <div className="bg-[#121310] p-[clamp(1rem,2.8vw,2.5rem)]">
              <div className="relative before:absolute before:-top-1.5 before:-left-1.5 before:size-3 before:border-t before:border-l before:border-[#C5F52A] after:absolute after:-right-1.5 after:-bottom-1.5 after:size-3 after:border-r after:border-b after:border-[#C5F52A]">
                <div data-case-cover className="relative aspect-video overflow-hidden" style={{ aspectRatio: project.coverAspectRatio }}>
                  <Image src={project.image} alt={project.imageAlt} fill sizes="(min-width: 1280px) 600px, (min-width: 768px) 51vw, 90vw" className="object-cover" />
                </div>
              </div>
            </div>
            <div className="mt-4 border-t border-black/20 pt-3">
              <p className="flex justify-between gap-4 text-xs font-semibold text-[#575b51]"><span>{project.category}</span><span>{project.year}</span></p>
              <h2 className="mt-2 font-serif text-[clamp(1.875rem,3vw,3rem)] leading-[1.04] tracking-[-0.045em]">
                <CaseStudyButton project={project} anchorId={project.id} className="flex min-h-11 w-full items-start justify-between gap-4 text-left after:absolute after:inset-0 focus-visible:after:outline-2">
                  {project.title} <ArrowUpRight size={23} className="mt-1 shrink-0 motion-safe:transition-transform motion-safe:group-hover:-translate-y-0.5" aria-hidden="true" />
                </CaseStudyButton>
              </h2>
              <p className="mt-3 max-w-[48ch] leading-relaxed text-[#4B5563]">{project.description}</p>
            </div>
          </article>
        ))}
      </div>
      <Link href="/#services" className="mt-8 inline-flex min-h-11 items-center gap-2 font-semibold underline decoration-black/25 underline-offset-4 hover:decoration-black">
        Explore website design services <ArrowUpRight size={16} aria-hidden="true" />
      </Link>
    </StudioPage>
  );
}
