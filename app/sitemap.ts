import type { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://cfstudio-seven.vercel.app";

interface ServiceSlug {
  slug?: {
    current?: string;
  };
  _updatedAt?: string;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const services = await client.fetch<ServiceSlug[]>(
    `*[_type == "services" && defined(slug.current)]{slug, _updatedAt}`
  );

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...services.map((service) => ({
      url: `${siteUrl}/uslugi/${service.slug?.current}`,
      lastModified: service._updatedAt ? new Date(service._updatedAt) : new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
