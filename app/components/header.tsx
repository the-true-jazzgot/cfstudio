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

  return <>
    <div className="w-full h-24 sticky top-0 z-20 flex items-center justify-between px-6 py-4">
      <LogoComponent />
      <nav>
        <ul className="flex items-center gap-6">
          <Submenu name="Usługi" isOpen={false} children={[
            { name: "Usługa 1", link: "/usluga-1" },
            { name: "Usługa 2", link: "/usluga-2" },
            { name: "Usługa 3", link: "/usluga-3" }
          ]} />
        </ul>
      </nav>
      <div className="flex items-center gap-6 text-white font-bold">
        <p className="text-white"><a href={`tel:${phoneNumber}`}>{phoneNumber}</a></p>
        <p className="text-white"><a href={`mailto:${emailAddress}`}>{emailAddress}</a></p>
      </div>
    </div>
  </>;
}