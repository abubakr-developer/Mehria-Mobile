"use client";

import Image from "next/image";
import Link from "next/link";
import { motion ,type Variants } from "framer-motion";
import { MapPin, ArrowRight, Star, BatteryCharging, ShieldCheck } from "lucide-react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item:Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {``
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F7F8FA] to-white">
      <div className="max-w-[1240px] mx-auto px-8 pt-20 pb-24 lg:pt-28 lg:pb-32 grid lg:grid-cols-2 gap-16 items-center">

        <motion.div variants={container} initial="hidden" animate="show">
          <motion.span
            variants={item}
            className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.04em] text-[#26649A] bg-[#26649A]/[0.07] border border-[#26649A]/[0.12] px-3.5 py-1.5 rounded-full mb-7"
          >
            <motion.span
              className="w-1.5 h-1.5 rounded-full bg-[#00C2D1]"
              animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            Trusted in Lodhran since 2019
          </motion.span>

          <motion.h1
            variants={item}
            className="text-[42px] sm:text-5xl lg:text-[58px] font-semibold leading-[1.05] tracking-[-0.02em] text-[#3C3837]"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Everything your phone needs,{" "}
            <span className="text-[#26649A]">under one roof.</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 text-[15px] text-[#3C3837]/60 leading-relaxed max-w-md"
          >
            From fast chargers to shockproof cases and crystal-clear screen
            protectors — genuine mobile accessories, sourced and sold right
            here in Lodhran.
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              href="/shop"
              className="group inline-flex items-center gap-2 bg-[#00C2D1] hover:bg-[#00AAB8] text-[#3C3837] text-sm font-semibold px-6 py-3.5 rounded-xl transition-all active:scale-[0.97] shadow-[0_8px_20px_rgba(0,194,209,0.25)] hover:shadow-[0_10px_26px_rgba(0,194,209,0.35)]"
            >
              Shop accessories
              <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <a
              href="tel:+923001234567"
              className="inline-flex items-center gap-2 border border-[#3C3837]/12 hover:border-[#26649A]/40 hover:bg-[#26649A]/[0.04] text-[#3C3837] text-sm font-semibold px-6 py-3.5 rounded-xl transition-colors"
            >
              Call the shop
            </a>
          </motion.div>
        </motion.div>

        {/* Hero visual */}
        <div className="relative">
          <motion.div
            className="absolute -top-12 -right-8 w-64 h-64 rounded-full bg-[#26649A]/[0.12] blur-[70px]"
            animate={{ x: [0, 14, 0], y: [0, -10, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -bottom-10 -left-8 w-44 h-44 rounded-full bg-[#00C2D1]/[0.14] blur-[60px]"
            animate={{ x: [0, -12, 0], y: [0, 10, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          />

          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -4 }}
            className="relative bg-white/70 backdrop-blur-2xl border border-white shadow-[0_30px_80px_-20px_rgba(28,75,117,0.22)] rounded-[28px] p-8"
          >
            <motion.div
              className="flex items-center justify-between mb-7"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <Image src="/logo-mark.png" alt="Mehria Mobiles" width={42} height={38} className="object-contain" />
              <span className="text-[10px] font-semibold tracking-[0.16em] text-[#26649A]/70 uppercase">Est. 2019</span>
            </motion.div>

            <div className="grid grid-cols-2 gap-3">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-2xl bg-[#3C3837] text-white p-5 col-span-2 flex items-center justify-between"
              >
                <div>
                  <motion.p
                    className="text-3xl font-semibold tracking-tight"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 0.4 }}
                  >
                    500+
                  </motion.p>
                  <p className="text-[11px] text-white/50 mt-1">Happy customers</p>
                </div>
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.1 + i * 0.08, duration: 0.3, ease: "backOut" }}
                    >
                      <Star size={12} fill="#00C2D1" strokeWidth={0} />
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.85, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="rounded-2xl bg-[#26649A]/[0.06] border border-[#26649A]/[0.08] p-4"
              >
                <BatteryCharging size={19} className="text-[#26649A] mb-2.5" />
                <p className="text-[13px] font-medium text-[#3C3837]">Fast Chargers</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.95, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="rounded-2xl bg-[#00C2D1]/[0.08] border border-[#00C2D1]/[0.12] p-4"
              >
                <ShieldCheck size={19} className="text-[#1C4B75] mb-2.5" />
                <p className="text-[13px] font-medium text-[#3C3837]">Tempered Glass</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}