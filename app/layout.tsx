import type { Metadata } from "next";
import { Lato } from "next/font/google";
import type { SanityImageSource } from "@sanity/image-url";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import "./globals.css";

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
});

export const dynamic = "force-dynamic";

const fallbackSeo = {
  title: "CFS - Kreatywne rozwiązania dla biznesu",
  description: "CFS tworzy nowoczesne strony internetowe, realizacje graficzne i cyfrowe doświadczenia dla firm.",
};

interface SeoSettings {
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: SanityImageSource;
}

export async function generateMetadata(): Promise<Metadata> {
  const settings = await client.fetch<SeoSettings>(
    `*[_type == "generalSettings"][0]{
      seoTitle,
      seoDescription,
      seoKeywords,
      ogTitle,
      ogDescription,
      ogImage
    }`
  );

  const title = settings?.seoTitle || fallbackSeo.title;
  const description = settings?.seoDescription || fallbackSeo.description;
  const ogTitle = settings?.ogTitle || title;
  const ogDescription = settings?.ogDescription || description;
  const ogImage = settings?.ogImage
    ? urlFor(settings.ogImage).auto("format").width(1200).height(630).url()
    : undefined;

  return {
    title,
    description,
    keywords: settings?.seoKeywords,
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      type: "website",
      locale: "pl_PL",
      images: ogImage
        ? [
            {
              url: ogImage,
              width: 1200,
              height: 630,
              alt: ogTitle,
            },
          ]
        : undefined,
    },
    twitter: {
      card: ogImage ? "summary_large_image" : "summary",
      title: ogTitle,
      description: ogDescription,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pl"
      className={`${lato.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
