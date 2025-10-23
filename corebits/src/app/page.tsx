"use client";
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import LandingNavbar from '@/components/LandingNavbar';
import Footer from '@/components/Footer';
import NotifyForm from '@/components/NotifyForm';

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Read launch date from env (NEXT_PUBLIC_LAUNCH_DATE) or fallback
    const launchDateStr = process.env.NEXT_PUBLIC_LAUNCH_DATE || '2025-12-01T00:00:00';
    const targetDate = new Date(launchDateStr).getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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
  notify: { title: "Stay Updated", placeholder: "Enter email", button: "Notify me", success: "Thank you!" },
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

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
  <LandingNavbar locale="en" />
      
      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-slate-800 to-slate-950 flex items-center justify-center px-6 md:px-12">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUpVariants}
            className="space-y-8"
          >
            {/* Logo/Title */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h1 className="text-6xl md:text-8xl font-bold text-slate-50 mb-4">
                CoreBits
          </h1>
            </motion.div>

            {/* Motto */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-3xl md:text-5xl font-bold text-yellow-400 mb-6"
            >
              Powering the Future, One Bit at a Time.
            </motion.h2>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-xl md:text-2xl text-slate-400 max-w-4xl mx-auto leading-relaxed mb-12"
            >
              Join the next generation of decentralized miners and investors building global digital wealth together.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  href={`/${'en'}/plans`} 
                  className="inline-flex items-center px-8 py-4 bg-yellow-400 text-slate-900 font-semibold rounded-lg shadow-lg hover:bg-yellow-300 transition-all duration-300 hover:shadow-[0_0_30px_rgba(234,179,8,0.4)]"
                >
                  View Mining Plans
                </Link>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  href={`/${'en'}/about`} 
                  className="inline-flex items-center px-8 py-4 border-2 border-yellow-400 text-yellow-400 font-semibold rounded-lg hover:bg-yellow-400 hover:text-slate-900 transition-all duration-300"
                >
                Learn More
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
          
          {/* TODO: Add hero banner or animated mining background visual here */}
          </div>
        </section>

      {/* Countdown Timer Section */}
      <section className="py-20 px-6 md:px-12 bg-slate-900/50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariants}
            className="space-y-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-50 mb-4">
              Application Launch Countdown
            </h2>
            <p className="text-xl text-slate-400 mb-12">
              We&apos;re gearing up to launch the CoreBits Mining Platform soon. Stay tuned!
            </p>

            {/* Timer Boxes */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6"
            >
              {[
                { label: 'Days', value: timeLeft.days },
                { label: 'Hours', value: timeLeft.hours },
                { label: 'Minutes', value: timeLeft.minutes },
                { label: 'Seconds', value: timeLeft.seconds }
              ].map((item) => (
                <motion.div
                  key={item.label}
                  variants={itemVariants}
                  className="bg-slate-800 p-6 rounded-xl shadow-inner border border-slate-700"
                >
                  <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">
                    {item.value.toString().padStart(2, '0')}
                </div>
                  <div className="text-slate-400 font-medium">
                    {item.label}
              </div>
                </motion.div>
            ))}
            </motion.div>
          </motion.div>
          
          {/* TODO: Add background texture or subtle motion blur behind timer */}
          </div>
        </section>

      {/* Call to Action Banner */}
      <section className="py-20 px-6 md:px-12 bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariants}
            className="space-y-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-50 mb-6">
              Be part of the global mining revolution — secure your hash power today!
            </h2>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                href={`/${'en'}`} 
                className="inline-flex items-center px-8 py-4 bg-yellow-400 text-slate-900 font-semibold rounded-lg shadow-lg hover:bg-yellow-300 transition-all duration-300 hover:shadow-[0_0_30px_rgba(234,179,8,0.4)]"
              >
                View Mining Plans
              </Link>
            </motion.div>
          </motion.div>
          </div>
        </section>

      {/* Updates/Announcements Preview */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariants}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-50 mb-4">
              CoreBits Official Updates
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-6"
          >
            {[
              { date: '2025-09-01', title: 'CoreBits Expands Mining Capacity' },
              { date: '2025-10-10', title: 'TRON and BNB Payments Now Supported' },
              { date: '2025-11-05', title: 'Mobile App Beta Coming Soon' }
            ].map((update) => (
              <motion.div
                key={update.date}
                variants={itemVariants}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="bg-slate-800 p-6 rounded-xl hover:shadow-[0_20px_40px_rgba(234,179,8,0.1)] transition-all duration-300 border border-slate-700"
              >
                <div className="text-sm text-yellow-400 font-medium mb-3">
                  {update.date}
                </div>
                <div className="text-lg font-semibold text-slate-50 mb-4">
                  {update.title}
                </div>
                <div className="text-slate-400 text-sm">
                  {/* TODO: Add placeholder for small update icons or timeline visuals */}
              </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariants}
            className="text-center mt-8"
          >
            <Link 
              href={`/${'en'}/announcements`} 
              className="inline-flex items-center px-6 py-3 border border-slate-600 text-slate-300 font-medium rounded-lg hover:border-yellow-400 hover:text-yellow-400 transition-all duration-300"
            >
              Read All
            </Link>
          </motion.div>
          </div>
        </section>

      {/* Application Launch Countdown / Get Notified */}
      <section className="py-20 px-6 md:px-12 bg-gradient-to-b from-slate-800 to-slate-950 text-slate-50">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariants} className="space-y-8">
            <div className="bg-slate-800 p-8 rounded-xl shadow-sm border border-slate-700">
              <h2 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">
                ⏳ Application Launch Countdown
              </h2>

              <p className="text-slate-300 mt-2 mb-6">CoreBits Cloud Mining is almost here! Enter your email to be notified the moment we go live.</p>

              <div id="countdown" className="flex flex-col md:flex-row justify-center gap-6 items-center">
                <div className="flex gap-6 text-center items-baseline">
                  <div>
                    <motion.span animate={{ scale: [1, 1.03, 1] }} transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 0.6 }} className="text-5xl md:text-7xl font-extrabold text-yellow-400 drop-shadow-[0_8px_30px_rgba(234,179,8,0.12)]">{String(timeLeft.days).padStart(2, '0')}</motion.span>
                    <p className="text-xs text-slate-400 mt-2">Days</p>
                  </div>
                  <div>
                    <motion.span animate={{ scale: [1, 1.03, 1] }} transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 0.6 }} className="text-5xl md:text-7xl font-extrabold text-yellow-400 drop-shadow-[0_8px_30px_rgba(234,179,8,0.12)]">{String(timeLeft.hours).padStart(2, '0')}</motion.span>
                    <p className="text-xs text-slate-400 mt-2">Hours</p>
                  </div>
                  <div>
                    <motion.span animate={{ scale: [1, 1.03, 1] }} transition={{ duration: 1.4, repeat: Infinity, repeatDelay: 0.6 }} className="text-5xl md:text-7xl font-extrabold text-yellow-400 drop-shadow-[0_8px_30px_rgba(234,179,8,0.12)]">{String(timeLeft.minutes).padStart(2, '0')}</motion.span>
                    <p className="text-xs text-slate-400 mt-2">Minutes</p>
                  </div>
                  <div>
                    <motion.span animate={{ scale: [1, 1.03, 1] }} transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 0.6 }} className="text-5xl md:text-7xl font-extrabold text-yellow-400 drop-shadow-[0_8px_30px_rgba(234,179,8,0.12)]">{String(timeLeft.seconds).padStart(2, '0')}</motion.span>
                    <p className="text-xs text-slate-400 mt-2">Seconds</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-center mt-6">
                <div className="flex flex-col sm:flex-row justify-center gap-2 max-w-sm mx-auto w-full">
                  <NotifyForm
                    dict={dict}
                    inputClassName="flex-1 rounded-md bg-slate-800 border border-slate-700 text-white px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-yellow-400"
                    buttonClassName="px-6 py-3 bg-yellow-400 text-slate-900 font-semibold rounded-lg hover:opacity-95 transition w-full sm:w-auto"
                  />
                </div>
              </div>

              {/* trust badges */}
              <div className="mt-6 flex justify-center gap-4 opacity-90">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-700 border border-slate-600 text-sm text-slate-200">
                  <span className="inline-block w-2 h-2 bg-yellow-400 rounded-full" />
                  <span>Secure Payments</span>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-700 border border-slate-600 text-sm text-slate-200">
                  <span className="inline-block w-2 h-2 bg-yellow-400 rounded-full" />
                  <span>24/7 Monitoring</span>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-700 border border-slate-600 text-sm text-slate-200">
                  <span className="inline-block w-2 h-2 bg-yellow-400 rounded-full" />
                  <span>Global Nodes</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer dict={dict} />
    </div>
  );
}
