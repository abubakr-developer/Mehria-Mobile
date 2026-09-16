"use client";

import { useEffect, useState, FormEvent } from "react";
import {
  FolderTree,
  Plus,
  Trash2,
  RefreshCw,
  Loader2,
  X,
  Layers,
  ArrowUpDown,
} from "lucide-react";

interface Category {
  _id: string;
  id: string;
  label: string;
  description?: string;
  displayOrder?: number;
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    id: "",
    label: "",
    description: "",
    displayOrder: 0,
  });

  async function loadCategories() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/categories");
      if (res.ok) {
        const data = await res.json();
        setCategories(data.categories || []);
      }
    } catch {
      setError("Failed to load categories");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCategories();
  }, []);

  async function handleAddCategory(e: FormEvent) {
    e.preventDefault();
    if (!formData.label) {
      setError("Category label is required");
      return;
    }

    setSaving(true);
    setError(null);

    const slug =
      formData.id.trim() ||
      formData.label.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    try {
      const res = await fetch("/api/admin/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          id: slug,
          displayOrder: Number(formData.displayOrder || categories.length),
        }),
      });

      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.error || "Failed to create category");
      }

      setModalOpen(false);
      setFormData({ id: "", label: "", description: "", displayOrder: 0 });
      loadCategories();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error creating category");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this category?")) return;

    try {
      const res = await fetch(`/api/admin/categories/${id}`, { method: "DELETE" });
      if (res.ok) {
        setCategories((prev) => prev.filter((c) => c._id !== id));
      } else {
        alert("Failed to delete category.");
      }
    } catch {
      alert("Error deleting category");
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#26649A] uppercase tracking-wider">
            <FolderTree size={14} className="text-[#00C2D1]" />
            <span>Navigation Taxonomy</span>
          </div>
          <h1
            className="text-2xl sm:text-3xl font-black text-[#3C3837] tracking-tight mt-1"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Product Categories
          </h1>
          <p className="text-sm text-[#64748B]">
            Organize catalog products into shop categories and storefront collections.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={loadCategories}
            className="p-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-[#3C3837] text-xs font-semibold shadow-xs transition-colors"
            title="Reload categories"
          >
            <RefreshCw size={16} className={loading ? "animate-spin text-[#00C2D1]" : ""} />
          </button>
          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#00C2D1] hover:bg-[#00AAB8] text-[#3C3837] text-xs font-bold shadow-[0_4px_12px_rgba(0,194,209,0.3)] transition-all active:scale-[0.98] cursor-pointer"
          >
            <Plus size={16} />
            <span>Add Category</span>
          </button>
        </div>
      </div>

      {/* Categories Grid/Table */}
      <div className="bg-white rounded-2xl border border-[#3C3837]/[0.08] shadow-[0_4px_20px_rgba(28,75,117,0.04)] overflow-hidden">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-10 text-center">
              <Loader2 className="animate-spin mx-auto text-[#26649A] mb-2" size={28} />
              <p className="text-xs text-[#64748B]">Loading categories...</p>
            </div>
          ) : categories.length === 0 ? (
            <div className="py-16 text-center text-[#64748B]">
              <Layers size={36} className="mx-auto text-gray-300 mb-2" />
              <p className="text-sm font-semibold">No categories defined yet.</p>
              <p className="text-xs text-gray-400 mt-1">
                Click &quot;Add Category&quot; to establish product groups.
              </p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 bg-[#F8FAFC] text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
                  <th className="py-3.5 px-5">Category Label</th>
                  <th className="py-3.5 px-4">Identifier (Slug)</th>
                  <th className="py-3.5 px-4">Description</th>
                  <th className="py-3.5 px-4">Order</th>
                  <th className="py-3.5 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {categories.map((c) => (
                  <tr key={c._id} className="hover:bg-[#F8FAFC] transition-colors">
                    <td className="py-3.5 px-5">
                      <div className="font-bold text-[#3C3837]">{c.label}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-mono text-xs text-[#26649A] bg-[#26649A]/[0.06] px-2 py-0.5 rounded-md">
                        {c.id}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-xs text-[#64748B] max-w-xs truncate">
                      {c.description || "—"}
                    </td>
                    <td className="py-3.5 px-4 text-xs font-semibold text-[#64748B]">
                      {c.displayOrder ?? 0}
                    </td>
                    <td className="py-3.5 px-5 text-right">
                      <button
                        onClick={() => handleDelete(c._id)}
                        className="p-1.5 text-[#64748B] hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                        title="Delete category"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Add Category Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-gray-100">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#00C2D1]/20 text-[#00AAB8] flex items-center justify-center">
                  <Plus size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-[#3C3837] text-base">Add New Category</h3>
                  <p className="text-[11px] text-[#64748B]">Group accessories together</p>
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

            <form onSubmit={handleAddCategory} className="space-y-4 mt-4">
              <div>
                <label className="block text-xs font-bold text-[#3C3837] mb-1">
                  Category Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Wireless Earbuds"
                  value={formData.label}
                  onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                  className="w-full rounded-xl border border-gray-200 bg-[#F8FAFC] py-2.5 px-3 text-xs outline-none focus:border-[#00C2D1]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#3C3837] mb-1">
                  URL Slug / ID (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. earbuds (auto-generated if blank)"
                  value={formData.id}
                  onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                  className="w-full rounded-xl border border-gray-200 bg-[#F8FAFC] py-2.5 px-3 text-xs outline-none focus:border-[#00C2D1]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#3C3837] mb-1">
                  Display Order
                </label>
                <input
                  type="number"
                  placeholder="0"
                  value={formData.displayOrder}
                  onChange={(e) =>
                    setFormData({ ...formData, displayOrder: Number(e.target.value) })
                  }
                  className="w-full rounded-xl border border-gray-200 bg-[#F8FAFC] py-2.5 px-3 text-xs outline-none focus:border-[#00C2D1]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#3C3837] mb-1">Description</label>
                <textarea
                  rows={2}
                  placeholder="Short description for SEO and category page header..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full rounded-xl border border-gray-200 bg-[#F8FAFC] py-2.5 px-3 text-xs outline-none focus:border-[#00C2D1]"
                />
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
                    <span>Create Category</span>
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
