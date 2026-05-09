import { LogoComponent } from "./logo";
import { Service } from "@/app/interfaces";
import { NavbarClient } from "./navbar-client";

interface NavbarProps {
  services: Service[];
}

export default function Navbar({ services }: NavbarProps) {
  return (
    <NavbarClient logo={<LogoComponent />} services={services} />
  );
}
