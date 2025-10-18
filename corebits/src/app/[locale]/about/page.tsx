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
            className="text-center mb-16"
          >
            <div className="inline-flex items-center px-4 py-2 bg-yellow-400/10 border border-yellow-400/20 rounded-full mb-6">
              <span className="text-yellow-400 text-sm font-medium">Trusted by 50,000+ Users</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-50 mb-6">
              Why Choose 
              <span className="text-yellow-400"> CoreBits?</span>
            </h2>
            <p className="text-slate-400 text-xl max-w-3xl mx-auto leading-relaxed">
              Experience the difference with our industry-leading cloud mining platform designed for maximum profitability and security
            </p>
          </motion.div>

          {/* Statistics Banner */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerWhyChoose}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          >
            {[
              { number: "99.9%", label: "Uptime Guarantee", color: "text-green-400" },
              { number: "2.5%", label: "Daily Returns", color: "text-yellow-400" },
              { number: "24/7", label: "Support", color: "text-blue-400" },
              { number: "50K+", label: "Active Users", color: "text-purple-400" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center bg-slate-800/50 rounded-xl p-6 border border-slate-700"
              >
                <div className={`text-3xl md:text-4xl font-bold ${stat.color} mb-2`}>
                  {stat.number}
                </div>
                <div className="text-slate-400 text-sm font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Enhanced Cards */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerWhyChoose}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {[
              {
                title: "Secure Cloud Mining",
                description: "Advanced ASIC miners with 99.9% uptime guarantee. Our enterprise-grade infrastructure ensures maximum hashpower efficiency and mining stability.",
                stats: "99.9% Uptime • 2.5 TH/s Power",
                icon: "🔒",
                gradient: "from-green-500/20 to-emerald-600/20",
                borderColor: "border-green-400"
              },
              {
                title: "Daily Profit Distribution", 
                description: "Automated daily payouts directly to your wallet. Real-time profit tracking with transparent fee structure and instant withdrawal capabilities.",
                stats: "Daily Payouts • 0.5% Platform Fee",
                icon: "💰",
                gradient: "from-yellow-500/20 to-amber-600/20",
                borderColor: "border-yellow-400"
              },
              {
                title: "Malaysia Registered Business",
                description: "Fully compliant with Malaysian regulations and international standards. Your investments are protected by legal framework and regulatory oversight.",
                stats: "Legal Compliance • Regulated Operations",
                icon: "🏛️",
                gradient: "from-blue-500/20 to-indigo-600/20",
                borderColor: "border-blue-400"
              },
              {
                title: "Global Access",
                description: "Mine from anywhere in the world with our cloud platform. Multi-language support and 24/7 customer service in your timezone.",
                stats: "150+ Countries • 24/7 Support",
                icon: "🌍",
                gradient: "from-purple-500/20 to-violet-600/20",
                borderColor: "border-purple-400"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ 
                  y: -12, 
                  scale: 1.02,
                  transition: { duration: 0.3 } 
                }}
                className={`relative bg-gradient-to-br ${item.gradient} bg-slate-800 rounded-2xl p-8 border-t-4 ${item.borderColor} hover:shadow-[0_25px_50px_rgba(0,0,0,0.4)] transition-all duration-300 group`}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="text-4xl">{item.icon}</div>
                  <div className="text-xs text-slate-500 bg-slate-700/50 px-3 py-1 rounded-full">
                    {item.stats}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-slate-50 mb-4 group-hover:text-yellow-400 transition-colors">
                  {item.title}
                </h3>
                
                <p className="text-slate-300 leading-relaxed mb-6">
                  {item.description}
                </p>
                
                <div className="flex items-center text-sm text-slate-400">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></span>
                  Learn More
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Enhanced CTA Section */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariants}
            className="text-center mt-16"
          >
            <div className="bg-gradient-to-r from-slate-800 to-slate-700 rounded-2xl p-8 md:p-12 border border-slate-600">
              <h3 className="text-2xl md:text-3xl font-bold text-slate-50 mb-4">
                Ready to Start Your Mining Journey?
              </h3>
              <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto">
                Join thousands of satisfied users who trust CoreBits for their cloud mining needs
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link 
                    href="/plans" 
                    className="inline-flex items-center px-8 py-4 bg-yellow-400 text-slate-950 font-semibold rounded-xl hover:shadow-[0_0_30px_rgba(234,179,8,0.4)] transition-all duration-300"
                  >
                    View Mining Plans
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link 
                    href="/certificates" 
                    className="inline-flex items-center px-8 py-4 border-2 border-slate-500 text-slate-300 font-semibold rounded-xl hover:border-yellow-400 hover:text-yellow-400 transition-all duration-300"
                  >
                    View Certificates
                  </Link>
                </motion.div>
              </div>
            </div>
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

