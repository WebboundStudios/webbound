'use client';

import React, { useState } from 'react';
import { FAQS } from '@/constants/data';
import { TextReveal } from '@/components/animations/TextReveal';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const FAQ: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('timeline');

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" data-theme-bg="#F5F3EE" className="relative py-32 px-6 md:px-12 lg:px-20 text-[#0A0A0A] transition-colors duration-200">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col space-y-3 mb-16 text-center items-center">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#6B7280]">
            <span className="w-2 h-2 rounded-full bg-[#C5F52A]" />
            <span>TRANSPARENCY & CLARITY</span>
          </div>
          <TextReveal
            as="h2"
            className="font-section-heading text-3xl sm:text-5xl font-bold text-[#0A0A0A] tracking-tight leading-tight max-w-2xl"
          >
            Frequently Asked Questions.
          </TextReveal>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;

            return (
              <div
                key={faq.id}
                className="rounded-2xl bg-white border border-[#0A0A0A]/[0.06] overflow-hidden transition-colors duration-300 hover:border-[#C5F52A]/50"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-section-heading text-lg sm:text-xl font-bold text-[#0A0A0A] hover:text-[#0A0A0A] transition-colors focus:outline-none"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-[#0A0A0A] shrink-0" />
                    <span>{faq.question}</span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-[#6B7280] shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-[#0A0A0A]' : ''
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="p-6 pt-0 font-body-ui text-sm sm:text-base text-[#6B7280] font-light leading-relaxed border-t border-[#0A0A0A]/[0.06] mt-2">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
