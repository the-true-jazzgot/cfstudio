'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'motion/react'
import { urlFor } from '@/sanity/lib/image'

interface CarouselImage {
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

interface ImageCarouselProps {
  images: CarouselImage[]
}

export function ImageCarousel({ images }: ImageCarouselProps) {
  const [current, setCurrent] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)
  const [loading, setLoading] = useState(true)

  const totalImages = images.length

  if (totalImages === 0) {
    return <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">No images available</div>
  }

  const next = () => {
    setCurrent((prev) => (prev + 1) % totalImages)
  }

  const prev = () => {
    setCurrent((prev) => (prev - 1 + totalImages) % totalImages)
  }

  useEffect(() => {
    if (!isAutoPlay) return

    const timer = setInterval(next, 4000)
    return () => clearInterval(timer)
  }, [isAutoPlay, totalImages])

  const currentImage = images[current]
  const imageUrl = urlFor(currentImage.picture).url()
  const dimensions = currentImage.picture.asset.metadata?.dimensions
  const width = dimensions?.width ?? 800
  const height = dimensions?.height ?? 600

  return (
    <div
      className="relative w-full bg-gray-100 rounded-lg overflow-hidden"
      onMouseEnter={() => setIsAutoPlay(false)}
      onMouseLeave={() => setIsAutoPlay(true)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="relative w-full"
        >
          <Image
            src={imageUrl}
            alt={currentImage.pictureDescription}
            width={width}
            height={height}
            className="object-contain w-full h-auto"
            onLoad={() => setLoading(false)}
            onError={() => setLoading(false)}
          />
        </motion.div>
      </AnimatePresence>

      {loading && (
        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
          <p>Loading images...</p>
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
        <p className="text-white text-sm">{currentImage.pictureDescription}</p>
      </div>

      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 transition-colors z-10"
        aria-label="Previous image"
      >
        <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 transition-colors z-10"
        aria-label="Next image"
      >
        <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === current ? 'bg-white' : 'bg-white/40'
            }`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>

      {/* Image counter */}
      <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
        {current + 1} / {totalImages}
      </div>
    </div>
  )
}
