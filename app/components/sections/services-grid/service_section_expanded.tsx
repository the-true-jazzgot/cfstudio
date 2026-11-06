import Image from "next/image";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { useLayoutEffect, useRef, type ReactNode } from "react";
import { Service } from "../../../interfaces";
import { urlFor } from "@/sanity/lib/image";

interface ServiceSectionExpandedProps {
  service: Service;
  setIsOpen: (isOpen: boolean) => void;
}

export function ServiceSectionExpanded({ service, setIsOpen }: ServiceSectionExpandedProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const { scrollX, scrollY } = window;
    const previousFocus = document.activeElement;
    const body = document.body;
    const previousStyles = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      width: body.style.width,
      overflow: body.style.overflow,
    };

    Object.assign(body.style, {
      position: "fixed",
      top: `-${scrollY}px`,
      left: `-${scrollX}px`,
      width: "100%",
      overflow: "hidden",
    });
    dialog.showModal();

    return () => {
      dialog.close();
      Object.assign(body.style, previousStyles);
      window.scrollTo({ left: scrollX, top: scrollY, behavior: "instant" });
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) {
        previousFocus.focus({ preventScroll: true });
      }
    };
  }, []);

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
    <dialog
      ref={dialogRef}
      aria-label={service.name}
      className="fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none border-0 bg-transparent p-0 backdrop:bg-gray-950/70 backdrop:backdrop-blur-md open:flex open:flex-col"
      onCancel={(event) => {
        event.preventDefault();
        setIsOpen(false);
      }}
    >
      <div className="flex shrink-0 justify-end px-4 py-2 md:px-8 md:py-3">
        <button
          type="button"
          aria-label="Zamknij podgląd usługi"
          className="relative flex h-11 w-11 items-center justify-center rounded-full bg-white text-gray-950 shadow-lg transition-colors hover:bg-gray-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          onClick={() => setIsOpen(false)}
        >
          <span aria-hidden="true" className="absolute h-[2px] w-5 rotate-45 rounded-full bg-current" />
          <span aria-hidden="true" className="absolute h-[2px] w-5 -rotate-45 rounded-full bg-current" />
        </button>
      </div>
      <div
        className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pb-6 md:px-8 md:pb-10"
        onClick={() => setIsOpen(false)}
      >
        <section
          className="relative mx-auto grid w-full max-w-6xl gap-8 rounded-md bg-primary shadow-2xl md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:items-start"
          onClick={(event) => event.stopPropagation()}
        >
          <aside className="service-panel-scrollbar bg-primary px-7 py-10 text-white md:sticky md:top-0 md:max-h-[calc(100dvh-7rem)] md:min-h-[calc(100dvh-7rem)] md:overflow-y-auto md:overscroll-contain md:px-10 md:py-14">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.35em] text-white/70">
              Usluga
            </p>
            <h2 className="text-4xl font-semibold leading-tight md:text-5xl">
              {service.name}
            </h2>
            <div className="service-rich-text mt-8 max-w-prose text-white/90">
              <PortableText value={service.description} components={portableTextComponents} />
            </div>
          </aside>

          <div className="space-y-5 bg-white px-4 pb-6 md:px-0 md:py-6 md:pr-6">
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
                Brak zdjec dla tej uslugi.
              </div>
            )}
          </div>
        </section>
      </div>
    </dialog>
  );
}
