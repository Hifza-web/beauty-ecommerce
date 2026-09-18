"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/lib/api";
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Users,
  Tags,
  Bell,
  DollarSign,
  TrendingUp,
  Clock3,
  Truck,
  CheckCircle2,
  XCircle,
  ChevronDown,
  Menu,
  X,
  ArrowUpRight,
} from "lucide-react";

type Order = {
  _id: string;
  totalAmount: number;
  orderStatus: string;
  paymentStatus?: string;
  createdAt: string;
  user?: {
    firstName?: string;
    lastName?: string;
    email?: string;
  };
  items?: {
    quantity: number;
    product?: {
      name?: string;
    };
  }[];
};

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalProducts: 0,
    totalCustomers: 0,
    totalSales: 0,
  });

  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [orderSummary, setOrderSummary] = useState({
    Pending: 0,
    Processing: 0,
    Shipped: 0,
    Delivered: 0,
    Cancelled: 0,
  });

  const [monthlySales, setMonthlySales] = useState<number[]>(Array(12).fill(0));
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dateRange, setDateRange] = useState("30");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get(`/admin/dashboard?range=${dateRange}`);

        setStats(res.data.stats);
        setOrderSummary(res.data.orderSummary);
        setMonthlySales(res.data.monthlySales || Array(12).fill(0));
        setRecentOrders(res.data.recentOrders || []);
      } catch (error) {
        console.error("Failed to fetch dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [dateRange]);

  const statusStyle = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-[#e8f2eb] text-[#55765d]";

      case "Shipped":
        return "bg-[#e9f0f5] text-[#557184]";

      case "Processing":
        return "bg-[#f6efe1] text-[#9a7944]";

      case "Cancelled":
        return "bg-[#f8e9e9] text-[#a76161]";

      default:
        return "bg-[#f5e8e5] text-[#ad6269]";
    }
  };

  const statusIcon = (status: string) => {
    if (status === "Delivered") {
      return <CheckCircle2 className="h-3.5 w-3.5" />;
    }

    if (status === "Shipped") {
      return <Truck className="h-3.5 w-3.5" />;
    }

    if (status === "Cancelled") {
      return <XCircle className="h-3.5 w-3.5" />;
    }

    return <Clock3 className="h-3.5 w-3.5" />;
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const navItems = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
    },
    {
      name: "Orders",
      href: "/admin/orders",
      icon: ShoppingBag,
    },
    {
      name: "Products",
      href: "/admin/products",
      icon: Package,
    },
    {
      name: "Customers",
      href: "/admin/users",
      icon: Users,
    },
    {
      name: "Categories",
      href: "/admin/categories",
      icon: Tags,
    },
      {
    name: "Notifications",
    href: "/admin/notifications",
    icon: Bell,
  },
  ];

  return (
    <div className="min-h-screen bg-[#f8f6f3] text-[#403633]">
      {/* MOBILE TOP BAR */}
      <div className="sticky top-0 z-40 flex items-center justify-between border-b border-[#e8dfda] bg-[#fbfaf8]/95 px-5 py-4 backdrop-blur lg:hidden">
        <Link href="/admin" className="font-[Marcellus] text-xl tracking-wide">
          LUMÉRA
        </Link>

        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="rounded-lg border border-[#e5dbd6] bg-white p-2"
        >
          {sidebarOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* SIDEBAR */}
      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-[250px] flex-col border-r border-[#e6ddd8] bg-[#fbfaf8] transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* LOGO */}
        <div className="border-b border-[#eee7e3] px-7 py-8">
          <Link href="/admin">
            <p className="font-[Marcellus] text-2xl tracking-[0.08em]">
              LUMÉRA
            </p>

            <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.3em] text-[#b4676d]">
              Beauty Administration
            </p>
          </Link>
        </div>

        {/* NAVIGATION */}
        <div className="flex-1 px-4 py-7">
          <p className="px-3 pb-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#a69690]">
            Main Menu
          </p>

          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = item.name === "Dashboard";

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`group flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm transition ${
                    active
                      ? "bg-[#f2e4e0] font-medium text-[#ad6269]"
                      : "text-[#746661] hover:bg-[#f6f0ed] hover:text-[#ad6269]"
                  }`}
                >
                  <Icon
                    className={`h-[18px] w-[18px] ${
                      active
                        ? "text-[#ad6269]"
                        : "text-[#96847e] group-hover:text-[#ad6269]"
                    }`}
                  />

                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* SIDEBAR BOTTOM */}
        <div className="border-t border-[#eee7e3] p-5">
          <div className="rounded-xl bg-[#f5ebe7] p-4">
            <p className="text-xs font-medium text-[#654f4a]">Store Overview</p>

            <p className="mt-1 text-[11px] leading-5 text-[#927d77]">
              Manage your LUMÉRA store from one place.
            </p>
          </div>
        </div>
      </aside>

      {/* MOBILE OVERLAY */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/20 lg:hidden"
        />
      )}

      {/* MAIN CONTENT */}
      <main className="lg:ml-[250px]">
        {/* HEADER */}
        <header className="border-b border-[#e8dfda] bg-[#fbfaf8]">
          <div className="flex flex-col gap-5 px-6 py-7 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-10">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#b4676d]">
                Overview
              </p>

              <h1 className="mt-1 font-[Marcellus] text-3xl md:text-4xl">
                Good morning, Admin
              </h1>

              <p className="mt-2 text-sm text-[#887771]">
                Here&apos;s what&apos;s happening with your store today.
              </p>
            </div>
            {/* RIGHT FILTER */}\
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-fit cursor-pointer appearance-none rounded-xl border border-[#ded4cf] bg-white px-4 py-2.5 pr-10 text-sm text-[#665752] shadow-sm outline-none transition hover:border-[#b4676d] focus:border-[#b4676d]"
            >
              <option value="7">Last 7 Days</option>
              <option value="30">Last 30 Days</option>
              <option value="90">Last 90 Days</option>
              <option value="365">Last 12 Months</option>
            </select>
          </div>
        </header>

        {/* DASHBOARD CONTENT */}
        <div className="px-6 py-7 sm:px-8 lg:px-10 lg:py-9">
          {/* METRICS */}
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {/* SALES */}
            <div className="rounded-2xl border border-[#e6ddd8] bg-white p-5 shadow-[0_5px_25px_rgba(70,50,45,0.035)]">
              <div className="flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f3e6e2]">
                  <DollarSign className="h-5 w-5 text-[#b4676d]" />
                </div>

                <ArrowUpRight className="h-4 w-4 text-[#b4676d]" />
              </div>

              <p className="mt-5 text-xs text-[#94827c]">Total Sales</p>

              <div className="mt-1 flex items-end justify-between">
                <p className="font-[Marcellus] text-3xl">
                  {loading ? "..." : `$${Number(stats.totalSales).toFixed(2)}`}
                </p>

                <span className="flex items-center gap-1 text-[11px] text-[#66806c]">
                  <TrendingUp className="h-3.5 w-3.5" />
                  Revenue
                </span>
              </div>
            </div>

            {/* ORDERS */}
            <div className="rounded-2xl border border-[#e6ddd8] bg-white p-5 shadow-[0_5px_25px_rgba(70,50,45,0.035)]">
              <div className="flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f3e6e2]">
                  <ShoppingBag className="h-5 w-5 text-[#b4676d]" />
                </div>

                <ArrowUpRight className="h-4 w-4 text-[#b4676d]" />
              </div>

              <p className="mt-5 text-xs text-[#94827c]">Active Orders</p>

              <div className="mt-1 flex items-end justify-between">
                <p className="font-[Marcellus] text-3xl">
                  {loading ? "..." : stats.totalOrders}
                </p>

                <span className="text-[11px] text-[#94827c]">Total</span>
              </div>
            </div>

            {/* PRODUCTS */}
            <div className="rounded-2xl border border-[#e6ddd8] bg-white p-5 shadow-[0_5px_25px_rgba(70,50,45,0.035)]">
              <div className="flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#eef2ed]">
                  <Package className="h-5 w-5 text-[#66806c]" />
                </div>

                <ArrowUpRight className="h-4 w-4 text-[#66806c]" />
              </div>

              <p className="mt-5 text-xs text-[#94827c]">Products</p>

              <div className="mt-1 flex items-end justify-between">
                <p className="font-[Marcellus] text-3xl">
                  {loading ? "..." : stats.totalProducts}
                </p>

                <span className="text-[11px] text-[#94827c]">In catalog</span>
              </div>
            </div>

            {/* CUSTOMERS */}
            <div className="rounded-2xl border border-[#e6ddd8] bg-white p-5 shadow-[0_5px_25px_rgba(70,50,45,0.035)]">
              <div className="flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f3e6e2]">
                  <Users className="h-5 w-5 text-[#b4676d]" />
                </div>

                <ArrowUpRight className="h-4 w-4 text-[#b4676d]" />
              </div>

              <p className="mt-5 text-xs text-[#94827c]">Customers</p>

              <div className="mt-1 flex items-end justify-between">
                <p className="font-[Marcellus] text-3xl">
                  {loading ? "..." : stats.totalCustomers}
                </p>

                <span className="text-[11px] text-[#94827c]">Registered</span>
              </div>
            </div>
          </div>

          {/* SECOND ROW */}
          <div className="mt-6 grid gap-6 xl:grid-cols-[1.5fr_1fr]">
            {/* SALES OVERVIEW */}
            <div className="rounded-2xl border border-[#e6ddd8] bg-white p-6 shadow-[0_5px_25px_rgba(70,50,45,0.035)]">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#b4676d]">
                    Performance
                  </p>

                  <h2 className="mt-1 font-[Marcellus] text-2xl">
                    Sales Overview
                  </h2>
                </div>

                <button className="rounded-lg border border-[#e6ddd8] px-3 py-2 text-xs text-[#806e68]">
                  Monthly
                </button>
              </div>

              <div className="mt-7 flex h-[230px] items-end gap-3 border-b border-[#eee8e5] px-2">
                {monthlySales.map((sales, index) => {
                  const maxSales = Math.max(...monthlySales, 1);

                  const height = (sales / maxSales) * 100;

                  return (
                    <div
                      key={index}
                      className="group flex h-full flex-1 items-end"
                    >
                      <div
                        style={{ height: `${height}%` }}
                        className="w-full rounded-t-md bg-[#e9d7d3] transition-all duration-300 group-hover:bg-[#b4676d]"
                      />
                    </div>
                  );
                })}
              </div>

              <div className="mt-3 flex justify-between text-[9px] uppercase tracking-wider text-[#a7958f]">
                <span>Jan</span>
                <span>Feb</span>
                <span>Mar</span>
                <span>Apr</span>
                <span>May</span>
                <span>Jun</span>
                <span>Jul</span>
                <span>Aug</span>
                <span>Sep</span>
                <span>Oct</span>
                <span>Nov</span>
                <span>Dec</span>
              </div>
            </div>

            {/* ORDER SUMMARY */}
            <div className="rounded-2xl border border-[#e6ddd8] bg-white p-6 shadow-[0_5px_25px_rgba(70,50,45,0.035)]">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#b4676d]">
                  Store Activity
                </p>

                <h2 className="mt-1 font-[Marcellus] text-2xl">
                  Order Summary
                </h2>
              </div>

              <div className="mt-7 space-y-4">
                <div className="flex items-center justify-between rounded-xl bg-[#faf7f5] p-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-[#f3e6e2] p-2">
                      <Clock3 className="h-4 w-4 text-[#b4676d]" />
                    </div>

                    <div>
                      <p className="text-sm font-medium">Pending</p>
                      <p className="text-[11px] text-[#9a8983]">
                        Awaiting processing
                      </p>
                    </div>
                  </div>

                  <span className="font-[Marcellus] text-xl">
                    {orderSummary.Pending}
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-[#faf7f5] p-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-[#f5efe2] p-2">
                      <Package className="h-4 w-4 text-[#9a7944]" />
                    </div>

                    <div>
                      <p className="text-sm font-medium">Processing</p>
                      <p className="text-[11px] text-[#9a8983]">
                        Being prepared
                      </p>
                    </div>
                  </div>

                  <span className="font-[Marcellus] text-xl">
                    {orderSummary.Processing}
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-[#faf7f5] p-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-[#e9f0f5] p-2">
                      <Truck className="h-4 w-4 text-[#557184]" />
                    </div>

                    <div>
                      <p className="text-sm font-medium">Shipped</p>
                      <p className="text-[11px] text-[#9a8983]">On the way</p>
                    </div>
                  </div>

                  <span className="font-[Marcellus] text-xl">
                    {orderSummary.Shipped}
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-[#faf7f5] p-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-[#e8f2eb] p-2">
                      <CheckCircle2 className="h-4 w-4 text-[#55765d]" />
                    </div>

                    <div>
                      <p className="text-sm font-medium">Delivered</p>
                      <p className="text-[11px] text-[#9a8983]">
                        Successfully completed
                      </p>
                    </div>
                  </div>

                  <span className="font-[Marcellus] text-xl">
                    {orderSummary.Delivered}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* RECENT ORDERS */}
          <div className="mt-6 overflow-hidden rounded-2xl border border-[#e6ddd8] bg-white shadow-[0_5px_25px_rgba(70,50,45,0.035)]">
            <div className="flex flex-col gap-3 border-b border-[#eee8e5] px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#b4676d]">
                  Orders
                </p>

                <h2 className="mt-1 font-[Marcellus] text-2xl">
                  Recent Orders
                </h2>
              </div>

              <Link
                href="/admin/orders"
                className="flex items-center gap-2 text-xs uppercase tracking-[0.12em] text-[#806e68] transition hover:text-[#b4676d]"
              >
                View All
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>

            {loading ? (
              <div className="px-6 py-12 text-center text-sm text-[#927d77]">
                Loading orders...
              </div>
            ) : recentOrders.length === 0 ? (
              <div className="px-6 py-12 text-center text-sm text-[#927d77]">
                No orders found.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[760px]">
                  <thead>
                    <tr className="border-b border-[#eee8e5] bg-[#fcfaf9] text-left">
                      <th className="px-6 py-4 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#9c8b85]">
                        Order ID
                      </th>

                      <th className="px-6 py-4 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#9c8b85]">
                        Customer
                      </th>

                      <th className="px-6 py-4 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#9c8b85]">
                        Items
                      </th>

                      <th className="px-6 py-4 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#9c8b85]">
                        Date
                      </th>

                      <th className="px-6 py-4 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#9c8b85]">
                        Total
                      </th>

                      <th className="px-6 py-4 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#9c8b85]">
                        Status
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {recentOrders.slice(0, 5).map((order) => (
                      <tr
                        key={order._id}
                        className="border-b border-[#f1ebe8] last:border-0 transition hover:bg-[#fdfaf8]"
                      >
                        <td className="px-6 py-5">
                          <span className="font-mono text-xs text-[#6f605b]">
                            #{order._id.slice(-6).toUpperCase()}
                          </span>
                        </td>

                        <td className="px-6 py-5">
                          <p className="text-sm font-medium">
                            {order.user?.firstName} {order.user?.lastName}
                          </p>

                          <p className="mt-1 text-[11px] text-[#a18f89]">
                            {order.user?.email}
                          </p>
                        </td>

                        <td className="px-6 py-5 text-sm text-[#806e68]">
                          {order.items?.reduce(
                            (sum, item) => sum + item.quantity,
                            0,
                          ) || 0}{" "}
                          items
                        </td>

                        <td className="px-6 py-5 text-xs text-[#806e68]">
                          {formatDate(order.createdAt)}
                        </td>

                        <td className="px-6 py-5 font-medium">
                          ${Number(order.totalAmount).toFixed(2)}
                        </td>

                        <td className="px-6 py-5">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-medium ${statusStyle(
                              order.orderStatus,
                            )}`}
                          >
                            {statusIcon(order.orderStatus)}
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

          {/* QUICK LINKS */}
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Link
              href="/admin/orders"
              className="group rounded-xl border border-[#e6ddd8] bg-white p-4 transition hover:border-[#b4676d] hover:shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Manage Orders</span>
                <ArrowUpRight className="h-4 w-4 text-[#a18f89] transition group-hover:text-[#b4676d]" />
              </div>
            </Link>

            <Link
              href="/admin/products"
              className="group rounded-xl border border-[#e6ddd8] bg-white p-4 transition hover:border-[#b4676d] hover:shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Manage Products</span>
                <ArrowUpRight className="h-4 w-4 text-[#a18f89] transition group-hover:text-[#b4676d]" />
              </div>
            </Link>

            <Link
              href="/admin/categories"
              className="group rounded-xl border border-[#e6ddd8] bg-white p-4 transition hover:border-[#b4676d] hover:shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Manage Categories</span>
                <ArrowUpRight className="h-4 w-4 text-[#a18f89] transition group-hover:text-[#b4676d]" />
              </div>
            </Link>

            <Link
              href="/admin/users"
              className="group rounded-xl border border-[#e6ddd8] bg-white p-4 transition hover:border-[#b4676d] hover:shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">View Customers</span>
                <ArrowUpRight className="h-4 w-4 text-[#a18f89] transition group-hover:text-[#b4676d]" />
              </div>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
