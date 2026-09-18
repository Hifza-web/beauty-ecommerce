import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verify Email | LUMÉRA Beauty",
  description:
    "Verify your email address to activate your LUMÉRA Beauty account.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function VerifyEmailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}