import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getDictionary } from '@/i18n';
import type { Locale } from '@/types/i18n';
import ContactForm from '@/components/ContactForm';

export default async function Contact({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  return (
    <div>
      <Navbar dict={dict} locale={locale} />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-semibold mb-6">{dict.contact.title}</h1>
        <div className="grid md:grid-cols-3 gap-8">
          <ContactForm dict={dict} />
          <div className="md:col-span-1 space-y-6">
            <section>
              <h2 className="text-lg font-medium mb-2">{dict.contact.visit}</h2>
              <p className="opacity-80">{dict.contact.address}</p>
            </section>
            <section>
              <h2 className="text-lg font-medium mb-2">{dict.contact.follow}</h2>
              <div className="flex gap-3 text-sm">
                <a className="px-3 py-1 rounded border hover:bg-black/5 dark:hover:bg-white/10" href="#">Telegram</a>
                <a className="px-3 py-1 rounded border hover:bg-black/5 dark:hover:bg-white/10" href="#">X</a>
                <a className="px-3 py-1 rounded border hover:bg-black/5 dark:hover:bg-white/10" href="#">LinkedIn</a>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer dict={dict} />
    </div>
  );
}

// moved to client component

