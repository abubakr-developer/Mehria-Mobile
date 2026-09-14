export default function AdminDashboardPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-black">Dashboard Overview</h1>
      <div className="grid grid-cols-4 gap-4">
        <div className="rounded-xl border border-slate-700 p-5"><div className="text-slate-400">Revenue</div><div className="text-2xl font-bold">PKR 0</div></div>
        <div className="rounded-xl border border-slate-700 p-5"><div className="text-slate-400">Orders</div><div className="text-2xl font-bold">0</div></div>
        <div className="rounded-xl border border-slate-700 p-5"><div className="text-slate-400">Low Stock</div><div className="text-2xl font-bold">0</div></div>
        <div className="rounded-xl border border-slate-700 p-5"><div className="text-slate-400">Unread Inquiries</div><div className="text-2xl font-bold">0</div></div>
      </div>
    </div>
  );
}
