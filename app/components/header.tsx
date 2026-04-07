import { client } from "@/sanity/lib/client";
import { LogoComponent } from "./logo";
import { Submenu } from "./ui/submenu";

export async function Header() {
  const query = `*[_type == "generalSettings"][0]{email, number}`;
  const settings = await client.fetch(query);
  
  if (!settings?.number || !settings?.email) {
      throw new Error("Number or Email not configured in Sanity");
  }

  const phoneNumber = settings.number;
  const emailAddress = settings.email;
  const services = [
    { name: "branding & rebranding", link: "#" },
    { name: "⁠projektowanie graficzne", link: "#" },
    { name: "⁠strony www", link: "#" },
    { name: "⁠produkt design", link: "#" },
    { name: "⁠social media", link: "#" },
    { name: "⁠foto & video", link: "#" },
    { name: "⁠obsługa abonamentowa", link: "#" }
  ];

  return <>
    <div className="w-full h-24 sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-black/20 backdrop-blur-sm">
      <LogoComponent />
      <Submenu name="Usługi" isOpen={false} children={services} />
      <div className="flex items-center gap-6 text-white font-bold">
        <p className="text-white"><a href={`tel:${phoneNumber}`}>{phoneNumber}</a></p>
        <p className="text-white"><a href={`mailto:${emailAddress}`}>{emailAddress}</a></p>
      </div>
    </div>
  </>;
}