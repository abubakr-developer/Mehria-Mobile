"use client";

import { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  FolderTree,
  ShoppingBag,
  MessageSquare,
  Users,
  Settings,
  ExternalLink,
  LogOut,
  Menu,
  X,
  Shield,
  Store,
  ChevronRight,
} from "lucide-react";

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Products", href: "/admin/products", icon: Package },
  { label: "Categories", href: "/admin/categories", icon: FolderTree },
  { label: "Orders", href: "/admin/orders", icon: ShoppingBag },
  { label: "Inquiries", href: "/admin/inquiries", icon: MessageSquare },
  { label: "Users & Staff", href: "/admin/users", icon: Users },
  { label: "Store Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Fetch logged-in user profile
  useEffect(() => {
    if (pathname === "/admin/login") return;

    async function fetchUser() {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          const data = await res.json();
          if (data.user) {
            setCurrentUser(data.user);
          }
        }
      } catch (err) {
        console.error("Failed to load user info:", err);
      }
    }

    fetchUser();
  }, [pathname]);

  async function handleLogout() {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch {
      // Proceed to login even if network fails
    } finally {
      router.push("/admin/login");
      router.refresh();
    }
  }

  // If on login page, don't wrap with dashboard sidebar/topbar
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#3C3837] flex flex-col antialiased">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-[#3C3837]/[0.08] shadow-[0_2px_12px_rgba(28,75,117,0.04)]">
        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
          {/* Left: Mobile menu button & Brand */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-[#3C3837] hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            <Link href="/admin" className="flex items-center gap-2.5">
              <Image
                src="/logo-mark.png"
                alt="Mehria Mobiles"
                width={34}
                height={31}
                className="object-contain"
                priority
              />
              <div>
                <div
                  className="font-bold text-base sm:text-lg leading-none text-[#3C3837]"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  Mehria Mobiles
                </div>
                <div className="text-[10px] font-semibold tracking-wider text-[#26649A] uppercase mt-0.5">
                  Management CMS
                </div>
              </div>
            </Link>
          </div>

          {/* Right: Store Link & User Profile & Logout */}
          <div className="flex items-center gap-2 sm:gap-4">
            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#26649A] bg-[#26649A]/[0.07] hover:bg-[#26649A]/[0.12] rounded-lg transition-colors"
            >
              <Store size={14} />
              <span>Live Store</span>
              <ExternalLink size={12} className="opacity-70" />
            </Link>

            {/* Current user badge */}
            <div className="flex items-center gap-2.5 pl-2 border-l border-gray-200">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#26649A] to-[#00C2D1] flex items-center justify-center text-white font-bold text-xs shadow-sm">
                {currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : "A"}
              </div>
              <div className="hidden md:block text-left">
                <div className="text-xs font-bold text-[#3C3837] leading-tight">
                  {currentUser?.name || "Administrator"}
                </div>
                <div className="text-[10px] text-[#64748B] flex items-center gap-1 mt-0.5">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#00C2D1]" />
                  <span className="capitalize">{currentUser?.role || "Admin"}</span>
                </div>
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="p-2 text-[#64748B] hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
              title="Log out"
              aria-label="Logout"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* Main App Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-[#3C3837]/[0.08] shrink-0 min-h-[calc(100vh-4rem)] p-4 justify-between">
          <div className="space-y-6">
            {/* Quick Status Box */}
            <div className="p-3.5 rounded-2xl bg-gradient-to-br from-[#26649A]/[0.06] to-[#00C2D1]/[0.08] border border-[#00C2D1]/20">
              <div className="flex items-center gap-2 text-xs font-bold text-[#26649A]">
                <Shield size={14} className="text-[#00C2D1]" />
                <span>Store Control Center</span>
              </div>
              <p className="text-[11px] text-[#64748B] mt-1">
                Manage inventory, incoming orders, categories & client inquiries.
              </p>
            </div>

            {/* Navigation */}
            <nav className="space-y-1">
              <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-[#94A3B8]">
                Menu Navigation
              </div>
              {navItems.map((item) => {
                const isActive =
                  item.href === "/admin"
                    ? pathname === "/admin" || pathname === "/admin/dashboard"
                    : pathname.startsWith(item.href);
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all group ${
                      isActive
                        ? "bg-[#26649A] text-white shadow-[0_4px_12px_rgba(38,100,154,0.25)]"
                        : "text-[#3C3837] hover:bg-[#26649A]/[0.06] hover:text-[#26649A]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon
                        size={18}
                        className={`transition-colors ${
                          isActive
                            ? "text-[#00C2D1]"
                            : "text-[#64748B] group-hover:text-[#26649A]"
                        }`}
                      />
                      <span>{item.label}</span>
                    </div>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00C2D1]" />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Sidebar Footer */}
          <div className="pt-4 border-t border-gray-100">
            <Link
              href="/"
              target="_blank"
              className="flex items-center justify-between p-2.5 rounded-xl text-xs font-medium text-[#64748B] hover:text-[#26649A] hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Store size={15} />
                <span>Visit Storefront</span>
              </div>
              <ChevronRight size={14} className="opacity-50" />
            </Link>
          </div>
        </aside>

        {/* Mobile Sidebar Overlay / Drawer */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Drawer Content */}
            <div className="relative w-4/5 max-w-xs bg-white h-full shadow-2xl z-10 flex flex-col justify-between p-5">
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <Image
                      src="/logo-mark.png"
                      alt="Mehria Mobiles"
                      width={30}
                      height={27}
                      className="object-contain"
                    />
                    <span className="font-bold text-sm text-[#3C3837]">
                      Mehria CMS
                    </span>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1 rounded-lg text-gray-500 hover:bg-gray-100"
                  >
                    <X size={20} />
                  </button>
                </div>

                <nav className="space-y-1">
                  {navItems.map((item) => {
                    const isActive =
                      item.href === "/admin"
                        ? pathname === "/admin" || pathname === "/admin/dashboard"
                        : pathname.startsWith(item.href);
                    const Icon = item.icon;

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-semibold transition-all ${
                          isActive
                            ? "bg-[#26649A] text-white"
                            : "text-[#3C3837] hover:bg-gray-100"
                        }`}
                      >
                        <Icon
                          size={18}
                          className={isActive ? "text-[#00C2D1]" : "text-[#64748B]"}
                        />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </nav>
              </div>

              <div className="pt-4 border-t border-gray-100 space-y-2">
                <Link
                  href="/"
                  target="_blank"
                  className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold text-[#26649A] bg-[#26649A]/[0.06]"
                >
                  <Store size={16} />
                  <span>Open Public Website</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut size={16} />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
