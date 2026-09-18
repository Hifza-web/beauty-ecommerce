"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/lib/api";

type Category = {
  _id: string;
  name: string;
};

export default function EditProduct() {
  const params = useParams();
  const router = useRouter();

  const productId = params.id as string;

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    oldPrice: "",
    category: "",
    stock: "",
    badge: "",
    image: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productRes, categoryRes] = await Promise.all([
          api.get(`/products/${productId}`),
          api.get("/categories"),
        ]);

        const product = productRes.data.product;

        setForm({
          name: product.name || "",
          description: product.description || "",
          price: product.price?.toString() || "",
          oldPrice: product.oldPrice?.toString() || "",
          category: product.category?._id || product.category || "",
          stock: product.stock?.toString() || "",
          badge: product.badge || "",
          image: product.image || "",
        });

        setCategories(categoryRes.data.categories || []);
      } catch (error) {
        console.error("Failed to load product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [productId]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setSaving(true);

      await api.put(`/products/${productId}`, {
        name: form.name,
        description: form.description,
        price: Number(form.price),
        oldPrice: form.oldPrice ? Number(form.oldPrice) : undefined,
        category: form.category,
        stock: Number(form.stock),
        badge: form.badge,
        image: form.image,
      });

      alert("Product updated successfully");

      router.push("/admin/products");
    } catch (error) {
      console.error("Failed to update product:", error);
      alert("Failed to update product");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8f6f3] px-6 py-10">
        <p className="text-sm text-[#887771]">Loading product...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f6f3] px-6 py-10 text-[#403633]">
      <div className="mx-auto max-w-3xl">
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#b4676d]">
          Administration
        </p>

        <h1 className="mt-1 font-[Marcellus] text-4xl">
          Edit Product
        </h1>

        <p className="mt-2 text-sm text-[#887771]">
          Update your LUMÉRA product details.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5 rounded-2xl border border-[#e6ddd8] bg-white p-6 shadow-sm"
        >
          <div>
            <label className="text-sm font-medium">Product Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="mt-2 w-full rounded-xl border border-[#ded4cf] px-4 py-3 text-sm outline-none focus:border-[#b4676d]"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              className="mt-2 w-full rounded-xl border border-[#ded4cf] px-4 py-3 text-sm outline-none focus:border-[#b4676d]"
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium">Price</label>
              <input
                name="price"
                type="number"
                value={form.price}
                onChange={handleChange}
                required
                className="mt-2 w-full rounded-xl border border-[#ded4cf] px-4 py-3 text-sm outline-none focus:border-[#b4676d]"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Old Price</label>
              <input
                name="oldPrice"
                type="number"
                value={form.oldPrice}
                onChange={handleChange}
                className="mt-2 w-full rounded-xl border border-[#ded4cf] px-4 py-3 text-sm outline-none focus:border-[#b4676d]"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Category</label>

            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              required
              className="mt-2 w-full cursor-pointer rounded-xl border border-[#ded4cf] bg-white px-4 py-3 text-sm outline-none focus:border-[#b4676d]"
            >
              <option value="">Select Category</option>

              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">Stock</label>
            <input
              name="stock"
              type="number"
              value={form.stock}
              onChange={handleChange}
              required
              className="mt-2 w-full rounded-xl border border-[#ded4cf] px-4 py-3 text-sm outline-none focus:border-[#b4676d]"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Badge</label>
            <input
              name="badge"
              value={form.badge}
              onChange={handleChange}
              placeholder="NEW"
              className="mt-2 w-full rounded-xl border border-[#ded4cf] px-4 py-3 text-sm outline-none focus:border-[#b4676d]"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Image URL</label>
            <input
              name="image"
              value={form.image}
              onChange={handleChange}
              className="mt-2 w-full rounded-xl border border-[#ded4cf] px-4 py-3 text-sm outline-none focus:border-[#b4676d]"
            />
          </div>

          <div className="flex gap-3 pt-3">
            <button
              type="button"
              onClick={() => router.push("/admin/products")}
              className="cursor-pointer rounded-xl border border-[#ded4cf] px-6 py-3 text-sm"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="cursor-pointer rounded-xl bg-[#b4676d] px-6 py-3 text-sm font-medium text-white hover:bg-[#9f555d] disabled:opacity-60"
            >
              {saving ? "Saving..." : "Update Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}