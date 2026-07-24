'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { MagneticButton } from '@/components/animations/MagneticButton';
import { TextRoll } from '@/components/animations/TextRoll';
import { Send, CheckCircle2, AlertCircle, Loader2, ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  company: z.string().optional(),
  budget: z.string().min(1, 'Please select a package range'),
  message: z.string().min(10, 'Project description must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

const BUDGET_OPTIONS = [
  { label: 'Type 1: Single Page (₹8K – ₹9K)', value: 'Type 1: Single-Page Static Site (₹8,000 – ₹9,000)' },
  { label: 'Type 2: Single Page CMS (₹12K – ₹15K)', value: 'Type 2: Single-Page Dynamic CMS Site (₹12,000 – ₹15,000)' },
  { label: 'Type 3: Multi Page CMS (₹17K – ₹20K)', value: 'Type 3: Multi-Page Dynamic CMS Platform (₹17,000 – ₹20,000)' },
  { label: 'Type 4: Full Stack App (Custom Quote)', value: 'Type 4: Custom Full-Stack Web Application (Custom Quote)' },
];

export const ContactForm: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState(BUDGET_OPTIONS[0]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      budget: BUDGET_OPTIONS[0].value,
    },
  });

  // Close custom dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectOption = (option: typeof BUDGET_OPTIONS[0]) => {
    setSelectedBudget(option);
    setValue('budget', option.value, { shouldValidate: true });
    setDropdownOpen(false);
  };

  const onSubmit = async (data: ContactFormData) => {
    setStatus('submitting');
    setErrorMessage('');

    try {
      const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID || 'mdaqlpza';
      const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus('success');
        reset();
      } else {
        throw new Error('Failed to submit form. Please try again later.');
      }
    } catch (err: unknown) {
      console.error('Form submission error:', err);
      setStatus('error');
      setErrorMessage((err as Error).message || 'An error occurred during submission.');
    }
  };

  return (
    <div id="contact" className="w-full max-w-2xl mx-auto p-7 sm:p-10 rounded-[1.25rem] bg-[#151513] border border-white/[0.12] shadow-[0_24px_80px_rgba(10,10,10,0.18)] space-y-8">
      <div>
        <h3 className="font-section-heading text-2xl sm:text-3xl font-bold text-white">
          Initiate Project Inquiry
        </h3>
        <p className="font-body-ui text-sm text-[#9CA3AF] mt-2 font-light">
          Tell me about your brand vision, target launch timeline, and package preference.
        </p>
      </div>

      {status === 'success' ? (
        <div className="p-8 rounded-2xl bg-[#C5F52A]/10 border border-[#C5F52A]/30 text-center space-y-4">
          <CheckCircle2 className="w-12 h-12 text-[#C5F52A] mx-auto" />
          <h4 className="font-hero-display text-2xl font-bold text-white">Inquiry Received</h4>
          <p className="font-body-ui text-sm text-[#9CA3AF]">
            Thank you for reaching out. I will review your inquiry and contact you within 24 hours.
          </p>
          <button
            onClick={() => setStatus('idle')}
            className="px-6 py-2 rounded-full bg-[#0A0A0A] border border-white/20 text-xs font-mono text-white hover:border-[#C5F52A] transition-colors"
          >
            Send Another Inquiry
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Hidden input for RHF validation */}
          <input type="hidden" {...register('budget')} />

          {/* Name & Email Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase text-[#9CA3AF] block">
                YOUR NAME *
              </label>
              <input
                {...register('name')}
                placeholder="Ananya Singhania"
                className="w-full px-4 py-3.5 rounded-xl bg-[#0A0A0A] border border-white/10 text-white font-body-ui text-sm focus:border-[#C5F52A] focus:ring-1 focus:ring-[#C5F52A] transition-all"
              />
              {errors.name && (
                <p className="text-xs text-red-400 font-mono">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono uppercase text-[#9CA3AF] block">
                EMAIL ADDRESS *
              </label>
              <input
                {...register('email')}
                type="email"
                placeholder="ananya@brand.in"
                className="w-full px-4 py-3.5 rounded-xl bg-[#0A0A0A] border border-white/10 text-white font-body-ui text-sm focus:border-[#C5F52A] focus:ring-1 focus:ring-[#C5F52A] transition-all"
              />
              {errors.email && (
                <p className="text-xs text-red-400 font-mono">{errors.email.message}</p>
              )}
            </div>
          </div>

          {/* Company & Custom Dropdown Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase text-[#9CA3AF] block">
                COMPANY / ORGANISATION
              </label>
              <input
                {...register('company')}
                placeholder="Vedic Couture / ZenoPay"
                className="w-full px-4 py-3.5 rounded-xl bg-[#0A0A0A] border border-white/10 text-white font-body-ui text-sm focus:border-[#C5F52A] focus:ring-1 focus:ring-[#C5F52A] transition-all"
              />
            </div>

            {/* Custom Stylish Dropdown */}
            <div className="space-y-2 relative" ref={dropdownRef}>
              <label className="text-xs font-mono uppercase text-[#9CA3AF] block">
                PACKAGE & BUDGET TIER *
              </label>

              {/* Trigger Button */}
              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className={`w-full px-4 py-3.5 rounded-xl bg-[#0A0A0A] border text-left flex items-center justify-between text-xs sm:text-sm font-body-ui transition-all ${
                  dropdownOpen ? 'border-[#C5F52A] ring-1 ring-[#C5F52A] text-white' : 'border-white/10 text-white hover:border-white/25'
                }`}
              >
                <span className="truncate pr-2 font-medium">{selectedBudget.label}</span>
                <ChevronDown className={`w-4 h-4 text-[#C5F52A] shrink-0 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Options Popover */}
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.98 }}
                    transition={{ duration: 0.15, ease: 'easeOut' }}
                    className="absolute top-full left-0 right-0 mt-2 z-50 p-1.5 rounded-2xl bg-[#1A1A1A] border border-white/15 shadow-2xl space-y-1"
                  >
                    {BUDGET_OPTIONS.map((opt) => {
                      const isSelected = selectedBudget.value === opt.value;
                      return (
                        <div
                          key={opt.value}
                          onClick={() => handleSelectOption(opt)}
                          className={`flex items-center justify-between px-3.5 py-3 rounded-xl cursor-pointer text-xs font-mono transition-all ${
                            isSelected
                              ? 'bg-[#C5F52A] text-[#0A0A0A] font-bold'
                              : 'text-white/80 hover:bg-white/10 hover:text-white font-medium'
                          }`}
                        >
                          <span className="truncate pr-2">{opt.label}</span>
                          {isSelected && <Check className="w-4 h-4 text-[#0A0A0A] shrink-0" />}
                        </div>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Message textarea */}
          <div className="space-y-2">
            <label className="text-xs font-mono uppercase text-[#9CA3AF] block">
              PROJECT OVERVIEW & GOALS *
            </label>
            <textarea
              {...register('message')}
              rows={4}
              placeholder="Describe your brand, desired launch timeline, custom animation ideas, or specific technical requirements..."
              className="w-full px-4 py-3.5 rounded-xl bg-[#0A0A0A] border border-white/10 text-white font-body-ui text-sm focus:border-[#C5F52A] focus:ring-1 focus:ring-[#C5F52A] transition-all resize-none"
            />
            {errors.message && (
              <p className="text-xs text-red-400 font-mono">{errors.message.message}</p>
            )}
          </div>

          {status === 'error' && (
            <div className="flex items-center gap-2 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-400 font-mono">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <MagneticButton
            variant="primary"
            size="lg"
            type="submit"
            disabled={status === 'submitting'}
            className="w-full"
          >
            {status === 'submitting' ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>SUBMITTING INQUIRY...</span>
              </>
            ) : (
              <>
                <TextRoll center>SEND PROJECT INQUIRY</TextRoll>
                <Send className="w-4 h-4 ml-1" />
              </>
            )}
          </MagneticButton>
        </form>
      )}
    </div>
  );
};
