import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop All | LUMÉRA Beauty",
  description:
    "Explore LUMÉRA Beauty's collection of makeup, skincare, and hair care essentials.",
};

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}