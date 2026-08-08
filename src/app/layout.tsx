import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { SmoothScrollProvider } from '@/providers/SmoothScrollProvider';
import { LoadingProvider } from '@/providers/LoadingProvider';
import { Analytics } from '@vercel/analytics/next';
import { SITE_CONFIG, FAQS, PROJECTS } from '@/constants/data';

const clashDisplay = localFont({
  src: [
    { path: './fonts/ClashDisplay-Regular.woff2', weight: '400', style: 'normal' },
    { path: './fonts/ClashDisplay-Medium.woff2', weight: '500', style: 'normal' },
    { path: './fonts/ClashDisplay-Semibold.woff2', weight: '600', style: 'normal' },
    { path: './fonts/ClashDisplay-Bold.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-display',
  display: 'swap',
});

const cabinetGrotesk = localFont({
  src: [
    { path: './fonts/CabinetGrotesk-Regular.woff2', weight: '400', style: 'normal' },
    { path: './fonts/CabinetGrotesk-Medium.woff2', weight: '500', style: 'normal' },
    { path: './fonts/CabinetGrotesk-Bold.woff2', weight: '700', style: 'normal' },
    { path: './fonts/CabinetGrotesk-Extrabold.woff2', weight: '800', style: 'normal' },
  ],
  variable: '--font-heading',
  display: 'swap',
});

const satoshi = localFont({
  src: [
    { path: './fonts/Satoshi-Light.woff2', weight: '300', style: 'normal' },
    { path: './fonts/Satoshi-Regular.woff2', weight: '400', style: 'normal' },
    { path: './fonts/Satoshi-Medium.woff2', weight: '500', style: 'normal' },
    { path: './fonts/Satoshi-Bold.woff2', weight: '700', style: 'normal' },
    { path: './fonts/Satoshi-Black.woff2', weight: '900', style: 'normal' },
  ],
  variable: '--font-body',
  display: 'swap',
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : SITE_CONFIG.url);

export const viewport: Viewport = {
  themeColor: '#03050C',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Webbound Studios | High-Craft Digital Engineering & Creative Direction',
    template: '%s | Webbound Studios',
  },
  description: SITE_CONFIG.description,
  keywords: [
    'Web Development Studio',
    'Creative Direction',
    'Next.js 15 Studio',
    'GSAP Animation',
    'Luxury Web Design',
    'UI UX Design',
    'Frontend Engineering',
    'Fullstack Web Applications',
    'Headless CMS Development',
  ],
  authors: [{ name: 'Webbound Studios', url: siteUrl }],
  creator: 'Webbound Studios',
  publisher: 'Webbound Studios',
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    title: 'Webbound Studios | High-Craft Digital Engineering',
    description: SITE_CONFIG.description,
    siteName: 'Webbound Studios',
    images: [
      {
        url: `${siteUrl}/android-chrome-512x512.png`,
        width: 512,
        height: 512,
        alt: 'Webbound Studios - Digital Engineering Studio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Webbound Studios | High-Craft Digital Engineering',
    description: SITE_CONFIG.description,
    creator: '@webboundstudios',
    images: [`${siteUrl}/android-chrome-512x512.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${siteUrl}/#organization`,
        name: 'Webbound Studios',
        url: siteUrl,
        logo: `${siteUrl}/android-chrome-512x512.png`,
        description: SITE_CONFIG.description,
        sameAs: [
          'https://twitter.com/webboundstudios',
          'https://github.com/webboundstudios',
          'https://linkedin.com/company/webboundstudios',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: 'Webbound Studios',
        description: SITE_CONFIG.description,
        publisher: {
          '@id': `${siteUrl}/#organization`,
        },
        inLanguage: 'en-US',
      },
      {
        '@type': 'ProfessionalService',
        '@id': `${siteUrl}/#service`,
        name: 'Webbound Studios',
        url: siteUrl,
        image: `${siteUrl}/android-chrome-512x512.png`,
        priceRange: '$$$',
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'IN',
        },
        description: SITE_CONFIG.description,
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Webbound Engineering Services',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Type 1: Single-Page Business Website',
                description: 'Fast, responsive & professional online presence for ambitious brands.',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Type 2: Dynamic CMS Website',
                description: 'Dynamic blog & portfolio updates powered by Headless CMS.',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Type 3: Premium CMS Platform',
                description: 'Multi-page platform with custom admin dashboard and real-time content updates.',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Type 4: Custom Full-Stack Web Application',
                description: 'Custom full-stack development with databases, APIs, authentication & custom business logic.',
              },
            },
          ],
        },
      },
      {
        '@type': 'FAQPage',
        '@id': `${siteUrl}/#faq`,
        mainEntity: FAQS.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
      {
        '@type': 'Person',
        '@id': `${siteUrl}/#author`,
        name: 'Webbound Lead Engineer',
        jobTitle: 'Lead Creative Engineer & Architect',
        worksFor: {
          '@id': `${siteUrl}/#organization`,
        },
        description: 'Independent creative engineer and UI architect specializing in Next.js 15, GSAP, and Headless CMS digital flagships.',
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${siteUrl}/#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: siteUrl,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Motion Lab',
            item: `${siteUrl}/animations`,
          },
        ],
      },
      {
        '@type': 'ItemList',
        '@id': `${siteUrl}/#projects`,
        name: 'Webbound Studios Portfolio Showcase',
        description: 'Bespoke web applications and digital engineering flagship projects created by Webbound Studios.',
        itemListElement: PROJECTS.map((proj, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          item: {
            '@type': 'CreativeWork',
            name: proj.title,
            description: proj.description,
            image: proj.image,
            url: proj.link,
            creator: {
              '@id': `${siteUrl}/#organization`,
            },
          },
        })),
      },
    ],
  };

  return (
    <html
      lang="en"
      className={`${clashDisplay.variable} ${cabinetGrotesk.variable} ${satoshi.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#F5F3EE] text-[#0A0A0A] selection:bg-[#C5F52A] selection:text-[#0A0A0A] font-body-ui">
        <LoadingProvider>
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
        </LoadingProvider>
        <Analytics />
      </body>
    </html>
  );
}
