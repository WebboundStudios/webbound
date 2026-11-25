import { ArrowUpRight, MapPin } from 'lucide-react';
import { TextReveal } from '@/components/animations/TextReveal';
import { SITE_CONFIG } from '@/constants/data';
import { ContactForm } from '@/sections/Contact/ContactForm';

export function CTA() {
  return (
    <section
      id="cta"
      aria-labelledby="contact-heading"
      data-theme-bg="#F5F3EE"
      className="relative overflow-hidden bg-[#F5F3EE] px-6 pt-10 pb-8 text-[#0A0A0A] sm:pt-16 sm:pb-10 md:px-12 lg:px-20"
    >
      <div className="relative z-10 mx-auto grid max-w-2xl gap-8 lg:max-w-7xl lg:grid-cols-[minmax(0,4fr)_minmax(0,6fr)] lg:items-start lg:gap-12 xl:gap-20">
        <div className="lg:pt-5">
          <div id="contact-heading">
            <TextReveal
              as="h2"
              className="font-section-heading max-w-[12ch] text-[clamp(2.75rem,6vw,5.25rem)] leading-[0.98] font-bold tracking-[-0.045em] [&>div:not(:last-child)]:mr-[0.08em]!"
            >
              Tell us about your project.
            </TextReveal>
          </div>
          <p className="font-body-ui mt-4 max-w-[38ch] text-base leading-relaxed text-[#4B5563] sm:mt-6 sm:text-lg">
            Share what you’d like to build and when you’d like to launch. We’ll follow up by email to talk through what you need and put together a quote.
          </p>

          <div className="mt-7 max-w-sm border-t border-black/12 pt-5 sm:mt-9 sm:pt-6">
            <p className="font-body-ui mb-2 text-sm text-[#4B5563]">Prefer email?</p>
            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className="group font-section-heading inline-flex items-center gap-2 text-base font-bold underline decoration-black/30 underline-offset-4 transition-colors hover:decoration-[#536514] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#536514] sm:text-lg"
            >
              {SITE_CONFIG.email}
              <ArrowUpRight size={17} aria-hidden="true" className="shrink-0 transition-transform motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5" />
            </a>
            <p className="font-body-ui mt-4 flex items-center gap-2 text-sm text-[#4B5563]">
              <MapPin size={15} aria-hidden="true" />
              Based in {SITE_CONFIG.location}
            </p>
          </div>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
