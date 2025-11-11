import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// ParticleBackground is a client-only component. Import a small client-side
// wrapper so the Server Component (`layout.tsx`) doesn't call `dynamic(..., { ssr: false })`.
import ParticleBackground from '@/components/ParticleBackgroundClient';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CoreBits — Cloud Mining Agency",
  description: "Trusted cloud mining with transparency, security, and global access.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0F172A] text-[#F1F5F9]`}
      >
  {/* Particle background is a client-side component positioned behind all content */}
  <ParticleBackground />
    <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
 