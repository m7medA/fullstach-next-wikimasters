import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: { remotePatterns: [new URL(`${process.env.BLOB_BASE_URL}/**`)] },
};

export default nextConfig;
