import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { StudioPage } from '@/components/common/StudioPage';
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
    <StudioPage
      title="Website case studies"
      introduction="A selection of architecture and interior design studio websites. See what each studio needed and how the website was built around its work."
      breadcrumbs={[{ name: 'Work', path }]}
    >
      <div className="grid gap-6 md:grid-cols-2">
        {PROJECTS.map((project) => (
          <article key={project.id} className="overflow-hidden rounded-2xl border border-black/12 bg-[#fffefa]">
            <div style={{ aspectRatio: project.coverAspectRatio }} className="relative aspect-video overflow-hidden border-b border-black/10 bg-[#e8e6de]">
              <Image
                src={project.image}
                alt={project.imageAlt}
                fill
                sizes="(max-width: 767px) calc(100vw - 48px), (max-width: 1279px) 45vw, 560px"
                className="object-cover"
              />
            </div>
            <div className="p-5 sm:p-7">
              <p className="text-sm font-medium text-[#4B5563]">{project.category}</p>
              <h2 className="font-section-heading mt-1 text-2xl font-bold sm:text-3xl">
                <Link href={`/work/${project.id}`} prefetch={false} className="inline-flex items-center gap-2 underline decoration-black/25 underline-offset-4 hover:decoration-black">
                  {project.title} <ArrowUpRight size={18} className="shrink-0" aria-hidden="true" />
                </Link>
              </h2>
              <p className="mt-3 max-w-[48ch] leading-relaxed text-[#4B5563]">{project.description}</p>
            </div>
          </article>
        ))}
      </div>
      <Link href="/services" className="mt-8 inline-flex min-h-11 items-center gap-2 font-semibold underline decoration-black/25 underline-offset-4 hover:decoration-black">
        Explore website design services <ArrowUpRight size={16} aria-hidden="true" />
      </Link>
    </StudioPage>
  );
}
