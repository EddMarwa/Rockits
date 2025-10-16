import 'server-only';
import type { RootDict, Locale } from '@/types/i18n';

const dictionaries = {
  en: () => import('./dictionaries/en.json').then((m) => m.default),
  zh: () => import('./dictionaries/zh.json').then((m) => m.default)
};

export async function getDictionary(locale: Locale): Promise<RootDict> {
  const dict = await dictionaries[locale]();
  return dict as RootDict;
}

export const locales: Locale[] = ['en', 'zh'];
export const defaultLocale: Locale = 'en';

