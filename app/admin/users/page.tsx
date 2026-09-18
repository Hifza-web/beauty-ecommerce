"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import Link from "next/link";

type User = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
  orderCount: number;
};

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/admin/users");
      setUsers(res.data.users || []);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-[#f8f6f3] px-6 py-10 text-[#403633]">
      <div className="mx-auto max-w-5xl">
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#b4676d]">
          Administration
        </p>

        <h1 className="mt-1 font-[Marcellus] text-4xl">Customers</h1>

        <p className="mt-2 text-sm text-[#887771]">
          View registered customers of your LUMÉRA store.
        </p>
        <div className="mt-6 w-fit rounded-2xl border border-[#e6ddd8] bg-white px-6 py-5 shadow-sm">
          <p className="text-xs uppercase tracking-wider text-[#9c8b85]">
            Total Customers
          </p>

          <p className="mt-2 font-[Marcellus] text-3xl text-[#403633]">
            {users.length}
          </p>
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl border border-[#e6ddd8] bg-white shadow-sm">
          {loading ? (
            <p className="px-6 py-10 text-center text-sm text-[#927d77]">
              Loading customers...
            </p>
          ) : users.length === 0 ? (
            <p className="px-6 py-10 text-center text-sm text-[#927d77]">
              No customers found.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#eee8e5] bg-[#fcfaf9] text-left">
                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#9c8b85]">
                      Name
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#9c8b85]">
                      Email
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#9c8b85]">
                      Orders
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#9c8b85]">
                      Joined Date
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#9c8b85]">
                      View
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {users.map((user) => (
                    <tr
                      key={user._id}
                      className="border-b border-[#f1ebe8] last:border-0"
                    >
                      <td className="px-6 py-5 text-sm font-medium">
                        {user.firstName} {user.lastName}
                      </td>

                      <td className="px-6 py-5 text-sm text-[#806e68]">
                        {user.email}
                      </td>

                      <td className="px-6 py-5 text-sm text-[#806e68]">
                        {user.orderCount}
                      </td>

                      <td className="px-6 py-5 text-sm text-[#806e68]">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>

                      <td className="px-6 py-5">
                        <Link
                          href={`/admin/users/${user._id}`}
                          className="text-sm text-[#b4676d] hover:underline"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
