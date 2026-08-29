"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  SlidersHorizontal,
  X,
  ShoppingCart,
  Plus,
  Star,
  ChevronDown,
  ArrowLeft,
  Check,
} from "lucide-react";

// ─── Data ────────────────────────────────────────────────────────────────────

const categories = [
  { id: "all", label: "All Products" },
  { id: "chargers", label: "Chargers & Cables" },
  { id: "cases", label: "Cases & Covers" },
  { id: "earbuds", label: "Earbuds & Audio" },
  { id: "protectors", label: "Screen Protectors" },
  { id: "accessories", label: "Accessories" },
];

const products = [
  {
    id: 1,
    name: "20W Fast Charger",
    price: 1200,
    oldPrice: 1500,
    tag: "New",
    tagColor: "#00C2D1",
    tagText: "#3C3837",
    category: "chargers",
    rating: 4.8,
    reviews: 42,
    img: "/imagegs/products/1.jfif",
    inStock: true,
  },
  {
    id: 2,
    name: "Wireless Earbuds Pro",
    price: 3500,
    oldPrice: 4200,
    tag: "Popular",
    tagColor: "#26649A",
    tagText: "#FFFFFF",
    category: "earbuds",
    rating: 4.9,
    reviews: 87,
    img: "/imagegs/products/2.jfif",
    inStock: true,
  },
  {
    id: 3,
    name: "Tempered Glass Protector",
    price: 350,
    oldPrice: null,
    tag: "Sale",
    tagColor: "#ef4444",
    tagText: "#FFFFFF",
    category: "protectors",
    rating: 4.7,
    reviews: 63,
    img: "/imagegs/products/3.jfif",
    inStock: true,
  },
  {
    id: 4,
    name: "Shockproof Silicone Case",
    price: 800,
    oldPrice: 1000,
    tag: "New",
    tagColor: "#00C2D1",
    tagText: "#3C3837",
    category: "cases",
    rating: 4.6,
    reviews: 38,
    img: "/imagegs/products/4.png",
    inStock: true,
  },
  {
    id: 5,
    name: "Type-C Cable 2m",
    price: 450,
    oldPrice: null,
    tag: "Popular",
    tagColor: "#26649A",
    tagText: "#FFFFFF",
    category: "chargers",
    rating: 4.5,
    reviews: 55,
    img: "/imagegs/products/5.webp",
    inStock: true,
  },
  {
    id: 6,
    name: "LED Power Bank 10000mAh",
    price: 2800,
    oldPrice: 3500,
    tag: "New",
    tagColor: "#00C2D1",
    tagText: "#3C3837",
    category: "accessories",
    rating: 4.8,
    reviews: 29,
    img: "/imagegs/products/6.jfif",
    inStock: true,
  },
  {
    id: 7,
    name: "Magnetic Phone Stand",
    price: 600,
    oldPrice: null,
    tag: null,
    tagColor: "",
    tagText: "",
    category: "accessories",
    rating: 4.4,
    reviews: 18,
    img: "/imagegs/products/1.jfif",
    inStock: false,
  },
  {
    id: 8,
    name: "Leather Flip Cover",
    price: 950,
    oldPrice: 1200,
    tag: "Sale",
    tagColor: "#ef4444",
    tagText: "#FFFFFF",
    category: "cases",
    rating: 4.7,
    reviews: 31,
    img: "/imagegs/products/4.png",
    inStock: true,
  },
  {
    id: 9,
    name: "Clear Back Case",
    price: 400,
    oldPrice: null,
    tag: null,
    tagColor: "",
    tagText: "",
    category: "cases",
    rating: 4.3,
    reviews: 22,
    img: "/imagegs/products/3.jfif",
    inStock: true,
  },
  {
    id: 10,
    name: "Wired Earphones",
    price: 700,
    oldPrice: 900,
    tag: "Sale",
    tagColor: "#ef4444",
    tagText: "#FFFFFF",
    category: "earbuds",
    rating: 4.5,
    reviews: 46,
    img: "/imagegs/products/2.jfif",
    inStock: true,
  },
  {
    id: 11,
    name: "USB-A to Lightning Cable",
    price: 380,
    oldPrice: null,
    tag: null,
    tagColor: "",
    tagText: "",
    category: "chargers",
    rating: 4.4,
    reviews: 27,
    img: "/imagegs/products/5.webp",
    inStock: true,
  },
  {
    id: 12,
    name: "Anti-Spy Screen Protector",
    price: 550,
    oldPrice: 700,
    tag: "Popular",
    tagColor: "#26649A",
    tagText: "#FFFFFF",
    category: "protectors",
    rating: 4.6,
    reviews: 34,
    img: "/imagegs/products/6.jfif",
    inStock: true,
  },
];

const sortOptions = [
  { id: "popular", label: "Most Popular" },
  { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
  { id: "rating", label: "Top Rated" },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function ShopPage() {
  const [selectedCat, setSelectedCat] = useState("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("popular");
  const [sortOpen, setSortOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [cart, setCart] = useState<number[]>([]);
  const [added, setAdded] = useState<number | null>(null);

  const addToCart = (id: number) => {
    setCart((prev) => [...prev, id]);
    setAdded(id);
    setTimeout(() => setAdded(null), 1500);
  };

  const filtered = useMemo(() => {
    let list = [...products];
    if (selectedCat !== "all") list = list.filter((p) => p.category === selectedCat);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q));
    }
    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    else if (sort === "rating") list.sort((a, b) => b.rating - a.rating);
    else list.sort((a, b) => b.reviews - a.reviews);
    return list;
  }, [selectedCat, search, sort]);

  const activeSortLabel = sortOptions.find((s) => s.id === sort)?.label;

  return (
    <main className="min-h-screen bg-[#F7F8FA]">

      {/* ── Hero / Banner ─────────────────────────────── */}
      <section className="bg-[#3C3837] text-white">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-8 py-10 sm:py-14">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-white/50 hover:text-[#00C2D1] transition-colors mb-5"
          >
            <ArrowLeft size={13} /> Back to Home
          </Link>
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="text-[28px] sm:text-4xl lg:text-5xl font-semibold tracking-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Shop All Products
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="text-sm sm:text-base text-white/55 mt-3 max-w-lg"
          >
            Genuine mobile accessories — chargers, cases, earbuds, screen
            protectors and more, all at honest prices.
          </motion.p>
        </div>
      </section>

      <div className="max-w-[1240px] mx-auto px-4 sm:px-8 py-8 lg:py-10">

        {/* ── Toolbar ───────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">

          {/* Search */}
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#3C3837]/40" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products…"
              className="w-full pl-9 pr-4 py-2.5 bg-white border border-[#3C3837]/[0.08] rounded-xl text-sm text-[#3C3837] placeholder:text-[#3C3837]/35 outline-none focus:border-[#26649A]/40 transition-colors shadow-sm"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#3C3837]/40 hover:text-[#3C3837] transition-colors"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Sort dropdown */}
          <div className="relative shrink-0">
            <button
              onClick={() => setSortOpen((v) => !v)}
              className="w-full sm:w-auto flex items-center justify-between gap-3 bg-white border border-[#3C3837]/[0.08] rounded-xl px-4 py-2.5 text-sm font-medium text-[#3C3837] shadow-sm hover:border-[#26649A]/30 transition-colors"
            >
              <span>{activeSortLabel}</span>
              <ChevronDown size={14} className={`transition-transform ${sortOpen ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {sortOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.97 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-2 w-48 bg-white border border-[#3C3837]/[0.08] rounded-xl shadow-lg overflow-hidden z-30"
                >
                  {sortOptions.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => { setSort(opt.id); setSortOpen(false); }}
                      className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors ${
                        sort === opt.id
                          ? "text-[#26649A] bg-[#26649A]/[0.05] font-medium"
                          : "text-[#3C3837]/70 hover:bg-[#F7F8FA]"
                      }`}
                    >
                      {opt.label}
                      {sort === opt.id && <Check size={13} className="text-[#26649A]" />}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile filter toggle */}
          <button
            onClick={() => setFiltersOpen((v) => !v)}
            className="sm:hidden flex items-center justify-center gap-2 bg-white border border-[#3C3837]/[0.08] rounded-xl px-4 py-2.5 text-sm font-medium text-[#3C3837] shadow-sm"
          >
            <SlidersHorizontal size={14} />
            Filter by category
          </button>
        </div>

        <div className="flex gap-6 lg:gap-8">

          {/* ── Sidebar — desktop ────────────────────────── */}
          <aside className="hidden sm:flex flex-col gap-1 w-48 lg:w-52 shrink-0 pt-1">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#3C3837]/40 mb-2 px-2">
              Categories
            </p>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCat(cat.id)}
                className={`text-left px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedCat === cat.id
                    ? "bg-[#26649A] text-white shadow-sm"
                    : "text-[#3C3837]/70 hover:bg-white hover:text-[#3C3837]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </aside>

          {/* ── Mobile filter sheet ───────────────────────── */}
          <AnimatePresence>
            {filtersOpen && (
              <>
                {/* Backdrop */}
                <motion.div
                  key="backdrop"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setFiltersOpen(false)}
                  className="fixed inset-0 z-40 bg-black/40 sm:hidden"
                />
                {/* Sheet */}
                <motion.div
                  key="sheet"
                  initial={{ x: "-100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  transition={{ type: "spring", stiffness: 320, damping: 32 }}
                  className="fixed left-0 top-0 bottom-0 z-50 w-72 bg-white shadow-xl sm:hidden flex flex-col"
                >
                  <div className="flex items-center justify-between px-5 py-4 border-b border-[#3C3837]/[0.06]">
                    <p className="font-semibold text-[#3C3837]">Filter by Category</p>
                    <button
                      onClick={() => setFiltersOpen(false)}
                      className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#F7F8FA] text-[#3C3837]/60"
                    >
                      <X size={16} />
                    </button>
                  </div>
                  <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-1">
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => { setSelectedCat(cat.id); setFiltersOpen(false); }}
                        className={`text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                          selectedCat === cat.id
                            ? "bg-[#26649A] text-white"
                            : "text-[#3C3837]/70 hover:bg-[#F7F8FA]"
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* ── Products ──────────────────────────────────── */}
          <div className="flex-1 min-w-0">

            {/* Result count + active category */}
            <div className="flex items-center justify-between mb-5">
              <p className="text-sm text-[#3C3837]/50">
                <span className="font-semibold text-[#3C3837]">{filtered.length}</span> product{filtered.length !== 1 ? "s" : ""}
                {selectedCat !== "all" && (
                  <> in <span className="text-[#26649A]">{categories.find(c => c.id === selectedCat)?.label}</span></>
                )}
              </p>
              {cart.length > 0 && (
                <div className="flex items-center gap-1.5 text-xs text-[#26649A] font-medium">
                  <ShoppingCart size={13} />
                  {cart.length} in cart
                </div>
              )}
            </div>

            {/* Grid */}
            <AnimatePresence mode="popLayout">
              {filtered.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-24 text-[#3C3837]/40"
                >
                  <Search size={36} className="mx-auto mb-3 opacity-30" />
                  <p className="text-sm">No products found. Try a different search.</p>
                </motion.div>
              ) : (
                <motion.div
                  layout
                  className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4"
                >
                  {filtered.map((product, i) => (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.35, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                      className="group bg-white rounded-2xl border border-[#3C3837]/[0.05] hover:border-[#26649A]/20 hover:shadow-[0_12px_32px_-8px_rgba(28,75,117,0.12)] transition-all duration-300 overflow-hidden flex flex-col"
                    >
                      {/* Image */}
                      <div className="relative aspect-square bg-[#F7F8FA] overflow-hidden">
                        {product.tag && (
                          <span
                            className="absolute top-2 left-2 z-10 text-[9px] sm:text-[10px] font-semibold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md"
                            style={{ backgroundColor: product.tagColor, color: product.tagText }}
                          >
                            {product.tag}
                          </span>
                        )}
                        {!product.inStock && (
                          <div className="absolute inset-0 z-10 bg-white/60 backdrop-blur-[2px] flex items-center justify-center">
                            <span className="text-[11px] font-semibold text-[#3C3837]/60 bg-white px-2.5 py-1 rounded-full border border-[#3C3837]/10">
                              Out of stock
                            </span>
                          </div>
                        )}
                        <Image
                          src={product.img}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          unoptimized
                        />
                        {/* Add button hover overlay */}
                        {product.inStock && (
                          <motion.button
                            whileTap={{ scale: 0.92 }}
                            onClick={() => addToCart(product.id)}
                            className="absolute bottom-2 right-2 z-10 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-[#26649A] opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300"
                          >
                            {added === product.id ? (
                              <Check size={14} className="text-green-500" />
                            ) : (
                              <Plus size={14} />
                            )}
                          </motion.button>
                        )}
                      </div>

                      {/* Info */}
                      <div className="p-3 sm:p-4 flex flex-col gap-1 flex-1">
                        <p className="text-[12px] sm:text-[13.5px] font-medium text-[#3C3837] leading-snug line-clamp-2">
                          {product.name}
                        </p>

                        {/* Rating */}
                        <div className="flex items-center gap-1 mt-0.5">
                          <Star size={10} fill="#00C2D1" strokeWidth={0} />
                          <span className="text-[10px] sm:text-[11px] text-[#3C3837]/50 font-medium">
                            {product.rating} ({product.reviews})
                          </span>
                        </div>

                        <div className="flex items-center justify-between mt-auto pt-2">
                          <div>
                            <p className="text-[13px] sm:text-[14px] font-semibold text-[#26649A]">
                              Rs. {product.price.toLocaleString()}
                            </p>
                            {product.oldPrice && (
                              <p className="text-[10px] text-[#3C3837]/35 line-through">
                                Rs. {product.oldPrice.toLocaleString()}
                              </p>
                            )}
                          </div>
                          {product.inStock && (
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.92 }}
                              onClick={() => addToCart(product.id)}
                              className={`flex items-center justify-center gap-1.5 text-[11px] sm:text-xs font-semibold px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg transition-all ${
                                added === product.id
                                  ? "bg-green-500 text-white"
                                  : "bg-[#00C2D1] hover:bg-[#00AAB8] text-[#3C3837]"
                              }`}
                            >
                              {added === product.id ? (
                                <>
                                  <Check size={11} />
                                  <span className="hidden sm:inline">Added</span>
                                </>
                              ) : (
                                <>
                                  <ShoppingCart size={11} />
                                  <span className="hidden sm:inline">Add</span>
                                </>
                              )}
                            </motion.button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ── Floating cart badge (mobile) ──────────────── */}
      <AnimatePresence>
        {cart.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 sm:hidden"
          >
            <button className="flex items-center gap-2.5 bg-[#3C3837] text-white text-sm font-semibold px-5 py-3 rounded-full shadow-lg">
              <ShoppingCart size={15} />
              {cart.length} item{cart.length !== 1 ? "s" : ""} in cart
              <span className="ml-1 bg-[#00C2D1] text-[#3C3837] text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                View
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
