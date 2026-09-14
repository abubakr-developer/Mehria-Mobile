export default function AdminProductsPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-black">Products CMS</h1>
        <button className="rounded-lg bg-cyan-300 px-4 py-2 font-bold text-slate-950">Add Product</button>
      </div>
      <div className="rounded-xl border border-slate-700 p-5">
        <div className="text-slate-400">Products table</div>
      </div>
    </div>
  );
}
