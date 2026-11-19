import type { ProjectItem } from '@/types';

export function ProjectStory({ project, inDialog = false }: { project: ProjectItem; inDialog?: boolean }) {
  const Heading = inDialog ? 'h3' : 'h2';
  const sections = [
    { title: 'Overview', text: project.longDescription ?? project.description },
    { title: 'The challenge', text: project.challenge },
    { title: 'The approach', text: project.solution },
  ];

  return (
    <div className="mt-10 grid gap-7 border-t border-current/15 pt-7 md:grid-cols-3">
      {sections.map(({ title, text }) => text && (
        <section key={title}>
          <Heading className="font-section-heading mb-2 text-xl font-bold">{title}</Heading>
          <p className="font-body-ui leading-relaxed opacity-80">{text}</p>
        </section>
      ))}
    </div>
  );
}
