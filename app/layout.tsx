import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/CartContext";
import { WishlistProvider } from "@/components/WishlistContext";
import { AuthProvider } from "@/components/AuthContext";
import NotificationPermission from "@/components/NotificationPermission";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "LUMÉRA | Beauty & Skincare",
    template: "%s | LUMÉRA",
  },
  description:
    "Discover premium beauty, makeup, skincare, and hair care essentials at LUMÉRA.",
  keywords: [
    "LUMÉRA",
    "beauty",
    "makeup",
    "skincare",
    "hair care",
    "beauty products",
    "cosmetics",
  ],
  openGraph: {
    title: "LUMÉRA | Beauty & Skincare",
    description:
      "Discover premium beauty, makeup, skincare, and hair care essentials at LUMÉRA.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col overflow-x-hidden">
        <AuthProvider>
          <NotificationPermission />
          <CartProvider>
            <WishlistProvider>
              {children}
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
