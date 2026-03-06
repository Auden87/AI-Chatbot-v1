/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    outputFileTracingIncludes: {
      "/api/chat": ["./*.json"],
    },
  },
};

export default nextConfig;
