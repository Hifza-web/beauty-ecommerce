import type { Metadata } from "next";

type Props = {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  return {
    title: `Product Details | LUMÉRA Beauty`,
    description:
      "Discover premium beauty products from LUMÉRA Beauty. Shop makeup, skin care and hair care essentials designed for your everyday beauty ritual.",
  };
}

export default function ProductLayout({ children }: Props) {
  return children;
}