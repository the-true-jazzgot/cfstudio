import { client } from '@/sanity/lib/client'
import { ImageCarousel } from './ui/image_carousel'

interface ServiceImage {
  _key: string
  picture: {
    asset: {
      _id: string
    }
  }
  pictureDescription: string
}

export interface Service {
  _id: string
  name: string
  description: string
  gallery: ServiceImage[]
}

export function ServiceSection(service: Service) {
  return (
    <>
      <div className="flex z-20 flex-wrap gradient-b">
        <div className="w-full md:w-1/2 p-4">
          {service && <>
              <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
              <p className="text-gray-600">{service.description}</p>
          </>}
        </div>
        <div className="w-full md:w-1/2 p-4">
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