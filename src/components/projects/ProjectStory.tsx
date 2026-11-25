import type { ProjectItem } from '@/types';

export function ProjectStory({ sections }: { sections: ProjectItem['caseStudy']['sections'] }) {
  return (
    <div className="grid gap-10 sm:gap-14">
      {sections.map(({ heading, paragraphs }) => (
        <section key={heading}>
          <h2 className="font-section-heading text-2xl font-bold tracking-tight sm:text-3xl">{heading}</h2>
          <div className="mt-4 space-y-4 text-base leading-relaxed text-[#4B5563] sm:text-lg">
            {paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </section>
      ))}
    </div>
  );
}
