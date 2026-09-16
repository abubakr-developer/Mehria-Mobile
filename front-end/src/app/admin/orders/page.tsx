"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  ShoppingBag,
  Search,
  RefreshCw,
  Loader2,
  X,
  Eye,
  CheckCircle2,
  Clock,
  Truck,
  PackageCheck,
  Ban,
  MapPin,
  Phone,
  User as UserIcon,
} from "lucide-react";

interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  img: string;
}

interface Customer {
  name: string;
  phone: string;
  address: string;
  city: string;
  notes?: string;
}

interface Order {
  _id: string;
  orderNumber: string;
  customer: Customer;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled";
  paymentMethod: string;
  paymentStatus: string;
  createdAt: string;
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  async function loadOrders() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/orders");
      if (res.ok) {
        const data = await res.json();
        setOrders(data.orders || []);
      }
    } catch {
      console.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadOrders();
  }, []);

  async function handleUpdateStatus(orderId: string, newStatus: string) {
    setUpdatingStatus(true);
    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        const updated = await res.json();
        setOrders((prev) =>
          prev.map((o) => (o._id === orderId ? { ...o, status: newStatus as Order["status"] } : o))
        );
        if (selectedOrder && selectedOrder._id === orderId) {
          setSelectedOrder({ ...selectedOrder, status: newStatus as Order["status"] });
        }
      } else {
        alert("Failed to update status");
      }
    } catch {
      alert("Error updating order status");
    } finally {
      setUpdatingStatus(false);
    }
  }

  const formatPKR = (amount: number) => {
    return `Rs. ${Number(amount || 0).toLocaleString("en-PK")}`;
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "N/A";
    return new Date(dateStr).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "delivered":
        return {
          bg: "bg-emerald-50 text-emerald-700 border-emerald-200",
          icon: PackageCheck,
        };
      case "shipped":
        return {
          bg: "bg-blue-50 text-blue-700 border-blue-200",
          icon: Truck,
        };
      case "confirmed":
      case "processing":
        return {
          bg: "bg-[#00C2D1]/15 text-[#1C4B75] border-[#00C2D1]/30",
          icon: CheckCircle2,
        };
      case "cancelled":
        return {
          bg: "bg-rose-50 text-rose-700 border-rose-200",
          icon: Ban,
        };
      default:
        return {
          bg: "bg-amber-50 text-amber-700 border-amber-200",
          icon: Clock,
        };
    }
  };

  const filteredOrders = orders.filter((o) => {
    const matchesStatus = statusFilter === "all" || o.status === statusFilter;
    const matchesSearch =
      (o.orderNumber && o.orderNumber.toLowerCase().includes(search.toLowerCase())) ||
      (o.customer?.name && o.customer.name.toLowerCase().includes(search.toLowerCase())) ||
      (o.customer?.phone && o.customer.phone.includes(search)) ||
      (o.customer?.city && o.customer.city.toLowerCase().includes(search.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#26649A] uppercase tracking-wider">
            <ShoppingBag size={14} className="text-[#00C2D1]" />
            <span>Order Fulfillment</span>
          </div>
          <h1
            className="text-2xl sm:text-3xl font-black text-[#3C3837] tracking-tight mt-1"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Customer Orders
          </h1>
          <p className="text-sm text-[#64748B]">
            Process shipments, review customer delivery addresses, and track order progress.
          </p>
        </div>

        <button
          onClick={loadOrders}
          className="self-start sm:self-auto inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-[#3C3837] text-xs font-semibold shadow-xs transition-colors"
        >
          <RefreshCw size={15} className={loading ? "animate-spin text-[#00C2D1]" : ""} />
          <span>Refresh Orders</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-2xl border border-[#3C3837]/[0.08] shadow-[0_2px_12px_rgba(28,75,117,0.03)] flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748B]" />
          <input
            type="text"
            placeholder="Search by order #, name, or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-[#F8FAFC] py-2 pl-9 pr-3 text-xs text-[#3C3837] outline-none focus:border-[#00C2D1] focus:bg-white"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          {[
            { id: "all", label: "All" },
            { id: "pending", label: "Pending" },
            { id: "confirmed", label: "Confirmed" },
            { id: "shipped", label: "Shipped" },
            { id: "delivered", label: "Delivered" },
            { id: "cancelled", label: "Cancelled" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setStatusFilter(item.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                statusFilter === item.id
                  ? "bg-[#26649A] text-white shadow-xs"
                  : "bg-gray-100 text-[#64748B] hover:bg-gray-200"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl border border-[#3C3837]/[0.08] shadow-[0_4px_20px_rgba(28,75,117,0.04)] overflow-hidden">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-10 text-center">
              <Loader2 className="animate-spin mx-auto text-[#26649A] mb-2" size={28} />
              <p className="text-xs text-[#64748B]">Loading orders...</p>
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="py-16 text-center text-[#64748B]">
              <ShoppingBag size={36} className="mx-auto text-gray-300 mb-2" />
              <p className="text-sm font-semibold">No orders found.</p>
              <p className="text-xs text-gray-400 mt-1">
                {orders.length === 0
                  ? "New customer purchases will appear here."
                  : "Try clearing your search or status filter."}
              </p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 bg-[#F8FAFC] text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
                  <th className="py-3.5 px-5">Order ID</th>
                  <th className="py-3.5 px-4">Customer</th>
                  <th className="py-3.5 px-4">Items</th>
                  <th className="py-3.5 px-4">Total Amount</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Date</th>
                  <th className="py-3.5 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {filteredOrders.map((o) => {
                  const badge = getStatusBadge(o.status);
                  const Icon = badge.icon;
                  return (
                    <tr key={o._id} className="hover:bg-[#F8FAFC] transition-colors">
                      <td className="py-3 px-5">
                        <span className="font-mono text-xs font-bold text-[#26649A]">
                          {o.orderNumber || `#${o._id.slice(-6)}`}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-bold text-[#3C3837] text-xs sm:text-sm">
                          {o.customer?.name || "Customer"}
                        </div>
                        <div className="text-[11px] text-[#64748B] flex items-center gap-1">
                          <span>{o.customer?.city || "Pakistan"}</span>
                          <span>•</span>
                          <span className="font-mono">{o.customer?.phone}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-xs text-[#64748B]">
                        {o.items?.length || 1} item(s)
                      </td>
                      <td className="py-3 px-4 font-bold text-[#3C3837]">
                        {formatPKR(o.total)}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold border capitalize ${badge.bg}`}
                        >
                          <Icon size={12} />
                          <span>{o.status}</span>
                        </span>
                      </td>
                      <td className="py-3 px-4 text-xs text-[#64748B]">
                        {formatDate(o.createdAt)}
                      </td>
                      <td className="py-3 px-5 text-right">
                        <button
                          onClick={() => setSelectedOrder(o)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-200 hover:border-[#00C2D1] text-xs font-semibold text-[#26649A] hover:bg-[#00C2D1]/10 transition-colors cursor-pointer"
                        >
                          <Eye size={13} />
                          <span>View Details</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-bold text-[#26649A]">
                    {selectedOrder.orderNumber || `#${selectedOrder._id}`}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold border capitalize ${
                      getStatusBadge(selectedOrder.status).bg
                    }`}
                  >
                    {selectedOrder.status}
                  </span>
                </div>
                <p className="text-[11px] text-[#64748B] mt-0.5">
                  Placed on {formatDate(selectedOrder.createdAt)}
                </p>
              </div>

              <button
                onClick={() => setSelectedOrder(null)}
                className="p-1 text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>

            {/* Change Status Action Bar */}
            <div className="my-4 p-3.5 rounded-2xl bg-[#F8FAFC] border border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <span className="text-xs font-bold text-[#3C3837]">
                Update Order Status:
              </span>
              <div className="flex items-center gap-2">
                <select
                  disabled={updatingStatus}
                  value={selectedOrder.status}
                  onChange={(e) => handleUpdateStatus(selectedOrder._id, e.target.value)}
                  className="rounded-xl border border-gray-300 bg-white py-1.5 px-3 text-xs font-semibold text-[#3C3837] outline-none focus:border-[#00C2D1]"
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                {updatingStatus && <Loader2 size={16} className="animate-spin text-[#00C2D1]" />}
              </div>
            </div>

            {/* Customer Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
              <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-gray-100">
                <div className="flex items-center gap-2 text-xs font-bold text-[#26649A] mb-2">
                  <UserIcon size={15} />
                  <span>Customer Details</span>
                </div>
                <div className="space-y-1 text-xs text-[#3C3837]">
                  <div className="font-semibold">{selectedOrder.customer?.name}</div>
                  <div className="flex items-center gap-1 text-[#64748B]">
                    <Phone size={12} />
                    <span className="font-mono">{selectedOrder.customer?.phone}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-gray-100">
                <div className="flex items-center gap-2 text-xs font-bold text-[#26649A] mb-2">
                  <MapPin size={15} />
                  <span>Shipping Address</span>
                </div>
                <div className="space-y-1 text-xs text-[#3C3837]">
                  <div>{selectedOrder.customer?.address}</div>
                  <div className="font-semibold text-[#26649A]">
                    {selectedOrder.customer?.city}
                  </div>
                  {selectedOrder.customer?.notes && (
                    <div className="text-[11px] text-gray-500 italic mt-1">
                      Note: &quot;{selectedOrder.customer.notes}&quot;
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Ordered Items List */}
            <div className="my-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#64748B] mb-2">
                Order Items ({selectedOrder.items?.length || 0})
              </h4>
              <div className="space-y-2 border border-gray-100 rounded-2xl p-2 divide-y divide-gray-100">
                {selectedOrder.items?.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 pt-2.5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 relative rounded-lg bg-gray-50 border border-gray-200 overflow-hidden shrink-0 flex items-center justify-center">
                        {item.img ? (
                          <Image
                            src={item.img}
                            alt={item.name}
                            fill
                            unoptimized
                            className="object-contain p-1"
                            sizes="40px"
                          />
                        ) : (
                          <ShoppingBag size={16} className="text-gray-300" />
                        )}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#3C3837]">{item.name}</div>
                        <div className="text-[11px] text-[#64748B]">
                          Qty: {item.quantity} × Rs. {item.price.toLocaleString("en-PK")}
                        </div>
                      </div>
                    </div>
                    <div className="text-xs font-bold text-[#3C3837]">
                      {formatPKR(item.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Financial Summary */}
            <div className="bg-[#F8FAFC] rounded-2xl p-4 border border-gray-100 space-y-1.5 text-xs">
              <div className="flex justify-between text-[#64748B]">
                <span>Subtotal:</span>
                <span>{formatPKR(selectedOrder.subtotal)}</span>
              </div>
              <div className="flex justify-between text-[#64748B]">
                <span>Delivery Fee:</span>
                <span>{formatPKR(selectedOrder.deliveryFee)}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#3C3837] pt-2 border-t border-gray-200">
                <span>Grand Total:</span>
                <span className="text-[#26649A]">{formatPKR(selectedOrder.total)}</span>
              </div>
              <div className="text-[11px] text-gray-500 pt-1">
                Payment: {selectedOrder.paymentMethod || "Cash on Delivery (COD)"}
              </div>
            </div>

            {/* Modal Close Footer */}
            <div className="flex justify-end pt-4 mt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="px-5 py-2.5 rounded-xl bg-[#26649A] hover:bg-[#1C4B75] text-white text-xs font-bold transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
