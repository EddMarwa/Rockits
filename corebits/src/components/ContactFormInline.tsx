"use client";
import React from "react";

export default function ContactFormInline() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: hook up API call or client-side handling
    // For now, we simply prevent navigation and could show a toast
    console.log("Contact form submitted (placeholder)");
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <input className="rounded-lg bg-[#0F172A]/60 border border-slate-700 px-4 py-3 placeholder:text-slate-500" placeholder="Your Name" />
      <input className="rounded-lg bg-[#0F172A]/60 border border-slate-700 px-4 py-3 placeholder:text-slate-500" placeholder="Email Address" type="email" />
      <textarea className="rounded-lg bg-[#0F172A]/60 border border-slate-700 px-4 py-3 placeholder:text-slate-500" placeholder="Message" rows={6} />
      <button className="bg-yellow-400 text-slate-900 font-semibold px-5 py-3 rounded-lg hover:bg-yellow-300 transition w-fit">Send Message</button>
    </form>
  );
}
