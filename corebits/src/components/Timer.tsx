"use client";
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

type TimerProps = {
  target: string; // ISO date
  label: string;
};

export default function Timer({ target, label }: TimerProps) {
  const [diff, setDiff] = useState<number>(0);

  useEffect(() => {
    const update = () => setDiff(dayjs(target).diff(dayjs(), 'second'));
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [target]);

  const positive = Math.max(0, diff);
  const days = Math.floor(positive / 86400);
  const hours = Math.floor((positive % 86400) / 3600);
  const minutes = Math.floor((positive % 3600) / 60);
  const seconds = positive % 60;

  return (
    <div className="rounded-xl p-[2px] bg-gradient-to-r from-[#004B87] to-[#FFD700] inline-block">
      <div className="bg-background rounded-xl px-4 py-3">
        <p className="text-sm mb-1 opacity-80">{label}</p>
        <div className="flex gap-4 font-semibold">
          <TimeBox v={days} unit="D" />
          <TimeBox v={hours} unit="H" />
          <TimeBox v={minutes} unit="M" />
          <TimeBox v={seconds} unit="S" />
        </div>
      </div>
    </div>
  );
}

function TimeBox({ v, unit }: { v: number; unit: string }) {
  return (
    <div className="text-center">
      <div className="text-2xl tabular-nums">{String(v).padStart(2, '0')}</div>
      <div className="text-xs opacity-70">{unit}</div>
    </div>
  );
}

