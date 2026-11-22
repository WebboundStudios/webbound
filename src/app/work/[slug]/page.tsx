import { notFound, permanentRedirect } from 'next/navigation';
import { PROJECTS } from '@/constants/data';

export const dynamicParams = false;

export function generateStaticParams() {
  return PROJECTS.map(({ id }) => ({ slug: id }));
}

export default async function LegacyCaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!PROJECTS.some(({ id }) => id === slug)) notFound();
  permanentRedirect('/work#' + slug);
}
