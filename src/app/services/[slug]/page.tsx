import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';
import { JsonLd } from '@/components/common/JsonLd';
import { StudioPage } from '@/components/common/StudioPage';
import { PROJECTS } from '@/constants/data';
import { SERVICE_PAGES } from '@/constants/service-pages';
import { SITE_CONFIG } from '@/constants/site';
import { absoluteUrl, organizationId, pageMetadata } from '@/lib/seo';

type ServicePageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICE_PAGES.map(({ slug }) => ({ slug }));
}

async function getService(params: ServicePageProps['params']) {
  const { slug } = await params;
  const service = SERVICE_PAGES.find((item) => item.slug === slug);
  if (!service) notFound();
  return service;
}

export async function generateMetadata({ params }: ServicePageProps) {
  const service = await getService(params);
  return pageMetadata({
    path: `/services/${service.slug}`,
    title: service.title,
    description: service.description,
  });
}

export default async function StudioServicePage({ params }: ServicePageProps) {
  const service = await getService(params);
  const path = `/services/${service.slug}`;
  const examples = PROJECTS.filter((project) => project.focus === service.focus);

  return (
    <StudioPage
      title={service.title}
      introduction={service.introduction}
      breadcrumbs={[{ name: 'Services', path: '/services' }, { name: service.name, path }]}
    >
      <JsonLd value={{
        '@context': 'https://schema.org',
        '@type': 'Service',
        '@id': absoluteUrl(path + '#service'),
        url: absoluteUrl(path),
        name: service.title,
        description: service.description,
        provider: { '@type': 'Organization', '@id': organizationId, name: SITE_CONFIG.name, url: absoluteUrl('/') },
        areaServed: { '@type': 'Country', name: SITE_CONFIG.location },
      }} />

      <section aria-labelledby="service-features">
        <h2 id="service-features" className="font-section-heading mb-5 text-2xl font-bold sm:text-3xl">What your website can include</h2>
        <div className="grid gap-4 md:grid-cols-3 md:gap-6">
          {service.features.map(({ title, text }) => (
            <section key={title} className="rounded-2xl border border-black/12 bg-[#fffefa] p-5 sm:p-6">
              <h3 className="font-section-heading text-xl font-bold">{title}</h3>
              <p className="mt-3 leading-relaxed text-[#4B5563]">{text}</p>
            </section>
          ))}
        </div>
      </section>

      <section aria-labelledby="service-examples" className="mt-12 sm:mt-16">
        <h2 id="service-examples" className="font-section-heading mb-5 text-2xl font-bold sm:text-3xl">Selected website projects</h2>
        <ul className="divide-y divide-black/12 border-y border-black/12">
          {examples.map((project) => (
            <li key={project.id} className="py-4">
              <Link href={`/work/${project.id}`} className="inline-flex min-h-9 items-center gap-2 font-semibold underline decoration-black/25 underline-offset-4 hover:decoration-black">
                {project.title} <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
              <p className="text-[#4B5563]">{project.description}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="service-questions" className="mt-12 sm:mt-16">
        <h2 id="service-questions" className="font-section-heading mb-5 text-2xl font-bold sm:text-3xl">Planning your website</h2>
        <div className="grid max-w-4xl gap-6">
          {service.questions.map(({ question, answer }) => (
            <section key={question}>
              <h3 className="font-section-heading text-lg font-bold">{question}</h3>
              <p className="mt-2 max-w-[72ch] leading-relaxed text-[#4B5563]">{answer}</p>
            </section>
          ))}
        </div>
      </section>

      <div className="mt-10 max-w-[65ch] border-t border-black/15 pt-7">
        <p className="mb-4 leading-relaxed text-[#4B5563]">We review the design and a live staging site together before launch. Your website includes one year of support after launch, including technical maintenance and small content updates.</p>
        <Link href="/#contact" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#C5F52A] px-5 font-bold hover:bg-[#B6E32B]">
          Discuss your website <ArrowUpRight size={17} aria-hidden="true" />
        </Link>
      </div>
    </StudioPage>
  );
}
