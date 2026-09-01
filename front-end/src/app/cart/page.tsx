"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ShoppingCart,
  Trash2,
  Minus,
  Plus,
  ShoppingBag,
} from "lucide-react";
import { useCart } from "@/app/context/CartContext";

export default function CartPage() {
  const { items, cartCount, cartTotal, addToCart, removeFromCart, deleteFromCart } =
    useCart();

  const deliveryFee = 0; // Free delivery in Lodhran
  const grandTotal = cartTotal + deliveryFee;

  return (
    <main className="min-h-screen bg-[#F7F8FA]">
      {/* Hero */}
      <section className="bg-[#3C3837] text-white">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-8 py-10 sm:py-14">
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-xs text-white/50 hover:text-[#00C2D1] transition-colors mb-5"
          >
            <ArrowLeft size={13} /> Continue Shopping
          </Link>
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="text-[28px] sm:text-4xl lg:text-5xl font-semibold tracking-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Your Cart
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="text-sm sm:text-base text-white/55 mt-3"
          >
            {cartCount > 0
              ? `${cartCount} item${cartCount !== 1 ? "s" : ""} in your cart`
              : "Your cart is empty"}
          </motion.p>
        </div>
      </section>

      <div className="max-w-[1240px] mx-auto px-4 sm:px-8 py-8 lg:py-10">
        {items.length === 0 ? (
          /* ── Empty State ─────────────────────────────── */
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <ShoppingBag
              size={56}
              className="mx-auto mb-4 text-[#3C3837]/20"
            />
            <h2
              className="text-xl sm:text-2xl font-semibold text-[#3C3837] mb-2"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Your cart is empty
            </h2>
            <p className="text-sm text-[#3C3837]/50 mb-6">
              Browse our shop and add some products!
            </p>
            <Link
              href="/shop"
              className="inline-flex bg-[#00C2D1] hover:bg-[#00AAB8] text-[#3C3837] text-sm font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              Browse Shop
            </Link>
          </motion.div>
        ) : (
          /* ── Cart Content ────────────────────────────── */
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            {/* Items List */}
            <div className="flex-1 min-w-0">
              <AnimatePresence mode="popLayout">
                {items.map((item) => (
                  <motion.div
                    key={item.product.id}
                    layout
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -40, height: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="bg-white rounded-2xl border border-[#3C3837]/[0.05] p-3 sm:p-4 mb-3 flex gap-3 sm:gap-4 items-center"
                  >
                    {/* Product Image */}
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-[#F7F8FA] overflow-hidden shrink-0">
                      <Image
                        src={item.product.img}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] sm:text-[14px] font-medium text-[#3C3837] leading-snug line-clamp-2">
                        {item.product.name}
                      </p>
                      <p className="text-[13px] sm:text-[14px] font-semibold text-[#26649A] mt-1">
                        Rs. {item.product.price.toLocaleString()}
                      </p>
                      {item.product.oldPrice && (
                        <p className="text-[10px] text-[#3C3837]/35 line-through">
                          Rs. {item.product.oldPrice.toLocaleString()}
                        </p>
                      )}
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#F7F8FA] border border-[#3C3837]/[0.08] flex items-center justify-center text-[#3C3837]/60 hover:bg-[#26649A]/[0.08] hover:text-[#26649A] transition-colors"
                      >
                        <Minus size={13} />
                      </button>
                      <span className="w-7 text-center text-sm font-semibold text-[#3C3837]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => addToCart(item.product)}
                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#F7F8FA] border border-[#3C3837]/[0.08] flex items-center justify-center text-[#3C3837]/60 hover:bg-[#26649A]/[0.08] hover:text-[#26649A] transition-colors"
                      >
                        <Plus size={13} />
                      </button>
                    </div>

                    {/* Line Total + Delete */}
                    <div className="text-right shrink-0 flex flex-col items-end gap-1">
                      <p className="text-[13px] sm:text-[14px] font-semibold text-[#3C3837]">
                        Rs.{" "}
                        {(item.product.price * item.quantity).toLocaleString()}
                      </p>
                      <button
                        onClick={() => deleteFromCart(item.product.id)}
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-[#3C3837]/30 hover:text-[#ef4444] hover:bg-[#ef4444]/[0.08] transition-colors"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="lg:w-[340px] shrink-0"
            >
              <div className="bg-white rounded-2xl border border-[#3C3837]/[0.05] p-5 sm:p-6 sticky top-28">
                <h3
                  className="text-lg font-semibold text-[#3C3837] mb-5"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  Order Summary
                </h3>

                <div className="flex flex-col gap-3 text-sm">
                  <div className="flex justify-between text-[#3C3837]/60">
                    <span>Subtotal ({cartCount} items)</span>
                    <span className="font-medium text-[#3C3837]">
                      Rs. {cartTotal.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-[#3C3837]/60">
                    <span>Delivery</span>
                    <span className="font-medium text-green-600">Free</span>
                  </div>
                  <div className="border-t border-[#3C3837]/[0.06] pt-3 flex justify-between">
                    <span className="font-semibold text-[#3C3837]">Total</span>
                    <span className="font-bold text-lg text-[#26649A]">
                      Rs. {grandTotal.toLocaleString()}
                    </span>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  className="mt-6 w-full flex items-center justify-center gap-2 bg-[#00C2D1] hover:bg-[#00AAB8] text-[#3C3837] text-sm font-semibold py-3 rounded-xl transition-colors active:scale-[0.97]"
                >
                  <ShoppingCart size={15} />
                  Proceed to Checkout
                </Link>

                <Link
                  href="/shop"
                  className="mt-3 w-full flex items-center justify-center text-sm font-medium text-[#26649A] hover:text-[#00C2D1] transition-colors py-2"
                >
                  Continue Shopping
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </main>
  );
}
