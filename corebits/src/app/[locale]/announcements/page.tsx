import LandingNavbar from '@/components/LandingNavbar';
import Footer from '@/components/Footer';
import { getDictionary } from '@/i18n';
import type { Locale } from '@/types/i18n';
import AnnouncementsTimeline from '@/components/AnnouncementsTimeline';
import Link from 'next/link';

export default async function Announcements({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const items = [
    { date: '2025-02-15', title: 'Facility Upgrade', desc: 'Hashrate expansion completed.' },
    { date: '2025-01-20', title: 'New Mining Pools', desc: 'Added support for additional cryptocurrencies.' },
    { date: '2024-12-10', title: 'Security Enhancement', desc: 'Implemented advanced security protocols.' },
    { date: '2024-11-05', title: 'Partnership Announcement', desc: 'Strategic partnership with leading exchanges.' },
    { date: '2024-10-15', title: 'Platform Update', desc: 'Enhanced user interface and mining efficiency.' },
    { date: '2024-09-01', title: 'CoreBits Launch', desc: 'Official launch of the CoreBits mining platform.' }
  ];

  return (
    <div className="bg-[#0F172A] text-[#F8FAFC] min-h-screen">
      <LandingNavbar />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-yellow-400 mb-4">Announcements</h1>
          <p className="text-slate-300 max-w-2xl mx-auto">Stay updated with the latest news and developments from CoreBits.</p>
        </section>

        <div className="max-w-4xl mx-auto">
          <AnnouncementsTimeline items={items} />
        </div>

        <div className="text-center mt-12">
          <Link 
            href="/contact" 
            className="bg-yellow-400 text-slate-900 font-semibold px-6 py-3 rounded-lg hover:bg-yellow-300 transition"
          >
            Get Notified
          </Link>
        </div>
      </main>
      <Footer dict={dict} />
    </div>
  );
}

