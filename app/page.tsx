import { Hero } from "./components/hero";
import { LogoComponent } from "./components/test";

export default function Home() {
  return <>
    <Hero />
    <div className="w-full h-screen">
    </div>
    <div className="w-full h-screen">
    </div>
    <div className="w-full h-screen bg-white/20 z-10 backdrop-blur-sm">
     <LogoComponent />
    </div>
  </>;
}
