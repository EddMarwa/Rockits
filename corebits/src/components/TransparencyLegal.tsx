"use client";
import { useState } from 'react';
import Link from 'next/link';
import type { Locale } from '@/types/i18n';

function ExpandCard({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="rounded-2xl border border-white/10 hover:border-[#EAB308]/40 transition bg-[#1E293B]">
      <button onClick={() => setOpen(!open)} className="w-full text-left px-4 py-3 font-medium flex justify-between items-center">
        <span>{title}</span>
        <span className="text-xs opacity-70">{open ? '−' : '+'}</span>
      </button>
      {open && <div className="px-4 pb-4 text-sm opacity-90">{children}</div>}
    </div>
  );
}

export default function TransparencyLegal({ locale }: { locale: Locale }) {
  return (
    <section id="certs" className="mt-16">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Our Commitment to Transparency</h2>
          <p className="opacity-80">CoreBits operates under Malaysian law and shares its official documents, certificates, and mining performance data publicly.</p>
          <Link href={`/${locale}/certificates`} className="mt-4 inline-block rounded-lg border border-white/15 px-4 py-2 hover:bg-white/5">View Certificates</Link>
        </div>
        <div>
          <h3 className="text-xl font-medium mb-2">Our Legal Standing</h3>
          <p className="opacity-80">CoreBits operates transparently and is registered under Malaysian regulations.</p>
        </div>
      </div>

      <div className="mt-8 grid gap-4">
        <ExpandCard title="Business Certificates">
          {/* TODO: Add certificate icon or image beside each download */}
          <div className="flex flex-wrap gap-3">
            <a href="/certificates/sample-1.pdf" className="px-3 py-2 rounded border border-white/15 hover:bg-white/5 text-xs">Download PDF 1</a>
            <a href="/certificates/sample-2.pdf" className="px-3 py-2 rounded border border-white/15 hover:bg-white/5 text-xs">Download PDF 2</a>
          </div>
        </ExpandCard>
        <ExpandCard title="Transparency Reports">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="text-left opacity-70">
                <tr>
                  <th className="py-2 pr-6">Date</th>
                  <th className="py-2 pr-6">Description</th>
                  <th className="py-2">Download</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-white/10">
                  <td className="py-2 pr-6">2025-01-01</td>
                  <td className="py-2 pr-6">Q4 mining performance</td>
                  <td className="py-2"><a className="text-[#EAB308] hover:underline" href="#">Download</a></td>
                </tr>
              </tbody>
            </table>
          </div>
        </ExpandCard>
        <ExpandCard title="Wallet Proofs">
          <ul className="space-y-1 text-sm opacity-90">
            <li>BTC: bc1qexample...</li>
            <li>ETH: 0xExample...</li>
            <li>USDT (TRC20): TTExample...</li>
          </ul>
        </ExpandCard>
      </div>
    </section>
  );
}

