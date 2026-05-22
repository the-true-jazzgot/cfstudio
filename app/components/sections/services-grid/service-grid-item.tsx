import { Service } from "@/app/interfaces";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

interface ServiceGridItemProps {
    service: Service;
    index: number;
    columnCount: 2 | 4;
    onOpen: (service: Service) => void;
}

export default function ServiceGridItem({ service, index, columnCount, onOpen }: ServiceGridItemProps) {
  const row = Math.floor(index / columnCount);
  const column = index % columnCount;
  const isLight = (row + column) % 2 === 1;

  return (
    <button
        type="button"
        onClick={() => onOpen(service)}
        className="service-grid-item aspect-square p-8 text-center text-white cursor-pointer transition-transform hover:scale-105 flex flex-col items-center justify-center"
        aria-label={`Otwórz usługę: ${service.name}`}
        style={{
          backgroundColor: isLight
            ? "color-mix(in srgb, var(--brand-primary) 75%, white)"
            : "var(--brand-primary)",
        }}
    >
        {service.icon && (
            <Image
                src={urlFor(service.icon).width(64).height(64).url()} 
                alt={`${service.name} icon`}
                width={64}
                height={64}
                unoptimized
                className="w-16 h-16 mb-4 mx-auto"
            />
        )}
        <h3 className="text-sm tracking-[0.3em]">{service.name}</h3>
    </button>
  );
}
