'use client';

import { useEffect, useRef, useState, useSyncExternalStore, type ChangeEvent, type FormEvent, type ReactNode } from 'react';
import dynamic from 'next/dynamic';
import { Select } from '@base-ui/react/select';
import { AlertCircle, ArrowUpRight, Check, ChevronDown, Loader2 } from 'lucide-react';

const InquirySuccessAnimation = dynamic(() => import('./InquirySuccessAnimation'), { ssr: false });

const PROJECT_TYPES = [
  { label: 'Single-page website', value: 'Single-Page Flagship' },
  { label: 'Website with a CMS', value: 'Dynamic CMS Studio' },
  { label: 'Multi-page studio website', value: 'Multi-Page Spatial Platform' },
  { label: 'Custom web application', value: 'Custom Web Application' },
];

const fieldNames = ['name', 'email', 'company', 'budget', 'message'] as const;
type FieldName = (typeof fieldNames)[number];
type FieldErrors = Partial<Record<FieldName, string>>;

const emailPattern = /^(?!\.)(?!.*\.\.)[A-Za-z0-9_'+.-]*[A-Za-z0-9_+-]@(?:[A-Za-z0-9][A-Za-z0-9-]*\.)+[A-Za-z]{2,}$/;
const fieldError: Record<FieldName, (value: string) => string | undefined> = {
  name: (value) => value.length < 2 ? 'Enter your name.' : undefined,
  email: (value) => emailPattern.test(value) ? undefined : 'Enter a valid email address.',
  company: () => undefined,
  budget: (value) => PROJECT_TYPES.some((project) => project.value === value) ? undefined : 'Choose a project type.',
  message: (value) => value.length < 10 ? 'Share a little more about your project.' : undefined,
};

const formEndpoint = 'https://formspree.io/f/' + (process.env.NEXT_PUBLIC_FORMSPREE_ID || 'mdaqlpza');

const fieldClassName =
  'font-body-ui block min-h-14 w-full rounded-[0.65rem] border-0 bg-[#FFFEFC] px-4 py-3.5 text-base text-[#0A0A0A] placeholder:text-[#676B60] focus-visible:outline-none! focus-visible:shadow-[inset_0_-2px_0_#42453D]! forced-colors:focus-visible:[outline:2px_solid_CanvasText]!';

const mouseQuery = '(any-pointer: fine)';
function subscribeToMouse(change: () => void) {
  const media = window.matchMedia(mouseQuery);
  media.addEventListener('change', change);
  return () => media.removeEventListener('change', change);
}

function ProjectTypeSelect({ error, onChange }: { error?: string; onChange: (value: string) => void }) {
  const hasMouse = useSyncExternalStore(subscribeToMouse, () => window.matchMedia(mouseQuery).matches, () => false);
  const [value, setValue] = useState('');
  const props = {
    id: 'contact-budget',
    'aria-invalid': Boolean(error),
    'aria-describedby': error ? 'contact-budget-error' : undefined,
  };
  function choose(next: string | null) {
    setValue(next ?? '');
    onChange(next ?? '');
  }
  const chevron = <ChevronDown size={17} aria-hidden="true" className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-[#536514]" />;
  if (!hasMouse) {
    return (
      <div className="relative">
        <select {...props} name="budget" required value={value} onChange={event => choose(event.target.value)} className={fieldClassName + ' appearance-none pr-11 invalid:text-[#676B60]'}>
          <option value="" disabled>Choose a project type</option>
          {PROJECT_TYPES.map(({ label, value }) => <option key={value} value={value}>{label}</option>)}
        </select>
        {chevron}
      </div>
    );
  }
  return (
    <Select.Root name="budget" required modal={false} items={PROJECT_TYPES} value={value || null} onValueChange={choose}>
      <Select.Trigger {...props} className={fieldClassName + ' relative pr-11 text-left'}>
        <Select.Value placeholder="Choose a project type" className="data-placeholder:text-[#676B60]" />
        {chevron}
      </Select.Trigger>
      <Select.Positioner positionMethod="fixed" alignItemWithTrigger={false} sideOffset={4} className="z-50 w-[var(--anchor-width)]">
        <Select.Popup data-lenis-prevent className="max-h-[var(--available-height)] overflow-auto rounded-lg border border-black/15 bg-[#FFFEFC] p-1 shadow-lg">
          <Select.List>
            {PROJECT_TYPES.map(({ label, value }) => (
              <Select.Item key={value} value={value} className="flex min-h-10 items-center justify-between gap-3 rounded-md px-3 text-sm text-[#0A0A0A] select-none data-highlighted:bg-[#EAF3D1]">
                <Select.ItemText>{label}</Select.ItemText>
                <Select.ItemIndicator><Check size={15} aria-hidden="true" /></Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.List>
        </Select.Popup>
      </Select.Positioner>
    </Select.Root>
  );
}

interface FieldProps {
  name: FieldName;
  label: string;
  optional?: boolean;
  error?: string;
  children: ReactNode;
}

function Field({ name, label, optional, error, children }: FieldProps) {
  return (
    <div className="min-w-0 space-y-2">
      <label htmlFor={'contact-' + name} className="font-section-heading flex items-baseline justify-between gap-2 text-[0.9375rem] font-bold">
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
  const [errors, setErrors] = useState<FieldErrors>({});
  const submitting = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);
  const successHeading = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (status === 'success') successHeading.current?.focus();
  }, [status]);

  function validateChange(name: FieldName, value: string) {
    if (errors[name]) setErrors(current => ({ ...current, [name]: fieldError[name](value.trim()) }));
  }

  const fieldProps = (name: FieldName) => ({
    name,
    id: 'contact-' + name,
    'aria-invalid': Boolean(errors[name]),
    'aria-describedby': errors[name] ? 'contact-' + name + '-error' : undefined,
    onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => validateChange(name, event.currentTarget.value),
  });

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    const form = event.currentTarget;
    const formData = new FormData(form);
    const data: Record<FieldName, string> = {
      name: String(formData.get('name') ?? '').trim(),
      email: String(formData.get('email') ?? '').trim(),
      company: String(formData.get('company') ?? '').trim(),
      budget: String(formData.get('budget') ?? '').trim(),
      message: String(formData.get('message') ?? '').trim(),
    };
    const invalidFields: FieldErrors = {};
    for (const name of fieldNames) {
      const error = fieldError[name](data[name]);
      if (error) invalidFields[name] = error;
    }
    setErrors(invalidFields);
    const firstInvalid = fieldNames.find((name) => invalidFields[name]);
    if (firstInvalid) {
      requestAnimationFrame(() => form.querySelector<HTMLElement>('#contact-' + firstInvalid)?.focus());
      return;
    }

    submitting.current = true;
    setStatus('sending');

    try {
      const response = await fetch(formEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(data),
      });

      setStatus(response.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    } finally {
      submitting.current = false;
    }
  }

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
            <InquirySuccessAnimation />
          </div>
          <div>
            <h4 ref={successHeading} tabIndex={-1} className="font-section-heading text-2xl font-bold">Inquiry sent</h4>
            <p className="font-body-ui mt-2 text-sm text-[#4B5563]">Thanks for sharing your project. We’ll be in touch by email.</p>
          </div>
          <button
            type="button"
            onClick={() => {
              setStatus('idle');
              requestAnimationFrame(() => formRef.current?.querySelector<HTMLInputElement>('#contact-name')?.focus());
            }}
            className="font-body-ui cursor-pointer rounded-sm text-sm font-bold text-[#425110] underline underline-offset-4 hover:text-[#0A0A0A] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#536514]"
          >
            Send another inquiry
          </button>
        </div>
      ) : (
        <form
          ref={formRef}
          action={formEndpoint}
          method="post"
          aria-labelledby="project-inquiry-heading"
          aria-busy={status === 'sending'}
          noValidate
          onSubmit={(event) => void onSubmit(event)}
          className="space-y-5 sm:space-y-6"
        >
          <div className="grid gap-x-5 gap-y-5 sm:grid-cols-2 sm:gap-y-6">
            <Field name="name" label="Full name" error={errors.name}>
              <input {...fieldProps('name')} autoComplete="name" required placeholder="Your name" className={fieldClassName} />
            </Field>

            <Field name="email" label="Email address" error={errors.email}>
              <input {...fieldProps('email')} type="email" autoComplete="email" required placeholder="you@studio.com" className={fieldClassName} />
            </Field>

            <Field name="company" label="Company" optional>
              <input {...fieldProps('company')} autoComplete="organization" placeholder="Studio or business name" className={fieldClassName} />
            </Field>

            <Field name="budget" label="Project type" error={errors.budget}>
              <ProjectTypeSelect error={errors.budget} onChange={value => validateChange('budget', value)} />
            </Field>
          </div>

          <Field name="message" label="About your project" error={errors.message}>
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
