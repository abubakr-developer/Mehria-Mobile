"use client";

import { useEffect, useState } from "react";
import {
  MessageSquare,
  Search,
  RefreshCw,
  Loader2,
  Mail,
  Trash2,
  CheckCircle2,
  Eye,
  Phone,
  Clock,
  Send,
  X,
} from "lucide-react";

interface Inquiry {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  status: "unread" | "read";
  createdAt: string;
}

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");
  const [search, setSearch] = useState("");
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

  async function loadInquiries() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/inquiries");
      if (res.ok) {
        const data = await res.json();
        setInquiries(data.inquiries || []);
      }
    } catch {
      console.error("Failed to load inquiries");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadInquiries();
  }, []);

  async function toggleStatus(inquiry: Inquiry) {
    const nextStatus = inquiry.status === "unread" ? "read" : "unread";
    try {
      const res = await fetch(`/api/admin/inquiries/${inquiry._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus }),
      });

      if (res.ok) {
        setInquiries((prev) =>
          prev.map((i) => (i._id === inquiry._id ? { ...i, status: nextStatus } : i))
        );
        if (selectedInquiry && selectedInquiry._id === inquiry._id) {
          setSelectedInquiry({ ...selectedInquiry, status: nextStatus });
        }
      }
    } catch {
      alert("Failed to update status");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this inquiry?")) return;

    try {
      const res = await fetch(`/api/admin/inquiries/${id}`, { method: "DELETE" });
      if (res.ok) {
        setInquiries((prev) => prev.filter((i) => i._id !== id));
        if (selectedInquiry && selectedInquiry._id === id) {
          setSelectedInquiry(null);
        }
      }
    } catch {
      alert("Failed to delete inquiry");
    }
  }

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "N/A";
    return new Date(dateStr).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const filteredInquiries = inquiries.filter((inq) => {
    const matchesFilter = filter === "all" || inq.status === filter;
    const matchesSearch =
      inq.name.toLowerCase().includes(search.toLowerCase()) ||
      inq.email.toLowerCase().includes(search.toLowerCase()) ||
      (inq.subject && inq.subject.toLowerCase().includes(search.toLowerCase())) ||
      inq.message.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#26649A] uppercase tracking-wider">
            <MessageSquare size={14} className="text-[#00C2D1]" />
            <span>Support & Communications</span>
          </div>
          <h1
            className="text-2xl sm:text-3xl font-black text-[#3C3837] tracking-tight mt-1"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Customer Inquiries
          </h1>
          <p className="text-sm text-[#64748B]">
            Read and respond to questions submitted through the store contact form.
          </p>
        </div>

        <button
          onClick={loadInquiries}
          className="self-start sm:self-auto inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-[#3C3837] text-xs font-semibold shadow-xs transition-colors"
        >
          <RefreshCw size={15} className={loading ? "animate-spin text-[#00C2D1]" : ""} />
          <span>Refresh Inbox</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#3C3837]/[0.08] shadow-[0_2px_12px_rgba(28,75,117,0.03)] flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748B]" />
          <input
            type="text"
            placeholder="Search inquiries..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-[#F8FAFC] py-2 pl-9 pr-3 text-xs text-[#3C3837] outline-none focus:border-[#00C2D1] focus:bg-white"
          />
        </div>

        <div className="flex items-center gap-2">
          {(["all", "unread", "read"] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setFilter(mode)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                filter === mode
                  ? "bg-[#26649A] text-white shadow-xs"
                  : "bg-gray-100 text-[#64748B] hover:bg-gray-200"
              }`}
            >
              {mode} ({inquiries.filter((i) => mode === "all" || i.status === mode).length})
            </button>
          ))}
        </div>
      </div>

      {/* Inquiries Table */}
      <div className="bg-white rounded-2xl border border-[#3C3837]/[0.08] shadow-[0_4px_20px_rgba(28,75,117,0.04)] overflow-hidden">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-10 text-center">
              <Loader2 className="animate-spin mx-auto text-[#26649A] mb-2" size={28} />
              <p className="text-xs text-[#64748B]">Loading inquiries...</p>
            </div>
          ) : filteredInquiries.length === 0 ? (
            <div className="py-16 text-center text-[#64748B]">
              <Mail size={36} className="mx-auto text-gray-300 mb-2" />
              <p className="text-sm font-semibold">No inquiries found.</p>
              <p className="text-xs text-gray-400 mt-1">
                Messages from the Contact page will be received here.
              </p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 bg-[#F8FAFC] text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
                  <th className="py-3.5 px-5">Sender</th>
                  <th className="py-3.5 px-4">Subject & Message</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Received</th>
                  <th className="py-3.5 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {filteredInquiries.map((inq) => (
                  <tr
                    key={inq._id}
                    className={`hover:bg-[#F8FAFC] transition-colors ${
                      inq.status === "unread" ? "bg-[#00C2D1]/[0.03]" : ""
                    }`}
                  >
                    <td className="py-3.5 px-5">
                      <div className="font-bold text-[#3C3837] text-xs sm:text-sm">
                        {inq.name}
                      </div>
                      <div className="text-[11px] text-[#26649A]">{inq.email}</div>
                      {inq.phone && (
                        <div className="text-[10px] text-gray-400 font-mono">{inq.phone}</div>
                      )}
                    </td>
                    <td className="py-3.5 px-4 max-w-sm">
                      {inq.subject && (
                        <div className="font-semibold text-xs text-[#3C3837] mb-0.5">
                          {inq.subject}
                        </div>
                      )}
                      <p className="text-xs text-[#64748B] line-clamp-2">{inq.message}</p>
                    </td>
                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => toggleStatus(inq)}
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border capitalize transition-colors cursor-pointer ${
                          inq.status === "unread"
                            ? "bg-[#00C2D1]/15 text-[#1C4B75] border-[#00C2D1]/30 hover:bg-[#00C2D1]/25"
                            : "bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200"
                        }`}
                      >
                        {inq.status === "unread" ? (
                          <Clock size={11} />
                        ) : (
                          <CheckCircle2 size={11} />
                        )}
                        <span>{inq.status}</span>
                      </button>
                    </td>
                    <td className="py-3.5 px-4 text-xs text-[#64748B]">
                      {formatDate(inq.createdAt)}
                    </td>
                    <td className="py-3.5 px-5 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => {
                            setSelectedInquiry(inq);
                            if (inq.status === "unread") toggleStatus(inq);
                          }}
                          className="p-1.5 text-[#26649A] hover:bg-[#26649A]/10 rounded-lg transition-colors cursor-pointer"
                          title="View message"
                        >
                          <Eye size={16} />
                        </button>
                        <a
                          href={`mailto:${inq.email}?subject=Re: ${encodeURIComponent(
                            inq.subject || "Your Inquiry at Mehria Mobiles"
                          )}`}
                          className="p-1.5 text-[#00AAB8] hover:bg-[#00C2D1]/10 rounded-lg transition-colors"
                          title="Reply via Email"
                        >
                          <Send size={15} />
                        </a>
                        <button
                          onClick={() => handleDelete(inq._id)}
                          className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                          title="Delete message"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Inquiry View Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-gray-100">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div>
                <h3 className="font-bold text-[#3C3837] text-base">
                  {selectedInquiry.subject || "Customer Inquiry"}
                </h3>
                <p className="text-[11px] text-[#64748B]">
                  From {selectedInquiry.name} ({formatDate(selectedInquiry.createdAt)})
                </p>
              </div>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="p-1 text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>

            <div className="my-4 space-y-3">
              <div className="p-3 bg-[#F8FAFC] rounded-xl border border-gray-100 text-xs text-[#3C3837] space-y-1">
                <div>
                  <span className="font-semibold text-[#64748B]">Email: </span>
                  <a
                    href={`mailto:${selectedInquiry.email}`}
                    className="text-[#26649A] hover:underline"
                  >
                    {selectedInquiry.email}
                  </a>
                </div>
                {selectedInquiry.phone && (
                  <div>
                    <span className="font-semibold text-[#64748B]">Phone: </span>
                    <span className="font-mono">{selectedInquiry.phone}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#64748B] mb-1">
                  Message
                </label>
                <div className="p-4 bg-[#F8FAFC] rounded-2xl border border-gray-200 text-xs text-[#3C3837] leading-relaxed whitespace-pre-wrap">
                  {selectedInquiry.message}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <button
                onClick={() => toggleStatus(selectedInquiry)}
                className="text-xs font-semibold text-[#26649A] hover:underline"
              >
                Mark as {selectedInquiry.status === "unread" ? "Read" : "Unread"}
              </button>

              <div className="flex items-center gap-2">
                <a
                  href={`mailto:${selectedInquiry.email}?subject=Re: ${encodeURIComponent(
                    selectedInquiry.subject || "Your Inquiry at Mehria Mobiles"
                  )}`}
                  className="px-4 py-2 rounded-xl bg-[#00C2D1] hover:bg-[#00AAB8] text-[#3C3837] text-xs font-bold flex items-center gap-1.5 shadow-sm"
                >
                  <Send size={13} />
                  <span>Send Reply</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
