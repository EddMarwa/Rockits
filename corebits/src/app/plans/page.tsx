"use client";
import { motion } from 'framer-motion';
import Link from 'next/link';
import LandingNavbar from '@/components/LandingNavbar';
import Footer from '@/components/Footer';
import { Shield, Globe, Calendar, Lock, Download, ExternalLink } from 'lucide-react';

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
    {
      tier: "Starter",
      hashPower: "50 GH/s",
      duration: "30 days",
      dailyReturn: "2.5%",
      price: "$50",
      popular: false
    },
    {
      tier: "Pro Miner",
      hashPower: "150 GH/s", 
      duration: "60 days",
      dailyReturn: "3.2%",
      price: "$120",
      popular: true
    },
    {
      tier: "Elite Power",
      hashPower: "500 GH/s",
      duration: "90 days", 
      dailyReturn: "4.5%",
      price: "$250",
      popular: false
    },
    {
      tier: "Global Titan",
      hashPower: "1 TH/s",
      duration: "180 days",
      dailyReturn: "5.5%", 
      price: "$500",
      popular: false
    }
  ];

  const paymentPlatforms = [
    "Binance", "OKX", "Bybit", "TRON", "BNB", "BTC", "USDT"
  ];

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
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <LandingNavbar />
      
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Header / Intro Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUpVariants}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-yellow-400 mb-4">
            Choose Your Mining Power
          </h1>
          <p className="text-slate-300 text-center max-w-2xl mx-auto text-lg">
            Select from flexible, secure, and globally accessible mining plans. Profit distribution is daily, and payments are automated.
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
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {miningPlans.map((plan) => (
              <motion.div
                key={plan.tier}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                className={`bg-slate-800 rounded-2xl shadow-lg p-8 flex flex-col justify-between text-center relative ${
                  plan.popular ? 'ring-2 ring-yellow-400' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-yellow-400 text-slate-900 px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                
                {/* TODO: Add icon (e.g., mining rig, crypto coin, etc.) at the top of each card */}
                
                <div>
                  <h3 className="text-yellow-400 font-bold text-xl mb-2">{plan.tier}</h3>
                  <div className="text-3xl font-bold text-slate-50 mb-4">{plan.hashPower}</div>
                  
                  <div className="space-y-2 text-slate-300 mb-6">
                    <div className="flex justify-between py-2 border-b border-slate-700">
                      <span>Duration:</span>
                      <span className="font-semibold">{plan.duration}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-slate-700">
                      <span>Daily Return:</span>
                      <span className="font-semibold text-yellow-400">{plan.dailyReturn}</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span>Price:</span>
                      <span className="font-semibold text-2xl text-slate-50">{plan.price}</span>
                    </div>
                  </div>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-6 bg-yellow-400 text-slate-900 font-semibold py-3 px-6 rounded-lg hover:bg-yellow-300 transition-all duration-300 hover:shadow-[0_0_20px_rgba(234,179,8,0.3)]"
                >
                  Buy Now
                </motion.button>
              </motion.div>
            ))}
          </div>
          
          {/* TODO: Replace placeholder plan data with real values */}
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
            <h2 className="text-3xl font-bold text-slate-50 mb-4">Supported Payment Systems</h2>
            <p className="text-slate-300 text-lg">
              CoreBits accepts a range of secure crypto payment options for your convenience.
            </p>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4"
          >
            {paymentPlatforms.map((platform) => (
              <motion.div
                key={platform}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -4 }}
                className="bg-slate-800 p-4 rounded-xl flex items-center justify-center hover:shadow-yellow-400/20 hover:scale-105 transition-all duration-300 border border-slate-700"
              >
                {/* TODO: Add image placeholders — one <img> per platform, wrapped in clickable divs with hover glow. */}
                {/* TODO: Add comment: // Replace image src later with official platform logos */}
                <span className="text-slate-300 font-medium text-sm">{platform}</span>
              </motion.div>
            ))}
          </motion.div>
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
            <h2 className="text-3xl font-bold text-slate-50 mb-4">Why Choose CoreBits</h2>
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
                className="bg-slate-800 rounded-2xl p-6 shadow-md hover:-translate-y-2 transition-all duration-300 border border-slate-700"
              >
                <feature.icon className="text-yellow-400 w-10 h-10 mb-3" />
                <h3 className="text-lg font-semibold text-yellow-400 mb-2">{feature.title}</h3>
                <p className="text-slate-300 text-sm">{feature.description}</p>
                
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
            <h2 className="text-3xl font-bold text-slate-50 mb-4">Our Commitment to Transparency</h2>
            <p className="text-slate-300 text-lg">
              We believe in complete transparency and provide public access to our business credentials and mining data.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Business Certificates */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={itemVariants}
              className="bg-slate-800 rounded-2xl p-6 border border-slate-700"
            >
              <h3 className="text-xl font-semibold text-yellow-400 mb-4">Business Certificates</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
                  <span className="text-slate-300">Malaysia Business Registration</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 text-yellow-400 hover:text-yellow-300 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Download PDF
                  </motion.button>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
                  <span className="text-slate-300">Mining License Certificate</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 text-yellow-400 hover:text-yellow-300 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Download PDF
                  </motion.button>
                </div>
              </div>
              
              {/* TODO: Add small download icons and placeholder links */}
            </motion.div>

            {/* Transparency Reports */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={itemVariants}
              className="bg-slate-800 rounded-2xl p-6 border border-slate-700"
            >
              <h3 className="text-xl font-semibold text-yellow-400 mb-4">Transparency Reports</h3>
              <div className="space-y-3">
                {transparencyReports.map((report, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
                    <div>
                      <div className="text-slate-300 text-sm">{report.date}</div>
                      <div className="text-slate-50 font-medium">{report.description}</div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center gap-2 text-yellow-400 hover:text-yellow-300 transition-colors"
                    >
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
            className="mt-8 bg-slate-800 rounded-2xl p-6 border border-slate-700"
          >
            <h3 className="text-xl font-semibold text-yellow-400 mb-4">Wallet Proofs</h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="bg-slate-700 p-3 rounded-lg">
                <div className="text-slate-400 mb-1">BTC Address:</div>
                <div className="text-slate-300 font-mono text-xs break-all">bc1qexample...</div>
              </div>
              <div className="bg-slate-700 p-3 rounded-lg">
                <div className="text-slate-400 mb-1">ETH Address:</div>
                <div className="text-slate-300 font-mono text-xs break-all">0xExample...</div>
              </div>
              <div className="bg-slate-700 p-3 rounded-lg">
                <div className="text-slate-400 mb-1">USDT (TRC20):</div>
                <div className="text-slate-300 font-mono text-xs break-all">TTExample...</div>
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
          className="text-center py-16 bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 rounded-2xl"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-50 mb-6">
            Start earning daily with CoreBits Cloud Mining.
          </h2>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              href="/en/contact"
              className="inline-flex items-center px-8 py-4 bg-yellow-400 text-slate-900 font-semibold rounded-lg shadow-lg hover:bg-yellow-300 transition-all duration-300 hover:shadow-[0_0_30px_rgba(234,179,8,0.4)]"
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
