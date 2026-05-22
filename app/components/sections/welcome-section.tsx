import Image from "next/image";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import type { SanityImageSource } from "@sanity/image-url";
import type { ReactNode } from "react";
import { client } from "../../../sanity/lib/client";
import { urlFor } from "../../../sanity/lib/image";

const fallbackWelcomeTitle = "KREATYWNE\nROZWIAZANIA\nDLA BIZNESU";

interface WelcomeSettings {
  welcomePicture?: SanityImageSource;
  welcomePictureAlt?: string;
  welcomeTitle?: string;
  welcomeRichText?: PortableTextBlock[];
}

interface WelcomeBlockProps {
  children?: ReactNode;
}

const createWelcomeRichTextFallback = (title: string): PortableTextBlock[] => title
  .split("\n")
  .map((line, index) => ({
    _type: "block",
    _key: `fallbackWelcomeTitle${index}`,
    style: index === 1 ? "headingHuge" : "headingLarge",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: `fallbackWelcomeTitleSpan${index}`,
        text: line,
        marks: index === 1 ? ["strong"] : [],
      },
    ],
  }));

const welcomeComponents: PortableTextComponents = {
  block: {
    normal: ({ children }: WelcomeBlockProps) => (
      <p className="text-left text-3xl font-semibold leading-tight text-white md:text-5xl">{children}</p>
    ),
    normalCenter: ({ children }: WelcomeBlockProps) => (
      <p className="text-center text-3xl font-semibold leading-tight text-white md:text-5xl">{children}</p>
    ),
    normalRight: ({ children }: WelcomeBlockProps) => (
      <p className="text-right text-3xl font-semibold leading-tight text-white md:text-5xl">{children}</p>
    ),
    headingLarge: ({ children }: WelcomeBlockProps) => (
      <p className="text-left text-4xl font-semibold leading-tight text-white md:text-6xl">{children}</p>
    ),
    headingLargeCenter: ({ children }: WelcomeBlockProps) => (
      <p className="text-center text-4xl font-semibold leading-tight text-white md:text-6xl">{children}</p>
    ),
    headingLargeRight: ({ children }: WelcomeBlockProps) => (
      <p className="text-right text-4xl font-semibold leading-tight text-white md:text-6xl">{children}</p>
    ),
    headingHuge: ({ children }: WelcomeBlockProps) => (
      <p className="text-left text-5xl font-bold leading-tight text-white md:text-7xl">{children}</p>
    ),
    headingHugeCenter: ({ children }: WelcomeBlockProps) => (
      <p className="text-center text-5xl font-bold leading-tight text-white md:text-7xl">{children}</p>
    ),
    headingHugeRight: ({ children }: WelcomeBlockProps) => (
      <p className="text-right text-5xl font-bold leading-tight text-white md:text-7xl">{children}</p>
    ),
  },
  marks: {
    textColor: ({ children, value }: { children?: ReactNode; value?: { color?: string } }) => (
      <span style={{ color: value?.color }}>{children}</span>
    ),
    textSize: ({ children, value }: { children?: ReactNode; value?: { size?: string } }) => (
      <span style={{ fontSize: value?.size }}>{children}</span>
    ),
  },
};

export default async function WelcomeSection() {
  const query = `*[_type == "generalSettings"][0]{welcomePicture, welcomePictureAlt, welcomeTitle, welcomeRichText}`;
  const settings = await client.fetch<WelcomeSettings>(query);

  const welcomeImage = settings?.welcomePicture
    ? urlFor(settings.welcomePicture).auto("format").fit("crop").width(600).height(400).url()
    : null;
  const welcomeRichText = settings?.welcomeRichText?.length
    ? settings.welcomeRichText
    : createWelcomeRichTextFallback(settings?.welcomeTitle || fallbackWelcomeTitle);

  return (
    <section className="relative z-20 grid min-h-screen grid-cols-1 bg-primary md:grid-cols-2">
      <div className="flex flex-col items-center justify-center px-8 py-20 md:px-12">
        <div className="max-w-xl space-y-2">
          <PortableText value={welcomeRichText} components={welcomeComponents} />
        </div>
      </div>
      <div className="flex min-h-[50vh] items-center justify-center md:min-h-screen">
        {welcomeImage && (
          <Image
            src={welcomeImage}
            alt={settings?.welcomePictureAlt || ""}
            width={600}
            height={400}
            className="h-full w-full object-cover"
            unoptimized
          />
        )}
      </div>
    </section>
  );
}
