import { client } from "@/sanity/lib/client";
import PortfolioGalleryClient, { type PortfolioProject } from "./portfolio-gallery-client";

const fallbackTitle = "ZOBACZ NASZE NAJNOWSZE PROJEKTY";

interface PortfolioDocument {
  title?: string;
  projects?: PortfolioProject[];
}

export default async function PortfolioGallery() {
  const portfolio = await client.fetch<PortfolioDocument>(
    `*[_type == "portfolio"][0]{
      title,
      projects[]{
        _key,
        title,
        description,
        imageAlt,
        image{asset->{_id, metadata{dimensions{width,height}}}}
      }
    }`
  );

  return (
    <PortfolioGalleryClient
      title={portfolio?.title || fallbackTitle}
      projects={portfolio?.projects || []}
    />
  );
}
