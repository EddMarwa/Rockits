"use client";
import { motion } from 'framer-motion';

export default function FeaturesGrid({ items }: { items: string[] }) {
  return (
    <section id="features" className="grid md:grid-cols-4 gap-6 mt-12">
      {items.map((f, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          viewport={{ once: true }}
          className="rounded-2xl p-5 border bg-[#1E293B] border-white/10 hover:border-[#EAB308]/40 hover:shadow-[0_0_0_3px_rgba(234,179,8,0.08)] transition"
        >
          {/* TODO: Optionally add small icon above each feature title */}
          {f}
        </motion.div>
      ))}
    </section>
  );
}

