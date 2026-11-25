import { ButtonLink } from '@/components/ui/Button';
import { notFound } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';
import { JsonLd } from '@/components/common/JsonLd';
import { StudioPage } from '@/components/common/StudioPage';
import { ProjectFrame } from '@/components/projects/ProjectFrame';
import { ProjectStory } from '@/components/projects/ProjectStory';
import { PROJECTS } from '@/constants/data';
import { SITE_CONFIG } from '@/constants/site';
import { absoluteUrl, organizationId, pageMetadata } from '@/lib/seo';

type CaseStudyPageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return PROJECTS.map(({ id }) => ({ slug: id }));
}

async function getProject(params: CaseStudyPageProps['params']) {
  const { slug } = await params;
  const project = PROJECTS.find(({ id }) => id === slug);
  if (!project) notFound();
  return project;
}

export async function generateMetadata({ params }: CaseStudyPageProps) {
  const { id, caseStudy, image, imageAlt } = await getProject(params);
  return pageMetadata({
    path: `/work/${id}`,
    title: caseStudy.seoTitle ?? caseStudy.title,
    description: caseStudy.description,
    image: { url: image, alt: imageAlt },
    type: 'article',
  });
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const project = await getProject(params);
  const { caseStudy } = project;
  const path = `/work/${project.id}`;

  return (
    <StudioPage
      title={caseStudy.title}
      introduction={caseStudy.description}
      breadcrumbs={[{ name: 'Work', path: '/work' }, { name: project.title, path }]}
    >
      <JsonLd value={{
        '@context': 'https://schema.org',
        '@type': 'Article',
        mainEntityOfPage: absoluteUrl(path),
        headline: caseStudy.title,
        description: caseStudy.description,
        image: absoluteUrl(project.image),
        author: { '@type': 'Organization', '@id': organizationId, name: SITE_CONFIG.name, url: absoluteUrl('/') },
      }} />
      <article>
        <ProjectFrame project={project} sizes="(min-width: 1280px) 1024px, (min-width: 640px) calc(100vw - 80px), calc(100vw - 48px)" className="mx-auto max-w-5xl" />
        <div className="mx-auto mt-8 max-w-3xl sm:mt-12">
          <dl className="grid gap-x-8 gap-y-4 border-y border-black/15 py-5 text-sm sm:grid-cols-[1fr_2fr]">
            <div><dt className="text-[#4B5563]">Client</dt><dd className="mt-1 font-semibold">{project.client}</dd></div>
            <div><dt className="text-[#4B5563]">Delivered</dt><dd className="mt-1 font-semibold">{project.impact}</dd></div>
          </dl>
          <div className="mt-10 sm:mt-14">
            <ProjectStory sections={caseStudy.sections} />
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-black/15 pt-6">
            <ButtonLink href="/#contact">Discuss a similar project</ButtonLink>
            {project.link && (
              <a href={project.link} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 font-semibold underline decoration-black/25 underline-offset-4 hover:decoration-black">
                Visit client website <ArrowUpRight size={17} aria-hidden="true" />
              </a>
            )}
          </div>
        </div>
      </article>
    </StudioPage>
  );
}
