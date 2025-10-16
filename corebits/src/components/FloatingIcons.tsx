"use client";
import { motion } from 'framer-motion';

export default function FloatingIcons() {
  const items = [
    { label: 'BTC', x: 10, y: 20, delay: 0 },
    { label: 'ETH', x: 70, y: 30, delay: 0.2 },
    { label: 'USDT', x: 40, y: 70, delay: 0.4 },
  ];
  return (
    <div className="absolute inset-0 pointer-events-none select-none">
      {items.map((it) => (
        <motion.div
          key={it.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 0.3, y: [0, -8, 0] }}
          transition={{ delay: it.delay, duration: 6, repeat: Infinity }}
          className="text-xs md:text-sm"
          style={{ position: 'absolute', left: `${it.x}%`, top: `${it.y}%` }}
        >
          <span className="inline-block rounded-full bg-white/80 border border-black/10 px-2 py-1 shadow-sm">
            {it.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

