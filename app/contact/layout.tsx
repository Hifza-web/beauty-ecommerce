import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | LUMÉRA Beauty",
  description:
    "Get in touch with LUMÉRA Beauty for product questions, order support, returns, feedback, and other inquiries.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}