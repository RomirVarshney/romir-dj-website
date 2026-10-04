import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/mixes", destination: "/#mixes", permanent: false },
      { source: "/live-djing", destination: "/#live", permanent: false },
      { source: "/contact", destination: "/#book", permanent: false },
    ];
  },
};

export default nextConfig;
