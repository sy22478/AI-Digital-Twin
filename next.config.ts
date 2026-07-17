import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // lib/twin.ts reads LinkedIn.md at runtime, so it must be traced into the
  // serverless bundle or the route throws ENOENT on Netlify.
  outputFileTracingIncludes: {
    "/api/twin": ["./LinkedIn.md"],
  },
};

export default nextConfig;
