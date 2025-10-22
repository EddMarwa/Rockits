"use client";
import React, { useState, useEffect } from 'react';
import { motion, useAnimation, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import LandingNavbar from '@/components/LandingNavbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { Shield, Globe, Calendar, Lock, Download, ExternalLink, Check, Bitcoin, Zap, Clock, Star } from 'lucide-react';

export default function Plans() {
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8 }
    }
  };

  const staggerContainer = {
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

  const dict = {
    nav: { home: "Home", about: "About", legal: "Legal", announcements: "Announcements", contact: "Contact" },
    hero: { headline: "CoreBits", subheadline: "Cloud Mining Agency", cta: "Get Started" },
    countdown: { label: "Launch Countdown" },
    features: { title: "Features", secure: "Secure", daily: "Daily", registered: "Registered", global: "Global" },
    testimonials: { title: "Testimonials" },
    notify: { title: "Stay Updated", placeholder: "Enter email", button: "Subscribe", success: "Thank you!" },
    footer: {
      made: "Made with ❤️ in Malaysia",
      terms: "Terms",
      privacy: "Privacy", 
      kyc: "KYC"
    },
    about: { title: "About", mission: "Mission", values: "Values", transparency: "Transparency", security: "Security", efficiency: "Efficiency", global: "Global" },
    legal: { title: "Legal", text: "Legal text", certs: "Certificates", download: "Download", reports: "Reports", date: "Date", description: "Description", walletProofs: "Wallet Proofs" },
    announcements: { title: "Announcements", comingSoon: "Coming Soon" },
    contact: { title: "Contact", name: "Name", email: "Email", message: "Message", submit: "Submit", visit: "Visit", address: "Address", follow: "Follow" }
  };


  const miningPlans = [
    { tier: 'Starter', price: '$30', hashPower: '30 GH/s', duration: 60, roi: 120, description: 'Perfect for beginners', features: ['Daily payouts', '24/7 support', 'Secure mining'] },
    { tier: 'Basic', price: '$50', hashPower: '70 GH/s', duration: 70, roi: 130, description: 'Entry-level growth', features: ['Low entry cost', 'Auto reinvest', 'Simple dashboard'] },
    { tier: 'Bronze', price: '$100', hashPower: '200 GH/s', duration: 90, roi: 150, description: 'Steady growth plan', features: ['Higher hash rate', 'Priority support', 'Auto reinvestment'] },
    { tier: 'Silver', price: '$500', hashPower: '1 TH/s', duration: 120, roi: 180, description: 'Balanced investment', features: ['Premium support', 'Advanced analytics', 'Flexible terms'] },
    { tier: 'Gold', price: '$1000', hashPower: '2.5 TH/s', duration: 150, roi: 200, description: 'Professional mining', features: ['Maximum efficiency', 'Dedicated manager', 'Custom solutions'] },
    { tier: 'Platinum', price: '$1500', hashPower: '3.5 TH/s', duration: 170, roi: 230, description: 'Elite-grade performance', features: ['VIP priority payouts', 'Referral bonus', 'Audit-backed rewards'] },
    { tier: 'Diamond', price: '$3000', hashPower: '5 TH/s', duration: 180, roi: 250, description: 'Enterprise level', features: ['VIP treatment', 'Exclusive access', 'White-label options'] },
    { tier: 'Elite', price: '$5000', hashPower: '10 TH/s', duration: 220, roi: 300, description: 'Ultimate investment package', features: ['Private mining node', 'Custom ROI structure', 'Dedicated account manager'] },
    { tier: 'Ultra', price: '$8000', hashPower: '15 TH/s', duration: 240, roi: 350, description: 'Institutional-grade power', features: ['Enterprise SLA', 'Custom integrations', 'Priority provisioning'] }
  ];

  const [selectedPlanIndex, setSelectedPlanIndex] = useState<number | null>(null);

  function calculateROI(amount: number, roi: number, duration: number) {
    const totalReturn = amount * (roi / 100);
    const dailyReturn = totalReturn / duration;
    const netProfit = totalReturn - amount;
    return { dailyReturn, totalReturn, netProfit };
  }

  function ROIOverlay({ plan, onClose }: { plan: any; onClose: () => void }) {
    const [amount, setAmount] = useState<number>(parseFloat(String(plan.price).replace(/[^0-9.]/g, '')) || 0);
    const [result, setResult] = useState<{ dailyReturn: number; totalReturn: number; netProfit: number } | null>(null);

    const run = () => {
      const r = calculateROI(amount, Number(plan.roi), Number(plan.duration));
      setResult(r);
    };

    return (
      <motion.div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/60" onClick={onClose} />
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative bg-[#0F172A] rounded-lg p-6 w-full max-w-md ring-1 ring-yellow-400/20"
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-bold text-[#F8FAFC]">{plan.tier} — ROI Calculator</h3>
              <p className="text-sm text-[#94A3B8]">Enter investment amount (USD) to estimate returns</p>
            </div>
            <button onClick={onClose} className="text-[#94A3B8] hover:text-white">✕</button>
          </div>

          <div className="space-y-3">
            <label className="block text-sm text-[#94A3B8]">Amount (USD)</label>
            <input
              type="number"
              aria-label="Amount in USD"
              placeholder="e.g. 100"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full rounded border border-[#334155] px-3 py-2 bg-transparent text-white"
            />

            <div className="flex gap-3">
              <button onClick={run} className="flex-1 bg-yellow-400 text-[#0F172A] py-2 rounded font-semibold">Calculate</button>
              <button onClick={onClose} className="flex-1 border border-[#334155] text-[#F8FAFC] py-2 rounded">Close</button>
            </div>

            {result && (
              <div className="mt-4 bg-[#111827] p-4 rounded">
                <div className="text-sm text-[#94A3B8]">Daily Return</div>
                <div className="text-lg font-semibold text-white">${result.dailyReturn.toFixed(2)}</div>
                <div className="text-sm text-[#94A3B8] mt-2">Total Return</div>
                <div className="text-lg font-semibold text-yellow-400">${result.totalReturn.toFixed(2)}</div>
                <div className="text-sm text-[#94A3B8] mt-2">Net Profit</div>
                <div className="text-lg font-semibold text-white">${result.netProfit.toFixed(2)}</div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    );
  }

  const paymentPlatforms = [
    { file: 'Binance.png', name: 'Binance', href: 'https://www.binance.com' },
    { file: 'OKX.png', name: 'OKX', href: 'https://www.okx.com' },
    { file: 'Bybit.png', name: 'Bybit', href: 'https://www.bybit.com' },
    { file: 'Coinbase.png', name: 'Coinbase', href: 'https://www.coinbase.com' },
    { file: 'kucoin.png', name: 'KuCoin', href: 'https://www.kucoin.com' },
    { file: 'Bitfinex.jpg', name: 'Bitfinex', href: 'https://www.bitfinex.com' },
    { file: 'Gate.io.png', name: 'Gate.io', href: 'https://www.gate.io' },
    { file: 'Mexc.png', name: 'Mexc', href: 'https://www.mexc.com' }
  ];

  const controls = useAnimation();
  const prefersReducedMotion = useReducedMotion();
  const marqueeDuration = 20; // seconds for one loop (adjustable)

  useEffect(() => {
    if (prefersReducedMotion) return;
    // start infinite horizontal scroll from 0% to -50% (because we duplicate the list)
    controls.start({ x: ['0%', '-50%'], transition: { repeat: Infinity, repeatType: 'loop', duration: marqueeDuration, ease: 'linear' } });
  }, [controls, prefersReducedMotion]);

  const features = [
    {
      icon: Shield,
      title: "Secure Cloud Mining",
      description: "Your mining contracts are protected by industry-standard encryption and monitored in real-time."
    },
    {
      icon: Calendar,
      title: "Daily Profit Distribution", 
      description: "Receive your mining profits automatically every 24 hours directly to your wallet."
    },
    {
      icon: Lock,
      title: "Malaysia Registered Business",
      description: "Fully compliant with Malaysian regulations and international business standards."
    },
    {
      icon: Globe,
      title: "Global Access",
      description: "Access our mining infrastructure from anywhere in the world with 24/7 support."
    }
  ];

  const transparencyReports = [
    { date: "2025-01-15", description: "Q4 Mining Performance Report", download: "#" },
    { date: "2025-04-01", description: "Q1 Infrastructure Audit", download: "#" },
    { date: "2025-07-01", description: "Q2 Security Assessment", download: "#" }
  ];

  return (
    <div className="min-h-screen bg-[#0F172A]">
      <LandingNavbar />
      
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUpVariants}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-[#F8FAFC]">
            Choose Your <span className="text-yellow-400">Mining Power</span>
          </h1>
          <p className="text-center max-w-2xl mx-auto text-lg text-[#94A3B8]">
            Invest in CoreBits mining packages — from starter plans to professional rigs. Earn daily mining profits directly to your wallet.
          </p>
          
          {/* TODO: Add a banner image or visual header later */}
        </motion.section>

        {/* Mining Plans Grid */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mb-20"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {miningPlans.map((plan, idx) => (
              <motion.div
                key={plan.tier}
                variants={itemVariants}
                whileHover={{ scale: 1.03, boxShadow: '0 20px 40px rgba(234,179,8,0.16)' }}
                className="rounded-2xl p-6 flex flex-col justify-between transition-transform duration-300 border-2 bg-[#1E293B] border-[#0F172A]"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Bitcoin className="w-7 h-7 text-yellow-400" />
                    <div>
                      <h3 className="font-bold text-lg text-[#F8FAFC]">{plan.tier}</h3>
                      <p className="text-sm text-[#94A3B8]">{plan.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-extrabold text-[#F8FAFC]">{plan.price}</div>
                    <div className="text-sm font-semibold text-yellow-400">{plan.hashPower}</div>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between text-sm text-[#94A3B8]">
                    <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-yellow-400" /> Duration</div>
                    <div className="font-semibold text-white">{plan.duration} days</div>
                  </div>
                  <div className="flex items-center justify-between text-sm text-[#94A3B8]">
                    <div className="flex items-center gap-2"><Zap className="w-4 h-4 text-yellow-400" /> Estimated ROI</div>
                    <div className="font-semibold text-yellow-400">{plan.roi}%</div>
                  </div>
                </div>

                <div className="mb-4 space-y-2">
                  {plan.features.slice(0,3).map((f, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-yellow-400" />
                      <span className="text-sm text-[#94A3B8]">{f}</span>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3 mt-4">
                  <motion.a
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    href="#"
                    className="flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-lg font-semibold bg-yellow-400 text-[#0F172A] shadow-lg"
                  >
                    <Star className="w-4 h-4" /> Buy Hash Power
                  </motion.a>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setSelectedPlanIndex(idx)}
                    className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg border font-semibold border-[#334155] text-[#F8FAFC]"
                  >
                    <Zap className="w-4 h-4 text-yellow-400" /> Calculate ROI
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* ROI Modal */}
          {typeof selectedPlanIndex === 'number' && miningPlans[selectedPlanIndex] && (
            <ROIOverlay
              plan={miningPlans[selectedPlanIndex]}
              onClose={() => setSelectedPlanIndex(null)}
            />
          )}
        </motion.section>

        {/* Supported Payment Platforms */}
          <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUpVariants}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-[#F8FAFC]">
              Supported Payment Platforms
            </h2>
            <p className="text-lg text-[#94A3B8]">
              CoreBits accepts a range of secure crypto payment options for your convenience.
            </p>
          </div>

          {/* Continuous marquee carousel of partner logos (duplicate list for seamless loop) */}
          <div className="overflow-hidden" role="list">
            <motion.div
              className="flex items-center gap-6"
              animate={prefersReducedMotion ? undefined : controls}
              onHoverStart={() => controls.stop()}
              onHoverEnd={() => { if (!prefersReducedMotion) controls.start({ x: ['0%', '-50%'], transition: { repeat: Infinity, repeatType: 'loop', duration: marqueeDuration, ease: 'linear' } }); }}
            >
              {paymentPlatforms.concat(paymentPlatforms).map(({ file, name, href }, i) => (
                <a key={`${file}-${i}`} href={href} target="_blank" rel="noopener noreferrer" title={`${name} website`} className="flex-shrink-0 w-36 h-12 flex items-center justify-center rounded-lg bg-[#1E293B] focus:outline-none focus:ring-2 focus:ring-yellow-400/30" role="listitem" onFocus={() => controls.stop()} onBlur={() => { if (!prefersReducedMotion) controls.start({ x: ['0%', '-50%'], transition: { repeat: Infinity, repeatType: 'loop', duration: marqueeDuration, ease: 'linear' } }); }}>
                  <Image src={`/images/partners/${file}`} alt={`${name} logo`} width={120} height={40} className="object-contain" />
                </a>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Call-to-Action Buttons */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUpVariants}
          className="mb-20"
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                href="/"
                className="inline-flex items-center px-8 py-4 font-semibold rounded-lg transition-all duration-300 border-2 border-yellow-400 text-yellow-400 bg-transparent"
              >
                Back to Home
              </Link>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                href="/about"
                className="inline-flex items-center px-8 py-4 font-semibold rounded-lg transition-all duration-300 bg-yellow-400 text-[#0F172A] shadow-lg"
              >
                Learn More
              </Link>
            </motion.div>
          </div>
        </motion.section>

        {/* Why Choose CoreBits Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUpVariants}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-[#F8FAFC]">
              Why Choose CoreBits
            </h2>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className="rounded-2xl p-6 shadow-md hover:-translate-y-2 transition-all duration-300 border-2 border-transparent hover:border-yellow-400/30 bg-[#1E293B]"
              >
                <feature.icon className="w-10 h-10 mb-3 text-yellow-400" />
                <h3 className="text-lg font-semibold mb-2 text-yellow-400">
                  {feature.title}
                </h3>
                <p className="text-sm text-[#94A3B8]">
                  {feature.description}
                </p>
                
                {/* TODO: Add visuals like small trust badges or animated icons (security shield, world map, etc.) */}
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Transparency Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUpVariants}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-[#F8FAFC]">Our Commitment to Transparency</h2>
            <p className="text-lg text-[#94A3B8]">We believe in complete transparency and provide public access to our business credentials and mining data.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Business Certificates */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={itemVariants}
              className="rounded-2xl p-6 border-2 bg-[#1E293B] border-[#334155]"
            >
              <h3 className="text-xl font-semibold mb-4 text-yellow-400">Business Certificates</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-[#334155]">
                  <span className="text-[#94A3B8]">Malaysia Business Registration</span>
                  <motion.button whileHover={{ scale: 1.05 }} className="flex items-center gap-2 text-yellow-400 transition-colors">
                    <Download className="w-4 h-4" />
                    Download PDF
                  </motion.button>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-[#334155]">
                  <span className="text-[#94A3B8]">Mining License Certificate</span>
                  <motion.button whileHover={{ scale: 1.05 }} className="flex items-center gap-2 text-yellow-400 transition-colors">
                    <Download className="w-4 h-4" />
                    Download PDF
                  </motion.button>
                </div>
              </div>

              {/* TODO: Add small download icons and placeholder links */}
            </motion.div>

            {/* Transparency Reports */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={itemVariants} className="rounded-2xl p-6 border-2 bg-[#1E293B] border-[#334155]">
              <h3 className="text-xl font-semibold mb-4 text-yellow-400">Transparency Reports</h3>
              <div className="space-y-3">
                {transparencyReports.map((report, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-[#334155]">
                    <div>
                      <div className="text-sm text-[#94A3B8]">{report.date}</div>
                      <div className="font-medium text-[#F8FAFC]">{report.description}</div>
                    </div>
                    <motion.button whileHover={{ scale: 1.05 }} className="flex items-center gap-2 text-yellow-400 transition-colors">
                      <ExternalLink className="w-4 h-4" />
                      View
                    </motion.button>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Wallet Proofs */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={itemVariants}
            className="mt-8 rounded-2xl p-6 border-2 bg-[#1E293B] border-[#334155]"
          >
            <h3 className="text-xl font-semibold mb-4 text-yellow-400">Wallet Proofs</h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="p-3 rounded-lg bg-[#334155]">
                <div className="mb-1 text-[#94A3B8]">BTC Address:</div>
                <div className="font-mono text-xs break-all text-[#F8FAFC]">bc1qexample...</div>
              </div>
              <div className="p-3 rounded-lg bg-[#334155]">
                <div className="mb-1 text-[#94A3B8]">ETH Address:</div>
                <div className="font-mono text-xs break-all text-[#F8FAFC]">0xExample...</div>
              </div>
              <div className="p-3 rounded-lg bg-[#334155]">
                <div className="mb-1 text-[#94A3B8]">USDT (TRC20):</div>
                <div className="font-mono text-xs break-all text-[#F8FAFC]">TTExample...</div>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* Join CTA Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUpVariants}
          className="text-center py-16 rounded-2xl bg-gradient-to-br from-[#1E293B] via-[#334155] to-[#1E293B] border-2 border-[#334155]"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#F8FAFC]">
            Start earning daily with CoreBits Cloud Mining.
          </h2>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              href="/en/contact"
              className="inline-flex items-center px-8 py-4 font-semibold rounded-lg shadow-lg transition-all duration-300 bg-yellow-400 text-[#0F172A]"
            >
              Get Started Now
            </Link>
          </motion.div>
          
          {/* TODO: Add subtle animated mining sparkline or gold gradient behind text */}
        </motion.section>
      </main>

      <Footer dict={dict} />
    </div>
  );
}
