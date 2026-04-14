import { client } from "@/sanity/lib/client";
import { Header } from "./components/header";
import { Hero } from "./components/hero";
import { ServiceSection } from "./components/service_section";
import { TrustedUs } from "./components/trusted_us";
import { Appear } from "./components/animations/appear";
import { Service } from "./interfaces";
import { ServiceWrapper } from "./components/service_wrapper";

export default async function Home() {
  const query = `*[_type == "services"][]{_id, name, description, slug, gallery[]{picture{asset->{_id, metadata{dimensions{width,height}}}}, pictureDescription}}`;
  const services = await client.fetch(query);

  if (!services) {
    throw new Error("Failed to fetch services");
  }

  return <>
    <Header services={services} />
    <Hero />
    <div className="w-full h-screen">
    </div>
    <div className="w-full h-[80vh]">
    </div>
    <TrustedUs />
    {services.map((service: Service) => (
      <Appear key={service._id}>
        <ServiceWrapper service={service} key={service._id} />
      </Appear>
    ))}
  </>;
}
