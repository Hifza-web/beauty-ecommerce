"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

type Category = {
  _id: string;
  name: string;
};

export default function AddProduct() {
  const router = useRouter();

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
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
    const fetchCategories = async () => {
      try {
        const res = await api.get("/categories");
        console.log("CATEGORIES RESPONSE:", res.data);
        setCategories(res.data.categories);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      await api.post("/products", {
        name: formData.name,
        description: formData.description,
        price: Number(formData.price),
        oldPrice: formData.oldPrice
          ? Number(formData.oldPrice)
          : undefined,
        category: formData.category,
        stock: Number(formData.stock),
        badge: formData.badge,
        image: formData.image,
      });

      alert("Product added successfully!");

      router.push("/admin/products");
    } catch (error) {
      console.error("Failed to add product:", error);
      alert("Failed to add product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f6f3] px-6 py-8">
      <div className="mx-auto max-w-4xl">
        {/* HEADER */}
        <div className="mb-8">
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#b4676d]">
            Administration
          </p>

          <h1 className="mt-1 font-[Marcellus] text-3xl text-black">
            Add Product
          </h1>

          <p className="mt-2 text-sm text-[#887771]">
            Add a new product to your LUMÉRA store.
          </p>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-[#e6ddd8] bg-white p-6 shadow-sm sm:p-8"
        >
          <div className="grid gap-6 sm:grid-cols-2">
            {/* PRODUCT NAME */}
            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm font-medium text-black">
                Product Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="e.g. Rose Glow Lipstick"
                className="text-[#4b3838] w-full rounded-xl border border-[#ded4cf] px-4 py-3 text-sm outline-none focus:border-[#b4676d]"
              />
            </div>

            {/* DESCRIPTION */}
            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm font-medium text-black">
                Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={5}
                placeholder="Enter product description..."
                className="text-[#4b3838] w-full rounded-xl border border-[#ded4cf] px-4 py-3 text-sm outline-none focus:border-[#b4676d]"
              />
            </div>

            {/* PRICE */}
            <div>
              <label className="mb-2 block text-sm font-medium text-black">
                Price
              </label>

              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                min="0"
                placeholder="25"
                className="text-[#4b3838] w-full rounded-xl border border-[#ded4cf] px-4 py-3 text-sm outline-none focus:border-[#b4676d]"
              />
            </div>

            {/* OLD PRICE */}
            <div>
              <label className="mb-2 block text-sm font-medium text-black">
                Old Price
              </label>

              <input
                type="number"
                name="oldPrice"
                value={formData.oldPrice}
                onChange={handleChange}
                min="0"
                placeholder="30"
                className="text-[#4b3838] w-full rounded-xl border border-[#ded4cf] px-4 py-3 text-sm outline-none focus:border-[#b4676d]"
              />
            </div>

            {/* CATEGORY */}
            <div>
              <label className="mb-2 block text-sm font-medium text-black">
                Category
              </label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="text-[#4b3838] w-full cursor-pointer rounded-xl border border-[#ded4cf] bg-white px-4 py-3 text-sm outline-none focus:border-[#b4676d]"
              >
                <option value="">Select Category</option>

                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* STOCK */}
            <div>
              <label className="mb-2 block text-sm font-medium text-black">
                Stock
              </label>

              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                required
                min="0"
                placeholder="100"
                className="text-[#4b3838] w-full rounded-xl border border-[#ded4cf] px-4 py-3 text-sm outline-none focus:border-[#b4676d]"
              />
            </div>

            {/* BADGE */}
            <div>
              <label className="mb-2 block text-sm font-medium text-black">
                Badge
              </label>

              <input
                type="text"
                name="badge"
                value={formData.badge}
                onChange={handleChange}
                placeholder="NEW / SALE / BEST SELLER"
                className="text-[#4b3838] w-full rounded-xl border border-[#ded4cf] px-4 py-3 text-sm outline-none focus:border-[#b4676d]"
              />
            </div>

            {/* IMAGE */}
            <div>
              <label className="mb-2 block text-sm font-medium text-black">
                Image URL
              </label>

              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="/uploads/products/image.jpg"
                required
                className="text-[#4b3838] w-full rounded-xl border border-[#ded4cf] px-4 py-3 text-sm outline-none focus:border-[#b4676d]"
              />
            </div>
          </div>

          {/* BUTTONS */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => router.push("/admin/products")}
              className="rounded-xl border border-[#ded4cf] px-6 py-3 text-sm text-[#665752] transition hover:bg-[#f8f3f0]"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="cursor-pointer rounded-xl bg-[#b4676d] px-6 py-3 text-sm text-white transition hover:bg-[#9f5960] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Adding Product..." : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}