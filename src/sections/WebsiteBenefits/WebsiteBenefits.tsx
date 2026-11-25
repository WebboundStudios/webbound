export function WebsiteBenefits() {
  return (
    <section
      aria-label="Website editing and hosting"
      data-theme-bg="#C5F52A"
      className="bg-brand-accent px-6 text-[#0A0A0A] md:px-12 lg:px-20"
    >
      <div className="mx-auto grid max-w-7xl divide-y divide-black/25 md:grid-cols-2 md:divide-x md:divide-y-0">
        <div className="py-9 sm:py-12 md:pr-8 lg:pr-14">
          <h2 className="font-section-heading text-[clamp(2rem,4vw,3.5rem)] font-bold leading-none tracking-[-0.04em] text-balance">
            Update your site yourself.
          </h2>
          <p className="mt-4 max-w-[42ch] text-base leading-relaxed sm:text-lg">
            Add projects, swap photos, and edit text without hiring a developer. We’ll show you how at handover.
          </p>
        </div>
        <div className="py-9 sm:py-12 md:pl-8 lg:pl-14">
          <h2 className="font-section-heading text-[clamp(2rem,4vw,3.5rem)] font-bold leading-none tracking-[-0.04em] text-balance">
            Keep running costs low.
          </h2>
          <p className="mt-4 max-w-[42ch] text-base leading-relaxed sm:text-lg">
            We use free hosting when it fits. For a simple site, your website address may be your only recurring cost.
          </p>
        </div>
      </div>
    </section>
  );
}
