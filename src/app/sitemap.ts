import type { MetadataRoute } from 'next';
import { PROJECTS } from '@/constants/data';
import { SERVICE_PAGES } from '@/constants/service-pages';
import { absoluteUrl } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...['/', '/services', '/work', '/animations'].map((path) => ({ url: absoluteUrl(path) })),
    ...SERVICE_PAGES.map(({ slug }) => ({ url: absoluteUrl(`/services/${slug}`) })),
    ...PROJECTS.map(({ id, image }) => ({
      url: absoluteUrl(`/work/${id}`),
      images: [absoluteUrl(image)],
    })),
  ];
}
