import { client } from "@/sanity/lib/client";

interface About {
  aboutTitle: string;
  aboutDescription: string;
};

export default async function AboutSection() {
  const settings = await client.fetch<About>(
    `*[_type == "generalSettings"][0]{aboutTitle, aboutDescription}`
  );
  const about = {
    aboutTitle: settings?.aboutTitle,
    aboutDescription: settings?.aboutDescription,
  };

  return (
    <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-8 py-24 text-center">
      <h2 className="mb-8 max-w-5xl text-4xl font-bold uppercase leading-tight text-white drop-shadow-[0_3px_18px_rgba(0,0,0,0.9)] [-webkit-text-stroke:1px_rgba(0,0,0,0.28)] md:text-6xl">
        {about.aboutTitle}
      </h2>

      <p className="mx-auto max-w-4xl text-lg font-medium leading-9 text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)] md:text-xl md:leading-10">
        {about.aboutDescription}
      </p>
    </section>
  );
}
