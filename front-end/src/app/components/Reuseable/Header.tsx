// components/Navbar.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, ShoppingCart, Menu, MapPin, Phone, ArrowRight } from "lucide-react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/chargers" },
  { label: "Products", href: "/cases" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Utility bar */}
      <div className="bg-[#3C3837] text-[#F7F8FA] text-xs px-8 py-1.5 flex justify-between items-center">
        <div className="flex items-center gap-5">
          <span className="flex items-center gap-1.5 opacity-90">
            <MapPin size={13} className="text-[#00C2D1]" />
            Lodhran, Punjab
          </span>
          <a href="tel:+923001234567" className="hidden sm:flex items-center gap-1.5 opacity-90 hover:opacity-70 transition-opacity">
            <Phone size={13} className="text-[#00C2D1]" />
            0300 1234567
          </a>
        </div>
        <span className="flex items-center gap-1.5 opacity-90">
          <ArrowRight size={13} className="text-[#00C2D1]" />
          Same-day delivery in Lodhran
        </span>
      </div>

      {/* Main nav */}
      <header
        className={`sticky top-0 z-50 border-b border-[#3C3837]/[0.08] transition-all duration-300 ${
          scrolled
            ? "bg-white/90 backdrop-blur-xl backdrop-saturate-150 shadow-[0_4px_24px_rgba(28,75,117,0.08)]"
            : "bg-white/70 backdrop-blur-xl backdrop-saturate-150"
        }`}
      >
        <div className="max-w-[1240px] mx-auto px-8 py-3 flex items-center justify-between gap-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <Image
              src="/logo-mark.png"
              alt="Mehria Mobiles"
              width={38}
              height={35}
              className="object-contain"
              priority
            />
            <div>
              <div className="font-semibold text-[19px] leading-none text-[#3C3837]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Mehria Mobiles
              </div>
              <div className="hidden md:block text-[10px] font-medium tracking-[0.14em] text-[#26649A] uppercase mt-0.5">
                Accessories
              </div>
            </div>
          </Link>

          {/* Nav links */}
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
          <div className="flex items-center gap-1.5 shrink-0">
            <div
              className={`flex items-center rounded-xl transition-colors ${
                searchOpen ? "bg-[#26649A]/[0.06]" : ""
              }`}
            >
              <input
                type="text"
                placeholder="Search products…"
                className={`bg-transparent outline-none text-sm text-[#3C3837] placeholder:text-[#3C3837]/40 transition-all duration-300 ${
                  searchOpen ? "w-[180px] opacity-100 pl-2.5" : "w-0 opacity-0"
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

            <button className="relative w-9 h-9 flex items-center justify-center rounded-lg text-[#3C3837] hover:bg-[#26649A]/[0.08] hover:text-[#26649A] transition-colors" aria-label="Cart">
              <ShoppingCart size={18} />
              <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-[#00C2D1] text-[#3C3837] rounded-full text-[10px] font-semibold flex items-center justify-center">
                2
              </span>
            </button>

            <Link
              href="/shop"
              className="ml-1 bg-[#00C2D1] hover:bg-[#00AAB8] text-[#3C3837] text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors active:scale-[0.97]"
            >
              Shop now
            </Link>

            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg text-[#3C3837]"
              aria-label="Menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden flex flex-col bg-white border-t border-[#3C3837]/[0.08] px-5 py-2">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="py-3 text-sm font-medium text-[#3C3837] border-b border-[#3C3837]/[0.08] last:border-none"
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </header>
    </>
  );
}