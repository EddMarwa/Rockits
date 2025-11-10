"use client";
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import LandingNavbar from '@/components/LandingNavbar';
import Footer from '@/components/Footer';
import WhyChooseCoreBits from '@/components/WhyChooseCoreBits';
import { Shield, Activity, Lock, User, Users, Briefcase } from 'lucide-react';

type FlipCardProps = {
  frontSrc: string;
  frontAlt?: string;
  backSrc: string;
  backAlt?: string;
  frontScale?: number; // 0-1 scale applied to front image to reduce cropping
};

function FlipCard({ frontSrc, frontAlt = '', backSrc, backAlt = '', frontScale = 0.95 }: FlipCardProps) {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handle = (e: MediaQueryListEvent | MediaQueryList) => setReducedMotion(Boolean('matches' in e ? e.matches : mq.matches));
    handle(mq);
    if (mq.addEventListener) mq.addEventListener('change', handle as EventListener);
    else mq.addListener(handle as any);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener('change', handle as EventListener);
      else mq.removeListener(handle as any);
    };
  }, []);

  const animateProp = reducedMotion ? { rotateY: 0 } : { rotateY: [0, -360] };
  const transitionProp = reducedMotion ? undefined : { duration: 12, repeat: Infinity, ease: 'linear' };
  const hoverProp = reducedMotion ? undefined : { rotateY: 180, scale: 1.02, transition: { duration: 0.45 } };

  const scaleClass = frontScale === 0.95 ? 'scale-95' : frontScale === 0.9 ? 'scale-90' : '';

  return (
    <motion.div
      className={`relative w-full h-full [transform-style:preserve-3d]`}
      animate={animateProp}
      transition={transitionProp as any}
      whileHover={hoverProp}
    >
      {/* Front face (body image) - slightly scaled down to reduce cropping */}
      <div className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden [backface-visibility:hidden] flex items-center justify-center">
        <div className={`relative w-full h-full ${scaleClass}`}>
          <Image
            src={frontSrc}
            alt={frontAlt}
            fill
            className="object-cover object-center"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        </div>
      </div>

      {/* Back face (logo) - rotated 180deg so it appears when the card flips */}
      <div
        className="absolute inset-0 w-full h-full flex items-center justify-center [transform:rotateY(180deg)] [backface-visibility:hidden] [-webkit-backface-visibility:hidden]"
      >
        <div className="relative w-2/3 h-2/3 rounded-lg overflow-hidden border-4 border-yellow-400 shadow-[0_10px_30px_rgba(250,204,21,0.12)] bg-slate-900 flex items-center justify-center">
          <Image
            src={backSrc}
            alt={backAlt}
            fill
            className="object-contain"
            sizes="(min-width: 1024px) 25vw, 50vw"
          />
          {/* subtle text overlay */}
          <div className="absolute inset-0 flex items-end justify-center pb-4 pointer-events-none">
            <span className="text-yellow-300 text-sm font-semibold drop-shadow-md">CoreBits</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function About() {
  const dict = {
    nav: { home: "Home", about: "About", legal: "Legal", announcements: "Announcements", contact: "Contact" },
    hero: { headline: "CoreBits", subheadline: "Cloud Mining Agency", cta: "Get Started" },
    countdown: { label: "Launch Countdown" },
    features: { title: "Features", secure: "Secure", daily: "Daily", registered: "Registered", global: "Global" },
    testimonials: { title: "Testimonials" },
    notify: { title: "Stay Updated", placeholder: "Enter email", button: "Subscribe", success: "Thank you!" },
    footer: {
      made: "Made with ❤️",
      terms: "Terms",
      privacy: "Privacy", 
      kyc: "KYC"
    },
    about: { title: "About", mission: "Mission", values: "Values", transparency: "Transparency", security: "Security", efficiency: "Efficiency", global: "Global" },
    legal: { title: "Legal", text: "Legal text", certs: "Certificates", download: "Download", reports: "Reports", date: "Date", description: "Description", walletProofs: "Wallet Proofs" },
    announcements: { title: "Announcements", comingSoon: "Coming Soon" },
    contact: { title: "Contact", name: "Name", email: "Email", message: "Message", submit: "Submit", visit: "Visit", address: "Address", follow: "Follow" }
  };

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerWhyChoose = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <LandingNavbar locale="en" />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-800 to-slate-950 py-16 px-6 md:px-12">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUpVariants}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-slate-50 mb-6">
              Empowering Global Crypto Mining with 
              <span className="text-yellow-400 block">Transparency & Trust</span>
            </h1>
            <p className="text-xl text-slate-400 mb-8 max-w-4xl mx-auto leading-relaxed">
              At CoreBits, we provide secure, scalable, and transparent cloud mining opportunities for everyone — backed by verified registration and real-time transparency.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href={`/${'en'}/certificates`} className="btn-primary">
                View Certificates
              </Link>
            </motion.div>
          </motion.div>
          {/* TODO: Add hero banner or subtle mining-themed background visual */}
        </div>
      </section>

      <WhyChooseCoreBits />

      {/* Mission & Vision Section */}
      <section className="py-16 px-6 md:px-12 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariants}
            className="grid lg:grid-cols-3 gap-12 items-center"
          >
            {/* Left flip card (visible on lg+) */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="bg-slate-800 rounded-2xl p-[0.1cm] h-72 w-full flex items-center justify-center">
                <div className="relative w-full h-full flex items-center justify-center [perspective:1200px]">
                  <FlipCard frontSrc="/images/logos/logo.png" frontAlt="CoreBits logo" backSrc="/images/logos/body%20img.png" backAlt="CoreBits facility" frontScale={0.9} />
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-50 mb-8">
                Our Mission & Vision
              </h2>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-yellow-400 mb-4">Mission</h3>
                  <p className="text-slate-300 text-lg leading-relaxed">
                    CoreBits was founded with a single vision — to democratize crypto mining by making it accessible, transparent, and profitable for all.
                  </p>
                </div>
                
                <div className="h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>
                
                <div>
                  <h3 className="text-xl font-semibold text-yellow-400 mb-4">Vision</h3>
                  <p className="text-slate-300 text-lg leading-relaxed">
                    We aim to become Asia&apos;s leading mining agency by setting new standards in transparency, sustainability, and innovation.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              {/* flip-card container: restore small inset (0.1cm) for a framed look */}
              <div className="bg-slate-800 rounded-2xl p-[0.1cm] h-96 flex items-center justify-center">
                {/* perspective wrapper */}
                <div className="relative w-full h-full flex items-center justify-center [perspective:1200px]">
                  {/* rotating card: preserve-3d so front/back faces render correctly */}
                  <FlipCard frontSrc="/images/logos/body%20img.png" frontAlt="CoreBits facility" backSrc="/images/logos/logo.png" backAlt="CoreBits logo" frontScale={0.95} />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Technology & Security Section */}
      <section className="py-16 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariants}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-50 mb-4">
              Our Technology & Security
            </h2>
            <p className="text-slate-400 text-lg">
              Cutting-edge infrastructure ensuring maximum security and performance
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerWhyChoose}
            className="grid md:grid-cols-3 gap-6"
          >
            {[
              {
                title: "High-Efficiency Hashpower",
                description: "Optimized mining rigs delivering consistent uptime and performance.",
                icon: Shield
              },
              {
                title: "Real-Time Monitoring",
                description: "Our system monitors power consumption, temperature, and output 24/7.",
                icon: Activity
              },
              {
                title: "Cold & Hot Wallet Security",
                description: "Client funds and rewards are managed securely through verified wallet custody.",
                icon: Lock
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="relative bg-slate-800 rounded-2xl p-8 border-t-4 border-yellow-400 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] transition-all duration-300"
              >
                <item.icon className="w-8 h-8 text-yellow-400 mb-4" />
                <h3 className="text-xl font-semibold text-slate-50 mb-4">{item.title}</h3>
                <p className="text-slate-400 leading-relaxed">{item.description}</p>
                
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Leadership & Partners Section */}
      <section className="py-16 px-6 md:px-12 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariants}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-50 mb-4">
              Our Leadership & Partners
            </h2>
            <p className="text-slate-400 text-lg">
              Meet the experts driving CoreBits forward
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerWhyChoose}
            className="grid md:grid-cols-2 gap-6"
          >
            {[
              {
                name: "Arif Rahman",
                title: "Chief Executive Officer",
                description: "Visionary entrepreneur driving CoreBits' mission to expand sustainable crypto mining in Asia.",
                icon: User
              },
              {
                name: "Wei Ling Tan",
                title: "Head of Operations", 
                description: "Oversees mining infrastructure and compliance to maintain peak efficiency and transparency.",
                icon: User
              },
              {
                name: "Tech Partners",
                title: "Global Collaborations",
                description: "Partnered with leading blockchain providers and pool operators to ensure top-tier performance.",
                icon: Briefcase
              },
              {
                name: "Advisory Panel",
                title: "Compliance & Risk Experts",
                description: "Advisors ensure regulatory compliance and guide responsible mining practices.",
                icon: Users
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="relative bg-slate-800 rounded-2xl p-8 border-t-4 border-yellow-400 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] transition-all duration-300"
              >
                <item.icon className="w-8 h-8 text-yellow-400 mb-4" />
                <h3 className="text-xl font-semibold text-slate-50 mb-2">{item.name}</h3>
                <h4 className="text-yellow-400 font-medium mb-4">{item.title}</h4>
                <p className="text-slate-400 leading-relaxed mb-4">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Global Community Section */}
      <section className="relative py-16 px-6 md:px-12 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariants}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-50 mb-6">
              Join Our Global Community
            </h2>
            <p className="text-xl text-slate-400 mb-8 leading-relaxed">
              Join a growing community of miners, investors, and innovators shaping the future of digital assets with CoreBits.
            </p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href={`/${'en'}/plans`} className="btn-primary">
                  Explore Mining Plans
                </Link>
              </motion.div>
            {/* TODO: Add world map or network background visual */}
          </motion.div>
        </div>
      </section>

  <Footer dict={dict} locale="en" />
    </div>
  );
}

