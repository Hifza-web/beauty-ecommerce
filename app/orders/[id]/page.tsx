"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, Package, ShoppingBag, Download } from "lucide-react";
import { useParams } from "next/navigation";
import api from "@/lib/api";
import { useAuth } from "@/components/AuthContext";

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
  items: OrderItem[];
  totalAmount: number;
  paymentMethod: string;
  orderStatus: string;
  shippingAddress: {
    fullName: string;
    address: string;
    city: string;
    postalCode: string;
  };
  createdAt: string;
}

export default function OrderDetailsPage() {
  const params = useParams();
  const { userId } = useAuth();

  const orderId = params.id as string;

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      if (!userId || !orderId) {
        setLoading(false);
        return;
      }

      try {
        const res = await api.get(`/orders/${orderId}`);

        setOrder(res.data.order);
      } catch (error: any) {
        console.error("Failed to fetch order:", error);

        setErrorMsg(
          error.response?.data?.message || "Failed to load order details.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [userId, orderId]);

  if (loading) {
    return (
      <>
        <Navbar />

        <main className="flex min-h-screen items-center justify-center bg-[#fcf9f6] text-[#453633]">
          <p className="text-sm text-[#927d77]">Loading order details...</p>
        </main>

        <Footer />
      </>
    );
  }

  if (errorMsg || !order) {
    return (
      <>
        <Navbar />

        <main className="flex min-h-screen flex-col items-center justify-center bg-[#fcf9f6] px-6 text-center text-[#453633]">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#f3e7e2]">
            <Package className="h-8 w-8 text-[#b65f67]" />
          </div>

          <h1 className="mt-7 font-[Marcellus] text-4xl">Order Not Found</h1>

          <p className="mt-3 text-[#927d77]">
            {errorMsg || "We couldn't find this order."}
          </p>

          <Link
            href="/orders"
            className="mt-8 flex items-center gap-2 rounded-full bg-[#453633] px-7 py-4 text-sm uppercase tracking-[0.15em] text-white transition hover:bg-[#b65f67]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Orders
          </Link>
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
          <div className="mx-auto max-w-7xl px-6 py-14 md:px-10 md:py-18">
            <Link
              href="/orders"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-[#806e68] transition hover:text-[#b65f67]"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Orders
            </Link>

            <div className="mt-8">
              <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#b65f67]">
                LUMÉRA BEAUTY
              </p>

              <h1 className="mt-3 font-[Marcellus] text-4xl font-light md:text-5xl">
                Order Details
              </h1>

              <p className="mt-3 text-sm text-[#927d77]">
                Order #{order._id.slice(-8).toUpperCase()}
              </p>
            </div>
          </div>
        </section>

        {/* CONTENT */}
        <section className="mx-auto max-w-6xl px-6 py-12 md:px-10 md:py-16">
          <div className="grid gap-8 lg:grid-cols-[1fr_350px]">
            {/* LEFT */}
            <div className="space-y-8">
              {/* ORDER STATUS */}
              <section className="rounded-2xl border border-[#e7dcd7] bg-white p-7">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.15em] text-[#927d77]">
                      Order Status
                    </p>

                    <span className="mt-3 inline-block rounded-full bg-[#f3e7e2] px-5 py-2 text-xs font-medium text-[#b65f67]">
                      {order.orderStatus}
                    </span>
                  </div>

                  <div className="sm:text-right">
                    <p className="text-xs uppercase tracking-[0.15em] text-[#927d77]">
                      Order Date
                    </p>

                    <p className="mt-2 text-sm">
                      {new Date(order.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <a
                    href={`http://localhost:5000/api/orders/${order._id}/invoice`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#453633] px-5 py-3 text-xs uppercase tracking-[0.12em] text-white transition hover:bg-[#b65f67]"
                  >
                    <Download className="h-4 w-4" />
                    Download Invoice
                  </a>
                </div>
              </section>

              {/* PRODUCTS */}
              <section className="rounded-2xl border border-[#e7dcd7] bg-white p-7">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f3e7e2]">
                    <ShoppingBag className="h-4 w-4 text-[#b65f67]" />
                  </div>

                  <h2 className="font-[Marcellus] text-2xl">Ordered Items</h2>
                </div>

                <div className="mt-7 divide-y divide-[#e7dcd7]">
                  {order.items.map((item, index) => (
                    <div
                      key={`${item.product?._id || "product"}-${index}`}
                      className="flex gap-5 py-5 first:pt-0 last:pb-0"
                    >
                      <div className="h-24 w-20 shrink-0 overflow-hidden rounded-xl bg-[#f3e7e2]">
                        {item.product?.image ? (
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center">
                            <ShoppingBag className="h-6 w-6 text-[#b65f67]" />
                          </div>
                        )}
                      </div>

                      <div className="flex min-w-0 flex-1 flex-col justify-center">
                        <p className="text-sm font-medium">
                          {item.product?.name || "Product"}
                        </p>

                        <p className="mt-2 text-xs text-[#927d77]">
                          Quantity: {item.quantity}
                        </p>

                        <p className="mt-1 text-xs text-[#927d77]">
                          Unit Price: ${item.price.toFixed(2)}
                        </p>
                      </div>

                      <div className="flex items-center">
                        <p className="text-sm font-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* RIGHT */}
            <aside className="space-y-8">
              {/* SUMMARY */}
              <section className="h-fit rounded-2xl border border-[#e7dcd7] bg-white p-7 shadow-[0_10px_35px_rgba(69,54,51,0.05)]">
                <h2 className="font-[Marcellus] text-2xl">Order Summary</h2>

                <div className="mt-7 space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#927d77]">Items</span>

                    <span>
                      {order.items.reduce(
                        (total, item) => total + item.quantity,
                        0,
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-[#927d77]">Payment</span>

                    <span>{order.paymentMethod}</span>
                  </div>

                  <div className="flex justify-between border-t border-[#e7dcd7] pt-5">
                    <span className="font-[Marcellus] text-xl">Total</span>

                    <span className="text-xl font-medium">
                      ${order.totalAmount.toFixed(2)}
                    </span>
                  </div>
                </div>
              </section>

              {/* SHIPPING */}
              <section className="rounded-2xl border border-[#e7dcd7] bg-white p-7">
                <h2 className="font-[Marcellus] text-2xl">Shipping Address</h2>

                <div className="mt-6 space-y-2 text-sm leading-6">
                  <p className="font-medium">
                    {order.shippingAddress.fullName}
                  </p>

                  <p className="text-[#806e68]">
                    {order.shippingAddress.address}
                  </p>

                  <p className="text-[#806e68]">
                    {order.shippingAddress.city},{" "}
                    {order.shippingAddress.postalCode}
                  </p>
                </div>
              </section>
            </aside>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
