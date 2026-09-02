"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Plus, ShoppingCart, Check } from "lucide-react";
import { products } from "@/app/data/products";
import { useCart } from "@/app/context/CartContext";

const featuredProducts = products.slice(0, 6);

export default function FeaturedProducts() {
  const { addToCart } = useCart();
  const [added, setAdded] = useState<number | null>(null);

  const handleAdd = (id: number) => {
    const product = products.find((p) => p.id === id);
    if (product) {
      addToCart(product);
      setAdded(id);
      setTimeout(() => setAdded(null), 1500);
    }
  };

  return (
    <section className="bg-white py-16 lg:py-24 border-t border-[#3C3837]/[0.06]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
        <div className="flex items-end justify-between mb-8 sm:mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[11px] font-semibold tracking-[0.14em] text-[#26649A] uppercase mb-2">Featured</p>
            <h2
              className="text-[24px] sm:text-[28px] lg:text-[32px] font-semibold tracking-tight text-[#3C3837]"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Popular this week
            </h2>
          </motion.div>
          <Link
            href="/shop"
            className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-[#26649A] hover:gap-2.5 transition-all"
          >
            Browse shop <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-5">
          {featuredProducts.map((product, i) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group bg-[#F7F8FA] rounded-2xl p-3 h-72 sm:p-4 border border-[#3C3837]/[0.05] hover:border-[#26649A]/20 hover:-translate-y-1 hover:shadow-[0_16px_32px_-8px_rgba(28,75,117,0.12)] transition-all duration-300"
            >
              <Link href={`/products/${product.id}`} className="block">
              {/* Image */}
              <div className="relative h-40 rounded-xl bg-gradient-to-br from-white to-[#F7F8FA] flex items-center justify-center mb-3 sm:mb-4 overflow-hidden">
                {product.tag && (
                  <span
                    className="absolute top-2 left-2 text-[9px] sm:text-[10px] font-semibold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md z-10"
                    style={{ backgroundColor: product.tagColor, color: product.tagText }}
                  >
                    {product.tag}
                  </span>
                )}
                <Image
                  src={product.img}
                  alt={product.name}
                  fill
                  className="object-cover"
                  unoptimized
                />
                {/* Add to cart hover button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleAdd(product.id);
                  }}
                  className="absolute bottom-2 right-2 w-7 h-7 rounded-full bg-white shadow-md flex items-center justify-center text-[#26649A] opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300 z-10"
                >
                  {added === product.id ? (
                    <Check size={14} className="text-green-500" />
                  ) : (
                    <Plus size={14} />
                  )}
                </motion.button>
              </div>

              <p className="text-[12px] sm:text-[13.5px] font-medium text-[#3C3837] leading-snug line-clamp-2">{product.name}</p>
              <div className="flex items-center justify-between mt-1.5">
                <p className="text-[13px] sm:text-[14px] font-semibold text-[#26649A]">Rs. {product.price.toLocaleString()}</p>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleAdd(product.id);
                  }}
                  className={`hidden sm:flex w-7 h-7 rounded-lg items-center justify-center transition-colors ${
                    added === product.id
                      ? "bg-green-500/10 text-green-500"
                      : "bg-[#26649A]/[0.07] text-[#26649A] hover:bg-[#00C2D1] hover:text-[#3C3837]"
                  }`}
                >
                  {added === product.id ? <Check size={13} /> : <ShoppingCart size={13} />}
                </button>
              </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Mobile "Browse shop" link */}
        <div className="sm:hidden mt-5 text-center">
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#26649A]"
          >
            Browse shop <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}