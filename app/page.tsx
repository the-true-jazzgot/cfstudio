import { Header } from "./components/header";
import { Hero } from "./components/hero";
import { ServiceSection } from "./components/service_section";

export default function Home() {
  return <>
    <Header />
    <Hero />
    <div className="w-full h-screen">
    </div>
    <div className="w-full h-screen">
    </div>
    <div className="w-full h-screen bg-white/20 z-10 backdrop-blur-sm">
      <ServiceSection />
    </div>
  </>;
}
