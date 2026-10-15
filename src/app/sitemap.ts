import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.SITE_URL;
  if (!base) return [];
  return ["", "/about", "/services", "/portfolio", "/contact"].map((path) => ({
    url: new URL(path, base).href,
  }));
}
