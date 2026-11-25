import type { MetadataRoute } from 'next';
import { PROJECTS } from '@/constants/data';
import { POLICY_LINKS } from '@/constants/policies';
import { SERVICE_PAGES } from '@/constants/service-pages';
import { absoluteUrl } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...['/', '/animations'].map((path) => ({ url: absoluteUrl(path) })),
    ...POLICY_LINKS.map(({ path, updated }) => ({ url: absoluteUrl(path), lastModified: updated })),
    { url: absoluteUrl('/work'), images: PROJECTS.map(({ image }) => absoluteUrl(image)) },
    ...PROJECTS.map(({ id, image }) => ({
      url: absoluteUrl(`/work/${id}`),
      images: [absoluteUrl(image)],
    })),
    ...SERVICE_PAGES.map(({ slug }) => ({ url: absoluteUrl(`/services/${slug}`) })),
  ];
}
