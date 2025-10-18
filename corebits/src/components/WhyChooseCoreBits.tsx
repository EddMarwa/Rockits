"use client";
import { motion } from 'framer-motion';
import { Lock, Calendar, Shield, Globe } from 'lucide-react';

export default function WhyChooseCoreBits() {
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
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

  const shimmerVariants = {
    initial: { x: "-100%" },
    animate: {
      x: "100%",
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatDelay: 3,
        ease: [0.25, 0.46, 0.45, 0.94] as const
      }
    }
  };

  const cards = [
    {
      title: "Secure Cloud Mining",
      description: "CoreBits leverages secure, energy-efficient mining infrastructure designed for maximum uptime and transparency.",
      icon: Lock,
      badge: "99.9% Uptime Verified",
      iconComment: "// TODO: Add mining rack or blockchain security icon",
      badgeComment: "// TODO: Add small verified badge graphic"
    },
    {
      title: "Daily Profit Distribution",
      description: "Rewards are distributed daily using automated smart allocation — ensuring users earn consistently without delays.",
      icon: Calendar,
      badge: "Instant Payouts Enabled",
      iconComment: "// TODO: Add calendar or payout icon",
      badgeComment: "// TODO: Add small payout graph or animation placeholder"
    },
    {
      title: "Malaysia Registered Business",
      description: "Legally registered and compliant under Malaysian authorities, guaranteeing transparent and ethical operations.",
      icon: Shield,
      badge: "Gov. Registered – 2025",
      iconComment: "// TODO: Add Malaysia flag or certificate image placeholder",
      badgeComment: "// TODO: Add registration badge visual"
    },
    {
      title: "Global Access",
      description: "Our global infrastructure allows miners and investors from around the world to participate seamlessly in the CoreBits ecosystem.",
      icon: Globe,
      badge: "150+ Countries Supported",
      iconComment: "// TODO: Add global network image or subtle animation",
      badgeComment: "// TODO: Add global reach mini-map placeholder"
    }
  ];

  return (
    <section className="relative py-16 px-6 md:px-12 bg-slate-950 overflow-hidden">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 via-transparent to-transparent"></div>
        <motion.div
          className="absolute inset-0"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear"
          }}
          style={{
            backgroundImage: `
              linear-gradient(90deg, transparent 24%, rgba(234, 179, 8, 0.1) 25%, rgba(234, 179, 8, 0.1) 26%, transparent 27%, transparent 74%, rgba(234, 179, 8, 0.1) 75%, rgba(234, 179, 8, 0.1) 76%, transparent 77%),
              linear-gradient(transparent 24%, rgba(234, 179, 8, 0.1) 25%, rgba(234, 179, 8, 0.1) 26%, transparent 27%, transparent 74%, rgba(234, 179, 8, 0.1) 75%, rgba(234, 179, 8, 0.1) 76%, transparent 77%)
            `,
            backgroundSize: "50px 50px"
          }}
        />
        {/* TODO: Add optional animated mining grid background layer for aesthetics */}
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUpVariants}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-50 mb-6">
            Why Choose <span className="text-yellow-400">CoreBits?</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Discover what makes CoreBits a trusted cloud mining agency in Asia.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto mt-12"
        >
          {cards.map((card, index) => {
            const IconComponent = card.icon;
            
            return (
              <motion.div
                key={index}
                variants={fadeUpVariants}
                whileHover={{ 
                  y: -8,
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                className="relative group"
              >
                <div className="relative bg-slate-800 rounded-2xl p-8 border-t-4 border-yellow-400 hover:shadow-[0_20px_40px_rgba(234,179,8,0.15)] transition-all duration-300 overflow-hidden">
                  
                  {/* Shimmer Effect */}
                  <motion.div
                    className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-0 group-hover:opacity-100"
                    variants={shimmerVariants}
                    initial="initial"
                    animate="animate"
                  />

                  {/* Inner Glow Effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-yellow-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Card Content */}
                  <div className="relative z-10">
                    {/* Icon */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="p-3 bg-yellow-400/10 rounded-xl group-hover:bg-yellow-400/20 transition-colors duration-300">
                        <IconComponent className="w-8 h-8 text-yellow-400" />
                      </div>
                      <div className="text-xs text-slate-500 italic">
                        {card.iconComment}
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-slate-50 mb-4 group-hover:text-yellow-400 transition-colors duration-300">
                      {card.title}
                    </h3>

                    {/* Description */}
                    <p className="text-slate-400 leading-relaxed mb-6">
                      {card.description}
                    </p>

                    {/* Trust Badge */}
                    <div className="flex items-center justify-between">
                      <div className="inline-flex items-center px-3 py-1 bg-slate-700/50 rounded-full border border-slate-600 group-hover:border-yellow-400/50 transition-colors duration-300">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
                        <span className="text-xs text-slate-300 font-medium">
                          {card.badge}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 italic">
                        {card.badgeComment}
                      </div>
                    </div>

                    {/* Learn More Link */}
                    <div className="mt-6 flex items-center text-sm text-slate-400 group-hover:text-yellow-400 transition-colors duration-300">
                      <span>Learn More</span>
                      <motion.svg 
                        className="w-4 h-4 ml-2"
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                        whileHover={{ x: 4 }}
                        transition={{ duration: 0.2 }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </motion.svg>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUpVariants}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center px-6 py-3 bg-slate-800/50 border border-slate-700 rounded-full group hover:border-yellow-400/50 transition-colors duration-300">
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center text-slate-400 group-hover:text-yellow-400 transition-colors">
                <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2 animate-pulse" />
                <span>Trusted by 50,000+ Users</span>
              </div>
              <div className="w-px h-4 bg-slate-600" />
              <div className="flex items-center text-slate-400 group-hover:text-yellow-400 transition-colors">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
                <span>99.9% Uptime Guaranteed</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
