"use client";
import { motion } from 'framer-motion';
import Link from 'next/link';
import LandingNavbar from '@/components/LandingNavbar';
import Footer from '@/components/Footer';
import WhyChooseCoreBits from '@/components/WhyChooseCoreBits';

export default function About() {
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
                href="/en/certificates" 
                className="inline-flex items-center px-8 py-4 bg-yellow-400 text-slate-950 font-semibold rounded-xl hover:shadow-[0_0_30px_rgba(234,179,8,0.4)] transition-all duration-300"
              >
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
                    We aim to become Asia&apos;s leading mining agency by setting new standards in transparency, sustainability, and innovation.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-slate-800 rounded-2xl p-8 h-96 flex items-center justify-center">
                <div className="text-center text-slate-500">
                  <div className="text-sm">{/* TODO: Add image related to mining facility */}</div>
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

