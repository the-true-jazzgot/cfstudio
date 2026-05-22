"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { urlFor } from "@/sanity/lib/image";

export interface PortfolioProject {
  _key: string;
  title?: string;
  description?: string;
  image: {
    asset: {
      _id: string;
      metadata?: {
        dimensions?: {
          width: number;
          height: number;
        };
      };
    };
  };
}

interface PortfolioGalleryClientProps {
  title: string;
  projects: PortfolioProject[];
}

export default function PortfolioGalleryClient({ title, projects }: PortfolioGalleryClientProps) {
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const canUsePortal = typeof document !== "undefined";

  useEffect(() => {
    document.body.style.overflow = selectedProject ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedProject]);

  return (
    <section id="portfolio" className="relative z-10 bg-white py-20">
      <h2 className="mb-14 px-6 text-center text-4xl font-light uppercase">
        {title}
      </h2>

      {projects.length > 0 && (
        <div className="grid gap-2 px-4 sm:grid-cols-2 lg:grid-cols-4">
          {projects.map((project) => (
            <button
              key={project._key}
              type="button"
              className="group relative aspect-square overflow-hidden bg-gray-200 text-left transition-transform hover:scale-[1.03]"
              aria-label={`Otwórz projekt: ${project.title || "projekt portfolio"}`}
              onClick={() => setSelectedProject(project)}
            >
              <Image
                src={urlFor(project.image).auto("format").fit("crop").width(700).height(700).url()}
                alt={project.title || "Portfolio project"}
                fill
                unoptimized
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              />
            </button>
          ))}
        </div>
      )}

      {canUsePortal && selectedProject && createPortal(
        <div
          className="fixed inset-0 z-[1000] overflow-y-auto bg-gray-950/80 px-4 py-24 backdrop-blur-sm md:px-8 md:py-28"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="relative mx-auto w-fit max-w-full"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Zamknij projekt"
              className="sticky top-24 z-[1010] -mb-11 ml-auto flex h-11 w-11 items-center justify-center text-white drop-shadow-lg transition-opacity hover:opacity-75"
              onClick={() => setSelectedProject(null)}
            >
              <span className="absolute h-[2px] w-5 rotate-45 rounded-full bg-current" />
              <span className="absolute h-[2px] w-5 -rotate-45 rounded-full bg-current" />
            </button>

            <figure className="overflow-hidden rounded-md bg-white shadow-2xl">
              <Image
                src={urlFor(selectedProject.image).auto("format").url()}
                alt={selectedProject.title || "Portfolio project"}
                width={selectedProject.image.asset.metadata?.dimensions?.width ?? 1400}
                height={selectedProject.image.asset.metadata?.dimensions?.height ?? 1000}
                unoptimized
                className="h-auto max-h-none w-auto max-w-[calc(100vw-2rem)] object-contain md:max-w-[calc(100vw-4rem)]"
              />
              {(selectedProject.title || selectedProject.description) && (
                <figcaption className="max-w-[calc(100vw-2rem)] px-5 py-4 text-gray-700 md:max-w-[calc(100vw-4rem)]">
                  {selectedProject.title && (
                    <h3 className="text-xl font-semibold">{selectedProject.title}</h3>
                  )}
                  {selectedProject.description && (
                    <p className="mt-2 leading-7 text-gray-500">{selectedProject.description}</p>
                  )}
                </figcaption>
              )}
            </figure>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}
