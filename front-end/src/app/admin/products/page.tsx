"use client";

import { useEffect, useState, FormEvent } from "react";
import Image from "next/image";
import {
  Package,
  Plus,
  Search,
  Trash2,
  Edit2,
  CheckCircle2,
  XCircle,
  Sparkles,
  Loader2,
  X,
  RefreshCw,
  Tag,
  Star,
  Layers,
} from "lucide-react";

interface Product {
  _id: string;
  id: number;
  name: string;
  price: number;
  oldPrice?: number | null;
  tag?: string | null;
  tagColor?: string;
  tagText?: string;
  category: string;
  rating?: number;
  reviews?: number;
  img: string;
  description?: string;
  inStock: boolean;
  featured?: boolean;
}

interface Category {
  _id: string;
  id: string;
  label: string;
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Form data for adding/editing product
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    oldPrice: "",
    category: "chargers",
    tag: "",
    description: "",
    img: "/imagegs/products/1.jfif",
    inStock: true,
    featured: false,
  });

  async function loadData() {
    setLoading(true);
    try {
      const [prodRes, catRes] = await Promise.all([
        fetch("/api/admin/products", { cache: "no-store" }),
        fetch("/api/admin/categories", { cache: "no-store" }),
      ]);

      if (prodRes.ok) {
        const prodData = await prodRes.json();
        setProducts(prodData.products || []);
      }

      if (catRes.ok) {
        const catData = await catRes.json();
        setCategories(catData.categories || []);
      }
    } catch {
      setError("Failed to fetch products or categories.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  function openCreateModal() {
    setEditingProduct(null);
    setFormData({
      name: "",
      price: "",
      oldPrice: "",
      category: categories[0]?.id || "chargers",
      tag: "",
      description: "",
      img: "/imagegs/products/1.jfif",
      inStock: true,
      featured: false,
    });
    setError(null);
    setModalOpen(true);
  }

  function openEditModal(product: Product) {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: String(product.price),
      oldPrice: product.oldPrice ? String(product.oldPrice) : "",
      category: product.category,
      tag: product.tag || "",
      description: product.description || "",
      img: product.img || "/imagegs/products/1.jfif",
      inStock: product.inStock,
      featured: Boolean(product.featured),
    });
    setError(null);
    setModalOpen(true);
  }

  async function handleSaveProduct(e: FormEvent) {
    e.preventDefault();
    if (!formData.name.trim() || !formData.price || !formData.category) {
      setError("Name, price, and category are required.");
      return;
    }

    setSaving(true);
    setError(null);

    const payload = {
      name: formData.name.trim(),
      price: Number(formData.price),
      oldPrice: formData.oldPrice ? Number(formData.oldPrice) : null,
      category: formData.category,
      tag: formData.tag.trim() || null,
      description: formData.description.trim(),
      img: formData.img.trim() || "/imagegs/products/1.jfif",
      inStock: formData.inStock,
      featured: formData.featured,
    };

    try {
      if (editingProduct) {
        // Update existing product
        const res = await fetch(`/api/admin/products/${editingProduct._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          const d = await res.json();
          throw new Error(d.error || "Failed to update product");
        }

        const updated = await res.json();
        setProducts((prev) =>
          prev.map((p) => (p._id === editingProduct._id ? { ...p, ...updated.product } : p))
        );
      } else {
        // Create new product
        const res = await fetch("/api/admin/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          const d = await res.json();
          throw new Error(d.error || "Failed to create product");
        }

        const created = await res.json();
        setProducts((prev) => [created.product, ...prev]);
      }

      setModalOpen(false);
      setEditingProduct(null);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error saving product");
    } finally {
      setSaving(false);
    }
  }

  async function toggleStockStatus(product: Product) {
    const updatedStatus = !product.inStock;
    try {
      const res = await fetch(`/api/admin/products/${product._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inStock: updatedStatus }),
      });

      if (res.ok) {
        setProducts((prev) =>
          prev.map((p) => (p._id === product._id ? { ...p, inStock: updatedStatus } : p))
        );
      }
    } catch {
      alert("Failed to update stock status");
    }
  }

  async function toggleFeatured(product: Product) {
    const updatedFeatured = !product.featured;
    try {
      const res = await fetch(`/api/admin/products/${product._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ featured: updatedFeatured }),
      });

      if (res.ok) {
        setProducts((prev) =>
          prev.map((p) => (p._id === product._id ? { ...p, featured: updatedFeatured } : p))
        );
      }
    } catch {
      alert("Failed to update featured status");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to permanently delete this product?")) return;

    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
      if (res.ok) {
        setProducts((prev) => prev.filter((p) => p._id !== id));
      } else {
        const d = await res.json();
        alert(d.error || "Failed to delete product.");
      }
    } catch {
      alert("Error connecting to server.");
    } finally {
      setDeletingId(null);
    }
  }

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#26649A] uppercase tracking-wider">
            <Package size={14} className="text-[#00C2D1]" />
            <span>Product Catalog CMS</span>
          </div>
          <h1
            className="text-2xl sm:text-3xl font-black text-[#3C3837] tracking-tight mt-1"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Manage Products
          </h1>
          <p className="text-sm text-[#64748B]">
            Add, update inventory, edit pricing, and organize accessories across categories.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={loadData}
            className="p-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-[#3C3837] text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            title="Reload products"
          >
            <RefreshCw size={16} className={loading ? "animate-spin text-[#00C2D1]" : ""} />
          </button>
          <button
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#00C2D1] hover:bg-[#00AAB8] text-[#3C3837] text-xs font-bold shadow-[0_4px_12px_rgba(0,194,209,0.3)] transition-all active:scale-[0.98] cursor-pointer"
          >
            <Plus size={16} />
            <span>Add Product</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#3C3837]/[0.08] shadow-[0_2px_12px_rgba(28,75,117,0.03)] flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748B]" />
          <input
            type="text"
            placeholder="Search products by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-[#F8FAFC] py-2 pl-9 pr-3 text-xs text-[#3C3837] outline-none focus:border-[#00C2D1] focus:bg-white"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <span className="text-xs font-semibold text-[#64748B] whitespace-nowrap">Filter:</span>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full md:w-auto rounded-xl border border-gray-200 bg-[#F8FAFC] py-2 px-3 text-xs text-[#3C3837] outline-none focus:border-[#00C2D1]"
          >
            <option value="all">All Categories ({products.length})</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl border border-[#3C3837]/[0.08] shadow-[0_4px_20px_rgba(28,75,117,0.04)] overflow-hidden">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-10 text-center">
              <Loader2 className="animate-spin mx-auto text-[#26649A] mb-2" size={28} />
              <p className="text-xs text-[#64748B]">Loading catalog items...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="py-16 text-center text-[#64748B]">
              <Package size={36} className="mx-auto text-gray-300 mb-2" />
              <p className="text-sm font-semibold">No products found.</p>
              <p className="text-xs text-gray-400 mt-1">
                Try refining your search filter or click &quot;Add Product&quot; to insert one.
              </p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 bg-[#F8FAFC] text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
                  <th className="py-3.5 px-5">Product</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Price (PKR)</th>
                  <th className="py-3.5 px-4">Stock Status</th>
                  <th className="py-3.5 px-4">Featured</th>
                  <th className="py-3.5 px-4">Tag</th>
                  <th className="py-3.5 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {filteredProducts.map((p) => (
                  <tr key={p._id} className="hover:bg-[#F8FAFC] transition-colors">
                    <td className="py-3 px-5">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 relative rounded-xl bg-gray-50 border border-gray-200 overflow-hidden shrink-0 flex items-center justify-center">
                          {p.img ? (
                            <Image
                              src={p.img}
                              alt={p.name}
                              fill
                              unoptimized
                              className="object-contain p-1"
                              sizes="44px"
                            />
                          ) : (
                            <Package size={18} className="text-gray-300" />
                          )}
                        </div>
                        <div>
                          <div className="font-bold text-[#3C3837] text-xs sm:text-sm line-clamp-1">
                            {p.name}
                          </div>
                          <div className="text-[10px] text-[#64748B] font-mono">ID: #{p.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-xs font-semibold text-[#26649A] capitalize">
                      {p.category}
                    </td>
                    <td className="py-3 px-4 font-bold text-[#3C3837]">
                      <div>Rs. {p.price.toLocaleString("en-PK")}</div>
                      {p.oldPrice && (
                        <div className="text-[10px] text-gray-400 line-through">
                          Rs. {p.oldPrice.toLocaleString("en-PK")}
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => toggleStockStatus(p)}
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border transition-colors cursor-pointer ${
                          p.inStock
                            ? "text-emerald-700 bg-emerald-50 border-emerald-200 hover:bg-emerald-100"
                            : "text-rose-700 bg-rose-50 border-rose-200 hover:bg-rose-100"
                        }`}
                        title="Click to toggle stock status"
                      >
                        {p.inStock ? (
                          <>
                            <CheckCircle2 size={12} />
                            <span>In Stock</span>
                          </>
                        ) : (
                          <>
                            <XCircle size={12} />
                            <span>Out of Stock</span>
                          </>
                        )}
                      </button>
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => toggleFeatured(p)}
                        className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                          p.featured
                            ? "bg-amber-50 text-amber-600 border-amber-200"
                            : "bg-gray-50 text-gray-400 border-gray-200 hover:text-amber-500"
                        }`}
                        title={p.featured ? "Featured on homepage" : "Set as featured"}
                      >
                        <Star size={14} fill={p.featured ? "currentColor" : "none"} />
                      </button>
                    </td>
                    <td className="py-3 px-4">
                      {p.tag ? (
                        <span className="inline-block bg-[#00C2D1]/15 text-[#1C4B75] border border-[#00C2D1]/30 px-2 py-0.5 rounded-md text-[10px] font-bold">
                          {p.tag}
                        </span>
                      ) : (
                        <span className="text-gray-400 text-xs">—</span>
                      )}
                    </td>
                    <td className="py-3 px-5 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => openEditModal(p)}
                          className="p-1.5 text-[#26649A] hover:bg-[#26649A]/10 rounded-lg transition-colors cursor-pointer"
                          title="Edit product"
                        >
                          <Edit2 size={15} />
                        </button>
                        <button
                          disabled={deletingId === p._id}
                          onClick={() => handleDelete(p._id)}
                          className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
                          title="Delete product"
                        >
                          {deletingId === p._id ? (
                            <Loader2 size={15} className="animate-spin text-red-500" />
                          ) : (
                            <Trash2 size={15} />
                          )}
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

      {/* Add / Edit Product Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#00C2D1]/20 text-[#00AAB8] flex items-center justify-center">
                  {editingProduct ? <Edit2 size={16} /> : <Plus size={18} />}
                </div>
                <div>
                  <h3 className="font-bold text-[#3C3837] text-base">
                    {editingProduct ? "Edit Product" : "Add New Product"}
                  </h3>
                  <p className="text-[11px] text-[#64748B]">
                    {editingProduct
                      ? "Update product pricing and specifications"
                      : "Fill in details to publish to the store"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {error && (
              <div className="my-3 p-3 rounded-xl bg-red-50 text-red-700 text-xs border border-red-200">
                {error}
              </div>
            )}

            <form onSubmit={handleSaveProduct} className="space-y-4 mt-4">
              <div>
                <label className="block text-xs font-bold text-[#3C3837] mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 65W Fast Charger SuperVOOC"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-xl border border-gray-200 bg-[#F8FAFC] py-2.5 px-3 text-xs outline-none focus:border-[#00C2D1] focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#3C3837] mb-1">
                    Price (PKR) *
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="1500"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 bg-[#F8FAFC] py-2.5 px-3 text-xs outline-none focus:border-[#00C2D1] focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#3C3837] mb-1">
                    Old Price (PKR)
                  </label>
                  <input
                    type="number"
                    placeholder="2000"
                    value={formData.oldPrice}
                    onChange={(e) => setFormData({ ...formData, oldPrice: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 bg-[#F8FAFC] py-2.5 px-3 text-xs outline-none focus:border-[#00C2D1] focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#3C3837] mb-1">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 bg-[#F8FAFC] py-2.5 px-3 text-xs outline-none focus:border-[#00C2D1] focus:bg-white"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#3C3837] mb-1">Tag (Badge)</label>
                  <input
                    type="text"
                    placeholder="Popular / New / 20% Off"
                    value={formData.tag}
                    onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 bg-[#F8FAFC] py-2.5 px-3 text-xs outline-none focus:border-[#00C2D1] focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#3C3837] mb-1">
                  Image Path / URL
                </label>
                <input
                  type="text"
                  placeholder="/imagegs/products/1.jfif or https://..."
                  value={formData.img}
                  onChange={(e) => setFormData({ ...formData, img: e.target.value })}
                  className="w-full rounded-xl border border-gray-200 bg-[#F8FAFC] py-2.5 px-3 text-xs outline-none focus:border-[#00C2D1] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#3C3837] mb-1">Description</label>
                <textarea
                  rows={3}
                  placeholder="Detailed product specifications, warranty and compatibility..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full rounded-xl border border-gray-200 bg-[#F8FAFC] py-2.5 px-3 text-xs outline-none focus:border-[#00C2D1] focus:bg-white"
                />
              </div>

              <div className="flex items-center gap-6 pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-[#3C3837]">
                  <input
                    type="checkbox"
                    checked={formData.inStock}
                    onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                    className="accent-[#00C2D1] w-4 h-4 rounded"
                  />
                  <span>In Stock</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-[#3C3837]">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="accent-[#00C2D1] w-4 h-4 rounded"
                  />
                  <span>Featured on Homepage</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-gray-200 text-[#64748B] hover:bg-gray-50 text-xs font-semibold cursor-pointer"
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
                    <span>{editingProduct ? "Save Changes" : "Publish Product"}</span>
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
