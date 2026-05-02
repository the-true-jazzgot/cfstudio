"use client";

import { useMemo } from "react";
import { Video } from "../elements/video";
import { motion, useScroll, useTransform } from "framer-motion";
import { div, i } from "motion/react-client";

export function Hero() {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [2, 70]);

  const imageProps = useMemo(
    () => ({
      src: "/logo_cfs.svg",
      alt: "background",
      className: "absolute inset-0 w-full h-full object-cover",
      style: { scale },
      initial: { x: -200 },
      animate: { x: 0 },
    }),
    [scale]
  );

  return (
    <div className="fixed w-full h-screen overflow-hidden top-0 left-0">
        <div className="relative w-full h-screen">
        <Video />
        <motion.img {...imageProps} />
        </div>
    </div>
  );
}
