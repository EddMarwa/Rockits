import type { RootDict } from '@/types/i18n';

type FooterProps = {
  dict: RootDict;
};

export default function Footer({ dict }: FooterProps) {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-16 border-t border-black/10 dark:border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 grid gap-6 md:grid-cols-3 text-sm">
        <div className="opacity-80">{dict.footer.made}</div>
        <div className="flex gap-4">
          <a className="hover:underline" href="#">{dict.footer.terms}</a>
          <a className="hover:underline" href="#">{dict.footer.privacy}</a>
          <a className="hover:underline" href="#">{dict.footer.kyc}</a>
        </div>
        <div className="text-right opacity-70">© {year} CoreBits</div>
      </div>
    </footer>
  );
}

