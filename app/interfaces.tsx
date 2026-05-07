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
  icon: {
    asset: {
      _id: string;
    };
  };
}