"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

type Category = {
  _id: string;
  name: string;
  slug?: string;
};

export default function AdminCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      const res = await api.get("/categories");
      setCategories(res.data.categories || []);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) return;

    try {
      await api.post("/categories", {
        name: name.trim(),
        slug: name.trim().toLowerCase().replace(/\s+/g, "-"),
      });

      setName("");
      fetchCategories();
    } catch (error) {
      console.error("Failed to add category:", error);
    }
  };
  const handleDeleteCategory = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this category?",
    );

    if (!confirmed) return;

    try {
      await api.delete(`/categories/${id}`);

      setCategories((prev) => prev.filter((category) => category._id !== id));
    } catch (error) {
      console.error("Failed to delete category:", error);
      alert("Failed to delete category");
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f6f3] px-6 py-10 text-[#403633]">
      <div className="mx-auto max-w-5xl">
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#b4676d]">
          Administration
        </p>

        <h1 className="mt-1 font-[Marcellus] text-4xl">Categories</h1>

        <p className="mt-2 text-sm text-[#887771]">
          Manage product categories for your LUMÉRA store.
        </p>

        {/* ADD CATEGORY */}
        <form
          onSubmit={handleAddCategory}
          className="mt-8 rounded-2xl border border-[#e6ddd8] bg-white p-6 shadow-sm"
        >
          <h2 className="font-[Marcellus] text-2xl">Add Category</h2>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Category name"
              className="flex-1 rounded-xl border border-[#ded4cf] px-4 py-3 text-sm outline-none focus:border-[#b4676d]"
            />

            <button
              type="submit"
              className="cursor-pointer rounded-xl bg-[#b4676d] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#9f555d]"
            >
              Add Category
            </button>
          </div>
        </form>

        {/* CATEGORY LIST */}
        <div className="mt-6 rounded-2xl border border-[#e6ddd8] bg-white shadow-sm">
          <div className="border-b border-[#eee8e5] px-6 py-5">
            <h2 className="font-[Marcellus] text-2xl">All Categories</h2>
          </div>

          {loading ? (
            <p className="px-6 py-10 text-center text-sm text-[#927d77]">
              Loading categories...
            </p>
          ) : categories.length === 0 ? (
            <p className="px-6 py-10 text-center text-sm text-[#927d77]">
              No categories found.
            </p>
          ) : (
            <div className="divide-y divide-[#f1ebe8]">
              {categories.map((category) => (
                <div
                  key={category._id}
                  className="flex items-center justify-between px-6 py-4"
                >
                  <div>
                    <p className="text-sm font-medium">{category.name}</p>

                    <p className="mt-1 text-xs text-[#a18f89]">
                      {category.slug}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDeleteCategory(category._id)}
                    className="cursor-pointer rounded-lg border border-[#e4caca] px-3 py-2 text-xs font-medium text-[#a76161] transition hover:bg-[#f8e9e9]"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
