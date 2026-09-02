"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback, useRef } from "react";
import {
  MapPin,
  Star,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  BatteryCharging,
  ShieldCheck,
  Smartphone,
  Headphones,
} from "lucide-react";

// ─── Slide data ───────────────────────────────────────────────────────────────
const SLIDES = [
  {
    id: 1,
    headline: "Mix. Match. MagSafe.",
    sub: "Snap on a case, wallet, wireless charger, or battery pack.",
    cta: "Shop Collection",
    href: "/shop",
    image: "/imagegs/products/1.jfif",
    accent: "#00C2D1",
  },
  {
    id: 2,
    headline: "Fast Chargers. Real Watts.",
    sub: "65W GaN technology. Full charge before your tea goes cold.",
    cta: "Browse Chargers",
    href: "/shop?cat=chargers",
    image: "/imagegs/products/2.jfif",
    accent: "#26649A",
  },
  {
    id: 3,
    headline: "Protect What Matters.",
    sub: "Military-grade cases and 9H tempered glass for every model.",
    cta: "See Protection",
    href: "/shop?cat=cases",
    image: "/imagegs/products/3.jfif",
    accent: "#1C4B75",
  },
];

// ─── Trust badges ─────────────────────────────────────────────────────────────
const BADGES = [
  { icon: BatteryCharging, label: "Fast Chargers",     sub: "40+ in stock" },
  { icon: ShieldCheck,     label: "Tempered Glass",    sub: "60+ in stock" },
  { icon: Headphones,      label: "Earbuds & Audio",   sub: "25+ models"   },
  { icon: Smartphone,      label: "All Phone Models",  sub: "120+ covers"  },
];

// ─── Slide transition variants ────────────────────────────────────────────────
const imgVariants = {
  enter:  (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1, transition: { duration: 0.5, ease: [0.32, 0.72, 0, 1] as [number,number,number,number] } },
  exit:   (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0, transition: { duration: 0.4, ease: [0.32, 0.72, 0, 1] as [number,number,number,number] } }),
};

const textVariants = {
  enter:  { opacity: 0, y: 16 },
  center: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] } },
  exit:   { opacity: 0, y: -10, transition: { duration: 0.3 } },
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

export default function Hero() {
  const [index, setIndex]   = useState(0);
  const [dir, setDir]       = useState(1);
  const [paused, setPaused] = useState(false);
  const touchStart          = useRef<number | null>(null);

  const go = useCallback(
    (next: number) => {
      const wrapped = (next + SLIDES.length) % SLIDES.length;
      setDir(next > index ? 1 : -1);
      setIndex(wrapped);
    },
    [index]
  );

  useEffect(() => {
    if (paused) return;
    const id = setTimeout(() => go(index + 1), 5000);
    return () => clearTimeout(id);
  }, [index, paused, go]);

  const onTouchStart = (e: React.TouchEvent) => (touchStart.current = e.touches[0].clientX);
  const onTouchEnd   = (e: React.TouchEvent) => {
    if (touchStart.current === null) return;
    const delta = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 40) go(index + (delta > 0 ? 1 : -1));
    touchStart.current = null;
  };

  const slide = SLIDES[index];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F7F8FA] to-white">
      <div className="max-w-[1240px] mx-auto px-3 sm:px-8 pt-4 pb-10 sm:pt-16 sm:pb-20 lg:pt-28 lg:pb-32 grid gap-6 lg:grid-cols-2 lg:gap-12 lg:gap-16 items-center">
        <motion.div variants={container} initial="hidden" animate="show" className="order-2 lg:order-1">
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

        <div className="order-1 lg:order-2 flex items-center justify-center relative mx-auto w-full max-w-full sm:max-w-[480px]"
          style={{ height: "clamp(220px, 68vw, 420px)" }}
        >
          <button
            onClick={() => go(index - 1)}
            aria-label="Previous slide"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/90 hover:bg-white shadow-md flex items-center justify-center transition-all"
          >
            <ChevronLeft size={18} className="text-[#3C3837]" />
          </button>
          <button
            onClick={() => go(index + 1)}
            aria-label="Next slide"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/90 hover:bg-white shadow-md flex items-center justify-center transition-all"
          >
            <ChevronRight size={18} className="text-[#3C3837]" />
          </button>

          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={slide.id + "-img"}
              custom={dir}
              variants={imgVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full h-full rounded-2xl overflow-hidden bg-white shadow-[0_4px_24px_rgba(0,0,0,0.08)] relative"
            >
              <Image
                src={slide.image}
                alt={slide.headline}
                fill
                priority
                unoptimized
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 50vw"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── TRUST STRIP ──────────────────────────────────────────────────────── */}
      <div className="border-t border-b border-[#3C3837]/[0.07] bg-white">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-[#3C3837]/[0.07]">
            {BADGES.map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex items-center gap-3 px-5 py-4">
                <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-[#26649A]/[0.07] flex items-center justify-center">
                  <Icon size={16} className="text-[#26649A]" />
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-[#3C3837]">{label}</p>
                  <p className="text-[11px] text-[#3C3837]/45">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── SOCIAL PROOF ROW ─────────────────────────────────────────────────── */}
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8 py-3 flex flex-wrap items-center gap-x-5 gap-y-1">
        <div className="flex items-center gap-1.5">
          <MapPin size={12} className="text-[#26649A]" />
          <span className="text-[11px] text-[#3C3837]/50">Lodhran, Punjab · Est. 2019</span>
        </div>
        <span className="w-px h-3 bg-[#3C3837]/15 hidden sm:block" />
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={10} fill="#00C2D1" strokeWidth={0} />
          ))}
          <span className="ml-1.5 text-[11px] text-[#3C3837]/50">500+ happy customers</span>
        </div>
        <span className="w-px h-3 bg-[#3C3837]/15 hidden sm:block" />
        <span className="text-[11px] text-[#3C3837]/50">Free delivery in Lodhran</span>
      </div>

    </section>
  );
}