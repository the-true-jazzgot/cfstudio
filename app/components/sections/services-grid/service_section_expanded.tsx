import Image from "next/image";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { ReactNode } from "react";
import { Service } from "../../../interfaces";
import { urlFor } from "@/sanity/lib/image";

interface ServiceSectionExpandedProps {
  service: Service;
  setIsOpen: (isOpen: boolean) => void;
}

export function ServiceSectionExpanded({ service, setIsOpen }: ServiceSectionExpandedProps) {
  const portableTextComponents: PortableTextComponents = {
    block: {
      h2: ({ children }: { children?: ReactNode }) => (
        <h2 className="mt-8 text-2xl font-semibold text-white">{children}</h2>
      ),
      h3: ({ children }: { children?: ReactNode }) => (
        <h3 className="mt-6 text-xl font-semibold text-white">{children}</h3>
      ),
      normal: ({ children }: { children?: ReactNode }) => (
        <p className="text-base leading-8 text-white/90">{children}</p>
      ),
    },
  };

  return (
    <div
      className="fixed inset-0 z-[100] overflow-y-auto bg-gray-950/70 px-4 py-6 backdrop-blur-md md:px-8 md:py-10"
      onClick={() => setIsOpen(false)}
    >
      <button
        type="button"
        aria-label="Zamknij podgląd usługi"
        className="fixed right-4 top-4 z-[120] flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-gray-950/70 text-white shadow-xl transition-colors hover:bg-gray-950 md:right-8 md:top-8"
        onClick={() => setIsOpen(false)}
      >
        <span className="absolute h-[2px] w-5 rotate-45 rounded-full bg-current" />
        <span className="absolute h-[2px] w-5 -rotate-45 rounded-full bg-current" />
      </button>

      <section
        className="relative mx-auto grid w-full max-w-6xl gap-8 overflow-hidden rounded-md bg-white shadow-2xl md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]"
        onClick={(event) => event.stopPropagation()}
      >
        <aside className="bg-primary px-7 py-10 text-white md:sticky md:top-10 md:min-h-[calc(100vh-5rem)] md:px-10 md:py-14">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.35em] text-white/70">
            Usługa
          </p>
          <h2 className="text-4xl font-semibold leading-tight md:text-5xl">
            {service.name}
          </h2>
          <div className="mt-8 max-w-prose space-y-5 text-white/90">
            <PortableText value={service.description} components={portableTextComponents} />
          </div>
        </aside>

        <div className="space-y-5 px-4 pb-6 md:px-0 md:py-6 md:pr-6">
          {service.gallery && service.gallery.length > 0 ? (
            service.gallery.map((image, index) => (
              <figure key={image._key ?? `${image.picture.asset._id}-${index}`} className="overflow-hidden rounded-md bg-gray-100">
                <Image
                  src={urlFor(image.picture).url()}
                  alt={image.pictureDescription}
                  width={image.picture.asset.metadata?.dimensions.width ?? 1000}
                  height={image.picture.asset.metadata?.dimensions.height ?? 700}
                  unoptimized
                  className="h-auto w-full object-cover"
                />
                {image.pictureDescription && (
                  <figcaption className="px-4 py-3 text-sm text-gray-500">
                    {image.pictureDescription}
                  </figcaption>
                )}
              </figure>
            ))
          ) : (
            <div className="flex min-h-72 items-center justify-center rounded-md border border-dashed border-gray-300 bg-gray-50 p-8 text-center text-gray-500">
              Brak zdjęć dla tej usługi.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
