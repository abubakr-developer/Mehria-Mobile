"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Ahmed Raza",
    role: "Regular Customer",
    text: "Best mobile accessories shop in Lodhran. Genuine products and the charger I bought is still working great after months.",
  },
  {
    name: "Sana Fatima",
    role: "Verified Buyer",
    text: "Ordered a phone case on WhatsApp, delivered same day. Very responsive and honest pricing.",
  },
  {
    name: "Bilal Hussain",
    role: "Regular Customer",
    text: "Their screen protector installation is neat, no bubbles at all. Been a regular customer for over a year.",
  },
];

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

// Simple avatar colors
const avatarColors = ["#26649A", "#00AAB8", "#1C4B75"];

export default function Testimonials() {
  return (
    <section className="max-w-[1240px] mx-auto px-4 sm:px-8 py-16 lg:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10 sm:mb-12"
      >
        <p className="text-[11px] font-semibold tracking-[0.14em] text-[#26649A] uppercase mb-2">Reviews</p>
        <h2
          className="text-[24px] sm:text-[28px] lg:text-[32px] font-semibold tracking-tight text-[#3C3837]"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          What Lodhran says about us
        </h2>
      </motion.div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="flex flex-col bg-white border border-[#3C3837]/[0.06] rounded-2xl p-5 sm:p-6 hover:border-[#26649A]/20 hover:shadow-[0_12px_28px_-8px_rgba(28,75,117,0.12)] transition-all duration-300"
          >
            {/* Stars */}
            <div className="flex items-center gap-0.5 mt-auto ">
              {[...Array(5)].map((_, si) => (
                <motion.span
                  key={si}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + si * 0.07 + 0.2, duration: 0.25, ease: "backOut" }}
                >
                  <Star size={13} fill="#00C2D1" strokeWidth={0} />
                </motion.span>
              ))}
            </div>

            <p className="flex-1 text-[13px] sm:text-[13.5px] text-[#3C3837]/65 leading-relaxed mb-5">
              &ldquo;{t.text}&rdquo;
            </p>

            <div className="flex items-center gap-2.5">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-semibold text-white shrink-0"
                style={{ backgroundColor: avatarColors[i % avatarColors.length] }}
              >
                {initials(t.name)}
              </div>
              <div>
                <p className="text-[13px] font-semibold text-[#3C3837]">{t.name}</p>
                <p className="text-[11px] text-[#3C3837]/40">{t.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}