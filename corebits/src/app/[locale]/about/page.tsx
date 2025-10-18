"use client";
import { motion } from 'framer-motion';
import Link from 'next/link';
import LandingNavbar from '@/components/LandingNavbar';
import Footer from '@/components/Footer';
import { getDictionary } from '@/i18n';
import type { Locale } from '@/types/i18n';
import { useEffect, useState } from 'react';

export default function About({ params }: { params: Promise<{ locale: Locale }> }) {
  const [locale, setLocale] = useState<Locale>('en');
  const [dict, setDict] = useState<any>({});

  useEffect(() => {
    const initLocale = async () => {
      const resolvedParams = await params;
      setLocale(resolvedParams.locale);
      const dictionary = await getDictionary(resolvedParams.locale);
      setDict(dictionary);
    };
    initLocale();
  }, [params]);

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
      <LandingNavbar />
      
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
              At CoreBits, we provide secure, scalable, and transparent cloud mining opportunities for everyone — backed by verified Malaysian registration and real-time transparency.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                href="/certificates" 
                className="inline-flex items-center px-8 py-4 bg-yellow-400 text-slate-950 font-semibold rounded-xl hover:shadow-[0_0_30px_rgba(234,179,8,0.4)] transition-all duration-300"
              >
                View Certificates
              </Link>
            </motion.div>
          </motion.div>
          {/* TODO: Add hero banner or subtle mining-themed background visual */}
        </div>
      </section>

      {/* Why Choose CoreBits Section */}
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
              Why Choose CoreBits?
            </h2>
            <p className="text-slate-400 text-lg">
              Discover what makes us the trusted choice for cloud mining
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerWhyChoose}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6"
          >
            {[
              {
                title: "Secure Cloud Mining",
                description: "CoreBits leverages high-performance, energy-efficient mining infrastructure for maximum stability and uptime.",
                icon: "// TODO: Add mining server or blockchain security icon here"
              },
              {
                title: "Daily Profit Distribution", 
                description: "Mining rewards are calculated and distributed daily to ensure consistency and transparency.",
                icon: "// TODO: Add daily payout or calendar icon here"
              },
              {
                title: "Malaysia Registered Business",
                description: "Officially registered under Malaysian authorities, ensuring regulatory compliance and legal transparency.",
                icon: "// TODO: Add certificate or Malaysia flag image here"
              },
              {
                title: "Global Access",
                description: "Our cloud platform allows users from supported regions worldwide to mine with ease and confidence.",
                icon: "// TODO: Add global network or user map icon here"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="relative bg-slate-800 rounded-2xl p-8 border-t-4 border-yellow-400 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] transition-all duration-300"
              >
                <h3 className="text-xl font-semibold text-slate-50 mb-4">{item.title}</h3>
                <p className="text-slate-400 leading-relaxed">{item.description}</p>
                <div className="text-xs text-slate-600 mt-4 italic">{item.icon}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16 px-6 md:px-12 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariants}
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
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
                    We aim to become Asia's leading mining agency by setting new standards in transparency, sustainability, and innovation.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-slate-800 rounded-2xl p-8 h-96 flex items-center justify-center">
                <div className="text-center text-slate-500">
                  <div className="text-sm">// TODO: Add image related to mining facility</div>
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
                icon: "// TODO: Add blockchain or padlock icons"
              },
              {
                title: "Real-Time Monitoring",
                description: "Our system monitors power consumption, temperature, and output 24/7.",
                icon: "// TODO: Add blockchain or padlock icons"
              },
              {
                title: "Cold & Hot Wallet Security",
                description: "Client funds and rewards are managed securely through verified wallet custody.",
                icon: "// TODO: Add blockchain or padlock icons"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="relative bg-slate-800 rounded-2xl p-8 border-t-4 border-yellow-400 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] transition-all duration-300"
              >
                <h3 className="text-xl font-semibold text-slate-50 mb-4">{item.title}</h3>
                <p className="text-slate-400 leading-relaxed">{item.description}</p>
                <div className="text-xs text-slate-600 mt-4 italic">{item.icon}</div>
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
                icon: "// TODO: Add CEO photo placeholder"
              },
              {
                name: "Wei Ling Tan",
                title: "Head of Operations", 
                description: "Oversees mining infrastructure and compliance to maintain peak efficiency and transparency.",
                icon: "// TODO: Add head of ops photo placeholder"
              },
              {
                name: "Tech Partners",
                title: "Global Collaborations",
                description: "Partnered with leading blockchain providers and pool operators to ensure top-tier performance.",
                icon: "// TODO: Add partner logos placeholder"
              },
              {
                name: "Advisory Panel",
                title: "Compliance & Risk Experts",
                description: "Advisors ensure regulatory compliance and guide responsible mining practices.",
                icon: "// TODO: Add advisory panel placeholder"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="relative bg-slate-800 rounded-2xl p-8 border-t-4 border-yellow-400 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] transition-all duration-300"
              >
                <h3 className="text-xl font-semibold text-slate-50 mb-2">{item.name}</h3>
                <h4 className="text-yellow-400 font-medium mb-4">{item.title}</h4>
                <p className="text-slate-400 leading-relaxed mb-4">{item.description}</p>
                <div className="text-xs text-slate-600 italic">{item.icon}</div>
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
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                href="/plans" 
                className="inline-flex items-center px-8 py-4 bg-yellow-400 text-slate-950 font-semibold rounded-xl hover:shadow-[0_0_30px_rgba(234,179,8,0.4)] transition-all duration-300"
              >
                Explore Mining Plans
              </Link>
            </motion.div>
            {/* TODO: Add world map or network background visual */}
          </motion.div>
        </div>
      </section>

      <Footer dict={dict} />
    </div>
  );
}

