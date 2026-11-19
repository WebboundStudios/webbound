import Link from 'next/link';
import { absoluteUrl } from '@/lib/seo';
import { JsonLd } from './JsonLd';

type Breadcrumb = { name: string; path: string };

export function Breadcrumbs({ items }: { items: Breadcrumb[] }) {
  const trail = [{ name: 'Home', path: '/' }, ...items];

  return (
    <>
      <JsonLd value={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: trail.map(({ name, path }, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name,
          item: absoluteUrl(path),
        })),
      }} />
      <nav aria-label="Breadcrumb" className="font-body-ui text-sm leading-relaxed text-[#4b5541]">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          {trail.map(({ name, path }, index) => (
            <li key={path} className="flex items-center gap-2">
              {index > 0 && <span aria-hidden="true" className="opacity-60">/</span>}
              {index === trail.length - 1 ? (
                <span aria-current="page">{name}</span>
              ) : (
                <Link href={path} className="underline decoration-black/25 underline-offset-4 hover:decoration-black">{name}</Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
