"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  BatteryCharging,
  ShieldCheck,
  Smartphone,
  Headphones,
  Cable,
  Battery,
  type LucideIcon,
} from "lucide-react";

// ─── Slide data ───────────────────────────────────────────────────────────────
// Slides with a `photo` show a real, single-product, licensed photo (Unsplash
// License — free for commercial use, no attribution required, no watermark).
// Slides without one fall back to an icon spotlight until a real product shot
// is ready — swap `photo` in for those the same way once you have one.
const SLIDES: {
  id: number;
  headline: string;
  sub: string;
  cta: string;
  href: string;
  icon: LucideIcon;
  accent: string;
  photo?: string;
}[] = [
  {
    id: 1,
    headline: "Wireless Freedom. Pure Sound.",
    sub: "Crystal-clear audio with deep bass. 24-hour battery life for all-day listening.",
    cta: "Shop Earbuds",
    href: "/shop?cat=earbuds",
    icon: Headphones,
    accent: "#4FC3F7",
    photo:
      "https://images.unsplash.com/photo-1754142654807-1dfcdc3f7f22?auto=format&fit=crop&q=80&w=1600",
  },

  {
    id: 2,
    headline: "Fast Chargers. Real Watts.",
    sub: "65W GaN technology. Full charge before your tea goes cold.",
    cta: "Browse Chargers",
    href: "/shop?cat=chargers",
    icon: BatteryCharging,
    accent: "#F5A623",
    photo:
      "https://images.unsplash.com/photo-1586254116951-5263e2cdb44c?fm=jpg&q=80&w=1600&auto=format&fit=crop",
  },

  {
    id: 3,
    headline: "Protect What Matters.",
    sub: "Military-grade cases and 9H tempered glass for every model.",
    cta: "See Protection",
    href: "/shop?cat=cases",
    icon: ShieldCheck,
    accent: "#4CAF50",
    photo:
      "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?fm=jpg&q=80&w=1600&auto=format&fit=crop",
  },

  {
    id: 4,
    headline: "Style Meets Protection.",
    sub: "Shockproof cases that look premium. Slim fit with military-grade drop protection.",
    cta: "Browse Cases",
    href: "/shop?cat=phone-cases",
    icon: Smartphone,
    accent: "#9C6ADE",
    photo:
      "https://images.unsplash.com/photo-1775544265981-9db0ea58687f?auto=format&fit=crop&q=80&w=1600",
  },

  {
    id: 6,
    headline: "Fast Sync. Fast Charge.",
    sub: "Braided nylon Type-C cable. 100W PD support with data transfer speeds up to 480Mbps.",
    cta: "Shop Cables",
    href: "/shop?cat=cables",
    icon: Cable,
    accent: "#26649A",
    photo:
      "https://www.belkin.com/on/demandware.static/-/Sites-master-product-catalog-blk/default/dwfe4c2219/images/hi-res/7/5831f56eab9ecb49_CAB004bt0MWH_Gallery5.png",
  },

  {
    id: 7,
    headline: "Power That Lasts.",
    sub: "20000mAh portable charger. Fast charges 3 devices simultaneously for days on the go.",
    cta: "Explore Power Banks",
    href: "/shop?cat=power-banks",
    icon: Battery,
    accent: "#E4572E",
    photo:
      "https://ziz.ua/image/cache/catalog/foto-tovarov/powerbank/20000mah/58002_5-min-600x600.jpg",
  },
];

// ─── Trust badges ─────────────────────────────────────────────────────────────
const BADGES = [
  { icon: BatteryCharging, label: "Fast Chargers", sub: "40+ in stock" },
  { icon: ShieldCheck, label: "Tempered Glass", sub: "60+ in stock" },
  { icon: Headphones, label: "Earbuds & Audio", sub: "25+ models" },
  { icon: Smartphone, label: "All Phone Models", sub: "120+ covers" },
];

// ─── Transition variants ──────────────────────────────────────────────────────
const contentVariants = {
  enter: { opacity: 0, y: 14 },
  center: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.3 } },
};

const imgVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 50 : -50, opacity: 0, scale: 0.94 }),
  center: { x: 0, opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.32, 0.72, 0, 1] as [number, number, number, number] } },
  exit: (dir: number) => ({ x: dir > 0 ? -50 : 50, opacity: 0, scale: 0.94, transition: { duration: 0.35, ease: [0.32, 0.72, 0, 1] as [number, number, number, number] } }),
};

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);
  const touchStart = useRef<number | null>(null);
  const indexRef = useRef(index);
  indexRef.current = index;

  const go = useCallback((next: number) => {
    setDir(next > indexRef.current ? 1 : -1);
    setIndex((next + SLIDES.length) % SLIDES.length);
  }, []);

  // Auto-scroller — advances every 2s and pauses during interaction.
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setDir(1);
      setIndex((prev) => (prev + 1) % SLIDES.length);
    }, 2000);
    return () => clearInterval(id);
  }, [paused]);

  const onTouchStart = (e: React.TouchEvent) => {
    setPaused(true);
    touchStart.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStart.current !== null) {
      const delta = touchStart.current - e.changedTouches[0].clientX;
      if (Math.abs(delta) > 40) go(index + (delta > 0 ? 1 : -1));
    }
    touchStart.current = null;
    setPaused(false);
  };

  const slide = SLIDES[index];
  const Icon = slide.icon;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F7F8FA] to-white">
      <div
        className="relative"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* Prev / Next — fixed to the whole banner's edges */}
        <button
          onClick={() => go(index - 1)}
          aria-label="Previous slide"
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow-md flex items-center justify-center transition-all"
        >
          <ChevronLeft size={19} className="text-[#3C3837]" />
        </button>
        <button
          onClick={() => go(index + 1)}
          aria-label="Next slide"
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow-md flex items-center justify-center transition-all"
        >
          <ChevronRight size={19} className="text-[#3C3837]" />
        </button>

        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={slide.id}
            custom={dir}
            initial="enter"
            animate="center"
            exit="exit"
            className="flex flex-col items-center"
          >
            {/* Heading block — sits ABOVE the visual */}
            <motion.div
              variants={contentVariants}
              className="text-center max-w-2xl mx-auto pt-14 pb-8 sm:pt-20 sm:pb-10 px-6"
            >
              <h1
                className="text-[32px] sm:text-[46px] lg:text-[56px] font-semibold leading-[1.08] tracking-[-0.02em]"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  color: "#4FC3F7",
                  textShadow: "0 0 28px rgba(79, 195, 247, 0.35)",
                }}
              >
                {slide.headline}
              </h1>

              <p className="mt-3.5 text-[14.5px] sm:text-[15px] text-[#3C3837]/60 leading-relaxed">
                {slide.sub}
              </p>

              <Link
                href={slide.href}
                className="group inline-flex items-center gap-2 mt-6 border border-[#3C3837]/20 hover:border-[#26649A] hover:bg-[#26649A]/[0.04] text-[#3C3837] text-sm font-semibold px-6 py-3 rounded-full transition-all"
              >
                {slide.cta}
                <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </motion.div>

            {/* Product visual — real photo when available, icon spotlight otherwise */}
            <motion.div
              custom={dir}
              variants={imgVariants}
              className="relative w-full max-w-[600px] mx-auto px-2"
              style={{ height: "clamp(300px, 55vw, 560px)" }}
            >
              {slide.photo ? (
                <Image
                  src={slide.photo}
                  alt={slide.headline} 
                  fill
                  priority
                  unoptimized
                  className="object-cover rounded-2xl"
                  sizes="(max-width: 768px) 90vw, 1200px"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = "none";
                  }}
                />
              ) : (
                <div
                  className="relative w-full h-full rounded-2xl flex items-center justify-center overflow-hidden"
                  style={{
                    background: `radial-gradient(circle at 50% 45%, ${slide.accent}22 0%, ${slide.accent}0d 45%, transparent 75%)`,
                  }}
                >
                  <div
                    className="absolute rounded-full"
                    style={{
                      width: "clamp(220px, 34vw, 360px)",
                      height: "clamp(220px, 34vw, 360px)",
                      background: `radial-gradient(circle, ${slide.accent}29 0%, transparent 70%)`,
                    }}
                  />
                  <div
                    className="relative flex items-center justify-center rounded-full shadow-lg"
                    style={{
                      width: "clamp(160px, 24vw, 240px)",
                      height: "clamp(160px, 24vw, 240px)",
                      backgroundColor: "#FFFFFF",
                      border: `1px solid ${slide.accent}33`,
                    }}
                  >
                    <Icon
                      strokeWidth={1.4}
                      style={{ width: "44%", height: "44%", color: slide.accent }}
                    />
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Dot indicators */}
        <div className="flex mt-4 mb-2 items-center justify-center gap-1.5 pb-2">
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              onClick={() => go(i)}
              aria-label={`Go to slide ${i + 1}`}
              className="h-1.5 rounded-full transition-all"
              style={{
                width: i === index ? "20px" : "6px",
                backgroundColor: i === index ? "#4FC3F7" : "rgba(60,56,55,0.18)",
              }}
            />
          ))}
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
    </section>
  );
}