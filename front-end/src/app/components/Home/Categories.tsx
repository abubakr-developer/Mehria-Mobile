import Link from "next/link";
import {
  BatteryCharging,
  Smartphone,
  Headphones,
  ShieldCheck,
  Sparkles,
  ArrowRight,
} from "lucide-react";

const categories = [
  { label: "Chargers & Cables", icon: BatteryCharging, href: "/chargers", count: "40+ items" },
  { label: "Cases & Covers", icon: Smartphone, href: "/cases", count: "120+ items" },
  { label: "Earbuds & Audio", icon: Headphones, href: "/earbuds", count: "35+ items" },
  { label: "Screen Protectors", icon: ShieldCheck, href: "/screen-protectors", count: "60+ items" },
  { label: "Accessories", icon: Sparkles, href: "/accessories", count: "25+ items" },
];

export default function Categories() {
  return (
    <section className="max-w-[1240px] mx-auto px-8 py-20 lg:py-24">
      <div className="flex items-end justify-between mb-10">
        <div>
          <p className="text-[11px] font-semibold tracking-[0.14em] text-[#26649A] uppercase mb-2">Browse</p>
          <h2
            className="text-[28px] lg:text-[32px] font-semibold tracking-tight text-[#3C3837]"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Shop by category
          </h2>
        </div>
        <Link href="/shop" className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-[#26649A] hover:gap-2.5 transition-all">
          View all <ArrowRight size={14} />
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {categories.map((cat) => (
          <Link
            key={cat.label}
            href={cat.href}
            className="group bg-white border border-[#3C3837]/[0.06] rounded-2xl p-5 flex flex-col items-start gap-3.5 hover:border-[#26649A]/25 hover:-translate-y-1 hover:shadow-[0_16px_32px_-8px_rgba(28,75,117,0.14)] transition-all duration-300"
          >
            <div className="w-11 h-11 rounded-xl bg-[#26649A]/[0.07] flex items-center justify-center group-hover:bg-[#00C2D1] transition-colors duration-300">
              <cat.icon size={19} className="text-[#26649A] group-hover:text-[#3C3837] transition-colors duration-300" />
            </div>
            <div>
              <p className="text-[13.5px] font-semibold text-[#3C3837]">{cat.label}</p>
              <p className="text-[11.5px] text-[#3C3837]/40 mt-0.5">{cat.count}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}