import type { NextConfig } from "next";

const nextConfig = {
  // Otras configuraciones...

  ...(process.env.NODE_ENV === "development" && {
    allowedDevOrigins: [
      "http://localhost:3000",
      "http://167.88.46.48:3000",
    ],
  }),
} as const;

export default nextConfig;

