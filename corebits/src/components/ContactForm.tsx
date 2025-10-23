"use client";
import React from 'react';
import type { RootDict } from '@/types/i18n';
import { sendToGoogleSheet } from '@/lib/googleSheets';

const GOOGLE_SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL || '';

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function ContactForm({ dict }: { dict: RootDict }) {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [status, setStatus] = React.useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  const reset = () => {
    setName('');
    setEmail('');
    setMessage('');
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!name.trim()) return setErrorMsg('Please provide your name.');
    if (!isValidEmail(email)) return setErrorMsg('Please provide a valid email.');
    if (!message.trim()) return setErrorMsg('Please add a short message.');

    setStatus('sending');

    try {
      await sendToGoogleSheet(GOOGLE_SCRIPT_URL, 'Contact_Submissions', {
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
        submittedAt: new Date().toISOString()
      });

      setStatus('success');
      reset();
      setTimeout(() => setStatus('idle'), 8000);
    } catch (err: any) {
      setStatus('error');
      setErrorMsg(err?.message || 'Submission failed');
    }
  };

  return (
    <form onSubmit={onSubmit} className="md:col-span-2 grid gap-3">
      <input className="rounded border px-3 py-2 bg-white/80 dark:bg-black/30 border-black/10 dark:border-white/10" placeholder={dict.contact.name} value={name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} />
      <input className="rounded border px-3 py-2 bg-white/80 dark:bg-black/30 border-black/10 dark:border-white/10" placeholder={dict.contact.email} value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} type="email" />
      <textarea className="rounded border px-3 py-2 bg-white/80 dark:bg-black/30 border-black/10 dark:border-white/10" placeholder={dict.contact.message} value={message} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value)} rows={6} />
      <div className="flex items-center gap-3">
        <button type="submit" disabled={status === 'sending'} className="rounded bg-[#004B87] text-white px-4 py-2 w-fit">
          {status === 'sending' ? 'Sending...' : dict.contact.submit}
        </button>
        {status === 'success' && <span className="text-green-600 dark:text-green-400 text-sm">Thanks! We will contact you soon.</span>}
        {status === 'error' && <span className="text-red-500 text-sm">{errorMsg}</span>}
      </div>
    </form>
  );
}

