import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getDictionary } from '@/i18n';
import type { Locale } from '@/types/i18n';
import AnnouncementsTimeline from '@/components/AnnouncementsTimeline';

export default async function Announcements({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const items = [
    { date: '2025-02-15', title: 'Facility Upgrade', desc: 'Hashrate expansion completed.' },
    { date: '2025-01-10', title: 'Compliance Check', desc: 'Quarterly audit passed.' }
  ];
  return (
    <div>
      <Navbar dict={dict} locale={locale} />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-semibold mb-6">{dict.announcements.title}</h1>
        <AnnouncementsTimeline items={items} />
        {/* Optional: link back to landing announcements section */}
        <a href={`/${locale}#news`} className="mt-6 inline-block rounded-lg border border-white/15 px-4 py-2 hover:bg-white/5">Back to Home</a>
      </main>
      <Footer dict={dict} />
    </div>
  );
}

