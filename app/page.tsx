import { client } from "@/sanity/lib/client";
import { Header } from "./components/header";
import { Hero } from "./components/hero";
import { Service, ServiceSection } from "./components/service_section";

export default async function Home() {
  const query = `*[_type == "services"][]{name, description, gallery}`;
  const services = await client.fetch(query);

  if (!services) {
    throw new Error("Failed to fetch services");
  }

  return <>
    <Header />
    <Hero />
    <div className="w-full h-screen">
    </div>
    <div className="w-full h-screen">
    </div>
    <div className="w-full min-h-screen bg-white/20 z-10 backdrop-blur-sm">
      {services.map((service: Service) => (
        <ServiceSection key={service._id} {...service} />
      ))}
    </div>
  </>;
}
