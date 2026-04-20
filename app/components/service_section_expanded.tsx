import { Service } from "../interfaces";
import { urlFor } from "@/sanity/lib/image";

interface ServiceSectionExpandedProps {
  service: Service;
  setIsOpen: (isOpen: boolean) => void;
}

export function ServiceSectionExpanded({ service, setIsOpen }: ServiceSectionExpandedProps) {
  return <>
    <button 
        className="fixed top-10 right-10 bg-black/50 text-white px-3 py-1 rounded-xl text-sm border-2 border-white cursor-pointer z-30 hover:bg-black"
        onClick={() => setIsOpen(false)}
    >Zamknij</button>
    <div 
      className="fixed z-20 overflow-hidden top-0 left-0 w-full h-full bg-black/40 p-4 overflow-y-auto backdrop-blur-sm"
      onClick={()=>setIsOpen(false)}>
      <div className="relative">
        
      </div>
      <section className="fixed z-25 top-5 left-1/2 transform -translate-x-1/2 max-w-screen-md w-full h-full">
        {service.gallery && service.gallery.length > 0 && service.gallery.map((image, index) => (
            <img
              key={image._key ?? `${image.picture.asset._id}-${index}`}
              src={urlFor(image.picture).url()}
              alt={image.pictureDescription}
              className="mb-5"
            />
        ))}
      </section>
    </div>
  </>
}