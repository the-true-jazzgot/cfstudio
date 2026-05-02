import Image from 'next/image'
import { client } from "../../../sanity/lib/client";
import { urlFor } from "../../../sanity/lib/image";

export async function LogoComponent() {
    const query = `*[_type == "generalSettings"][0]{logo, altforlogo}`;
    const settings = await client.fetch(query);
    
    if (!settings?.logo) {
        throw new Error("Logo not configured in Sanity");
    }

    const logoImage = urlFor(settings.logo).auto("format").fit("crop").width(300).url();
    const altText = settings.altforlogo || "logo";

    return (
        <Image
            src={logoImage}
            alt={altText}
            width={300}
            height={100}
            unoptimized
            className="h-auto"
        />
    );
}