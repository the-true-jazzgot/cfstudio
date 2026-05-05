import { Service } from "@/app/interfaces";

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
        index % 2 === 0 ? "bg-cyan-400" : "bg-cyan-300"
        }`}
    >
        <div className="text-4xl mb-4">□</div>
        <h3 className="text-sm tracking-[0.3em]">{service.name}</h3>
    </div>
  );
}