import { client } from "@/sanity/lib/client";
import Navbar from "./components/elements/navbar";
import { Hero } from "./components/sections/hero";
import ServicesGrid from "./components/sections/services-grid/services-grid";
import AboutSection from "./components/sections/about-section";
import StatsSection from "./components/sections/stats-section";
import PortfolioGallery from "./components/sections/portfolio-galery";
import ContactSection from "./components/sections/contact-section";
import { TrustedUs } from "./components/sections/trusted_us";
import WelcomeSection from "./components/sections/welcome-section";
import { Service } from "./interfaces";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const servicesQuery = `*[_type == "services"] {
    _id,
    name,
    slug,
    description,
    gallery[]{_key, picture{asset->{_id, metadata{dimensions{width,height}}}}, pictureDescription},
    icon{asset->{_id}}
  }`;
  const services = await client.fetch<Service[]>(servicesQuery);

  return (
    <main className="bg-white text-gray-800">
      <h1 className="sr-only">CFS - kreatywne rozwiązania dla biznesu</h1>
      <Navbar services={services} />
      <Hero />
      <div className="h-[180vh] w-full"></div>
      <WelcomeSection />
      <TrustedUs />
      <ServicesGrid services={services} />
      <AboutSection />
      <StatsSection />
      <PortfolioGallery />
      <ContactSection />
    </main>
  );
}
