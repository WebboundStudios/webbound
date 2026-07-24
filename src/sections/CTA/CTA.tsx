'use client';

import React from 'react';
import { TextReveal } from '@/components/animations/TextReveal';
import { TextRoll } from '@/components/animations/TextRoll';
import { ContactForm } from '@/sections/Contact/ContactForm';
import { Mail, MapPin } from 'lucide-react';
import { SITE_CONFIG } from '@/constants/data';
import { TiltedMarquee } from '@/components/animations/TiltedMarquee';

export const CTA: React.FC = () => {
  return (
    <section id="cta" data-theme-bg="#F5F3EE" className="relative bg-[#F5F3EE] py-20 sm:py-28 px-6 md:px-12 lg:px-20 text-[#0A0A0A] overflow-hidden transition-colors duration-200">
      {/* Tilted Neon Email Marquee Banner */}
      <TiltedMarquee className="-mt-8 mb-16 sm:mb-24" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left Pitch Column (5 Cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="flex items-center gap-4">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#6B7280]">Start a conversation</span>
            </div>

            <TextReveal
              as="h2"
              className="font-hero-display text-4xl sm:text-6xl font-black text-[#0A0A0A] tracking-tight leading-[1.05]"
            >
              READY TO BUILD A <span className="underline decoration-[#C5F52A] decoration-4">FLAGSHIP</span> SITE?
            </TextReveal>

            <p className="font-body-ui text-base sm:text-lg text-[#6B7280] font-light leading-relaxed">
              Whether you are launching a flagship brand, releasing a venture-backed platform, or seeking a complete digital transformation — I engineer websites that command attention.
            </p>

            <div className="space-y-4 pt-6 border-t border-[#0A0A0A]/[0.08]">
              <div className="flex items-center gap-3 text-sm text-[#6B7280]">
                <Mail className="w-4 h-4 text-[#0A0A0A]" />
                <a href={`mailto:${SITE_CONFIG.email}`} className="text-[#0A0A0A] hover:text-[#0A0A0A] transition-colors font-bold">
                  <TextRoll>{SITE_CONFIG.email}</TextRoll>
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm text-[#6B7280]">
                <MapPin className="w-4 h-4 text-[#0A0A0A]" />
                <span className="font-medium text-[#0A0A0A]">{SITE_CONFIG.location}</span>
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
