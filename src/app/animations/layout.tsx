import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  path: '/animations',
  title: 'Motion Lab: Interactive Web Animation Demos',
  description: 'Try text rolls, magnetic buttons, parallax galleries, scrolling marquees, and count-up animations in Webbound’s interactive Motion Lab.',
});

export default function MotionLabLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
