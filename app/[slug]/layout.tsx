import type { Metadata } from "next";

type Props = {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const categoryName =
    slug === "makeup"
      ? "Makeup"
      : slug === "skin-care"
        ? "Skin Care"
        : slug === "hair-care"
          ? "Hair Care"
          : "Beauty";

  return {
    title: `${categoryName} | LUMÉRA Beauty`,
    description: `Explore LUMÉRA Beauty's ${categoryName.toLowerCase()} collection. Discover premium beauty essentials designed to elevate your everyday beauty ritual.`,
  };
}

export default function CategoryLayout({ children }: Props) {
  return children;
}