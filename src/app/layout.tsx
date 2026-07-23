import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { SmoothScrollProvider } from '@/providers/SmoothScrollProvider';
import { LoadingProvider } from '@/providers/LoadingProvider';
import { Analytics } from '@vercel/analytics/next';

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

export const viewport: Viewport = {
  themeColor: '#03050C',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: 'Webbound Studios | High-Craft Digital Engineering & Creative Direction',
  description: 'Webbound Studios is a premier digital studio engineering bespoke, ultra-fast, and visually captivating flagship web experiences for ambitious brands.',
  keywords: [
    'Web Development Studio',
    'Creative Direction',
    'Next.js 15 Studio',
    'GSAP Animation',
    'Luxury Web Design',
    'UI UX Design',
    'Frontend Engineering',
  ],
  authors: [{ name: 'Webbound Studios' }],
  creator: 'Webbound Studios',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://webboundstudios.com',
    title: 'Webbound Studios | High-Craft Digital Engineering',
    description: 'Premier creative web development studio engineering high-performance luxury interfaces.',
    siteName: 'Webbound Studios',
    images: [
      {
        url: 'https://webboundstudios.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Webbound Studios - Digital Engineering Studio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Webbound Studios | High-Craft Digital Engineering',
    description: 'Premier creative web development studio engineering high-performance luxury interfaces.',
    creator: '@webboundstudios',
    images: ['https://webboundstudios.com/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Webbound Studios',
    url: 'https://webboundstudios.com',
    logo: 'https://webboundstudios.com/logo.png',
    description: 'Premier digital studio engineering high-performance web applications and creative motion experiences.',
    sameAs: [
      'https://twitter.com/webboundstudios',
      'https://github.com/webboundstudios',
      'https://linkedin.com/company/webboundstudios',
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
