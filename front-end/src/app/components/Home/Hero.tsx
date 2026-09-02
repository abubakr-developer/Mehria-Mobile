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
    <section className="bg-[#F7F8FA] overflow-x-hidden">

      {/* ── CAROUSEL ─────────────────────────────────────────────────────────── */}
      <div
        className="relative w-full"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div className="max-w-[1240px] mx-auto px-6 sm:px-10">
          <div
            className="flex items-center justify-between gap-8"
            style={{ minHeight: "clamp(260px, 38vw, 440px)" }}
          >

            {/* ── LEFT: Text content ─────────────────────────────────────── */}
            <div className="flex-1 flex flex-col justify-center py-10 min-w-0">
              <AnimatePresence mode="wait" custom={dir}>
                <motion.div
                  key={slide.id + "-text"}
                  custom={dir}
                  variants={textVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                >
                  <p className="text-[11px] font-semibold tracking-[0.12em] text-[#26649A] mb-3 uppercase">
                    Mehria Mobiles · Lodhran
                  </p>

                  <h1
                    className="text-[28px] sm:text-4xl lg:text-[48px] font-bold leading-[1.08] tracking-[-0.02em] text-[#3C3837] max-w-md"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {slide.headline}
                  </h1>

                  <p className="mt-3 text-[14px] sm:text-[15px] text-[#3C3837]/60 max-w-sm leading-relaxed">
                    {slide.sub}
                  </p>

                  <div className="mt-7">
                    <Link
                      href={slide.href}
                      className="inline-flex items-center gap-2 text-[#3C3837] text-[13px] font-semibold border border-[#3C3837]/25 hover:border-[#3C3837]/60 px-5 py-2.5 rounded-full transition-colors"
                      style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "blur(8px)" }}
                    >
                      {slide.cta}
                      <ChevronRight size={14} />
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Dot indicators */}
              <div className="flex items-center gap-2 mt-8">
                {SLIDES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => go(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    className="transition-all duration-300 rounded-full"
                    style={{
                      width:  i === index ? 24 : 7,
                      height: 7,
                      background: i === index ? slide.accent : "rgba(60,56,55,0.25)",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* ── RIGHT: Image box ───────────────────────────────────────── */}
            <div className="hidden sm:flex flex-shrink-0 items-center justify-center relative"
              style={{ width: "clamp(240px, 38%, 480px)", height: "clamp(220px, 34vw, 400px)" }}
            >
              {/* Prev / Next arrows — positioned on the image box edges */}
              <button
                onClick={() => go(index - 1)}
                aria-label="Previous slide"
                className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white hover:bg-gray-50 shadow-md flex items-center justify-center transition-all"
              >
                <ChevronLeft size={18} className="text-[#3C3837]" />
              </button>
              <button
                onClick={() => go(index + 1)}
                aria-label="Next slide"
                className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white hover:bg-gray-50 shadow-md flex items-center justify-center transition-all"
              >
                <ChevronRight size={18} className="text-[#3C3837]" />
              </button>

              {/* Contained image card */}
              <AnimatePresence mode="wait" custom={dir}>
                <motion.div
                  key={slide.id + "-img"}
                  custom={dir}
                  variants={imgVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="w-full h-full rounded-2xl overflow-hidden bg-white shadow-[0_4px_24px_rgba(0,0,0,0.08)]"
                >
                  <Image
                    src={slide.image}
                    alt={slide.headline}
                    fill
                    priority
                    className="object-contain object-center p-4"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                    }}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
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