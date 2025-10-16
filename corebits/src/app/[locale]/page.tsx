import { getDictionary } from '@/i18n';
import LandingNavbar from '@/components/LandingNavbar';
import Footer from '@/components/Footer';
import Timer from '@/components/Timer';
import { locales } from '@/i18n';
import { Metadata } from 'next';
import type { Locale } from '@/types/i18n';
import NotifyForm from '@/components/NotifyForm';
import FeaturesGrid from '@/components/FeaturesGrid';
import FloatingIcons from '@/components/FloatingIcons';

export const revalidate = 3600;

export async function generateStaticParams() {
  return locales.map((lng) => ({ locale: lng }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  return {
    title: `CoreBits — ${locale === 'en' ? 'Cloud Mining Agency' : '云算力机构'}`,
    description: dict.hero.subheadline
  };
}

export default async function Home({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  return (
    <div>
      <LandingNavbar />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <section id="home" className="grid md:grid-cols-2 items-center gap-10 py-12 relative">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-[#004B87] to-[#FFD700] bg-clip-text text-transparent">
            {dict.hero.headline}
          </h1>
          <div>
            <p className="mt-4 text-lg opacity-80">{dict.hero.subheadline}</p>
            <div className="mt-6 flex gap-3">
              <a href="#plans" className="inline-block rounded-lg bg-[#004B87] text-white px-5 py-3 hover:opacity-90">
                {dict.hero.cta}
              </a>
              <a href="#about" className="inline-block rounded-lg border px-5 py-3 hover:bg-black/5">
                Learn More
              </a>
            </div>
            <div className="mt-8">
              <Timer target="2025-12-15T00:00:00+08:00" label={dict.countdown.label} />
            </div>
          </div>
          <div className="h-64 bg-white rounded-2xl shadow-sm border border-black/10 hidden md:block relative overflow-hidden">
            <FloatingIcons />
          </div>
        </section>

        <section id="about">
          <h2 className="text-2xl font-semibold mb-4">Why Choose CoreBits?</h2>
          <FeaturesGrid items={[dict.features.secure, dict.features.daily, dict.features.registered, dict.features.global]} />
        </section>

        <section id="plans" className="mt-16">
          <h2 className="text-2xl font-semibold mb-4">Choose Your Mining Power</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Starter Plan', price: '$30', ths: '2.5 TH/s', profit: '2–3% daily', duration: '30 Days' },
              { name: 'Pro Miner', price: '$150', ths: '10 TH/s', profit: '3.5–4% daily', duration: '60 Days' },
              { name: 'Elite Rig', price: '$700', ths: '50 TH/s', profit: '5–6% daily', duration: '90 Days' }
            ].map((p) => (
              <div key={p.name} className="rounded-2xl p-[2px] bg-gradient-to-r from-[#004B87] to-[#FFD700]">
                <div className="rounded-2xl bg-white p-6 h-full flex flex-col shadow-sm">
                  <div className="text-sm opacity-70">{p.name}</div>
                  <div className="text-3xl font-bold mt-1">{p.price}</div>
                  <ul className="mt-4 space-y-1 text-sm">
                    <li>{p.ths}</li>
                    <li>{p.profit}</li>
                    <li>{p.duration}</li>
                  </ul>
                  <a href="#contact" className="mt-6 inline-block rounded-lg bg-[#004B87] text-white px-4 py-2 hover:opacity-90">Buy Now</a>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="partners" className="mt-16">
          <h2 className="text-2xl font-semibold mb-4">Supported Platforms</h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {['binance','okx','bybit','tron','ethereum','bitcoin'].map((n) => (
              <div key={n} className="h-14 rounded-lg border border-black/10 bg-white flex items-center justify-center text-sm opacity-70">
                {n.toUpperCase()}
              </div>
            ))}
          </div>
        </section>

        <section id="certs" className="mt-16">
          <h2 className="text-2xl font-semibold mb-2">Our Commitment to Transparency</h2>
          <p className="opacity-80">CoreBits operates under Malaysian law and shares its certificates publicly.</p>
          <a href={`/${locale}/legal`} className="mt-4 inline-block rounded-lg border px-4 py-2 hover:bg-black/5">View Certificates</a>
        </section>

        <section id="news" className="mt-16">
          <h2 className="text-2xl font-semibold mb-4">Latest Updates</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { date: '2025-09-01', title: 'CoreBits Expands Mining Capacity' },
              { date: '2025-10-10', title: 'TRON and BNB Payments Now Supported' },
              { date: '2025-11-05', title: 'Mobile App Beta Coming Soon' }
            ].map((a) => (
              <div key={a.date} className="rounded-lg p-5 border bg-white border-black/10">
                <div className="text-xs opacity-70">{a.date}</div>
                <div className="font-medium">{a.title}</div>
              </div>
            ))}
          </div>
          <a href={`/${locale}/announcements`} className="mt-4 inline-block rounded-lg border px-4 py-2 hover:bg-black/5">Read All</a>
        </section>

        <section id="contact" className="mt-16">
          <h2 className="text-xl font-semibold mb-3">{dict.notify.title}</h2>
          <p className="opacity-80 mb-3">Get notified about new plans and updates.</p>
          <NotifyForm dict={dict} />
        </section>
      </main>
      <Footer dict={dict} />
    </div>
  );
}

// moved to client component

