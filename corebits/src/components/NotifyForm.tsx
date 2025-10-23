"use client";
import React from 'react';
import type { RootDict } from '@/types/i18n';
import { motion } from 'framer-motion';
import { isValidEmail, postToProxy } from '@/lib/forms';

export default function NotifyForm({ dict, inputClassName, buttonClassName }: { dict: RootDict; inputClassName?: string; buttonClassName?: string }) {
  const [email, setEmail] = React.useState('');
  // Form status
  const [status, setStatus] = React.useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  // Generic/network error message
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);
  // Per-field validation errors
  const [fieldErrors, setFieldErrors] = React.useState<{ email?: string }>({});
  // Focused field for glow
  const [focusedField, setFocusedField] = React.useState<string | null>(null);
  // Shake trigger for validation failures
  const [shake, setShake] = React.useState(false);

  const [hp, setHp] = React.useState('');
  const reset = () => setEmail('');

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg(null);
    if (status === 'sending') return; // debounce
    // Clear previous field errors
    setFieldErrors({});

    // Validate
    const errors: { email?: string } = {};
    if (!isValidEmail(email)) errors.email = 'Please enter a valid email.';

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setShake(true);
      setTimeout(() => setShake(false), 600);
      return;
    }

    setStatus('sending');
    try {
      const payload: any = { sheet: 'GetNotified', data: { email: email.trim() }, meta: { hp: hp || '' } };
      const resp = await postToProxy(payload);
      if (!resp.ok) throw new Error(resp.error || 'Network response was not ok');

      setStatus('success');
      reset();
      // show success for 3 seconds then clear
      setTimeout(() => setStatus('idle'), 3000);
    } catch (err: any) {
      console.error('Subscribe error', err);
      setStatus('error');
      setErrorMsg(err.message || 'Something went wrong, please try again.');
      // keep user input for retry
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    // motion.form to allow shake animation on validation failure
    <motion.form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-3" animate={shake ? { x: [0, -8, 8, -6, 6, 0] } : { x: 0 }} transition={{ duration: 0.6 }}>
      <input aria-hidden="true" tabIndex={-1} className="absolute -left-[9999px] w-px h-px overflow-hidden" value={hp} onChange={(e) => setHp(e.target.value)} name="hp" />
      {/* Email input */}
      <div className="flex flex-col flex-1">
        <input
          onFocus={() => setFocusedField('email')}
          onBlur={() => setFocusedField(null)}
          className={`flex-1 rounded border px-3 py-2 bg-white/80 dark:bg-black/30 border-black/10 dark:border-white/10 focus:outline-none ${focusedField === 'email' ? 'ring-2 ring-[#EAB308]/30 border-yellow-400/50' : ''} ${inputClassName || ''}`}
          placeholder={dict.notify.placeholder}
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          type="email"
          aria-label={dict.notify.placeholder}
        />
        {fieldErrors.email && <span className="text-red-500 text-sm mt-1">{fieldErrors.email}</span>}
      </div>

  {/* Submit button with spinner */}
  <button type="submit" className={`rounded flex items-center gap-2 disabled:opacity-60 ${buttonClassName || 'bg-[#004B87] text-white px-4 py-2'}`} disabled={status === 'sending'}>
        {status === 'sending' && (
          <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
          </svg>
        )}
        <span>{status === 'sending' ? 'Subscribing...' : dict.notify.button}</span>
      </button>

      {/* Status messages - aria-live so screen readers announce updates */}
      <div className="self-center sm:self-auto" aria-live="polite">
        {status === 'success' && (
          <motion.span initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex items-center gap-2 text-green-600 dark:text-green-400">
            <svg className="w-4 h-4 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
            <span>Subscribed successfully!</span>
          </motion.span>
        )}
        {status === 'error' && (
          <span className="text-red-500">{errorMsg || 'Something went wrong, please try again.'}</span>
        )}
        {/* If there's an error message but form is idle, show it too (covers server validation messages) */}
        {errorMsg && status === 'idle' && <span className="text-red-500">{errorMsg}</span>}
      </div>
    </motion.form>
  );
}

