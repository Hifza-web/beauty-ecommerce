import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || "https://beauty-ecommerce-mh7p.vercel.app/api";
    // We must ensure backendUrl doesn't have a trailing slash, or we handle it gracefully.
    // If NEXT_PUBLIC_API_URL is already "https://.../api", appending "/:path*" works: "https://.../api/:path*"
    return [
      {
        source: "/api/:path*",
        destination: `${backendUrl}/:path*`, // Proxy to backend
      },
    ];
  },
};

export default nextConfig;
