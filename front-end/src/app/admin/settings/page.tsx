"use client";

import { useEffect, useState, FormEvent } from "react";
import {
  Settings,
  Store,
  Phone,
  Mail,
  MapPin,
  Truck,
  Bell,
  Save,
  Loader2,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
} from "lucide-react";

interface StoreSettingsData {
  storeName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  deliveryFee: number;
  announcementText: string;
  announcementEnabled: boolean;
}

export default function AdminSettingsPage() {
  const [formData, setFormData] = useState<StoreSettingsData>({
    storeName: "Mehria Mobiles",
    phone: "+92 300 1234567",
    email: "mehriamobiles@gmail.com",
    address: "Main Bazar, Near Ghalla Mandi, Lodhran",
    city: "Lodhran",
    deliveryFee: 0,
    announcementText: "Free Express Delivery on orders across Pakistan!",
    announcementEnabled: true,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function loadSettings() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/settings");
      if (res.ok) {
        const data = await res.json();
        if (data.settings) {
          setFormData((prev) => ({ ...prev, ...data.settings }));
        }
      }
    } catch {
      setError("Failed to load store settings");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadSettings();
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.error || "Failed to update settings");
      }

      setSuccess(true);
      setTimeout(() => setSuccess(false), 4000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error updating store settings");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#26649A] uppercase tracking-wider">
            <Settings size={14} className="text-[#00C2D1]" />
            <span>Store Configuration</span>
          </div>
          <h1
            className="text-2xl sm:text-3xl font-black text-[#3C3837] tracking-tight mt-1"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Store Settings
          </h1>
          <p className="text-sm text-[#64748B]">
            Configure store contact information, delivery fees, and announcement banners.
          </p>
        </div>

        <button
          onClick={loadSettings}
          className="self-start sm:self-auto inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-[#3C3837] text-xs font-semibold shadow-xs transition-colors"
        >
          <RefreshCw size={15} className={loading ? "animate-spin text-[#00C2D1]" : ""} />
          <span>Reload</span>
        </button>
      </div>

      {/* Notifications */}
      {success && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2.5 animate-fadeIn">
          <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
          <span>Store configuration updated successfully! Changes are live on your store.</span>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs font-semibold flex items-center gap-2.5">
          <AlertCircle size={18} className="text-red-600 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Settings Form */}
      {loading ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-gray-100">
          <Loader2 className="animate-spin mx-auto text-[#26649A] mb-2" size={28} />
          <p className="text-xs text-[#64748B]">Loading store settings...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* General Information Card */}
          <div className="bg-white rounded-2xl border border-[#3C3837]/[0.08] shadow-[0_4px_20px_rgba(28,75,117,0.04)] p-6 sm:p-7 space-y-4">
            <div className="flex items-center gap-2.5 pb-4 border-b border-gray-100 text-[#26649A]">
              <Store size={18} />
              <h2 className="text-sm font-bold text-[#3C3837]">General Store Information</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div>
                <label className="block text-xs font-bold text-[#3C3837] mb-1.5">
                  Store Title / Brand Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.storeName}
                  onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
                  className="w-full rounded-xl border border-gray-200 bg-[#F8FAFC] py-2.5 px-3 text-xs outline-none focus:border-[#00C2D1] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#3C3837] mb-1.5">City</label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full rounded-xl border border-gray-200 bg-[#F8FAFC] py-2.5 px-3 text-xs outline-none focus:border-[#00C2D1] focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#3C3837] mb-1.5">
                Physical Store Address
              </label>
              <div className="relative">
                <MapPin
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748B]"
                />
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full rounded-xl border border-gray-200 bg-[#F8FAFC] py-2.5 pl-9 pr-3 text-xs outline-none focus:border-[#00C2D1] focus:bg-white"
                />
              </div>
            </div>
          </div>

          {/* Contact Details Card */}
          <div className="bg-white rounded-2xl border border-[#3C3837]/[0.08] shadow-[0_4px_20px_rgba(28,75,117,0.04)] p-6 sm:p-7 space-y-4">
            <div className="flex items-center gap-2.5 pb-4 border-b border-gray-100 text-[#26649A]">
              <Phone size={18} />
              <h2 className="text-sm font-bold text-[#3C3837]">Customer Contact Details</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div>
                <label className="block text-xs font-bold text-[#3C3837] mb-1.5">
                  Support Phone / WhatsApp
                </label>
                <div className="relative">
                  <Phone
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748B]"
                  />
                  <input
                    type="text"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 bg-[#F8FAFC] py-2.5 pl-9 pr-3 text-xs outline-none focus:border-[#00C2D1] focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#3C3837] mb-1.5">
                  Official Support Email
                </label>
                <div className="relative">
                  <Mail
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748B]"
                  />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 bg-[#F8FAFC] py-2.5 pl-9 pr-3 text-xs outline-none focus:border-[#00C2D1] focus:bg-white"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Delivery & Announcement Card */}
          <div className="bg-white rounded-2xl border border-[#3C3837]/[0.08] shadow-[0_4px_20px_rgba(28,75,117,0.04)] p-6 sm:p-7 space-y-4">
            <div className="flex items-center gap-2.5 pb-4 border-b border-gray-100 text-[#26649A]">
              <Truck size={18} />
              <h2 className="text-sm font-bold text-[#3C3837]">Delivery & Announcement Banner</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div>
                <label className="block text-xs font-bold text-[#3C3837] mb-1.5">
                  Default Delivery Fee (PKR)
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.deliveryFee}
                  onChange={(e) =>
                    setFormData({ ...formData, deliveryFee: Number(e.target.value) })
                  }
                  className="w-full rounded-xl border border-gray-200 bg-[#F8FAFC] py-2.5 px-3 text-xs outline-none focus:border-[#00C2D1] focus:bg-white"
                />
                <p className="text-[11px] text-[#64748B] mt-1">Set to 0 for Free Delivery.</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#3C3837] mb-1.5">
                  Announcement Bar Visibility
                </label>
                <div className="pt-2">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-[#3C3837]">
                    <input
                      type="checkbox"
                      checked={formData.announcementEnabled}
                      onChange={(e) =>
                        setFormData({ ...formData, announcementEnabled: e.target.checked })
                      }
                      className="accent-[#00C2D1] w-4 h-4 rounded"
                    />
                    <span>Show announcement bar at top of site</span>
                  </label>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#3C3837] mb-1.5">
                Announcement Banner Text
              </label>
              <div className="relative">
                <Bell
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748B]"
                />
                <input
                  type="text"
                  value={formData.announcementText}
                  onChange={(e) =>
                    setFormData({ ...formData, announcementText: e.target.value })
                  }
                  className="w-full rounded-xl border border-gray-200 bg-[#F8FAFC] py-2.5 pl-9 pr-3 text-xs outline-none focus:border-[#00C2D1] focus:bg-white"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#00C2D1] hover:bg-[#00AAB8] text-[#3C3837] text-xs font-bold shadow-[0_4px_14px_rgba(0,194,209,0.35)] transition-all active:scale-[0.98] cursor-pointer disabled:opacity-60"
            >
              {saving ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Saving Settings...</span>
                </>
              ) : (
                <>
                  <Save size={16} />
                  <span>Save Configuration</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
