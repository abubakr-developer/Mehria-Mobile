"use client";

import { motion } from "framer-motion";
import { MapPin, Phone } from "lucide-react";

export default function VisitCTA() {
  return (
    <section className="max-w-[1240px] mx-auto px-4 sm:px-8 pb-16 lg:pb-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden bg-[#3FA8D1] rounded-[24px] sm:rounded-[28px] px-6 sm:px-8 py-12 lg:px-16 lg:py-16 flex flex-col lg:flex-row items-center justify-between gap-10"
      >
        <div className="relative flex flex-col sm:flex-row lg:flex-col items-center sm:items-start lg:items-start gap-5 sm:gap-6 lg:gap-5 max-w-lg text-center sm:text-left">
          {/* Quiet geometric anchor — no color, no blur, just a thin ring */}
          <div className="flex-shrink-0 w-12 h-12 rounded-full border border-white/50 flex items-center justify-center">
            <MapPin size={18} className="text-white" />
          </div>

          <div>
            <h2
              className="text-[22px] sm:text-[26px] lg:text-[32px] font-semibold text-white leading-tight tracking-tight"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Prefer to see it in person?
            </h2>
            <p className="text-[13px] sm:text-[14px] text-white mt-3 leading-relaxed">
              Visit our shop in Main Bazaar, Lodhran check the quality
              yourself before you buy, seven days a week.
            </p>
          </div>
        </div>

        <div className="relative flex flex-col sm:flex-row gap-3 w-full lg:w-auto shrink-0">
          <motion.a
            href="https://maps.google.com"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex-1 lg:flex-initial inline-flex items-center justify-center gap-2 border border-white/80 bg-transparent hover:bg-white hover:text-[#3FA8D1] text-white text-sm font-semibold px-6 py-3.5 rounded-xl transition-colors"
          >
            <MapPin size={16} className="text-white" />
            Get directions
          </motion.a>
          <motion.a
            href="tel:+923001234567"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex-1 lg:flex-initial inline-flex items-center justify-center gap-2 border border-white/80 hover:border-white hover:bg-white hover:text-[#3FA8D1] text-white text-sm font-semibold px-6 py-3.5 rounded-xl transition-colors"
          >
            <Phone size={15} className="text-white" />
            Call us
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}