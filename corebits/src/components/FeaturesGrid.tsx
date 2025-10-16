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
          className="rounded-lg p-5 border bg-white/50 dark:bg-black/30 border-black/10 dark:border-white/10"
        >
          {f}
        </motion.div>
      ))}
    </section>
  );
}

