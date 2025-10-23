"use client";
import React from 'react';
import type { RootDict } from '@/types/i18n';
import { motion } from 'framer-motion';
import { isValidEmail, postToProxy } from '@/lib/forms';

export default function ContactForm({ dict }: { dict: RootDict }) {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [message, setMessage] = React.useState('');
  // Form submission status
  const [status, setStatus] = React.useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  // Generic form-level error message (network/server)
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);
  // Per-field validation messages (displayed under the affected field)
  const [fieldErrors, setFieldErrors] = React.useState<{ name?: string; email?: string; message?: string }>({});
  // Track which input is focused to apply the subtle glowing border
  const [focusedField, setFocusedField] = React.useState<string | null>(null);
  // Shake animation trigger when validation fails
  const [shake, setShake] = React.useState(false);
  // Honeypot field to deter bots — kept out of sight for users
  const [hp, setHp] = React.useState('');

  const reset = () => {
    setName('');
    setEmail('');
    setMessage('');
  };

  // Prevent double submissions by disabling the button while sending
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg(null);
    if (status === 'sending') return; // simple debounce

    // Clear previous field errors
    setFieldErrors({});

    // Validate required fields
    const errors: { name?: string; email?: string; message?: string } = {};
    if (!name.trim()) errors.name = 'Please provide your name.';
    if (!isValidEmail(email)) errors.email = 'Please provide a valid email.';
    if (!message.trim()) errors.message = 'Please add a short message.';

    // If validation fails, set field errors and trigger shake animation
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setShake(true);
      // stop shaking after 600ms
      setTimeout(() => setShake(false), 600);
      return;
    }

  // Start sending state
    setStatus('sending');

    try {
      // Send raw POST to Google Apps Script Web App
      // Use the exact sheet/tab name and data keys expected by the Apps Script
      const payload: any = {
        sheet: 'ContactForm',
        data: {
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
        },
        meta: {
          hp: hp || ''
        }
      };

      // POST to server-side proxy which forwards safely to Google Apps Script
  // include a honeypot field key on the payload if present (client-side only)
  // the server will reject any submissions where hp is non-empty
  const resp = await postToProxy(payload);
      if (!resp.ok) throw new Error(resp.error || 'Network response was not ok');

      // Success feedback
      setStatus('success');
      reset();
      // keep success message briefly then clear (3s visible as required)
      setTimeout(() => setStatus('idle'), 3000);
    } catch (err) {
      console.error('Contact submit error', err);
      setStatus('error');
      setErrorMsg('Something went wrong, please try again.');
      // Keep user input for retry (do not reset)
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    // Wrap form in motion.div to apply shake animation on validation failure
    <motion.form
      onSubmit={onSubmit}
      className="md:col-span-2 grid gap-3"
      animate={shake ? { x: [0, -8, 8, -6, 6, 0] } : { x: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Honeypot - hidden from sighted users but may trap bots */}
  <input aria-hidden="true" tabIndex={-1} className="absolute -left-[9999px] w-px h-px overflow-hidden" value={hp} onChange={(e) => setHp(e.target.value)} name="hp" />
      {/* Name input */}
      <div className="flex flex-col">
        <input
          // Handle input focus
          onFocus={() => setFocusedField('name')}
          onBlur={() => setFocusedField(null)}
          className={`rounded border px-3 py-2 bg-white/80 dark:bg-black/30 border-black/10 dark:border-white/10 focus:outline-none ${focusedField === 'name' ? 'ring-2 ring-[#EAB308]/30 border-yellow-400/50' : ''}`}
          placeholder={dict.contact.name}
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
        />
        {/* Field-level validation message */}
        {fieldErrors.name && <span className="text-red-500 text-sm mt-1">{fieldErrors.name}</span>}
      </div>

      {/* Email input */}
      <div className="flex flex-col">
        <input
          onFocus={() => setFocusedField('email')}
          onBlur={() => setFocusedField(null)}
          className={`rounded border px-3 py-2 bg-white/80 dark:bg-black/30 border-black/10 dark:border-white/10 focus:outline-none ${focusedField === 'email' ? 'ring-2 ring-[#EAB308]/30 border-yellow-400/50' : ''}`}
          placeholder={dict.contact.email}
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          type="email"
        />
        {fieldErrors.email && <span className="text-red-500 text-sm mt-1">{fieldErrors.email}</span>}
      </div>

      {/* Message textarea */}
      <div className="flex flex-col">
        <textarea
          onFocus={() => setFocusedField('message')}
          onBlur={() => setFocusedField(null)}
          className={`rounded border px-3 py-2 bg-white/80 dark:bg-black/30 border-black/10 dark:border-white/10 focus:outline-none ${focusedField === 'message' ? 'ring-2 ring-[#EAB308]/30 border-yellow-400/50' : ''}`}
          placeholder={dict.contact.message}
          value={message}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value)}
          rows={6}
        />
        {fieldErrors.message && <span className="text-red-500 text-sm mt-1">{fieldErrors.message}</span>}
      </div>

      <div className="flex items-center gap-3">
        {/* Submit button with spinner shown during sending */}
        <button
          type="submit"
          disabled={status === 'sending'}
          className="rounded bg-[#004B87] text-white px-4 py-2 w-fit flex items-center gap-2"
        >
          {status === 'sending' && (
            // Small spinner (simple CSS) shown while sending
            <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
            </svg>
          )}
          <span>{status === 'sending' ? 'Sending...' : dict.contact.submit}</span>
        </button>

        {/* Success / Error messages (form-level) with aria-live */}
        <div aria-live="polite">
          {status === 'success' && (
            <motion.span initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex items-center gap-2 text-green-500 dark:text-green-400 text-sm">
              <svg className="w-4 h-4 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
              <span>Message sent successfully!</span>
            </motion.span>
          )} 

          {status === 'error' && <span className="text-red-500 text-sm">{errorMsg || 'Something went wrong, please try again.'}</span>}

          {errorMsg && status === 'idle' && <span className="text-red-500 text-sm">{errorMsg}</span>}
        </div>
      </div>
    </motion.form>
  );
}

