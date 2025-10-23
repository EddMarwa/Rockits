import Plans from '@/app/plans/page';
import type { Locale } from '@/types/i18n';
import { getDictionary } from '@/i18n';

export const revalidate = 3600;

export default async function LocalePlans({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  // We import the client Plans page and render it with the server locale
  // Note: Plans is a client component exported as default from app/plans/page.tsx
  // Passing locale ensures links are generated server-side
  return <Plans locale={locale} />;
}
