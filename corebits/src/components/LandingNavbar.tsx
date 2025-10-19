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

  // Default to English locale for simplicity
  const locale = 'en';

  return (
    <header className={`sticky top-0 z-50 transition-colors ${scrolled ? 'backdrop-blur bg-[#0F172A]/70 border-b border-white/10' : 'bg-transparent'}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href={`/${locale}`} className="font-bold text-xl">CoreBits</Link>
        {/* TODO: Add CoreBits logo image here later (optional) */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link 
            href={`/${locale}`} 
            className="hover:text-[#EAB308] text-[#CBD5E1]"
          >
            Home
          </Link>
          <Link 
            href={`/${locale}/about`} 
            className="hover:text-[#EAB308] text-[#CBD5E1]"
          >
            About
          </Link>
          <Link 
            href={`/${locale}`} 
            className="hover:text-[#EAB308] text-[#CBD5E1]"
          >
            Plans
          </Link>
          <Link 
            href={`/${locale}/certificates`} 
            className="hover:text-[#EAB308] text-[#CBD5E1]"
          >
            Certificates
          </Link>
          <Link 
            href={`/${locale}/announcements`} 
            className="hover:text-[#EAB308] text-[#CBD5E1]"
          >
            Announcements
          </Link>
          <Link 
            href={`/${locale}/contact`} 
            className="hover:text-[#EAB308] text-[#CBD5E1]"
          >
            Contact
          </Link>
        </nav>
        <div>
          <Link 
            href={`/${locale}`} 
            className="rounded-lg px-4 py-2 text-[#0F172A] bg-[#EAB308] hover:shadow-[0_0_0_4px_rgba(234,179,8,0.15)]"
          >
            Get Started
          </Link>
        </div>
      </div>
      <nav className="md:hidden border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-2 flex gap-4 overflow-x-auto text-sm">
          <Link 
            href={`/${locale}`} 
            className="hover:text-[#EAB308]"
          >
            Home
          </Link>
          <Link 
            href={`/${locale}/about`} 
            className="hover:text-[#EAB308]"
          >
            About
          </Link>
          <Link 
            href={`/${locale}`} 
            className="hover:text-[#EAB308]"
          >
            Plans
          </Link>
          <Link 
            href={`/${locale}/certificates`} 
            className="hover:text-[#EAB308]"
          >
            Certificates
          </Link>
          <Link 
            href={`/${locale}/announcements`} 
            className="hover:text-[#EAB308]"
          >
            Announcements
          </Link>
          <Link 
            href={`/${locale}/contact`} 
            className="hover:text-[#EAB308]"
          >
            Contact
          </Link>
        </div>
      </nav>
    </header>
  );
}

