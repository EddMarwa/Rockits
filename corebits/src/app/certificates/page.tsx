import LandingNavbar from '@/components/LandingNavbar';
import Footer from '@/components/Footer';
import FadeCard from '@/components/FadeCard';
import { defaultLocale, getDictionary } from '@/i18n';

export const revalidate = 3600;

export default async function CertificatesPage() {
  const dict = await getDictionary(defaultLocale);

  return (
    <div className="bg-[#0F172A] text-[#F8FAFC] min-h-screen">
      <LandingNavbar />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <section className="text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-yellow-400 mb-4">Transparency & Legal Documents</h1>
          <p className="text-slate-300 max-w-2xl mx-auto">
            CoreBits operates transparently under applicable law. View our verified certificates, reports, and wallet proofs below.
          </p>
        </section>

        {/* Certificates Grid */}
        <section className="mt-12 grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {['Business License', 'Mining Permit', 'Operational Compliance'].map((title, i) => (
            <FadeCard key={title} delay={i * 0.06} className="bg-[#1E293B] p-6 rounded-2xl shadow-md text-center hover:-translate-y-2 transition">
              {/* TODO: Add icon image here */}
              <h3 className="text-lg font-semibold text-yellow-400 mb-2">{title}</h3>
              <p className="text-slate-400 text-sm mb-4">Verified document proving CoreBits’ legal operation.</p>
              {/* TODO: Link each button to real PDF file later */}
              <button className="bg-yellow-400 text-slate-900 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition">
                Download PDF
              </button>
            </FadeCard>
          ))}
        </section>

        {/* Transparency Reports */}
        <section className="mt-16">
          <h2 className="text-2xl font-semibold text-yellow-400 mb-4">Transparency Reports</h2>
          <div className="overflow-x-auto rounded-2xl">
            <table className="w-full bg-[#1E293B] rounded-2xl text-slate-300">
              <thead className="text-yellow-400 text-sm uppercase">
                <tr>
                  <th className="py-3 px-4 text-left">Date</th>
                  <th className="py-3 px-4 text-left">Description</th>
                  <th className="py-3 px-4 text-left">Download</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { date: '2025-01-01', desc: 'Q4 mining performance' },
                  { date: '2025-03-31', desc: 'Q1 compliance report' }
                ].map((r) => (
                  <tr key={r.date} className="border-t border-slate-700 hover:bg-slate-700/40">
                    <td className="py-3 px-4">{r.date}</td>
                    <td className="py-3 px-4">{r.desc}</td>
                    <td className="py-3 px-4">
                      {/* TODO: Replace with real report links */}
                      <a href="#" className="text-yellow-400 hover:underline">Download</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Wallet Proofs */}
        <section className="mt-16">
          <h2 className="text-2xl font-semibold text-yellow-400 mb-4">Wallet Proofs</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {['BTC', 'ETH', 'USDT(TRC20)'].map((coin, i) => (
              <FadeCard key={coin} delay={i * 0.06} className="bg-[#1E293B] p-6 rounded-2xl shadow-md text-center hover:-translate-y-2 transition">
                {/* TODO: Add crypto logo image */}
                <h3 className="text-yellow-400 text-lg font-semibold mb-2">{coin}</h3>
                <p className="text-slate-400 text-sm mb-2">Address:</p>
                {/* TODO: Replace addresses with real wallets */}
                <p className="text-slate-200 font-mono text-xs break-all">ExampleAddressHere123...</p>
                {/* TODO: Add copy-to-clipboard logic later */}
                <button className="mt-3 bg-yellow-400 text-slate-900 px-3 py-1 rounded-md text-sm hover:bg-yellow-300 transition">Copy</button>
              </FadeCard>
            ))}
          </div>
        </section>
      </main>
      <Footer dict={dict} />
    </div>
  );
}


