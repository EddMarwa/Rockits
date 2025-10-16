import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getDictionary } from '@/i18n';
import type { Locale } from '@/types/i18n';

export default async function About({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  return (
    <div>
      <Navbar dict={dict} locale={locale} />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-semibold mb-6">{dict.about.title}</h1>
        <section className="mb-10">
          <h2 className="text-xl font-medium mb-2">{dict.about.mission}</h2>
          <p className="opacity-80">We provide secure, transparent cloud mining services from Malaysia to the world.</p>
        </section>
        <section className="mb-10">
          <h2 className="text-xl font-medium mb-4">Team</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[1,2,3].map(i => (
              <div key={i} className="rounded-lg p-5 border bg-white/50 dark:bg-black/30 border-black/10 dark:border-white/10">
                <div className="font-medium">Member {i}</div>
                <div className="text-sm opacity-70">Placeholder role</div>
              </div>
            ))}
          </div>
        </section>
        <section>
          <h2 className="text-xl font-medium mb-4">{dict.about.values}</h2>
          <ul className="grid md:grid-cols-4 gap-4">
            {[dict.about.transparency, dict.about.security, dict.about.efficiency, dict.about.global].map((v, i) => (
              <li key={i} className="rounded-lg p-4 border bg-white/50 dark:bg-black/30 border-black/10 dark:border-white/10">{v}</li>
            ))}
          </ul>
        </section>
      </main>
      <Footer dict={dict} />
    </div>
  );
}

