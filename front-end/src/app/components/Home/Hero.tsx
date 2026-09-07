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
  Battery,
  Ear,
  Watch,
  Camera,
  type LucideIcon,
} from "lucide-react";

// ─── Slide data ───────────────────────────────────────────────────────────────
// Each slide's `id` is now a stable product-category slug (used for the React
// key, and handy for analytics/CMS lookups) instead of an arbitrary number.
const SLIDES: {
  id: string;
  headline: string;
  sub: string;
  cta: string;
  href: string;
  icon: LucideIcon;
  accent: string;
  photo: string;
}[] = [
  {
    id: "earbuds",
    headline: "Wireless Freedom. Pure Sound.",
    sub: "Crystal clear audio with deep bass. 24-hour battery life for all day listening.",
    cta: "Shop Earbuds",
    href: "/shop?cat=earbuds",
    icon: Headphones,
    accent: "#4FC3F7",
    photo: "/imagegs/heroscrollerimg/earbuds.jpeg",
  },
  {
    id: "fast-charger",
    headline: "Fast Chargers. Real Watts.",
    sub: "65W GaN technology. Full charge before your tea goes cold.",
    cta: "Browse Chargers",
    href: "/shop?cat=chargers",
    icon: BatteryCharging,
    accent: "#F5A623",
    photo: "/imagegs/heroscrollerimg/charger.jpeg",
  },
  {
    id: "phone-case",
    headline: "Protect What Matters.",
    sub: "Shockproof, military grade cases and 9H tempered glass for every model.",
    cta: "See Protection",
    href: "/shop?cat=phone-cases",
    icon: ShieldCheck,
    accent: "#4CAF50",
    photo: "/imagegs/heroscrollerimg/phone_cases.jpeg",
  },
  {
    id: "powerbank",
    headline: "Power That Lasts.",
    sub: "20000mAh portable charger. Fast charges 3 devices simultaneously for days on the go.",
    cta: "Explore Power Banks",
    href: "/shop?cat=power-banks",
    icon: Battery,
    accent: "#E4572E",
    photo: "/imagegs/heroscrollerimg/power_bank.jpeg",
  },
  {
    id: "earphones",
    headline: "Everyday Clarity, Wired In.",
    sub: "Reliable wired earphones with crisp highs and a comfortable in ear fit.",
    cta: "Shop Earphones",
    href: "/shop?cat=earphones",
    icon: Ear,
    accent: "#26649A",
    photo: "/imagegs/heroscrollerimg/headphones.jpeg",
  },
  {
    id: "smart-watch",
    headline: "Time, Health, Notifications.",
    sub: "Track your day and stay connected with a vibrant always on display.",
    cta: "Shop Smart Watches",
    href: "/shop?cat=smart-watches",
    icon: Watch,
    accent: "#9C6ADE",
    photo: "/imagegs/heroscrollerimg/apple_watch.jpeg",
  },
  {
    id: "mobile-holder",
    headline: "Hands Free, Any Angle.",
    sub: "Sturdy, adjustable mobile holders for your desk, car, or bedside.",
    cta: "Shop Mobile Holders",
    href: "/shop?cat=mobile-holders",
    icon: Smartphone,
    accent: "#607D8B",
    photo: "/imagegs/heroscrollerimg/phone_stand.jpeg",
  },
  {
    id: "selfie-stick",
    headline: "Get The Whole Shot.",
    sub: "Extendable, Bluetooth-ready selfie sticks for group shots and vlogging.",
    cta: "Shop Selfie Sticks",
    href: "/shop?cat=selfie-sticks",
    icon: Camera,
    accent: "#E91E63",
    photo: "/imagegs/heroscrollerimg/selfie_stick.jpeg",
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

  useEffect(() => {
    indexRef.current = index;
  }, [index]);

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

  return (
    <section className="relative overflow-hidden bg-[#FFFFFF]">
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
              className="text-center max-w-2xl mx-auto pt-14 pb-2 sm:pt-20 sm:pb-4 px-6"
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

            {/* Product visual — local, statically-imported product photo */}
            <motion.div
              custom={dir}
              variants={imgVariants}
              className="relative -mt-2 sm:-mt-4 w-full max-w-[900px] mx-auto px-2"
              style={{ height: "clamp(240px, 44vw, 440px)" }}
            >
              <Image
                src={slide.photo}
                alt={slide.headline}
                fill
                priority
                className="rounded-2xl bg-[#FFFFFF]  object-contain p-4 sm:p-6"
                sizes="(max-width: 768px) 90vw, 1200px"
              />
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