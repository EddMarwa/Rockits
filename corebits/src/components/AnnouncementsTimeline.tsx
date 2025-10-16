"use client";
import { motion } from 'framer-motion';

type Item = { date: string; title: string; desc: string };

export default function AnnouncementsTimeline({ items }: { items: Item[] }) {
  return (
    <div className="relative pl-6">
      <div className="absolute left-2 top-0 bottom-0 w-px bg-black/10 dark:bg-white/10" />
      <div className="space-y-6">
        {items.map((a, i) => (
          <motion.div
            key={a.date}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="relative"
          >
            <div className="absolute -left-2 top-2 h-3 w-3 rounded-full bg-[#004B87]" />
            <div className="rounded-lg p-5 border bg-white/50 dark:bg-black/30 border-black/10 dark:border-white/10">
              <div className="text-xs opacity-70">{a.date}</div>
              <div className="font-medium">{a.title}</div>
              <div className="text-sm opacity-80">{a.desc}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

