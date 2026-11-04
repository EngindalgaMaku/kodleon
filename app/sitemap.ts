import type { MetadataRoute } from "next";
import { APPS } from "@/lib/apps";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    ...APPS.map((a) => ({ url: `${SITE_URL}/uygulamalar/${a.slug}`, changeFrequency: "weekly" as const, priority: 0.9 })),
    { url: `${SITE_URL}/sektorler`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/gizlilik`, priority: 0.2 },
  ];
}
