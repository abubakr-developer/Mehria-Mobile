"use client";

import { useEffect, useState, FormEvent } from "react";
import {
  Users,
  Plus,
  Shield,
  ShieldCheck,
  UserCheck,
  UserX,
  Trash2,
  RefreshCw,
  Loader2,
  X,
  Mail,
  Lock,
  User as UserIcon,
  AlertCircle,
  Key,
} from "lucide-react";

interface UserItem {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "staff";
  isActive: boolean;
  createdAt?: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // New staff user form
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  async function loadUsers() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/users");
      if (res.ok) {
        const data = await res.json();
        setUsers(data.users || []);
      }
    } catch {
      setError("Failed to load user accounts.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadUsers();
  }, []);

  async function handleAddStaff(e: FormEvent) {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      setError("Please fill out all fields.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setSaving(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          password: formData.password,
          role: "staff",
          isActive: true,
        }),
      });

      const d = await res.json();
      if (!res.ok) {
        throw new Error(d.error || "Failed to create staff member");
      }

      setModalOpen(false);
      setFormData({ name: "", email: "", password: "" });
      loadUsers();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error creating user");
    } finally {
      setSaving(false);
    }
  }

  async function toggleUserStatus(user: UserItem) {
    if (user.role === "admin") {
      alert("The primary administrator account cannot be deactivated.");
      return;
    }

    try {
      const res = await fetch(`/api/admin/users/${user._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !user.isActive }),
      });

      if (res.ok) {
        setUsers((prev) =>
          prev.map((u) => (u._id === user._id ? { ...u, isActive: !user.isActive } : u))
        );
      } else {
        alert("Failed to update status.");
      }
    } catch {
      alert("Error updating user status.");
    }
  }

  async function handleDelete(user: UserItem) {
    if (user.role === "admin") {
      alert("The master administrator account cannot be deleted.");
      return;
    }

    if (!confirm(`Are you sure you want to delete staff account ${user.email}?`)) return;

    try {
      const res = await fetch(`/api/admin/users/${user._id}`, { method: "DELETE" });
      if (res.ok) {
        setUsers((prev) => prev.filter((u) => u._id !== user._id));
      } else {
        const d = await res.json();
        alert(d.error || "Failed to delete user.");
      }
    } catch {
      alert("Error deleting user.");
    }
  }

  const adminUser = users.find((u) => u.role === "admin");
  const staffUsers = users.filter((u) => u.role !== "admin");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#26649A] uppercase tracking-wider">
            <ShieldCheck size={14} className="text-[#00C2D1]" />
            <span>Role-Based Access Control</span>
          </div>
          <h1
            className="text-2xl sm:text-3xl font-black text-[#3C3837] tracking-tight mt-1"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Users & Administration
          </h1>
          <p className="text-sm text-[#64748B]">
            Manage master administrator settings and staff team members.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={loadUsers}
            className="p-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-[#3C3837] text-xs font-semibold shadow-xs transition-colors"
            title="Reload users"
          >
            <RefreshCw size={16} className={loading ? "animate-spin text-[#00C2D1]" : ""} />
          </button>
          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#00C2D1] hover:bg-[#00AAB8] text-[#3C3837] text-xs font-bold shadow-[0_4px_12px_rgba(0,194,209,0.3)] transition-all active:scale-[0.98] cursor-pointer"
          >
            <Plus size={16} />
            <span>Add Staff Member</span>
          </button>
        </div>
      </div>

      {/* Single Admin Policy Information Card */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#26649A]/[0.06] via-[#00C2D1]/[0.08] to-transparent border border-[#00C2D1]/20 flex items-start gap-3.5">
        <div className="w-9 h-9 rounded-xl bg-[#00C2D1]/20 text-[#00AAB8] flex items-center justify-center shrink-0 mt-0.5">
          <Shield size={20} />
        </div>
        <div>
          <h2 className="text-xs font-bold text-[#26649A] uppercase tracking-wide">
            Single Master Admin Policy
          </h2>
          <p className="text-xs text-[#3C3837] mt-0.5 leading-relaxed">
            For security, the system enforces exactly <strong className="text-[#26649A]">1 Master Admin</strong> account.
            Additional team members can be granted <strong className="text-[#3C3837]">Staff</strong> accounts with access to inventory, orders, and inquiries.
          </p>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl border border-[#3C3837]/[0.08] shadow-[0_4px_20px_rgba(28,75,117,0.04)] overflow-hidden">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-10 text-center">
              <Loader2 className="animate-spin mx-auto text-[#26649A] mb-2" size={28} />
              <p className="text-xs text-[#64748B]">Loading user accounts...</p>
            </div>
          ) : users.length === 0 ? (
            <div className="py-16 text-center text-[#64748B]">
              <Users size={36} className="mx-auto text-gray-300 mb-2" />
              <p className="text-sm font-semibold">No accounts found.</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 bg-[#F8FAFC] text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
                  <th className="py-3.5 px-5">User</th>
                  <th className="py-3.5 px-4">Role</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {users.map((u) => {
                  const isAdmin = u.role === "admin";
                  return (
                    <tr key={u._id} className="hover:bg-[#F8FAFC] transition-colors">
                      <td className="py-3.5 px-5">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs ${
                              isAdmin
                                ? "bg-gradient-to-tr from-[#26649A] to-[#00C2D1] text-white shadow-xs"
                                : "bg-gray-100 text-[#3C3837]"
                            }`}
                          >
                            {u.name ? u.name.charAt(0).toUpperCase() : "U"}
                          </div>
                          <div>
                            <div className="font-bold text-[#3C3837] text-xs sm:text-sm">
                              {u.name}
                            </div>
                            <div className="text-[11px] text-[#64748B]">{u.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        {isAdmin ? (
                          <span className="inline-flex items-center gap-1 bg-[#00C2D1]/15 text-[#1C4B75] border border-[#00C2D1]/30 px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                            <ShieldCheck size={12} className="text-[#00AAB8]" />
                            <span>Master Admin</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 border border-gray-200 px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                            <UserCheck size={12} />
                            <span>Staff Member</span>
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4">
                        {u.isActive ? (
                          <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            <span>Active</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-rose-700 bg-rose-50 border border-rose-200 px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                            <span>Deactivated</span>
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-5 text-right">
                        {isAdmin ? (
                          <span className="text-[11px] text-gray-400 font-medium">
                            Primary Account
                          </span>
                        ) : (
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => toggleUserStatus(u)}
                              className={`p-1.5 rounded-lg transition-colors cursor-pointer text-xs font-semibold ${
                                u.isActive
                                  ? "text-amber-600 hover:bg-amber-50"
                                  : "text-emerald-600 hover:bg-emerald-50"
                              }`}
                              title={u.isActive ? "Deactivate staff" : "Activate staff"}
                            >
                              {u.isActive ? <UserX size={16} /> : <UserCheck size={16} />}
                            </button>
                            <button
                              onClick={() => handleDelete(u)}
                              className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                              title="Delete staff account"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Add Staff Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-gray-100">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#00C2D1]/20 text-[#00AAB8] flex items-center justify-center">
                  <Plus size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-[#3C3837] text-base">Add Staff Account</h3>
                  <p className="text-[11px] text-[#64748B]">
                    Create login credentials for store staff
                  </p>
                </div>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>

            {error && (
              <div className="my-3 p-3 rounded-xl bg-red-50 text-red-700 text-xs border border-red-200">
                {error}
              </div>
            )}

            <form onSubmit={handleAddStaff} className="space-y-4 mt-4">
              <div>
                <label className="block text-xs font-bold text-[#3C3837] mb-1">Full Name *</label>
                <div className="relative">
                  <UserIcon
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748B]"
                  />
                  <input
                    type="text"
                    required
                    placeholder="e.g. John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 bg-[#F8FAFC] py-2.5 pl-9 pr-3 text-xs outline-none focus:border-[#00C2D1]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#3C3837] mb-1">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748B]"
                  />
                  <input
                    type="email"
                    required
                    placeholder="staff@mehriamobiles.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 bg-[#F8FAFC] py-2.5 pl-9 pr-3 text-xs outline-none focus:border-[#00C2D1]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#3C3837] mb-1">
                  Initial Password *
                </label>
                <div className="relative">
                  <Lock
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748B]"
                  />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 bg-[#F8FAFC] py-2.5 pl-9 pr-3 text-xs outline-none focus:border-[#00C2D1]"
                  />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-gray-50 border border-gray-100 text-[11px] text-[#64748B] flex items-center gap-2">
                <Key size={14} className="text-[#26649A] shrink-0" />
                <span>Role is set to Staff (Access to products, orders & inquiries).</span>
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-gray-200 text-[#64748B] hover:bg-gray-50 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2.5 rounded-xl bg-[#00C2D1] hover:bg-[#00AAB8] text-[#3C3837] text-xs font-bold shadow-md transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-60"
                >
                  {saving ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <span>Create Staff Member</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
