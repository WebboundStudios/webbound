'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { MagneticButton } from '@/components/animations/MagneticButton';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  company: z.string().optional(),
  budget: z.string().min(1, 'Please select a budget range'),
  message: z.string().min(10, 'Project description must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export const ContactForm: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      budget: '₹1.5 Lakhs - ₹3 Lakhs',
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setStatus('submitting');
    setErrorMessage('');

    try {
      const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID || 'xpznqgve';
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
    <div id="contact" className="w-full max-w-2xl mx-auto p-8 sm:p-12 rounded-3xl bg-[#141414] border border-white/[0.08] shadow-2xl space-y-8">
      <div>
        <h3 className="font-section-heading text-2xl sm:text-3xl font-bold text-white">
          Initiate Project Inquiry
        </h3>
        <p className="font-body-ui text-sm text-[#9CA3AF] mt-2 font-light">
          Tell us about your brand vision, target launch timeline, and interactive requirements.
        </p>
      </div>

      {status === 'success' ? (
        <div className="p-8 rounded-2xl bg-[#C5F52A]/10 border border-[#C5F52A]/30 text-center space-y-4">
          <CheckCircle2 className="w-12 h-12 text-[#C5F52A] mx-auto" />
          <h4 className="font-hero-display text-2xl font-bold text-white">Inquiry Received</h4>
          <p className="font-body-ui text-sm text-[#9CA3AF]">
            Thank you for reaching out. A Webbound Studios partner will review your inquiry and contact you within 24 business hours.
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

          {/* Company & Budget Row */}
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

            <div className="space-y-2">
              <label className="text-xs font-mono uppercase text-[#9CA3AF] block">
                ESTIMATED BUDGET (INR) *
              </label>
              <select
                {...register('budget')}
                className="w-full px-4 py-3.5 rounded-xl bg-[#0A0A0A] border border-white/10 text-white font-body-ui text-sm focus:border-[#C5F52A] focus:ring-1 focus:ring-[#C5F52A] transition-all"
              >
                <option value="₹75,000 - ₹1.5 Lakhs">₹75,000 - ₹1.5 Lakhs</option>
                <option value="₹1.5 Lakhs - ₹3 Lakhs">₹1.5 Lakhs - ₹3 Lakhs</option>
                <option value="₹3 Lakhs - ₹5 Lakhs">₹3 Lakhs - ₹5 Lakhs</option>
                <option value="₹5 Lakhs+">₹5 Lakhs+</option>
              </select>
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
                <span>SEND PROJECT INQUIRY</span>
                <Send className="w-4 h-4 ml-1" />
              </>
            )}
          </MagneticButton>
        </form>
      )}
    </div>
  );
};
