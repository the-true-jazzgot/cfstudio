import Navbar from "./components/elements/navbar";
import { Hero } from "./components/sections/hero";
import ServicesGrid from "./components/sections/services-grid";
import AboutSection from "./components/sections/about-section";
import StatsSection from "./components/sections/stats-section";
import PortfolioGallery from "./components/sections/portfolio-galery";
import ContactSection from "./components/sections/contact-section";
import { TrustedUs } from "./components/sections/trusted_us";

export default function HomePage() {
  return (
    <main className="bg-white text-gray-800">
      <Navbar />
      <Hero />
      <div className="h-screen w-full"></div>
      <TrustedUs />
      <ServicesGrid />
      <AboutSection />
      <StatsSection />
      <PortfolioGallery />
      <ContactSection />
    </main>
  );
}