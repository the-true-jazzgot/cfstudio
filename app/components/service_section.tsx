import { PortableText } from '@portabletext/react'
import { ImageCarousel } from './ui/image_carousel'

import type { PortableTextBlock } from '@portabletext/types'

interface ServiceImage {
  _key: string
  picture: {
    asset: {
      _id: string
      metadata?: {
        dimensions: {
          width: number
          height: number
        }
      }
    }
  }
  pictureDescription: string
}

export interface Service {
  _id: string;
  name: string;
  slug: {
    current: string;
  };
  description: PortableTextBlock[];
  gallery: ServiceImage[];
}

export function ServiceSection(service: Service) {
  return (
    <>
      <div id={service.slug.current} className="flex z-15 flex-wrap gradient-b rounded-lg w-[90%] mx-auto">
        <div className="w-full md:w-1/3 p-4">
          {service && <>
              <h3 className="text-xl font-semibold mb-2 text-black">{service.name}</h3>
              <div className="text-black">
                <PortableText value={service.description} />
              </div>
          </>}
        </div>
        <div className="w-full md:w-2/3 p-4">
          {service && service.gallery ? (
            <ImageCarousel images={service.gallery} />
          ) : (
            <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
              <p>No images available</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}