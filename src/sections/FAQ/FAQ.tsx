import { Plus } from 'lucide-react';
import { FAQS } from '@/constants/data';
import styles from './FAQ.module.css';

export function FAQ() {
  return (
    <section id="faq" aria-labelledby="faq-heading" data-theme-bg="#F5F3EE" className="px-6 py-20 text-[#0A0A0A] sm:py-24 md:px-12 lg:px-20">
      <div className="mx-auto grid max-w-7xl gap-9 lg:grid-cols-12 lg:gap-12">
        <h2 id="faq-heading" className="font-section-heading text-[clamp(2.75rem,6vw,5rem)] leading-none font-bold tracking-[-0.045em] text-balance lg:col-span-4">
          Common questions
        </h2>
        <div className="divide-y divide-black/15 border-y border-black/15 lg:col-span-8">
          {FAQS.map(({ id, question, answer }) => (
            <details key={id} name="project-faq" open={id === 'timeline' ? true : undefined} className={`group ${styles.item}`}>
              <summary className="font-section-heading flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 py-4 text-base font-bold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#536514] sm:text-lg [&::-webkit-details-marker]:hidden">
                {question}
                <Plus size={19} aria-hidden="true" className="shrink-0 transition-transform duration-300 ease-in-out group-open:rotate-45 motion-reduce:transition-none" />
              </summary>
              <div className={styles.answer}>
                <p className="font-body-ui max-w-[68ch] pb-6 text-sm leading-relaxed text-[#4B5563] sm:text-base">{answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
