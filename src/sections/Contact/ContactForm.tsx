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
      budget: 'Type 1: Single-Page Static Site (₹8,000 – ₹9,000)',
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
    <div id="contact" className="w-full max-w-2xl mx-auto p-8 sm:p-12 rounded-3xl bg-white border border-[#0A0A0A]/[0.08] shadow-md space-y-8">
      <div>
        <h3 className="font-section-heading text-2xl sm:text-3xl font-bold text-[#0A0A0A]">
          Initiate Project Inquiry
        </h3>
        <p className="font-body-ui text-sm text-[#6B7280] mt-2 font-light">
          Tell me about your brand vision, target launch timeline, and package preference.
        </p>
      </div>

      {status === 'success' ? (
        <div className="p-8 rounded-2xl bg-[#C5F52A]/20 border border-[#0A0A0A]/10 text-center space-y-4">
          <CheckCircle2 className="w-12 h-12 text-[#0A0A0A] mx-auto" />
          <h4 className="font-hero-display text-2xl font-bold text-[#0A0A0A]">Inquiry Received</h4>
          <p className="font-body-ui text-sm text-[#6B7280]">
            Thank you for reaching out. I will review your inquiry and contact you within 24 hours.
          </p>
          <button
            onClick={() => setStatus('idle')}
            className="px-6 py-2 rounded-full bg-[#0A0A0A] text-white text-xs font-mono hover:bg-[#1a1a1a] transition-colors"
          >
            Send Another Inquiry
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name & Email Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase text-[#0A0A0A] font-bold block">
                YOUR NAME *
              </label>
              <input
                {...register('name')}
                placeholder="Ananya Singhania"
                className="w-full px-4 py-3.5 rounded-xl bg-[#F5F3EE] border border-[#0A0A0A]/10 text-[#0A0A0A] font-body-ui text-sm focus:border-[#0A0A0A] focus:ring-1 focus:ring-[#0A0A0A] transition-all placeholder-[#9CA3AF]"
              />
              {errors.name && (
                <p className="text-xs text-red-600 font-mono">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono uppercase text-[#0A0A0A] font-bold block">
                EMAIL ADDRESS *
              </label>
              <input
                {...register('email')}
                type="email"
                placeholder="ananya@brand.in"
                className="w-full px-4 py-3.5 rounded-xl bg-[#F5F3EE] border border-[#0A0A0A]/10 text-[#0A0A0A] font-body-ui text-sm focus:border-[#0A0A0A] focus:ring-1 focus:ring-[#0A0A0A] transition-all placeholder-[#9CA3AF]"
              />
              {errors.email && (
                <p className="text-xs text-red-600 font-mono">{errors.email.message}</p>
              )}
            </div>
          </div>

          {/* Company & Budget Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase text-[#0A0A0A] font-bold block">
                COMPANY / ORGANISATION
              </label>
              <input
                {...register('company')}
                placeholder="Vedic Couture / ZenoPay"
                className="w-full px-4 py-3.5 rounded-xl bg-[#F5F3EE] border border-[#0A0A0A]/10 text-[#0A0A0A] font-body-ui text-sm focus:border-[#0A0A0A] focus:ring-1 focus:ring-[#0A0A0A] transition-all placeholder-[#9CA3AF]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono uppercase text-[#0A0A0A] font-bold block">
                PACKAGE & BUDGET TIER *
              </label>
              <select
                {...register('budget')}
                className="w-full pl-3.5 pr-9 py-3.5 rounded-xl bg-[#F5F3EE] border border-[#0A0A0A]/10 text-[#0A0A0A] font-body-ui text-xs sm:text-sm focus:border-[#0A0A0A] focus:ring-1 focus:ring-[#0A0A0A] transition-all appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%230A0A0A%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:9px_9px] bg-[right_12px_center] bg-no-repeat cursor-pointer"
              >
                <option value="Type 1: Single-Page Static Site (₹8,000 – ₹9,000)">Type 1: Single Page (₹8K – ₹9K)</option>
                <option value="Type 2: Single-Page Dynamic CMS Site (₹12,000 – ₹15,000)">Type 2: Single Page CMS (₹12K – ₹15K)</option>
                <option value="Type 3: Multi-Page Dynamic CMS Platform (₹17,000 – ₹20,000)">Type 3: Multi Page CMS (₹17K – ₹20K)</option>
                <option value="Type 4: Custom Full-Stack Web Application (Custom Quote)">Type 4: Full Stack App (Custom Quote)</option>
              </select>
            </div>
          </div>

          {/* Message textarea */}
          <div className="space-y-2">
            <label className="text-xs font-mono uppercase text-[#0A0A0A] font-bold block">
              PROJECT OVERVIEW & GOALS *
            </label>
            <textarea
              {...register('message')}
              rows={4}
              placeholder="Describe your brand, desired launch timeline, custom animation ideas, or specific technical requirements..."
              className="w-full px-4 py-3.5 rounded-xl bg-[#F5F3EE] border border-[#0A0A0A]/10 text-[#0A0A0A] font-body-ui text-sm focus:border-[#0A0A0A] focus:ring-1 focus:ring-[#0A0A0A] transition-all resize-none placeholder-[#9CA3AF]"
            />
            {errors.message && (
              <p className="text-xs text-red-600 font-mono">{errors.message.message}</p>
            )}
          </div>

          {status === 'error' && (
            <div className="flex items-center gap-2 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-600 font-mono">
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
                <Loader2 className="w-5 h-5 animate-spin text-[#0A0A0A]" />
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
