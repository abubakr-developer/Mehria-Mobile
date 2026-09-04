// components/Reuseable/Header.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  Search,
  ShoppingCart,
  Menu,
  X,
  MapPin,
  Phone,
  ArrowRight,
} from "lucide-react";
import { useCart } from "@/app/context/CartContext";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Gallery", href: "/gallery" },
  { label: "Products", href: "/products" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { cartCount } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>

      {/* Main nav */}
      <header
        className={`sticky top-0 -mb-12 z-50 border-b border-[#3C3837]/[0.08] transition-all duration-300 ${
          scrolled
            ? "bg-white/90 backdrop-blur-xl backdrop-saturate-150 shadow-[0_4px_24px_rgba(28,75,117,0.08)]"
            : "bg-white/70 backdrop-blur-xl backdrop-saturate-150"
        }`}
      >
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <Image
              src="/logo-mark.png"
              alt="Mehria Mobiles"
              width={38}
              height={35}
              className="object-contain w-8 h-8 sm:w-9 sm:h-9"
              priority
            />
            <div>
              <div
                className="font-semibold text-[16px] sm:text-[19px] leading-none text-[#3C3837]"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Mehria Mobiles
              </div>
              <div className="hidden md:block text-[10px] font-medium tracking-[0.14em] text-[#26649A] uppercase mt-0.5">
                Accessories
              </div>
            </div>
          </Link>

          {/* Desktop Nav links */}
          <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="relative px-4 py-2 text-sm font-medium text-[#3C3837] hover:text-[#26649A] transition-colors group whitespace-nowrap"
              >
                {item.label}
                <span className="absolute left-4 right-4 bottom-0.5 h-[2px] bg-[#00C2D1] rounded scale-x-0 group-hover:scale-x-100 origin-center transition-transform duration-300" />
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
            {/* Search — hidden on very small screens */}
            <div
              className={`hidden sm:flex items-center rounded-xl transition-colors ${
                searchOpen ? "bg-[#26649A]/[0.06]" : ""
              }`}
            >
              <input
                type="text"
                placeholder="Search products…"
                className={`bg-transparent outline-none text-sm text-[#3C3837] placeholder:text-[#3C3837]/40 transition-all duration-300 ${
                  searchOpen ? "w-[150px] lg:w-[180px] opacity-100 pl-2.5" : "w-0 opacity-0"
                }`}
              />
              <button
                onClick={() => setSearchOpen((v) => !v)}
                className="w-9 h-9 flex items-center justify-center rounded-lg text-[#3C3837] hover:bg-[#26649A]/[0.08] hover:text-[#26649A] transition-colors"
                aria-label="Search"
              >
                <Search size={18} />
              </button>
            </div>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative w-9 h-9 flex items-center justify-center rounded-lg text-[#3C3837] hover:bg-[#26649A]/[0.08] hover:text-[#26649A] transition-colors"
              aria-label="Cart"
            >
              <ShoppingCart size={18} />
              {cartCount > 0 && (
                <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-[#00C2D1] text-[#3C3837] rounded-full text-[10px] font-semibold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Shop Now — hidden on mobile */}
            <Link
              href="/shop"
              className="hidden sm:inline-flex ml-1 bg-[#00C2D1] hover:bg-[#00AAB8] text-[#3C3837] text-sm font-semibold px-4 lg:px-5 py-2.5 rounded-xl transition-colors active:scale-[0.97] whitespace-nowrap"
            >
              Shop now
            </Link>

            {/* Hamburger */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg text-[#3C3837] hover:bg-[#26649A]/[0.08] transition-colors"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    <X size={20} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="open"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    <Menu size={20} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Mobile slide-down menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="lg:hidden overflow-hidden bg-white border-t border-[#3C3837]/[0.08]"
            >
              <div className="px-4 sm:px-6 py-3 flex flex-col">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 + 0.05 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center py-3 text-sm font-medium text-[#3C3837] border-b border-[#3C3837]/[0.06] last:border-none hover:text-[#26649A] transition-colors"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
                {/* Mobile CTA */}
                <div className="pt-4 pb-2 flex flex-col sm:flex-row gap-2">
                  <Link
                    href="/shop"
                    onClick={() => setMobileOpen(false)}
                    className="flex-1 text-center bg-[#00C2D1] hover:bg-[#00AAB8] text-[#3C3837] text-sm font-semibold px-5 py-3 rounded-xl transition-colors"
                  >
                    Shop now
                  </Link>
                  <a
                    href="tel:+923001234567"
                    className="flex-1 text-center border border-[#3C3837]/15 hover:border-[#26649A]/40 text-[#3C3837] text-sm font-semibold px-5 py-3 rounded-xl transition-colors"
                  >
                    Call us
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}