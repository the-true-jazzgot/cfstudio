"use client";

import { useEffect, useState } from "react";
import { Service } from "@/app/interfaces";
import ServiceGridItem from "./service-grid-item";
import { ServiceSectionExpanded } from "./service_section_expanded";

interface ServicesGridProps {
  services: Service[];
}

export default function ServicesGrid({ services }: ServicesGridProps) {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [columnCount, setColumnCount] = useState<2 | 4>(4);

  const openService = (service: Service) => {
    setSelectedService(service);
    window.history.pushState({ serviceSlug: service.slug.current }, "", `/uslugi/${service.slug.current}`);
  };

  const closeService = () => {
    setSelectedService(null);
    window.history.pushState(null, "", "/");
  };

  useEffect(() => {
    const query = window.matchMedia("(min-width: 64rem)");
    const updateColumnCount = () => setColumnCount(query.matches ? 4 : 2);

    updateColumnCount();
    query.addEventListener("change", updateColumnCount);

    return () => query.removeEventListener("change", updateColumnCount);
  }, []);

  useEffect(() => {
    const syncServiceFromUrl = () => {
      const match = window.location.pathname.match(/^\/uslugi\/([^/]+)\/?$/);
      const slug = match?.[1];

      if (!slug) {
        setSelectedService(null);
        return;
      }

      const service = services.find((item) => item.slug.current === decodeURIComponent(slug));
      setSelectedService(service ?? null);
    };

    syncServiceFromUrl();
    window.addEventListener("popstate", syncServiceFromUrl);

    return () => window.removeEventListener("popstate", syncServiceFromUrl);
  }, [services]);

  return (
    <>
      <section className="grid grid-cols-2 lg:grid-cols-4 z-10 relative bg-white" id="services">
        {services.map((service, index) => (
          <ServiceGridItem
            key={service._id}
            service={service}
            index={index}
            columnCount={columnCount}
            onOpen={openService}
          />
        ))}
      </section>
      {selectedService && (
        <ServiceSectionExpanded
          service={selectedService}
          setIsOpen={(isOpen) => !isOpen && closeService()}
        />
      )}
    </>
  );
}
