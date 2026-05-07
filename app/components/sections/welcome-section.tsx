import Image from 'next/image'
import { client } from "../../../sanity/lib/client";
import { urlFor } from "../../../sanity/lib/image";

export default async function WelcomeSection() {
  const query = `*[_type == "generalSettings"][0]{welcomePicture}`;
  const settings = await client.fetch(query);

  const welcomeImage = settings?.welcomePicture
    ? urlFor(settings.welcomePicture).auto("format").fit("crop").width(600).height(400).url()
    : null;

  return (
    <section className="bg-primary grid grid-cols-1 md:grid-cols-2 z-20 relative">
        <div className="p-10 flex flex-col justify-center items-center">
            <h2 className="text-5xl text-white">KREATYWNE<br /><b>ROZWIĄZANIA</b><br />DLA BIZNESU</h2>
        </div>
        <div className="flex items-center justify-center">
          {welcomeImage && (
            <Image
              src={welcomeImage}
              alt="Welcome picture"
              width={600}
              height={400}
              className="w-full h-auto"
              unoptimized
            />
          )}
        </div>
    </section>
  );
}