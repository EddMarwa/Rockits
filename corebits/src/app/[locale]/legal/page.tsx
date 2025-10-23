import LandingNavbar from '@/components/LandingNavbar';
import Footer from '@/components/Footer';
import { getDictionary } from '@/i18n';
import type { Locale } from '@/types/i18n';
import { FileText, Shield, Lock, Scroll, Download } from 'lucide-react';
import { motion } from 'framer-motion';

export default async function Legal({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  return (
    <div>
      <LandingNavbar />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-semibold mb-2 text-yellow-400">{dict.legal.title}</h1>
        <p className="text-slate-400 mb-8">{dict.legal.text}</p>

        <section className="mb-10">
          <h2 className="text-xl font-medium mb-3">{dict.legal.certs}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { file: 'sample-1.pdf', title: 'Q4 Mining Performance', issuer: 'CoreBits Audit', icon: 'FileText' },
              { file: 'sample-2.pdf', title: 'Infrastructure Audit', issuer: 'Infra Labs', icon: 'Shield' },
              { file: 'sample-3.pdf', title: 'Security Assessment', issuer: 'SecTrust', icon: 'Lock' }
            ].map((d) => (
              <motion.div key={d.file} whileHover={{ y: -6 }} className="p-6 rounded-lg bg-slate-800 border border-slate-700">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded bg-slate-700">
                    {d.icon === 'FileText' && <FileText className="w-6 h-6 text-yellow-400" />}
                    {d.icon === 'Shield' && <Shield className="w-6 h-6 text-yellow-400" />}
                    {d.icon === 'Lock' && <Lock className="w-6 h-6 text-yellow-400" />}
                  </div>
                  <div>
                    <div className="font-semibold text-lg">{d.title}</div>
                    <div className="text-sm text-slate-400">Issuer: {d.issuer}</div>
                  </div>
                </div>
                <p className="text-sm text-slate-300 mb-4">Official document. Click download to save a copy (PDF).</p>
                <a href={`/docs/${d.file}`} className="inline-flex items-center gap-2 px-4 py-2 rounded bg-yellow-400 text-slate-900 font-semibold" download>
                  <Download className="w-4 h-4" /> Download PDF
                </a>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-medium mb-3">{dict.legal.reports}</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="text-left opacity-70">
                <tr>
                  <th className="py-2 pr-6">{dict.legal.date}</th>
                  <th className="py-2 pr-6">{dict.legal.description}</th>
                  <th className="py-2">{dict.legal.download}</th>
                </tr>
              </thead>
              <tbody>
                {[{date:'2025-01-01', desc:'Q4 mining performance'}].map((r, i) => (
                  <tr key={i} className="border-t border-black/10 dark:border-white/10">
                    <td className="py-2 pr-6">{r.date}</td>
                    <td className="py-2 pr-6">{r.desc}</td>
                    <td className="py-2"><a className="text-[#004B87] hover:underline" href="#">{dict.legal.download}</a></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-medium mb-3">{dict.legal.walletProofs}</h2>
          <ul className="space-y-2 text-sm">
            {['BTC: bc1qexample...', 'ETH: 0xExample...', 'USDT(TRC20): TTExample...'].map((w, i) => (
              <li key={i} className="opacity-80">{w}</li>
            ))}
          </ul>
        </section>
      </main>
      <Footer dict={dict} />
    </div>
  );
}

