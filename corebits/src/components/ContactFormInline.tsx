"use client";
import React, { useState } from "react";
import { postToProxy, isValidEmail } from "@/lib/forms";

export default function ContactFormInline() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const message = String(fd.get("message") || "").trim();

    if (!name || !email || !message) {
      setError("Please complete all fields.");
      return;
    }
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      const payload = { sheet: "contact", data: { name, email, message }, meta: { hp: "" } };
      const res = await postToProxy(payload, 10000);
      if (!res.ok) {
        setError(res.error || "Submission failed");
      } else {
        setSuccess("Thanks — your message has been sent.");
        e.currentTarget.reset();
      }
    } catch (err: any) {
      setError(err?.message || String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      {error && <div className="text-red-400 text-sm">{error}</div>}
      {success && <div className="text-green-400 text-sm">{success}</div>}
      <input name="name" disabled={loading} className="rounded-lg bg-[#0F172A]/60 border border-slate-700 px-4 py-3 placeholder:text-slate-500" placeholder="Your Name" />
      <input name="email" disabled={loading} className="rounded-lg bg-[#0F172A]/60 border border-slate-700 px-4 py-3 placeholder:text-slate-500" placeholder="Email Address" type="email" />
      <textarea name="message" disabled={loading} className="rounded-lg bg-[#0F172A]/60 border border-slate-700 px-4 py-3 placeholder:text-slate-500" placeholder="Message" rows={6} />
      <button disabled={loading} className="bg-yellow-400 text-slate-900 font-semibold px-5 py-3 rounded-lg hover:bg-yellow-300 transition w-fit">
        {loading ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  );
}
