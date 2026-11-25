import type { ReactNode } from 'react';
import { CalendarDays } from 'lucide-react';
import { SITE_CONFIG } from '@/constants/site';
import { PolicyContents } from './PolicyContents';
import { StudioPage } from './StudioPage';

type PolicyPageProps = {
  policy: { path: string; title: string; description: string; updated: string };
  sections: { id: string; title: string; content: ReactNode }[];
};

const dateFormat = new Intl.DateTimeFormat('en-IN', { dateStyle: 'long', timeZone: 'UTC' });

export function PolicyEmail() {
  return <a href={`mailto:${SITE_CONFIG.email}`}>{SITE_CONFIG.email}</a>;
}

export function PolicyPage({ policy, sections }: PolicyPageProps) {
  return (
    <StudioPage
      title={policy.title}
      introduction={(
        <>
          {policy.description}
          <span className="mt-4 flex items-center gap-2 text-sm font-medium">
            <CalendarDays size={16} className="shrink-0 text-[#405211]" aria-hidden="true" />
            <span>Last updated <time dateTime={policy.updated}>{dateFormat.format(new Date(policy.updated))}</time></span>
          </span>
        </>
      )}
      breadcrumbs={[{ name: policy.title, path: policy.path }]}
    >
      <PolicyContents sections={sections.map(({ id, title }) => ({ id, title }))}>
        {sections.map(({ id, title, content }) => (
          <section key={id} id={id} data-policy-section tabIndex={-1} aria-labelledby={`${id}-heading`} className="scroll-mt-8 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#405211]">
            <h2 id={`${id}-heading`} className="font-section-heading border-b border-black/12 pb-3 text-2xl leading-tight font-bold tracking-[-0.025em] sm:text-3xl">{title}</h2>
            <div className="font-body-ui mt-4 space-y-3 leading-relaxed text-[#454B42] [&_a]:break-words [&_a]:font-semibold [&_a]:text-[#405211] [&_a]:underline [&_a]:underline-offset-4 [&_li+li]:mt-2 [&_ul]:list-disc [&_ul]:pl-5">
              {content}
            </div>
          </section>
        ))}
      </PolicyContents>
    </StudioPage>
  );
}
