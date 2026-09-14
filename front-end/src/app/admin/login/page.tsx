"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@mehriamobiles.com");
  const [password, setPassword] = useState("Admin@123456");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.error || "Login failed");
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("Unable to connect to the authentication server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-50">
      <div className="w-full max-w-md rounded-2xl border border-slate-700 p-8">
        <div className="mb-8">
          <div className="text-center text-3xl font-black text-cyan-300">Mehria CMS</div>
          <div className="mt-2 text-center text-sm text-slate-400">Admin Login</div>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="mb-2 block text-sm text-slate-400">Email</label>
            <input
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div>
            <label className="mb-2 block text-sm text-slate-400">Password</label>
            <input
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type="password"
            />
          </div>

          {error ? (
            <div className="rounded-lg border border-red-400 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              {error}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-cyan-400 px-4 py-3 font-bold text-slate-950 disabled:opacity-70"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </main>
  );
}
