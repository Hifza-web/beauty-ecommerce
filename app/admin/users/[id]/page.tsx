"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import api from "@/lib/api";

type Customer = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
};

type Order = {
  _id: string;
  totalAmount: number;
  orderStatus: string;
  paymentStatus: string;
  createdAt: string;
  items: {
    product?: {
      name?: string;
    };
    quantity: number;
  }[];
};

export default function CustomerDetails() {
  const params = useParams();
  const id = params.id as string;

  const [customer, setCustomer] = useState<Customer | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const res = await api.get(`/admin/users/${id}`);

        setCustomer(res.data.user);
        setOrders(res.data.orders || []);
      } catch (error) {
        console.error("Failed to fetch customer:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCustomer();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8f6f3] px-6 py-10 text-[#403633]">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-sm text-[#927d77]">
            Loading customer...
          </p>
        </div>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="min-h-screen bg-[#f8f6f3] px-6 py-10 text-[#403633]">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm text-[#927d77]">
            Customer not found.
          </p>

          <Link
            href="/admin/users"
            className="mt-4 inline-block text-sm text-[#b4676d] hover:underline"
          >
            ← Back to Customers
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f6f3] px-6 py-10 text-[#403633]">
      <div className="mx-auto max-w-6xl">

        {/* Back */}
        <Link
          href="/admin/users"
          className="text-sm text-[#b4676d] hover:underline"
        >
          ← Back to Customers
        </Link>

        {/* Heading */}
        <div className="mt-8">
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#b4676d]">
            Administration
          </p>

          <h1 className="mt-1 font-[Marcellus] text-4xl">
            Customer Details
          </h1>

          <p className="mt-2 text-sm text-[#887771]">
            View customer information and order history.
          </p>
        </div>

        {/* Customer Information */}
        <div className="mt-8 grid gap-5 sm:grid-cols-3">

          {/* Customer */}
          <div className="rounded-2xl border border-[#e6ddd8] bg-white p-6 shadow-sm">
            <p className="text-xs uppercase tracking-wider text-[#9c8b85]">
              Customer
            </p>

            <h2 className="mt-3 font-[Marcellus] text-2xl">
              {customer.firstName} {customer.lastName}
            </h2>

            <p className="mt-2 text-sm text-[#806e68]">
              {customer.email}
            </p>
          </div>

          {/* Total Orders */}
          <div className="rounded-2xl border border-[#e6ddd8] bg-white p-6 shadow-sm">
            <p className="text-xs uppercase tracking-wider text-[#9c8b85]">
              Total Orders
            </p>

            <p className="mt-3 font-[Marcellus] text-3xl">
              {orders.length}
            </p>

            <p className="mt-1 text-xs text-[#a18f89]">
              Orders placed by customer
            </p>
          </div>

          {/* Joined */}
          <div className="rounded-2xl border border-[#e6ddd8] bg-white p-6 shadow-sm">
            <p className="text-xs uppercase tracking-wider text-[#9c8b85]">
              Joined Date
            </p>

            <p className="mt-3 font-[Marcellus] text-2xl">
              {new Date(customer.createdAt).toLocaleDateString()}
            </p>

            <p className="mt-1 text-xs text-[#a18f89]">
              Customer registration date
            </p>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-6 rounded-2xl border border-[#e6ddd8] bg-white p-6 shadow-sm">
          <h2 className="font-[Marcellus] text-2xl">
            Customer Information
          </h2>

          <div className="mt-6 grid gap-6 sm:grid-cols-2">

            <div>
              <p className="text-xs uppercase tracking-wider text-[#9c8b85]">
                Full Name
              </p>

              <p className="mt-2 text-sm">
                {customer.firstName} {customer.lastName}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wider text-[#9c8b85]">
                Email Address
              </p>

              <p className="mt-2 text-sm">
                {customer.email}
              </p>
            </div>

          </div>
        </div>

        {/* Order History */}
        <div className="mt-6 overflow-hidden rounded-2xl border border-[#e6ddd8] bg-white shadow-sm">

          <div className="border-b border-[#eee8e5] px-6 py-5">
            <h2 className="font-[Marcellus] text-2xl">
              Order History
            </h2>

            <p className="mt-1 text-sm text-[#887771]">
              Orders placed by this customer.
            </p>
          </div>

          {orders.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <p className="text-sm text-[#927d77]">
                This customer has not placed any orders yet.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[750px]">

                <thead>
                  <tr className="border-b border-[#eee8e5] bg-[#fcfaf9] text-left">

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#9c8b85]">
                      Order
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#9c8b85]">
                      Date
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#9c8b85]">
                      Items
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#9c8b85]">
                      Total
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#9c8b85]">
                      Payment
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#9c8b85]">
                      Status
                    </th>

                  </tr>
                </thead>

                <tbody>
                  {orders.map((order) => (
                    <tr
                      key={order._id}
                      className="border-b border-[#f1ebe8] last:border-0"
                    >

                      {/* Order ID */}
                      <td className="px-6 py-5 text-sm font-medium">
                        #{order._id.slice(-6).toUpperCase()}
                      </td>

                      {/* Date */}
                      <td className="px-6 py-5 text-sm text-[#806e68]">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>

                      {/* Items */}
                      <td className="px-6 py-5 text-sm text-[#806e68]">
                        {order.items?.reduce(
                          (total, item) => total + item.quantity,
                          0
                        )}
                      </td>

                      {/* Total */}
                      <td className="px-6 py-5 text-sm font-medium text-[#403633]">
                        ${Number(order.totalAmount).toFixed(2)}
                      </td>

                      {/* Payment */}
                      <td className="px-6 py-5 text-sm text-[#806e68]">
                        {order.paymentStatus}
                      </td>

                      {/* Status */}
                      <td className="px-6 py-5">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${
                            order.orderStatus === "Delivered"
                              ? "bg-[#e8f3e9] text-[#55745a]"
                              : order.orderStatus === "Cancelled"
                                ? "bg-[#f8e9e9] text-[#a76161]"
                                : "bg-[#f5e5e3] text-[#9b6666]"
                          }`}
                        >
                          {order.orderStatus}
                        </span>
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