"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Package, ShoppingBag, ArrowRight } from "lucide-react";
import { useAuth } from "@/components/AuthContext";
import api from "@/lib/api";
import { io } from "socket.io-client";

interface OrderItem {
  product: {
    _id: string;
    name: string;
    image?: string;
  };
  quantity: number;
  price: number;
}

interface Order {
  _id: string;
  items: OrderItem[];
  totalAmount: number;
  paymentMethod: string;
  orderStatus: string;
  createdAt: string;
}

export default function OrdersPage() {
  const { userId } = useAuth();
  const [statusUpdate, setStatusUpdate] = useState<any>(null);
const [showStatusModal, setShowStatusModal] = useState(false);

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        const res = await api.get(`/orders/user/${userId}`);
        setOrders(res.data.orders || []);
      } catch (error: any) {
        console.error("Failed to fetch orders:", error);

        setErrorMsg(
          error.response?.data?.message ||
            "Failed to load your orders."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

  // Socket.io connection for Customer
  useEffect(() => {
    console.log("OrdersPage socket useEffect running! userId:", userId);

    if (!userId) {
      console.log("No userId, skipping socket connection");
      return;
    }

    console.log("Attempting to connect to socket at http://localhost:5000...");
    const socket = io("http://localhost:5000", {
      transports: ["websocket", "polling"],
    });

    socket.on("connect", () => {
      console.log("🟢 SUCCESS: Socket connected for Customer! ID:", socket.id);
      
      // Join the user's specific room
      console.log("Joining room for user:", userId);
      socket.emit("joinUserRoom", userId);
    });

    socket.on("connect_error", (error) => {
      console.log("🔴 ERROR: Socket connection failed!", error);
    });

    socket.on("orderStatusUpdated", (data) => {
      console.log("Order status updated:", data.message);
      setStatusUpdate(data);
setShowStatusModal(true);
      
      // Update the specific order in the UI
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === data.orderId
            ? { ...order, orderStatus: data.status }
            : order
        )
      );
    });

    return () => {
      socket.disconnect();
    };
  }, [userId]);

  if (!userId) {
    return (
      <>
        <Navbar />

        <main className="min-h-screen bg-[#fcf9f6] text-[#453633]">
          <section className="border-b border-[#e7dcd7] bg-[#f3e7e2]">
            <div className="mx-auto max-w-7xl px-6 py-16 text-center md:px-10 md:py-20">
              <p className="text-xs uppercase tracking-[0.35em] text-[#b65f67]">
                LUMÉRA BEAUTY
              </p>

              <h1 className="mt-4 font-[Marcellus] text-5xl font-light md:text-6xl">
                My Orders
              </h1>
            </div>
          </section>

          <section className="flex min-h-[500px] flex-col items-center justify-center px-6 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#f3e7e2]">
              <Package className="h-8 w-8 text-[#b65f67]" />
            </div>

            <h2 className="mt-7 font-[Marcellus] text-4xl">
              Please sign in
            </h2>

            <p className="mt-3 max-w-md text-[#927d77]">
              Sign in to view your order history.
            </p>

            <Link
              href="/login?redirect=/orders"
              className="mt-8 rounded-full bg-[#453633] px-8 py-4 text-sm uppercase tracking-[0.18em] text-white transition hover:bg-[#b65f67]"
            >
              Sign In
            </Link>
          </section>
        </main>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#fcf9f6] text-[#453633]">
        {/* HEADER */}
        <section className="border-b border-[#e7dcd7] bg-[#f3e7e2]">
          <div className="mx-auto max-w-7xl px-6 py-16 text-center md:px-10 md:py-20">
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#b65f67]">
              LUMÉRA BEAUTY
            </p>

            <h1 className="mt-4 font-[Marcellus] text-5xl font-light md:text-6xl">
              My Orders
            </h1>

            <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-[#806e68]">
              View and track all your LUMÉRA beauty orders in one place.
            </p>
          </div>
        </section>

        {/* ORDERS */}
        <section className="mx-auto max-w-5xl px-6 py-14 md:px-10 md:py-20">
          {loading && (
            <div className="flex min-h-[300px] items-center justify-center">
              <p className="text-sm text-[#927d77]">
                Loading your orders...
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
                <ShoppingBag className="h-8 w-8 text-[#b65f67]" />
              </div>

              <h2 className="mt-7 font-[Marcellus] text-4xl">
                No orders yet
              </h2>

              <p className="mt-3 max-w-md text-[#927d77]">
                You haven't placed any orders yet. Discover something beautiful
                from our collection.
              </p>

              <Link
                href="/shop"
                className="mt-8 rounded-full bg-[#453633] px-8 py-4 text-sm uppercase tracking-[0.18em] text-white transition hover:bg-[#b65f67]"
              >
                Start Shopping
              </Link>
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
                  <div className="flex flex-col gap-4 border-b border-[#e7dcd7] pb-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.15em] text-[#927d77]">
                        Order
                      </p>

                      <p className="mt-1 text-sm font-medium">
                        #{order._id.slice(-8).toUpperCase()}
                      </p>
                    </div>

                    <div className="text-left sm:text-right">
                      <p className="text-xs text-[#927d77]">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>

                      <p className="mt-1 text-sm font-medium">
                        {order.paymentMethod}
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
                              <ShoppingBag className="h-5 w-5 text-[#b65f67]" />
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
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* BOTTOM */}
                  <div className="mt-6 flex flex-col gap-5 border-t border-[#e7dcd7] pt-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.15em] text-[#927d77]">
                        Status
                      </p>

                      <span className="mt-2 inline-block rounded-full bg-[#f3e7e2] px-4 py-2 text-xs font-medium text-[#b65f67]">
                        {order.orderStatus}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-8 sm:justify-end">
                      <div>
                        <p className="text-xs text-[#927d77]">
                          Order Total
                        </p>

                        <p className="mt-1 font-[Marcellus] text-xl">
                          ${order.totalAmount.toFixed(2)}
                        </p>
                      </div>

                      <Link
                        href={`/orders/${order._id}`}
                        className="flex items-center gap-2 rounded-full border border-[#d8c4bd] px-5 py-3 text-xs uppercase tracking-[0.12em] transition hover:border-[#b65f67] hover:text-[#b65f67]"
                      >
                        View Order
                        <ArrowRight className="h-4 w-4" />
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
      {showStatusModal && statusUpdate && (
  <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
    <div className="w-[90%] max-w-md rounded-2xl bg-white p-8 text-center shadow-2xl">
      <div className="mb-4 text-4xl">📦</div>

      <h2 className="mb-3 text-2xl font-semibold text-[#4b3838]">
        Order Status Updated
      </h2>

      <p className="mb-4 text-[#6f5b57]">
        {statusUpdate.message}
      </p>

      <p className="mb-6 text-lg font-semibold text-[#b65f67]">
        Status: {statusUpdate.status}
      </p>

      <button
        onClick={() => {
          setShowStatusModal(false);
          setStatusUpdate(null);
        }}
        className="rounded-lg bg-[#4b3838] px-8 py-3 text-sm font-medium text-white transition hover:bg-[#6b5050]"
      >
        OK
      </button>
    </div>
  </div>
)}
    </>
  );
}