"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  BadgeCheck,
  Check,
  CreditCard,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingCart,
  Star,
  Truck,
} from "lucide-react";
import { motion } from "framer-motion";

import { products } from "@/app/data/products";
import { useCart } from "@/app/context/CartContext";

const featureBadges = [
  {
    label: "Official product",
    icon: BadgeCheck,
  },
  {
    label: "Fast delivery",
    icon: Truck,
  },
  {
    label: "Secure payment",
    icon: CreditCard,
  },
  {
    label: "1 year warranty",
    icon: ShieldCheck,
  },
];

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: "easeOut",
    },
  },
};

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
      <main className="flex min-h-screen items-center justify-center bg-[#F7F8FA] px-4 text-[#3C3837]">
        <div className="w-full max-w-md text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#26649A]">
            Product not found
          </p>

          <h1 className="mt-4 text-3xl font-semibold tracking-tight">
            This item does not exist.
          </h1>

          <p className="mt-3 text-sm leading-6 text-[#3C3837]/55">
            The product you are looking for may have been removed or moved.
          </p>

          <Link
            href="/shop"
            className="mt-7 inline-flex items-center gap-2 rounded-lg bg-[#26649A] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#1d527e]"
          >
            <ArrowLeft size={16} />
            Back to shop
          </Link>
        </div>
      </main>
    );
  }

  const relatedProducts = products
    .filter(
      (item) =>
        item.category === product.category && item.id !== product.id
    )
    .slice(0, 4);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i += 1) {
      addToCart(product);
    }

    setAdded(true);

    window.setTimeout(() => {
      setAdded(false);
    }, 1400);
  };

  return (
    <main className="min-h-screen bg-[#F7F8FA] text-[#3C3837]">
      {/* Back navigation */}
      <div className="border-b border-[#3C3837]/[0.06] bg-white">
        <div className="mx-auto max-w-[1280px] px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href="/shop"
            className="group inline-flex items-center gap-2 text-sm font-medium text-[#3C3837]/55 transition-colors hover:text-[#26649A]"
          >
            <ArrowLeft
              size={15}
              className="transition-transform duration-200 group-hover:-translate-x-1"
            />
            Back to products
          </Link>
        </div>
      </div>

      {/* Product */}
      <section className="mx-auto max-w-[1280px] px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          {/* Product image */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            <div className="relative overflow-hidden border border-[#3C3837]/[0.07] bg-[#F1F3F5]">
              <div className="relative aspect-square sm:aspect-[4/3]">
                {product.tag && (
                  <span
                    className="absolute left-5 top-5 z-10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em]"
                    style={{
                      backgroundColor: product.tagColor,
                      color: product.tagText,
                    }}
                  >
                    {product.tag}
                  </span>
                )}

                <Image
                  src={product.img}
                  alt={product.name}
                  fill
                  priority
                  unoptimized
                  className="object-cover transition-transform duration-500 hover:scale-[1.02]"
                />
              </div>
            </div>

            {/* Small image indicator */}
            <div className="mt-3 flex items-center justify-between text-xs text-[#3C3837]/40">
              <span>Premium product presentation</span>

              {product.inStock && (
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Available now
                </span>
              )}
            </div>
          </motion.div>

          {/* Product information */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="flex flex-col justify-center"
          >
            {/* Category + stock */}
            <div className="flex items-center justify-between gap-4">
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#26649A]">
                {product.category}
              </span>

              <span className="flex items-center gap-1.5 text-xs font-medium">
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    product.inStock
                      ? "bg-emerald-500"
                      : "bg-red-500"
                  }`}
                />

                <span
                  className={
                    product.inStock
                      ? "text-emerald-700"
                      : "text-red-600"
                  }
                >
                  {product.inStock ? "In stock" : "Out of stock"}
                </span>
              </span>
            </div>

            {/* Name */}
            <h1 className="mt-5 max-w-xl text-3xl font-semibold leading-[1.12] tracking-[-0.025em] sm:text-4xl lg:text-[44px]">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="mt-5 flex items-center gap-3">
              <div className="flex items-center gap-1">
                <Star
                  size={15}
                  fill="#26649A"
                  className="text-[#26649A]"
                />

                <span className="text-sm font-semibold">
                  {product.rating}
                </span>
              </div>

              <span className="h-4 w-px bg-[#3C3837]/10" />

              <span className="text-sm text-[#3C3837]/50">
                {product.reviews} reviews
              </span>
            </div>

            {/* Price */}
            <div className="mt-7 flex items-baseline gap-3">
              <span className="text-3xl font-semibold tracking-tight text-[#26649A] sm:text-4xl">
                Rs. {product.price.toLocaleString()}
              </span>

              {product.oldPrice && (
                <span className="text-base text-[#3C3837]/35 line-through">
                  Rs. {product.oldPrice.toLocaleString()}
                </span>
              )}
            </div>

            {/* Divider */}
            <div className="my-7 h-px bg-[#3C3837]/[0.08]" />

            {/* Description */}
            <p className="max-w-xl text-[15px] leading-7 text-[#3C3837]/65">
              High-quality mobile accessory designed for daily use,
              dependable performance, and a clean premium finish that
              complements modern devices.
            </p>

            {/* Purchase controls */}
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              {/* Quantity */}
              <div className="flex h-12 w-fit items-center border border-[#3C3837]/10 bg-white">
                <button
                  type="button"
                  onClick={() =>
                    setQuantity((value) => Math.max(1, value - 1))
                  }
                  className="flex h-full w-11 items-center justify-center text-[#3C3837]/60 transition-colors hover:bg-[#F7F8FA] hover:text-[#3C3837]"
                  aria-label="Decrease quantity"
                >
                  <Minus size={15} />
                </button>

                <span className="w-10 text-center text-sm font-semibold">
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={() =>
                    setQuantity((value) => value + 1)
                  }
                  className="flex h-full w-11 items-center justify-center text-[#3C3837]/60 transition-colors hover:bg-[#F7F8FA] hover:text-[#3C3837]"
                  aria-label="Increase quantity"
                >
                  <Plus size={15} />
                </button>
              </div>

              {/* Add to cart */}
              <motion.button
                type="button"
                onClick={handleAddToCart}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                disabled={!product.inStock}
                className={`flex h-12 flex-1 items-center justify-center gap-2 rounded-lg px-6 text-sm font-semibold transition-colors ${
                  product.inStock
                    ? "bg-[#26649A] text-white hover:bg-[#1D527E]"
                    : "cursor-not-allowed bg-[#3C3837]/10 text-[#3C3837]/40"
                }`}
              >
                {added ? (
                  <Check size={17} />
                ) : (
                  <ShoppingCart size={17} />
                )}

                {added
                  ? "Added to cart"
                  : product.inStock
                    ? "Add to cart"
                    : "Out of stock"}
              </motion.button>
            </div>

            {/* Trust information */}
            <div className="mt-8 border-t border-[#3C3837]/[0.08] pt-6">
              <div className="grid grid-cols-2 gap-x-6 gap-y-5">
                {featureBadges.map(({ label, icon: Icon }) => (
                  <div
                    key={label}
                    className="flex items-center gap-2.5"
                  >
                    <Icon
                      size={16}
                      strokeWidth={1.7}
                      className="shrink-0 text-[#26649A]"
                    />

                    <span className="text-xs font-medium text-[#3C3837]/60">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Product details */}
      <section className="border-y border-[#3C3837]/[0.06] bg-white">
        <div className="mx-auto max-w-[1280px] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
          >
            <div className="flex items-end justify-between gap-6">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#26649A]">
                  Product information
                </p>

                <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                  Product details
                </h2>
              </div>
            </div>

            <div className="mt-10 grid gap-10 md:grid-cols-2 md:gap-16">
              {/* Description */}
              <div>
                <h3 className="text-sm font-semibold">
                  Description
                </h3>

                <p className="mt-4 max-w-xl text-sm leading-7 text-[#3C3837]/60">
                  Built for seamless compatibility and long-lasting
                  performance,{" "}
                  <span className="font-medium text-[#3C3837]/75">
                    {product.name}
                  </span>{" "}
                  delivers premium value for everyday use. Whether
                  you are charging, listening, protecting, or
                  organizing your device, this product is designed to
                  keep up with your routine.
                </p>
              </div>

              {/* Why choose */}
              <div className="border-t border-[#3C3837]/[0.08] pt-8 md:border-l md:border-t-0 md:pl-16 md:pt-0">
                <h3 className="text-sm font-semibold">
                  Why choose it
                </h3>

                <ul className="mt-4 space-y-3">
                  {[
                    "Durable build quality for daily use",
                    "Designed to fit modern devices perfectly",
                    "Trusted quality from Mehria Mobiles",
                    "Easy to use with reliable performance",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm leading-6 text-[#3C3837]/60"
                    >
                      <Check
                        size={15}
                        className="mt-1 shrink-0 text-[#26649A]"
                      />

                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <section className="mx-auto max-w-[1280px] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={fadeUp}
          >
            {/* Heading */}
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#26649A]">
                  You may also like
                </p>

                <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                  Related products
                </h2>
              </div>

              <Link
                href="/shop"
                className="hidden text-sm font-medium text-[#26649A] transition-colors hover:text-[#1D527E] sm:block"
              >
                View all
              </Link>
            </div>

            {/* Grid */}
            <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 lg:grid-cols-4">
              {relatedProducts.map((item) => (
                <Link
                  key={item.id}
                  href={`/products/${item.id}`}
                  className="group"
                >
                  {/* Image */}
                  <div className="relative aspect-square overflow-hidden bg-[#F1F3F5]">
                    {item.tag && (
                      <span
                        className="absolute left-3 top-3 z-10 px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.1em]"
                        style={{
                          backgroundColor: item.tagColor,
                          color: item.tagText,
                        }}
                      >
                        {item.tag}
                      </span>
                    )}

                    <Image
                      src={item.img}
                      alt={item.name}
                      fill
                      unoptimized
                      className="object-cover transition-transform duration-400 ease-out group-hover:scale-[1.035]"
                    />
                  </div>

                  {/* Information */}
                  <div className="pt-4">
                    <p className="line-clamp-2 text-sm font-medium leading-5 text-[#3C3837] transition-colors group-hover:text-[#26649A]">
                      {item.name}
                    </p>

                    <div className="mt-2 flex items-center justify-between gap-2">
                      <span className="text-sm font-semibold text-[#26649A]">
                        Rs. {item.price.toLocaleString()}
                      </span>

                      <div className="hidden items-center gap-1 text-xs text-[#3C3837]/45 sm:flex">
                        <Star
                          size={11}
                          fill="currentColor"
                        />
                        {item.rating}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Mobile view all */}
            <Link
              href="/shop"
              className="mt-8 inline-flex text-sm font-medium text-[#26649A] sm:hidden"
            >
              View all products →
            </Link>
          </motion.div>
        </section>
      )}
    </main>
  );
}