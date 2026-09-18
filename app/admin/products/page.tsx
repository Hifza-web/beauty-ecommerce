"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/lib/api";

type Product = {
  _id: string;
  name: string;
  price: number;
  oldPrice?: number;
  stock: number;
  category?: {
    name?: string;
  };
  image?: string;
};

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/products");
        setProducts(res.data.products || []);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
  const handleDeleteProduct = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?",
    );

    if (!confirmed) return;

    try {
      await api.delete(`/products/${id}`);

      setProducts((prev) => prev.filter((product) => product._id !== id));
    } catch (error) {
      console.error("Failed to delete product:", error);
      alert("Failed to delete product");
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f6f3] px-6 py-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#b4676d]">
              Administration
            </p>

            <h1 className="mt-1 font-[Marcellus] text-3xl text-black">
              Products
            </h1>

            <p className="mt-2 text-sm text-[#887771]">
              Manage your LUMÉRA products.
            </p>
          </div>

          <Link
            href="/admin/products/add"
            className="rounded-xl bg-[#b4676d] px-5 py-3 text-sm text-white transition hover:bg-[#9f5960]"
          >
            Add Product
          </Link>
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl border border-[#e6ddd8] bg-white">
          {loading ? (
            <div className="px-6 py-12 text-center text-sm text-[#927d77]">
              Loading products...
            </div>
          ) : products.length === 0 ? (
            <div className="px-6 py-12 text-center text-sm text-[#927d77]">
              No products found.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead>
                  <tr className="border-b border-[#eee8e5] bg-[#fcfaf9] text-left">
                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#9c8b85]">
                      Product
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#9c8b85]">
                      Category
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#9c8b85]">
                      Price
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#9c8b85]">
                      Stock
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#9c8b85]">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {products.map((product) => (
                    <tr
                      key={product._id}
                      className="border-b border-[#f1ebe8] last:border-0"
                    >
                      <td className="px-6 py-5">
                        <p className="text-sm font-medium text-black">
                          {product.name}
                        </p>
                      </td>

                      <td className="px-6 py-5 text-sm text-[#806e68]">
                        {product.category?.name || "No Category"}
                      </td>

                      <td className="px-6 py-5 text-sm font-medium text-[#806e68]">
                        ${Number(product.price).toFixed(2)}
                      </td>

                      <td className="px-6 py-5 text-sm text-[#806e68]">
                        {product.stock}
                      </td>

                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                          <Link
                            href={`/admin/products/edit/${product._id}`}
                            className="text-sm text-[#b4676d] hover:underline"
                          >
                            Edit
                          </Link>

                          <button
                            onClick={() => handleDeleteProduct(product._id)}
                            className="cursor-pointer text-sm text-[#a76161] hover:underline"
                          >
                            Delete
                          </button>
                        </div>
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
