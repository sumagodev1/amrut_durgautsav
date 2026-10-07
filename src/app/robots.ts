import type { MetadataRoute } from "next";
import { SITE } from "@/data/site";
import { absoluteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // The platform's administrative screens are not part of this site,
        // but the paths existed on the previous one — keep crawlers off them.
        disallow: ["/api/", "/admin", "/admin/"],
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: SITE.url,
  };
}
