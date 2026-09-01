"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  CheckCircle,
  MapPin,
  Phone,
  User,
  FileText,
  CreditCard,
  Truck,
} from "lucide-react";
import { useCart } from "@/app/context/CartContext";

interface FormData {
  name: string;
  phone: string;
  address: string;
  city: string;
  notes: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  address?: string;
  city?: string;
}

export default function CheckoutPage() {
  const { items, cartCount, cartTotal, clearCart } = useCart();
  const [form, setForm] = useState<FormData>({
    name: "",
    phone: "",
    address: "",
    city: "Lodhran",
    notes: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  const deliveryFee = 0;
  const grandTotal = cartTotal + deliveryFee;

  const update = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.phone.trim()) e.phone = "Phone number is required";
    else if (!/^[\d\s\-+()]{10,15}$/.test(form.phone.trim()))
      e.phone = "Enter a valid phone number";
    if (!form.address.trim()) e.address = "Delivery address is required";
    if (!form.city.trim()) e.city = "City is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const placeOrder = () => {
    if (!validate()) return;
    const num = "MM-" + Date.now().toString(36).toUpperCase().slice(-6);
    setOrderNumber(num);
    setOrderPlaced(true);
    clearCart();
  };

  // ── Order Confirmation ──────────────────────────────
  if (orderPlaced) {
    return (
      <main className="min-h-screen bg-[#F7F8FA] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white rounded-2xl border border-[#3C3837]/[0.05] shadow-[0_16px_48px_-12px_rgba(28,75,117,0.12)] p-8 sm:p-12 max-w-md w-full text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 20 }}
          >
            <CheckCircle
              size={64}
              className="mx-auto mb-5 text-[#00C2D1]"
              strokeWidth={1.5}
            />
          </motion.div>
          <h2
            className="text-2xl sm:text-3xl font-semibold text-[#3C3837] mb-2"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Order Placed!
          </h2>
          <p className="text-sm text-[#3C3837]/55 mb-4">
            Thank you for your order. We&apos;ll contact you shortly to confirm delivery.
          </p>
          <div className="bg-[#F7F8FA] rounded-xl px-4 py-3 mb-6">
            <p className="text-xs text-[#3C3837]/40 mb-1">Order Number</p>
            <p className="text-lg font-bold text-[#26649A] tracking-wider">
              {orderNumber}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Link
              href="/shop"
              className="flex-1 bg-[#00C2D1] hover:bg-[#00AAB8] text-[#3C3837] text-sm font-semibold py-3 rounded-xl transition-colors text-center"
            >
              Continue Shopping
            </Link>
            <Link
              href="/"
              className="flex-1 border border-[#3C3837]/15 hover:border-[#26649A]/40 text-[#3C3837] text-sm font-semibold py-3 rounded-xl transition-colors text-center"
            >
              Go Home
            </Link>
          </div>
        </motion.div>
      </main>
    );
  }

  // ── Empty Cart Redirect ─────────────────────────────
  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-[#F7F8FA] flex items-center justify-center px-4">
        <div className="text-center">
          <CreditCard size={48} className="mx-auto mb-4 text-[#3C3837]/20" />
          <h2
            className="text-xl font-semibold text-[#3C3837] mb-2"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Nothing to checkout
          </h2>
          <p className="text-sm text-[#3C3837]/50 mb-6">
            Add some products to your cart first.
          </p>
          <Link
            href="/shop"
            className="inline-flex bg-[#00C2D1] hover:bg-[#00AAB8] text-[#3C3837] text-sm font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            Browse Shop
          </Link>
        </div>
      </main>
    );
  }

  // ── Input helper ────────────────────────────────────
  const inputClass = (field: keyof FormErrors) =>
    `w-full pl-10 pr-4 py-2.5 bg-white border ${
      errors[field]
        ? "border-[#ef4444]/60 focus:border-[#ef4444]"
        : "border-[#3C3837]/[0.08] focus:border-[#26649A]/40"
    } rounded-xl text-sm text-[#3C3837] placeholder:text-[#3C3837]/35 outline-none transition-colors shadow-sm`;

  return (
    <main className="min-h-screen bg-[#F7F8FA]">
      {/* Hero */}
      <section className="bg-[#3C3837] text-white">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-8 py-10 sm:py-14">
          <Link
            href="/cart"
            className="inline-flex items-center gap-1.5 text-xs text-white/50 hover:text-[#00C2D1] transition-colors mb-5"
          >
            <ArrowLeft size={13} /> Back to Cart
          </Link>
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="text-[28px] sm:text-4xl lg:text-5xl font-semibold tracking-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Checkout
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="text-sm sm:text-base text-white/55 mt-3"
          >
            Complete your order — {cartCount} item
            {cartCount !== 1 ? "s" : ""}, Rs. {cartTotal.toLocaleString()}
          </motion.p>
        </div>
      </section>

      <div className="max-w-[1240px] mx-auto px-4 sm:px-8 py-8 lg:py-10">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* ── Form ────────────────────────────────────── */}
          <div className="flex-1 min-w-0">
            {/* Contact & Delivery */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="bg-white rounded-2xl border border-[#3C3837]/[0.05] p-5 sm:p-6 mb-4"
            >
              <h3
                className="text-lg font-semibold text-[#3C3837] mb-5"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Contact & Delivery Info
              </h3>

              <div className="flex flex-col gap-4">
                {/* Name */}
                <div>
                  <div className="relative">
                    <User
                      size={15}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#3C3837]/40"
                    />
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={form.name}
                      onChange={(e) => update("name", e.target.value)}
                      className={inputClass("name")}
                    />
                  </div>
                  {errors.name && (
                    <p className="text-[11px] text-[#ef4444] mt-1 ml-1">
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <div className="relative">
                    <Phone
                      size={15}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#3C3837]/40"
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number (e.g. 0300 1234567)"
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      className={inputClass("phone")}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-[11px] text-[#ef4444] mt-1 ml-1">
                      {errors.phone}
                    </p>
                  )}
                </div>

                {/* Address */}
                <div>
                  <div className="relative">
                    <MapPin
                      size={15}
                      className="absolute left-3.5 top-3 text-[#3C3837]/40"
                    />
                    <textarea
                      placeholder="Delivery Address"
                      value={form.address}
                      onChange={(e) => update("address", e.target.value)}
                      rows={2}
                      className={`w-full pl-10 pr-4 py-2.5 bg-white border ${
                        errors.address
                          ? "border-[#ef4444]/60 focus:border-[#ef4444]"
                          : "border-[#3C3837]/[0.08] focus:border-[#26649A]/40"
                      } rounded-xl text-sm text-[#3C3837] placeholder:text-[#3C3837]/35 outline-none transition-colors shadow-sm resize-none`}
                    />
                  </div>
                  {errors.address && (
                    <p className="text-[11px] text-[#ef4444] mt-1 ml-1">
                      {errors.address}
                    </p>
                  )}
                </div>

                {/* City */}
                <div>
                  <div className="relative">
                    <MapPin
                      size={15}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#3C3837]/40"
                    />
                    <input
                      type="text"
                      placeholder="City"
                      value={form.city}
                      onChange={(e) => update("city", e.target.value)}
                      className={inputClass("city")}
                    />
                  </div>
                  {errors.city && (
                    <p className="text-[11px] text-[#ef4444] mt-1 ml-1">
                      {errors.city}
                    </p>
                  )}
                </div>

                {/* Notes */}
                <div className="relative">
                  <FileText
                    size={15}
                    className="absolute left-3.5 top-3 text-[#3C3837]/40"
                  />
                  <textarea
                    placeholder="Order notes (optional)"
                    value={form.notes}
                    onChange={(e) => update("notes", e.target.value)}
                    rows={2}
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#3C3837]/[0.08] rounded-xl text-sm text-[#3C3837] placeholder:text-[#3C3837]/35 outline-none focus:border-[#26649A]/40 transition-colors shadow-sm resize-none"
                  />
                </div>
              </div>
            </motion.div>

            {/* Payment Method */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12 }}
              className="bg-white rounded-2xl border border-[#3C3837]/[0.05] p-5 sm:p-6"
            >
              <h3
                className="text-lg font-semibold text-[#3C3837] mb-4"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Payment Method
              </h3>
              <div className="flex items-center gap-3 bg-[#F7F8FA] border border-[#26649A]/20 rounded-xl px-4 py-3">
                <div className="w-8 h-8 rounded-lg bg-[#26649A]/10 flex items-center justify-center">
                  <Truck size={16} className="text-[#26649A]" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-[#3C3837]">
                    Cash on Delivery (COD)
                  </p>
                  <p className="text-[11px] text-[#3C3837]/50">
                    Pay when you receive your order
                  </p>
                </div>
                <div className="w-5 h-5 rounded-full border-2 border-[#26649A] flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#26649A]" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* ── Order Summary ───────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18 }}
            className="lg:w-[380px] shrink-0"
          >
            <div className="bg-white rounded-2xl border border-[#3C3837]/[0.05] p-5 sm:p-6 sticky top-28">
              <h3
                className="text-lg font-semibold text-[#3C3837] mb-5"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Order Summary
              </h3>

              {/* Items */}
              <div className="flex flex-col gap-3 mb-5 max-h-[280px] overflow-y-auto pr-1">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-3 items-center">
                    <div className="relative w-12 h-12 rounded-lg bg-[#F7F8FA] overflow-hidden shrink-0">
                      <Image
                        src={item.product.img}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[12px] font-medium text-[#3C3837] line-clamp-1">
                        {item.product.name}
                      </p>
                      <p className="text-[11px] text-[#3C3837]/50">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="text-[13px] font-semibold text-[#3C3837] shrink-0">
                      Rs.{" "}
                      {(item.product.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#3C3837]/[0.06] pt-4 flex flex-col gap-2.5 text-sm">
                <div className="flex justify-between text-[#3C3837]/60">
                  <span>Subtotal</span>
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

              <button
                onClick={placeOrder}
                className="mt-6 w-full flex items-center justify-center gap-2 bg-[#00C2D1] hover:bg-[#00AAB8] text-[#3C3837] text-sm font-semibold py-3.5 rounded-xl transition-colors active:scale-[0.97] cursor-pointer"
              >
                Place Order — Rs. {grandTotal.toLocaleString()}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
