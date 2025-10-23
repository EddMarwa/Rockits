"use client";
import React from 'react';
import type { RootDict } from '@/types/i18n';

export default function NotifyForm({ dict }: { dict: RootDict }) {
  const [email, setEmail] = React.useState('');
  const [submitted, setSubmitted] = React.useState(false);
  return (
    <form
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (email) {
          setSubmitted(true);
          // reset the field after submit
          setEmail('');
          // keep message for a while then hide
          setTimeout(() => setSubmitted(false), 8000);
        }
      }}
      className="flex flex-col sm:flex-row gap-3"
    >
      <input
        className="flex-1 rounded border px-3 py-2 bg-white/80 dark:bg-black/30 border-black/10 dark:border-white/10"
        placeholder={dict.notify.placeholder}
        value={email}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
        type="email"
        required
      />
      <button className="rounded bg-[#004B87] text-white px-4 py-2">{dict.notify.button}</button>
      {submitted && <span className="self-center sm:self-auto text-green-600 dark:text-green-400">Thanks for walking with us on this journey! We will notify you once we are live!</span>}
    </form>
  );
}

