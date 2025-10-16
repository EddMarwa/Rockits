"use client";
import React from 'react';
import type { RootDict } from '@/types/i18n';

export default function ContactForm({ dict }: { dict: RootDict }) {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [sent, setSent] = React.useState(false);
  return (
    <form
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (name && email && message) setSent(true);
      }}
      className="md:col-span-2 grid gap-3"
    >
      <input className="rounded border px-3 py-2 bg-white/80 dark:bg-black/30 border-black/10 dark:border-white/10" placeholder={dict.contact.name} value={name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} required />
      <input className="rounded border px-3 py-2 bg-white/80 dark:bg-black/30 border-black/10 dark:border-white/10" placeholder={dict.contact.email} value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} type="email" required />
      <textarea className="rounded border px-3 py-2 bg-white/80 dark:bg-black/30 border-black/10 dark:border-white/10" placeholder={dict.contact.message} value={message} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value)} rows={6} required />
      <button className="rounded bg-[#004B87] text-white px-4 py-2 w-fit">{dict.contact.submit}</button>
      {sent && <span className="text-green-600 dark:text-green-400 text-sm">Thanks! We will contact you soon.</span>}
    </form>
  );
}

