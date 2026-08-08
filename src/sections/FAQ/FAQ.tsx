'use client';

import React, { useState } from 'react';
import { FAQS } from '@/constants/data';
import { TextReveal } from '@/components/animations/TextReveal';
import { motion, AnimatePresence } from 'framer-motion';

export const FAQ: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('timeline');

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" data-theme-bg="#F5F3EE" className="relative py-32 px-6 md:px-12 lg:px-20 text-[#0A0A0A] transition-colors duration-500">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col space-y-3 mb-16 text-center items-center">
          <div className="flex items-center gap-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#6B7280]">Good to know</span>
          </div>
          <TextReveal
            as="h2"
            className="font-section-heading text-3xl sm:text-5xl font-bold text-[#0A0A0A] tracking-[-0.02em] leading-tight max-w-2xl"
          >
            Frequently Asked Questions.
          </TextReveal>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-px">
          {FAQS.map((faq, idx) => {
            const isOpen = openId === faq.id;

            return (
              <div
                key={faq.id}
                className="bg-white hover:bg-[#FAFAF8] border-b border-[#0A0A0A]/[0.06] first:border-t first:rounded-t-2xl last:rounded-b-2xl overflow-hidden transition-colors duration-300"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 group focus:outline-none"
                >
                  <div className="flex items-start gap-4">
                    <span className="font-mono text-[10px] text-[#0A0A0A]/20 tracking-widest uppercase shrink-0 pt-0.5 transition-all duration-300 group-hover:text-[#C5F52A] group-hover:tracking-[0.2em]">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className="font-section-heading text-base sm:text-lg font-bold text-[#0A0A0A] group-hover:text-[#0A0A0A] transition-colors">
                      {faq.question}
                    </span>
                  </div>
                  {/* +/× expand indicator — a slight overshoot on the turn
                      gives the click a tactile "snap" rather than a linear spin */}
                  <span className={`font-mono text-xl text-[#6B7280] shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] leading-none ${isOpen ? 'rotate-45 text-[#0A0A0A]' : ''}`}>
                    +
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="pl-[3.25rem] pr-6 pb-6 font-body-ui text-sm sm:text-base text-[#6B7280] font-light leading-relaxed">
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