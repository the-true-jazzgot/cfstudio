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

  useEffect(() => {
    const query = window.matchMedia("(min-width: 64rem)");
    const updateColumnCount = () => setColumnCount(query.matches ? 4 : 2);

    updateColumnCount();
    query.addEventListener("change", updateColumnCount);

    return () => query.removeEventListener("change", updateColumnCount);
  }, []);

  return (
    <>
      <section className="grid grid-cols-2 lg:grid-cols-4 z-10 relative bg-white" id="services">
        {services.map((service, index) => (
          <ServiceGridItem
            key={service._id}
            service={service}
            index={index}
            columnCount={columnCount}
            onOpen={setSelectedService}
          />
        ))}
      </section>
      {selectedService && (
        <ServiceSectionExpanded
          service={selectedService}
          setIsOpen={(isOpen) => !isOpen && setSelectedService(null)}
        />
      )}
    </>
  );
}
