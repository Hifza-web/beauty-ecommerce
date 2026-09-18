import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Deals & Offers | LUMÉRA Beauty",
  description:
    "Discover exclusive beauty deals and special offers on makeup, skincare, and hair care products at LUMÉRA Beauty.",
};

export default function DealsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}