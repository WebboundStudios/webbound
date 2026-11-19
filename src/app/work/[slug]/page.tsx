import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';
import { JsonLd } from '@/components/common/JsonLd';
import { StudioPage } from '@/components/common/StudioPage';
import { ProjectStory } from '@/components/projects/ProjectStory';
import { PROJECTS } from '@/constants/data';
import { SERVICE_PAGES } from '@/constants/service-pages';
import { SITE_CONFIG } from '@/constants/site';
import { absoluteUrl, organizationId, pageMetadata } from '@/lib/seo';

type WorkPageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return PROJECTS.map(({ id }) => ({ slug: id }));
}

async function getProject(params: WorkPageProps['params']) {
  const { slug } = await params;
  const project = PROJECTS.find((item) => item.id === slug);
  if (!project) notFound();
  return project;
}

export async function generateMetadata({ params }: WorkPageProps) {
  const project = await getProject(params);
  return pageMetadata({
    path: `/work/${project.id}`,
    title: `${project.title} Website Case Study`,
    description: project.description,
    image: { url: project.image, alt: project.imageAlt },
  });
}

export default async function CaseStudyPage({ params }: WorkPageProps) {
  const project = await getProject(params);
  const path = `/work/${project.id}`;
  const service = SERVICE_PAGES.find(({ focus }) => focus === project.focus);

  return (
    <StudioPage
      title={`${project.title} website`}
      introduction={project.description}
      breadcrumbs={[{ name: 'Work', path: '/work' }, { name: project.title, path }]}
    >
      <JsonLd value={{
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        '@id': absoluteUrl(path + '#case-study'),
        name: `${project.title} website case study`,
        url: absoluteUrl(path),
        description: project.description,
        image: absoluteUrl(project.image),
        inLanguage: SITE_CONFIG.language,
        creator: { '@id': organizationId, name: SITE_CONFIG.name, url: absoluteUrl('/') },
      }} />

      <article>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,2.25fr)_minmax(0,1fr)] lg:gap-9">
          <div style={{ aspectRatio: project.coverAspectRatio }} className="relative aspect-video overflow-hidden rounded-xl border border-black/10 bg-[#e8e6de]">
            <Image
              src={project.image}
              alt={project.imageAlt}
              fill
              preload
              sizes="(max-width: 639px) calc(100vw - 48px), (max-width: 1023px) calc(100vw - 80px), (max-width: 1279px) 62vw, 780px"
              className="object-cover"
            />
          </div>
          <div>
            <dl className="divide-y divide-black/12 border-y border-black/12">
              <div className="py-3"><dt className="text-sm text-[#4B5563]">Client</dt><dd className="mt-1 font-semibold">{project.client}</dd></div>
              <div className="py-3"><dt className="text-sm text-[#4B5563]">Work</dt><dd className="mt-1 font-semibold">{project.impact}</dd></div>
              <div className="py-3"><dt className="text-sm text-[#4B5563]">Technology</dt><dd className="mt-1 font-semibold">{project.tags.join(' · ')}</dd></div>
            </dl>
            {project.link && (
              <a href={project.link} target="_blank" rel="noreferrer" className="mt-4 inline-flex min-h-11 items-center gap-2 font-semibold underline decoration-black/25 underline-offset-4 hover:decoration-black">
                Visit {project.title} <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            )}
          </div>
        </div>

        <ProjectStory project={project} />
      </article>

      <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-black/15 pt-7">
        <Link href="/#contact" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#C5F52A] px-5 font-bold hover:bg-[#B6E32B]">
          Discuss a similar website <ArrowUpRight size={16} aria-hidden="true" />
        </Link>
        {service && (
          <Link href={`/services/${service.slug}`} className="inline-flex min-h-11 items-center font-semibold underline decoration-black/25 underline-offset-4 hover:decoration-black">
            {service.name}
          </Link>
        )}
      </div>
    </StudioPage>
  );
}
