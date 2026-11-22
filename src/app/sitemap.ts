import type { MetadataRoute } from 'next';
import { PROJECTS } from '@/constants/data';
import { SERVICE_PAGES } from '@/constants/service-pages';
import { absoluteUrl } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...['/', '/animations'].map((path) => ({ url: absoluteUrl(path) })),
    { url: absoluteUrl('/work'), images: PROJECTS.map(({ image }) => absoluteUrl(image)) },
    ...SERVICE_PAGES.map(({ slug }) => ({ url: absoluteUrl(`/services/${slug}`) })),
  ];
}
