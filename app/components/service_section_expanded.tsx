import { Service } from "../interfaces";
import { urlFor } from "@/sanity/lib/image";

interface ServiceSectionExpandedProps {
  service: Service;
  setIsOpen: (isOpen: boolean) => void;
}

export function ServiceSectionExpanded({ service, setIsOpen }: ServiceSectionExpandedProps) {
  return (
    <>
      <section className="fixed z-20 overflow-hidden top-5 left-5 right-5 bottom-5 bg-white/90 flex flex-col items-center justify-start p-8 overflow-y-scroll rounded-xl">
        <button 
            className="fixed top-10 right-10 bg-black/50 text-white px-3 py-1 rounded-xl text-sm border-2 border-white cursor-pointer z-30 hover:bg-black"
            onClick={() => setIsOpen(false)}
        >Zamknij</button>
        {service.gallery && service.gallery.length > 0 && service.gallery.map((image, index) => (
            <img
              key={image._key ?? `${image.picture.asset._id}-${index}`}
              src={urlFor(image.picture).url()}
              alt={image.pictureDescription}
            />
        ))}
      </section>
    </>
  )
}