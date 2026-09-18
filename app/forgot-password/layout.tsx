import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password | LUMÉRA Beauty",
  description: "Reset your LUMÉRA Beauty account password securely.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ForgotPasswordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}