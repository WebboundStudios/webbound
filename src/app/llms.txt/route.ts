import { PROJECTS } from '@/constants/data';
import { SERVICE_PAGES } from '@/constants/service-pages';
import { SITE_CONFIG } from '@/constants/site';
import { absoluteUrl } from '@/lib/seo';

export const dynamic = 'force-static';

export function GET() {
  const content = [
    `# ${SITE_CONFIG.name}`,
    '',
    `> ${SITE_CONFIG.description}`,
    '',
    '## Services',
    `- [Website design and development](${absoluteUrl('/#services')})`,
    ...SERVICE_PAGES.map((service) => `- [${service.title}](${absoluteUrl('/services/' + service.slug)}): ${service.description}`),
    '',
    '## Website case studies',
    ...PROJECTS.map((project) => `- [${project.title}](${absoluteUrl('/work#' + project.id)}): ${project.description}`),
    '',
    '## Explore',
    `- [Motion Lab](${absoluteUrl('/animations')}): Interactive web animation demos.`,
    `- [Contact Webbound](${absoluteUrl('/#contact')})`,
    '',
  ].join('\n');

  return new Response(content, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
