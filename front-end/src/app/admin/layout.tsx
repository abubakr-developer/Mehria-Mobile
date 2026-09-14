import type { ReactNode } from "react";
import Link from "next/link";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <div className="flex min-h-screen">
        <aside className="w-72 border-r border-slate-800 bg-slate-900 p-6">
          <div className="mb-10">
            <Link href="/admin" className="text-2xl font-black tracking-tight text-cyan-300">
              Mehria CMS
            </Link>
          </div>
          <nav className="space-y-2">
            <Link className="block rounded px-4 py-3 hover:bg-slate-800" href="/admin">Dashboard</Link>
            <Link className="block rounded px-4 py-3 hover:bg-slate-800" href="/admin/products">Products</Link>
            <Link className="block rounded px-4 py-3 hover:bg-slate-800" href="/admin/categories">Categories</Link>
            <Link className="block rounded px-4 py-3 hover:bg-slate-800" href="/admin/orders">Orders</Link>
            <Link className="block rounded px-4 py-3 hover:bg-slate-800" href="/admin/inquiries">Inquiries</Link>
            <Link className="block rounded px-4 py-3 hover:bg-slate-800" href="/admin/users">Users</Link>
            <Link className="block rounded px-4 py-3 hover:bg-slate-800" href="/admin/settings">Settings</Link>
          </nav>
        </aside>
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
