"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import PageReveal from "../components/Reuseable/PageReveal";

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  tag?: "New" | "Popular" | "Sale" | "Hot";
  image: string; // place your image in /images/ folder and set filename here
  description: string;
}

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Fast Charger 65W",
    price: 1299,
    originalPrice: 1799,
    category: "Chargers",
    tag: "Sale",
    image: "/imagegs/products/1.jfif",
    description: "65W GaN charger, charges most phones to 50% in 20 minutes.",
  },
  {
    id: 2,
    name: "Wireless Earbuds Pro",
    price: 3499,
    category: "Audio",
    tag: "Popular",
    image: "/imagegs/products/2.jfif",
    description: "Active noise cancellation with 30 hour total battery life.",
  },
  {
    id: 3,
    name: "Premium Phone Case",
    price: 599,
    originalPrice: 899,
    category: "Cases",
    tag: "Sale",
    image: "/imagegs/products/3.jfif",
    description: "Military grade drop protection, slim profile design.",
  },
  {
    id: 4,
    name: "Tempered Glass Pack",
    price: 349,
    category: "Accessories",
    tag: "New",
    image: "/imagegs/products/4.png",
    description: "9H hardness, ultra clear oleophobic coating. Pack of 2.",
  },
  {
    id: 5,
    name: "MagSafe Power Bank",
    price: 4999,
    category: "Chargers",
    tag: "Hot",
    image: "/imagegs/products/5.webp",
    description: "10,000 mAh magnetic wireless power bank, 20W PD.",
  },
  {
    id: 6,
    name: "USB-C Data Cable 2m",
    price: 449,
    category: "Cables",
    tag: "New",
    image: "/imagegs/products/6.jfif",
    description: "Braided nylon, supports 100W charging and 480 Mbps data.",
  },
];

const CATEGORIES = ["All", ...Array.from(new Set(PRODUCTS.map((p) => p.category)))];

const TAG_STYLE: Record<string, string> = {
  New: "bg-[#00C2D1] text-[#04342c]",
  Popular: "bg-[#26649A] text-white",
  Sale: "bg-[#00C2D1] text-[#04342c]",
  Hot: "bg-[#1C4B75] text-white",
};

function AnimatedNumber({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const step = Math.ceil(target / 60);
          const timer = setInterval(() => {
            start += step;
            if (start >= target) { setCount(target); clearInterval(timer); }
            else setCount(start);
          }, 16);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

function ProductCard({ product, index }: { product: Product; index: number }) {
  const [loaded, setLoaded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.5s ease ${index * 0.08}s, transform 0.5s ease ${index * 0.08}s`,
      }}
      className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col"
    >
      <div className="relative overflow-hidden bg-[#F7F8FA] h-52">
        <Image
          src={product.image}
          alt={product.name}
          width={800}
          height={600}
          unoptimized
          onLoad={() => setLoaded(true)}
          onError={(e) => {
            // Falls back to a placeholder if image not found
            const target = e.currentTarget as HTMLImageElement;
            target.src = `https://placehold.co/400x300/F7F8FA/26649A?text=${encodeURIComponent(product.name)}`;
            setLoaded(true);
          }}
          style={{
            transform: hovered ? "scale(1.07)" : "scale(1)",
            opacity: loaded ? 1 : 0,
            transition: "transform 0.4s ease, opacity 0.3s ease",
          }}
          className="w-full h-full object-cover"
        />
        {!loaded && (
          <div className="absolute inset-0 bg-[#F7F8FA] animate-pulse" />
        )}
        {product.tag && (
          <span
            className={`absolute top-3 left-3 text-[11px] font-semibold px-2.5 py-1 rounded-full ${TAG_STYLE[product.tag]}`}
          >
            {product.tag}
          </span>
        )}
        {discount && (
          <span className="absolute top-3 right-3 bg-red-500 text-white text-[11px] font-semibold px-2 py-1 rounded-full">
            -{discount}%
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <p className="text-[11px] uppercase tracking-widest text-[#26649A] font-semibold mb-1">
          {product.category}
        </p>
        <h3 className="text-[#3C3837] font-semibold text-[15px] leading-snug mb-1">
          {product.name}
        </h3>
        <p className="text-[12px] text-gray-400 leading-relaxed mb-4 flex-1">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <div>
            <span className="text-[#1C4B75] font-bold text-lg">
              Rs {product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="ml-2 text-gray-400 line-through text-sm">
                Rs {product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
          <button
            style={{ transition: "background 0.2s" }}
            className="bg-[#00C2D1] hover:bg-[#009aaa] text-[#04342c] text-[13px] font-semibold px-4 py-2 rounded-lg"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = PRODUCTS.filter((p) => {
    const matchCat = activeCategory === "All" || p.category === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <PageReveal>
      <div className="min-h-screen bg-[#F7F8FA] font-sans text-[#3C3837]">

      {/* ── HERO BANNER ── */}
      <section className="bg-gradient-to-br from-[#26649A] to-[#1C4B75] py-14 px-4 relative overflow-hidden">
        <div className="absolute inset-0 z-0 hidden lg:block">
          <Image
            src="/imagegs/products/productbg(1).webp"
            alt="Mobile accessories"
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>

        {/* Decorative circles */}
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-[#00C2D1] opacity-10 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full bg-[#00C2D1] opacity-5" />

        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <span className="inline-block bg-[#00C2D1]/20 text-[#00C2D1] text-[11px] font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
            Lodhran&apos;s Trusted Mobile Store
          </span>
          <h1 className="text-white text-4xl md:text-5xl font-extrabold leading-tight mb-4">
            Top Accessories <br />
            <span className="text-[#00C2D1]">Best Prices</span>
          </h1>
          <p className="text-white/70 text-[15px] max-w-md mx-auto mb-8">
            Genuine chargers, earbuds, cases &amp; more  all under one roof at Mehria Mobiles, Lodhran.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button className="bg-[#00C2D1] hover:bg-[#009aaa] text-[#04342c] font-bold px-8 py-3 rounded-xl transition-colors">
              Browse Products
            </button>
            <button className="border border-white/30 text-white hover:bg-white/10 font-semibold px-8 py-3 rounded-xl transition-colors">
              Call Us
            </button>
          </div>
        </div>
      </section>

      {/* ── STATS ROW ── */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { label: "Products in Stock", value: 500, suffix: "+" },
            { label: "Happy Customers", value: 12000, suffix: "+" },
            { label: "Brands Available", value: 40, suffix: "+" },
            { label: "Years in Business", value: 8, suffix: "" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-[#26649A] text-3xl font-extrabold">
                <AnimatedNumber target={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-gray-400 text-[12px] mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── PRODUCTS SECTION ── */}
      <section className="max-w-6xl mx-auto px-4 py-12">

        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <p className="text-[#00C2D1] text-[11px] font-semibold tracking-widest uppercase mb-1">Our Collection</p>
            <h2 className="text-[#1C4B75] text-3xl font-extrabold">Featured Products</h2>
          </div>

          {/* Search */}
          <div className="relative w-full md:w-64">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M16.65 10.5a6.15 6.15 0 11-12.3 0 6.15 6.15 0 0112.3 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search products…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-[13px] bg-white focus:outline-none focus:ring-2 focus:ring-[#00C2D1] focus:border-transparent"
            />
          </div>
        </div>

        {/* Category pills */}
        <div className="flex gap-2 flex-wrap mb-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{ transition: "all 0.2s" }}
              className={`px-4 py-2 rounded-full text-[13px] font-semibold border ${
                activeCategory === cat
                  ? "bg-[#26649A] text-white border-[#26649A]"
                  : "bg-white text-[#3C3837] border-gray-200 hover:border-[#26649A] hover:text-[#26649A]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-400">
            <p className="text-4xl mb-3">📦</p>
            <p className="font-semibold">No products found</p>
            <p className="text-[13px] mt-1">Try a different search or category.</p>
          </div>
        )}
      </section>

      {/* ── BANNER CTA ── */}
      <section className="bg-[#26649A] mx-4 mb-12 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 max-w-6xl md:mx-auto">
        <div>
          <h3 className="text-white text-2xl font-extrabold mb-1">Visit Us in Lodhran</h3>
          <p className="text-white/70 text-[14px]">
            Shop in-store for hands on demos and same day deals at Mehria Mobiles.
          </p>
        </div>
        <button className="bg-[#00C2D1] hover:bg-[#009aaa] text-[#04342c] font-bold px-8 py-3 rounded-xl whitespace-nowrap transition-colors">
          Get Directions
        </button>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#3C3837] text-white/70 text-center text-[12px] py-6 px-4">
        <p className="font-semibold text-white text-[14px] mb-1">Mehria Mobiles Lodhran</p>
        <p>© {new Date().getFullYear()} All rights reserved. Genuine products. Trusted service.</p>
      </footer>
    </div>
    </PageReveal>
  );
}