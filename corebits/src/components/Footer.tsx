import type { RootDict } from '@/types/i18n';
import Link from 'next/link';
import { X, Linkedin, MessageSquare, Github } from 'lucide-react';
import { motion } from 'framer-motion';

type FooterProps = {
  dict: RootDict;
};

export default function Footer({ dict }: FooterProps) {
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-16 bg-slate-900 text-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 grid gap-6 md:grid-cols-3">
        {/* Company Info */}
        <div className="space-y-3">
          <div className="text-xl font-bold text-yellow-400">CoreBits</div>
          <div className="text-sm opacity-80">{dict.footer.made}</div>
          <div className="text-sm opacity-70">Registered in Malaysia. Contact us for partnerships and enterprise solutions.</div>
        </div>

        {/* Quick Links */}
        <div className="space-y-2">
          <div className="font-semibold">Quick Links</div>
          <ul className="space-y-1 text-sm opacity-80">
            <li><Link href="/en/plans" className="hover:underline">Plans</Link></li>
            <li><Link href="/en/about" className="hover:underline">About</Link></li>
            <li><Link href="/en/contact" className="hover:underline">Contact</Link></li>
            <li><Link href="/en/announcements" className="hover:underline">Announcements</Link></li>
          </ul>
        </div>

        {/* Legal & Documents + Social */}
        <div className="flex flex-col items-end gap-4">
          <div className="w-full">
            <div className="font-semibold">Legal & Documents</div>
            <div className="mt-2 flex gap-3 justify-end">
              <a href="/en/legal" className="text-sm hover:underline">Certificates</a>
              <a href="/en/legal" className="text-sm hover:underline">Reports</a>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a href="#" aria-label="X" className="p-2 rounded hover:bg-yellow-400/10"><X className="w-5 h-5 text-yellow-400" /></a>
            <a href="#" aria-label="LinkedIn" className="p-2 rounded hover:bg-yellow-400/10"><Linkedin className="w-5 h-5 text-yellow-400" /></a>
            <a href="#" aria-label="Telegram" className="p-2 rounded hover:bg-yellow-400/10"><MessageSquare className="w-5 h-5 text-yellow-400" /></a>
            <a href="#" aria-label="Discord" className="p-2 rounded hover:bg-yellow-400/10"><Github className="w-5 h-5 text-yellow-400" /></a>
          </div>

          <div className="w-full flex justify-end">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 px-3 py-2 rounded bg-yellow-400 text-slate-900 font-semibold"
            >
              ↑ Top
            </motion.button>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800 bg-slate-950 py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-sm text-center text-slate-400">© {year} CoreBits. All rights reserved.</div>
      </div>
    </footer>
  );
}

