const studioDetails = [
  {
    title: 'Custom builds',
    description: 'Built around your content in Next.js, with a CMS so you can publish new projects and update pages yourself.',
  },
  {
    title: 'Motion design',
    description: 'I use animation to guide visitors through galleries and make navigation between pages feel natural.',
  },
  {
    title: 'After launch',
    description: 'The first year includes technical maintenance, copy updates, and uptime monitoring.',
  },
];

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      data-theme-bg="#F5F3EE"
      className="px-6 py-20 text-[#0A0A0A] sm:py-24 md:px-12 lg:px-20 lg:py-28"
    >
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-12 lg:items-end lg:gap-12 xl:gap-16">
        <div className="lg:col-span-7">
          <p className="font-body-ui mb-5 text-sm font-medium text-[#4B5563]">
            About the studio
          </p>
          <h2
            id="about-heading"
            className="font-section-heading max-w-[17ch] text-[clamp(2.5rem,5vw,4.25rem)] leading-[1.02] font-bold tracking-[-0.04em] text-balance"
          >
            <span className="block">Your designer</span>{' '}
            <span className="block">builds your site.</span>
          </h2>
          <p className="font-body-ui mt-6 max-w-[48ch] text-base leading-relaxed text-[#4B5563] sm:text-lg lg:mt-7">
            I design and build websites for architecture studios, interior designers, and brands with work to show.
            We review the design and the live build together before launch.
          </p>
        </div>

        <div className="lg:col-span-5">
          <h3 className="font-section-heading mb-4 text-lg font-bold">What you can expect</h3>
          <dl className="divide-y divide-black/12 border-y border-black/12">
            {studioDetails.map(({ title, description }) => (
              <div key={title} className="grid gap-1.5 py-4 sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-4">
                <dt className="font-section-heading text-base leading-relaxed font-bold">{title}</dt>
                <dd className="font-body-ui text-sm leading-relaxed text-[#4B5563] lg:text-base">{description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
