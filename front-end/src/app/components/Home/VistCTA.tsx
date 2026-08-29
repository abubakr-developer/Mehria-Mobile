"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

export default function VisitCTA() {
  return (
    <section className="max-w-[1240px] mx-auto px-4 sm:px-8 pb-16 lg:pb-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden bg-[#3C3837] rounded-[24px] sm:rounded-[28px] px-6 sm:px-8 py-12 lg:px-16 lg:py-16 flex flex-col lg:flex-row items-center justify-between gap-8"
      >
        {/* Background blobs */}
        <motion.div
          className="absolute -top-16 -right-16 w-72 h-72 rounded-full bg-[#26649A]/[0.18] blur-[80px]"
          animate={{ x: [0, 12, 0], y: [0, -8, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-16 -left-10 w-56 h-56 rounded-full bg-[#00C2D1]/[0.10] blur-[70px]"
          animate={{ x: [0, -10, 0], y: [0, 8, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />

        <div className="relative max-w-lg text-center lg:text-left">
          <h2
            className="text-[22px] sm:text-[26px] lg:text-[32px] font-semibold text-white leading-tight tracking-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Prefer to see it in person?
          </h2>
          <p className="text-[13px] sm:text-[14px] text-white/55 mt-3 leading-relaxed">
            Visit our shop in Main Bazaar, Lodhran — check the quality
            yourself before you buy, seven days a week.
          </p>
        </div>

        <div className="relative flex flex-col sm:flex-row gap-3 w-full lg:w-auto shrink-0">
          <motion.a
            href="https://maps.google.com"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex-1 lg:flex-initial inline-flex items-center justify-center gap-2 bg-[#00C2D1] hover:bg-[#00AAB8] text-[#3C3837] text-sm font-semibold px-6 py-3.5 rounded-xl transition-all shadow-[0_8px_20px_rgba(0,194,209,0.25)]"
          >
            <MapPin size={16} />
            Get directions
          </motion.a>
          <motion.a
            href="tel:+923001234567"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex-1 lg:flex-initial inline-flex items-center justify-center gap-2 border border-white/15 hover:border-white/35 text-white text-sm font-semibold px-6 py-3.5 rounded-xl transition-colors"
          >
            Call us
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}