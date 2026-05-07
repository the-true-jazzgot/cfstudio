"use client";

import { useMemo } from "react";
import { Video } from "../elements/video";
import { motion, useScroll, useTransform } from "framer-motion";

export function Hero() {
  const { scrollYProgress } = useScroll();
  const getProportion = useMemo(() => {
    if (typeof window === "undefined") return 1;
    const portrait = window.matchMedia("(orientation: portrait)").matches;
    return portrait ? 0.4 : 1;
  }, []);
  const scale = useTransform(scrollYProgress, [0, 1], [8*getProportion, 90]);

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
        </div>
    </div>
  );
}
