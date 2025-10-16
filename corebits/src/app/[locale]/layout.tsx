import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import '../globals.css';
import { locales, defaultLocale } from '@/i18n';
import type { Locale } from '@/types/i18n';

const poppins = Poppins({ subsets: ['latin'], weight: ['400','500','600','700'], variable: '--font-poppins' });

export async function generateStaticParams() {
  return locales.map((lng) => ({ locale: lng }));
}

export const metadata: Metadata = {
  title: 'CoreBits — Malaysia-Based Cloud Mining Agency',
  description: 'Trusted cloud mining with transparency, security, and global access.'
};

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const isSupported = locales.includes(rawLocale as Locale);
  const locale = isSupported ? (rawLocale as Locale) : defaultLocale;
  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${poppins.variable} font-sans bg-[#F9FAFB] text-[#1E293B]`}>
        {children}
      </body>
    </html>
  );
}

