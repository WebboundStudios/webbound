'use client';

import React from 'react';
import { TextReveal } from '@/components/animations/TextReveal';
import { ContactForm } from '@/sections/Contact/ContactForm';
import { Mail, MapPin } from 'lucide-react';
import { SITE_CONFIG } from '@/constants/data';
import { TiltedMarquee } from '@/components/animations/TiltedMarquee';

export const CTA: React.FC = () => {
  return (
    <section id="cta" data-theme-bg="#0A0A0A" className="relative py-20 sm:py-28 px-6 md:px-12 lg:px-20 text-white overflow-hidden transition-colors duration-500">
      {/* Tilted Neon Email Marquee Banner */}
      <TiltedMarquee className="-mt-8 mb-16 sm:mb-24" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left Pitch Column (5 Cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#C5F52A]">
              <span className="w-2 h-2 rounded-full bg-[#C5F52A]" />
              <span>LET&apos;S CRAFT SOMETHING LEGENDARY</span>
            </div>

            <TextReveal
              as="h2"
              className="font-hero-display text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.05]"
            >
              READY TO BUILD A <span className="text-[#C5F52A]">FLAGSHIP</span> SITE?
            </TextReveal>

            <p className="font-body-ui text-base sm:text-lg text-[#9CA3AF] font-light leading-relaxed">
              Whether you are launching a flagship brand, releasing a venture-backed platform, or seeking a complete digital transformation — I engineer websites that command attention.
            </p>

            <div className="space-y-4 pt-6 border-t border-white/10">
              <div className="flex items-center gap-3 text-sm text-[#9CA3AF]">
                <Mail className="w-4 h-4 text-[#C5F52A]" />
                <a href={`mailto:${SITE_CONFIG.email}`} className="text-white hover:text-[#C5F52A] transition-colors font-semibold">
                  {SITE_CONFIG.email}
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm text-[#9CA3AF]">
                <MapPin className="w-4 h-4 text-[#C5F52A]" />
                <span>{SITE_CONFIG.location}</span>
              </div>
            </div>
          </div>

          {/* Right Contact Form Column (7 Cols) */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
};
