"use client";
import Link from 'next/link';
import type { Route } from 'next';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { useMemo } from 'react';
import type { RootDict, Locale } from '@/types/i18n';

type NavbarProps = {
  dict: RootDict;
  locale: Locale;
};

export default function Navbar({ dict, locale }: NavbarProps) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const base = (`/${locale}`) as Route<string>;

  const navItems = useMemo(
    () => [
      { href: (`${base}`) as Route<string>, label: dict.nav.home },
      { href: (`${base}/about`) as Route<string>, label: dict.nav.about },
      { href: (`${base}/legal`) as Route<string>, label: dict.nav.legal },
      { href: (`${base}/announcements`) as Route<string>, label: dict.nav.announcements },
      { href: (`${base}/contact`) as Route<string>, label: dict.nav.contact }
    ],
    [base, dict]
  );

  const otherLocale: Locale = locale === 'en' ? 'zh' : 'en';
  const switchHref = useMemo<Route<string>>(() => {
    if (!pathname) return `/${otherLocale}`;
    const segments = pathname.split('/').filter(Boolean);
    if (segments.length === 0) return `/${otherLocale}`;
    segments[0] = otherLocale;
    return ('/' + segments.join('/')) as Route<string>;
  }, [pathname, otherLocale]);

  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-background/70 border-b border-black/10 dark:border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href={base} className="font-semibold text-lg">
          CoreBits
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-[#004B87] dark:hover:text-[#FFD700]">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link href={switchHref} className="px-2 py-1 rounded border text-xs hover:bg-black/5 dark:hover:bg-white/10">
            {locale === 'en' ? '中文 🇨🇳' : 'EN 🇬🇧'}
          </Link>
          <button
            aria-label="Toggle theme"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded hover:bg-black/5 dark:hover:bg-white/10"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>
      <nav className="md:hidden border-t border-black/10 dark:border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-2 flex gap-4 overflow-x-auto text-sm">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="whitespace-nowrap hover:text-[#004B87] dark:hover:text-[#FFD700]">
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}

