import LandingNavbar from '@/components/LandingNavbar';
import Footer from '@/components/Footer';
import { getDictionary } from '@/i18n';
import type { Locale } from '@/types/i18n';
import fs from 'fs/promises';
import path from 'path';
import { marked } from 'marked';
import { sanitizeHtml } from '@/lib/sanitize';

export default async function KycPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  const mdPath = path.join(process.cwd(), 'docs', 'KYC-Policy.md');
  let html = '<p>Policy not found.</p>';
  try {
    const md = await fs.readFile(mdPath, 'utf8');
  html = sanitizeHtml(marked(md));
  } catch (e) {
    html = `<p>Unable to load policy: ${String(e)}</p>`;
  }

  return (
    <div className="min-h-screen bg-[#0F172A] text-[#F8FAFC]">
      <LandingNavbar locale={locale} />
      <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
        <article className="prose prose-invert max-w-none">
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </article>
      </main>
      <Footer dict={dict} locale={locale} />
    </div>
  );
}
