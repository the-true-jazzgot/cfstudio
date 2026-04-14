import { PortableText } from "next-sanity";
import { Service } from "../interfaces";
import { urlFor } from "@/sanity/lib/image";

interface ServiceSectionExpandedProps {
  service: Service;
  setIsOpen: (isOpen: boolean) => void;
}

export function ServiceSectionExpanded({ service, setIsOpen }: ServiceSectionExpandedProps) {
  return (
    <>
      <section className="z-15 gradient-b rounded-xl w-[90%] mx-auto mb-15" style={{ scrollMarginTop: '7rem' }}>
        {service.gallery && service.gallery.length > 0 && service.gallery.map((image) => (
            <img src={urlFor(image.picture).url()} alt={image.pictureDescription} />
        ))}

      </section>
    </>
  )
}