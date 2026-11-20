"use client";

import { motion } from "motion/react";
import { EASE_LUXE } from "@/components/ui/Reveal";

type Segment = { label: string; pct: number; hex: string };

function isDark(hex: string) {
  const n = hex.replace("#", "");
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(n.slice(i, i + 2), 16));
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 < 0.5;
}

/** The 60·30·10 proportion bar: segments grow into their share on first view. */
export default function ShareBar({ segments }: { segments: Segment[] }) {
  return (
    <div className="flex h-20 overflow-hidden rounded-2xl border border-line-light">
      {segments.map((s, i) => (
        <motion.div
          key={s.label}
          className="flex items-end overflow-hidden p-3"
          style={{ backgroundColor: s.hex, color: isDark(s.hex) ? "#F2F0EB" : "#222223" }}
          initial={{ width: 0 }}
          whileInView={{ width: `${s.pct}%` }}
          viewport={{ once: true, margin: "-8% 0px" }}
          transition={{ width: { duration: 1, ease: EASE_LUXE, delay: i * 0.12 } }}
        >
          <span className="hidden text-xs font-semibold whitespace-nowrap sm:inline">
            {s.label} · {s.pct}%
          </span>
        </motion.div>
      ))}
    </div>
  );
}
