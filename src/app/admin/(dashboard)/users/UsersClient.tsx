"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createUser, type AdminManagedRole } from "./actions";

export type UserRow = {
  userId: string;
  email: string | null;
  role: string | null;
};

type Props = {
  initialUsers: UserRow[];
};

const ROLE_OPTIONS: Array<{ value: AdminManagedRole; label: string }> = [
  { value: "marketing", label: "Marketing" },
  { value: "tata_usaha", label: "Tata Usaha" },
  { value: "pimpinan", label: "Pimpinan" },
];

export default function UsersClient({ initialUsers }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [modalOpen, setModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState<AdminManagedRole>("marketing");
  const [message, setMessage] = useState<string | null>(null);

  const users = useMemo(() => initialUsers ?? [], [initialUsers]);

  function resetForm() {
    setEmail("");
    setPassword("");
    setFullName("");
    setRole("marketing");
  }

  function closeModal() {
    setModalOpen(false);
    setMessage(null);
    resetForm();
  }

  async function onSubmit() {
    setMessage(null);

    startTransition(async () => {
      const result = await createUser({ email, password, fullName, role });
      setMessage(result.message);

      if (result.ok) {
        closeModal();
        router.refresh();
      }
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900">Manajemen User</h1>
          <p className="mt-1 text-sm text-slate-500">Khusus role Pimpinan.</p>
        </div>

        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
        >
          Tambah User Baru
        </button>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="border-b border-slate-100 px-6 py-4">
          <h2 className="text-sm font-bold text-slate-900">Daftar User Admin</h2>
          <p className="mt-0.5 text-xs text-slate-500">Menampilkan data dari admin_users + email dari auth.</p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs font-bold uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">User ID</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.length === 0 ? (
                <tr>
                  <td className="px-6 py-6 text-slate-500" colSpan={3}>
                    Belum ada user.
                  </td>
                </tr>
              ) : (
                users.map((u) => (
                  <tr key={u.userId} className="hover:bg-slate-50/60">
                    <td className="px-6 py-4 font-medium text-slate-900">{u.email ?? "-"}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex rounded-full bg-slate-900/5 px-3 py-1 text-xs font-bold text-slate-700">
                        {(u.role ?? "admin").replaceAll("_", " ")}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-mono text-xs text-slate-500">{u.userId}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg rounded-3xl bg-white shadow-xl border border-slate-200">
            <div className="flex items-start justify-between border-b border-slate-100 px-6 py-4">
              <div>
                <h3 className="text-lg font-black text-slate-900">Tambah User Baru</h3>
                <p className="mt-0.5 text-xs text-slate-500">Akun dibuat tanpa verifikasi email.</p>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="rounded-xl px-3 py-2 text-sm font-bold text-slate-500 hover:bg-slate-100"
                aria-label="Tutup"
                title="Tutup"
              >
                ✕
              </button>
            </div>

            <div className="px-6 py-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Email</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-400"
                  placeholder="nama@domain.com"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Password</label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-400"
                  placeholder="Minimal 6 karakter"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Nama Lengkap</label>
                <input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  type="text"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-400"
                  placeholder="Nama Karyawan"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as AdminManagedRole)}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-400"
                >
                  {ROLE_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              {message && (
                <div className="rounded-2xl bg-slate-50 border border-slate-200 px-4 py-3 text-sm text-slate-700">
                  {message}
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-2 border-t border-slate-100 px-6 py-4">
              <button
                type="button"
                onClick={closeModal}
                className="rounded-xl px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-100"
                disabled={isPending}
              >
                Batal
              </button>
              <button
                type="button"
                onClick={onSubmit}
                className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-slate-800 disabled:opacity-60"
                disabled={isPending}
              >
                {isPending ? "Membuat..." : "Buat User"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
