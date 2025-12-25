"use client";

import { useState } from "react";
import { PlusCircle, Trash2, Edit, User, Loader2 } from "lucide-react";
import { AdminUser } from "./types";
// import { addUser, updateUser, deleteUser } from "./actions";

export default function UserList({ users: initialUsers }: { users: AdminUser[] }) {
  const [users, setUsers] = useState(initialUsers);
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <div>
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/90 px-4 h-11 text-sm font-bold text-slate-900 shadow-sm transition hover:bg-white"
        >
          <PlusCircle className="h-4 w-4" />
          Add User
        </button>
      </div>

      {showAddForm && <AddUserForm onUserAdded={(user) => {
        setUsers([user, ...users]);
        setShowAddForm(false);
      }} />}

      <div className="rounded-2xl border border-white/10 bg-white/5">
        <table className="w-full text-left text-white">
          <thead className="text-xs font-semibold uppercase tracking-widest text-white/60">
            <tr>
              <th className="p-4">User ID</th>
              <th className="p-4">Email</th>
              <th className="p-4">Role</th>
              <th className="p-4">Created At</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {users.map((user) => (
              <tr key={user.user_id}>
                <td className="p-4 font-mono text-sm">{user.user_id.slice(0, 8)}...</td>
                <td className="p-4">{user.email}</td>
                <td className="p-4">{user.role}</td>
                <td className="p-4">{new Date(user.created_at).toLocaleDateString()}</td>
                <td className="p-4 text-right">
                  <button className="p-2 text-white/70 hover:text-white">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-white/70 hover:text-ferrari">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AddUserForm({ onUserAdded }: { onUserAdded: (user: AdminUser) => void }) {
    // const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(formData: FormData) {
        setError(null);
        // startTransition(async () => {
        //     const result = await addUser(formData);
        //     if (result.ok) {
        //         onUserAdded(result.user!);
        //     } else {
        //         setError(result.error ?? "Failed to add user.");
        //     }
        // });
    }

  return (
    <form action={handleSubmit} className="mb-6 rounded-2xl border border-white/10 bg-white/5 p-6">
      <h2 className="text-xl font-bold text-white">Add New User</h2>
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="text-xs font-semibold text-white/70" htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="mt-1 h-11 w-full appearance-none rounded-xl border border-white/10 bg-white/10 px-4 text-sm font-semibold text-white outline-none transition focus:border-white/30 focus:bg-white/15"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-white/70" htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="mt-1 h-11 w-full appearance-none rounded-xl border border-white/10 bg-white/10 px-4 text-sm font-semibold text-white outline-none transition focus:border-white/30 focus:bg-white/15"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-white/70" htmlFor="role">Role</label>
          <select
            id="role"
            name="role"
            required
            className="mt-1 h-11 w-full appearance-none rounded-xl border border-white/10 bg-white/10 px-4 text-sm font-semibold text-white outline-none transition focus:border-white/30 focus:bg-white/15"
          >
            <option value="marketing">Marketing</option>
            <option value="tata_usaha">Tata Usaha</option>
            <option value="pimpinan">Pimpinan</option>
            <option value="tour_leader">Tour Leader</option>
          </select>
        </div>
      </div>
      <div className="mt-4 flex justify-end gap-4">
        <button
          type="submit"
        //   disabled={isPending}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/90 px-4 h-11 text-sm font-bold text-slate-900 shadow-sm transition hover:bg-white disabled:opacity-70"
        >
          {/* {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <PlusCircle className="h-4 w-4" />} */}
          Add User
        </button>
      </div>
    </form>
  );
}
