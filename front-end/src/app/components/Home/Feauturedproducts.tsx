import Link from "next/link";
import { Smartphone, ArrowRight, Plus } from "lucide-react";

const featuredProducts = [
  { name: "20W Fast Charger", price: "Rs. 1,200", tag: "New", tagColor: "#00C2D1", tagText: "#3C3837" },
  { name: "Wireless Earbuds Pro", price: "Rs. 3,500", tag: "Popular", tagColor: "#26649A", tagText: "#FFFFFF" },
  { name: "Tempered Glass Protector", price: "Rs. 350", tag: "Sale", tagColor: "#00C2D1", tagText: "#3C3837" },
  { name: "Shockproof Silicone Case", price: "Rs. 800", tag: "New", tagColor: "#00C2D1", tagText: "#3C3837" },
];

export default function FeaturedProducts() {
  return (
    <section className="bg-white py-20 lg:py-24 border-t border-[#3C3837]/[0.06]">
      <div className="max-w-[1240px] mx-auto px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.14em] text-[#26649A] uppercase mb-2">Featured</p>
            <h2
              className="text-[28px] lg:text-[32px] font-semibold tracking-tight text-[#3C3837]"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Popular this week
            </h2>
          </div>
          <Link href="/shop" className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-[#26649A] hover:gap-2.5 transition-all">
            Browse shop <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredProducts.map((product) => (
            <div
              key={product.name}
              className="group bg-[#F7F8FA] rounded-2xl p-4 border border-[#3C3837]/[0.05] hover:border-[#26649A]/20 hover:-translate-y-1 hover:shadow-[0_16px_32px_-8px_rgba(28,75,117,0.12)] transition-all duration-300"
            >
              <div className="relative h-32 rounded-xl bg-gradient-to-br from-white to-[#F7F8FA] flex items-center justify-center mb-4 overflow-hidden">
                <span
                  className="absolute top-2.5 left-2.5 text-[10px] font-semibold px-2 py-1 rounded-md"
                  style={{ backgroundColor: product.tagColor, color: product.tagText }}
                >
                  {product.tag}
                </span>
                <button className="absolute bottom-2.5 right-2.5 w-7 h-7 rounded-full bg-white shadow-md flex items-center justify-center text-[#26649A] opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                  <Plus size={14} />
                </button>
                <Smartphone size={28} className="text-[#3C3837]/12" />
              </div>
              <p className="text-[13.5px] font-medium text-[#3C3837] leading-snug">{product.name}</p>
              <p className="text-[14px] font-semibold text-[#26649A] mt-1.5">{product.price}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}