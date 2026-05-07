import { Service } from "@/app/interfaces";
import { urlFor } from "@/sanity/lib/image";

interface ServiceGridItemProps {
    service: Service;
    index: number;
    onOpen: (service: Service) => void;
}

export default function ServiceGridItem({ service, index, onOpen }: ServiceGridItemProps) {
  return (
    <div
        onClick={() => onOpen(service)}
        className={`p-10 text-center text-white cursor-pointer transition-transform hover:scale-105 ${
        index % 2 === 0 ? "bg-primary" : "bg-primary-light"
        }`}
    >
        {service.icon && (
            <img 
                src={urlFor(service.icon).width(64).height(64).url()} 
                alt={`${service.name} icon`}
                className="w-16 h-16 mb-4 mx-auto"
            />
        )}
        <h3 className="text-sm tracking-[0.3em]">{service.name}</h3>
    </div>
  );
}