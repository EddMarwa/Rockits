import LandingNavbar from '@/components/LandingNavbar';
import Footer from '@/components/Footer';
import { getDictionary } from '@/i18n';
import type { Locale } from '@/types/i18n';

export default async function Legal({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  return (
    <div>
      <LandingNavbar />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-semibold mb-2">{dict.legal.title}</h1>
        <p className="opacity-80 mb-8">{dict.legal.text}</p>

        <section className="mb-10">
          <h2 className="text-xl font-medium mb-3">{dict.legal.certs}</h2>
          <div className="flex flex-wrap gap-3">
            {[1,2].map((i) => (
              <a key={i} href={`/certificates/sample-${i}.pdf`} className="px-4 py-2 rounded border hover:bg-black/5 dark:hover:bg-white/10">
                {dict.legal.download} PDF {i}
              </a>
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

