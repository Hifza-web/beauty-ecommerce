import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Account | LUMÉRA Beauty",
  description: "Create your LUMÉRA Beauty account and start your beauty journey.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}