"use client";

import { motion } from "framer-motion";
import {
  Award,
  Sparkles,
  ShieldCheck,
  HeartHandshake,
  ArrowUpRight,
} from "lucide-react";

const features = [
  {
    number: "01",
    title: "Genuine Products",
    description:
      "Every accessory is sourced from verified suppliers no fakes, no compromises. What you see is exactly what you get.",
    icon: Award,
  },
  {
    number: "02",
    title: "Best Local Prices",
    description:
      "We keep our prices honest and competitive so Lodhran always gets the best deal on mobile accessories.",
    icon: Sparkles,
  },
  {
    number: "03",
    title: "Quality Guaranteed",
    description:
      "From screen protectors to chargers, every product is tested before it reaches our shelves.",
    icon: ShieldCheck,
  },
  {
    number: "04",
    title: "Customer First",
    description:
      "Quick responses, same-day delivery, and an easy exchange policy your satisfaction is our priority.",
    icon: HeartHandshake,
  },
];

export default function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden bg-[#3C3837] py-20 sm:py-24 md:py-32 text-white">
      {/* Background accent */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 0.15, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#00AEBC] blur-[140px] pointer-events-none"
      />

      <div className="relative mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12 sm:mb-16 grid gap-6 sm:gap-8 md:grid-cols-[1fr_1.2fr] md:items-end"
        >
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-8 sm:w-10 bg-[#00AEBC]" />
              <span className="text-xs sm:text-sm font-medium uppercase tracking-[0.25em] text-[#00AEBC]">
                Why Choose Us
              </span>
            </div>
            <h2 className="text-[28px] sm:text-4xl lg:text-[52px] font-semibold tracking-tight leading-tight">
              More than a shop.
              <span className="block text-gray-400">It&apos;s your go-to.</span>
            </h2>
          </div>

          <p className="max-w-lg text-[14px] sm:text-base leading-7 text-gray-400 md:ml-auto">
            Mehria Mobiles combines genuine products, unbeatable local prices, and
            friendly service  making it the #1 choice for mobile accessories in Lodhran.
          </p>
        </motion.div>

        {/* Feature grid */}
        <div className="grid overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 sm:grid-cols-2">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover="hover"
                className="group relative border-b border-white/10 last:border-b-0 sm:[&:nth-child(odd)]:border-r p-6 sm:p-8 md:p-10 transition-colors duration-500 hover:bg-white/[0.04]"
              >
                {/* Number + Icon */}
                <div className="mb-8 sm:mb-12 flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500">{feature.number}</span>
                  <motion.div
                    variants={{ hover: { rotate: 8, scale: 1.1 } }}
                    transition={{ duration: 0.3 }}
                    className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.03]"
                  >
                    <Icon size={19} strokeWidth={1.5} className="text-[#00AEBC]" />
                  </motion.div>
                </div>

                {/* Content */}
                <div>
                  <h3 className="mb-3 text-xl sm:text-2xl md:text-3xl font-medium">{feature.title}</h3>
                  <p className="text-[13px] sm:text-[14px] leading-7 text-gray-400">{feature.description}</p>
                </div>

                {/* Arrow */}
                <motion.div
                  variants={{ hover: { x: 5, y: -5 } }}
                  transition={{ duration: 0.3 }}
                  className="mt-6 sm:mt-8 flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-white/10"
                >
                  <ArrowUpRight size={16} className="text-gray-500 transition-colors duration-300 group-hover:text-[#00AEBC]" />
                </motion.div>

                {/* Hover accent line */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  variants={{ hover: { scaleX: 1 } }}
                  transition={{ duration: 0.4 }}
                  className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-[#00AEBC]"
                />
              </motion.div>
            );
          })}
        </div>

        {/* Bottom statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10 sm:mt-12 flex flex-col gap-4 sm:gap-6 border-t border-white/10 pt-6 sm:pt-8 sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-gray-500">
            Serving Lodhran since 2019
          </p>
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-[#00AEBC]" />
            <span className="text-sm text-gray-400">Quality you can trust</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}