"use client";

import type { ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Service } from "@/app/interfaces";
import { Submenu } from "../ui/submenu";

interface NavbarClientProps {
  logo: ReactNode;
  services: Service[];
}

export function NavbarClient({ logo, services }: NavbarClientProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);

  const serviceItems = useMemo(
    () => services.map((service) => ({
      name: service.name,
      link: `#${service.slug.current}`,
    })),
    [services]
  );

  useEffect(() => {
    const updateVisibility = () => setIsVisible(window.scrollY > 12);

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });

    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsMobileServicesOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 z-50 w-full shadow-lg backdrop-blur-sm bg-white/80 border-b-2 border-white/20 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 py-4 md:px-6 md:py-5 flex justify-between items-center">
        <div className="[&>img]:w-40 [&>img]:h-auto md:[&>img]:w-[300px]">
          {logo}
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm uppercase tracking-wide">
          <a href="#">Home</a>
          <Submenu
            name="Co robimy?"
            isOpen={false}
            items={serviceItems}
            className="uppercase tracking-wide cursor-pointer"
            menuClassName="absolute top-full mt-5 left-1/2 -translate-x-1/2 bg-white/95 text-gray-800 shadow-xl border border-gray-200 rounded-md w-[320px] overflow-hidden normal-case tracking-normal"
            itemClassName="px-5 py-3 hover:bg-primary-light cursor-pointer transition-colors"
          />
          <a href="#portfolio">Portfolio</a>
          <a href="#contact">Kontakt</a>
        </nav>

        <button
          type="button"
          className="relative h-10 w-10 text-gray-900 md:hidden"
          aria-label={isMobileMenuOpen ? "Zamknij menu" : "Otwórz menu"}
          aria-expanded={isMobileMenuOpen}
          onClick={() => setIsMobileMenuOpen((current) => !current)}
        >
          <span
            className="absolute left-1/2 top-1/2 block rounded-full bg-current transition-transform"
            style={{
              width: 22,
              height: 2,
              transform: isMobileMenuOpen
                ? "translate(-50%, -50%) rotate(45deg)"
                : "translate(-50%, calc(-50% - 7px))",
            }}
          />
          <span
            className="absolute left-1/2 top-1/2 block rounded-full bg-current transition-opacity"
            style={{
              width: 22,
              height: 2,
              transform: "translate(-50%, -50%)",
              opacity: isMobileMenuOpen ? 0 : 1,
            }}
          />
          <span
            className="absolute left-1/2 top-1/2 block rounded-full bg-current transition-transform"
            style={{
              width: 22,
              height: 2,
              transform: isMobileMenuOpen
                ? "translate(-50%, -50%) rotate(-45deg)"
                : "translate(-50%, calc(-50% + 7px))",
            }}
          />
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.button
              type="button"
              className="fixed inset-0 top-[73px] z-40 bg-black/30 md:hidden"
              aria-label="Zamknij menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobileMenu}
            />
            <motion.nav
              className="fixed right-0 top-[73px] z-50 flex h-[calc(100vh-73px)] w-[min(82vw,340px)] flex-col gap-1 bg-white px-6 py-8 text-sm uppercase tracking-wide shadow-2xl md:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
            >
              <a className="py-3" href="#" onClick={closeMobileMenu}>Home</a>
              <div className="py-3">
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 py-3 text-left uppercase tracking-wide"
                  aria-expanded={isMobileServicesOpen}
                  onClick={() => setIsMobileServicesOpen((current) => !current)}
                >
                  <span>Co robimy?</span>
                  <svg
                    aria-hidden="true"
                    className={`mt-px h-2.5 w-4 flex-none transition-transform duration-200 ${isMobileServicesOpen ? "rotate-180" : ""}`}
                    viewBox="0 0 20 12"
                    fill="none"
                  >
                    <path d="M2 2L10 10L18 2" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <AnimatePresence initial={false}>
                  {isMobileServicesOpen && (
                    <motion.div
                      className="flex flex-col gap-1 overflow-hidden normal-case tracking-normal"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                    >
                      {serviceItems.map((item) => (
                        <a
                          key={item.link}
                          className="rounded-md px-3 py-2 hover:bg-primary-light"
                          href={item.link}
                          onClick={closeMobileMenu}
                        >
                          {item.name}
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <a className="py-3" href="#portfolio" onClick={closeMobileMenu}>Portfolio</a>
              <a className="py-3" href="#contact" onClick={closeMobileMenu}>Kontakt</a>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
