"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Package, ArrowLeft, Eye } from "lucide-react";
import api from "@/lib/api";

interface Product {
  _id: string;
  name: string;
  image?: string;
}

interface OrderItem {
  product: Product;
  quantity: number;
  price: number;
}

interface Order {
  _id: string;
  user?: {
    _id: string;
    firstName?: string;
    lastName?: string;
    email?: string;
  };
  items: OrderItem[];
  totalAmount: number;
  paymentMethod: string;
  paymentStatus: string;
  orderStatus: string;
  createdAt: string;
}

const statuses = [
  "Pending",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Get all orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get("/orders");

        setOrders(res.data.orders || []);
      } catch (error: any) {
        console.error("Failed to fetch orders:", error);

        setErrorMsg(
          error.response?.data?.message ||
            "Failed to load orders."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Update order status
  const handleStatusChange = async (
    orderId: string,
    newStatus: string
  ) => {
    try {
      setUpdatingId(orderId);

      const res = await api.put(
        `/orders/${orderId}/status`,
        {
          orderStatus: newStatus,
        }
      );

      setOrders((currentOrders) =>
        currentOrders.map((order) =>
          order._id === orderId
            ? {
                ...order,
                orderStatus: res.data.order.orderStatus,
              }
            : order
        )
      );
    } catch (error: any) {
      console.error("Failed to update order status:", error);

      alert(
        error.response?.data?.message ||
          "Failed to update order status."
      );
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#fcf9f6] text-[#453633]">
        {/* HEADER */}
        <section className="border-b border-[#e7dcd7] bg-[#f3e7e2]">
          <div className="mx-auto max-w-7xl px-6 py-14 md:px-10 md:py-16">
            <Link
              href="/admin"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.12em] text-[#806e68] transition hover:text-[#b65f67]"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Link>

            <p className="mt-8 text-xs font-bold uppercase tracking-[0.35em] text-[#b65f67]">
              LUMÉRA ADMIN
            </p>

            <h1 className="mt-3 font-[Marcellus] text-4xl font-light md:text-5xl">
              Manage Orders
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-[#806e68]">
              View customer orders and update their order status.
            </p>
          </div>
        </section>

        {/* ORDERS */}
        <section className="mx-auto max-w-7xl px-6 py-12 md:px-10 md:py-16">
          {loading && (
            <div className="flex min-h-[300px] items-center justify-center">
              <p className="text-sm text-[#927d77]">
                Loading orders...
              </p>
            </div>
          )}

          {!loading && errorMsg && (
            <div className="rounded-xl bg-red-50 p-5 text-center text-sm text-red-600">
              {errorMsg}
            </div>
          )}

          {!loading && !errorMsg && orders.length === 0 && (
            <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#f3e7e2]">
                <Package className="h-8 w-8 text-[#b65f67]" />
              </div>

              <h2 className="mt-7 font-[Marcellus] text-4xl">
                No orders yet
              </h2>

              <p className="mt-3 max-w-md text-[#927d77]">
                Customer orders will appear here once they are placed.
              </p>
            </div>
          )}

          {!loading && !errorMsg && orders.length > 0 && (
            <div className="space-y-6">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="rounded-2xl border border-[#e7dcd7] bg-white p-6 shadow-[0_10px_35px_rgba(69,54,51,0.05)] md:p-7"
                >
                  {/* TOP */}
                  <div className="flex flex-col gap-5 border-b border-[#e7dcd7] pb-5 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.15em] text-[#927d77]">
                        Order
                      </p>

                      <p className="mt-1 text-sm font-medium">
                        #{order._id.slice(-8).toUpperCase()}
                      </p>

                      <p className="mt-2 text-xs text-[#927d77]">
                        {new Date(
                          order.createdAt
                        ).toLocaleDateString()}
                      </p>
                    </div>

                    {/* CUSTOMER */}
                    <div className="lg:text-right">
                      <p className="text-xs uppercase tracking-[0.15em] text-[#927d77]">
                        Customer
                      </p>

                      <p className="mt-1 text-sm font-medium">
                        {order.user
                          ? `${order.user.firstName || ""} ${
                              order.user.lastName || ""
                            }`.trim()
                          : "Customer"}
                      </p>

                      <p className="mt-1 text-xs text-[#927d77]">
                        {order.user?.email || "No email"}
                      </p>
                    </div>
                  </div>

                  {/* PRODUCTS */}
                  <div className="mt-6 space-y-4">
                    {order.items.map((item, index) => (
                      <div
                        key={`${order._id}-${index}`}
                        className="flex items-center gap-4"
                      >
                        <div className="h-16 w-14 shrink-0 overflow-hidden rounded-lg bg-[#f3e7e2]">
                          {item.product?.image ? (
                            <img
                              src={item.product.image.startsWith("http") || item.product.image.startsWith("/") ? item.product.image : `/${item.product.image}`}
                              alt={item.product.name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center">
                              <Package className="h-5 w-5 text-[#b65f67]" />
                            </div>
                          )}
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium">
                            {item.product?.name || "Product"}
                          </p>

                          <p className="mt-1 text-xs text-[#927d77]">
                            Quantity: {item.quantity}
                          </p>
                        </div>

                        <p className="text-sm font-medium">
                          $
                          {(
                            item.price * item.quantity
                          ).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* BOTTOM */}
                  <div className="mt-6 flex flex-col gap-5 border-t border-[#e7dcd7] pt-5 lg:flex-row lg:items-center lg:justify-between">
                    {/* PAYMENT */}
                    <div>
                      <p className="text-xs uppercase tracking-[0.15em] text-[#927d77]">
                        Payment
                      </p>

                      <p className="mt-2 text-sm">
                        {order.paymentMethod}
                      </p>

                      <p className="mt-1 text-xs text-[#927d77]">
                        Payment Status:{" "}
                        {order.paymentStatus}
                      </p>
                    </div>

                    {/* STATUS */}
                    <div>
                      <p className="text-xs uppercase tracking-[0.15em] text-[#927d77]">
                        Order Status
                      </p>

                      <select
                        value={order.orderStatus}
                        disabled={updatingId === order._id}
                        onChange={(e) =>
                          handleStatusChange(
                            order._id,
                            e.target.value
                          )
                        }
                        className="mt-2 rounded-xl border border-[#d8c4bd] bg-[#fcf9f6] px-4 py-2.5 text-sm outline-none transition focus:border-[#b65f67] disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {statuses.map((status) => (
                          <option
                            key={status}
                            value={status}
                          >
                            {status}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* TOTAL + VIEW */}
                    <div className="flex items-center justify-between gap-6 lg:justify-end">
                      <div>
                        <p className="text-xs text-[#927d77]">
                          Order Total
                        </p>

                        <p className="mt-1 font-[Marcellus] text-xl">
                          $
                          {order.totalAmount.toFixed(2)}
                        </p>
                      </div>

                      <Link
                        href={`/orders/${order._id}`}
                        className="flex items-center gap-2 rounded-full border border-[#d8c4bd] px-5 py-3 text-xs uppercase tracking-[0.12em] transition hover:border-[#b65f67] hover:text-[#b65f67]"
                      >
                        <Eye className="h-4 w-4" />
                        View
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}