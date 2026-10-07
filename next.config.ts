import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  experimental: {
    // Tree-shake per-icon / per-export imports instead of pulling whole
    // barrel files into every client chunk.
    optimizePackageImports: ["lucide-react", "motion"],

    // Lets app/global-not-found.tsx serve unmatched URLs. Without it, Next
    // falls back to its own bare 404 page — which sits outside our layout,
    // carries no branding and is in the wrong language.
    globalNotFound: true,
  },

  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [320, 375, 430, 640, 768, 1024, 1280, 1440, 1920, 2560],
    imageSizes: [96, 128, 192, 256, 384],
    remotePatterns: [
      // Durgotsav media services — the live photo album / gallery endpoints.
      { protocol: "https", hostname: "admin.durgotsav.com" },
      { protocol: "https", hostname: "durgotsav.imperative.co.in" },
    ],
  },
  async redirects() {
    return [
      // The root resolves to the campaign's primary language.
      { source: "/", destination: "/mr", permanent: false },

      // Paths the previous site published. Redirecting them keeps every
      // existing inbound link, bookmark and search result working.
      { source: "/mission", destination: "/mr/mission", permanent: true },
      { source: "/gallery", destination: "/mr/gallery", permanent: true },
      { source: "/faq", destination: "/mr/faq", permanent: true },
      { source: "/privacy", destination: "/mr/privacy", permanent: true },
      { source: "/terms", destination: "/mr/terms", permanent: true },
      { source: "/testimonials", destination: "/mr/voices", permanent: true },
      { source: "/photoalbum", destination: "/mr/album", permanent: true },
      { source: "/photoalbum-all", destination: "/mr/album", permanent: true },
      { source: "/photoalbum-approved", destination: "/mr/album", permanent: true },
    ];
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
        ],
      },
    ];
  },
};

export default nextConfig;
