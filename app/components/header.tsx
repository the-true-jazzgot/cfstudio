import { client } from "@/sanity/lib/client";
import { LogoComponent } from "./logo";
import { Submenu } from "./ui/submenu";
import { Service } from "./service_section";

interface HeaderProps {
  services: Service[]
}

export async function Header({ services }: HeaderProps) {
  const query = `*[_type == "generalSettings"][0]{email, number}`;
  const settings = await client.fetch(query);
  
  if (!settings?.number || !settings?.email) {
      throw new Error("Number or Email not configured in Sanity");
  }

  const phoneNumber = settings.number;
  const emailAddress = settings.email;

  return <>
    <div className="w-full h-24 sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-black/20 backdrop-blur-sm">
      <LogoComponent />
      <Submenu name="Usługi" isOpen={false} children={services.map(service => ({name: service.name, link: `#${service.slug.current}`}))} />
      <div className="flex items-center gap-6 text-white font-bold">
        <p className="text-white"><a href={`tel:${phoneNumber}`}>{phoneNumber}</a></p>
        <p className="text-white"><a href={`mailto:${emailAddress}`}>{emailAddress}</a></p>
      </div>
    </div>
  </>;
}