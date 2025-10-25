import LandingNavbar from '@/components/LandingNavbar';
import Footer from '@/components/Footer';
import FadeCard from '@/components/FadeCard';
import { defaultLocale, getDictionary } from '@/i18n';

export const revalidate = 1800;

export default async function ContactPage() {
  const dict = await getDictionary(defaultLocale);

  return (
    <div className="bg-[#0F172A] text-[#F8FAFC] min-h-screen">
      <LandingNavbar />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <section className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-yellow-400 mb-3">Contact Us</h1>
          <p className="text-slate-300 max-w-2xl mx-auto">We’re here to help. Reach out for partnerships, support, or media.</p>
        </section>

        {/* Two-column layout */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Form */}
          <FadeCard delay={0.02} className="md:col-span-2 bg-[#1E293B] rounded-2xl p-6">
            {/* TODO: Replace with integrated form handler / API route */}
            <form onSubmit={(e) => e.preventDefault()} className="grid gap-4">
              <input className="rounded-lg bg-[#0F172A]/60 border border-slate-700 px-4 py-3 placeholder:text-slate-500" placeholder="Your Name" />
              <input className="rounded-lg bg-[#0F172A]/60 border border-slate-700 px-4 py-3 placeholder:text-slate-500" placeholder="Email Address" type="email" />
              <textarea className="rounded-lg bg-[#0F172A]/60 border border-slate-700 px-4 py-3 placeholder:text-slate-500" placeholder="Message" rows={6} />
              <button className="bg-yellow-400 text-slate-900 font-semibold px-5 py-3 rounded-lg hover:bg-yellow-300 transition w-fit">Send Message</button>
              {/* TODO: Hook up form submission, show success/error states */}
            </form>
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
              {/* TODO: Add social icons/images */}
              <div className="flex gap-3 text-sm">
                <a className="px-3 py-1 rounded border border-slate-700 hover:bg-slate-700/40" href="#">Telegram</a>
                <a className="px-3 py-1 rounded border border-slate-700 hover:bg-slate-700/40" href="#">X</a>
                <a className="px-3 py-1 rounded border border-slate-700 hover:bg-slate-700/40" href="#">LinkedIn</a>
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


