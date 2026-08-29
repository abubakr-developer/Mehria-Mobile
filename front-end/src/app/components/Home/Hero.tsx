"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { MapPin, ArrowRight, Star, BatteryCharging, ShieldCheck, Smartphone } from "lucide-react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const products = [
  { name: "20W Fast Charger", img: "/imagegs/products/1.jfif" },
  { name: "Wireless Earbuds", img: "/imagegs/products/2.jfif" },
  { name: "Phone Case", img: "/imagegs/products/3.jfif" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F7F8FA] to-white">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8 pt-16 pb-20 lg:pt-28 lg:pb-32 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

        <motion.div variants={container} initial="hidden" animate="show">
          <motion.span
            variants={item}
            className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.04em] text-[#26649A] bg-[#26649A]/[0.07] border border-[#26649A]/[0.12] px-3.5 py-1.5 rounded-full mb-6"
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
            className="text-[34px] sm:text-5xl lg:text-[58px] font-semibold leading-[1.05] tracking-[-0.02em] text-[#3C3837]"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Everything your phone needs,{" "}
            <span className="text-[#26649A]">under one roof.</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-5 text-[15px] text-[#3C3837]/60 leading-relaxed max-w-md"
          >
            From fast chargers to shockproof cases and crystal-clear screen
            protectors — genuine mobile accessories, sourced and sold right
            here in Lodhran.
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-3">
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

          {/* Trust badge row */}
          <motion.div variants={item} className="mt-8 flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-1">
              <MapPin size={13} className="text-[#26649A]" />
              <span className="text-[12px] text-[#3C3837]/50">Lodhran, Punjab</span>
            </div>
            <span className="w-1 h-1 rounded-full bg-[#3C3837]/20" />
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={11} fill="#00C2D1" strokeWidth={0} />
              ))}
              <span className="ml-1.5 text-[12px] text-[#3C3837]/50">500+ happy customers</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Hero visual */}
        <div className="relative mt-4 lg:mt-0">
          {/* Blobs */}
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
            className="relative bg-white/70 backdrop-blur-2xl border border-white shadow-[0_30px_80px_-20px_rgba(28,75,117,0.22)] rounded-[28px] p-5 sm:p-8"
          >
            {/* Header row */}
            <motion.div
              className="flex items-center justify-between mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <Image src="/logo-mark.png" alt="Mehria Mobiles" width={42} height={38} className="object-contain" />
              <span className="text-[10px] font-semibold tracking-[0.16em] text-[#26649A]/70 uppercase">Est. 2019</span>
            </motion.div>

            {/* Real product images grid */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              {products.map((p, i) => (
                <motion.div
                  key={p.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + i * 0.12, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                  className="rounded-2xl bg-[#F7F8FA] overflow-hidden border border-[#3C3837]/[0.05] aspect-square flex items-center justify-center"
                >
                  <Image
                    src={p.img}
                    alt={p.name}
                    width={100}
                    height={100}
                    className="w-full h-full object-cover"
                    unoptimized
                  />
                </motion.div>
              ))}
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 gap-3">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-2xl bg-[#3C3837] text-white p-4 flex items-center justify-between"
              >
                <div>
                  <p className="text-2xl font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>500+</p>
                  <p className="text-[10px] text-white/50 mt-0.5">Happy customers</p>
                </div>
                <div className="flex flex-col items-end gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.1 + i * 0.08, duration: 0.3, ease: "backOut" }}
                    >
                      <Star size={10} fill="#00C2D1" strokeWidth={0} />
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="rounded-2xl bg-[#26649A]/[0.06] border border-[#26649A]/[0.08] p-4 flex flex-col justify-between"
              >
                <BatteryCharging size={18} className="text-[#26649A]" />
                <div>
                  <p className="text-[12px] font-medium text-[#3C3837] mt-2">Fast Chargers</p>
                  <p className="text-[10px] text-[#3C3837]/40">40+ in stock</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="rounded-2xl bg-[#00C2D1]/[0.08] border border-[#00C2D1]/[0.12] p-4 flex flex-col justify-between"
              >
                <ShieldCheck size={18} className="text-[#1C4B75]" />
                <div>
                  <p className="text-[12px] font-medium text-[#3C3837] mt-2">Tempered Glass</p>
                  <p className="text-[10px] text-[#3C3837]/40">60+ in stock</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="rounded-2xl bg-[#F7F8FA] border border-[#3C3837]/[0.05] p-4 flex flex-col justify-between"
              >
                <Smartphone size={18} className="text-[#3C3837]/50" />
                <div>
                  <p className="text-[12px] font-medium text-[#3C3837] mt-2">All Models</p>
                  <p className="text-[10px] text-[#3C3837]/40">120+ covers</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}