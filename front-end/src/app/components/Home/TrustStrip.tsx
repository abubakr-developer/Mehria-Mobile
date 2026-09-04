"use client";

import { motion } from "framer-motion";
import { BadgeCheck, Truck, Banknote, RotateCcw } from "lucide-react";

const trustPoints = [
  { icon: BadgeCheck, label: "100% Genuine Products", bg: "#E8F4F1", color: "#1F7A6C" },
  { icon: Truck, label: "Same-Day Delivery in Lodhran", bg: "#EAF2FA", color: "#26649A" },
  { icon: Banknote, label: "Cash on Delivery", bg: "#FDF3E3", color: "#B8791F" },
  { icon: RotateCcw, label: "Easy Exchange", bg: "#F5EAFA", color: "#7A3FA0" },
];

export default function TrustStrip() {
  return (
    <div className="border-y-2 border-dashed border-[#3C3837]/15 bg-white overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8 py-5 sm:py-6 flex flex-wrap items-center justify-center lg:justify-between gap-x-4 gap-y-3">
        {trustPoints.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 12, rotate: i % 2 === 0 ? -2 : 2 }}
            whileInView={{ opacity: 1, y: 0, rotate: i % 2 === 0 ? -1 : 1 }}
            whileHover={{ rotate: 0, scale: 1.04 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            style={{ backgroundColor: item.bg }}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl border-2 border-[#3C3837]/[0.08] shadow-[2px_3px_0_rgba(60,56,55,0.06)]"
          >
            <motion.div
              animate={{ rotate: [0, -8, 8, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.4, ease: "easeInOut" }}
            >
              <item.icon size={17} style={{ color: item.color }} />
            </motion.div>
            <span
              className="text-[12.5px] sm:text-[13.5px] font-bold whitespace-nowrap"
              style={{ color: item.color }}
            >
              {item.label}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}