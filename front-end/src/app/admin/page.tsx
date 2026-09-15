"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  TrendingUp,
  ShoppingBag,
  AlertTriangle,
  MessageSquare,
  Package,
  ArrowUpRight,
  Plus,
  RefreshCw,
  Eye,
  CheckCircle2,
  Clock,
  ExternalLink,
  ChevronRight,
  Sparkles,
} from "lucide-react";

interface DashboardData {
  metrics: {
    revenue: number;
    orders: number;
    lowStock: number;
    unreadInquiries: number;
  };
  orders: Array<{
    _id: string;
    orderNumber?: string;
    customerName: string;
    customerPhone: string;
    total: number;
    status: string;
    createdAt: string;
    items?: Array<{ name: string; quantity: number; price: number }>;
  }>;
  inquiries: Array<{
    _id: string;
    name: string;
    email: string;
    subject?: string;
    message: string;
    status: string;
    createdAt: string;
  }>;
  productCount: number;
}

export default function AdminDashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  async function loadDashboard(isManual = false) {
    if (isManual) setRefreshing(true);
    try {
      const res = await fetch("/api/admin/dashboard", { cache: "no-store" });
      if (!res.ok) {
        throw new Error("Failed to load dashboard statistics");
      }
      const json = await res.json();
      if (json.dashboard) {
        setData(json.dashboard);
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error fetching dashboard data");
    } finally {
      setLoading(false);
      if (isManual) setRefreshing(false);
    }
  }

  useEffect(() => {
    loadDashboard();
  }, []);

  const formatPKR = (amount: number) => {
    return `Rs. ${Number(amount || 0).toLocaleString("en-PK")}`;
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "Just now";
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status: string) => {
    const s = (status || "").toLowerCase();
    if (s === "completed" || s === "delivered") {
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    }
    if (s === "processing" || s === "confirmed") {
      return "bg-[#00C2D1]/10 text-[#1C4B75] border-[#00C2D1]/30";
    }
    if (s === "cancelled") {
      return "bg-rose-50 text-rose-700 border-rose-200";
    }
    return "bg-amber-50 text-amber-700 border-amber-200";
  };

  return (
    <div className="space-y-8">
      {/* Header & Quick Action Row */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#26649A] uppercase tracking-wider">
            <Sparkles size={14} className="text-[#00C2D1]" />
            <span>Store Operations Overview</span>
          </div>
          <h1
            className="text-2xl sm:text-3xl font-black text-[#3C3837] tracking-tight mt-1"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Admin Dashboard
          </h1>
          <p className="text-sm text-[#64748B] mt-0.5">
            Monitor real-time store performance, incoming orders, and customer messages.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => loadDashboard(true)}
            disabled={refreshing}
            className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white text-[#3C3837] hover:bg-gray-50 text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            <RefreshCw
              size={14}
              className={refreshing ? "animate-spin text-[#00C2D1]" : "text-[#64748B]"}
            />
            <span>{refreshing ? "Refreshing..." : "Refresh"}</span>
          </button>

          <Link
            href="/admin/products"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#00C2D1] hover:bg-[#00AAB8] text-[#3C3837] text-xs font-bold shadow-[0_4px_12px_rgba(0,194,209,0.3)] transition-all active:scale-[0.98]"
          >
            <Plus size={15} />
            <span>Add New Product</span>
          </Link>
        </div>
      </div>

      {/* Error state */}
      {error && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center justify-between">
          <span>{error}</span>
          <button
            onClick={() => {
              setError(null);
              loadDashboard();
            }}
            className="text-xs underline font-bold"
          >
            Retry
          </button>
        </div>
      )}

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Revenue Card */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#3C3837]/[0.08] shadow-[0_4px_20px_rgba(28,75,117,0.04)] relative overflow-hidden group hover:border-[#00C2D1]/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
              Total Revenue
            </span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <TrendingUp size={20} />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl sm:text-3xl font-black text-[#3C3837]">
              {loading ? (
                <div className="h-8 w-32 bg-gray-100 animate-pulse rounded-lg" />
              ) : (
                formatPKR(data?.metrics?.revenue || 0)
              )}
            </div>
            <div className="mt-1 text-xs text-[#64748B] flex items-center gap-1">
              <span className="font-semibold text-emerald-600">Live</span>
              <span>from confirmed orders</span>
            </div>
          </div>
        </div>

        {/* Total Orders Card */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#3C3837]/[0.08] shadow-[0_4px_20px_rgba(28,75,117,0.04)] relative overflow-hidden group hover:border-[#00C2D1]/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
              Total Orders
            </span>
            <div className="w-10 h-10 rounded-xl bg-[#26649A]/10 text-[#26649A] flex items-center justify-center">
              <ShoppingBag size={20} />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl sm:text-3xl font-black text-[#3C3837]">
              {loading ? (
                <div className="h-8 w-20 bg-gray-100 animate-pulse rounded-lg" />
              ) : (
                data?.metrics?.orders || 0
              )}
            </div>
            <div className="mt-1 text-xs text-[#64748B]">
              <Link
                href="/admin/orders"
                className="text-[#26649A] hover:text-[#00C2D1] font-semibold flex items-center gap-1"
              >
                <span>View all orders</span>
                <ChevronRight size={12} />
              </Link>
            </div>
          </div>
        </div>

        {/* Low Stock / Stock Alert Card */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#3C3837]/[0.08] shadow-[0_4px_20px_rgba(28,75,117,0.04)] relative overflow-hidden group hover:border-[#00C2D1]/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
              Out of Stock
            </span>
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                (data?.metrics?.lowStock || 0) > 0
                  ? "bg-amber-50 text-amber-600"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              <AlertTriangle size={20} />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl sm:text-3xl font-black text-[#3C3837]">
              {loading ? (
                <div className="h-8 w-16 bg-gray-100 animate-pulse rounded-lg" />
              ) : (
                data?.metrics?.lowStock || 0
              )}
            </div>
            <div className="mt-1 text-xs text-[#64748B]">
              <span>Out of {data?.productCount || 0} catalog items</span>
            </div>
          </div>
        </div>

        {/* Unread Inquiries Card */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#3C3837]/[0.08] shadow-[0_4px_20px_rgba(28,75,117,0.04)] relative overflow-hidden group hover:border-[#00C2D1]/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
              Customer Inquiries
            </span>
            <div className="w-10 h-10 rounded-xl bg-[#00C2D1]/15 text-[#00AAB8] flex items-center justify-center">
              <MessageSquare size={20} />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl sm:text-3xl font-black text-[#3C3837]">
              {loading ? (
                <div className="h-8 w-16 bg-gray-100 animate-pulse rounded-lg" />
              ) : (
                data?.metrics?.unreadInquiries || 0
              )}
            </div>
            <div className="mt-1 text-xs text-[#64748B]">
              <Link
                href="/admin/inquiries"
                className="text-[#26649A] hover:text-[#00C2D1] font-semibold flex items-center gap-1"
              >
                <span>Unread customer queries</span>
                <ChevronRight size={12} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Recent Orders & Recent Inquiries */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders (2 Columns) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-[#3C3837]/[0.08] shadow-[0_4px_20px_rgba(28,75,117,0.04)] overflow-hidden">
          <div className="p-5 sm:p-6 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-[#3C3837]">Recent Customer Orders</h2>
              <p className="text-xs text-[#64748B] mt-0.5">
                Latest customer purchases and checkout transactions
              </p>
            </div>
            <Link
              href="/admin/orders"
              className="text-xs font-bold text-[#26649A] hover:text-[#00AAB8] transition-colors inline-flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>

          <div className="overflow-x-auto">
            {loading ? (
              <div className="p-8 space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-12 bg-gray-50 rounded-xl animate-pulse" />
                ))}
              </div>
            ) : !data?.orders || data.orders.length === 0 ? (
              <div className="py-16 text-center text-[#64748B]">
                <ShoppingBag size={36} className="mx-auto text-gray-300 mb-2" />
                <p className="text-sm font-semibold">No orders recorded yet.</p>
                <p className="text-xs text-gray-400 mt-1">
                  Orders placed by customers on your website will appear here in real-time.
                </p>
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-100 bg-[#F8FAFC] text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
                    <th className="py-3 px-5">Customer</th>
                    <th className="py-3 px-4">Phone</th>
                    <th className="py-3 px-4">Amount</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-5 text-right">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                  {data.orders.map((order) => (
                    <tr
                      key={order._id}
                      className="hover:bg-[#F8FAFC] transition-colors"
                    >
                      <td className="py-3.5 px-5">
                        <div className="font-semibold text-[#3C3837]">
                          {order.customerName || "Customer"}
                        </div>
                        <div className="text-[11px] text-[#64748B]">
                          {order.items?.length || 1} item(s)
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-xs font-mono text-[#64748B]">
                        {order.customerPhone || "—"}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-[#3C3837]">
                        {formatPKR(order.total)}
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold border capitalize ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {order.status || "Pending"}
                        </span>
                      </td>
                      <td className="py-3.5 px-5 text-right text-xs text-[#64748B]">
                        {formatDate(order.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Recent Inquiries & Quick Links (1 Column) */}
        <div className="space-y-6">
          {/* Inquiries Box */}
          <div className="bg-white rounded-2xl border border-[#3C3837]/[0.08] shadow-[0_4px_20px_rgba(28,75,117,0.04)] p-5 sm:p-6">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
              <div>
                <h2 className="text-base font-bold text-[#3C3837]">Customer Inquiries</h2>
                <p className="text-[11px] text-[#64748B]">Latest contact inquiries</p>
              </div>
              <Link
                href="/admin/inquiries"
                className="text-xs font-bold text-[#26649A] hover:text-[#00AAB8]"
              >
                Inbox
              </Link>
            </div>

            {loading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-14 bg-gray-50 rounded-xl animate-pulse" />
                ))}
              </div>
            ) : !data?.inquiries || data.inquiries.length === 0 ? (
              <div className="py-8 text-center text-[#64748B]">
                <MessageSquare size={28} className="mx-auto text-gray-300 mb-2" />
                <p className="text-xs">No customer inquiries yet.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {data.inquiries.map((inq) => (
                  <Link
                    key={inq._id}
                    href="/admin/inquiries"
                    className="block p-3 rounded-xl border border-gray-100 hover:border-[#00C2D1]/40 hover:bg-[#F8FAFC] transition-all group"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-[#3C3837] group-hover:text-[#26649A]">
                        {inq.name}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          inq.status === "unread"
                            ? "bg-[#00C2D1]/20 text-[#1C4B75]"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {inq.status || "new"}
                      </span>
                    </div>
                    <p className="text-xs text-[#64748B] line-clamp-1">
                      {inq.subject || inq.message}
                    </p>
                    <div className="mt-1 text-[10px] text-gray-400">
                      {formatDate(inq.createdAt)}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Quick Shortcuts */}
          <div className="bg-gradient-to-br from-[#26649A] to-[#1C4B75] text-white rounded-2xl p-5 sm:p-6 shadow-[0_8px_24px_rgba(28,75,117,0.18)]">
            <h3 className="font-bold text-base mb-1">Quick CMS Management</h3>
            <p className="text-xs text-blue-100 mb-4">
              Direct access to vital configuration and catalog modules.
            </p>

            <div className="grid grid-cols-2 gap-2">
              <Link
                href="/admin/products"
                className="flex items-center gap-2 p-2.5 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-xs font-semibold"
              >
                <Package size={16} className="text-[#00C2D1]" />
                <span>Products</span>
              </Link>
              <Link
                href="/admin/categories"
                className="flex items-center gap-2 p-2.5 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-xs font-semibold"
              >
                <Package size={16} className="text-[#00C2D1]" />
                <span>Categories</span>
              </Link>
              <Link
                href="/admin/users"
                className="flex items-center gap-2 p-2.5 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-xs font-semibold"
              >
                <Clock size={16} className="text-[#00C2D1]" />
                <span>Users & Admin</span>
              </Link>
              <Link
                href="/admin/settings"
                className="flex items-center gap-2 p-2.5 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-xs font-semibold"
              >
                <CheckCircle2 size={16} className="text-[#00C2D1]" />
                <span>Settings</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
