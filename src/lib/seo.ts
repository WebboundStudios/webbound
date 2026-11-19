import type { Metadata } from 'next';
import { SITE_CONFIG } from '@/constants/site';

const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;
export const siteUrl = new URL(
  process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    (productionHost ? `https://${productionHost}` : SITE_CONFIG.url),
).origin;

export function absoluteUrl(path: string) {
  return new URL(path, siteUrl).href;
}

export const organizationId = absoluteUrl('/#organization');
export const websiteId = absoluteUrl('/#website');
export const shareImage = {
  url: '/share-image',
  alt: 'Webbound. Websites for architecture and interior design studios.',
  width: 1200,
  height: 630,
};

type PageMetadata = {
  path: string;
  title: string;
  description: string;
  image?: { url: string; alt: string };
};

export function pageMetadata({ path, title, description, image = shareImage }: PageMetadata): Metadata {
  const pageTitle = `${title} | ${SITE_CONFIG.name}`;
  const url = absoluteUrl(path);

  return {
    title: pageTitle,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      siteName: SITE_CONFIG.name,
      locale: 'en_IN',
      url,
      title: pageTitle,
      description,
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description,
      images: [image],
    },
  };
}
