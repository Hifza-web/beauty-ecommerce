import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | LUMÉRA Beauty",
  description: "Log in to your LUMÉRA Beauty account.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}