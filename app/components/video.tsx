"use client";

import { useEffect, useRef, useState } from "react";

export function Video() {
  const [orientation, setOrientation] = useState("landscape");
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const updateOrientation = () => {
      if (typeof window === "undefined") return;
      const portrait = window.matchMedia("(orientation: portrait)").matches;
      setOrientation(portrait ? "portrait" : "landscape");
    };

    updateOrientation();

    window.addEventListener("resize", updateOrientation);
    window.addEventListener("orientationchange", updateOrientation);

    return () => {
      window.removeEventListener("resize", updateOrientation);
      window.removeEventListener("orientationchange", updateOrientation);
    };
  }, []);

  const src = orientation === "portrait" ? "/vertical.MP4" : "/horizontal.MP4";

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    videoEl.load();
    videoEl
      .play()
      .catch(() => {
        // Autoplay may be blocked; ignore silently.
      });
  }, [src]);

  return <>
    <video
      key={src}
      ref={videoRef}
      autoPlay
      playsInline
      muted
      loop
      preload="auto"
      webkit-playsinline="true"
      className="absolute w-full h-full object-cover"
    >
      <source src={src} type="video/mp4" />
    </video>
  </>;
}