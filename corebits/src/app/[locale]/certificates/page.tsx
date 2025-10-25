import LandingNavbar from '@/components/LandingNavbar';
import Footer from '@/components/Footer';
import { getDictionary } from '@/i18n';
import type { Locale } from '@/types/i18n';
import FadeCard from '@/components/FadeCard';

export default async function Certificates({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <div>
      <LandingNavbar locale={locale} />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <section className="mb-10">
          <h1 className="text-3xl font-semibold mb-2">Our Legal Standing</h1>
          <p className="opacity-80">CoreBits operates transparently and is registered under applicable regulations.</p>
          <p className="opacity-70 mt-2">Our licenses and certifications are shared publicly to demonstrate our operational legitimacy.</p>
          {/* TODO: Add header banner or legal-themed image here (e.g., documents) */}
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-medium mb-4">Business Certificates</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { title: 'Business Certificate 1', file: '/certificates/sample-1.pdf' },
              { title: 'Business Certificate 2', file: '/certificates/sample-2.pdf' }
            ].map((c, i) => (
              <FadeCard key={c.title} delay={i * 0.05} className="rounded-2xl p-5 border border-white/10 hover:border-[#EAB308]/40 bg-[#1E293B]">
                <div className="font-medium">{c.title}</div>
                {/* TODO: Add small certificate icon beside each download link */}
                <a href={c.file} className="mt-3 inline-block text-[#EAB308] hover:underline text-sm">Download PDF</a>
              </FadeCard>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-medium mb-3">Transparency Reports</h2>
          {/* TODO: Add report PDF icons beside each download */}
          <div className="overflow-x-auto rounded-2xl border border-white/10">
            <table className="min-w-full text-sm">
              <thead className="text-left opacity-70 bg-[#0F172A]">
                <tr>
                  <th className="py-2 px-4">Date</th>
                  <th className="py-2 px-4">Description</th>
                  <th className="py-2 px-4">Download</th>
                </tr>
              </thead>
              <tbody className="bg-[#1E293B]">
                {[
                  { date: '2025-01-01', desc: 'Q4 Mining Performance' },
                  { date: '2025-04-01', desc: 'Q1 Infrastructure Audit' }
                ].map((r) => (
                  <tr key={r.date} className="border-t border-white/10">
                    <td className="py-2 px-4">{r.date}</td>
                    <td className="py-2 px-4">{r.desc}</td>
                    <td className="py-2 px-4"><a className="text-[#EAB308] hover:underline" href="#">Download</a></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-medium mb-3">Wallet Proofs</h2>
          <ul className="space-y-2 text-sm opacity-90">
            <li>BTC: bc1qexample...</li>
            <li>ETH: 0xExample...</li>
            <li>USDT (TRC20): TTExample...</li>
          </ul>
        </section>
      </main>
      <Footer dict={dict} locale={locale} />
    </div>
  );
}

