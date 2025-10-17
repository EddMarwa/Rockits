"use client";
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function LandingNavbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-colors ${scrolled ? 'backdrop-blur bg-[#0F172A]/70 border-b border-white/10' : 'bg-transparent'}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="#" className="font-bold text-xl">CoreBits</Link>
        {/* TODO: Add CoreBits logo image here later (optional) */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <a href="#home" className="text-[#EAB308] font-medium">Home</a>
          <a href="#about" className="hover:text-[#EAB308] text-[#CBD5E1]">About</a>
          <a href="#plans" className="hover:text-[#EAB308] text-[#CBD5E1]">Plans</a>
          <a href="#certs" className="hover:text-[#EAB308] text-[#CBD5E1]">Certificates</a>
          <a href="#news" className="hover:text-[#EAB308] text-[#CBD5E1]">Announcements</a>
          <a href="#contact" className="hover:text-[#EAB308] text-[#CBD5E1]">Contact</a>
        </nav>
        <div>
          <a href="#plans" className="rounded-lg px-4 py-2 text-[#0F172A] bg-[#EAB308] hover:shadow-[0_0_0_4px_rgba(234,179,8,0.15)]">Get Started</a>
        </div>
      </div>
      <nav className="md:hidden border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-2 flex gap-4 overflow-x-auto text-sm">
          <a href="#home" className="text-[#EAB308] font-medium">Home</a>
          <a href="#about" className="hover:text-[#EAB308]">About</a>
          <a href="#plans" className="hover:text-[#EAB308]">Plans</a>
          <a href="#certs" className="hover:text-[#EAB308]">Certificates</a>
          <a href="#news" className="hover:text-[#EAB308]">Announcements</a>
          <a href="#contact" className="hover:text-[#EAB308]">Contact</a>
        </div>
      </nav>
    </header>
  );
}

