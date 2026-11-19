import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { StudioPage } from '@/components/common/StudioPage';
import { SERVICES } from '@/constants/data';
import { SERVICE_PAGES } from '@/constants/service-pages';
import { pageMetadata } from '@/lib/seo';

const path = '/services';

export const metadata = pageMetadata({
  path,
  title: 'Website Design & Development Services',
  description: 'Explore custom websites for architects and interior designers, from single-page portfolios to multi-page CMS builds and custom web apps.',
});

export default function ServicesPage() {
  return (
    <StudioPage
      title="Website design and development"
      introduction="I build websites for architecture and interior design studios, from a single portfolio page to a project archive your team can manage. Every project includes one year of support after launch."
      breadcrumbs={[{ name: 'Services', path }]}
    >
      <section aria-labelledby="studio-services" className="mb-14 sm:mb-20">
        <h2 id="studio-services" className="font-section-heading mb-5 text-2xl font-bold sm:text-3xl">Websites by studio type</h2>
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          {SERVICE_PAGES.map((service) => (
            <article key={service.slug} className="rounded-2xl border border-black/12 bg-[#fffefa] p-5 sm:p-7">
              <h3 className="font-section-heading text-2xl font-bold">{service.title}</h3>
              <p className="mt-3 max-w-[48ch] leading-relaxed text-[#4B5563]">{service.description}</p>
              <Link href={`/services/${service.slug}`} className="mt-4 inline-flex min-h-11 items-center gap-2 font-semibold underline decoration-black/25 underline-offset-4 hover:decoration-black">
                Explore {service.name.toLowerCase()} <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="website-options">
        <h2 id="website-options" className="font-section-heading mb-5 text-2xl font-bold sm:text-3xl">Ways to work together</h2>
        <dl className="divide-y divide-black/12 border-y border-black/12">
          {SERVICES.map((service) => (
            <div key={service.id} className="grid gap-2 py-4 sm:grid-cols-[minmax(12rem,0.7fr)_1fr] sm:gap-5">
              <dt className="font-section-heading text-lg font-bold">{service.title}</dt>
              <dd className="max-w-[64ch] leading-relaxed text-[#4B5563]">{service.description}</dd>
            </div>
          ))}
        </dl>
      </section>

      <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
        <Link href="/#contact" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#C5F52A] px-5 font-bold hover:bg-[#B6E32B]">
          Discuss your website <ArrowUpRight size={17} aria-hidden="true" />
        </Link>
        <Link href="/work" className="inline-flex min-h-11 items-center font-semibold underline decoration-black/25 underline-offset-4 hover:decoration-black">
          View website case studies
        </Link>
      </div>
    </StudioPage>
  );
}
