"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  Check,
  Minus,
  Plus,
  ShoppingCart,
  Star,
} from "lucide-react";
import { products } from "@/app/data/products";
import { useCart } from "@/app/context/CartContext";

const featureBadges = [
  "Official product",
  "Fast delivery",
  "Secure payment",
  "1 year warranty",
];

export default function ProductDetailsPage() {
  const params = useParams<{ id: string }>();
  const productId = Number(params?.id ?? 0);
  const product = useMemo(
    () => products.find((item) => item.id === productId),
    [productId]
  );
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();

  if (!product) {
    return (
      <main className="min-h-screen bg-[#F7F8FA] px-4 py-20 text-center text-[#3C3837]">
        <div className="max-w-xl mx-auto rounded-3xl border border-[#3C3837]/[0.08] bg-white p-10 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#26649A]">
            Product not found
          </p>
          <h1 className="mt-4 text-3xl font-semibold">This item does not exist.</h1>
          <p className="mt-3 text-[#3C3837]/60">
            The product you are looking for may have been removed or moved.
          </p>
          <Link
            href="/shop"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#26649A] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1C4B75]"
          >
            <ArrowLeft size={16} /> Back to shop
          </Link>
        </div>
      </main>
    );
  }

  const relatedProducts = products
    .filter((item) => item.category === product.category && item.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i += 1) {
      addToCart(product);
    }
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1400);
  };

  return (
    <main className="min-h-screen bg-[#F7F8FA] text-[#3C3837]">
      <section className="bg-white border-b border-[#3C3837]/[0.06]">
        <div className="mx-auto max-w-[1240px] px-4 py-5 sm:px-8">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#26649A] transition hover:text-[#1C4B75]"
          >
            <ArrowLeft size={15} /> Back to products
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-4 py-8 sm:px-8 lg:py-12">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="overflow-hidden rounded-[28px] border border-[#3C3837]/[0.08] bg-white p-4 shadow-[0_12px_30px_-18px_rgba(28,75,117,0.3)] sm:p-6">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[22px] bg-[#F7F8FA]">
              {product.tag && (
                <span
                  className="absolute left-4 top-4 z-10 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em]"
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
            </div>
          </div>

          <div className="rounded-[28px] border border-[#3C3837]/[0.08] bg-white p-5 shadow-[0_12px_30px_-18px_rgba(28,75,117,0.3)] sm:p-7">
            <div className="flex items-center justify-between gap-3">
              <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#26649A]">
                {product.category}
              </span>
              <span
                className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                  product.inStock
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-red-50 text-red-600"
                }`}
              >
                {product.inStock ? "In stock" : "Out of stock"}
              </span>
            </div>

            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-[#3C3837] sm:text-4xl">
              {product.name}
            </h1>

            <div className="mt-4 flex items-center gap-2">
              <div className="flex items-center gap-1 rounded-full bg-[#00C2D1]/10 px-2.5 py-1 text-[#26649A]">
                <Star size={13} fill="#00C2D1" strokeWidth={0} />
                <span className="text-sm font-medium">{product.rating}</span>
              </div>
              <span className="text-sm text-[#3C3837]/55">({product.reviews} reviews)</span>
            </div>

            <div className="mt-6 flex items-end gap-3">
              <span className="text-3xl font-bold text-[#26649A]">
                Rs. {product.price.toLocaleString()}
              </span>
              {product.oldPrice && (
                <span className="text-lg text-[#3C3837]/40 line-through">
                  Rs. {product.oldPrice.toLocaleString()}
                </span>
              )}
            </div>

            <p className="mt-5 text-sm leading-7 text-[#3C3837]/70">
              High-quality mobile accessory designed for daily use, dependable performance,
              and a clean premium finish that matches modern devices.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <div className="flex items-center overflow-hidden rounded-xl border border-[#3C3837]/10 bg-[#F7F8FA]">
                <button
                  type="button"
                  onClick={() => setQuantity((v) => Math.max(1, v - 1))}
                  className="flex h-11 w-11 items-center justify-center text-[#3C3837] transition hover:bg-[#E7EEF7]"
                  aria-label="Decrease quantity"
                >
                  <Minus size={16} />
                </button>
                <span className="w-12 text-center text-sm font-semibold text-[#3C3837]">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((v) => v + 1)}
                  className="flex h-11 w-11 items-center justify-center text-[#3C3837] transition hover:bg-[#E7EEF7]"
                  aria-label="Increase quantity"
                >
                  <Plus size={16} />
                </button>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#00C2D1] px-5 py-3 text-sm font-semibold text-[#04342c] transition hover:bg-[#00AFBF]"
              >
                {added ? <Check size={16} /> : <ShoppingCart size={16} />}
                {added ? "Added to cart" : "Add to cart"}
              </button>
            </div>

            <div className="mt-6 grid gap-2 sm:grid-cols-2">
              {featureBadges.map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-[#3C3837]/[0.08] bg-[#F7F8FA] px-3 py-2 text-sm text-[#3C3837]/70"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-4 pb-16 sm:px-8">
        <div className="rounded-[28px] border border-[#3C3837]/[0.08] bg-white p-6 shadow-[0_12px_30px_-18px_rgba(28,75,117,0.3)]">
          <h2 className="text-2xl font-semibold text-[#3C3837]">Product details</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl bg-[#F7F8FA] p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#26649A]">
                Description
              </p>
              <p className="mt-3 text-sm leading-7 text-[#3C3837]/70">
                Built for seamless compatibility and long-lasting performance, {product.name}{" "}
                delivers premium value for everyday use. Whether you are charging,
                listening, protecting, or organizing your device, this product is made to
                keep up with your routine.
              </p>
            </div>
            <div className="rounded-2xl bg-[#F7F8FA] p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#26649A]">
                Why choose it
              </p>
              <ul className="mt-3 space-y-2 text-sm text-[#3C3837]/70">
                <li>• Durable build quality for daily use</li>
                <li>• Designed to fit modern devices perfectly</li>
                <li>• Trusted quality from Mehria Mobiles</li>
                <li>• Easy to use with reliable performance</li>
              </ul>
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <div className="mb-5 flex items-center justify-between gap-4">
              <h2 className="text-2xl font-semibold text-[#3C3837]">Related products</h2>
              <Link href="/shop" className="text-sm font-medium text-[#26649A]">
                View all
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {relatedProducts.map((item) => (
                <Link
                  key={item.id}
                  href={`/products/${item.id}`}
                  className="group overflow-hidden rounded-2xl border border-[#3C3837]/[0.06] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-[0_16px_26px_-18px_rgba(28,75,117,0.4)]"
                >
                  <div className="relative aspect-square overflow-hidden bg-[#F7F8FA]">
                    {item.tag && (
                      <span
                        className="absolute left-3 top-3 z-10 rounded-full px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.12em]"
                        style={{ backgroundColor: item.tagColor, color: item.tagText }}
                      >
                        {item.tag}
                      </span>
                    )}
                    <Image src={item.img} alt={item.name} fill className="object-cover transition duration-300 group-hover:scale-105" unoptimized />
                  </div>
                  <div className="p-4">
                    <p className="text-sm font-medium text-[#3C3837]">{item.name}</p>
                    <div className="mt-2 flex items-center justify-between gap-2">
                      <span className="text-sm font-semibold text-[#26649A]">
                        Rs. {item.price.toLocaleString()}
                      </span>
                      <span className="text-xs text-[#3C3837]/50">View</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
