"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { unmaskRight, imageSettle, VIEWPORT } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { cn } from "@/lib/utils";

/**
 * An image revealed by a travelling clip edge while the picture itself settles
 * back from a slight over-scale. The two run on the wrapper and the image
 * separately, which is what makes it read as a camera move rather than a fade.
 */
export function ImageReveal({
  src,
  alt,
  className,
  imageClassName,
  sizes,
  priority = false,
  fill = true,
  width,
  height,
  quality,
}: {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  sizes: string;
  priority?: boolean;
  fill?: boolean;
  width?: number;
  height?: number;
  quality?: number;
}) {
  const reduced = usePrefersReducedMotion();

  const img = (
    <Image
      src={src}
      alt={alt}
      {...(fill ? { fill: true } : { width: width ?? 1600, height: height ?? 1000 })}
      sizes={sizes}
      priority={priority}
      quality={quality}
      className={cn("h-full w-full object-cover", imageClassName)}
    />
  );

  if (reduced) {
    return <div className={cn("relative overflow-hidden", className)}>{img}</div>;
  }

  return (
    <motion.div
      data-reveal
      className={cn("relative overflow-hidden", className)}
      variants={unmaskRight}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
    >
      <motion.div className="h-full w-full" variants={imageSettle}>
        {img}
      </motion.div>
    </motion.div>
  );
}
