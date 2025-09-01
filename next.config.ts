import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL("https://img.spoonacular.com/**")],
  },
};

export default nextConfig;
