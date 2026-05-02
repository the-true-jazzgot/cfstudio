import { PortableText } from '@portabletext/react'
import { ImageCarousel } from '../ui/image_carousel'
import { Service } from '../../interfaces'

interface ServiceSectionProps {
  service: Service;
  setIsOpen: (isOpen: boolean) => void;
}

export function ServiceSection({ service, setIsOpen }: ServiceSectionProps) {
  const portableTextComponents = {
    block: {
      h2: ({ children }: any) => (
        <h2 className="text-2xl font-bold text-black mt-4 mb-2">{children}</h2>
      ),
      h3: ({ children }: any) => (
        <h3 className="text-xl font-semibold text-black mt-3 mb-2">{children}</h3>
      ),
      normal: ({ children }: any) => (
        <p className="text-base text-black">{children}</p>
      ),
    },
  }

  return (
    <>
      <section id={service.slug.current} className="relative z-15 w-[90%] mx-auto mb-15" style={{ scrollMarginTop: '7rem' }}>
        <h2 className="text-3xl font-semibold text-black text-center mb-2 p-4 bg-white/40 backdrop-blur-sm rounded-xl">{service.name}</h2>
        <div className="flex flex-wrap md:flex-nowrap justify-between">
          <div className="relative w-full md:w-1/3 p-4 bg-white/40 rounded-xl mr-2 mb-2 backdrop-blur-sm">
            {service && <>
                <div className="text-black text-justify leading-relaxed">
                  <PortableText value={service.description} components={portableTextComponents} />
                </div>
                <button className="relative bg-black text-white text-sm rounded-lg px-4 py-2 mt-4 cursor-pointer" onClick={() => setIsOpen(true)}>
                  Zobacz wszystkie realizacje
                </button>
            </>}
          </div>
          <div className="w-full md:w-2/3 rounded-xl mb-2">
            {service && service.gallery ? (
              <ImageCarousel images={service.gallery} />
            ) : (
              <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
                <p>No images available</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}