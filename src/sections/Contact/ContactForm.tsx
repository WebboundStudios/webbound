'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { MagneticButton } from '@/components/animations/MagneticButton';
import { TextRoll } from '@/components/animations/TextRoll';
import { Send, CheckCircle2, AlertCircle, Loader2, ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import Lottie from 'lottie-react';
import contactFormAnimation from '../../../public/contact-form.json';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  company: z.string().optional(),
  budget: z.string().min(1, 'Please select a package tier'),
  message: z.string().min(10, 'Project description must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

const BUDGET_OPTIONS = [
  { label: 'Type 1: Single-Page Business Website', value: 'Type 1: Single-Page Business Website' },
  { label: 'Type 2: Dynamic CMS Website', value: 'Type 2: Dynamic CMS Website' },
  { label: 'Type 3: Premium CMS Platform', value: 'Type 3: Premium CMS Platform' },
  { label: 'Type 4: Custom Full-Stack Web Application', value: 'Type 4: Custom Full-Stack Web Application' },
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
        <h3 className="font-section-heading text-2xl sm:text-3xl font-bold text-white tracking-[-0.01em]">
          Initiate Project Inquiry
        </h3>
        <p className="font-body-ui text-sm text-[#9CA3AF] mt-2 font-light">
          Tell me about your brand vision, target launch timeline, and package preference.
        </p>
      </div>

      {status === 'success' ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center py-6 text-center relative overflow-hidden"
        >
          {/* Paper plane Lottie animation with flight path matching reference */}
          <motion.div
            animate={{ 
              x: [0, -15, 400, 1200],
              y: [0, 15, -400, -1200],
              scale: [1, 1.05, 0.7, 0.3],
              opacity: [1, 1, 0.8, 0]
            }}
            transition={{
              delay: 1.5,
              duration: 1.2,
              ease: [0.25, 0.1, 0.25, 1]
            }}
            className="w-48 h-48 sm:w-56 sm:h-56 mx-auto"
          >
            <Lottie
              animationData={contactFormAnimation}
              loop={false}
              className="w-full h-full"
            />
          </motion.div>
          
          {/* Staggered text reveal after flight animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2, duration: 0.5 }}
            className="space-y-4 mt-2"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C5F52A]/10 border border-[#C5F52A]/30 text-[#C5F52A] font-mono text-xs font-semibold uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4 text-[#C5F52A]" />
              <span>INQUIRY DELIVERED</span>
            </div>

            <h3 className="font-section-heading text-3xl sm:text-4xl font-bold text-white tracking-tight">Message Sent!</h3>
            <p className="font-body-ui text-sm sm:text-base text-[#9CA3AF] max-w-md mx-auto font-light leading-relaxed">
              Thank you for reaching out. The paper plane has left the hangar, and I'll review your project requirements and respond within 24 hours!
            </p>

            <div className="pt-3">
              <button
                onClick={() => setStatus('idle')}
                className="px-6 py-2.5 rounded-full bg-white/10 border border-white/15 text-xs font-mono text-white hover:bg-[#C5F52A] hover:text-[#0A0A0A] hover:border-[#C5F52A] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer shadow-lg active:scale-90"
              >
                Send Another Inquiry
              </button>
            </div>
          </motion.div>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Hidden input for RHF validation */}
          <input type="hidden" {...register('budget')} />

          {/* Name & Email Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-[0.08em] text-[#9CA3AF] block">
                YOUR NAME *
              </label>
              <input
                {...register('name')}
                placeholder="Ananya Singhania"
                className="w-full px-4 py-3.5 rounded-xl bg-[#0A0A0A] border border-white/10 text-white font-body-ui text-sm focus:border-[#C5F52A] focus:ring-1 focus:ring-[#C5F52A] focus:-translate-y-0.5 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
              />
              {errors.name && (
                <p className="text-xs text-red-400 font-mono">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-[0.08em] text-[#9CA3AF] block">
                EMAIL ADDRESS *
              </label>
              <input
                {...register('email')}
                type="email"
                placeholder="ananya@brand.in"
                className="w-full px-4 py-3.5 rounded-xl bg-[#0A0A0A] border border-white/10 text-white font-body-ui text-sm focus:border-[#C5F52A] focus:ring-1 focus:ring-[#C5F52A] focus:-translate-y-0.5 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
              />
              {errors.email && (
                <p className="text-xs text-red-400 font-mono">{errors.email.message}</p>
              )}
            </div>
          </div>

          {/* Company & Custom Dropdown Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-[0.08em] text-[#9CA3AF] block">
                COMPANY / ORGANISATION
              </label>
              <input
                {...register('company')}
                placeholder="Vedic Couture / ZenoPay"
                className="w-full px-4 py-3.5 rounded-xl bg-[#0A0A0A] border border-white/10 text-white font-body-ui text-sm focus:border-[#C5F52A] focus:ring-1 focus:ring-[#C5F52A] focus:-translate-y-0.5 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
              />
            </div>

            {/* Custom Stylish Dropdown */}
            <div className="space-y-2 relative" ref={dropdownRef}>
              <label className="text-xs font-mono uppercase tracking-[0.08em] text-[#9CA3AF] block">
                PACKAGE & SERVICE TIER *
              </label>

              {/* Trigger Button */}
              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className={`w-full px-4 py-3.5 rounded-xl bg-[#0A0A0A] border text-left flex items-center justify-between text-xs sm:text-sm font-body-ui transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  dropdownOpen ? 'border-[#C5F52A] ring-1 ring-[#C5F52A] text-white -translate-y-0.5' : 'border-white/10 text-white hover:border-white/25'
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
                          className={`flex items-center justify-between px-3.5 py-3 rounded-xl cursor-pointer text-xs font-mono transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:translate-x-1 ${
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
            <label className="text-xs font-mono uppercase tracking-[0.08em] text-[#9CA3AF] block">
              PROJECT OVERVIEW & GOALS *
            </label>
            <textarea
              {...register('message')}
              rows={4}
              placeholder="Describe your brand, desired launch timeline, custom animation ideas, or specific technical requirements..."
              className="w-full px-4 py-3.5 rounded-xl bg-[#0A0A0A] border border-white/10 text-white font-body-ui text-sm focus:border-[#C5F52A] focus:ring-1 focus:ring-[#C5F52A] focus:-translate-y-0.5 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] resize-none"
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