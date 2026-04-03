import Image from "next/image";
import { client } from "../../sanity/lib/client";
import { urlFor } from "../../sanity/lib/image";

const logoQuery = `*[_type == "generalSettings"][0]{logo, logo{alt}}`;

export async function LogoComponent() {
  const settings = await client.fetch(logoQuery);
  console.log("Sanity settings:", settings);

  const fallbackImage = "/logo.svg";
  const logoImage = settings?.logo
    ? urlFor(settings.logo).auto("format").fit("crop").width(300).url()
    : fallbackImage;

  const altText = settings?.logo?.alt || "logo";

  return (
    <div className="flex items-center justify-center p-8">
      <Image
        src={logoImage}
        alt={altText}
        width={300}
        height={100}
        unoptimized
        className="h-auto"
      />
    </div>
  );
}
