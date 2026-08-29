"use client";

import { motion } from "framer-motion";
import { BadgeCheck, Truck, Banknote, RotateCcw } from "lucide-react";

const trustPoints = [
  { icon: BadgeCheck, label: "100% Genuine Products" },
  { icon: Truck, label: "Same-Day Delivery in Lodhran" },
  { icon: Banknote, label: "Cash on Delivery" },
  { icon: RotateCcw, label: "Easy Exchange" },
];

export default function TrustStrip() {
  return (
    <div className="border-y border-[#3C3837]/[0.06] bg-white overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8 py-4 sm:py-5 flex flex-wrap items-center justify-center lg:justify-between gap-x-6 gap-y-3">
        {trustPoints.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="flex items-center gap-2"
          >
            <motion.div
              animate={{ scale: [1, 1.12, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4, ease: "easeInOut" }}
            >
              <item.icon size={16} className="text-[#26649A]" />
            </motion.div>
            <span className="text-[12px] sm:text-[13px] font-medium text-[#3C3837]/70 whitespace-nowrap">
              {item.label}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}