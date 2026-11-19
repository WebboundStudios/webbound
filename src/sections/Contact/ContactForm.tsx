'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Select } from '@base-ui/react/select';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { AlertCircle, ArrowUpRight, Check, ChevronDown, Loader2 } from 'lucide-react';
import Lottie from 'lottie-react';
import contactFormAnimation from '../../../public/contact-form.json';

const contactSchema = z.object({
  name: z.string().trim().min(2, 'Enter your name.'),
  email: z.string().trim().email('Enter a valid email address.'),
  company: z.string().trim().optional(),
  budget: z.string().min(1, 'Choose a project type.'),
  message: z.string().trim().min(10, 'Share a little more about your project.'),
});

type ContactFormData = z.infer<typeof contactSchema>;

const PROJECT_TYPES = [
  { label: 'Single-page website', value: 'Single-Page Flagship' },
  { label: 'Website with a CMS', value: 'Dynamic CMS Studio' },
  { label: 'Multi-page studio website', value: 'Multi-Page Spatial Platform' },
  { label: 'Custom web application', value: 'Custom Web Application' },
];

const fieldClassName =
  'font-body-ui block min-h-14 w-full rounded-[0.65rem] border-0 bg-[#FFFEFC] px-4 py-3.5 text-base text-[#0A0A0A] placeholder:text-[#676B60] focus-visible:outline-none! focus-visible:shadow-[inset_0_-2px_0_#42453D]! forced-colors:focus-visible:[outline:2px_solid_CanvasText]!';

interface FieldProps {
  name: keyof ContactFormData;
  label: string;
  optional?: boolean;
  error?: string;
  children: ReactNode;
}

function Field({ name, label, optional, error, children }: FieldProps) {
  return (
    <div className="min-w-0 space-y-2">
      <label id={`contact-${name}-label`} htmlFor={`contact-${name}`} className="font-section-heading flex items-baseline justify-between gap-2 text-[0.9375rem] font-bold">
        {label}
        {optional && <span className="font-body-ui text-xs font-normal text-[#595E54]">Optional</span>}
      </label>
      {children}
      {error && <p id={`contact-${name}-error`} className="font-body-ui text-sm text-[#962D26]">{error}</p>}
    </div>
  );
}

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const submitting = useRef(false);
  const successHeading = useRef<HTMLHeadingElement>(null);
  const {
    control,
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { budget: '' },
  });

  useEffect(() => {
    if (status === 'success') successHeading.current?.focus();
  }, [status]);

  const fieldProps = (name: keyof ContactFormData) => ({
    ...register(name),
    id: `contact-${name}`,
    'aria-invalid': Boolean(errors[name]),
    'aria-describedby': errors[name] ? `contact-${name}-error` : undefined,
  });

  const onSubmit = async (data: ContactFormData) => {
    if (submitting.current) return;
    submitting.current = true;
    setStatus('sending');

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
        reset();
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    } finally {
      submitting.current = false;
    }
  };

  return (
    <div
      id="contact"
      className="min-w-0 scroll-mt-8 text-[#0A0A0A] lg:pt-5"
    >
      <div className="mb-6 sm:mb-7">
        <h3 id="project-inquiry-heading" className="font-section-heading text-2xl leading-none font-bold tracking-[-0.025em] sm:text-3xl">
          Project inquiry
        </h3>
      </div>

      {status === 'success' ? (
        <div className="flex min-h-60 flex-col items-start justify-center gap-4 py-4">
          <div aria-hidden="true" className="size-16 motion-reduce:hidden">
            <Lottie animationData={contactFormAnimation} loop={false} className="size-full" />
          </div>
          <div>
            <h4 ref={successHeading} tabIndex={-1} className="font-section-heading text-2xl font-bold">Inquiry sent</h4>
            <p className="font-body-ui mt-2 text-sm text-[#4B5563]">Thanks for sharing your project. We’ll be in touch by email.</p>
          </div>
          <button
            type="button"
            onClick={() => {
              setStatus('idle');
              requestAnimationFrame(() => setFocus('name'));
            }}
            className="font-body-ui cursor-pointer rounded-sm text-sm font-bold text-[#425110] underline underline-offset-4 hover:text-[#0A0A0A] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#536514]"
          >
            Send another inquiry
          </button>
        </div>
      ) : (
        <form
          aria-labelledby="project-inquiry-heading"
          aria-busy={status === 'sending'}
          noValidate
          onSubmit={(event) => void handleSubmit(onSubmit)(event)}
          className="space-y-5 sm:space-y-6"
        >
          <div className="grid gap-x-5 gap-y-5 sm:grid-cols-2 sm:gap-y-6">
            <Field name="name" label="Full name" error={errors.name?.message}>
              <input {...fieldProps('name')} autoComplete="name" required placeholder="Your name" className={fieldClassName} />
            </Field>

            <Field name="email" label="Email address" error={errors.email?.message}>
              <input {...fieldProps('email')} type="email" autoComplete="email" required placeholder="you@studio.com" className={fieldClassName} />
            </Field>

            <Field name="company" label="Company" optional error={errors.company?.message}>
              <input {...fieldProps('company')} autoComplete="organization" placeholder="Studio or business name" className={fieldClassName} />
            </Field>

            <Field name="budget" label="Project type" error={errors.budget?.message}>
              <Controller
                name="budget"
                control={control}
                render={({ field, fieldState }) => (
                  <Select.Root
                    name={field.name}
                    items={PROJECT_TYPES}
                    value={field.value || null}
                    onValueChange={(value) => field.onChange(value ?? '')}
                    modal={false}
                    required
                  >
                    <Select.Trigger
                      id="contact-budget"
                      ref={field.ref}
                      onBlur={field.onBlur}
                      aria-labelledby="contact-budget-label"
                      aria-invalid={fieldState.invalid}
                      aria-describedby={fieldState.error ? 'contact-budget-error' : undefined}
                      className={`${fieldClassName} group relative cursor-pointer pr-11 text-left data-placeholder:text-[#676B60]`}
                    >
                      <Select.Value placeholder="Choose a project type" />
                      <ChevronDown size={17} aria-hidden="true" className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-[#536514] transition-transform group-data-popup-open:rotate-180" />
                    </Select.Trigger>
                    <Select.Portal>
                      <Select.Positioner align="start" sideOffset={7} alignItemWithTrigger={false} className="z-[60]">
                        <Select.Popup className="w-[var(--anchor-width)] origin-[var(--transform-origin)] rounded-xl bg-[#FFFEFC] p-1.5 shadow-[0_7px_24px_rgba(10,10,10,0.16)] transition-[opacity,translate] duration-150 ease-out data-starting-style:-translate-y-1 data-starting-style:opacity-0 data-ending-style:opacity-0 motion-reduce:transition-none">
                          <Select.List data-lenis-prevent className="max-h-[calc(var(--available-height)-0.75rem)] overflow-y-auto overscroll-contain">
                            {PROJECT_TYPES.map(({ label, value }) => (
                              <Select.Item
                                key={value}
                                value={value}
                                className="font-body-ui grid min-h-11 cursor-pointer grid-cols-[minmax(0,1fr)_1rem] items-center gap-2 rounded-md px-3 py-2 text-sm text-[#0A0A0A] outline-none data-highlighted:bg-[#EFEEE8] data-selected:bg-[#EEF6D4] sm:text-base"
                              >
                                <Select.ItemText>{label}</Select.ItemText>
                                <Select.ItemIndicator className="text-[#536514]">
                                  <Check size={16} aria-hidden="true" />
                                </Select.ItemIndicator>
                              </Select.Item>
                            ))}
                          </Select.List>
                        </Select.Popup>
                      </Select.Positioner>
                    </Select.Portal>
                  </Select.Root>
                )}
              />
            </Field>
          </div>

          <Field name="message" label="About your project" error={errors.message?.message}>
            <textarea
              {...fieldProps('message')}
              rows={4}
              required
              placeholder="Tell us what you’d like to build and when you’d like it ready."
              className={`${fieldClassName} min-h-32 resize-y`}
            />
          </Field>

          {status === 'error' && (
            <p role="alert" className="font-body-ui flex items-start gap-2 rounded-lg border border-[#962D26]/25 bg-[#FFFEFC] px-3 py-2.5 text-sm text-[#962D26]">
              <AlertCircle size={16} aria-hidden="true" className="mt-0.5 shrink-0" />
              Your inquiry couldn’t be sent. Please try again.
            </p>
          )}

          <div className="flex justify-end border-t border-black/16 pt-5 sm:pt-6">
            <button
              type="submit"
              disabled={status === 'sending'}
              className="group font-section-heading flex min-h-13 w-full cursor-pointer items-center justify-between gap-5 rounded-full border border-[#6D8718] bg-[#C5F52A] py-2.5 pr-2.5 pl-5 text-base font-bold text-[#0A0A0A] transition-colors hover:bg-[#D6FA70] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#536514] disabled:cursor-wait disabled:opacity-75 sm:w-auto"
            >
              {status === 'sending' ? 'Sending inquiry' : 'Send inquiry'}
              <span aria-hidden="true" className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#0A0A0A] text-[#C5F52A]">
                {status === 'sending' ? (
                  <Loader2 size={16} className="motion-safe:animate-spin" />
                ) : (
                  <ArrowUpRight size={17} className="transition-transform motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5" />
                )}
              </span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
