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
          <div className="lg:col-span-5 space-y-6">
            {/* Slanted Physical Studio Sticker */}
            <div className="inline-block transform -rotate-3 hover:rotate-0 transition-transform duration-300 select-none">
              <div className="px-3.5 py-1 rounded-full bg-[#0A0A0A] text-[#C5F52A] font-mono text-[10px] sm:text-[11px] font-bold tracking-widest uppercase shadow-md flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5F52A]" />
                <span>GET IN TOUCH &bull; DIRECT FOUNDER ACCESS</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#0A0A0A]" />
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#6B7280]">
                Start a conversation
              </span>
            </div>

            <TextReveal
              as="h2"
              className="font-hero-display text-4xl sm:text-6xl font-black text-[#0A0A0A] tracking-[-0.035em] leading-[1.02]"
            >
              LET&apos;S BUILD SOMETHING THAT <span className="inline-block text-[#C5F52A] bg-[#0A0A0A] px-2.5 py-0.5 rounded-lg -rotate-1">LASTS</span>.
            </TextReveal>

            <p className="font-body-ui text-base sm:text-lg text-[#6B7280] font-light leading-relaxed">
              Whether you are launching a flagship architectural portal, scaling a luxury studio, or modernizing your web architecture — we build platforms engineered to command authority without rebuilding every year.
            </p>

            <div className="space-y-4 pt-6 border-t border-[#0A0A0A]/[0.08]">
              <div className="group flex items-center gap-3 text-sm text-[#6B7280] w-fit">
                <Mail className="w-4 h-4 text-[#0A0A0A] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-rotate-6 group-hover:scale-110" />
                <a href={`mailto:${SITE_CONFIG.email}`} className="text-[#0A0A0A] hover:text-[#0A0A0A] transition-colors font-bold">
                  <TextRoll>{SITE_CONFIG.email}</TextRoll>
                </a>
              </div>
              <div className="group flex items-center gap-3 text-sm text-[#6B7280] w-fit">
                <MapPin className="w-4 h-4 text-[#0A0A0A] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5" />
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