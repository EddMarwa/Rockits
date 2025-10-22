"use client";
import { motion } from 'framer-motion';
import Link from 'next/link';
import LandingNavbar from '@/components/LandingNavbar';
import Footer from '@/components/Footer';
import { Shield, Globe, Calendar, Lock, Download, ExternalLink, Check } from 'lucide-react';

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
      tagline: "Perfect for beginners",
      hashPower: "50 GH/s",
      duration: "60 days",
      roi: "120%",
      price: "$30",
      popular: false,
      features: ["Daily payouts", "24/7 support", "Secure mining"]
    },
    {
      tier: "Bronze",
      tagline: "Steady growth plan",
      hashPower: "200 GH/s",
      duration: "90 days",
      roi: "150%",
      price: "$100",
      popular: false,
      features: ["Higher hash rate", "Priority support", "Auto reinvestment"]
    },
    {
      tier: "Silver",
      tagline: "Balanced investment",
      hashPower: "1 TH/s",
      duration: "120 days",
      roi: "180%",
      price: "$500",
      popular: false,
      features: ["Premium support", "Advanced analytics", "Flexible terms"]
    },
    {
      tier: "Gold",
      tagline: "Professional mining",
      hashPower: "2.5 TH/s",
      duration: "150 days",
      roi: "200%",
      price: "$1000",
      popular: true,
      features: ["Maximum efficiency", "Dedicated manager", "Custom solutions"]
    },
    {
      tier: "Platinum",
      tagline: "Elite-grade performance",
      hashPower: "3.5 TH/s",
      duration: "170 days",
      roi: "230%",
      price: "$1500",
      popular: false,
      features: ["VIP priority payouts", "Referral bonus", "Audit-backed rewards"]
    },
    {
      tier: "Diamond",
      tagline: "Enterprise level",
      hashPower: "5 TH/s",
      duration: "180 days",
      roi: "250%",
      price: "$3000",
      popular: false,
      features: ["VIP treatment", "Exclusive access", "White-label options"]
    },
    {
      tier: "Elite",
      tagline: "Ultimate investment package",
      hashPower: "10 TH/s",
      duration: "220 days",
      roi: "300%",
      price: "$5000",
      popular: false,
      features: [
        "Private mining node",
        "Custom ROI structure",
        "Dedicated account manager"
      ]
    }
  ];
/*  
  const miningPlans = [
    {
      tier: "Starter",
      tagline: "Perfect for beginners",
      hashPower: "50 GH/s",
      duration: "60 days",
      roi: "120%",
      price: "$30",
      popular: false,
      features: ["Daily payouts", "24/7 support", "Secure mining"]
    },
    {
      tier: "Bronze",
      tagline: "Steady growth plan",
      hashPower: "200 GH/s",
      duration: "90 days",
      roi: "150%",
      price: "$100",
      popular: false,
      features: ["Higher hash rate", "Priority support", "Auto reinvestment"]
    },
    {
      tier: "Silver",
      tagline: "Balanced investment",
      hashPower: "1 TH/s",
      duration: "120 days",
      roi: "180%",
      price: "$500",
      popular: false,
      features: ["Premium support", "Advanced analytics", "Flexible terms"]
    },
    {
      tier: "Gold",
      tagline: "Professional mining",
      hashPower: "2.5 TH/s",
      duration: "150 days",
      roi: "200%",
      price: "$1000",
      popular: true,
      features: ["Maximum efficiency", "Dedicated manager", "Custom solutions"]
    },
    {
      tier: "Diamond",
      tagline: "Enterprise level",
      hashPower: "5 TH/s",
      duration: "180 days",
      roi: "250%",
      price: "$3000",
      popular: false,
      features: ["VIP treatment", "Exclusive access", "White-label options"]
    }
  ];
  */ 

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
    <div className="min-h-screen" style={{ backgroundColor: '#0F172A' }}>
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
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4" style={{ color: '#F8FAFC' }}>
            Choose Your Mining Power
          </h1>
          <p className="text-center max-w-2xl mx-auto text-lg" style={{ color: '#94A3B8' }}>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {miningPlans.map((plan) => (
              <motion.div
                key={plan.tier}
                variants={itemVariants}
                whileHover={{ 
                  y: -12, 
                  scale: 1.02,
                  boxShadow: '0 20px 40px rgba(234, 179, 8, 0.15)',
                  borderColor: '#EAB308'
                }}
                className={`rounded-2xl shadow-lg p-8 flex flex-col justify-between text-center relative border-2 transition-all duration-300 ${
                  plan.popular 
                    ? 'border-yellow-400' 
                    : 'border-transparent hover:border-yellow-400/50'
                }`}
                style={{ backgroundColor: '#1E293B' }}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span 
                      className="px-4 py-1 rounded-full text-sm font-semibold"
                      style={{ backgroundColor: '#EAB308', color: '#0F172A' }}
                    >
                      Most Popular
                    </span>
                  </div>
                )}
                
                {/* TODO: Add icon (e.g., mining rig, crypto coin, etc.) at the top of each card */}
                
                <div>
                  <h3 className="font-bold text-xl mb-2" style={{ color: '#EAB308' }}>
                    {plan.tier}
                  </h3>
                  <p className="text-sm mb-4" style={{ color: '#94A3B8' }}>
                    {plan.tagline}
                  </p>
                  
                  <div className="text-4xl font-bold mb-2" style={{ color: '#F8FAFC' }}>
                    {plan.price}
                    </div>
                  
                  <div className="text-lg font-semibold mb-6" style={{ color: '#EAB308' }}>
                    {plan.hashPower}
                    </div>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between py-2 border-b" style={{ borderColor: '#334155' }}>
                      <span style={{ color: '#94A3B8' }}>Duration:</span>
                      <span className="font-semibold" style={{ color: '#F8FAFC' }}>{plan.duration}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b" style={{ borderColor: '#334155' }}>
                      <span style={{ color: '#94A3B8' }}>ROI:</span>
                      <span className="font-semibold" style={{ color: '#EAB308' }}>{plan.roi}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-6">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Check className="w-4 h-4" style={{ color: '#EAB308' }} />
                        <span className="text-sm" style={{ color: '#94A3B8' }}>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-6 font-semibold py-3 px-6 rounded-lg transition-all duration-300"
                  style={{ 
                    backgroundColor: '#EAB308', 
                    color: '#0F172A',
                    boxShadow: '0 4px 14px rgba(234, 179, 8, 0.3)'
                  }}
                >
                  Buy Hash Power
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
            <h2 className="text-3xl font-bold mb-4" style={{ color: '#F8FAFC' }}>
              Supported Payment Platforms
            </h2>
            <p className="text-lg" style={{ color: '#94A3B8' }}>
              CoreBits accepts a range of secure crypto payment options for your convenience.
            </p>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-6"
          >
            {paymentPlatforms.map((platform) => (
              <motion.div
                key={platform}
                variants={itemVariants}
                whileHover={{ scale: 1.1, opacity: 0.8 }}
                className="p-4 rounded-xl flex items-center justify-center transition-all duration-300 border-2 border-transparent hover:border-yellow-400/30"
                style={{ backgroundColor: '#1E293B' }}
              >
                {/* TODO: Add image placeholders — one <img> per platform, wrapped in clickable divs with hover glow. */}
                {/* TODO: Add comment: // Replace image src later with official platform logos */}
                <span className="font-medium text-sm" style={{ color: '#94A3B8' }}>{platform}</span>
              </motion.div>
            ))}
          </motion.div>
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
                className="inline-flex items-center px-8 py-4 font-semibold rounded-lg transition-all duration-300 border-2"
                style={{ 
                  backgroundColor: 'transparent', 
                  color: '#EAB308',
                  borderColor: '#EAB308'
                }}
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
                className="inline-flex items-center px-8 py-4 font-semibold rounded-lg transition-all duration-300"
                style={{ 
                  backgroundColor: '#EAB308', 
                  color: '#0F172A',
                  boxShadow: '0 4px 14px rgba(234, 179, 8, 0.3)'
                }}
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
            <h2 className="text-3xl font-bold mb-4" style={{ color: '#F8FAFC' }}>
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
                className="rounded-2xl p-6 shadow-md hover:-translate-y-2 transition-all duration-300 border-2 border-transparent hover:border-yellow-400/30"
                style={{ backgroundColor: '#1E293B' }}
              >
                <feature.icon className="w-10 h-10 mb-3" style={{ color: '#EAB308' }} />
                <h3 className="text-lg font-semibold mb-2" style={{ color: '#EAB308' }}>
                  {feature.title}
                </h3>
                <p className="text-sm" style={{ color: '#94A3B8' }}>
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
            <h2 className="text-3xl font-bold mb-4" style={{ color: '#F8FAFC' }}>
              Our Commitment to Transparency
            </h2>
            <p className="text-lg" style={{ color: '#94A3B8' }}>
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
              className="rounded-2xl p-6 border-2"
              style={{ backgroundColor: '#1E293B', borderColor: '#334155' }}
            >
              <h3 className="text-xl font-semibold mb-4" style={{ color: '#EAB308' }}>
                Business Certificates
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: '#334155' }}>
                  <span style={{ color: '#94A3B8' }}>Malaysia Business Registration</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 transition-colors"
                    style={{ color: '#EAB308' }}
                  >
                    <Download className="w-4 h-4" />
                    Download PDF
                  </motion.button>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: '#334155' }}>
                  <span style={{ color: '#94A3B8' }}>Mining License Certificate</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 transition-colors"
                    style={{ color: '#EAB308' }}
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
              className="rounded-2xl p-6 border-2"
              style={{ backgroundColor: '#1E293B', borderColor: '#334155' }}
            >
              <h3 className="text-xl font-semibold mb-4" style={{ color: '#EAB308' }}>
                Transparency Reports
              </h3>
              <div className="space-y-3">
                {transparencyReports.map((report, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: '#334155' }}>
                    <div>
                      <div className="text-sm" style={{ color: '#94A3B8' }}>{report.date}</div>
                      <div className="font-medium" style={{ color: '#F8FAFC' }}>{report.description}</div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center gap-2 transition-colors"
                      style={{ color: '#EAB308' }}
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
            className="mt-8 rounded-2xl p-6 border-2"
            style={{ backgroundColor: '#1E293B', borderColor: '#334155' }}
          >
            <h3 className="text-xl font-semibold mb-4" style={{ color: '#EAB308' }}>
              Wallet Proofs
            </h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="p-3 rounded-lg" style={{ backgroundColor: '#334155' }}>
                <div className="mb-1" style={{ color: '#94A3B8' }}>BTC Address:</div>
                <div className="font-mono text-xs break-all" style={{ color: '#F8FAFC' }}>bc1qexample...</div>
              </div>
              <div className="p-3 rounded-lg" style={{ backgroundColor: '#334155' }}>
                <div className="mb-1" style={{ color: '#94A3B8' }}>ETH Address:</div>
                <div className="font-mono text-xs break-all" style={{ color: '#F8FAFC' }}>0xExample...</div>
              </div>
              <div className="p-3 rounded-lg" style={{ backgroundColor: '#334155' }}>
                <div className="mb-1" style={{ color: '#94A3B8' }}>USDT (TRC20):</div>
                <div className="font-mono text-xs break-all" style={{ color: '#F8FAFC' }}>TTExample...</div>
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
          className="text-center py-16 rounded-2xl"
          style={{ 
            background: 'linear-gradient(135deg, #1E293B 0%, #334155 50%, #1E293B 100%)',
            border: '2px solid #334155'
          }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: '#F8FAFC' }}>
            Start earning daily with CoreBits Cloud Mining.
          </h2>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              href="/en/contact"
              className="inline-flex items-center px-8 py-4 font-semibold rounded-lg shadow-lg transition-all duration-300"
              style={{ 
                backgroundColor: '#EAB308', 
                color: '#0F172A',
                boxShadow: '0 8px 25px rgba(234, 179, 8, 0.4)'
              }}
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
