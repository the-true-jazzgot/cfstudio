"use client";

import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import { Service } from "@/app/interfaces";
import ServiceGridItem from "./service-grid-item";
import { ServiceSectionExpanded } from "./service_section_expanded";
import { AnimatePresence } from "motion/react";

export default function ServicesGrid() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const query = `*[_type == "services"] {
          _id,
          name,
          slug,
          description,
          gallery
        }`;
        const data = await client.fetch(query);
        setServices(data);
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) return <div>Loading services...</div>;

  return (
    <>
      <section className="grid grid-cols-2 md:grid-cols-4 z-10 relative">
        {services.map((service, index) => (
          <ServiceGridItem
            key={service._id}
            service={service}
            index={index}
            onOpen={setSelectedService}
          />
        ))}
      </section>
      <AnimatePresence>
        {selectedService && (
          <ServiceSectionExpanded
            service={selectedService}
            setIsOpen={(isOpen) => !isOpen && setSelectedService(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}