"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Lock, Mail, User as UserIcon, ArrowRight, ShieldCheck, AlertCircle, Loader2 } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();

  // Mode: null while checking, false for setup (no admin exists), true for standard login
  const [hasAdmin, setHasAdmin] = useState<boolean | null>(null);
  const [checkingStatus, setCheckingStatus] = useState(true);

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function checkAdminStatus() {
      try {
        const res = await fetch("/api/auth/status", { cache: "no-store" });
        const data = await res.json();
        setHasAdmin(Boolean(data?.hasAdmin));
      } catch {
        // Fallback to regular login
        setHasAdmin(true);
      } finally {
        setCheckingStatus(false);
      }
    }
    checkAdminStatus();
  }, []);

  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.error || "Invalid email or password");
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("Unable to connect to the authentication server.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSetup(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (!name.trim() || !email.trim() || !password) {
      setError("Please fill out all fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/auth/setup-admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          password,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.error || "Failed to create administrator account");
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("Failed to create admin account. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#F8FAFC] text-[#3C3837] p-4 relative overflow-hidden">
      {/* Decorative background glow matching Mehria Mobiles branding */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#00C2D1]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#26649A]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <div className="bg-white rounded-3xl border border-[#3C3837]/10 shadow-[0_12px_40px_rgba(28,75,117,0.08)] p-8 sm:p-10">
          {/* Logo & Brand Heading */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-3 group">
              <Image
                src="/logo-mark.png"
                alt="Mehria Mobiles"
                width={42}
                height={38}
                className="object-contain"
                priority
              />
              <div className="text-left">
                <div
                  className="font-bold text-xl leading-none text-[#3C3837] tracking-tight"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  Mehria Mobiles
                </div>
                <div className="text-[11px] font-semibold tracking-wider text-[#26649A] uppercase mt-0.5">
                  Store Management CMS
                </div>
              </div>
            </Link>

            <h1 className="text-2xl font-black text-[#3C3837] mt-3">
              {checkingStatus ? (
                "Connecting..."
              ) : hasAdmin === false ? (
                "Initial Admin Setup"
              ) : (
                "Admin Sign In"
              )}
            </h1>
            <p className="text-sm text-[#64748B] mt-1">
              {checkingStatus ? (
                "Checking system configuration..."
              ) : hasAdmin === false ? (
                "No administrator account found. Create your master admin account to begin."
              ) : (
                "Enter your credentials to access the management dashboard."
              )}
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50/80 p-3.5 text-sm text-red-700">
              <AlertCircle size={18} className="shrink-0 mt-0.5 text-red-500" />
              <span>{error}</span>
            </div>
          )}

          {checkingStatus ? (
            <div className="py-12 flex flex-col items-center justify-center text-[#26649A]">
              <Loader2 className="animate-spin mb-3" size={32} />
              <span className="text-sm font-medium">Verifying store setup...</span>
            </div>
          ) : hasAdmin === false ? (
            /* Setup Form (When no admin exists yet) */
            <form className="space-y-4" onSubmit={handleSetup}>
              <div className="rounded-xl bg-[#00C2D1]/10 border border-[#00C2D1]/30 p-3 text-xs text-[#1C4B75] flex items-center gap-2">
                <ShieldCheck size={16} className="text-[#00AAB8] shrink-0" />
                <span>This will create the single master administrator for this store.</span>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#3C3837] mb-1.5">
                  Admin Full Name
                </label>
                <div className="relative">
                  <UserIcon
                    size={18}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748B]"
                  />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Master Admin"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-[#F8FAFC] py-3 pl-10 pr-4 text-sm text-[#3C3837] outline-none transition-all focus:border-[#00C2D1] focus:bg-white focus:ring-2 focus:ring-[#00C2D1]/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#3C3837] mb-1.5">
                  Admin Email Address
                </label>
                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748B]"
                  />
                  <input
                    type="email"
                    required
                    placeholder="admin@mehriamobiles.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-[#F8FAFC] py-3 pl-10 pr-4 text-sm text-[#3C3837] outline-none transition-all focus:border-[#00C2D1] focus:bg-white focus:ring-2 focus:ring-[#00C2D1]/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#3C3837] mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock
                    size={18}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748B]"
                  />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-[#F8FAFC] py-3 pl-10 pr-4 text-sm text-[#3C3837] outline-none transition-all focus:border-[#00C2D1] focus:bg-white focus:ring-2 focus:ring-[#00C2D1]/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#3C3837] mb-1.5">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock
                    size={18}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748B]"
                  />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-[#F8FAFC] py-3 pl-10 pr-4 text-sm text-[#3C3837] outline-none transition-all focus:border-[#00C2D1] focus:bg-white focus:ring-2 focus:ring-[#00C2D1]/20"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 rounded-xl bg-[#00C2D1] hover:bg-[#00AAB8] text-[#3C3837] py-3.5 px-4 font-bold text-sm shadow-[0_4px_14px_rgba(0,194,209,0.35)] transition-all flex items-center justify-center gap-2 disabled:opacity-60 active:scale-[0.98] cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>Creating Admin Account...</span>
                  </>
                ) : (
                  <>
                    <span>Create Master Admin & Continue</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>
          ) : (
            /* Regular Login Form */
            <form className="space-y-4" onSubmit={handleLogin}>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#3C3837] mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748B]"
                  />
                  <input
                    type="email"
                    required
                    placeholder="admin@mehriamobiles.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-[#F8FAFC] py-3 pl-10 pr-4 text-sm text-[#3C3837] outline-none transition-all focus:border-[#00C2D1] focus:bg-white focus:ring-2 focus:ring-[#00C2D1]/20"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#3C3837]">
                    Password
                  </label>
                </div>
                <div className="relative">
                  <Lock
                    size={18}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748B]"
                  />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-[#F8FAFC] py-3 pl-10 pr-4 text-sm text-[#3C3837] outline-none transition-all focus:border-[#00C2D1] focus:bg-white focus:ring-2 focus:ring-[#00C2D1]/20"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 rounded-xl bg-[#00C2D1] hover:bg-[#00AAB8] text-[#3C3837] py-3.5 px-4 font-bold text-sm shadow-[0_4px_14px_rgba(0,194,209,0.35)] transition-all flex items-center justify-center gap-2 disabled:opacity-60 active:scale-[0.98] cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>Signing In...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In to Dashboard</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>
          )}

          {/* Footer link to public website */}
          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <Link
              href="/"
              className="text-xs font-medium text-[#26649A] hover:text-[#00AAB8] transition-colors inline-flex items-center gap-1.5"
            >
              <span>&larr; Return to Mehria Mobiles Store</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
