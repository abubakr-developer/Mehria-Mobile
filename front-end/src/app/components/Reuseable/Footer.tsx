// components/Footer.tsx
import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";

const shopLinks = [
  { label: "Chargers & Cables", href: "/chargers" },
  { label: "Cases & Covers", href: "/cases" },
  { label: "Earbuds & Audio", href: "/earbuds" },
  { label: "Screen Protectors", href: "/screen-protectors" },
  { label: "Accessories", href: "/accessories" },
];

const helpLinks = [
  { label: "Contact Us", href: "/contact" },
  { label: "Track Order", href: "/track-order" },
  { label: "Returns & Exchanges", href: "/returns" },
  { label: "Delivery Info", href: "/delivery" },
  { label: "FAQs", href: "/faqs" },
];

export default function Footer() {
  return (
    <footer className="bg-[#3C3837] text-[#F7F8FA]">
      <div className="max-w-[1240px] mx-auto px-8 pt-16 pb-8">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] gap-10 lg:gap-8 pb-12">

          {/* Brand column */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <Image
                src="/logo-mark.png"
                alt="Mehria Mobiles"
                width={36}
                height={33}
                className="object-contain"
              />
              <div>
                <div
                  className="font-semibold text-lg leading-none text-white"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  Mehria Mobiles
                </div>
                <div className="text-[10px] font-medium tracking-[0.14em] text-[#00C2D1] uppercase mt-1">
                  Accessories
                </div>
              </div>
            </div>
            <p className="text-sm text-[#F7F8FA]/65 leading-relaxed max-w-xs">
              Your trusted mobile accessories shop in Lodhran — chargers, cases,
              earbuds, and everything your phone needs, all in one place.
            </p>

            <div className="flex items-center gap-2 mt-5">
               <a
                href="#"
                aria-label="Facebook"
                className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-[#F7F8FA]/80 hover:bg-[#00C2D1] hover:text-[#3C3837] transition-colors"
              >
                <FaFacebook size={16} />
              </a>
               <a
                href="#"
                aria-label="Instagram"
                className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-[#F7F8FA]/80 hover:bg-[#00C2D1] hover:text-[#3C3837] transition-colors"
              >
                <FaInstagram size={16} />
              </a>
            </div>
          </div>

          {/* Shop links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 tracking-wide">Shop</h4>
            <ul className="flex flex-col gap-2.5">
              {shopLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-[#F7F8FA]/65 hover:text-[#00C2D1] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 tracking-wide">Customer Care</h4>
            <ul className="flex flex-col gap-2.5">
              {helpLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-[#F7F8FA]/65 hover:text-[#00C2D1] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + newsletter */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 tracking-wide">Visit or Reach Us</h4>
            <ul className="flex flex-col gap-3 mb-6">
              <li className="flex items-start gap-2.5 text-sm text-[#F7F8FA]/65">
                <MapPin size={15} className="text-[#00C2D1] mt-0.5 shrink-0" />
                Main Bazaar, Lodhran, Punjab
              </li>
              <li className="flex items-center gap-2.5 text-sm text-[#F7F8FA]/65">
                <Phone size={15} className="text-[#00C2D1] shrink-0" />
                <a href="tel:+923001234567" className="hover:text-[#00C2D1] transition-colors">
                  0300 1234567
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-[#F7F8FA]/65">
                <Mail size={15} className="text-[#00C2D1] shrink-0" />
                <a href="mailto:info@mehriamobiles.com" className="hover:text-[#00C2D1] transition-colors">
                  info@mehriamobiles.com
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-[#F7F8FA]/65">
                <Clock size={15} className="text-[#00C2D1] shrink-0" />
                Open daily, 10 AM – 10 PM
              </li>
            </ul>

            {/* Newsletter — glass card, same language as the header */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-3.5">
              <p className="text-xs text-[#F7F8FA]/70 mb-2.5">Get new arrivals & offers</p>
              <div className="flex items-center bg-white/5 rounded-lg overflow-hidden">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 bg-transparent outline-none text-sm text-white placeholder:text-[#F7F8FA]/35 px-3 py-2.5"
                />
                <button
                  aria-label="Subscribe"
                  className="w-10 h-10 flex items-center justify-center bg-[#00C2D1] text-[#3C3837] hover:bg-[#00AAB8] transition-colors shrink-0"
                >
                  <Send size={15} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[#F7F8FA]/45">
            © {new Date().getFullYear()} Mehria Mobiles. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="text-xs text-[#F7F8FA]/45 hover:text-[#00C2D1] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-xs text-[#F7F8FA]/45 hover:text-[#00C2D1] transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}