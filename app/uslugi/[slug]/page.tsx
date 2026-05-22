import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import type { ReactNode } from "react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import type { Service } from "@/app/interfaces";

type Props = {
  params: Promise<{ slug: string }>;
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://cfstudio-seven.vercel.app";

const serviceQuery = `*[_type == "services" && slug.current == $slug][0]{
  _id,
  name,
  slug,
  description,
  gallery[]{_key, picture{asset->{_id, metadata{dimensions{width,height}}}}, pictureDescription},
  icon{asset->{_id}}
}`;

function blocksToPlainText(blocks?: PortableTextBlock[]) {
  return blocks
    ?.map((block) => block.children?.map((child) => child.text).join(""))
    .filter(Boolean)
    .join(" ")
    .slice(0, 160);
}

async function getService(slug: string) {
  return client.fetch<Service | null>(serviceQuery, { slug });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = await getService(slug);

  if (!service) {
    return {};
  }

  const description = blocksToPlainText(service.description) || `Usługa ${service.name} w CFS.`;
  const image = service.gallery?.[0]?.picture
    ? urlFor(service.gallery[0].picture).auto("format").width(1200).height(630).url()
    : undefined;

  return {
    title: `${service.name} | CFS`,
    description,
    alternates: {
      canonical: `${siteUrl}/uslugi/${service.slug.current}`,
    },
    openGraph: {
      title: `${service.name} | CFS`,
      description,
      type: "article",
      url: `${siteUrl}/uslugi/${service.slug.current}`,
      images: image
        ? [
            {
              url: image,
              width: 1200,
              height: 630,
              alt: service.gallery[0].pictureDescription || service.name,
            },
          ]
        : undefined,
    },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = await getService(slug);

  if (!service) {
    notFound();
  }

  const portableTextComponents: PortableTextComponents = {
    block: {
      h2: ({ children }: { children?: ReactNode }) => (
        <h2 className="mt-8 text-2xl font-semibold text-white">{children}</h2>
      ),
      h3: ({ children }: { children?: ReactNode }) => (
        <h3 className="mt-6 text-xl font-semibold text-white">{children}</h3>
      ),
      normal: ({ children }: { children?: ReactNode }) => (
        <p className="text-base leading-8 text-white/90">{children}</p>
      ),
    },
  };

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <section className="grid min-h-screen bg-primary md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <aside className="px-7 py-10 text-white md:sticky md:top-0 md:min-h-screen md:px-10 md:py-14">
          <Link
            href="/"
            className="mb-10 inline-flex text-sm font-semibold uppercase tracking-[0.25em] text-white/75 transition-opacity hover:opacity-70"
          >
            Powrót
          </Link>
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.35em] text-white/70">
            Usługa
          </p>
          <h1 className="text-4xl font-semibold leading-tight md:text-6xl">
            {service.name}
          </h1>
          <div className="mt-8 max-w-prose space-y-5 text-white/90">
            <PortableText value={service.description} components={portableTextComponents} />
          </div>
        </aside>

        <div className="space-y-5 bg-white px-4 py-6 md:pr-6">
          {service.gallery && service.gallery.length > 0 ? (
            service.gallery.map((image, index) => (
              <figure key={image._key ?? `${image.picture.asset._id}-${index}`} className="overflow-hidden rounded-md bg-gray-100">
                <Image
                  src={urlFor(image.picture).url()}
                  alt={image.pictureDescription}
                  width={image.picture.asset.metadata?.dimensions.width ?? 1000}
                  height={image.picture.asset.metadata?.dimensions.height ?? 700}
                  unoptimized
                  className="h-auto w-full object-cover"
                />
                {image.pictureDescription && (
                  <figcaption className="px-4 py-3 text-sm text-gray-500">
                    {image.pictureDescription}
                  </figcaption>
                )}
              </figure>
            ))
          ) : (
            <div className="flex min-h-72 items-center justify-center rounded-md border border-dashed border-gray-300 bg-gray-50 p-8 text-center text-gray-500">
              Brak zdjęć dla tej usługi.
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
