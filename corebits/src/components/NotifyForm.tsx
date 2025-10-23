"use client";
import React from 'react';
import type { RootDict } from '@/types/i18n';
import { sendToGoogleSheet } from '@/lib/googleSheets';

const GOOGLE_SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL || '';

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function NotifyForm({ dict }: { dict: RootDict }) {
  const [email, setEmail] = React.useState('');
  const [status, setStatus] = React.useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  const reset = () => setEmail('');

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg(null);
    if (!isValidEmail(email)) return setErrorMsg('Please enter a valid email');

    setStatus('sending');
    try {
      await sendToGoogleSheet(GOOGLE_SCRIPT_URL, 'Newsletter_Subscribers', {
        email: email.trim(),
        subscribedAt: new Date().toISOString()
      });
      setStatus('success');
      reset();
      setTimeout(() => setStatus('idle'), 8000);
    } catch (err: any) {
      setStatus('error');
      setErrorMsg(err?.message || 'Subscription failed');
    }
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-3">
      <input
        className="flex-1 rounded border px-3 py-2 bg-white/80 dark:bg-black/30 border-black/10 dark:border-white/10"
        placeholder={dict.notify.placeholder}
        value={email}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
        type="email"
      />
      <button className="rounded bg-[#004B87] text-white px-4 py-2" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending...' : dict.notify.button}
      </button>
      <div className="self-center sm:self-auto">
        {status === 'success' && <span className="text-green-600 dark:text-green-400">Thanks for walking with us on this journey! We will notify you once we are live!</span>}
        {status === 'error' && <span className="text-red-500">{errorMsg}</span>}
        {errorMsg && status === 'idle' && <span className="text-red-500">{errorMsg}</span>}
      </div>
    </form>
  );
}

