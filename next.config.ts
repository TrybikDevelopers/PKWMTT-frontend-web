import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    // Use standalone output only when building with Docker
    output: process.env.DOCKER_BUILD === "true" ? "standalone" : undefined,
};

export default nextConfig;
