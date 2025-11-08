import LandingNavbar from '@/components/LandingNavbar';
import Footer from '@/components/Footer';
import FadeCard from '@/components/FadeCard';
import ContactFormInline from '@/components/ContactFormInline';
import { defaultLocale, getDictionary } from '@/i18n';
import { Send, Twitter, Linkedin } from 'lucide-react';

export const revalidate = 1800;

export async function generateMetadata() {
  const dict = await getDictionary(defaultLocale);
  return {
    title: `${dict.contact.title} — CoreBits`,
    description: dict.contact.address || 'Contact CoreBits for partnerships, support, or media enquiries.'
  }
}

export default async function ContactPage() {
  const dict = await getDictionary(defaultLocale);

  return (
    <div className="bg-[#0F172A] text-[#F8FAFC] min-h-screen">
      <LandingNavbar />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <section className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-yellow-400 mb-3">{dict.contact.title}</h1>
          <p className="text-slate-300 max-w-2xl mx-auto">{dict.contact.address}</p>
        </section>

        {/* Two-column layout */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Form */}
          <FadeCard delay={0.02} className="md:col-span-2 bg-[#1E293B] rounded-2xl p-6">
            {/* TODO: Replace with integrated form handler / API route */}
            {/* Contact form moved to a client component to host event handlers */}
            <ContactFormInline />
          </FadeCard>

          {/* Info */}
          <FadeCard delay={0.06} className="bg-[#1E293B] rounded-2xl p-6 space-y-6">
            <section>
              <h2 className="text-lg font-semibold text-yellow-400 mb-2">Visit Us</h2>
              {/* TODO: Replace with real address */}
              <p className="text-slate-300">Contact us for office locations</p>
            </section>
            <section>
              <h2 className="text-lg font-semibold text-yellow-400 mb-2">Follow</h2>
              <div className="flex gap-3 text-sm">
                <a aria-label="Telegram" className="p-2 rounded border border-slate-700 hover:bg-slate-700/40 flex items-center justify-center" href="#">
                  <Send className="w-5 h-5 text-yellow-400" />
                </a>
                <a aria-label="X" className="p-2 rounded border border-slate-700 hover:bg-slate-700/40 flex items-center justify-center" href="#">
                  <Twitter className="w-5 h-5 text-yellow-400" />
                </a>
                <a aria-label="LinkedIn" className="p-2 rounded border border-slate-700 hover:bg-slate-700/40 flex items-center justify-center" href="#">
                  <Linkedin className="w-5 h-5 text-yellow-400" />
                </a>
              </div>
            </section>
            <section>
              <h2 className="text-lg font-semibold text-yellow-400 mb-2">Support</h2>
              {/* TODO: Add support email/phone */}
              <p className="text-slate-300">support@corebits.com</p>
            </section>
          </FadeCard>
        </div>
      </main>
      <Footer dict={dict} />
    </div>
  );
}


