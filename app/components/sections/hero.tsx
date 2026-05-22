"use client";

import { useEffect, useMemo, useState } from "react";
import { Video } from "../elements/video";
import { motion, useScroll, useTransform } from "framer-motion";

export function Hero() {
  const { scrollYProgress } = useScroll();
  const [isPortrait, setIsPortrait] = useState(false);

  useEffect(() => {
    const updateOrientation = () => {
      setIsPortrait(window.matchMedia("(orientation: portrait)").matches);
    };

    updateOrientation();
    window.addEventListener("resize", updateOrientation);
    window.addEventListener("orientationchange", updateOrientation);

    return () => {
      window.removeEventListener("resize", updateOrientation);
      window.removeEventListener("orientationchange", updateOrientation);
    };
  }, []);

  const landscapeScale = useTransform(scrollYProgress, [0, 1], [8, 90]);
  const portraitScale = useTransform(scrollYProgress, [0, 1], [2.2, 90]);
  const scale = isPortrait ? portraitScale : landscapeScale;
  const chevronOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  const imageProps = useMemo(
    () => ({
      src: "/logo_cfs.svg",
      alt: "background",
      className: "absolute inset-0 w-full h-full object-cover",
      style: { scale },
      initial: { x: -200 },
      animate: { x: 0 },
    }
  ), [scale]);

  return (
    <div className="fixed w-full h-screen overflow-hidden top-0 left-0">
        <div className="relative w-full h-screen">
        <Video />
        <motion.img {...imageProps} />
        <motion.div
          className="pointer-events-none fixed bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1"
          style={{ opacity: chevronOpacity }}
          aria-hidden="true"
        >
          <svg className="scroll-chevron scroll-chevron-back" viewBox="0 0 64 40" fill="none">
            <path d="M8 8L32 32L56 8" />
          </svg>
          <svg className="scroll-chevron scroll-chevron-front" viewBox="0 0 64 40" fill="none">
            <path d="M8 8L32 32L56 8" />
          </svg>
        </motion.div>
        </div>
    </div>
  );
}
